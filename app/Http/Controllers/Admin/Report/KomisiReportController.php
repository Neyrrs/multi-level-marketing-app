<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KomisiReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));

        $query = Commission::query()
            ->with(['affiliate.user:id,name', 'method:id,name', 'rule:id,value', 'order:id,total_amount'])
            ->orderByDesc('created_at');

        if ($search !== '') {
            $query->whereHas('affiliate.user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        $commissions = $query->paginate((int) $request->input('per_page', 20))->withQueryString();

        $commissionData = $commissions->getCollection()->map(function ($item) {
            $status = match ($item->status) {
                'paid' => 'paid',
                'pending' => 'pending',
                default => 'on_hold',
            };

            return [
                'id' => $item->id,
                'tanggal' => optional($item->created_at)->format('Y-m-d'),
                'member_name' => $item->affiliate?->user?->name ?? 'Unknown',
                'method' => $item->method?->name ?? '-',
                'poin' => (float) ($item->order?->total_amount ?? 0),
                'persentase' => (float) ($item->rule?->value ?? 0),
                'amount' => (float) ($item->amount ?? 0),
                'status' => $status,
            ];
        })->values();

        $totalComm = (float) Commission::sum('amount');
        $totalTransactions = (int) Commission::count();
        $paidTotal = (float) Commission::where('status', 'paid')->sum('amount');

        return Inertia::render('admin/LaporanKomisi/index', [
            'commissionData' => $commissionData,
            'filters' => [
                'search' => $search,
            ],
            'summary' => [
                'totalComm' => $totalComm,
                'totalTransactions' => $totalTransactions,
                'paidTotal' => $paidTotal,
            ],
            'pagination' => [
                'total' => $commissions->total(),
                'currentPage' => $commissions->currentPage(),
                'lastPage' => $commissions->lastPage(),
                'perPage' => $commissions->perPage(),
            ],
        ]);
    }
}
