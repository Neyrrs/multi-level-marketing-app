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

        // Redirect based on role, fall back to generic dashboard
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
            return redirect()->intended(route('affiliate.dashboard'));
        }

        if ($user->hasRole('finance')) {
            return redirect()->intended(route('finance.dashboard'));
        }

        // default/guest
        return redirect()->intended(route('dashboard'));
    }
}
