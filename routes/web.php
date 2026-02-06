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
use App\Http\Controllers\Logistik\OrderController;
use App\Http\Controllers\Finance\FinanceReportController;
use App\Http\Controllers\Finance\TransactionController;


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
        Route::get('/shop', fn () => Inertia::render('guest/shop/index'));
        Route::get('/shop-history', fn () => Inertia::render('guest/shop-history/index'))
            ->name('shop-history');
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
        Route::get('product-management', fn () => Inertia::render('admin/manajemen-produk/index'))
            ->name('product-management');
        Route::get('affiliate-management', fn () => Inertia::render('admin/manajemen-affiliate/index'))
            ->name('affiliate-management');
        Route::get('commission-setting', fn () => Inertia::render('admin/pengaturan-komisi/index'))
            ->name('commission-setting');
        Route::get('plan-setting', fn () => Inertia::render('admin/pengaturan-plan/index'))
            ->name('plan-setting');

         Route::resource('UsersRole', Admin\UserRole::class);
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

        Route::get('reports/sold-record', [Manager\Report\SalesReportController::class, 'index'])
            ->name('reports.sold-record');

        Route::get('reports/finance-record', [Manager\Report\FinanceReportController::class, 'index'])
            ->name('reports.finance-record');

        Route::get('reports/product-record', [Manager\Report\ProductReportController::class, 'index'])
            ->name('reports.product-record');

        Route::get('reports/commission-record', [Manager\Report\CommissionReportController::class, 'index'])
            ->name('reports.commission-record');

        // Route::get('reports/affiliate-record', [Manager\Report\AffiliateReportController::class, 'index'])
        //     ->name('reports.affiliate-record');
        Route::get('reports/nyoba', [Manager\Report\AffiliateReportController::class, 'index'])
            ->name('reports.nyoba');
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
        Route::get('binary', [Affiliate\BinaryController::class, 'index']);
        Route::get('komisi', [Affiliate\KomisiController::class, 'index']);
        Route::get('kode', [Affiliate\KodeController::class, 'index']);
        Route::get('pengaturan', [Affiliate\PengaturanController::class, 'index']);
        Route::get('personal', [Affiliate\PersonalController::class, 'index']);
        Route::get('downline', [Affiliate\DownlineController::class, 'index']);

        Route::resource('tree', Affiliate\TreeController::class);
        Route::resource('shop', Affiliate\ShopController::class);
        Route::resource('shop-history', Affiliate\ShopHistoryController::class);
        Route::resource('pin-list', Affiliate\PinListController::class);
        Route::resource('pin-history', Affiliate\PinHistoryController::class);
        Route::resource('generation-ro', Affiliate\GeneraionController::class);
        Route::resource('personal-ro', Affiliate\PersonalController::class);
        Route::resource('matching-bonus', Affiliate\MatchingController::class);
        Route::resource('sponsor', Affiliate\SponsorController::class);
        Route::resource('reward', Affiliate\ProductController::class);
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

            Route::get('dashboard', fn () =>
                Inertia::render('logistik/dashboard')
            )->name('dashboard');

            Route::prefix('orders')
                ->name('orders.')
                ->group(function () {

                    Route::get('/manage-orders', [OrderController::class, 'ManageOrders'])
                        ->name('manage-orders');
                    Route::get('/shipping-status', [OrderController::class, 'shippingStatus'])
                        ->name('shipping-status');
                    Route::get('/product-stock-management', [OrderController::class, 'ProductStockManagement'])
                        ->name('product-stock-management');
                    Route::get('/stock-movement', [OrderController::class, 'StockMovement'])
                        ->name('stock-movement');
                    Route::get('/product-returns', [OrderController::class, 'ProductReturns'])
                        ->name('product-returns');
                    Route::get('/return-history', [OrderController::class, 'ReturnHistory'])
                        ->name('return-history');
                });

            Route::resource('returns', ReturnController::class);
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
        Route::get('/transaction-management', [FinanceReportController::class, 'TransactionManagement'])
            ->name('transaction-management');
        Route::get('/withdraw-request', [FinanceReportController::class, 'WithdrawRequest'])
            ->name('withdraw-request');
        Route::get('/withdraw-approval', [FinanceReportController::class, 'WithdrawApproval'])
            ->name('withdraw-approval');
        Route::get('/financial-report', [FinanceReportController::class, 'FinancialReport'])
            ->name('financial-report');
        Route::get('/commission-report', [FinanceReportController::class, 'CommissionReport'])
            ->name('commission-report');
        Route::get('/tree', [FinanceReportController::class, 'Tree'])
            ->name('tree');


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
