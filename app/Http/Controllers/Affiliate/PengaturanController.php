<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\AffiliateBankAccount;
use App\Models\CommissionLedger;
use App\Models\UserProfile;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PengaturanController extends Controller
{
    private const BANK_OPTIONS = [
        ['name' => 'BCA', 'code' => 'bca'],
        ['name' => 'BNI', 'code' => 'bni'],
        ['name' => 'BRI', 'code' => 'bri'],
        ['name' => 'Mandiri', 'code' => 'mandiri'],
        ['name' => 'BSI', 'code' => 'bsi'],
        ['name' => 'CIMB Niaga', 'code' => 'cimb'],
        ['name' => 'Permata', 'code' => 'permata'],
        ['name' => 'Danamon', 'code' => 'danamon'],
    ];

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
                    'bank_code' => $item->bank_code,
                    'account_number' => $item->account_number,
                    'account_holder' => $item->account_holder,
                    'is_primary' => $item->is_primary,
                ];
            })
            ->toArray();

        $availableBalance = $affiliate
            ? $this->computeAvailableBalance((int) $affiliate->id)
            : 0.0;

        $withdrawals = $affiliate
            ? Withdrawal::query()
                ->where('affiliate_id', $affiliate->id)
                ->latest('id')
                ->limit(15)
                ->get()
                ->map(fn (Withdrawal $wd) => [
                    'id' => $wd->id,
                    'withdrawal_number' => $wd->withdrawal_number,
                    'destination_bank' => $wd->destination_bank,
                    'destination_account' => $wd->destination_account,
                    'destination_name' => $wd->destination_name,
                    'amount' => (float) $wd->amount,
                    'fee' => (float) $wd->fee,
                    'net_amount' => (float) $wd->net_amount,
                    'status' => $wd->status,
                    'created_at' => $wd->created_at?->format('Y-m-d H:i:s'),
                ])
                ->values()
                ->toArray()
            : [];

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
            'bankOptions' => self::BANK_OPTIONS,
            'wallet' => [
                'available_balance' => $availableBalance,
            ],
            'withdrawals' => $withdrawals,
        ]);
    }

    public function storeBankAccount(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return back()->withErrors(['bank' => 'Akun belum terdaftar sebagai affiliate.']);
        }

        $bankNames = collect(self::BANK_OPTIONS)->pluck('name')->all();

        $data = $request->validate([
            'bank_name' => ['required', 'string', 'in:' . implode(',', $bankNames)],
            'account_number' => ['required', 'string', 'min:8', 'max:30'],
            'account_holder' => ['required', 'string', 'max:255'],
        ]);

        $bankCode = collect(self::BANK_OPTIONS)
            ->firstWhere('name', $data['bank_name'])['code'] ?? strtolower($data['bank_name']);

        DB::transaction(function () use ($affiliate, $data, $bankCode) {
            AffiliateBankAccount::query()
                ->where('affiliate_id', $affiliate->id)
                ->update(['is_primary' => false]);

            AffiliateBankAccount::query()->updateOrCreate(
                [
                    'affiliate_id' => $affiliate->id,
                    'account_number' => $data['account_number'],
                ],
                [
                    'bank_name' => $data['bank_name'],
                    'bank_code' => $bankCode,
                    'account_holder' => $data['account_holder'],
                    'is_primary' => true,
                    'is_verified' => true,
                    'verified_at' => now(),
                ]
            );
        });

        return back()->with('success', 'Rekening berhasil disimpan.');
    }

    public function requestWithdrawal(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return back()->withErrors(['withdraw' => 'Akun belum terdaftar sebagai affiliate.']);
        }

        $data = $request->validate([
            'bank_account_id' => ['required', 'integer', 'exists:affiliate_bank_accounts,id'],
            'amount' => ['required', 'numeric', 'min:10000'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $bankAccount = AffiliateBankAccount::query()
            ->where('id', $data['bank_account_id'])
            ->where('affiliate_id', $affiliate->id)
            ->first();

        if (!$bankAccount) {
            return back()->withErrors(['withdraw' => 'Rekening tidak valid untuk affiliate ini.']);
        }

        $amount = (float) $data['amount'];
        $availableBalance = $this->computeAvailableBalance((int) $affiliate->id);
        if ($amount > $availableBalance) {
            return back()->withErrors(['withdraw' => 'Saldo tersedia tidak mencukupi.']);
        }

        $hasPending = Withdrawal::query()
            ->where('affiliate_id', $affiliate->id)
            ->whereIn('status', ['pending', 'approved', 'processing'])
            ->exists();

        if ($hasPending) {
            return back()->withErrors(['withdraw' => 'Masih ada pengajuan withdrawal yang belum selesai.']);
        }

        Withdrawal::create([
            'withdrawal_number' => 'WD-' . uniqid(),
            'affiliate_id' => $affiliate->id,
            'bank_account_id' => $bankAccount->id,
            'destination_account' => $bankAccount->account_number,
            'destination_bank' => $bankAccount->bank_name,
            'destination_name' => $bankAccount->account_holder,
            'amount' => $amount,
            'fee' => 0,
            'net_amount' => $amount,
            'status' => 'pending',
            'notes' => $data['notes'] ?? null,
        ]);

        return back()->with('success', 'Pengajuan pencairan komisi berhasil dikirim.');
    }

    private function computeAvailableBalance(int $affiliateId): float
    {
        $credit = (float) CommissionLedger::query()
            ->where('affiliate_id', $affiliateId)
            ->where('status', 'posted')
            ->where('type', 'credit')
            ->sum('amount');

        $debit = (float) CommissionLedger::query()
            ->where('affiliate_id', $affiliateId)
            ->where('status', 'posted')
            ->where('type', 'debit')
            ->sum('amount');

        $locked = (float) Withdrawal::query()
            ->where('affiliate_id', $affiliateId)
            ->whereIn('status', ['pending', 'approved', 'processing'])
            ->sum('net_amount');

        return max(0, $credit - $debit - $locked);
    }
}
