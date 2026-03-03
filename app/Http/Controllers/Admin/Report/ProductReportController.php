<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));

        $itemsAgg = DB::table('order_items')
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->whereIn('orders.payment_status', ['paid', 'settlement', 'capture'])
            ->selectRaw('order_items.product_id as product_id, SUM(order_items.quantity) as sold_qty, SUM(order_items.harga_akhir * order_items.quantity) as revenue')
            ->whereNotNull('order_items.product_id')
            ->groupBy('order_items.product_id')
            ->get()
            ->keyBy('product_id');

        $ordersAgg = DB::table('orders')
            ->whereIn('payment_status', ['paid', 'settlement', 'capture'])
            ->whereNotNull('product_id')
            ->selectRaw('product_id, SUM(quantity) as sold_qty, SUM(grand_total) as revenue')
            ->groupBy('product_id')
            ->get()
            ->keyBy('product_id');

        $query = Product::query()->orderBy('name');
        if ($search !== '') {
            $query->where('name', 'like', "%{$search}%");
        }

        $products = $query->get();

        $rows = $products->map(function ($product) use ($itemsAgg, $ordersAgg) {
            $fromItems = $itemsAgg->get($product->id);
            $fromOrders = $ordersAgg->get($product->id);

            $sold = (int) (($fromItems->sold_qty ?? 0) + ($fromOrders->sold_qty ?? 0));
            $revenue = (float) (($fromItems->revenue ?? 0) + ($fromOrders->revenue ?? 0));
            $stock = (int) ($product->stock ?? 0);
            $sisa = max(0, $stock);

            return [
                'id' => $product->id,
                'nama_produk' => $product->name,
                'stock' => $stock,
                'terjual' => $sold,
                'sisa' => $sisa,
                'harga' => (float) ($product->harga_akhir ?? $product->harga_awal ?? 0),
                'total_revenue' => $revenue,
            ];
        })->values();

        return Inertia::render('admin/LaporanProduk/index', [
            'products' => $rows,
            'filters' => [
                'search' => $search,
            ],
            'summary' => [
                'totalTerjual' => (int) $rows->sum('terjual'),
                'totalRevenue' => (float) $rows->sum('total_revenue'),
                'totalSku' => (int) $rows->count(),
            ],
        ]);
    }
}
