<?php

namespace App\Services;

use App\Models\Order;
use App\Services\ActivationService;
use App\Services\AffiliateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\CommissionService;

class OrderService
{
    protected ActivationService $activationService;
    protected AffiliateService $affiliateService;
    protected CommissionService $commissionService;

    public function __construct()
    {
        $this->activationService = new ActivationService();
        $this->affiliateService = new AffiliateService();
        $this->commissionService = new CommissionService();
    }

    public function createOrder(int $userId, int $packageId, ?int $affiliateId = null): Order
    {
        $order = Order::create([
            'order_number' => 'ORD-' . uniqid(),
            'user_id' => $userId,
            'affiliate_id' => $affiliateId,
            'payment_method' => 'midtrans_va',
            'midtrans_order_id' => 'MT-' . uniqid(),
            'product_type' => 'package',
            'product_id' => $packageId,
            'product_name' => 'package_' . $packageId,
            'quantity' => 1,
            'price' => 0,
            'total_amount' => 0,
            'shipping_cost' => 0,
            'tax_amount' => 0,
            'grand_total' => 0,
            'payment_status' => 'pending',
            'status' => 'pending',
            'generates_activation_code' => true,
        ]);

        return $order;
    }

    public function processPayment(int $orderId, ?Request $request = null): ?Order
    {
        $order = Order::find($orderId);
        if (!$order) return null;

        // cancelled order should never be marked paid again
        if ($order->status === 'cancelled') {
            Log::warning('Payment ignored because order already cancelled: ' . $order->id);
            return null;
        }

        // idempotent: if already paid, skip re-processing
        if ($order->payment_status === 'paid') {
            return $order;
        }

        // If request present, optionally verify signature (basic placeholder)
        if ($request) {
            if (!$this->verifyMidtransSignature($request)) {
                Log::warning('Midtrans signature verification failed for order ' . $order->id);
                return null;
            }
        }

        // Mark paid
        $order->update([
            'payment_status' => 'paid',
            'status' => 'processing',
            'paid_at' => now(),
        ]);

        // Attach activation code via ActivationService
        $this->activationService->generateFromOrder($order, 1);

        // trigger commission calculation via CommissionService
        $this->commissionService->calculateSponsorCommission($order);
        $this->commissionService->calculateLevelCommission($order);

        return $order;
    }

    public function cancelPendingOrder(int $orderId, string $reason = '', string $paymentStatus = 'failed'): ?Order
    {
        $order = Order::with('items.product')->find($orderId);
        if (!$order) {
            return null;
        }

        if ($order->payment_status !== 'pending' || $order->status === 'cancelled') {
            return $order;
        }

        if (!in_array($paymentStatus, ['failed', 'expired', 'pending', 'paid'], true)) {
            $paymentStatus = 'failed';
        }

        if ($paymentStatus === 'pending' || $paymentStatus === 'paid') {
            $paymentStatus = 'failed';
        }

        DB::transaction(function () use ($order, $reason, $paymentStatus) {
            foreach ($order->items as $item) {
                if ($item->product_id && $item->product) {
                    $item->product->increment('stock', (int) $item->quantity);
                }
            }

            $noteSuffix = $reason !== '' ? " | {$reason}" : '';
            $existingNotes = $order->notes ?? '';

            $order->update([
                'payment_status' => $paymentStatus,
                'status' => 'cancelled',
                'notes' => trim($existingNotes . $noteSuffix),
            ]);
        });

        return $order->fresh();
    }

    public function completeOrder(int $orderId): ?Order
    {
        $order = Order::find($orderId);
        if (!$order) return null;
        $order->update(['status' => 'completed']);
        return $order;
    }

    public function attachActivationCode(int $orderId): array
    {
        $order = Order::find($orderId);
        if (!$order) return [];

        $codes = [];
        // generate 1 code
        $acs = $this->activationService->generateFromOrder($order, 1);
        foreach ($acs as $c) {
            $codes[] = $c->code;
        }

        $order->update(['activation_codes_count' => count($codes)]);

        return $codes;
    }

    /**
     * Basic placeholder for verifying Midtrans signature.
     * Replace with real signature verification using Midtrans server key.
     */
    public function verifyMidtransSignature(Request $request): bool
    {
        $serverKey = config('services.midtrans.server_key')
            ?? config('midtans.server_key')
            ?? env('MIDTRANS_SERVER_KEY');
        if (empty($serverKey)) {
            Log::warning('Midtrans server key not configured');
            return false;
        }

        $orderId = $request->input('order_id') ?? $request->input('order_id');
        $statusCode = $request->input('status_code');
        $grossAmount = $request->input('gross_amount');
        $signature = $request->input('signature_key') ?? $request->input('signature');

        if (!$orderId || !$statusCode || !$grossAmount || !$signature) {
            Log::warning('Midtrans webhook missing required fields');
            return false;
        }

        $expected = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        return hash_equals($expected, $signature);
    }
}
