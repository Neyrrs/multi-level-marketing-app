<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommissionMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CommissionMethodController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = (int) $request->input('per_page', 10);

        $query = CommissionMethod::with('rules');
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $methods = $query->paginate($perPage);

        return Inertia::render('admin/commission-methods/index', [
            'methods' => collect($methods->items())->map(function (CommissionMethod $method) {
                return [
                    'id' => $method->id,
                    'name' => $method->name,
                    'description' => $method->description,
                    'calculation_type' => $method->calculation_type,
                    'rules_count' => $method->rules->count(),
                ];
            }),
            'pagination' => [
                'total' => $methods->total(),
                'currentPage' => $methods->currentPage(),
                'perPage' => $methods->perPage(),
                'lastPage' => $methods->lastPage(),
                'hasMore' => $methods->hasMorePages(),
            ],
            'search' => $search,
            'locked_methods' => true,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/commission-methods/create');
    }

    public function edit(CommissionMethod $commissionMethod)
    {
        return Inertia::render('admin/commission-methods/edit', [
            'method' => $commissionMethod,
        ]);
    }

    public function store(Request $request)
    {
        throw ValidationException::withMessages([
            'method' => 'Metode komisi dikunci. Gunakan metode bawaan dan lakukan edit jika perlu.',
        ]);
    }

    public function update(Request $request, CommissionMethod $commissionMethod)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calculation_type' => 'nullable|string',
        ]);

        $commissionMethod->update($data);
        return response()->json(['success' => true, 'method' => $commissionMethod]);
    }

    public function destroy(CommissionMethod $commissionMethod)
    {
        throw ValidationException::withMessages([
            'method' => 'Metode komisi tidak dapat dihapus.',
        ]);
    }
}
