<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PinListController extends Controller
{
    public function index()
    {
        return Inertia::render('affiliate/pin-list/index');
    }
}
