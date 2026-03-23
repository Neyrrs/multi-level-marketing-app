<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\ActivationCode;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonalController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/personal-ro/index', [
                'stats' => null,
                'availableCodes' => [],
                'recentRedeems' => [],
            ]);
        }

        $activeUntil = $affiliate->active_until
            ?? ($affiliate->activated_at ? $affiliate->activated_at->copy()->addMonth() : null);
        $remainingDays = $activeUntil ? max(0, now()->diffInDays($activeUntil, false)) : 0;

        $availableCodes = ActivationCode::query()
            ->where('owner_id', $user->id)
            ->where('status', 'available')
            ->where(function ($q) {
                $q->whereNull('generated_from')
                    ->orWhere('generated_from', '!=', 'guest_bundle_order');
            })
            ->with('product:id,name')
            ->latest('id')
            ->get()
            ->map(fn (ActivationCode $code) => [
                'id' => $code->id,
                'code' => $code->code,
                'product_name' => $code->product?->name ?? '-',
                'remaining_usage' => (int) ($code->remaining_usage ?? $code->usage_count ?? 1),
                'expired_at' => $code->expired_at?->format('Y-m-d H:i:s'),
            ])
            ->values()
            ->toArray();

        $recentRedeems = ActivationCode::query()
            ->where('owner_id', $user->id)
            ->where('used_by', $user->id)
            ->where('notes', 'like', '%RO redeemed%')
            ->latest('used_at')
            ->limit(10)
            ->get()
            ->map(fn (ActivationCode $code) => [
                'id' => $code->id,
                'code' => $code->code,
                'used_at' => $code->used_at?->format('Y-m-d H:i:s'),
                'status' => $code->status,
            ])
            ->values()
            ->toArray();

        $stats = [
            'isActive' => (bool) $affiliate->is_active,
            'activeUntil' => $activeUntil?->format('Y-m-d H:i:s'),
            'remainingDays' => (int) $remainingDays,
        ];

        return Inertia::render('affiliate/personal-ro/index', [
            'stats' => $stats,
            'availableCodes' => $availableCodes,
            'recentRedeems' => $recentRedeems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code_id' => 'required|integer|exists:activation_codes,id',
        ]);

        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return back()->withErrors(['ro' => 'Akun ini belum terdaftar sebagai affiliate.']);
        }

        try {
            DB::transaction(function () use ($request, $user, $affiliate) {
                $code = ActivationCode::query()
                    ->where('id', $request->integer('code_id'))
                    ->where('owner_id', $user->id)
                    ->lockForUpdate()
                    ->first();

                $remainingUsage = (int) ($code?->remaining_usage ?? $code?->usage_count ?? 1);

                if (!$code || $code->status !== 'available' || $remainingUsage <= 0) {
                    throw new \InvalidArgumentException('Kode tidak valid atau sudah habis.');
                }

                if (strtolower((string) $code->generated_from) === 'guest_bundle_order') {
                    throw new \InvalidArgumentException('Kode ini khusus registrasi affiliate, tidak bisa untuk RO.');
                }

                $base = $affiliate->active_until && $affiliate->active_until->isFuture()
                    ? $affiliate->active_until->copy()
                    : now();

                $affiliate->update([
                    'is_active' => true,
                    'activated_at' => $affiliate->activated_at ?? now(),
                    'active_until' => $base->addMonth(),
                    'last_activity_at' => now(),
                ]);

                $remainingUsage = max(0, $remainingUsage - 1);
                $existingNotes = trim((string) ($code->notes ?? ''));
                $roNote = 'RO redeemed by user:' . $user->id . ' at ' . now()->format('Y-m-d H:i:s');

                $code->update([
                    'remaining_usage' => $remainingUsage,
                    'status' => $remainingUsage <= 0 ? 'used' : 'available',
                    'used_by' => $user->id,
                    'used_at' => now(),
                    'notes' => trim($existingNotes . ' | ' . $roNote, ' |'),
                ]);
            });
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['ro' => $e->getMessage()]);
        }

        return back()->with('success', 'RO berhasil. Masa aktif affiliate bertambah 1 bulan.');
    }
}
