<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\CommissionLedger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of commission transactions.
     */
    public function index(Request $request)
    {
        $query = CommissionLedger::with(['affiliate.user:id,name', 'order:id,order_number'])
            ->select([
                'id', 'affiliate_id', 'order_id',
                'type', 'amount', 'description', 'created_at', 'reference'
            ]);

        // Filter by commission type
        if ($request->filled('type')) {
            $query->where('type', $request->get('type'));
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
                $q->where('transaction_number', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $transactions = $query->orderBy('created_at', 'desc')
            ->paginate(15);
        
        $transactionsData = $transactions->through(fn($transaction) => [
            'id' => $transaction->id,
            'reference' => $transaction->reference ?? 'N/A',
            'affiliate' => $transaction->affiliate?->user?->name ?? 'Unknown',
            'affiliate_code' => $transaction->affiliate?->id ?? '-',
            'type' => $transaction->type,
            'amount' => $transaction->amount > 0 ? '+Rp ' . number_format($transaction->amount, 2, ',', '.') : '-Rp ' . number_format(abs($transaction->amount), 2, ',', '.'),
            'description' => $transaction->description,
            'created_at' => $transaction->created_at->format('Y-m-d H:i'),
        ]);

        // Get unique commission types for filter
        $types = CommissionLedger::distinct('type')
            ->where('type', '!=', 'adjustment')
            ->pluck('type');

        return Inertia::render('finance/transactions/index', [
            'transactions' => [
                'data' => $transactionsData->items(),
                'links' => $transactionsData->linkCollection(),
                'meta' => [
                    'current_page' => $transactionsData->currentPage(),
                    'last_page' => $transactionsData->lastPage(),
                    'total' => $transactionsData->total(),
                ],
            ],
            'filters' => [
                'type' => $request->get('type'),
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date'),
                'search' => $request->get('search'),
            ],
            'types' => $types,
        ]);
    }

    /**
     * Display the specified transaction.
     */
    public function show(CommissionLedger $transaction)
    {
        $transaction->load(['affiliate.user:id,name', 'order:id,order_number']);

        return Inertia::render('finance/transactions/show', [
            'transaction' => [
                'id' => $transaction->id,
                'reference' => $transaction->reference ?? 'N/A',
                'affiliate' => $transaction->affiliate?->user?->name ?? 'Unknown',
                'affiliate_code' => $transaction->affiliate?->id ?? '-',
                'order' => $transaction->order?->order_number ?? '-',
                'type' => $transaction->type,
                'amount' => $transaction->amount > 0 ? '+Rp ' . number_format($transaction->amount, 2, ',', '.') : '-Rp ' . number_format(abs($transaction->amount), 2, ',', '.'),
                'description' => $transaction->description,
                'created_at' => $transaction->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $transaction->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
