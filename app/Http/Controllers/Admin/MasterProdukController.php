<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MasterProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));
        $perPage = (int) $request->input('per_page', 10);

        $query = Product::query()->latest('id');
        $query = Product::query()->latest('id');
        if ($search !== '') {
            $query->where('name', 'ilike', "%{$search}%");
        }

        $products = $query->paginate($perPage);

        return Inertia::render('admin/MasterProduk/index', [
            'products' => collect($products->items())->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'type' => $product->type,
                'stock' => (int) ($product->stock ?? 0),
                'harga_awal' => (float) ($product->harga_awal ?? 0),
                'diskon' => (float) ($product->diskon ?? 0),
                'harga_akhir' => (float) ($product->harga_akhir ?? 0),
                'point_value' => (float) ($product->point_value ?? 0),
                'is_active' => (bool) ($product->is_active ?? true),
                'image_url' => $this->extractImageUrl($product),
                'created_at' => $product->created_at?->format('Y-m-d H:i'),
            ])->values(),
            'pagination' => [
                'total' => $products->total(),
                'currentPage' => $products->currentPage(),
                'perPage' => $products->perPage(),
                'lastPage' => $products->lastPage(),
                'hasMore' => $products->hasMorePages(),
            ],
            'filters' => [
                'search' => $search,
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function extractImageUrl(Product $product): ?string
    {
        $image = $product->image;
        if (is_string($image)) {
            $decoded = json_decode($image, true);
            if (is_array($decoded)) {
                $image = $decoded;
            }
        }

        if (!is_array($image) || !isset($image[0]) || !is_array($image[0])) {
            return null;
        }

        $url = $image[0]['url'] ?? null;
        $path = $image[0]['path'] ?? null;

        if (is_string($url) && $url !== '') {
            return $url;
        }

        if (is_string($path) && $path !== '') {
            return Storage::url($path);
        }

        return null;
    }
}
