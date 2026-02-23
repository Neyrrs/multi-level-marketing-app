<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use App\Models\AffiliateBankAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengaturanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        // Get user profile
        $profile = UserProfile::where('user_id', $user->id)->first();

        // Get bank accounts
        $bankAccounts = AffiliateBankAccount::where('affiliate_id', $affiliate?->id)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'bank_name' => $item->bank_name,
                    'account_number' => $item->account_number,
                    'account_holder' => $item->account_holder,
                    'is_primary' => $item->is_primary,
                ];
            })
            ->toArray();

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
        ];

        $profileData = $profile ? [
            'address' => $profile->address,
            'city' => $profile->city,
            'province' => $profile->province,
            'zip_code' => $profile->zip_code,
            'id_number' => $profile->id_number,
            'id_type' => $profile->id_type,
        ] : null;

        return Inertia::render('affiliate/pengaturan/index', [
            'user' => $userData,
            'profile' => $profileData,
            'bankAccounts' => $bankAccounts,
        ]);
    }
}
