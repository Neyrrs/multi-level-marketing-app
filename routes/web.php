<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Spatie\Permission\Middleware\RoleMiddleware;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Manager;
use App\Http\Controllers\Affiliate;
use App\Http\Controllers\Guest as GuestControllers;
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
        Route::get('/shop', [GuestControllers\ShopController::class, 'index'])->name('shop.index');
        Route::post('/shop', [GuestControllers\ShopController::class, 'store'])->name('shop.store');
        Route::post('/shop/checkout', [GuestControllers\ShopController::class, 'checkout'])->name('shop.checkout');
        Route::post('/shop/cancel', [GuestControllers\ShopController::class, 'cancel'])->name('shop.cancel');
        Route::get('/shop-history', [GuestControllers\ShopHistoryController::class, 'index'])->name('shop-history');
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

        // Pages with controllers (data fetching)
        Route::get('products', [Admin\ProductController::class, 'index'])->name('products.index');
        Route::get('products/create', [Admin\ProductController::class, 'create'])->name('products.create');
        Route::post('products', [Admin\ProductController::class, 'store'])->name('products.store');
        Route::get('products/{product}/edit', [Admin\ProductController::class, 'edit'])->name('products.edit');
        Route::put('products/{product}', [Admin\ProductController::class, 'update'])->name('products.update');
        Route::delete('products/{product}', [Admin\ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('commission-methods', [Admin\CommissionMethodController::class, 'index'])->name('commission-methods.index');
        Route::get('commission-methods/create', [Admin\CommissionMethodController::class, 'create'])->name('commission-methods.create');
        Route::post('commission-methods', [Admin\CommissionMethodController::class, 'store'])->name('commission-methods.store');
        Route::get('commission-methods/{commissionMethod}/edit', [Admin\CommissionMethodController::class, 'edit'])->name('commission-methods.edit');
        Route::put('commission-methods/{commissionMethod}', [Admin\CommissionMethodController::class, 'update'])->name('commission-methods.update');
        Route::delete('commission-methods/{commissionMethod}', [Admin\CommissionMethodController::class, 'destroy'])->name('commission-methods.destroy');

        Route::get('commission-rules', [Admin\CommissionRuleController::class, 'index'])->name('commission-rules.index');
        Route::get('commission-rules/create', [Admin\CommissionRuleController::class, 'create'])->name('commission-rules.create');
        Route::post('commission-rules', [Admin\CommissionRuleController::class, 'store'])->name('commission-rules.store');
        Route::get('commission-rules/{commissionRule}/edit', [Admin\CommissionRuleController::class, 'edit'])->name('commission-rules.edit');
        Route::put('commission-rules/{commissionRule}', [Admin\CommissionRuleController::class, 'update'])->name('commission-rules.update');
        Route::delete('commission-rules/{commissionRule}', [Admin\CommissionRuleController::class, 'destroy'])->name('commission-rules.destroy');

        Route::get('affiliates', [Admin\AffiliatesController::class, 'index'])->name('affiliates.index');
        Route::post('affiliates/{affiliate}/approve', [Admin\AffiliatesController::class, 'approvePending'])->name('affiliates.approve');
        Route::post('affiliates/{affiliate}/set-sponsor', [Admin\AffiliatesController::class, 'setSponsor'])->name('affiliates.set-sponsor');
        Route::post('affiliates/{affiliate}/set-position', [Admin\AffiliatesController::class, 'setPosition'])->name('affiliates.set-position');

        // MLM Tree Structure
        Route::get('mlm-tree', [Admin\MlmTreeController::class, 'index'])->name('mlm-tree.index');
        Route::get('mlm-tree/{affiliate}', [Admin\MlmTreeController::class, 'show'])->name('mlm-tree.show');

        Route::get('withdrawals', [Admin\WithdrawalsController::class, 'index'])->name('withdrawals.index');
        Route::post('withdrawals/{withdrawal}/approve', [Admin\WithdrawalsController::class, 'approve'])->name('withdrawals.approve');
        Route::post('withdrawals/{withdrawal}/reject', [Admin\WithdrawalsController::class, 'reject'])->name('withdrawals.reject');

        Route::get('payout-report', [Admin\PayoutReportController::class, 'index'])->name('payout-report');

        Route::get('notifications', [Admin\NotificationsController::class, 'index'])->name('notifications.index');
        Route::post('notifications/{id}/resend', [Admin\NotificationsController::class, 'resend'])->name('notifications.resend');
        Route::delete('notifications/{id}', [Admin\NotificationsController::class, 'destroy'])->name('notifications.destroy');

        // Legacy routes (keep for backward compatibility)
        Route::get('product-management', fn () => Inertia::render('admin/manajemen-produk/index'))
            ->name('product-management');
        Route::get('affiliate-management', [Admin\ManajemenAffiliateController::class, 'index'])
            ->name('affiliate-management');
        Route::get('commission-setting', fn () => Inertia::render('admin/pengaturan-komisi/index'))
            ->name('commission-setting');
        Route::get('plan-setting', fn () => Inertia::render('admin/pengaturan-plan/index'))
            ->name('plan-setting');

        // API Resources (with 'api' prefix in route names to avoid conflicts)
        Route::apiResource('api/products', \App\Http\Controllers\ProductsController::class, ['names' => 'api.products']);
        Route::apiResource('api/commission-methods', \App\Http\Controllers\CommissionMethodController::class, ['names' => 'api.commission-methods']);
        Route::apiResource('api/commission-rules', \App\Http\Controllers\CommissionRuleController::class, ['names' => 'api.commission-rules']);
        Route::apiResource('api/withdrawals', \App\Http\Controllers\WithdrawalController::class, ['names' => 'api.withdrawals']);

        // Legacy resource routes
        Route::resource('UsersRole', Admin\UserRole::class);
        Route::resource('MasterProduk', Admin\MasterProdukController::class);
        Route::resource('ManajemenAffiliate', Admin\ManajemenAffiliateController::class);
        Route::resource('PengaturanPlan', Admin\PlanController::class);
        Route::resource('PengaturanKomisi', Admin\KomisiController::class);

        Route::resource('Orders', Admin\OrderController::class);
        Route::resource('Transaksi', Admin\TransactionController::class);

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

        Route::get('reports/affiliate-record', [Manager\Report\AffiliateReportController::class, 'index'])
            ->name('reports.affiliate-record');
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

        Route::get('dashboard', [Affiliate\DashboardController::class, 'index'])
            ->name('dashboard');
        Route::get('binary', [Affiliate\BinaryController::class, 'index'])
            ->name('binary');
        Route::get('komisi', [Affiliate\KomisiController::class, 'index'])
            ->name('komisi');
        Route::get('kode', [Affiliate\KodeController::class, 'index'])
            ->name('kode');
        Route::get('pengaturan', [Affiliate\PengaturanController::class, 'index'])
            ->name('pengaturan');
        Route::get('personal', [Affiliate\PersonalController::class, 'index'])
            ->name('personal');
        Route::get('downline', [Affiliate\DownlineController::class, 'index'])
            ->name('downline');
        Route::get('sponsor', [Affiliate\SponsorController::class, 'index'])
            ->name('sponsor');
        Route::get('generation-ro', [Affiliate\GeneraionController::class, 'index'])
            ->name('generation-ro');
        Route::get('matching-bonus', [Affiliate\MatchingController::class, 'index'])
            ->name('matching-bonus');
        Route::get('pin-history', [Affiliate\PinHistoryController::class, 'index'])
            ->name('pin-history');
        Route::get('shop-history', [Affiliate\ShopHistoryController::class, 'index'])
            ->name('shop-history');

        Route::resource('tree', Affiliate\TreeController::class, ['names' => 'tree']);
        Route::post('shop/checkout', [Affiliate\ShopController::class, 'checkout'])->name('shop.checkout');
        Route::post('shop/cancel', [Affiliate\ShopController::class, 'cancel'])->name('shop.cancel');
        Route::resource('shop', Affiliate\ShopController::class, ['names' => 'shop']);
        Route::resource('pin-list', Affiliate\PinListController::class, ['names' => 'pin-list']);
        Route::resource('personal-ro', Affiliate\PersonalController::class, ['names' => 'personal-ro']);
        Route::resource('reward', Affiliate\ProductController::class, ['names' => 'reward']);
        Route::resource('redeem', Affiliate\ReedemController::class, ['names' => 'redeem']);
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

        Route::get('dashboard', [Logistik\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('orders', Logistik\OrderController::class);
        Route::resource('shipments', Logistik\ShipmentController::class);
        Route::resource('inventory', Logistik\InventoryController::class);
        Route::resource('returns', Logistik\ReturnController::class);

        // Shipment Actions
        Route::post('shipments/{shipment}/mark-shipped', [Logistik\ShipmentController::class, 'markAsShipped'])
            ->name('shipments.mark-shipped');
        Route::post('shipments/{shipment}/mark-delivered', [Logistik\ShipmentController::class, 'markAsDelivered'])
            ->name('shipments.mark-delivered');
        Route::post('shipments/{shipment}/add-tracking', [Logistik\ShipmentController::class, 'addTracking'])
            ->name('shipments.add-tracking');

        // Order Actions
        Route::post('orders/{order}/mark-ready-to-ship', [Logistik\OrderController::class, 'markAsReadyToShip'])
            ->name('orders.mark-ready-to-ship');
        Route::get('orders/awaiting-shipment', [Logistik\OrderController::class, 'getAwaitingShipment'])
            ->name('orders.awaiting-shipment');

        // Reports
        Route::get('reports/delivery', [Logistik\ReportController::class, 'delivery'])
            ->name('reports.delivery');
        Route::get('reports/shipment', [Logistik\ReportController::class, 'shipment'])
            ->name('reports.shipment');
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

        Route::get('dashboard', [Finance\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('transactions', Finance\TransactionController::class)->only(['index', 'show']);
        Route::resource('withdrawals', Finance\WithdrawalController::class)->only(['index', 'show']);

        Route::post('withdrawals/{withdrawal}/approve', [Finance\WithdrawalController::class, 'approve'])
            ->name('withdrawals.approve');
        Route::post('withdrawals/{withdrawal}/process', [Finance\WithdrawalController::class, 'process'])
            ->name('withdrawals.process');
        Route::post('withdrawals/{withdrawal}/reject', [Finance\WithdrawalController::class, 'reject'])
            ->name('withdrawals.reject');

        Route::get('reports', [Finance\FinanceReportController::class, 'index'])
            ->name('reports.index');

        Route::get('network', [Finance\NetworkController::class, 'index'])
            ->name('network');
    });

});

Route::get('/', function (Request $request) {
    // Auto-assign random affiliate referral for new public session.
    if (!$request->session()->has('ref_affiliate_id')) {
        $affiliate = app(\App\Services\AffiliateService::class)->assignRandomSponsor();
        if ($affiliate) {
            $request->session()->put('ref_affiliate_id', $affiliate->id);
            $request->session()->put('ref_affiliate_slug', $affiliate->slug);
        }
    }

    $slug = $request->session()->get('ref_affiliate_slug');
    if (!empty($slug)) {
        return redirect('/' . $slug);
    }

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

// Public media proxy for local environments where /storage can return 403.
Route::get('/media/{path}', function (string $path) {
    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return Storage::disk('public')->response($path);
})->where('path', '.*')->name('media.public');

// Public affiliate referral link.
Route::get('/a/{slug}', function (Request $request, string $slug) {
    $affiliate = app(\App\Services\AffiliateService::class)->getAffiliateBySlug($slug);

    if (!$affiliate) {
        return redirect()->route('home')->with('error', 'Link affiliate tidak ditemukan.');
    }

    $request->session()->put('ref_affiliate_id', $affiliate->id);
    $request->session()->put('ref_affiliate_slug', $affiliate->slug);

    return redirect()->route('home')->with('success', "Referral affiliate @{$affiliate->slug} aktif.");
})->name('affiliate.ref');

// Public affiliate landing by slug: /{slug}
Route::get('/{slug}', function (Request $request, string $slug) {
    $affiliate = app(\App\Services\AffiliateService::class)->getAffiliateBySlug($slug);
    if (!$affiliate) {
        abort(404);
    }

    $request->session()->put('ref_affiliate_id', $affiliate->id);
    $request->session()->put('ref_affiliate_slug', $affiliate->slug);

    return Inertia::render('home');
})->where('slug', '^(?!login$|register$|logout$|produk$|mitra$|profile$|cart$|edit-profile$|dashboard-sementara$|storage$|media$|webhooks$|admin$|manager$|affiliate$|logistik$|finance$)[A-Za-z0-9_-]+$')
  ->name('affiliate.landing');

// Force logout route: clear auth + session in one hit
Route::get('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    $request->session()->flush();

    return redirect('/login');
})->name('logout.force');

// Webhooks (no auth required)
Route::post('/webhooks/midtrans', [\App\Http\Controllers\Webhooks\MidtransController::class, 'handle'])->name('webhooks.midtrans');

require __DIR__.'/settings.php';
