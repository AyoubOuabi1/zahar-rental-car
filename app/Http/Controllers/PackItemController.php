<?php
// app/Http/Controllers/PackItemController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PackItem;
use Illuminate\Http\Request;

class PackItemController extends Controller
{
    // List all pack items
    public function index()
    {
        $packItems = PackItem::all();
        return Inertia::render('packItems', [
            'packItems' => $packItems,
        ]);
    }

    // Store a new pack item
    public function store(Request $request)
    {
        $request->validate([
            'pack_id' => 'required|exists:packs,id',
            'title' => 'required|string',
        ]);

        $packItem = PackItem::create($request->all());

        return redirect()->route('pack-items')->with('success', 'Pack item created successfully.');
    }

    // Show a specific pack item
    public function show(PackItem $packItem)
    {
        return Inertia::render('PackItems/Show', [
            'packItem' => $packItem,
        ]);
    }

    // Update a pack item
    public function update(Request $request, PackItem $packItem)
    {
        $request->validate([
            'pack_id' => 'required|exists:packs,id',
            'title' => 'required|string',
        ]);

        $packItem->update($request->all());

        return redirect()->route('pack-items')->with('success', 'Pack item updated successfully.');
    }

    // Delete a pack item
    public function destroy(PackItem $packItem)
    {
        $packItem->delete();
        return redirect()->route('pack-items')->with('success', 'Pack item deleted successfully.');
    }
}
