<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FinanceReportController extends Controller
{
    public function index()
    {
        return inertia('finance/reports/index');
    }
}
