<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WithdrawalController extends Controller
{
    public function request(Request $request)
    {
        $data = $request->validate([
            'bank_account_id' => 'required|integer',
            'amount' => 'required|numeric|min:1',
            'notes' => 'nullable|string',
        ]);

        $user = Auth::user();
        $affiliate = $user->affiliate ?? null;
        if (!$affiliate) return response()->json(['error' => 'not an affiliate'], 403);

        $withdrawal = Withdrawal::create([
            'withdrawal_number' => 'WD-' . uniqid(),
            'affiliate_id' => $affiliate->id,
            'bank_account_id' => $data['bank_account_id'],
            'amount' => $data['amount'],
            'fee' => 0,
            'net_amount' => $data['amount'],
            'status' => 'pending',
            'notes' => $data['notes'] ?? null,
        ]);

        return response()->json($withdrawal, 201);
    }

    public function approve(Request $request, Withdrawal $withdrawal)
    {
        $admin = $request->user();
        try {
            $withdrawal->update([
                'status' => 'approved',
                'approved_by' => $admin->id,
                'approved_at' => now(),
            ]);
            return response()->json($withdrawal);
        } catch (\Throwable $e) {
            Log::error('Approve withdrawal error: ' . $e->getMessage());
            return response()->json(['error' => 'approve failed'], 500);
        }
    }

    public function reject(Request $request, Withdrawal $withdrawal)
    {
        $data = $request->validate(['reason' => 'nullable|string']);
        $withdrawal->update([
            'status' => 'rejected',
            'rejection_reason' => $data['reason'] ?? 'rejected by admin',
        ]);
        return response()->json($withdrawal);
    }
}
