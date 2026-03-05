<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopHistoryController extends Controller
{
    public function __construct(private readonly OrderService $orderService)
    {
    }

    public function index(Request $request)
    {
        $user = $request->user();

        Order::where('user_id', $user->id)
            ->where('payment_method', 'midtrans_snap')
            ->where('payment_status', 'pending')
            ->where('status', 'pending')
            ->latest('id')
            ->limit(20)
            ->get()
            ->each(fn (Order $order) => $this->orderService->syncMidtransStatus($order));

        $query = Order::where('user_id', $user->id)
            ->with(['items', 'affiliate'])
            ->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $query->where('order_number', 'like', '%' . $request->string('search')->toString() . '%');
        }

        if ($request->filled('status') && $request->string('status')->toString() !== 'all') {
            $query->where('status', $request->string('status')->toString());
        }

        $allowedPerPage = [10, 25, 50, 100];
        $perPage = (int) $request->integer('perPage', 10);
        if (!in_array($perPage, $allowedPerPage, true)) {
            $perPage = 10;
        }

        $orders = $query->paginate($perPage)->withQueryString();
        $orders->getCollection()->transform(function (Order $item) {
            return [
                'id' => $item->id,
                'order_number' => $item->order_number,
                'created_at' => $item->created_at->toISOString(),
                'total_amount' => (float) $item->grand_total,
                'status' => $item->status,
                'payment_status' => $item->payment_status,
                'payment_method_label' => $this->resolvePaymentMethodLabel($item),
                'items_count' => count($item->items ?? []),
                'seller' => $item->affiliate?->user?->name ?? '-',
            ];
        });

        return Inertia::render('guest/shop-history/index', [
            'orders' => $orders,
        ]);
    }

    private function resolvePaymentMethodLabel(Order $order): string
    {
        $midtransData = is_array($order->midtrans_data) ? $order->midtrans_data : [];
        $paymentType = strtolower((string) ($midtransData['payment_type'] ?? ''));

        if ($paymentType === 'qris') {
            return 'QRIS';
        }

        if ($paymentType === 'bank_transfer') {
            $vaBank = strtoupper((string) data_get($midtransData, 'va_numbers.0.bank'));
            if ($vaBank !== '') {
                return $vaBank . ' VA';
            }

            if (!empty($midtransData['permata_va_number'])) {
                return 'PERMATA VA';
            }

            if (!empty($midtransData['bill_key']) || !empty($midtransData['biller_code'])) {
                return 'MANDIRI BILL';
            }

            return 'Bank Transfer';
        }

        if ($paymentType === 'echannel') {
            return 'Mandiri Bill';
        }

        if ($paymentType === 'cstore') {
            $store = strtoupper((string) ($midtransData['store'] ?? 'Convenience Store'));
            return $store;
        }

        if ($paymentType === 'gopay') {
            return 'GoPay';
        }

        if ($paymentType === 'shopeepay') {
            return 'ShopeePay';
        }

        $paymentMethod = strtolower((string) $order->payment_method);
        if ($paymentMethod === 'midtrans_snap') {
            return 'Midtrans';
        }

        if ($paymentMethod !== '') {
            return strtoupper(str_replace('_', ' ', $paymentMethod));
        }

        return '-';
    }
}

