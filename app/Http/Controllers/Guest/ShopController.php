<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('is_active', true)->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->input('perPage', 12);
        $products = $query->paginate($perPage);

        $products->getCollection()->transform(function (Product $item) {
            $imageUrl = $this->resolveImageUrl($item);

            return [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'price' => (float) $item->harga_akhir,
                'category' => $item->type ?? 'single',
                'image' => $imageUrl,
            ];
        });

        return Inertia::render('guest/shop/index', [
            'products' => $products,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    private function resolveImageUrl(Product $product): ?string
    {
        $image = $product->image;

        if (is_string($image) && $image !== '') {
            $decoded = json_decode($image, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $image = $decoded;
            } else {
                return str_starts_with($image, 'http') || str_starts_with($image, '/')
                    ? $image
                    : Storage::url($image);
            }
        }

        if (!is_array($image) || !isset($image[0])) {
            return null;
        }

        $first = $image[0];
        if (is_string($first) && $first !== '') {
            return str_starts_with($first, 'http') || str_starts_with($first, '/')
                ? $first
                : Storage::url($first);
        }

        if (!is_array($first)) {
            return null;
        }

        if (!empty($first['url'])) {
            return $first['url'];
        }

        if (!empty($first['path'])) {
            return Storage::url($first['path']);
        }

        return null;
    }
}
