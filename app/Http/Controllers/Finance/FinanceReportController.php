<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FinanceReportController extends Controller
{
    /**
     * Display finance reports
     */
    public function index(Request $request)
    {
        $startDate = $request->get('start_date') ? now()->parse($request->get('start_date')) : now()->subMonths(1);
        $endDate = $request->get('end_date') ? now()->parse($request->get('end_date')) : now();

        // Commission earned by affiliate this month
        $affiliateCommissions = DB::table('commission_ledgers')
            ->leftJoin('affiliates', 'commission_ledgers.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw('
                users.id,
                users.name,
                COUNT(*) as transaction_count,
                SUM(CASE WHEN commission_ledgers.amount > 0 THEN commission_ledgers.amount ELSE 0 END)::numeric as earned,
                SUM(CASE WHEN commission_ledgers.amount < 0 THEN ABS(commission_ledgers.amount) ELSE 0 END)::numeric as paid
            ')
            ->whereBetween('commission_ledgers.created_at', [$startDate, $endDate])
            ->groupBy('users.id', 'users.name')
            ->orderBy('earned', 'desc')
            ->take(20)
            ->get()
            ->map(fn($item) => [
                'name' => $item->name ?? 'Unknown',
                'user_id' => $item->id,
                'transactions' => $item->transaction_count,
                'earned' => number_format($item->earned ?? 0, 2, ',', '.'),
                'paid' => number_format($item->paid ?? 0, 2, ',', '.'),
                'net' => number_format(($item->earned ?? 0) - ($item->paid ?? 0), 2, ',', '.'),
            ]);

        // Commission type breakdown
        $commissionTypeBreakdown = DB::table('commission_ledgers')
            ->selectRaw('
                type,
                COUNT(*) as count,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)::numeric as earned,
                SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END)::numeric as paid
            ')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('type')
            ->orderBy('earned', 'desc')
            ->get()
            ->map(fn($item) => [
                'type' => $item->type ?? 'Unknown',
                'count' => $item->count,
                'earned' => number_format($item->earned ?? 0, 2, ',', '.'),
                'paid' => number_format($item->paid ?? 0, 2, ',', '.'),
            ]);

        // Daily transaction summary
        $dailyTransactions = DB::table('commission_ledgers')
            ->selectRaw('
                DATE(created_at) as date,
                COUNT(*) as count,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)::numeric as earned,
                SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END)::numeric as paid
            ')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get()
            ->map(fn($item) => [
                'date' => $item->date,
                'count' => $item->count,
                'earned' => number_format($item->earned ?? 0, 2, ',', '.'),
                'paid' => number_format($item->paid ?? 0, 2, ',', '.'),
                'net' => number_format(($item->earned ?? 0) - ($item->paid ?? 0), 2, ',', '.'),
            ]);

        // Withdrawal statistics
        $withdrawalStats = DB::table('withdrawals')
            ->selectRaw('
                status,
                COUNT(*) as count,
                SUM(amount)::numeric as total_amount,
                AVG(net_amount)::numeric as avg_net
            ')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('status')
            ->get()
            ->map(fn($item) => [
                'status' => $item->status,
                'count' => $item->count,
                'total' => number_format($item->total_amount ?? 0, 2, ',', '.'),
                'avg_net' => number_format($item->avg_net ?? 0, 2, ',', '.'),
            ]);

        // Summary totals
        $commissionSummary = DB::table('commission_ledgers')
            ->selectRaw('
                COUNT(*) as total_transactions,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)::numeric as total_earned,
                SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END)::numeric as total_paid
            ')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->first();

        $salesSummary = DB::table('orders')
            ->selectRaw('
                COUNT(*) as total_orders,
                SUM(grand_total)::numeric as total_sales
            ')
            ->where('payment_status', 'paid')
            ->whereBetween(DB::raw('COALESCE(paid_at, updated_at, created_at)'), [$startDate, $endDate])
            ->first();

        return Inertia::render('finance/reports/index', [
            'summary' => [
                'total_transactions' => ($commissionSummary->total_transactions ?? 0) + ($salesSummary->total_orders ?? 0),
                'total_earned' => number_format($commissionSummary->total_earned ?? 0, 2, ',', '.'),
                'total_paid' => number_format($commissionSummary->total_paid ?? 0, 2, ',', '.'),
                'net_total' => number_format(($commissionSummary->total_earned ?? 0) - ($commissionSummary->total_paid ?? 0), 2, ',', '.'),
                'total_orders' => (int) ($salesSummary->total_orders ?? 0),
                'total_sales' => number_format($salesSummary->total_sales ?? 0, 2, ',', '.'),
            ],
            'affiliate_commissions' => $affiliateCommissions,
            'commission_breakdown' => $commissionTypeBreakdown,
            'daily_transactions' => $dailyTransactions,
            'withdrawal_stats' => $withdrawalStats,
            'filters' => [
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date'),
            ],
        ]);
    }
}
