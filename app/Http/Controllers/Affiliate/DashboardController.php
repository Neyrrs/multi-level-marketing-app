<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use App\Models\Order;
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
                'recentCommissions' => [],
                'networkStats' => null,
            ]);
        }

        // Calculate key statistics
        $thisMonth = now()->month;
        $thisYear = now()->year;

        // Total earnings this month
        $earningThisMonth = Commission::where('affiliate_id', $affiliate->id)
            ->where('status', 'paid')
            ->whereMonth('paid_at', $thisMonth)
            ->whereYear('paid_at', $thisYear)
            ->sum('amount');

        // Pending commission
        $pendingCommission = Commission::where('affiliate_id', $affiliate->id)
            ->where('status', 'pending')
            ->sum('amount');

        // Recent commission records (last 5)
        $recentCommissions = Commission::where('affiliate_id', $affiliate->id)
            ->with(['order', 'method'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'amount' => (float)$item->amount,
                    'type' => $item->commission_type,
                    'status' => $item->status,
                    'order_number' => $item->order?->order_number,
                    'created_at' => $item->created_at->format('Y-m-d H:i'),
                ];
            })
            ->toArray();

        // Network statistics
        $stats = [
            'totalDownline' => $affiliate->total_downline,
            'directDownline' => $affiliate->direct_downline,
            'leftCount' => $affiliate->left_count,
            'rightCount' => $affiliate->right_count,
            'totalVolume' => (float)$affiliate->total_volume,
            'totalPersonalVolume' => (float)$affiliate->total_personal_volume,
            'earningThisMonth' => (float)$earningThisMonth,
            'pendingCommission' => (float)$pendingCommission,
            'level' => $affiliate->level,
            'isActive' => $affiliate->is_active,
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
            'recentCommissions' => $recentCommissions,
            'binaryTree' => $binaryTree,
        ]);
    }
}
