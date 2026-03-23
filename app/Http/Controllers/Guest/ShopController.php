<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        return redirect()->route('cart');
    }

    public function store(Request $request)
    {
        return redirect()->route('cart');
    }

    public function checkout(Request $request)
    {
        return redirect()->route('cart');
    }

    public function cancel(Request $request)
    {
        return redirect()->route('cart');
    }
}
