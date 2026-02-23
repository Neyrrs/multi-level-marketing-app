<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Get products
        $query = Product::where('is_active', true)
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        $perPage = $request->get('perPage', 12);
        $products = $query->paginate($perPage);

        // Get or create cart for current user
        $cart = Cart::where('user_id', $user->id)->first();

        $cartItems = [];
        if ($cart) {
            $cartItems = $cart->items()->with('product')->get()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => (float)$item->product->price,
                    ],
                    'quantity' => $item->quantity,
                    'subtotal' => (float)($item->quantity * $item->product->price),
                ];
            })->toArray();
        }

        return Inertia::render('affiliate/shop/index', [
            'products' => $products,
            'cart' => [
                'items' => $cartItems,
                'total' => collect($cartItems)->sum('subtotal'),
                'itemCount' => collect($cartItems)->sum('quantity'),
            ],
        ]);
    }
}
