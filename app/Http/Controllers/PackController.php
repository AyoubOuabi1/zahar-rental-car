<?php

// app/Http/Controllers/PackController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pack;
use Illuminate\Http\Request;

class PackController extends Controller
{
    // List all packs
    public function index(Request $request)
    {
        {
            $search = $request->query('search');

            $packs = Pack::query()
                ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })->get();

            return Inertia::render('packs/index', [
                'packs' => $packs,
                'search' => $search,
            ]);
        }
    }

    // Store a new pack
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:packs',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric',
            'status' => 'required|in:true,false',
        ]);

        $data = $request->all();

        // Convert string 'true'/'false' to boolean (or 1/0 for DB)
        $data['status'] = filter_var($data['status'], FILTER_VALIDATE_BOOLEAN);

        Pack::create($data);

        return redirect()->route('packs.index')->with('success', 'Pack created successfully.');
    }


    public function show(Pack $pack)
    {
        return Inertia::render('packs/Show', [
            'pack' => $pack->load('items'),
        ]);
    }

    public function update(Request $request, Pack $pack)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric',
        ]);

        $pack->update($request->all());

        return redirect()->route('packs.index')->with('success', 'Pack updated successfully.');
    }

    public function destroy(Pack $pack)
    {
        $pack->delete();
        return redirect()->route('packs.index')->with('success', 'Pack deleted successfully.');
    }
}
