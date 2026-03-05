<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\ActivationCode;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KodeController extends Controller
{
    public function __construct(private readonly OrderService $orderService)
    {
    }

    public function index(Request $request)
    {
        $user = $request->user();

        // Keep code list fresh even when webhook is delayed/missed in local.
        Order::where('user_id', $user->id)
            ->where('payment_method', 'midtrans_snap')
            ->where('payment_status', 'pending')
            ->where('status', 'pending')
            ->latest('id')
            ->limit(20)
            ->get()
            ->each(fn (Order $order) => $this->orderService->syncMidtransStatus($order));

        // Get activation codes owned by this user
        $query = ActivationCode::where('owner_id', $user->id)
            ->with(['product', 'package'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('code', 'like', "%{$search}%");
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $perPage = $request->get('perPage', 10);
        $codes = $query->paginate($perPage);

        // Transform data for frontend
        $codes->getCollection()->transform(function ($item) {
            $productName = $item->product?->name
                ?? $item->package?->name
                ?? '-';

            return [
                'id' => $item->id,
                'code' => $item->code,
                'status' => $item->status,
                'product_name' => $productName,
                'created_at' => $item->created_at->format('Y-m-d H:i'),
                'used_at' => $item->used_at ? $item->used_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('affiliate/kode/index', [
            'codes' => $codes,
        ]);
    }
}
