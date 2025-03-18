<?php

// app/Http/Controllers/PackController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pack;
use Illuminate\Http\Request;

class PackController extends Controller
{
    // List all packs
    public function index()
    {
        $packs = Pack::with('items')->get();
        return Inertia::render('packs', [
            'packs' => $packs,
        ]);
    }

    // Store a new pack
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|boolean',
            'price_per_day' => 'required|numeric',
        ]);

        $pack = Pack::create($request->all());

        return redirect()->route('packs')->with('success', 'Pack created successfully.');
    }

    // Show a specific pack
    public function show(Pack $pack)
    {
        return Inertia::render('Packs/Show', [
            'pack' => $pack->load('items'),
        ]);
    }

    // Update a pack
    public function update(Request $request, Pack $pack)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|boolean',
            'price_per_day' => 'required|numeric',
        ]);

        $pack->update($request->all());

        return redirect()->route('packs')->with('success', 'Pack updated successfully.');
    }

    // Delete a pack
    public function destroy(Pack $pack)
    {
        $pack->delete();
        return redirect()->route('packs')->with('success', 'Pack deleted successfully.');
    }
}
