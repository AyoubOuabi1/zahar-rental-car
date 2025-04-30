<?php

use App\Http\Controllers\AddedOptionController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PackController;
use App\Http\Controllers\PackItemController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ReservationController;
use App\Models\Reservation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/cars', [HomeController::class, 'cars'])->name('cars');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->as('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('index'); // Route name: dashboard.index → /dashboard

    Route::resource('cars', CarController::class);
    Route::resource('clients', ClientController::class);
    Route::resource('reservations', ReservationController::class);
    Route::put('reservations/{reservation}/status', [ReservationController::class, 'changeStatus'])->name('reservations.change-status');
    Route::get('reservations/{reservation}/invoice', [ReservationController::class, 'generateInvoice'])->name('reservations.invoice');

    Route::resource('packs', PackController::class);
    Route::resource('packitems', PackItemController::class);
    Route::resource('added-options', AddedOptionController::class);
    Route::resource('places', PlaceController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
