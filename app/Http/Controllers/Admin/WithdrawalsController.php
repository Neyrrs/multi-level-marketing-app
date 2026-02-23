<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WithdrawalsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = (int) $request->input('per_page', 10);

        $query = Withdrawal::with('affiliate');
        if ($search) {
            $query->where('withdrawal_number', 'like', "%{$search}%")
                ->orWhereRelation('affiliate', 'username', 'like', "%{$search}%");
        }

        $withdrawals = $query->latest()->paginate($perPage);

        return Inertia::render('admin/withdrawals/index', [
            'withdrawals' => $withdrawals->items(),
            'pagination' => [
                'total' => $withdrawals->total(),
                'currentPage' => $withdrawals->currentPage(),
                'perPage' => $withdrawals->perPage(),
                'lastPage' => $withdrawals->lastPage(),
                'hasMore' => $withdrawals->hasMorePages(),
            ],
            'search' => $search,
        ]);
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
            return response()->json(['success' => true, 'withdrawal' => $withdrawal]);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function reject(Request $request, Withdrawal $withdrawal)
    {
        $data = $request->validate(['reason' => 'nullable|string']);
        $withdrawal->update([
            'status' => 'rejected',
            'rejection_reason' => $data['reason'] ?? 'rejected by admin',
        ]);
        return response()->json(['success' => true, 'withdrawal' => $withdrawal]);
    }
}
