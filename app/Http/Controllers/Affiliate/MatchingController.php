<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchingController extends Controller
{
    public function index()
    {
        return Inertia::render('affiliate/matching-bonus/index');
    }
}
