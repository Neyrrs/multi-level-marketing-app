<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use App\Models\CommissionLedger;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the finance dashboard with key metrics
     */
    public function index()
    {
        $today = now();
        $thisMonth = $today->month;
        $thisYear = $today->year;

        // Get overall financial stats in optimized queries
        $financialStats = DB::table('commission_ledgers')
            ->selectRaw("
                COUNT(CASE WHEN amount > 0 THEN 1 END) as total_transactions,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)::numeric as total_earned,
                SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END)::numeric as total_paid,
                AVG(CASE WHEN amount > 0 THEN amount END)::numeric as avg_commission
            ")
            ->first();

        // Monthly stats
        $monthlyStats = DB::table('commission_ledgers')
            ->selectRaw("
                COUNT(CASE WHEN amount > 0 THEN 1 END) as month_transactions,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)::numeric as month_earned,
                SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END)::numeric as month_paid
            ")
            ->whereRaw('EXTRACT(MONTH FROM created_at)::int = ?', [$thisMonth])
            ->whereRaw('EXTRACT(YEAR FROM created_at)::int = ?', [$thisYear])
            ->first();

        // Sales stats from paid orders
        $salesStats = DB::table('orders')
            ->selectRaw("
                COUNT(*) as total_orders,
                SUM(grand_total)::numeric as total_sales
            ")
            ->where('payment_status', 'paid')
            ->first();

        $monthlySalesStats = DB::table('orders')
            ->selectRaw("
                COUNT(*) as month_orders,
                SUM(grand_total)::numeric as month_sales
            ")
            ->where('payment_status', 'paid')
            ->whereRaw('EXTRACT(MONTH FROM COALESCE(paid_at, updated_at, created_at))::int = ?', [$thisMonth])
            ->whereRaw('EXTRACT(YEAR FROM COALESCE(paid_at, updated_at, created_at))::int = ?', [$thisYear])
            ->first();

        // Withdrawal stats
        $withdrawalStats = DB::table('withdrawals')
            ->selectRaw("
                COUNT(*) as total_withdrawals,
                SUM(CASE WHEN status IN ('pending', 'approved') THEN amount ELSE 0 END)::numeric as pending_amount,
                SUM(CASE WHEN status = 'processed' THEN amount ELSE 0 END)::numeric as processed_amount,
                COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count
            ")
            ->first();

        // Commission breakdown by type
        $commissionByType = DB::table('commission_ledgers')
            ->selectRaw('type, COUNT(*) as count, SUM(amount)::numeric as total')
            ->where('amount', '>', 0)
            ->where('type', '!=', 'adjustment')
            ->groupBy('type')
            ->orderBy('total', 'desc')
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'type' => $item->type ?? 'Unknown',
                'count' => $item->count,
                'total' => $item->total ?? 0,
            ]);

        // Recent withdrawals
        $recentWithdrawals = Withdrawal::select([
            'id', 'withdrawal_number', 'affiliate_id', 'amount', 'fee', 
            'net_amount', 'status', 'created_at', 'processed_at'
        ])
            ->with(['affiliate.user:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($withdrawal) => [
                'id' => $withdrawal->id,
                'withdrawal_number' => $withdrawal->withdrawal_number,
                'affiliate' => $withdrawal->affiliate?->name ?? 'Unknown',
                'amount' => number_format($withdrawal->amount, 2, ',', '.'),
                'fee' => number_format($withdrawal->fee, 2, ',', '.'),
                'net_amount' => number_format($withdrawal->net_amount, 2, ',', '.'),
                'status' => $withdrawal->status,
                'created_at' => $withdrawal->created_at->format('Y-m-d H:i'),
                'processed_at' => $withdrawal->processed_at?->format('Y-m-d H:i') ?? '-',
            ]);

        // Top affiliate earners this month
        $topAffiliates = DB::table('commission_ledgers')
            ->leftJoin('affiliates', 'commission_ledgers.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw('
                users.id,
                users.name,
                COUNT(*) as transaction_count,
                SUM(CASE WHEN commission_ledgers.amount > 0 THEN commission_ledgers.amount ELSE 0 END)::numeric as earned
            ')
            ->whereRaw('EXTRACT(MONTH FROM commission_ledgers.created_at)::int = ?', [$thisMonth])
            ->whereRaw('EXTRACT(YEAR FROM commission_ledgers.created_at)::int = ?', [$thisYear])
            ->where('commission_ledgers.amount', '>', 0)
            ->groupBy('users.id', 'users.name')
            ->orderBy('earned', 'desc')
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'name' => $item->name ?? 'Unknown',
                'transactions' => $item->transaction_count,
                'earned' => number_format($item->earned ?? 0, 2, ',', '.'),
            ]);

        // Withdrawal status breakdown
        $withdrawalStatus = DB::table('withdrawals')
            ->selectRaw('status, COUNT(*) as count, SUM(amount)::numeric as total')
            ->groupBy('status')
            ->get()
            ->map(fn($item) => [
                'status' => $item->status,
                'count' => $item->count,
                'total' => $item->total ?? 0,
            ]);

        return Inertia::render('finance/dashboard', [
            'stats' => [
                'totalTransactions' => $financialStats->total_transactions ?? 0,
                'totalEarned' => number_format($financialStats->total_earned ?? 0, 2, ',', '.'),
                'totalPaid' => number_format($financialStats->total_paid ?? 0, 2, ',', '.'),
                'avgCommission' => number_format($financialStats->avg_commission ?? 0, 2, ',', '.'),
                'monthTransactions' => $monthlyStats->month_transactions ?? 0,
                'monthEarned' => number_format($monthlyStats->month_earned ?? 0, 2, ',', '.'),
                'monthPaid' => number_format($monthlyStats->month_paid ?? 0, 2, ',', '.'),
                'totalOrders' => $salesStats->total_orders ?? 0,
                'totalSales' => number_format($salesStats->total_sales ?? 0, 2, ',', '.'),
                'monthOrders' => $monthlySalesStats->month_orders ?? 0,
                'monthSales' => number_format($monthlySalesStats->month_sales ?? 0, 2, ',', '.'),
            ],
            'withdrawals' => [
                'totalCount' => $withdrawalStats->total_withdrawals ?? 0,
                'pendingAmount' => number_format($withdrawalStats->pending_amount ?? 0, 2, ',', '.'),
                'processedAmount' => number_format($withdrawalStats->processed_amount ?? 0, 2, ',', '.'),
                'pendingCount' => $withdrawalStats->pending_count ?? 0,
            ],
            'commissionByType' => $commissionByType,
            'recentWithdrawals' => $recentWithdrawals,
            'topAffiliates' => $topAffiliates,
            'withdrawalStatus' => $withdrawalStatus,
        ]);
    }
}
