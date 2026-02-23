<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AffiliateService;
use Inertia\Inertia;
use App\Models\Affiliate;

class AffiliateController extends Controller
{
    protected AffiliateService $service;

    public function __construct()
    {
        $this->service = new AffiliateService();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sponsor_id' => 'required|integer',
            'package_id' => 'required|integer',
            'position' => 'nullable|string',
        ]);

        $affiliate = $this->service->createDownline($validated['sponsor_id'], $validated['package_id'], $validated['position'] ?? 'left');
        return redirect()->back()->with('success', 'Affiliate created: ' . $affiliate->username);
    }

    public function tree($affiliateId)
    {
        $tree = $this->service->getTree((int)$affiliateId);
        return Inertia::render('affiliate/tree', ['tree' => $tree]);
    }

    public function profile($affiliateId)
    {
        $affiliate = \App\Models\Affiliate::with('user')->findOrFail($affiliateId);
        return Inertia::render('affiliate/profile', ['affiliate' => $affiliate]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Affiliate $affiliate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Affiliate $affiliate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Affiliate $affiliate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affiliate $affiliate)
    {
        //
    }
}
