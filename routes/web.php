<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Spatie\Permission\Middleware\RoleMiddleware;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });
Route::middleware(['auth', 'verified'])->group(function () {

    // Guest / default dashboard (name: dashboard)
    Route::middleware([RoleMiddleware::class . ':guest'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('guest/dashboard');
        })->name('dashboard');
    });

    // Admin dashboard (name: dashboard.admin)
    Route::middleware([RoleMiddleware::class . ':admin'])->group(function () {
        Route::get('admin/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('dashboard.admin');
    });

    // Manager dashboard (name: dashboard.manager)
    Route::middleware([RoleMiddleware::class . ':manager'])->group(function () {
        Route::get('manager/dashboard', function () {
            return Inertia::render('manager/dashboard');
        })->name('dashboard.manager');
    });

    // Logistik dashboard (name: dashboard.logistik)
    Route::middleware([RoleMiddleware::class . ':logistik'])->group(function () {
        Route::get('logistik/dashboard', function () {
            return Inertia::render('logistik/dashboard');
        })->name('dashboard.logistik');
    });

    // Affiliate dashboard (name: dashboard.affiliate)
    Route::middleware([RoleMiddleware::class . ':affiliate'])->group(function () {
        Route::get('affiliate/dashboard', function () {
            return Inertia::render('affiliate/dashboard');
        })->name('dashboard.affiliate');
    });

});

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/produk', function () {
    return Inertia::render('product');
})->name('product');

// Route::get('/login', function () {
//     return Inertia::render('login');
// })->name('login');

// Route::get('/register', function () {
//     return Inertia::render('register');
// })->name('register');

Route::get('/mitra', function () {
    return Inertia::render('mitra');
})->name('mitra');

Route::get('/detail-product/{slug}', function ($slug) {
    return Inertia::render('detail-product',[
        'slug' => $slug,
    ]);
})->name('detail-product');

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::get('/edit-profile', function () {
    return Inertia::render('edit-profile');
})->name('edit-profile');
Route::get('/dashboard-sementara', function () {
    return Inertia::render('dashboard/dashboard');
})->name('dashboard.dashboard');

require __DIR__.'/settings.php';
