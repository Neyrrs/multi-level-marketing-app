<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class PackagesController extends Controller
{
    public function index()
    {
        return response()->json(Package::with('items')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $package = Package::create($data);
        return response()->json($package, 201);
    }

    public function update(Request $request, Package $package)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'description' => 'nullable|string',
        ]);

        $package->update($data);
        return response()->json($package);
    }

    public function destroy(Package $package)
    {
        $package->delete();
        return response()->json(null, 204);
    }
}
