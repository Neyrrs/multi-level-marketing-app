<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\ActivationCode;
use App\Models\User;
use App\Services\AffiliateService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
        $sponsorAffiliate = $user->affiliate;

        if (!$sponsorAffiliate) {
            return Inertia::render('affiliate/redeem/index', [
                'availableCodes' => [],
                'placementOptions' => [],
                'defaultPlacementAffiliateId' => null,
            ]);
        }

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

        $placementCandidates = Affiliate::query()
            ->where(function ($q) use ($user, $sponsorAffiliate) {
                $q->where('id', $sponsorAffiliate->id)
                    ->orWhere('sponsor_id', $user->id);
            })
            ->where('is_active', true)
            ->with('user:id,name')
            ->orderBy('level')
            ->orderBy('id')
            ->get();

        $placementOptions = $placementCandidates->map(function (Affiliate $candidate) {
            $leftTaken = Affiliate::query()
                ->where('upline_id', $candidate->user_id)
                ->where('position', 'left')
                ->exists();
            $rightTaken = Affiliate::query()
                ->where('upline_id', $candidate->user_id)
                ->where('position', 'right')
                ->exists();

            return [
                'id' => $candidate->id,
                'name' => $candidate->user?->name ?? '-',
                'username' => $candidate->username,
                'level' => (int) $candidate->level,
                'left_available' => !$leftTaken,
                'right_available' => !$rightTaken,
            ];
        })->values()->toArray();

        return Inertia::render('affiliate/redeem/index', [
            'availableCodes' => $availableCodes,
            'placementOptions' => $placementOptions,
            'defaultPlacementAffiliateId' => $sponsorAffiliate->id,
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
            'placement_affiliate_id' => 'nullable|integer|exists:affiliates,id',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'position' => 'required|in:left,right',
        ]);

        $user = $request->user();
        $sponsorAffiliate = $user->affiliate;

        if (!$sponsorAffiliate) {
            return back()->withErrors(['sponsor' => 'Akun ini belum terdaftar sebagai affiliate aktif.']);
        }

        $placementAffiliate = Affiliate::query()
            ->where('id', $request->integer('placement_affiliate_id', $sponsorAffiliate->id))
            ->where('is_active', true)
            ->first();

        if (
            !$placementAffiliate
            || ((int) $placementAffiliate->id !== (int) $sponsorAffiliate->id
                && (int) $placementAffiliate->sponsor_id !== (int) $sponsorAffiliate->user_id)
        ) {
            return back()->withErrors(['placement_affiliate_id' => 'Node penempatan tidak valid.']);
        }

        $position = $request->string('position')->toString();
        $positionTaken = Affiliate::where('upline_id', $placementAffiliate->user_id)
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
        $isGuestBundleCode = strtolower((string) $code->generated_from) === 'guest_bundle_order';
        $expectedRequestUserId = null;
        if (preg_match('/request_user_id=(\d+)/', (string) $code->notes, $m)) {
            $expectedRequestUserId = (int) $m[1];
        }

        if ($isGuestBundleCode && $requestUserId <= 0) {
            return back()->withErrors([
                'request_user_id' => 'Kode ini khusus untuk request guest. Pilih data request user terlebih dahulu.',
            ]);
        }

        if ($isGuestBundleCode && $expectedRequestUserId && $requestUserId > 0 && $requestUserId !== $expectedRequestUserId) {
            return back()->withErrors([
                'request_user_id' => 'Request user tidak sesuai dengan data kode aktivasi ini.',
            ]);
        }

        DB::transaction(function () use ($request, $sponsorAffiliate, $placementAffiliate, $code, $position, $requestUserId) {
            if ($requestUserId > 0) {
                $pendingAffiliate = Affiliate::query()
                    ->where('user_id', $requestUserId)
                    ->where('sponsor_id', $sponsorAffiliate->user_id)
                    ->where('activation_code_id', $code->id)
                    ->where('is_active', false)
                    ->first();

                if ($pendingAffiliate) {
                    app(AffiliateService::class)->confirmAffiliate($pendingAffiliate->id, $position, $placementAffiliate);
                    return;
                }
            }

            $name = trim((string) $request->input('name', ''));
            $email = trim((string) $request->input('email', ''));

            if ($name === '' || $email === '') {
                throw new \InvalidArgumentException('Data user baru belum lengkap.');
            }

            if (User::where('email', $email)->exists()) {
                throw new \InvalidArgumentException('Email user sudah terdaftar.');
            }

            $newUser = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(Str::random(16)),
                'status' => 'active',
                'email_verified_at' => now(),
            ]);

            $newUser->assignRole('affiliate');

            app(AffiliateService::class)->registerNewAffiliate($newUser, $sponsorAffiliate, $position, $code, $placementAffiliate);
        });

        return back()->with('success', 'Redeem berhasil, akun affiliate baru sudah dibuat.');
    }
}
