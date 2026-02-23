<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommissionService;
use Inertia\Inertia;

class CommissionController extends Controller
{
    protected CommissionService $service;

    public function __construct()
    {
        $this->service = new CommissionService();
    }

    public function index($affiliateId)
    {
        $commissions = \App\Models\Commission::where('affiliate_id', $affiliateId)->latest()->paginate(50);
        return Inertia::render('affiliate/commissions/index', ['commissions' => $commissions]);
    }

    public function withdraw($affiliateId)
    {
        // Minimal: mark all calculated commissions as approved for payout
        $items = \App\Models\Commission::where('affiliate_id', $affiliateId)->where('status', 'calculated')->get();
        foreach ($items as $c) {
            $c->update(['status' => 'approved', 'approved_at' => now()]);
        }

        return redirect()->back()->with('success', 'Withdraw request submitted');
    }

    public function dailyMatching($affiliateId)
    {
        $commission = $this->service->calculateMatching((int)$affiliateId);
        return Inertia::render('affiliate/commissions/daily', ['commission' => $commission]);
    }
}
