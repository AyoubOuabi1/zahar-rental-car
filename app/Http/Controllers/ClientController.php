<?php

// app/Http/Controllers/ClientController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $clients = Client::query()
            ->when($search, function ($query, $search) {
                return $query->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->get();

        return Inertia::render('clients/index', [
            'clients' => $clients,
            'search' => $search,
        ]);
    }

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

        return redirect()->route('dashboard/clients.index')->with('success', 'Client created successfully.');
    }

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

        return redirect()->route('dashboard/clients.index')->with('success', 'Client updated successfully.');
    }

    // Delete a client
    public function destroy(Client $client)
    {
        $client->delete();
        return redirect()->route('dashboard/clients.index')->with('success', 'Client deleted successfully.');
    }
}
