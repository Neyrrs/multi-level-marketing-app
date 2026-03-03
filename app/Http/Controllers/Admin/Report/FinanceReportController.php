<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $totalMasuk = (float) Order::whereIn('payment_status', ['paid', 'settlement', 'capture'])->sum('grand_total');
        $totalKeluarKomisi = (float) DB::table('commission_ledgers')
            ->where('amount', '<', 0)
            ->sum(DB::raw('ABS(amount)'));
        $totalKeluarWithdrawal = (float) Withdrawal::whereIn('status', ['approved', 'processed'])
            ->sum('net_amount');
        $totalKeluar = $totalKeluarKomisi + $totalKeluarWithdrawal;
        $nettFlow = $totalMasuk - $totalKeluar;

        $rows = [
            [
                'kategori' => 'Penjualan Produk',
                'masuk' => $totalMasuk,
                'keluar' => 0.0,
                'saldo' => $totalMasuk,
            ],
            [
                'kategori' => 'Komisi Dibayarkan',
                'masuk' => 0.0,
                'keluar' => $totalKeluarKomisi,
                'saldo' => -$totalKeluarKomisi,
            ],
            [
                'kategori' => 'Withdrawal Diproses',
                'masuk' => 0.0,
                'keluar' => $totalKeluarWithdrawal,
                'saldo' => -$totalKeluarWithdrawal,
            ],
        ];

        return Inertia::render('admin/LaporanKeuangan/index', [
            'rows' => $rows,
            'summary' => [
                'totalMasuk' => $totalMasuk,
                'totalKeluar' => $totalKeluar,
                'nettFlow' => $nettFlow,
            ],
        ]);
    }
}
