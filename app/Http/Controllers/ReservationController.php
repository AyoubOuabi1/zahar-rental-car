<?php
namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Client;
use App\Models\Pack;
use App\Models\Place;
use Inertia\Inertia;
use App\Models\Reservation;
use App\Models\AddedOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    public function index()
    {
        return Inertia::render('reservations/index', [
            'reservations' => Reservation::with([
                'car',
                'client',
                'pack',
                'pickUpPlace',
                'dropOffPlace',
                'addedOptions'
            ])->latest()->get(),
            'cars' => Car::all(),
            'clients' => Client::all(),
            'packs' => Pack::all(),
            'places' => Place::all(),
            'options' => AddedOption::all(),
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'flight_number' => 'nullable|string|max:20',
            'date_from' => 'required|date|after_or_equal:today',
            'date_to' => 'required|date|after:date_from',
            'pick_up_place_id' => 'required|exists:places,id',
            'drop_off_place_id' => 'required|exists:places,id',
            'car_id' => 'required|exists:cars,id',
            'client_id' => 'required|exists:clients,id',
            'pack_id' => 'nullable|exists:packs,id',
            'added_options' => 'nullable|array',
            'added_options.*.id' => 'required|exists:added_options,id',
            'added_options.*.quantity' => 'required|integer|min:1',
            'added_options.*.price_per_day' => 'required|numeric|min:0',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $reservation = Reservation::create([
                    'flight_number' => $validated['flight_number'] ?? null,
                    'date_from' => $validated['date_from'],
                    'date_to' => $validated['date_to'],
                    'pick_up_place_id' => $validated['pick_up_place_id'],
                    'drop_off_place_id' => $validated['drop_off_place_id'],
                    'car_id' => $validated['car_id'],
                    'client_id' => $validated['client_id'],
                    'pack_id' => $validated['pack_id'] ?? null,
                    'status' => 'confirmed',
                ]);

                if (!empty($validated['added_options'])) {
                    $optionsWithPivot = collect($validated['added_options'])
                        ->mapWithKeys(fn($option) => [
                            $option['id'] => [
                                'quantity' => $option['quantity'],
                                'price_per_day' => $option['price_per_day']
                            ]
                        ])
                        ->toArray();

                    $reservation->addedOptions()->attach($optionsWithPivot);
                }

                $reservation->calculateTotalPrice();
            });

            return redirect()->route('reservations.index')
                ->with('success', 'Reservation created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create reservation: ' . $e->getMessage());
        }
    }

    public function show(Reservation $reservation)
    {
        return Inertia::render('Reservations/Show', [
            'reservation' => $reservation->load([
                'car',
                'client',
                'pack',
                'pickUpPlace',
                'dropOffPlace',
                'addedOptions'
            ]),
        ]);
    }

    public function edit(Reservation $reservation)
    {
        return Inertia::render('reservations/Edit', [
            'reservation' => $reservation->load('addedOptions'),
            'cars' => Car::all(),
            'clients' => Client::all(),
            'packs' => Pack::all(),
            'places' => Place::all(),
            'options' => AddedOption::all(),
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'flight_number' => 'nullable|string|max:20',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after:date_from',
            'pick_up_place_id' => 'required|exists:places,id',
            'drop_off_place_id' => 'required|exists:places,id',
            'car_id' => 'required|exists:cars,id',
            'client_id' => 'required|exists:clients,id',
            'pack_id' => 'nullable|exists:packs,id',
            'status' => ['required', Rule::in(['pending', 'confirmed', 'cancelled', 'completed'])],
            'added_options' => 'nullable|array',
            'added_options.*.id' => 'required|exists:added_options,id',
            'added_options.*.quantity' => 'required|integer|min:1',
            'added_options.*.price_per_day' => 'required|numeric|min:0',
        ]);

        try {
            DB::transaction(function () use ($validated, $reservation) {
                $reservation->update([
                    'flight_number' => $validated['flight_number'] ?? null,
                    'date_from' => $validated['date_from'],
                    'date_to' => $validated['date_to'],
                    'pick_up_place_id' => $validated['pick_up_place_id'],
                    'drop_off_place_id' => $validated['drop_off_place_id'],
                    'car_id' => $validated['car_id'],
                    'client_id' => $validated['client_id'],
                    'pack_id' => $validated['pack_id'] ?? null,
                    'status' => $validated['status'],
                ]);

                $optionsWithPivot = isset($validated['added_options'])
                    ? collect($validated['added_options'])
                        ->mapWithKeys(fn($option) => [
                            $option['id'] => [
                                'quantity' => $option['quantity'],
                                'price_per_day' => $option['price_per_day']
                            ]
                        ])
                        ->toArray()
                    : [];

                $reservation->addedOptions()->sync($optionsWithPivot);
                $reservation->calculateTotalPrice();
            });

            return redirect()->route('reservations.index')
                ->with('success', 'Reservation updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update reservation: ' . $e->getMessage());
        }
    }

    public function destroy(Reservation $reservation)
    {
        try {
            $reservation->delete();
            return redirect()->route('reservations.index')
                ->with('success', 'Reservation deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete reservation: ' . $e->getMessage());
        }
    }
}
