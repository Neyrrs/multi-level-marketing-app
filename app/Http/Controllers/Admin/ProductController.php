<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = (int) $request->input('per_page', 10);

        $query = Product::query();
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $products = $query->paginate($perPage);

        return Inertia::render('admin/products/index', [
            'products' => $products->items(),
            'pagination' => [
                'total' => $products->total(),
                'currentPage' => $products->currentPage(),
                'perPage' => $products->perPage(),
                'lastPage' => $products->lastPage(),
                'hasMore' => $products->hasMorePages(),
            ],
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'harga_awal' => 'required|numeric|min:0',
            'diskon' => 'nullable|numeric|min:0',
            'harga_akhir' => 'nullable|numeric|min:0',
            'type' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
        ]);

        $product = Product::create($data);
        return response()->json(['success' => true, 'product' => $product], 201);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'harga_awal' => 'required|numeric|min:0',
            'diskon' => 'nullable|numeric|min:0',
            'harga_akhir' => 'nullable|numeric|min:0',
            'type' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
        ]);

        $product->update($data);
        return response()->json(['success' => true, 'product' => $product]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['success' => true]);
    }
}
