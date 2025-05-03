<?php

namespace App\Http\Controllers;

use App\Models\AddedOption;
use App\Models\Car;
use App\Models\Client;
use App\Models\Place;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController
{
    public function index()
    {

        $cars = Car::all();
        $places = Place::all();
        return Inertia::render('welcome', [
            'cars' => $cars,
            'places' => $places,
        ]);
    }
    public function options(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'pickup_location' => 'required',
            'return_location' => 'required',
        ]);

        $car = Car::find($request->car_id);
        $places = Place::all();
        $options = AddedOption::all();

        return Inertia::render('front/cars/options', [
            'car' => $car,
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
            'pickup_location' => $request->pickup_location,
            'return_location' => $request->return_location,
            'places' => $places,
            'options' => $options,

        ]);
    }

    public function getAvailableCars(Request $request)
    {
        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'pickup_location' => 'required',
            'return_location' => 'required',
        ]);

        $dateFrom = $request->date_from;
        $dateTo = $request->date_to;
        $pickupLocation = $request->pickup_location;
        $returnLocation = $request->return_location;

        $cars = Car::all();
        $places = Place::all();
        $availableCars = $cars->filter(function ($car) use ($dateFrom, $dateTo) {
            return Reservation::isCarAvailable($car->id, $dateFrom, $dateTo, null);
        })->values();

        return Inertia::render('front/cars/booking', [
            'available_cars' => $availableCars,
            'date_from' => $dateFrom,
            'date_to' => $dateTo,
            'pickup_location' => $pickupLocation,
            'return_location' => $returnLocation,
            'places' => $places,
        ]);
    }
    public function cars()
    {

        $cars = Car::all();
        return Inertia::render('front/cars/index', [
            'cars' => $cars,
        ]);
    }


    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'date_from' => 'required|string',
            'date_to' => 'required|string',
            'pickup_location' => 'required|exists:places,id',
            'return_location' => 'required|exists:places,id',
            'options' => 'nullable|string',
        ]);

        $car = Car::findOrFail($validated['car_id']);
        $places = Place::all();

        $options = [];
        if (!empty($validated['options'])) {
            $optionsData = json_decode($validated['options'], true);
            if (is_array($optionsData)) {
                $optionIds = array_column($optionsData, 'id');
                $options = AddedOption::whereIn('id', $optionIds)->get()->toArray();

                foreach ($options as $key => $option) {
                    foreach ($optionsData as $optionData) {
                        if ($option['id'] == $optionData['id']) {
                            $options[$key]['quantity'] = $optionData['quantity'];
                            break;
                        }
                    }
                }
            }
        }

        return Inertia::render('front/cars/checkout', [
            'car' => $car,
            'date_from' => $validated['date_from'],
            'date_to' => $validated['date_to'],
            'pickup_location' => $validated['pickup_location'],
            'return_location' => $validated['return_location'],
            'places' => $places,
            'options' => $options,
        ]);
    }

// In HomeController.php
    public function storeReservation(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'pickup_place_id' => 'required|exists:places,id',
            'dropoff_place_id' => 'required|exists:places,id',
            'date_from' => 'required|date_format:Y-m-d H:i',
            'date_to' => 'required|date_format:Y-m-d H:i|after_or_equal:date_from',
            'options' => 'required|array',
            'options.*.id' => 'required|exists:added_options,id',
            'options.*.quantity' => 'required|integer|min:1',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile_number' => 'required|string|max:20',
            'identity_or_passport_number' => 'required|string|max:50',
            'permit_license_id' => 'required|string|max:50',
            'address' => 'nullable|string|max:255',
            'flight_number' => 'nullable|string|max:50',
            'termsAccepted' => 'required|accepted',
        ]);

        DB::beginTransaction();

        try {
            // Find or create client
            $client = Client::updateOrCreate(
                ['email' => $validated['email']],
                [
                    'full_name' => $validated['full_name'],
                    'mobile_number' => $validated['mobile_number'],
                    'identity_or_passport_number' => $validated['identity_or_passport_number'],
                    'permit_license_id' => $validated['permit_license_id'],
                    'address' => $validated['address'] ?? null,
                ]
            );

            // Check car availability
            if (!Reservation::isCarAvailable(
                $validated['car_id'],
                $validated['date_from'],
                $validated['date_to']
            )) {
                throw new \Exception('This car is not available for the selected dates');
            }

            // Create the reservation
            $reservation = $client->reservations()->create([
                'car_id' => $validated['car_id'],
                'pickup_place_id' => $validated['pickup_place_id'],
                'dropoff_place_id' => $validated['dropoff_place_id'],
                'flight_number' => $validated['flight_number'],
                'date_from' => $validated['date_from'],
                'date_to' => $validated['date_to'],
                'status' => Reservation::STATUS_PENDING,
                'total_price' => 0, // Temporary value, will be calculated later
            ]);

            // Attach selected options
            foreach ($validated['options'] as $option) {
                $reservation->addedOptions()->attach($option['id'], [
                    'quantity' => $option['quantity'],
                    'price_at_reservation' => AddedOption::findOrFail($option['id'])->price_per_day
                ]);
            }

            // Calculate and save final price
            $reservation->total_price = $reservation->calculateTotal();
            $reservation->save();

            DB::commit();

            return Inertia::render('front/cars/thankyou', [
                'reservation' => [
                    'id' => $reservation->id,
                    'date_from' => $reservation->date_from->format('d/m/Y H:i'),
                    'date_to' => $reservation->date_to->format('d/m/Y H:i'),
                    'car' => $reservation->car,
                    'total_price' => $reservation->total_price,
                ]
            ]);

        }  catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Reservation Error: ' . $e->getMessage());

            // Return with errors using Inertia's error handling
            return redirect()->back()->withErrors([
                'system' => 'Une erreur est survenue: ' . $e->getMessage()
            ]);
        }
    }
}
