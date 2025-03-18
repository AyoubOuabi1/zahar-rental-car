<?php

// app/Http/Controllers/ClientController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // List all clients
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('clients', [
            'clients' => $clients,
        ]);
    }

    // Store a new client
    public function store(Request $request)
    {
        $request->validate([
            'identity_or_passport_number' => 'required|string|unique:clients',
            'full_name' => 'required|string',
            'email' => 'required|email|unique:clients',
            'mobile_number' => 'required|string',
            'address' => 'nullable|string',
            'permit_license_id' => 'required|string',
        ]);

        $client = Client::create($request->all());

        return redirect()->route('clients')->with('success', 'Client created successfully.');
    }

    // Show a specific client
    public function show(Client $client)
    {
        return Inertia::render('Clients/Show', [
            'client' => $client,
        ]);
    }

    // Update a client
    public function update(Request $request, Client $client)
    {
        $request->validate([
            'identity_or_passport_number' => 'required|string|unique:clients,identity_or_passport_number,' . $client->id,
            'full_name' => 'required|string',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'mobile_number' => 'required|string',
            'address' => 'nullable|string',
            'permit_license_id' => 'required|string',
        ]);

        $client->update($request->all());

        return redirect()->route('clients')->with('success', 'Client updated successfully.');
    }

    // Delete a client
    public function destroy(Client $client)
    {
        $client->delete();
        return redirect()->route('clients')->with('success', 'Client deleted successfully.');
    }
}
