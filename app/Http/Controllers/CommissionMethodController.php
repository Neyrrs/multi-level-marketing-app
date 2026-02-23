<?php

namespace App\Http\Controllers;

use App\Models\CommissionMethod;
use Illuminate\Http\Request;

class CommissionMethodController extends Controller
{
    public function index()
    {
        return response()->json(CommissionMethod::with('rules')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'calculation_type' => 'required|string',
        ]);

        $method = CommissionMethod::create($data);
        return response()->json($method, 201);
    }

    public function update(Request $request, CommissionMethod $commissionMethod)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'calculation_type' => 'sometimes|string',
        ]);

        $commissionMethod->update($data);
        return response()->json($commissionMethod);
    }

    public function destroy(CommissionMethod $commissionMethod)
    {
        $commissionMethod->delete();
        return response()->json(null, 204);
    }
}
