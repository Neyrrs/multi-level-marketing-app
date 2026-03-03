<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));

        $query = Order::query()
            ->with('user:id,name')
            ->orderByDesc('created_at');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('product_name', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $orders = $query->paginate((int) $request->input('per_page', 20))->withQueryString();

        $salesData = $orders->getCollection()->map(function ($order) {
            $status = match ($order->payment_status) {
                'paid', 'settlement', 'capture' => 'completed',
                'pending' => 'pending',
                default => 'failed',
            };

            return [
                'id' => $order->id,
                'tanggal' => optional($order->paid_at ?? $order->created_at)->format('Y-m-d'),
                'nama_member' => $order->user?->name ?? 'Unknown',
                'produk' => $order->product_name ?? '-',
                'jumlah' => (int) ($order->quantity ?? 0),
                'harga' => (float) ($order->price ?? 0),
                'total' => (float) ($order->grand_total ?? 0),
                'status' => $status,
            ];
        })->values();

        $totalSales = Order::whereIn('payment_status', ['paid', 'settlement', 'capture'])->sum('grand_total');
        $totalTransactions = Order::count();
        $completedCount = Order::whereIn('payment_status', ['paid', 'settlement', 'capture'])->count();

        return Inertia::render('admin/LaporanPenjualan/index', [
            'salesData' => $salesData,
            'filters' => [
                'search' => $search,
            ],
            'summary' => [
                'totalSales' => (float) $totalSales,
                'totalTransactions' => (int) $totalTransactions,
                'completedCount' => (int) $completedCount,
            ],
            'pagination' => [
                'total' => $orders->total(),
                'currentPage' => $orders->currentPage(),
                'lastPage' => $orders->lastPage(),
                'perPage' => $orders->perPage(),
            ],
        ]);
    }
}
