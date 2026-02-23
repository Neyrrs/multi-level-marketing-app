<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReturnController extends Controller
{
    /**
     * Display a listing of returned shipments
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status');
        $perPage = $request->query('per_page', 10);

        $query = Shipment::where('status', 'returned')
            ->with(['order', 'user', 'affiliate']);

        // Search by shipment number, tracking number, or recipient name
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('shipment_number', 'like', "%{$search}%")
                    ->orWhere('tracking_number', 'like', "%{$search}%")
                    ->orWhere('recipient_name', 'like', "%{$search}%");
            });
        }

        $returns = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Calculate return statistics
        $totalReturns = Shipment::where('status', 'returned')->count();
        $returnedThisMonth = Shipment::where('status', 'returned')
            ->whereYear('created_at', Carbon::now()->year)
            ->whereMonth('created_at', Carbon::now()->month)
            ->count();

        return Inertia::render('logistik/returns/index', [
            'returns' => collect($returns->items())->map(fn ($shipment) => [
                'id' => $shipment->id,
                'shipment_number' => $shipment->shipment_number,
                'tracking_number' => $shipment->tracking_number,
                'order_number' => $shipment->order?->order_number,
                'recipient_name' => $shipment->recipient_name,
                'courier' => $shipment->courier,
                'reason' => $shipment->notes ?? 'Tidak ada alasan',
                'created_at' => $shipment->created_at->format('Y-m-d H:i'),
                'actual_delivery_date' => $shipment->actual_delivery_date?->format('Y-m-d'),
                'user_name' => $shipment->user?->name,
                'status' => $shipment->status,
            ]),
            'stats' => [
                'totalReturns' => $totalReturns,
                'returnedThisMonth' => $returnedThisMonth,
                'returnRate' => $this->calculateReturnRate(),
            ],
            'pagination' => [
                'total' => $returns->total(),
                'currentPage' => $returns->currentPage(),
                'perPage' => $returns->perPage(),
                'lastPage' => $returns->lastPage(),
                'hasMore' => $returns->hasMorePages(),
            ],
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
     * Display the specified return (detailed view).
     */
    public function show(Shipment $return)
    {
        if ($return->status !== 'returned') {
            abort(404);
        }

        $return->load(['order', 'user', 'affiliate', 'trackingHistories']);

        return Inertia::render('logistik/returns/show', [
            'return' => [
                'id' => $return->id,
                'shipment_number' => $return->shipment_number,
                'tracking_number' => $return->tracking_number,
                'order' => $return->order ? [
                    'id' => $return->order->id,
                    'order_number' => $return->order->order_number,
                    'total_amount' => (float) $return->order->total_amount,
                ] : null,
                'customer' => $return->user ? [
                    'id' => $return->user->id,
                    'name' => $return->user->name,
                    'email' => $return->user->email,
                    'phone' => $return->user->phone ?? '-',
                ] : null,
                'shipment_info' => [
                    'courier' => $return->courier,
                    'recipient_name' => $return->recipient_name,
                    'recipient_phone' => $return->recipient_phone,
                    'shipping_address' => $return->shipping_address,
                    'shipped_date' => $return->shipped_date?->format('Y-m-d H:i'),
                    'actual_delivery_date' => $return->actual_delivery_date?->format('Y-m-d H:i'),
                    'status' => $return->status,
                ],
                'return_reason' => $return->notes ?? 'Tidak ada informasi',
                'signature_received' => $return->signature_received,
                'receiver_name' => $return->receiver_name,
                'tracking_histories' => $return->trackingHistories->map(fn ($history) => [
                    'status' => $history->status,
                    'location' => $history->location ?? '-',
                    'description' => $history->description,
                    'tracked_at' => $history->tracked_at->format('Y-m-d H:i'),
                ]),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipment $return)
    {
        //
    }

    /**
     * Update the specified resource (e.g., process return, update status).
     */
    public function update(Request $request, Shipment $return)
    {
        if ($return->status !== 'returned') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya pengembalian dapat diperbarui',
            ], 422);
        }

        $validated = $request->validate([
            'return_status' => 'required|in:received,processing,approved,rejected,refunded',
            'notes' => 'nullable|string|max:500',
        ]);

        // Update notes if provided
        if (isset($validated['notes'])) {
            $return->update(['notes' => $validated['notes']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Status pengembalian berhasil diperbarui',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipment $return)
    {
        //
    }

    /**
     * Calculate return rate percentage
     */
    private function calculateReturnRate(): float
    {
        $totalShipments = Shipment::count();
        if ($totalShipments == 0) {
            return 0;
        }

        $totalReturns = Shipment::where('status', 'returned')->count();
        return round(($totalReturns / $totalShipments) * 100, 2);
    }
}
