<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SponsorController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate || !$affiliate->sponsor_id) {
            return Inertia::render('affiliate/sponsor/index', [
                'sponsor' => null,
                'sponsorTree' => null,
            ]);
        }

        // Get sponsor affiliate
        $sponsor = Affiliate::where('user_id', $affiliate->sponsor_id)->first();

        if (!$sponsor) {
            return Inertia::render('affiliate/sponsor/index', [
                'sponsor' => null,
                'sponsorTree' => null,
            ]);
        }

        // Get sponsor's binary tree
        $sponsorData = [
            'id' => $sponsor->id,
            'name' => $sponsor->user->name,
            'username' => $sponsor->username,
            'email' => $sponsor->user->email,
            'level' => $sponsor->level,
            'is_active' => $sponsor->is_active,
            'total_downline' => $sponsor->total_downline,
            'direct_downline' => $sponsor->direct_downline,
        ];

        // Get sponsor's other downlines (siblings)
        $siblings = Affiliate::where('sponsor_id', $affiliate->sponsor_id)
            ->where('id', '!=', $affiliate->id)
            ->with(['user'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->user->name,
                    'username' => $item->username,
                    'position' => $item->position,
                    'level' => $item->level,
                    'is_active' => $item->is_active,
                ];
            })
            ->toArray();

        return Inertia::render('affiliate/sponsor/index', [
            'sponsor' => $sponsorData,
            'siblings' => $siblings,
        ]);
    }
}
