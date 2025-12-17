<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/produk', function () {
    return Inertia::render('product');
})->name('product');

Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('register');
})->name('register');

Route::get('/mitra', function () {
    return Inertia::render('mitra');
})->name('mitra');

<<<<<<< HEAD
=======
<<<<<<< HEAD
Route::get('/detail-product/{slug}', function ($slug) {
    return Inertia::render('detail-product',[
        'slug' => $slug,
    ]);
})->name('detail-product');
=======
>>>>>>> b0bda78d2d0da715b0f29abc987a95d91d657875
Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::get('/edit-profile', function () {
    return Inertia::render('edit-profile');
})->name('edit-profile');
<<<<<<< HEAD
=======
>>>>>>> 095cb2497b3e155c1c3a0d7d2e9cf9ab3fd4e96d
>>>>>>> b0bda78d2d0da715b0f29abc987a95d91d657875

require __DIR__.'/settings.php';
