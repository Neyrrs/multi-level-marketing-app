<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AffiliateReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = (int) $request->input('per_page', 15);

        $query = Affiliate::with('user', 'sponsor');
        if ($search) {
            $query->where('username', 'like', "%{$search}%")
                ->orWhereRelation('user', 'name', 'like', "%{$search}%");
        }

        $affiliates = $query->paginate($perPage);

        // Calculate statistics
        $totalAffiliates = Affiliate::count();
        $activeAffiliates = Affiliate::where('is_active', true)->count();
        $totalSalesVolume = Affiliate::sum('total_volume');
        $totalCommission = Affiliate::sum(
            DB::raw("(SELECT SUM(amount) FROM commission_ledgers WHERE affiliate_id = affiliates.id)")
        ) ?? 0;

        return Inertia::render('admin/LaporanAffiliate/index', [
            'affiliates' => $affiliates->items(),
            'pagination' => [
                'total' => $affiliates->total(),
                'currentPage' => $affiliates->currentPage(),
                'perPage' => $affiliates->perPage(),
                'lastPage' => $affiliates->lastPage(),
                'hasMore' => $affiliates->hasMorePages(),
            ],
            'search' => $search,
            'statistics' => [
                'totalAffiliates' => $totalAffiliates,
                'activeAffiliates' => $activeAffiliates,
                'totalSalesVolume' => $totalSalesVolume,
                'totalCommission' => $totalCommission,
            ],
        ]);
    }
}
