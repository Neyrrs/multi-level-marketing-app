<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Fetch active products and render the home page.
     */
    public function index()
    {
        return Inertia::render('home', [
            'products' => $this->getActiveProducts(),
        ]);
    }

    /**
     * Fetch active products and render the /produk page.
     */
    public function produk(Request $request)
    {
        $search   = $request->input('search', '');
        $query    = Product::where('is_active', true)->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return Inertia::render('product', [
            'products' => $query->get()->map(fn (Product $p) => [
                'id'          => $p->id,
                'name'        => $p->name,
                'slug'        => $p->slug,
                'description' => $p->description,
                'harga_awal'  => (float) $p->harga_awal,
                'diskon'      => (float) $p->diskon,
                'harga_akhir' => (float) $p->harga_akhir,
                'point_value' => (float) $p->point_value,
                'type'        => $p->type,
                'stock'       => (int) $p->stock,
                'image'       => $this->resolveImageUrl($p),
            ]),
            'search' => $search,
        ]);
    }

    // ── Private ──────────────────────────────────────────────────────────

    private function getActiveProducts(): \Illuminate\Support\Collection
    {
        return Product::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (Product $product) => [
                'id'          => $product->id,
                'name'        => $product->name,
                'slug'        => $product->slug,
                'description' => $product->description,
                'harga_awal'  => (float) $product->harga_awal,
                'diskon'      => (float) $product->diskon,
                'harga_akhir' => (float) $product->harga_akhir,
                'point_value' => (float) $product->point_value,
                'type'        => $product->type,
                'stock'       => (int) $product->stock,
                'image'       => $this->resolveImageUrl($product),
            ]);
    }


    /**
     * Resolve the public image URL from a product's image field.
     */
    private function resolveImageUrl(Product $product): ?string
    {
        $image = $product->image;

        if (!is_array($image) || !isset($image[0])) {
            return null;
        }

        $first = $image[0];

        if (is_array($first)) {
            if (!empty($first['url'])) {
                $url = (string) $first['url'];
                return str_starts_with($url, 'http')
                    ? $url
                    : route('media.public', ['path' => ltrim(preg_replace('#^storage/#', '', $url), '/')]);
            }
            if (!empty($first['path'])) {
                return route('media.public', ['path' => ltrim((string) $first['path'], '/')]);
            }
        }

        if (is_string($first) && $first !== '') {
            return str_starts_with($first, 'http')
                ? $first
                : route('media.public', ['path' => ltrim(preg_replace('#^storage/#', '', $first), '/')]);
        }

        return null;
    }
}

