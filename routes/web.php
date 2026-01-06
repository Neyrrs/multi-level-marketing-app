<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Spatie\Permission\Middleware\RoleMiddleware;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Manager;
use App\Http\Controllers\Affiliate;
use App\Http\Controllers\Logistik;
use App\Http\Controllers\Finance;

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

    /*
    |--------------------------------------------------------------------------
    | GUEST
    |--------------------------------------------------------------------------
    */
    Route::middleware([RoleMiddleware::class . ':guest'])->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('guest/dashboard'))
            ->name('dashboard');
    });

    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')
        ->name('admin.')
        ->middleware([RoleMiddleware::class . ':admin'])
        ->group(function () {

        Route::get('dashboard', fn () => Inertia::render('admin/dashboard'))
            ->name('dashboard');

        Route::resource('products', Admin\MasterProdukController::class);
        Route::resource('affiliates', Admin\ManajemenAffiliateController::class);
        Route::resource('plans', Admin\PlanController::class);
        Route::resource('commissions', Admin\KomisiController::class);

        Route::resource('orders', Admin\OrderController::class);
        Route::resource('transactions', Admin\TransactionController::class);

        Route::get('reports/sales', [Admin\Report\SalesReportController::class, 'index'])
            ->name('reports.sales');

        Route::get('reports/affiliates', [Admin\Report\AffiliateReportController::class, 'index'])
            ->name('reports.affiliates');

        Route::get('reports/finance', [Admin\Report\FinanceReportController::class, 'index'])
            ->name('reports.finance');

        Route::get('reports/products', [Admin\Report\ProductReportController::class, 'index'])
            ->name('reports.products');
    });


    /*
    |--------------------------------------------------------------------------
    | MANAGER
    |--------------------------------------------------------------------------
    */
    Route::prefix('manager')
        ->name('manager.')
        ->middleware([RoleMiddleware::class . ':manager'])
        ->group(function () {

        Route::get('dashboard', fn () => Inertia::render('manager/dashboard'))
            ->name('dashboard');

        Route::get('reports/sales', [Manager\Report\SalesReportController::class, 'index'])
            ->name('reports.sales');

        Route::get('reports/affiliates', [Manager\Report\AffiliateReportController::class, 'index'])
            ->name('reports.affiliates');

        Route::get('reports/finance', [Manager\Report\FinanceReportController::class, 'index'])
            ->name('reports.finance');

        Route::get('reports/products', [Manager\Report\ProductReportController::class, 'index'])
            ->name('reports.products');
    });


    /*
    |--------------------------------------------------------------------------
    | AFFILIATE
    |--------------------------------------------------------------------------
    */
    Route::prefix('affiliate')
        ->name('affiliate.')
        ->middleware([RoleMiddleware::class . ':affiliate'])
        ->group(function () {

        Route::get('dashboard', fn () => Inertia::render('affiliate/dashboard'))
            ->name('dashboard');

        Route::resource('products', Affiliate\ProductController::class)->only(['index', 'show']);
        Route::resource('activation-codes', Affiliate\ActivationCodeController::class);
        Route::resource('commissions', Affiliate\CommissionController::class)->only(['index']);

        Route::get('network', [Affiliate\NetworkController::class, 'index'])
            ->name('network');
    });


    /*
    |--------------------------------------------------------------------------
    | LOGISTIK
    |--------------------------------------------------------------------------
    */
    Route::prefix('logistik')
        ->name('logistik.')
        ->middleware([RoleMiddleware::class . ':logistik'])
        ->group(function () {

        Route::get('dashboard', fn () => Inertia::render('logistik/dashboard'))
            ->name('dashboard');

        Route::resource('orders', Logistik\OrderController::class);
        Route::resource('inventory', Logistik\InventoryController::class);
        Route::resource('returns', Logistik\ReturnController::class);
    });


    /*
    |--------------------------------------------------------------------------
    | FINANCE
    |--------------------------------------------------------------------------
    */
    Route::prefix('finance')
        ->name('finance.')
        ->middleware([RoleMiddleware::class . ':finance'])
        ->group(function () {

        Route::get('dashboard', fn () => Inertia::render('finance/dashboard'))
            ->name('dashboard');

        Route::resource('transactions', Finance\TransactionController::class);
        Route::resource('withdrawals', Finance\WithdrawalController::class);

        Route::get('reports', [Finance\FinanceReportController::class, 'index'])
            ->name('reports.index');

        Route::get('network', [Finance\NetworkController::class, 'index'])
            ->name('network');
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

require __DIR__.'/settings.php';
