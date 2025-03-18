<?php

// app/Http/Controllers/PlaceController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    // List all places
    public function index()
    {
        $places = Place::all();
        return Inertia::render('places', [
            'places' => $places,
        ]);
    }

    // Store a new place
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image_url' => 'required|string',
        ]);

        $place = Place::create($request->all());

        return redirect()->route('places')->with('success', 'Place created successfully.');
    }

    // Show a specific place
    public function show(Place $place)
    {
        return Inertia::render('Places/Show', [
            'place' => $place,
        ]);
    }

    // Update a place
    public function update(Request $request, Place $place)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image_url' => 'required|string',
        ]);

        $place->update($request->all());

        return redirect()->route('places')->with('success', 'Place updated successfully.');
    }

    // Delete a place
    public function destroy(Place $place)
    {
        $place->delete();
        return redirect()->route('places')->with('success', 'Place deleted successfully.');
    }
}
