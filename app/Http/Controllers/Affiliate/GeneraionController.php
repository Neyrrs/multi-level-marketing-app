<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneraionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/generation-ro/index', [
                'generationCommissions' => [],
                'stats' => null,
            ]);
        }

        // Get generation/level commissions (depth-based)
        $query = Commission::where('affiliate_id', $affiliate->id)
            ->where('commission_type', 'level')
            ->orWhere('depth_level', '>', 1) // Level > 1 = Generation
            ->with(['order', 'method'])
            ->orderBy('depth_level', 'asc')
            ->orderBy('created_at', 'desc');

        $perPage = $request->get('perPage', 15);
        $commissions = $query->paginate($perPage);

        // Transform data to show by level
        $commissions->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'level' => $item->depth_level ?? 1,
                'amount' => (float)$item->amount,
                'order_number' => $item->order?->order_number,
                'status' => $item->status,
                'created_at' => $item->created_at->format('Y-m-d'),
            ];
        });

        // Calculate stats by depth level
        $byLevel = [];
        for ($i = 2; $i <= 5; $i++) {
            $byLevel[$i] = (float)Commission::where('affiliate_id', $affiliate->id)
                ->where('depth_level', $i)
                ->sum('amount');
        }

        $totalGeneration = Commission::where('affiliate_id', $affiliate->id)
            ->where('commission_type', 'level')
            ->orWhere('depth_level', '>', 1)
            ->sum('amount');

        $stats = [
            'totalGeneration' => (float)$totalGeneration,
            'byLevel' => $byLevel,
        ];

        return Inertia::render('affiliate/generation-ro/index', [
            'generationCommissions' => $commissions,
            'stats' => $stats,
        ]);
    }
}
