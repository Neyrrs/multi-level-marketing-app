<?php

namespace App\Http\Controllers\Logistik;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource (inventory stock levels).
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $perPage = $request->query('per_page', 10);
        $sortBy = $request->query('sort_by', 'name');
        $sortOrder = $request->query('sort_order', 'asc');

        $query = Product::query();

        // Search by product name or description
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        // Sort
        if (in_array($sortBy, ['name', 'stock', 'harga_akhir', 'is_active'])) {
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('name', 'asc');
        }

        $products = $query->paginate($perPage);

        // Calculate inventory stats
        $totalProducts = Product::count();
        $totalStock = Product::sum('stock');
        $lowStockCount = Product::whereRaw('stock <= 10')->count();
        $outOfStockCount = Product::where('stock', 0)->count();

        return Inertia::render('logistik/inventory/index', [
            'products' => collect($products->items())->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'stock' => $product->stock,
                'price' => (float) $product->harga_akhir,
                'weight' => (float) $product->weight,
                'is_active' => $product->is_active,
                'status' => $this->getStockStatus($product->stock),
                'image' => $product->image[0] ?? null,
            ]),
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalStock' => $totalStock,
                'lowStockCount' => $lowStockCount,
                'outOfStockCount' => $outOfStockCount,
            ],
            'pagination' => [
                'total' => $products->total(),
                'currentPage' => $products->currentPage(),
                'perPage' => $products->perPage(),
                'lastPage' => $products->lastPage(),
                'hasMore' => $products->hasMorePages(),
            ],
            'filters' => [
                'search' => $search,
                'sortBy' => $sortBy,
                'sortOrder' => $sortOrder,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource (detailed inventory).
     */
    public function show(Product $inventory)
    {
        return Inertia::render('logistik/inventory/show', [
            'product' => [
                'id' => $inventory->id,
                'name' => $inventory->name,
                'slug' => $inventory->slug,
                'description' => $inventory->description,
                'stock' => $inventory->stock,
                'price' => (float) $inventory->harga_akhir,
                'original_price' => (float) $inventory->harga_awal,
                'discount' => (float) $inventory->diskon,
                'weight' => (float) $inventory->weight,
                'is_active' => $inventory->is_active,
                'image' => $inventory->image,
                'type' => $inventory->type,
                'status' => $this->getStockStatus($inventory->stock),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $inventory)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
            'reason' => 'nullable|string|max:500',
        ]);

        $oldStock = $inventory->stock;
        $difference = (int) $validated['quantity'];
        $newStock = $oldStock + $difference;

        $inventory->update(['stock' => $newStock]);

        $message = "Stok berhasil ditambah {$difference} (dari {$oldStock} menjadi {$newStock})";
        if (!empty($validated['reason'])) {
            $message .= " | Catatan: {$validated['reason']}";
        }

        return back()->with('success', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $inventory)
    {
        //
    }

    /**
     * Get stock status
     */
    private function getStockStatus($stock): string
    {
        if ($stock == 0) {
            return 'out_of_stock';
        } elseif ($stock <= 10) {
            return 'low_stock';
        } else {
            return 'in_stock';
        }
    }
}
