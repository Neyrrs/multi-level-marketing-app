<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Services\AffiliateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliatesController extends Controller
{
    protected AffiliateService $service;

    public function __construct()
    {
        $this->service = new AffiliateService();
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = (int) $request->input('per_page', 10);

        $query = Affiliate::with('user', 'sponsor');
        if ($search) {
            $query->where('username', 'like', "%{$search}%")
                ->orWhereRelation('user', 'name', 'like', "%{$search}%");
        }

        $affiliates = $query->paginate($perPage);

        return Inertia::render('admin/affiliates/index', [
            'affiliates' => $affiliates->items(),
            'pagination' => [
                'total' => $affiliates->total(),
                'currentPage' => $affiliates->currentPage(),
                'perPage' => $affiliates->perPage(),
                'lastPage' => $affiliates->lastPage(),
                'hasMore' => $affiliates->hasMorePages(),
            ],
            'search' => $search,
        ]);
    }

    public function approvePending(Request $request, Affiliate $affiliate)
    {
        $position = $request->input('position', 'left');
        try {
            $affiliate = $this->service->confirmAffiliate($affiliate->id, $position);
            return response()->json(['success' => true, 'affiliate' => $affiliate]);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function setSponsor(Request $request, Affiliate $affiliate)
    {
        $sponsorId = $request->input('sponsor_id');
        if (!$sponsorId) return response()->json(['error' => 'missing sponsor_id'], 400);

        $affiliate->update(['sponsor_id' => $sponsorId, 'upline_id' => $sponsorId]);
        $this->service->updateNestedSet($affiliate->id);

        return response()->json(['success' => true, 'affiliate' => $affiliate]);
    }

    public function setPosition(Request $request, Affiliate $affiliate)
    {
        $position = $request->input('position');
        if (!in_array($position, ['left','right','none'])) {
            return response()->json(['error' => 'invalid position'], 400);
        }

        $affiliate->update(['position' => $position]);
        $this->service->updateNestedSet($affiliate->id);

        return response()->json(['success' => true, 'affiliate' => $affiliate]);
    }
}
