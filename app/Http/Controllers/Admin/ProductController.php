<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
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
            'products' => collect($products->items())->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'harga_awal' => (float) $product->harga_awal,
                'diskon' => (float) $product->diskon,
                'harga_akhir' => (float) $product->harga_akhir,
                'type' => $product->type,
                'stock' => (int) $product->stock,
            ]),
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
            'product' => [
                ...$product->toArray(),
                'image_url' => $this->extractImageUrl($product),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'harga_awal' => 'required|numeric|min:0',
            'diskon' => 'nullable|numeric|min:0|max:100',
            'harga_akhir' => 'nullable|numeric|min:0',
            'type' => 'nullable|in:single,bundle',
            'stock' => 'nullable|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data['diskon'] = (float) ($data['diskon'] ?? 0);
        $data['stock'] = (int) ($data['stock'] ?? 0);
        $data['type'] = $data['type'] ?? 'single';
        $data['slug'] = $this->generateUniqueSlug($data['name']);
        $data['harga_akhir'] = isset($data['harga_akhir']) && $data['harga_akhir'] !== null
            ? (float) $data['harga_akhir']
            : max((float) $data['harga_awal'] - ((float) $data['harga_awal'] * ($data['diskon'] / 100)), 0);
        if ($request->hasFile('image')) {
            $data['image'] = $this->storeProductImage($request->file('image'), $data['name']);
        }

        Product::create($data);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Produk berhasil dibuat');
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'harga_awal' => 'required|numeric|min:0',
            'diskon' => 'nullable|numeric|min:0|max:100',
            'harga_akhir' => 'nullable|numeric|min:0',
            'type' => 'nullable|in:single,bundle',
            'stock' => 'nullable|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data['diskon'] = (float) ($data['diskon'] ?? 0);
        $data['stock'] = (int) ($data['stock'] ?? 0);
        $data['type'] = $data['type'] ?? 'single';
        $data['slug'] = $this->generateUniqueSlug($data['name'], $product->id);
        $data['harga_akhir'] = isset($data['harga_akhir']) && $data['harga_akhir'] !== null
            ? (float) $data['harga_akhir']
            : max((float) $data['harga_awal'] - ((float) $data['harga_awal'] * ($data['diskon'] / 100)), 0);
        if ($request->hasFile('image')) {
            $currentImagePath = $this->extractStoredPath($product);
            if ($currentImagePath && Storage::disk('public')->exists($currentImagePath)) {
                Storage::disk('public')->delete($currentImagePath);
            }
            $data['image'] = $this->storeProductImage($request->file('image'), $data['name']);
        }

        $product->update($data);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['success' => true]);
    }

    private function generateUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: 'produk';
        $slug = $base;
        $counter = 1;

        while (
            Product::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    private function storeProductImage(UploadedFile $image, string $name): array
    {
        $filename = Str::slug($name) . '-' . now()->timestamp . '-' . Str::random(6) . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('products', $filename, 'public');
        return [[
            'url' => Storage::url($path),
            'path' => $path,
            'alt' => $name,
        ]];
    }

    private function extractImageUrl(Product $product): ?string
    {
        if (!is_array($product->image) || !isset($product->image[0])) {
            return null;
        }
        return $product->image[0]['url'] ?? null;
    }

    private function extractStoredPath(Product $product): ?string
    {
        if (!is_array($product->image) || !isset($product->image[0])) {
            return null;
        }
        return $product->image[0]['path'] ?? null;
    }
}
