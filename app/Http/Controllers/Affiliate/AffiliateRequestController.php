<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $requests = Affiliate::query()
            ->where('sponsor_id', $user->id)
            ->where('is_active', false)
            ->with(['user:id,name,email', 'activationCode:id,code'])
            ->latest('id')
            ->get()
            ->map(function (Affiliate $affiliate) {
                return [
                    'id' => $affiliate->id,
                    'name' => $affiliate->user?->name ?? '-',
                    'email' => $affiliate->user?->email ?? '-',
                    'activation_code' => $affiliate->activationCode?->code ?? '-',
                    'requested_at' => $affiliate->created_at?->format('Y-m-d H:i') ?? '-',
                    'status' => 'pending',
                ];
            })
            ->values();

        return Inertia::render('affiliate/request/index', [
            'requests' => $requests,
        ]);
    }
}
