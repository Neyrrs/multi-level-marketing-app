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
        Route::get('/DaftarAffiliate', fn () => Inertia::render('guest/DaftarAffiliate/register'))
            ->name('DaftarAffiliate');
        Route::get('/Contact', fn () => Inertia::render('guest/Contact/index'))
            ->name('Contact');
        Route::get('/CaraKerja', fn () => Inertia::render('guest/CaraKerja/index'))
            ->name('CaraKerja');
        Route::get('/tree', fn () => Inertia::render('guest/tree/index'))
            ->name('tree');
        Route::get('/shop', fn () => Inertia::render('guest/shop/index'))
            ->name('shop');
        Route::get('/pin-history', fn () => Inertia::render('guest/pin-history/index'))
            ->name('pin-history');
        Route::get('/pin-list', fn () => Inertia::render('guest/pin-list/index'))
            ->name('pin-list');
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

        Route::resource('MasterProduk', Admin\MasterProdukController::class);
        Route::resource('ManajemenAffiliate', Admin\ManajemenAffiliateController::class);
        Route::resource('PengaturanPlan', Admin\PlanController::class);
        Route::resource('PengaturanKomisi', Admin\KomisiController::class);

        Route::resource('Orders', Admin\OrderController::class);
        Route::resource('Transaksi', Admin\TransactionController::class);

        Route::resource('UsersRole', Admin\UserRole::class);

        Route::get('reports/LaporanPenjualan', [Admin\Report\SalesReportController::class, 'index'])
            ->name('reports.LaporanPenjualan');

        Route::get('reports/LaporanAffiliate', [Admin\Report\AffiliateReportController::class, 'index'])
            ->name('reports.LaporanAffiliate');
        Route::get('reports/LaporanKeuangan', [Admin\Report\FinanceReportController::class, 'index'])
            ->name('reports.LaporanKeuangan');
        Route::get('reports/LaporanKomisi', [Admin\Report\KomisiReportController::class, 'index'])
            ->name('reports.LaporanKomisi');
        Route::get('reports/LaporanProduk', [Admin\Report\ProductReportController::class, 'index'])
            ->name('reports.LaporanProduk');
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

        Route::get('reports/LaporanPenjualan', [Manager\Report\SalesReportController::class, 'index'])
            ->name('reports.laporanPenjualan');

        Route::get('reports/LaporanAffiliate', [Manager\Report\AffiliateReportController::class, 'index'])
            ->name('reports.laporanAffiliate');

        Route::get('reports/LaporanKeuangan', [Manager\Report\FinanceReportController::class, 'index'])
            ->name('reports.laporanKeuangan');

        Route::get('reports/LaporanProduk', [Manager\Report\ProductReportController::class, 'index'])
            ->name('reports.laporanProduk');
        Route::get('reports/LaporanKomisi', [Manager\Report\CommissionReportController::class, 'index'])
            ->name('reports.laporanKomisi');
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
        Route::resource('kode', Affiliate\CodeController::class);
        Route::resource('redeem', Affiliate\ActivationCodeController::class);
        Route::resource('komisi', Affiliate\CommissionController::class)->only(['index']);

        Route::get('binary', [Affiliate\NetworkController::class, 'index'])
            ->name('binary');
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
Route::get('/dashboard-sementara', function () {
    return Inertia::render('dashboard/dashboard');
})->name('dashboard.dashboard');

require __DIR__.'/settings.php';
