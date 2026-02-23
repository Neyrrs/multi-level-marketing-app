<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    /**
     * Display a listing of withdrawals.
     */
    public function index(Request $request)
    {
        $query = Withdrawal::with(['affiliate.user:id,name', 'approver:id,name'])
            ->select([
                'id', 'withdrawal_number', 'affiliate_id', 'amount', 'fee',
                'net_amount', 'status', 'approved_by', 'approved_at', 'processed_at', 'created_at'
            ]);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Filter by date range
        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->get('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->get('end_date'));
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('withdrawal_number', 'like', "%{$search}%");
            });
        }

        $withdrawals = $query->orderBy('created_at', 'desc')
            ->paginate(15);
        
        $withdrawalsData = $withdrawals->through(fn($withdrawal) => [
            'id' => $withdrawal->id,
            'withdrawal_number' => $withdrawal->withdrawal_number,
            'affiliate' => $withdrawal->affiliate?->user?->name ?? 'Unknown',
            'affiliate_code' => $withdrawal->affiliate?->id ?? '-',
            'amount' => number_format($withdrawal->amount, 2, ',', '.'),
            'fee' => number_format($withdrawal->fee, 2, ',', '.'),
            'net_amount' => number_format($withdrawal->net_amount, 2, ',', '.'),
            'status' => $withdrawal->status,
            'approved_by' => $withdrawal->approver?->name ?? '-',
            'approved_at' => $withdrawal->approved_at?->format('Y-m-d H:i') ?? '-',
            'processed_at' => $withdrawal->processed_at?->format('Y-m-d H:i') ?? '-',
            'created_at' => $withdrawal->created_at->format('Y-m-d H:i'),
        ]);

        return Inertia::render('finance/withdrawals/index', [
            'withdrawals' => [
                'data' => $withdrawalsData->items(),
                'links' => $withdrawalsData->linkCollection(),
                'meta' => [
                    'current_page' => $withdrawalsData->currentPage(),
                    'last_page' => $withdrawalsData->lastPage(),
                    'total' => $withdrawalsData->total(),
                ],
            ],
            'filters' => [
                'status' => $request->get('status'),
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date'),
                'search' => $request->get('search'),
            ],
            'statuses' => ['pending', 'approved', 'rejected', 'processed'],
        ]);
    }

    /**
     * Display the specified withdrawal.
     */
    public function show(Withdrawal $withdrawal)
    {
        $withdrawal->load(['affiliate.user:id,name,email', 'approver:id,name']);

        return Inertia::render('finance/withdrawals/show', [
            'withdrawal' => [
                'id' => $withdrawal->id,
                'withdrawal_number' => $withdrawal->withdrawal_number,
                'affiliate' => $withdrawal->affiliate?->user?->name ?? 'Unknown',
                'affiliate_code' => $withdrawal->affiliate?->id ?? '-',
                'affiliate_email' => $withdrawal->affiliate?->user?->email ?? '-',
                'amount' => number_format($withdrawal->amount, 2, ',', '.'),
                'fee' => number_format($withdrawal->fee, 2, ',', '.'),
                'net_amount' => number_format($withdrawal->net_amount, 2, ',', '.'),
                'status' => $withdrawal->status,
                'destination_bank' => $withdrawal->destination_bank,
                'destination_name' => $withdrawal->destination_name,
                'destination_account' => $withdrawal->destination_account,
                'approved_by' => $withdrawal->approver?->name ?? '-',
                'approved_at' => $withdrawal->approved_at?->format('Y-m-d H:i:s') ?? '-',
                'processed_at' => $withdrawal->processed_at?->format('Y-m-d H:i:s') ?? '-',
                'rejection_reason' => $withdrawal->rejection_reason ?? '-',
                'notes' => $withdrawal->notes ?? '-',
                'midtrans_reference' => $withdrawal->midtrans_reference ?? '-',
                'created_at' => $withdrawal->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $withdrawal->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Approve a pending withdrawal (Finance staff action)
     */
    public function approve(Withdrawal $withdrawal)
    {
        if ($withdrawal->status !== 'pending') {
            return back()->withErrors(['error' => 'Hanya withdrawal pending yang bisa di-approve']);
        }

        $withdrawal->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Withdrawal berhasil di-approve');
    }

    /**
     * Mark withdrawal as processed
     */
    public function process(Withdrawal $withdrawal)
    {
        if ($withdrawal->status !== 'approved') {
            return back()->withErrors(['error' => 'Hanya withdrawal approved yang bisa diproses']);
        }

        $withdrawal->update([
            'status' => 'processed',
            'processed_at' => now(),
        ]);

        return back()->with('success', 'Withdrawal berhasil diproses');
    }

    /**
     * Reject a withdrawal with reason
     */
    public function reject(Request $request, Withdrawal $withdrawal)
    {
        if ($withdrawal->status !== 'pending') {
            return back()->withErrors(['error' => 'Hanya withdrawal pending yang bisa ditolak']);
        }

        $request->validate([
            'rejection_reason' => 'required|string|max:255',
        ]);

        $withdrawal->update([
            'status' => 'rejected',
            'rejection_reason' => $request->rejection_reason,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Withdrawal berhasil ditolak');
    }
}
