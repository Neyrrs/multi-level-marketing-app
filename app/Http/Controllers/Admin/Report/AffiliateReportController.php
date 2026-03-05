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

        $query = Affiliate::with('user', 'sponsor')
            ->addSelect([
                'total_commission' => DB::table('commission_ledgers')
                    ->selectRaw('COALESCE(SUM(amount), 0)')
                    ->whereColumn('commission_ledgers.affiliate_id', 'affiliates.id'),
                'direct_downline_count' => DB::table('affiliates as child')
                    ->selectRaw('COUNT(*)')
                    ->whereColumn('child.sponsor_id', 'affiliates.user_id'),
            ]);
        if ($search) {
            $query->where('username', 'like', "%{$search}%")
                ->orWhereRelation('user', 'name', 'like', "%{$search}%");
        }

        $affiliates = $query->paginate($perPage);

        // Calculate statistics
        $totalAffiliates = Affiliate::count();
        $activeAffiliates = Affiliate::where('is_active', true)->count();
        $totalSalesVolume = Affiliate::sum('total_volume');
        $totalCommission = (float) DB::table('commission_ledgers')->sum('amount');

        $affiliateItems = collect($affiliates->items())->map(function ($item) {
            $storedTotal = (int) ($item->total_downline ?? 0);
            $directCount = (int) ($item->direct_downline_count ?? 0);
            $item->downline_count = max($storedTotal, $directCount);
            return $item;
        });

        return Inertia::render('admin/LaporanAffiliate/index', [
            'affiliates' => $affiliateItems->values()->all(),
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
