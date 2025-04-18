<?php

// app/Http/Controllers/ReservationController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Reservation;
use App\Models\AddedOption;
use App\Models\Client;
use App\Models\Car;
use App\Models\Place;
use App\Models\Pack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Psy\debug;

class ReservationController extends Controller
{
    // List all reservations
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status');
        $dateFrom = $request->query('date_from');
        $dateTo = $request->query('date_to');

        $reservations = Reservation::query()
            ->with(['client', 'car', 'pickupPlace', 'dropoffPlace', 'pack'])
            ->when($search, function ($query, $search) {
                return $query->whereHas('client', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('car', function ($q) use ($search) {
                    $q->where('brand', 'like', "%{$search}%")
                        ->orWhere('model', 'like', "%{$search}%")
                        ->orWhere('plate_number', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($dateFrom, function ($query, $dateFrom) {
                return $query->where('date_from', '>=', $dateFrom);
            })
            ->when($dateTo, function ($query, $dateTo) {
                return $query->where('date_to', '<=', $dateTo);
            })
            ->latest()
            ->get();

        return Inertia::render('reservations/index', [
            'reservations' => $reservations,
            'cars' => Car::all(),
            'clients' => Client::all(),
            'places' => Place::all(),
            'packs' => Pack::all(),
            'options' => AddedOption::all(),
            'search' => $search,
            'status' => $status,
            'date_from' => $dateFrom,
            'date_to' => $dateTo,
            'statuses' => [
                Reservation::STATUS_PENDING,
                Reservation::STATUS_CONFIRMED,
                Reservation::STATUS_ACTIVE,
                Reservation::STATUS_COMPLETED,
                Reservation::STATUS_CANCELLED,
            ],
        ]);

    }

    public function create()
    {
        return Inertia::render('reservations/create', [
            'clients' => Client::all(),
            'cars' => Car::all(),
            'places' => Place::all(),
            'packs' => Pack::all(),
            'addedOptions' => AddedOption::all(),
            'statuses' => [
                Reservation::STATUS_PENDING,
                Reservation::STATUS_CONFIRMED,
                Reservation::STATUS_ACTIVE,
                Reservation::STATUS_COMPLETED,
                Reservation::STATUS_CANCELLED,
            ],
        ]);
    }

    // Store a new reservation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'car_id' => 'required|exists:cars,id',
            'pickup_place_id' => 'required|exists:places,id',
            'dropoff_place_id' => 'required|exists:places,id',
            'pack_id' => 'nullable|exists:packs,id',
            'flight_number' => 'nullable|string|max:50',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'status' => 'nullable|in:pending,confirmed,active,completed,cancelled',
            'added_options' => 'nullable|array',
            'added_options.*.id' => 'exists:added_options,id',
            'added_options.*.quantity' => 'required|integer|min:1',
        ]);
        // Check if the car is available for the selected dates
        if (!Reservation::isCarAvailable($validated['car_id'], $validated['date_from'], $validated['date_to'])) {
            return back()->withErrors([
                'car_id' => 'The selected car is not available for the specified date range.',
            ])->withInput();
        }

        DB::beginTransaction();

        try {
            // Create the reservation
            $reservation = new Reservation([
                'client_id' => $validated['client_id'],
                'car_id' => $validated['car_id'],
                'pickup_place_id' => $validated['pickup_place_id'],
                'dropoff_place_id' => $validated['dropoff_place_id'],
                'pack_id' => $validated['pack_id'] ?? null,
                'flight_number' => $validated['flight_number'] ?? null,
                'date_from' => $validated['date_from'],
                'date_to' => $validated['date_to'],
                'status' => $validated['status'] ?? Reservation::STATUS_PENDING,
                'total_price' => 0, // Placeholder, will calculate below
            ]);

            $reservation->save();

            // Attach added options with quantity and prices
            if (!empty($validated['added_options'])) {
                foreach ($validated['added_options'] as $optionData) {
                    $option = AddedOption::find($optionData['id']);
                    $reservation->addedOptions()->attach($option->id, [
                        'quantity' => $optionData['quantity'],
                        'price_at_reservation' => $option->price_per_day,
                    ]);
                }
            }

            // Calculate and update total price
            $reservation->total_price = $reservation->calculateTotal();
            $reservation->save();

            DB::commit();

            return redirect()->route('reservations.index')->with('success', 'Reservation created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors([
                'message' => 'An error occurred while creating the reservation: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    public function show(Reservation $reservation)
    {
        return Inertia::render('reservations/show', [
            'reservation' => $reservation->load(['client', 'car', 'pickupPlace', 'dropoffPlace', 'pack', 'addedOptions']),
        ]);
    }

    public function edit(Reservation $reservation)
    {
        return Inertia::render('reservations/edit', [
            'reservation' => $reservation->load('addedOptions'),
            'clients' => Client::all(),
            'cars' => Car::all(),
            'places' => Place::all(),
            'packs' => Pack::all(),
            'addedOptions' => AddedOption::all(),
            'statuses' => [
                Reservation::STATUS_PENDING,
                Reservation::STATUS_CONFIRMED,
                Reservation::STATUS_ACTIVE,
                Reservation::STATUS_COMPLETED,
                Reservation::STATUS_CANCELLED,
            ],
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'car_id' => 'required|exists:cars,id',
            'pickup_place_id' => 'required|exists:places,id',
            'dropoff_place_id' => 'required|exists:places,id',
            'pack_id' => 'nullable|exists:packs,id',
            'flight_number' => 'nullable|string|max:50',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'status' => 'required|in:pending,confirmed,active,completed,cancelled',
            'added_options' => 'nullable|array',
            'added_options.*.id' => 'exists:added_options,id',
            'added_options.*.quantity' => 'required|integer|min:1',
        ]);

        // Check if the car is available for the selected dates (excluding this reservation)
        if (
            $reservation->car_id != $validated['car_id'] ||
            $reservation->date_from != $validated['date_from'] ||
            $reservation->date_to != $validated['date_to']
        ) {
            if (!Reservation::isCarAvailable($validated['car_id'], $validated['date_from'], $validated['date_to'], $reservation->id)) {
                return back()->withErrors([
                    'car_id' => 'The selected car is not available for the specified date range.',
                ])->withInput();
            }
        }

        DB::beginTransaction();

        try {
            // Update reservation
            $reservation->update([
                'client_id' => $validated['client_id'],
                'car_id' => $validated['car_id'],
                'pickup_place_id' => $validated['pickup_place_id'],
                'dropoff_place_id' => $validated['dropoff_place_id'],
                'pack_id' => $validated['pack_id'] ?? null,
                'flight_number' => $validated['flight_number'] ?? null,
                'date_from' => $validated['date_from'],
                'date_to' => $validated['date_to'],
                'status' => $validated['status'],
            ]);

            // Sync added options
            $reservation->addedOptions()->detach();

            if (!empty($validated['added_options'])) {
                foreach ($validated['added_options'] as $optionData) {
                    $option = AddedOption::find($optionData['id']);
                    $reservation->addedOptions()->attach($option->id, [
                        'quantity' => $optionData['quantity'],
                        'price_at_reservation' => $option->price,
                    ]);
                }
            }

            // Recalculate total price
            $reservation->total_price = $reservation->calculateTotal();
            $reservation->save();

            DB::commit();

            return redirect()->route('reservations.index')->with('success', 'Reservation updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors([
                'message' => 'An error occurred while updating the reservation: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    public function destroy(Reservation $reservation)
    {
        // Instead of deleting, you may want to just cancel the reservation
        if ($reservation->status !== Reservation::STATUS_CANCELLED) {
            $reservation->update(['status' => Reservation::STATUS_CANCELLED]);
            return redirect()->route('reservations.index')->with('success', 'Reservation cancelled successfully.');
        }

        // If you want to hard delete
        $reservation->addedOptions()->detach();
        $reservation->delete();

        return redirect()->route('reservations.index')->with('success', 'Reservation deleted successfully.');
    }

    public function changeStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,active,completed,cancelled',
        ]);

        $reservation->update(['status' => $request->status]);

        return redirect()->route('reservations.index')->with('success', 'Reservation status updated successfully.');
    }

    public function getAvailableCars(Request $request)
    {
        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'reservation_id' => 'nullable|exists:reservations,id',
        ]);

        $dateFrom = $request->date_from;
        $dateTo = $request->date_to;
        $reservationId = $request->reservation_id ?? null;

        $cars = Car::all();

        $availableCars = $cars->filter(function ($car) use ($dateFrom, $dateTo, $reservationId) {
            return Reservation::isCarAvailable($car->id, $dateFrom, $dateTo, $reservationId);
        })->values();

        return response()->json([
            'available_cars' => $availableCars,
        ]);
    }

    public function generateInvoice(Reservation $reservation)
    {
        return Inertia::render('reservations/invoice', [
            'reservation' => $reservation->load(['client', 'car', 'pickupPlace', 'dropoffPlace', 'pack', 'addedOptions']),
        ]);
    }

    public function dashboard()
    {
        $today = now()->startOfDay();
        $endOfWeek = now()->endOfWeek();

        $stats = [
            'active' => Reservation::active()->count(),
            'upcoming' => Reservation::upcoming()->count(),
            'completed' => Reservation::withStatus(Reservation::STATUS_COMPLETED)->count(),
            'cancelled' => Reservation::withStatus(Reservation::STATUS_CANCELLED)->count(),
            'this_week' => Reservation::where('date_from', '>=', $today)
                ->where('date_from', '<=', $endOfWeek)
                ->where('status', '!=', Reservation::STATUS_CANCELLED)
                ->count(),
        ];

        $monthlyRevenue = Reservation::selectRaw('MONTH(date_from) as month, SUM(total_price) as revenue')
            ->whereYear('date_from', now()->year)
            ->where('status', '!=', Reservation::STATUS_CANCELLED)
            ->groupBy('month')
            ->get()
            ->pluck('revenue', 'month')
            ->toArray();

        for ($i = 1; $i <= 12; $i++) {
            if (!isset($monthlyRevenue[$i])) {
                $monthlyRevenue[$i] = 0;
            }
        }
        ksort($monthlyRevenue);

        $topCars = Reservation::selectRaw('car_id, COUNT(*) as rental_count')
            ->where('status', '!=', Reservation::STATUS_CANCELLED)
            ->groupBy('car_id')
            ->orderByDesc('rental_count')
            ->limit(5)
            ->with('car')
            ->get()
            ->map(function ($item) {
                return [
                    'car' => $item->car->brand . ' ' . $item->car->model,
                    'rental_count' => $item->rental_count,
                ];
            });

        return Inertia::render('reservations/dashboard', [
            'stats' => $stats,
            'monthlyRevenue' => $monthlyRevenue,
            'topCars' => $topCars,
        ]);
    }
}
