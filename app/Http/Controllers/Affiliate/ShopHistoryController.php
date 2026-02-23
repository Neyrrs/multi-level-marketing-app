<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopHistoryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Get orders where user is buyer
        $query = Order::where('user_id', $user->id)
            ->with(['items', 'affiliate'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('order_number', 'like', "%{$search}%");
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $perPage = $request->get('perPage', 10);
        $orders = $query->paginate($perPage);

        // Transform data for frontend
        $orders->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'order_number' => $item->order_number,
                'date' => $item->created_at->format('Y-m-d H:i'),
                'total' => (float)$item->grand_total,
                'status' => $item->status,
                'payment_status' => $item->payment_status,
                'items_count' => count($item->items ?? []),
                'seller' => $item->affiliate ? $item->affiliate->user->name : 'Unknown',
            ];
        });

        return Inertia::render('affiliate/shop-history/index', [
            'orders' => $orders,
        ]);
    }
}
