<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\ActivationCode;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PinHistoryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/pin-history/index', [
                'history' => [],
            ]);
        }

        // Get activation codes that were generated from this affiliate's orders
        // and subsequently used by someone else
        $query = ActivationCode::where('owner_id', $user->id)
            ->where('status', 'used')
            ->with(['product'])
            ->orderBy('used_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('code', 'like', "%{$search}%");
        }

        $perPage = $request->get('perPage', 10);
        $history = $query->paginate($perPage);

        // Transform data for frontend
        $history->getCollection()->transform(function ($item) {
            $notes = (string) ($item->notes ?? '');
            $notesLower = strtolower($notes);
            $isRo = str_contains($notesLower, 'auto-used for ro') || str_contains($notesLower, 'ro redeemed');
            return [
                'id' => $item->id,
                'code' => $item->code,
                'product_name' => $item->product?->name ?? '-',
                'used_at' => $item->used_at ? $item->used_at->format('Y-m-d H:i') : null,
                'used_by_name' => $item->usedBy ? $item->usedBy->name : 'Unknown',
                'usage_purpose' => $isRo ? 'RO' : 'Redeem',
            ];
        });

        return Inertia::render('affiliate/pin-history/index', [
            'history' => $history,
        ]);
    }
}
