<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\MatchingHistory;
use App\Models\BinaryPayout;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/matching-bonus/index', [
                'matchingHistory' => [],
                'stats' => null,
            ]);
        }

        // Get matching bonus history from MatchingHistory joined with BinaryPayout
        $query = MatchingHistory::where('affiliate_id', $affiliate->id)
            ->orderBy('created_at', 'desc');

        // Filter by date
        if ($request->has('month')) {
            $month = $request->month;
            $query->whereMonth('created_at', $month);
        }

        $perPage = $request->get('perPage', 15);
        $matchingHistory = $query->paginate($perPage);

        // Transform data for frontend
        $matchingHistory->getCollection()->transform(function ($item) {
            // Calculate bonus per pair (default: 5000 per pair based on CommissionService)
            $bonusPerPair = 5000;
            $totalBonus = $item->matched_pair * $bonusPerPair;

            return [
                'id' => $item->id,
                'period' => $item->created_at->format('Y-m'),
                'left_volume' => (float)$item->left_volume,
                'right_volume' => (float)$item->right_volume,
                'pair_count' => $item->matched_pair,
                'bonus' => (float)$totalBonus,
                'status' => 'completed',
                'created_at' => $item->created_at->format('Y-m-d'),
            ];
        });

        // Calculate total matching bonus from BinaryPayout
        $totalMatching = BinaryPayout::where('affiliate_id', $affiliate->id)
            ->where('status', 'paid')
            ->sum('amount_total');
        $thisMonth = BinaryPayout::where('affiliate_id', $affiliate->id)
            ->where('status', 'paid')
            ->whereMonth('paid_at', now()->month)
            ->sum('amount_total');

        $stats = [
            'totalMatching' => (float)$totalMatching,
            'thisMonth' => (float)$thisMonth,
            'leftCount' => $affiliate->left_count,
            'rightCount' => $affiliate->right_count,
            'pairCount' => $affiliate->pair_count,
        ];

        return Inertia::render('affiliate/matching-bonus/index', [
            'matchingHistory' => $matchingHistory,
            'stats' => $stats,
        ]);
    }
}
