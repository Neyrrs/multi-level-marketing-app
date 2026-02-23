<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Affiliate;
use App\Services\AffiliateService;
use Illuminate\Support\Facades\Log;

class AffiliateController extends Controller
{
    protected AffiliateService $service;

    public function __construct()
    {
        $this->service = new AffiliateService();
    }

    public function approvePending(Request $request, int $affiliateId)
    {
        $position = $request->input('position', 'left');
        try {
            $affiliate = $this->service->confirmAffiliate($affiliateId, $position);
            return response()->json($affiliate);
        } catch (\Throwable $e) {
            Log::error('Approve affiliate error: ' . $e->getMessage());
            return response()->json(['error' => 'approve failed'], 500);
        }
    }

    public function setSponsor(Request $request, int $affiliateId)
    {
        $affiliate = Affiliate::findOrFail($affiliateId);
        $sponsorId = $request->input('sponsor_id');
        if (!$sponsorId) return response()->json(['error' => 'missing sponsor_id'], 400);

        $affiliate->update(['sponsor_id' => $sponsorId, 'upline_id' => $sponsorId]);
        // recalc nested set
        $this->service->updateNestedSet($affiliateId);

        return response()->json($affiliate);
    }

    public function setPosition(Request $request, int $affiliateId)
    {
        $affiliate = Affiliate::findOrFail($affiliateId);
        $position = $request->input('position');
        if (!in_array($position, ['left','right','none'])) return response()->json(['error' => 'invalid position'], 400);

        $affiliate->update(['position' => $position]);
        $this->service->updateNestedSet($affiliateId);

        return response()->json($affiliate);
    }
}
