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

        $codes = ActivationCode::where('owner_id', $user->id)
            ->where('status', 'available')
            ->with(['product'])
            ->get();

        $pendingByCode = Affiliate::query()
            ->where('sponsor_id', $user->id)
            ->where('is_active', false)
            ->whereNotNull('activation_code_id')
            ->whereIn('activation_code_id', $codes->pluck('id'))
            ->with('user:id,name,email')
            ->get()
            ->keyBy('activation_code_id');

        // Get available codes that this user can redeem
        $availableCodes = $codes
            ->map(function ($item) use ($pendingByCode) {
                $pending = $pendingByCode->get($item->id);

                return [
                    'id' => $item->id,
                    'code' => $item->code,
                    'product_name' => $item->product?->name ?? '-',
                    'remaining_usage' => (int) ($item->remaining_usage ?? $item->usage_count ?? 1),
                    'request_user' => $pending && $pending->user ? [
                        'id' => $pending->user->id,
                        'name' => $pending->user->name,
                        'email' => $pending->user->email,
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
            'code_id' => 'required|integer|exists:activation_codes,id',
            'request_user_id' => 'nullable|integer|exists:users,id',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
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

        $requestUserId = $request->integer('request_user_id');

        DB::transaction(function () use ($request, $sponsorAffiliate, $code, $position, $requestUserId) {
            if ($requestUserId > 0) {
                $pendingAffiliate = Affiliate::query()
                    ->where('user_id', $requestUserId)
                    ->where('sponsor_id', $sponsorAffiliate->user_id)
                    ->where('activation_code_id', $code->id)
                    ->where('is_active', false)
                    ->first();

                if ($pendingAffiliate) {
                    app(AffiliateService::class)->confirmAffiliate($pendingAffiliate->id, $position);
                    return;
                }
            }

            $name = trim((string) $request->input('name', ''));
            $email = trim((string) $request->input('email', ''));
            $password = (string) $request->input('password', '');

            if ($name === '' || $email === '' || $password === '') {
                throw new \InvalidArgumentException('Data user baru belum lengkap.');
            }

            if (User::where('email', $email)->exists()) {
                throw new \InvalidArgumentException('Email user sudah terdaftar.');
            }

            $newUser = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'status' => 'active',
                'email_verified_at' => now(),
            ]);

            $newUser->assignRole('affiliate');

            app(AffiliateService::class)->registerNewAffiliate($newUser, $sponsorAffiliate, $position, $code);
        });

        return back()->with('success', 'Redeem berhasil, akun affiliate baru sudah dibuat.');
    }
}
