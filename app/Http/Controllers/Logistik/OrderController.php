<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders that need processing
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', '');
        $perPage = (int) $request->input('per_page', 10);

        // ✅ OPTIMIZED: Selective eager loading + withCount to avoid N+1
        $query = Order::select(['id', 'order_number', 'user_id', 'affiliate_id', 'status', 'payment_status', 'quantity', 'total_amount', 'created_at'])
            ->with([
                'user:id,name,email,phone',              // Only needed columns
                'user.profile:id,user_id,address',
                'affiliate:id,user_id'
            ])
            ->withCount('shipments')  // Use withCount instead of relationship count queries
            ->where('payment_status', 'paid')
            ->where(function ($q) {
                // Show orders that are pending, processing, or need shipping update
                $q->where('status', 'pending')
                    ->orWhere('status', 'processing')
                    ->orWhere('status', 'shipped');
            });

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return Inertia::render('logistik/orders/index', [
            'orders' => collect($orders->items())->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'user_name' => $order->user->name,
                'user_email' => $order->user->email,
                'user_phone' => $order->user->phone,
                'user_address' => $this->resolveOrderAddress($order),
                'affiliate_name' => $order->affiliate?->user->name ?? '-',
                'total_amount' => (float) $order->total_amount,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'quantity' => $order->quantity,
                'created_at' => $order->created_at->format('Y-m-d H:i'),
                'shipments_count' => $order->shipments_count,  // Use count from withCount
                'has_shipment' => $order->shipments_count > 0,  // Use count, not exists query
            ]),
            'pagination' => [
                'total' => $orders->total(),
                'currentPage' => $orders->currentPage(),
                'perPage' => $orders->perPage(),
                'lastPage' => $orders->lastPage(),
                'hasMore' => $orders->hasMorePages(),
            ],
            'search' => $search,
            'status' => $status,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'affiliate', 'items', 'shipments.trackingHistories']);

        return Inertia::render('logistik/orders/show', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total_amount' => (float) $order->total_amount,
                'shipping_cost' => (float) $order->shipping_cost,
                'tax_amount' => (float) $order->tax_amount,
                'grand_total' => (float) $order->grand_total,
                'payment_method' => $order->payment_method,
                'shipping_data' => $order->shipping_data,
                'created_at' => $order->created_at->format('Y-m-d H:i'),
                'paid_at' => $order->paid_at?->format('Y-m-d H:i'),
                'user' => [
                    'id' => $order->user->id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                    'phone' => $order->user->phone,
                    'address' => $this->resolveOrderAddress($order),
                ],
                'affiliate' => $order->affiliate ? [
                    'username' => $order->affiliate->username,
                    'name' => $order->affiliate->user->name,
                ] : null,
                'items' => $order->items->map(fn ($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'price' => (float) $item->price,
                    'total' => (float) $item->total,
                ])->toArray(),
                'shipments' => $order->shipments->map(fn ($shipment) => [
                    'id' => $shipment->id,
                    'shipment_number' => $shipment->shipment_number,
                    'tracking_number' => $shipment->tracking_number,
                    'courier' => $shipment->courier,
                    'status' => $shipment->status,
                    'shipped_date' => $shipment->shipped_date?->format('Y-m-d H:i'),
                    'estimated_delivery' => $shipment->estimated_delivery?->format('Y-m-d'),
                    'actual_delivery_date' => $shipment->actual_delivery_date?->format('Y-m-d H:i'),
                ])->toArray(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,completed,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'order' => $order,
            'message' => 'Order status berhasil diperbarui'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function resolveOrderAddress(Order $order): ?string
    {
        $shipping = $order->shipping_data;
        if (is_array($shipping) && !empty($shipping['address'])) {
            return (string) $shipping['address'];
        }

        $address = $order->user?->profile?->address;
        if (is_string($address) && trim($address) !== '') {
            return trim($address);
        }

        if (!is_array($address)) {
            return null;
        }

        if (!empty($address['full_address'])) {
            return (string) $address['full_address'];
        }

        $parts = array_filter([
            $address['street'] ?? null,
            $address['subdistrict'] ?? null,
            $address['district'] ?? null,
            $address['city'] ?? null,
            $address['province'] ?? null,
            $address['postal_code'] ?? null,
        ]);

        return !empty($parts) ? implode(', ', $parts) : null;
    }
}
