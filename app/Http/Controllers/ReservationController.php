<?php

// app/Http/Controllers/ReservationController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    // List all reservations
    public function index()
    {
        $reservations = Reservation::with(['car', 'client', 'pack', 'pickUpPlace', 'dropOffPlace'])->get();
        return Inertia::render('reservations', [
            'reservations' => $reservations,
        ]);
    }

    // Store a new reservation
    public function store(Request $request)
    {
        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after:date_from',
            'pick_up_place_id' => 'required|exists:places,id',
            'drop_off_place_id' => 'required|exists:places,id',
            'car_id' => 'required|exists:cars,id',
            'client_id' => 'required|exists:clients,id',
            'pack_id' => 'nullable|exists:packs,id',
            'added_option_ids' => 'nullable|array',
            'total_price' => 'required|numeric',
            'vol_number' => 'nullable|string',
        ]);

        $reservation = Reservation::create($request->all());

        return redirect()->route('reservations')->with('success', 'Reservation created successfully.');
    }

    // Show a specific reservation
    public function show(Reservation $reservation)
    {
        return Inertia::render('Reservations/Show', [
            'reservation' => $reservation->load(['car', 'client', 'pack', 'pickUpPlace', 'dropOffPlace']),
        ]);
    }

    // Update a reservation
    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after:date_from',
            'pick_up_place_id' => 'required|exists:places,id',
            'drop_off_place_id' => 'required|exists:places,id',
            'car_id' => 'required|exists:cars,id',
            'client_id' => 'required|exists:clients,id',
            'pack_id' => 'nullable|exists:packs,id',
            'added_option_ids' => 'nullable|array',
            'total_price' => 'required|numeric',
            'vol_number' => 'nullable|string|max:10', // Flight number
        ]);

        $reservation->update($request->all());

        return redirect()->route('reservations')->with('success', 'Reservation updated successfully.');
    }

    // Delete a reservation
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->route('reservations')->with('success', 'Reservation deleted successfully.');
    }
}
