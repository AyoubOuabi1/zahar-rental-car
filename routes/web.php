<?php

use App\Http\Controllers\AddedOptionController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PackController;
use App\Http\Controllers\PackItemController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ReservationController;
use App\Models\Reservation;
use Barryvdh\DomPDF\Facade\Pdf;
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
    Route::get('/reservations-dashboard', [ReservationController::class, 'dashboard'])->name('reservations.dashboard');

    Route::resource('packs', PackController::class);
    Route::resource('packitems', PackItemController::class);
    Route::resource('added-options', AddedOptionController::class);
    Route::resource('places', PlaceController::class);
    Route::get('/reservations/{reservation}/contract', function (Reservation $reservation) {
        $reservation->load([
            'client',
            'car',
            'pickupPlace',
            'dropoffPlace'
        ]);

        $pdf = PDF::loadView('contract', [
            'reservation' => $reservation,
            'contractNumber' => str_pad($reservation->id, 6, '0', STR_PAD_LEFT)
        ]);

        return $pdf->download("contract-{$reservation->id}.pdf");
    })->name('reservations.contract');
});
Route::get('/reservations/available-cars', [ReservationController::class, 'getAvailableCars'])
    ->name('reservations.available-cars');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
