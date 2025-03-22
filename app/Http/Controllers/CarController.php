<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $cars = Car::query()
            ->when($search, function ($query, $search) {
                return $query->where('brand', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%");
            })
            ->get();
        return Inertia::render('cars/index', [
            'cars' => $cars,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required|string',
            'model' => 'required|string',
            'category' => 'required|string',
            'fuel' => 'required|string',
            'transmission' => 'required|string',
            'luggage' => 'required|integer',
            'seats' => 'required|integer',
            'ac' => 'required|boolean',
            'doors' => 'required|integer',
            'image' => 'required|string',
            'discount' => 'nullable|integer',
            'price_per_day' => 'required|numeric',
        ]);

        $car = Car::create($request->all());

        return redirect()->route('cars.index')->with('success', 'Car created successfully.');
    }


    public function update(Request $request, Car $car)
    {
        $request->validate([
            'brand' => 'required|string',
            'model' => 'required|string',
            'category' => 'required|string',
            'fuel' => 'required|string',
            'transmission' => 'required|string',
            'luggage' => 'required|integer',
            'seats' => 'required|integer',
            'ac' => 'required|boolean',
            'doors' => 'required|integer',
            'image' => 'required|string',
            'discount' => 'nullable|integer',
            'price_per_day' => 'required|numeric',
        ]);

        $car->update($request->all());

        return redirect()->route('cars.index')->with('success', 'Car updated successfully.');
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return redirect()->route('cars.index')->with('success', 'Car deleted successfully.');
    }
}
