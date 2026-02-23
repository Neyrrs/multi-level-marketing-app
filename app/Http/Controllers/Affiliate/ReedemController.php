<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRedemptionRequest;
use App\Models\ActivationCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReedemController extends Controller
{
    /**
     * Display redemption page with available codes
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get available codes that this user can redeem
        $availableCodes = ActivationCode::where('status', 'available')
            ->with(['product'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'code' => $item->code,
                    'product' => $item->product ? [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                    ] : null,
                ];
            })
            ->toArray();

        return Inertia::render('affiliate/redeem/index', [
            'availableCodes' => $availableCodes,
        ]);
    }

    /**
     * Store redemption (use activation code)
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|exists:activation_codes,code',
        ]);

        $user = $request->user();
        $code = ActivationCode::where('code', $request->code)->first();

        if (!$code || $code->status !== 'available') {
            return back()->withErrors(['code' => 'Kode tidak valid atau sudah digunakan']);
        }

        // Mark code as used
        $code->update([
            'status' => 'used',
            'used_by' => $user->id,
            'used_at' => now(),
        ]);

        return back()->with('success', 'Kode berhasil ditebus!');
    }
}
