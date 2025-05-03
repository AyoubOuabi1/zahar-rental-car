<?php

use App\Http\Controllers\AddedOptionController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/cars', [HomeController::class, 'cars'])->name('cars');
Route::post('/booking', [HomeController::class, 'getAvailableCars'])->name('booking-cars');
Route::get('/reservation/options', [HomeController::class, 'options']);
Route::get('/reservation/checkout', [HomeController::class, 'checkout']);
// web.php
Route::post('/reservation/store', [HomeController::class, 'storeReservation'])
    ->name('reservation.store');

Route::get('/reservation/thankyou', function () {
    return Inertia::render('front/cars/thankyou');
})->name('reservation.thankyou');
Route::middleware(['auth', 'verified'])->prefix('dashboard')->as('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('index');

    Route::resource('cars', CarController::class);
    Route::resource('clients', ClientController::class);
    Route::resource('reservations', ReservationController::class);
    Route::put('reservations/{reservation}/status', [ReservationController::class, 'changeStatus'])->name('reservations.change-status');
    Route::get('reservations/{reservation}/invoice', [ReservationController::class, 'generateInvoice'])->name('reservations.invoice');
    Route::resource('added-options', AddedOptionController::class);
    Route::resource('places', PlaceController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
