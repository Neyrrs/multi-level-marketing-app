<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManajemenAffiliateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

        return Inertia::render('admin/ManajemenAffiliate/index', [
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
