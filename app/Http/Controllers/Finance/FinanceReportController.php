<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceReportController extends Controller
{
    public function index()
    {
        // return inertia('finance/reports/index');
    }

    public function TransactionManagement()
    {
        return Inertia::render('finance/transaction-management/index');
    }

    public function WithdrawRequest()
    {
        return Inertia::render('finance/withdraw-request/index');
    }

    public function WithdrawApproval()
    {
        return Inertia::render('finance/withdraw-approval/index');
    }

    public function FinancialReport()
    {
        return Inertia::render('finance/financial-report/index');
    }

    public function CommissionReport()
    {
        return Inertia::render('finance/commission-report/index');
    }

    public function Tree()
    {
        return Inertia::render('finance/tree/index');
    }
}
