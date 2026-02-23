<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function packages()
    {
        $packages = \App\Models\Package::paginate(50);
        return Inertia::render('admin/packages/index', ['packages' => $packages]);
    }

    public function commissions()
    {
        $methods = \App\Models\CommissionMethod::with('rules')->get();
        return Inertia::render('admin/commissions/index', ['methods' => $methods]);
    }

    public function users()
    {
        $users = \App\Models\User::with('profile')->paginate(50);
        return Inertia::render('admin/users/index', ['users' => $users]);
    }

    public function dashboard()
    {
        $summary = [
            'users' => \App\Models\User::count(),
            'affiliates' => \App\Models\Affiliate::count(),
            'orders' => \App\Models\Order::count(),
        ];
        return Inertia::render('admin/dashboard', ['summary' => $summary]);
    }
}
