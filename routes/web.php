<?php

use App\Http\Controllers\AddedOptionController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PackController;
use App\Http\Controllers\PackItemController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('cars', CarController::class);
    Route::resource('clients', ClientController::class);

    // Reservation routes - resource plus custom routes
    Route::resource('reservations', ReservationController::class);
    Route::put('/reservations/{reservation}/status', [ReservationController::class, 'changeStatus'])->name('reservations.change-status');
    Route::get('/reservations/{reservation}/invoice', [ReservationController::class, 'generateInvoice'])->name('reservations.invoice');
    Route::get('/available-cars', [ReservationController::class, 'getAvailableCars'])->name('reservations.available-cars');
    Route::get('/reservations-dashboard', [ReservationController::class, 'dashboard'])->name('reservations.dashboard');

    Route::resource('packs', PackController::class);
    Route::resource('packitems', PackItemController::class);
    Route::resource('added-options', AddedOptionController::class);
    Route::resource('places', PlaceController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
