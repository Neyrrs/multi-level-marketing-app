<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Delivery Report
     */
    public function delivery(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->format('Y-m-d'));
        $courier = $request->input('courier', '');

        $query = Shipment::whereBetween('created_at', [$startDate, $endDate]);

        if ($courier) {
            $query->where('courier', $courier);
        }

        // Calculate statistics
        $totalShipments = $query->count();
        $deliveredCount = clone $query;
        $deliveredCount = $deliveredCount->where('status', 'delivered')->count();
        $pendingCount = clone $query;
        $pendingCount = $pendingCount->where('status', 'pending')->count();
        $shippedCount = clone $query;
        $shippedCount = $shippedCount->where('status', 'shipped')->count();

        $deliveryRate = $totalShipments > 0 ? round(($deliveredCount / $totalShipments) * 100, 2) : 0;

        // Get details
        $shipments = $query->with(['order', 'user', 'affiliate'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('logistik/reports/delivery', [
            'stats' => [
                'totalShipments' => $totalShipments,
                'deliveredCount' => $deliveredCount,
                'pendingCount' => $pendingCount,
                'shippedCount' => $shippedCount,
                'deliveryRate' => $deliveryRate,
            ],
            'shipments' => collect($shipments->items())->map(fn ($s) => [
                'id' => $s->id,
                'shipment_number' => $s->shipment_number,
                'tracking_number' => $s->tracking_number,
                'courier' => $s->courier,
                'status' => $s->status,
                'recipient_name' => $s->recipient_name,
                'shipped_date' => $s->shipped_date?->format('Y-m-d'),
                'actual_delivery_date' => $s->actual_delivery_date?->format('Y-m-d'),
                'user_name' => $s->user->name,
                'order_number' => $s->order->order_number,
            ]),
            'pagination' => [
                'total' => $shipments->total(),
                'currentPage' => $shipments->currentPage(),
                'hasMore' => $shipments->hasMorePages(),
            ],
            'startDate' => $startDate,
            'endDate' => $endDate,
            'courier' => $courier,
        ]);
    }

    /**
     * Shipment Report
     */
    public function shipment(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->format('Y-m-d'));

        // Get shipment statistics
        $byStatus = Shipment::selectRaw('status, count(*) as count')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('status')
            ->get()
            ->keyBy('status');

        $byCourier = Shipment::selectRaw('courier, count(*) as count')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('courier')
            ->get()
            ->keyBy('courier');

        // Top performing couriers (by delivery rate) - PostgreSQL compatible SQL
        $topCouriers = Shipment::selectRaw("
            courier,
            COUNT(*) as total,
            SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered,
            ROUND(SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as delivery_rate
        ")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('courier')
            ->havingRaw("COUNT(*) > 0")
            ->orderByRaw("ROUND(SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) DESC")
            ->limit(5)
            ->get();

        // Transform data with empty state handling
        $transformedTopCouriers = $topCouriers->count() > 0 
            ? $topCouriers->map(fn ($item) => [
                'courier' => $item->courier,
                'total' => $item->total ?? 0,
                'delivered' => $item->delivered ?? 0,
                'delivery_rate' => $item->delivery_rate ?? 0,
            ])->toArray()
            : [];

        return Inertia::render('logistik/reports/shipment', [
            'byStatus' => $byStatus->count() > 0
                ? $byStatus->map(fn ($item) => [
                    'status' => $item->status,
                    'count' => $item->count,
                ])->values()->toArray()
                : [],
            'byCourier' => $byCourier->count() > 0
                ? $byCourier->map(fn ($item) => [
                    'courier' => $item->courier,
                    'count' => $item->count,
                ])->values()->toArray()
                : [],
            'topCouriers' => $transformedTopCouriers,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'hasData' => Shipment::whereBetween('created_at', [$startDate, $endDate])->count() > 0,
        ]);
    }
}
