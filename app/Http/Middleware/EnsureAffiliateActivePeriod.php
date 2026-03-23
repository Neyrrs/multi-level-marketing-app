<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAffiliateActivePeriod
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user || !$user->hasRole('affiliate')) {
            return $next($request);
        }

        $affiliate = $user->affiliate;
        if (!$affiliate) {
            return redirect()->route('cart')->with('error', 'Data affiliate tidak ditemukan.');
        }

        if (!$affiliate->active_until) {
            $affiliate->update([
                'active_until' => ($affiliate->activated_at ?? $affiliate->created_at ?? now())->copy()->addMonth(),
            ]);
            $affiliate->refresh();
        }

        if ($affiliate->active_until && now()->greaterThan($affiliate->active_until)) {
            if ($affiliate->is_active) {
                $affiliate->update(['is_active' => false]);
            }

            return redirect()->route('cart')->with(
                'error',
                'Masa aktif affiliate sudah habis. Lakukan RO (pembelian ulang) untuk aktif 1 bulan lagi.'
            );
        }

        if (!$affiliate->is_active) {
            $affiliate->update(['is_active' => true]);
        }

        return $next($request);
    }
}

