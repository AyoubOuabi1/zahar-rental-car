<?php

// app/Http/Controllers/PlaceController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PlaceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $places = Place::when($search, function ($query, $search) {
            return $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        })->get();

        return Inertia::render('places/index', [
            'places' => $places,
            'search' => $search,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'required|url',
        ]);

        Place::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_url' => $request->image_url,
        ]);

        return redirect()->route('dashboard.places.index')->with('success', 'Place created successfully.');
    }

    public function update(Request $request, Place $place)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'required|url',
        ]);

        $place->update($request->all());

        return redirect()->route('dashboard.places.index')->with('success', 'Place updated successfully.');
    }

    public function destroy(Place $place)
    {
        Log::debug('Deleting place', ['place' => $place->toArray()]);
        $place->delete();
        return redirect()->route('dashboard.places.index')->with('success', 'Place deleted successfully.');
    }
}
