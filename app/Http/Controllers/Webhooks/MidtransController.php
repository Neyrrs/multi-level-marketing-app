<?php

namespace App\Http\Controllers\Webhooks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\OrderService;
use Illuminate\Support\Facades\Log;
use App\Models\Order;

class MidtransController extends Controller
{
    protected OrderService $orderService;

    public function __construct()
    {
        $this->orderService = new OrderService();
    }

    /**
     * Verify Midtrans webhook signature using OrderService helper.
     */
    public function verifySignature(Request $request): bool
    {
        try {
            return $this->orderService->verifyMidtransSignature($request);
        } catch (\Throwable $e) {
            Log::error('Midtrans signature verification error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Production-ready webhook handler for Midtrans.
     */
    public function handle(Request $request)
    {
        // verify signature first
        if (!$this->verifySignature($request)) {
            Log::warning('Midtrans webhook: invalid signature');
            return response()->json(['error' => 'invalid signature'], 400);
        }

        $midtransOrderId = $request->input('order_id') ?: $request->input('orderId') ?: $request->input('order_id');
        if (!$midtransOrderId) {
            Log::warning('Midtrans webhook: missing order id');
            return response()->json(['error' => 'no order id'], 400);
        }

        $order = Order::where('midtrans_order_id', $midtransOrderId)->first();
        if (!$order) {
            Log::warning('Midtrans webhook: order not found ' . $midtransOrderId);
            // return 200 to acknoawledge to Midtrans (prevents retries) but log for investigation
            return response()->json(['ok']);
        }

        try {
            $transactionStatus = (string) $request->input('transaction_status');
            $fraudStatus = (string) $request->input('fraud_status');

            $isPaid = $transactionStatus === 'settlement'
                || ($transactionStatus === 'capture' && ($fraudStatus === '' || $fraudStatus === 'accept'));

            if ($isPaid) {
                $processed = $this->orderService->processPayment($order->id, $request);
                if ($processed) {
                    return response()->json(['ok']);
                }

                Log::warning('Midtrans webhook: paid processing failed for order ' . $order->id);
                return response()->json(['error' => 'processing failed'], 500);
            }

            if (in_array($transactionStatus, ['cancel', 'deny', 'failure', 'expire'], true)) {
                $this->orderService->cancelPendingOrder(
                    $order->id,
                    'Midtrans status: ' . $transactionStatus,
                    $transactionStatus === 'expire' ? 'expired' : 'failed'
                );
                return response()->json(['ok']);
            }

            // keep acknowledged for non-final statuses like pending/challenge
            return response()->json(['ok']);
        } catch (\Throwable $e) {
            Log::error('Midtrans webhook exception: ' . $e->getMessage());
            // Respond 200 to avoid repeated retries, but surface logs
            return response()->json(['ok']);
        }
    }
}
