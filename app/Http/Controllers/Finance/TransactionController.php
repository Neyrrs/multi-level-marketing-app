<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of finance transactions (commission + paid orders).
     */
    public function index(Request $request)
    {
        $commissionQuery = DB::table('commission_ledgers')
            ->leftJoin('affiliates', 'commission_ledgers.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw("
                commission_ledgers.id as id,
                'commission' as source,
                COALESCE(commission_ledgers.reference, '-') as reference,
                COALESCE(users.name, 'Unknown') as affiliate,
                COALESCE(affiliates.id::text, '-') as affiliate_code,
                commission_ledgers.type as type,
                commission_ledgers.amount::numeric as amount_raw,
                commission_ledgers.description as description,
                commission_ledgers.created_at as created_at
            ");

        $salesQuery = DB::table('orders')
            ->leftJoin('affiliates', 'orders.affiliate_id', '=', 'affiliates.id')
            ->leftJoin('users', 'affiliates.user_id', '=', 'users.id')
            ->selectRaw("
                orders.id as id,
                'order' as source,
                COALESCE(orders.midtrans_order_id, orders.order_number, '-') as reference,
                COALESCE(users.name, 'N/A') as affiliate,
                COALESCE(affiliates.id::text, '-') as affiliate_code,
                'sale' as type,
                orders.grand_total::numeric as amount_raw,
                CONCAT('Pembayaran order ', orders.order_number) as description,
                COALESCE(orders.paid_at, orders.updated_at, orders.created_at) as created_at
            ")
            ->where('orders.payment_status', 'paid');

        // Filter by type (commission type or sale)
        if ($request->filled('type')) {
            $type = $request->get('type');
            if ($type === 'sale') {
                $commissionQuery->whereRaw('1 = 0');
            } else {
                $commissionQuery->where('commission_ledgers.type', $type);
                $salesQuery->whereRaw('1 = 0');
            }
        }

        // Filter by date range
        if ($request->filled('start_date')) {
            $commissionQuery->whereDate('commission_ledgers.created_at', '>=', $request->get('start_date'));
            $salesQuery->whereDate(DB::raw('COALESCE(orders.paid_at, orders.updated_at, orders.created_at)'), '>=', $request->get('start_date'));
        }
        if ($request->filled('end_date')) {
            $commissionQuery->whereDate('commission_ledgers.created_at', '<=', $request->get('end_date'));
            $salesQuery->whereDate(DB::raw('COALESCE(orders.paid_at, orders.updated_at, orders.created_at)'), '<=', $request->get('end_date'));
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->get('search');
            $commissionQuery->where(function ($q) use ($search) {
                $q->where('commission_ledgers.reference', 'like', "%{$search}%")
                    ->orWhere('commission_ledgers.description', 'like', "%{$search}%")
                    ->orWhere('users.name', 'like', "%{$search}%");
            });
            $salesQuery->where(function ($q) use ($search) {
                $q->where('orders.order_number', 'like', "%{$search}%")
                    ->orWhere('orders.midtrans_order_id', 'like', "%{$search}%")
                    ->orWhere('users.name', 'like', "%{$search}%");
            });
        }

        $unionQuery = $commissionQuery->unionAll($salesQuery);
        $transactions = DB::query()
            ->fromSub($unionQuery, 'transactions')
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $transactionsData = $transactions->through(fn ($transaction) => [
            'id' => $transaction->id,
            'reference' => $transaction->reference ?? 'N/A',
            'affiliate' => $transaction->affiliate ?? 'Unknown',
            'affiliate_code' => $transaction->affiliate_code ?? '-',
            'type' => $transaction->type,
            'amount' => (float) $transaction->amount_raw > 0
                ? '+Rp ' . number_format((float) $transaction->amount_raw, 2, ',', '.')
                : '-Rp ' . number_format(abs((float) $transaction->amount_raw), 2, ',', '.'),
            'description' => $transaction->description,
            'created_at' => \Carbon\Carbon::parse($transaction->created_at)->format('Y-m-d H:i'),
        ]);

        // Get unique types + include sales
        $types = DB::table('commission_ledgers')
            ->where('type', '!=', 'adjustment')
            ->distinct()
            ->pluck('type')
            ->push('sale')
            ->unique()
            ->values();

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
