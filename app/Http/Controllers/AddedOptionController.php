<?php

// app/Http/Controllers/AddedOptionController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AddedOption;
use Illuminate\Http\Request;

class AddedOptionController extends Controller
{
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

        return redirect()->route('dashboard.added-options.index')->with('success', 'Added option created successfully.');
    }


    public function update(Request $request, AddedOption $addedOption)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric',
        ]);

        $addedOption->update($request->all());

        return redirect()->route('dashboard.added-options.index')->with('success', 'Added option updated successfully.');
    }

    public function destroy(AddedOption $addedOption)
    {
        $addedOption->delete();
        return redirect()->route('dashboard.added-options.index')->with('success', 'Added option deleted successfully.');
    }
}
