<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KomisiController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/komisi/index', [
                'commissions' => [],
                'stats' => null,
            ]);
        }

        // Get commissions with filters
        $query = Commission::where('affiliate_id', $affiliate->id)
            ->with(['order', 'method', 'rule'])
            ->orderBy('created_at', 'desc');

        // Filter by status if provided
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by date range if provided
        if ($request->has('month')) {
            $month = $request->month;
            $query->whereMonth('created_at', $month);
        }

        $perPage = $request->get('perPage', 15);
        $commissions = $query->paginate($perPage);

        // Calculate stats
        $pending = Commission::where('affiliate_id', $affiliate->id)
            ->where('status', 'pending')
            ->sum('amount');
        $approved = Commission::where('affiliate_id', $affiliate->id)
            ->where('status', 'approved')
            ->sum('amount');
        $paid = Commission::where('affiliate_id', $affiliate->id)
            ->where('status', 'paid')
            ->sum('amount');

        $stats = [
            'pending' => (float)$pending,
            'approved' => (float)$approved,
            'paid' => (float)$paid,
            'total' => (float)($pending + $approved + $paid),
        ];

        return Inertia::render('affiliate/komisi/index', [
            'commissions' => $commissions,
            'stats' => $stats,
        ]);
    }
}
