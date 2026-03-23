<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use App\Models\CommissionLedger;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/dashboard', [
                'stats' => null,
                'latestCommission' => null,
                'networkStats' => null,
            ]);
        }

        // Calculate key statistics
        $thisMonth = now()->month;
        $thisYear = now()->year;

        // Commission totals from ledger (source of truth for credited commission)
        $totalCommissionReceived = CommissionLedger::where('affiliate_id', $affiliate->id)
            ->where('type', 'credit')
            ->sum('amount');

        $earningThisMonth = CommissionLedger::where('affiliate_id', $affiliate->id)
            ->where('type', 'credit')
            ->whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->sum('amount');

        // Pending commission that has not been paid/credited yet
        $pendingCommission = Commission::where('affiliate_id', $affiliate->id)
            ->whereIn('status', ['pending', 'calculated', 'approved'])
            ->sum('amount');

        $activeUntil = $affiliate->active_until
            ?? ($affiliate->activated_at ? $affiliate->activated_at->copy()->addMonth() : null);
        $activeRemainingDays = $activeUntil
            ? max(0, now()->diffInDays($activeUntil, false))
            : 0;

        $latestCreditLedger = CommissionLedger::query()
            ->where('affiliate_id', $affiliate->id)
            ->where('type', 'credit')
            ->latest('created_at')
            ->first();

        $latestCommission = $latestCreditLedger ? [
            'amount' => (float) $latestCreditLedger->amount,
            'created_at' => $latestCreditLedger->created_at?->format('Y-m-d H:i:s'),
            'description' => $latestCreditLedger->description,
            'reference' => $latestCreditLedger->reference,
        ] : null;

        // Network statistics
        $stats = [
            'totalDownline' => $affiliate->total_downline,
            'directDownline' => $affiliate->direct_downline,
            'leftCount' => $affiliate->left_count,
            'rightCount' => $affiliate->right_count,
            'totalVolume' => (float)$affiliate->total_volume,
            'totalPersonalVolume' => (float)$affiliate->total_personal_volume,
            'totalCommissionReceived' => (float)$totalCommissionReceived,
            'earningThisMonth' => (float)$earningThisMonth,
            'pendingCommission' => (float)$pendingCommission,
            'pairCount' => (int)$affiliate->pair_count,
            'level' => $affiliate->level,
            'isActive' => $affiliate->is_active,
            'activeUntil' => $activeUntil?->format('Y-m-d H:i:s'),
            'activeRemainingDays' => (int)$activeRemainingDays,
        ];

        // Binary tree visualization data
        $leftChild = Affiliate::where('upline_id', $user->id)
            ->where('position', 'left')
            ->first();
        $rightChild = Affiliate::where('upline_id', $user->id)
            ->where('position', 'right')
            ->first();

        $binaryTree = [
            'currentPosition' => $affiliate->position,
            'leftChild' => $leftChild ? [
                'name' => $leftChild->user->name,
                'username' => $leftChild->username,
                'isActive' => $leftChild->is_active,
            ] : null,
            'rightChild' => $rightChild ? [
                'name' => $rightChild->user->name,
                'username' => $rightChild->username,
                'isActive' => $rightChild->is_active,
            ] : null,
        ];

        return Inertia::render('affiliate/dashboard', [
            'stats' => $stats,
            'latestCommission' => $latestCommission,
            'binaryTree' => $binaryTree,
        ]);
    }
}
