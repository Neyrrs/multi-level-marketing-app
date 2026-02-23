<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NetworkController extends Controller
{
    /**
     * Display network/binary payouts and distributions
     */
    public function index(Request $request)
    {
        $startDate = $request->get('start_date') ? now()->parse($request->get('start_date')) : now()->subMonths(1);
        $endDate = $request->get('end_date') ? now()->parse($request->get('end_date')) : now();

        // Binary commission by affiliate
        $binaryPayouts = DB::table('binary_payouts')
            ->leftJoin('affiliates', 'binary_payouts.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw('
                users.id,
                users.name,
                COUNT(*) as payout_count,
                SUM(binary_payouts.payout_amount)::numeric as total_amount,
                MAX(binary_payouts.created_at) as last_payout
            ')
            ->whereBetween('binary_payouts.created_at', [$startDate, $endDate])
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_amount', 'desc')
            ->take(20)
            ->get()
            ->map(fn($item) => [
                'name' => $item->name ?? 'Unknown',
                'user_id' => $item->id,
                'payouts' => $item->payout_count,
                'amount' => number_format($item->total_amount ?? 0, 2, ',', '.'),
                'last_payout' => $item->last_payout ? now()->parse($item->last_payout)->format('Y-m-d H:i') : '-',
            ]);

        // Matching bonus by affiliate
        $matchingPayouts = DB::table('matching_histories')
            ->leftJoin('affiliates', 'matching_histories.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw('
                users.id,
                users.name,
                COUNT(*) as bonus_count,
                SUM(matching_histories.commission_amount)::numeric as total_amount,
                MAX(matching_histories.created_at) as last_bonus
            ')
            ->whereBetween('matching_histories.created_at', [$startDate, $endDate])
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_amount', 'desc')
            ->take(20)
            ->get()
            ->map(fn($item) => [
                'name' => $item->name ?? 'Unknown',
                'user_id' => $item->id,
                'bonuses' => $item->bonus_count,
                'amount' => number_format($item->total_amount ?? 0, 2, ',', '.'),
                'last_bonus' => $item->last_bonus ? now()->parse($item->last_bonus)->format('Y-m-d H:i') : '-',
            ]);

        // Summary statistics
        $binarySummary = DB::table('binary_payouts')
            ->selectRaw('
                COUNT(*) as count,
                SUM(payout_amount)::numeric as total
            ')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->first();

        $matchingSummary = DB::table('matching_histories')
            ->selectRaw('
                COUNT(*) as count,
                SUM(commission_amount)::numeric as total
            ')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->first();

        // Top earners from network
        $topNetworkEarners = DB::table('commission_ledgers')
            ->leftJoin('affiliates', 'commission_ledgers.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw('
                users.id,
                users.name,
                COUNT(*) as commissions,
                SUM(CASE WHEN commission_ledgers.amount > 0 THEN commission_ledgers.amount ELSE 0 END)::numeric as earned,
                SUM(CASE WHEN commission_ledgers.type IN (\'credit\') AND commission_ledgers.amount > 0 THEN commission_ledgers.amount ELSE 0 END)::numeric as network_earned
            ')
            ->whereBetween('commission_ledgers.created_at', [$startDate, $endDate])
            ->groupBy('users.id', 'users.name')
            ->orderBy('network_earned', 'desc')
            ->take(10)
            ->get()
            ->map(fn($item) => [
                'name' => $item->name ?? 'Unknown',
                'user_id' => $item->id,
                'commissions' => $item->commissions,
                'earned' => number_format($item->earned ?? 0, 2, ',', '.'),
                'network_earned' => number_format($item->network_earned ?? 0, 2, ',', '.'),
            ]);

        return Inertia::render('finance/network/index', [
            'binary_payouts' => $binaryPayouts,
            'matching_payouts' => $matchingPayouts,
            'summary' => [
                'binary_count' => $binarySummary->count ?? 0,
                'binary_total' => number_format($binarySummary->total ?? 0, 2, ',', '.'),
                'matching_count' => $matchingSummary->count ?? 0,
                'matching_total' => number_format($matchingSummary->total ?? 0, 2, ',', '.'),
            ],
            'top_earners' => $topNetworkEarners,
            'filters' => [
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date'),
            ],
        ]);
    }
}
