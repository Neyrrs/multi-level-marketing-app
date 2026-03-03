<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\ActivationCode;
use App\Models\User;
use App\Services\AffiliateService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        $availableCodes = ActivationCode::where('owner_id', $user->id)
            ->where('status', 'available')
            ->with(['product'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'code' => $item->code,
                    'product_name' => $item->product?->name ?? '-',
                    'remaining_usage' => (int) ($item->remaining_usage ?? $item->usage_count ?? 1),
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
            'code_id' => 'required|integer|exists:activation_codes,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'position' => 'required|in:left,right',
        ]);

        $user = $request->user();
        $sponsorAffiliate = $user->affiliate;

        if (!$sponsorAffiliate) {
            return back()->withErrors(['sponsor' => 'Akun ini belum terdaftar sebagai affiliate aktif.']);
        }

        $position = $request->string('position')->toString();
        $positionTaken = Affiliate::where('upline_id', $user->id)
            ->where('position', $position)
            ->exists();

        if ($positionTaken) {
            return back()->withErrors([
                'position' => "Posisi {$position} sudah terisi. Pilih posisi lain.",
            ]);
        }

        $code = ActivationCode::where('id', $request->integer('code_id'))
            ->where('owner_id', $user->id)
            ->first();

        $remainingUsage = (int) ($code?->remaining_usage ?? $code?->usage_count ?? 1);
        if (!$code || $code->status !== 'available' || $remainingUsage <= 0) {
            return back()->withErrors(['code' => 'Kode tidak valid atau sudah digunakan']);
        }

        DB::transaction(function () use ($request, $sponsorAffiliate, $code, $position) {
            $newUser = User::create([
                'name' => $request->string('name')->toString(),
                'email' => $request->string('email')->toString(),
                'password' => Hash::make($request->string('password')->toString()),
                'status' => 'active',
                'email_verified_at' => now(),
            ]);

            $newUser->assignRole('affiliate');

            app(AffiliateService::class)->registerNewAffiliate(
                $newUser,
                $sponsorAffiliate,
                $position,
                $code
            );
        });

        return back()->with('success', 'Redeem berhasil, akun affiliate baru sudah dibuat.');
    }
}
