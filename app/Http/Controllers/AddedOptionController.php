<?php

// app/Http/Controllers/AddedOptionController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AddedOption;
use Illuminate\Http\Request;

class AddedOptionController extends Controller
{
    // List all added options
    public function index()
    {
        $addedOptions = AddedOption::all();
        return Inertia::render('added-options/index', [
            'addedOptions' => $addedOptions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric',
        ]);

        $addedOption = AddedOption::create($request->all());

        return redirect()->route('added-options.index')->with('success', 'Added option created successfully.');
    }

    // Show a specific added option
    public function show(AddedOption $addedOption)
    {
        return Inertia::render('AddedOptions/Show', [
            'addedOption' => $addedOption,
        ]);
    }

    // Update an added option
    public function update(Request $request, AddedOption $addedOption)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric',
        ]);

        $addedOption->update($request->all());

        return redirect()->route('added-options.index')->with('success', 'Added option updated successfully.');
    }

    // Delete an added option
    public function destroy(AddedOption $addedOption)
    {
        $addedOption->delete();
        return redirect()->route('added-options.index')->with('success', 'Added option deleted successfully.');
    }
}
