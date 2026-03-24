<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Calculate statistics for this month
        $thisMonth = now()->month;
        $thisYear = now()->year;

        // Total orders waiting to be shipped
        $ordersAwaitingShipment = Order::where('payment_status', 'paid')
            ->where('status', 'processing')
            ->whereDoesntHave('shipments')
            ->count();

        // Total active shipments
        $activeShipments = Shipment::whereIn('status', ['pending', 'ready_to_ship', 'shipped', 'in_transit'])
            ->count();

        // Total delivered this month
        $deliveredThisMonth = Shipment::where('status', 'delivered')
            ->whereMonth('actual_delivery_date', $thisMonth)
            ->whereYear('actual_delivery_date', $thisYear)
            ->count();

        // Total shipments created this month
        $shipmentsThisMonth = Shipment::whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->count();

        // Shipments by courier
        $shipmentsByCourier = Shipment::selectRaw('courier, COUNT(*) as count')
            ->whereIn('status', ['shipped', 'in_transit', 'delivered'])
            ->groupBy('courier')
            ->take(5)
            ->get()
            ->map(fn ($item) => [
                'courier' => $item->courier,
                'count' => $item->count,
            ]);

        // Recent shipments
        $recentShipments = Shipment::with(['order', 'user'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn ($shipment) => [
                'id' => $shipment->id,
                'shipment_number' => $shipment->shipment_number,
                'tracking_number' => $shipment->tracking_number,
                'courier' => $shipment->courier,
                'status' => $shipment->status,
                'recipient_name' => $shipment->recipient_name,
                'order_number' => $shipment->order->order_number,
                'created_at' => $shipment->created_at->format('Y-m-d H:i'),
            ]);

        // Shipment status distribution
        $statusDistribution = Shipment::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->map(fn ($item) => [
                'status' => $item->status,
                'count' => $item->count,
            ]);

        // Delivery success rate this month
        $totalShipmentsMonth = Shipment::whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->count();
        $deliverySuccessRate = $totalShipmentsMonth > 0 
            ? round(($deliveredThisMonth / $totalShipmentsMonth) * 100, 2)
            : 0;

        return Inertia::render('logistik/dashboard', [
            'stats' => [
                'ordersAwaitingShipment' => $ordersAwaitingShipment,
                'activeShipments' => $activeShipments,
                'deliveredThisMonth' => $deliveredThisMonth,
                'shipmentsThisMonth' => $shipmentsThisMonth,
                'deliverySuccessRate' => $deliverySuccessRate,
            ],
            'shipmentsByCourier' => $shipmentsByCourier,
            'recentShipments' => $recentShipments,
            'statusDistribution' => $statusDistribution,
        ]);
    }
}
