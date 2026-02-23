<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use App\Models\ShipmentTracking;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentController extends Controller
{
    /**
     * Display a listing of shipments
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', '');
        $perPage = (int) $request->input('per_page', 10);

        // ✅ OPTIMIZED: Selective eager loading - only load needed columns
        $query = Shipment::select(['id', 'shipment_number', 'tracking_number', 'courier', 'status', 'recipient_name', 'created_at', 'order_id', 'user_id', 'affiliate_id'])
            ->with([
                'order:id,order_number',   // Only needed columns
                'user:id,name,email'
            ]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('shipment_number', 'like', "%{$search}%")
                    ->orWhere('tracking_number', 'like', "%{$search}%")
                    ->orWhere('recipient_name', 'like', "%{$search}%");
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        $shipments = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return Inertia::render('logistik/shipments/index', [
            'shipments' => $shipments->items(),
            'pagination' => [
                'total' => $shipments->total(),
                'currentPage' => $shipments->currentPage(),
                'perPage' => $shipments->perPage(),
                'lastPage' => $shipments->lastPage(),
                'hasMore' => $shipments->hasMorePages(),
            ],
            'search' => $search,
            'status' => $status,
        ]);
    }

    /**
     * Create a new shipment (from order)
     */
    public function create(Request $request)
    {
        $orderId = $request->input('order_id');
        $order = Order::with(['user', 'affiliate', 'items'])->findOrFail($orderId);

        return Inertia::render('logistik/shipments/create', [
            'order' => $order,
            'couriers' => $this->getCourierList(),
        ]);
    }

    /**
     * Store a new shipment
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'courier' => 'required|string',
            'recipient_name' => 'required|string|max:255',
            'recipient_phone' => 'required|string|max:20',
            'estimated_delivery' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $order = Order::findOrFail($validated['order_id']);
        $shipmentNumber = $this->generateShipmentNumber();

        $shipment = Shipment::create([
            'shipment_number' => $shipmentNumber,
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'affiliate_id' => $order->affiliate_id,
            'courier' => $validated['courier'],
            'recipient_name' => $validated['recipient_name'],
            'recipient_phone' => $validated['recipient_phone'],
            'shipping_address' => $order->shipping_data ?? [],
            'status' => 'pending',
            'estimated_delivery' => $validated['estimated_delivery'],
            'notes' => $validated['notes'],
        ]);

        return response()->json([
            'success' => true,
            'shipment' => $shipment,
            'message' => 'Shipment berhasil dibuat'
        ], 201);
    }

    /**
     * Show shipment details
     */
    public function show(Shipment $shipment)
    {
        $shipment->load(['order', 'user', 'affiliate', 'trackingHistories']);

        return Inertia::render('logistik/shipments/show', [
            'shipment' => [
                'id' => $shipment->id,
                'shipment_number' => $shipment->shipment_number,
                'tracking_number' => $shipment->tracking_number,
                'courier' => $shipment->courier,
                'status' => $shipment->status,
                'recipient_name' => $shipment->recipient_name,
                'recipient_phone' => $shipment->recipient_phone,
                'shipping_address' => $shipment->shipping_address,
                'shipped_date' => $shipment->shipped_date?->format('Y-m-d H:i'),
                'estimated_delivery' => $shipment->estimated_delivery?->format('Y-m-d'),
                'actual_delivery_date' => $shipment->actual_delivery_date?->format('Y-m-d H:i'),
                'receiver_name' => $shipment->receiver_name,
                'signature_received' => $shipment->signature_received,
                'notes' => $shipment->notes,
                'created_at' => $shipment->created_at->format('Y-m-d H:i'),
                'order' => [
                    'id' => $shipment->order->id,
                    'order_number' => $shipment->order->order_number,
                    'total_amount' => (float) $shipment->order->total_amount,
                    'status' => $shipment->order->status,
                ],
                'user' => [
                    'name' => $shipment->user->name,
                    'email' => $shipment->user->email,
                ],
                'affiliate' => $shipment->affiliate ? [
                    'username' => $shipment->affiliate->username,
                    'name' => $shipment->affiliate->user->name ?? '-',
                ] : null,
                'trackingHistories' => $shipment->trackingHistories->map(fn ($h) => [
                    'id' => $h->id,
                    'status' => $h->status,
                    'location' => $h->location,
                    'description' => $h->description,
                    'tracked_at' => $h->tracked_at->format('Y-m-d H:i'),
                ])->toArray(),
            ],
        ]);
    }

    /**
     * Edit shipment
     */
    public function edit(Shipment $shipment)
    {
        $shipment->load('order');

        return Inertia::render('logistik/shipments/edit', [
            'shipment' => $shipment,
            'couriers' => $this->getCourierList(),
        ]);
    }

    /**
     * Update shipment
     */
    public function update(Request $request, Shipment $shipment)
    {
        // Prevent updating if already shipped
        if ($shipment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Pengiriman tidak dapat diubah apabila sudah di-kirim'
            ], 403);
        }

        $validated = $request->validate([
            'courier' => 'required|string',
            'recipient_name' => 'required|string|max:255',
            'recipient_phone' => 'required|string|max:20',
            'estimated_delivery' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $shipment->update($validated);

        return response()->json([
            'success' => true,
            'shipment' => $shipment,
            'message' => 'Shipment berhasil diperbarui'
        ]);
    }

    /**
     * Input tracking number dan mark as shipped
     */
    public function markAsShipped(Request $request, Shipment $shipment)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string|unique:shipments,tracking_number,' . $shipment->id,
            'courier' => 'required|string',
        ]);

        $shipment->markAsShipped(
            $validated['tracking_number'],
            $validated['courier']
        );

        // Add tracking history
        ShipmentTracking::create([
            'shipment_id' => $shipment->id,
            'status' => 'picked_up',
            'location' => '-',
            'description' => 'Paket berhasil diambil dan dikirim ke kurir',
            'tracked_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'shipment' => $shipment,
            'message' => 'Pengiriman berhasil diperbarui dengan resi: ' . $validated['tracking_number']
        ]);
    }

    /**
     * Input delivery confirmation
     */
    public function markAsDelivered(Request $request, Shipment $shipment)
    {
        $validated = $request->validate([
            'receiver_name' => 'required|string|max:255',
            'signature_received' => 'boolean',
        ]);

        $shipment->markAsDelivered(
            $validated['receiver_name'],
            $validated['signature_received'] ?? true
        );

        // Add tracking history
        ShipmentTracking::create([
            'shipment_id' => $shipment->id,
            'status' => 'delivered',
            'location' => '-',
            'description' => 'Paket diterima oleh ' . $validated['receiver_name'],
            'tracked_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'shipment' => $shipment,
            'message' => 'Pengiriman berhasil dikonfirmasi'
        ]);
    }

    /**
     * Add tracking history
     */
    public function addTracking(Request $request, Shipment $shipment)
    {
        $validated = $request->validate([
            'status' => 'required|in:processing,picked_up,in_transit,out_for_delivery,delivered,failed_attempt',
            'location' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);

        $tracking = ShipmentTracking::create([
            'shipment_id' => $shipment->id,
            'status' => $validated['status'],
            'location' => $validated['location'],
            'description' => $validated['description'],
            'tracked_at' => now(),
        ]);

        // Update shipment status if needed
        if (in_array($validated['status'], ['out_for_delivery', 'delivered'])) {
            $shipment->update(['status' => $validated['status']]);
        }

        return response()->json([
            'success' => true,
            'tracking' => $tracking,
            'message' => 'Tracking berhasil ditambahkan'
        ]);
    }

    /**
     * Delete / Cancel shipment (only if pending)
     */
    public function destroy(Shipment $shipment)
    {
        if ($shipment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya pengiriman dengan status pending yang dapat dihapus'
            ], 403);
        }

        $shipment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Shipment berhasil dihapus'
        ]);
    }

    /**
     * Get list of available couriers
     */
    private function getCourierList()
    {
        return [
            'JNE' => 'JNE',
            'GRAB' => 'Grab',
            'GOJEK' => 'Gojek',
            'POS' => 'Pos Indonesia',
            'TIKI' => 'TIKI',
            'EXPEDISI' => 'Expedisi',
            'NINJA' => 'Ninja',
            'OTHER' => 'Kurir Lainnya',
        ];
    }

    /**
     * Generate unique shipment number
     */
    private function generateShipmentNumber()
    {
        $prefix = 'SHP-' . date('Ymd');
        $count = Shipment::where('shipment_number', 'like', $prefix . '%')->count() + 1;
        return $prefix . '-' . str_pad($count, 5, '0', STR_PAD_LEFT);
    }
}
