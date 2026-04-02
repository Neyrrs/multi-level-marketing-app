<?php

namespace App\Actions\Fortify;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Route;

class FortifyLoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the authenticated redirect.
     */
    public function toResponse($request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user->hasRole('manager')) {
            return redirect()->intended(route('manager.dashboard'));
        }

        if ($user->hasRole('logistik')) {
            return redirect()->intended(route('logistik.dashboard'));
        }

        if ($user->hasRole('affiliate')) {
            $affiliate = $user->affiliate;
            if ($affiliate && $affiliate->active_until && now()->greaterThan($affiliate->active_until)) {
                $affiliate->update(['is_active' => false]);
                return redirect()->intended(route('cart'))
                    ->with('error', 'Masa aktif affiliate habis. Lakukan RO untuk aktif lagi 1 bulan.');
            }
            return redirect()->intended(route('affiliate.dashboard'));
        }

        if ($user->hasRole('finance')) {
            return redirect()->intended(route('finance.dashboard'));
        }

        // default/guest
        return redirect()->intended(route('home'));
    }
}
