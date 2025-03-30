<?php
// app/Http/Controllers/PackItemController.php
namespace App\Http\Controllers;

use App\Models\Pack;
use Inertia\Inertia;
use App\Models\PackItem;
use Illuminate\Http\Request;

class PackItemController extends Controller
{
    // List all pack items
    public function index()
    {
        $packItems = PackItem::all();
        $packs = Pack::all();
        return Inertia::render('packitems/index', [
            'packItems' => $packItems,
            'packs' => $packs,
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

        return redirect()->route('packitems.index')->with('success', 'Pack item created successfully.');
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
            'title' => 'required|string ',
        ]);

        $packItem->update($request->all());

        return redirect()->route('packitems.index')->with('success', 'Pack item updated successfully.');
    }

    // Delete a pack item
    public function destroy(PackItem $packItem)
    {
        $packItem->delete();
        return redirect()->route('packitems.index')->with('success', 'Pack item deleted successfully.');
    }
}
