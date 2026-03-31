<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Commission;
use App\Models\CommissionLedger;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);

        $startDateInput = $validated['start_date'] ?? now()->toDateString();
        $endDateInput = $validated['end_date'] ?? now()->toDateString();

        $startDate = Carbon::parse($startDateInput)->startOfDay();
        $endDate = Carbon::parse($endDateInput)->endOfDay();

        $totalUsers = User::query()->count();
        $totalActiveAffiliates = Affiliate::query()->where('is_active', true)->count();

        $totalOrdersToday = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $todayRevenue = (float) Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->sum('grand_total');

        $totalCalculatedCommission = (float) Commission::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('amount');

        $totalPaidCommission = (float) CommissionLedger::query()
            ->where('type', 'debit')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('amount');

        $totalPendingCommission = (float) Commission::query()
            ->whereIn('status', ['pending', 'calculated', 'approved'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('amount');

        return Inertia::render('admin/dashboard', [
            'metrics' => [
                'totalUsers' => $totalUsers,
                'totalActiveAffiliates' => $totalActiveAffiliates,
                'totalOrdersToday' => $totalOrdersToday,
                'todayRevenue' => $todayRevenue,
                'totalCalculatedCommission' => $totalCalculatedCommission,
                'totalPaidCommission' => abs($totalPaidCommission),
                'totalPendingCommission' => $totalPendingCommission,
            ],
            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ],
            'periodLabel' => $startDate->toDateString() === $endDate->toDateString()
                ? $startDate->translatedFormat('d M Y')
                : $startDate->translatedFormat('d M Y') . ' - ' . $endDate->translatedFormat('d M Y'),
        ]);
    }
}
