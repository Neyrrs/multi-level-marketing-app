<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NetworkController extends Controller
{
    public function index()
    {
        return inertia('finance/network/index');
    }
}
