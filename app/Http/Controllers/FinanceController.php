<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\DB;

class FinanceController extends Controller
{
    public function payoutReport(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $query = Withdrawal::query();
        if ($from) $query->where('created_at', '>=', $from);
        if ($to) $query->where('created_at', '<=', $to);

        $summary = $query->select([
            DB::raw("SUM(CASE WHEN status = 'approved' THEN net_amount ELSE 0 END) as approved_total"),
            DB::raw("SUM(CASE WHEN status = 'paid' THEN net_amount ELSE 0 END) as paid_total"),
            DB::raw('COUNT(*) as count'),
        ])->first();

        return response()->json($summary);
    }
}
