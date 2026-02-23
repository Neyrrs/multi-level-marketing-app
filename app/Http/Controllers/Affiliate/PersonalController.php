<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonalController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/personal-ro/index', [
                'personalCommissions' => [],
                'stats' => null,
            ]);
        }

        // Get personal commissions (direct sales)
        $query = Commission::where('affiliate_id', $affiliate->id)
            ->where('commission_type', 'personal')
            ->orWhere('depth_level', 1) // Level 1 = Direct
            ->with(['order', 'method'])
            ->orderBy('created_at', 'desc');

        $perPage = $request->get('perPage', 15);
        $commissions = $query->paginate($perPage);

        // Calculate stats
        $totalPersonal = Commission::where('affiliate_id', $affiliate->id)
            ->where('commission_type', 'personal')
            ->orWhere('depth_level', 1)
            ->sum('amount');

        $stats = [
            'totalPersonal' => (float)$totalPersonal,
            'totalVolume' => (float)$affiliate->total_personal_volume,
        ];

        return Inertia::render('affiliate/personal-ro/index', [
            'personalCommissions' => $commissions,
            'stats' => $stats,
        ]);
    }
}
