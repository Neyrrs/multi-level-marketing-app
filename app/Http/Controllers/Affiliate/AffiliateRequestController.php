<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateRequestController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('affiliate/request/index', [
            'requests' => [],
        ]);
    }
}

