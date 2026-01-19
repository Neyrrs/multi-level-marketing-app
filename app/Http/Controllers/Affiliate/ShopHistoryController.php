<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopHistoryController extends Controller
{
    public function index()
    {
        return Inertia::render('affiliate.shop-history.index');
    }
}
