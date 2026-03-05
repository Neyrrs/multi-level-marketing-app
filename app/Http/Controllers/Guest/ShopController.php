<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Midtrans\Config as MidtransConfig;
use Midtrans\Snap;

class ShopController extends Controller
{
    public function __construct(private readonly OrderService $orderService)
    {
    }

    public function index(Request $request)
    {
        $user = $request->user();

        // Keep local status aligned with Midtrans when webhook is missed in local/dev.
        Order::where('user_id', $user->id)
            ->where('payment_method', 'midtrans_snap')
            ->where('payment_status', 'pending')
            ->where('status', 'pending')
            ->latest('id')
            ->limit(20)
            ->get()
            ->each(fn (Order $order) => $this->orderService->syncMidtransStatus($order));

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
                'stock' => (int) $item->stock,
                'category' => $item->type ?? 'single',
                'image' => $imageUrl,
            ];
        });

        $cart = Cart::where('user_id', $user->id)->first();
        $cartItems = [];
        if ($cart) {
            $cartItems = $cart->items()->with('product')->get()->map(function ($item) {
                $price = (float) ($item->harga_akhir ?? $item->product?->harga_akhir ?? 0);
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product?->name ?? '-',
                    'product_price' => $price,
                    'quantity' => $item->quantity,
                    'subtotal' => (float) ($item->quantity * $price),
                ];
            })->toArray();
        }

        $hasPendingOrder = Order::where('user_id', $user->id)
            ->where('payment_method', 'midtrans_snap')
            ->where('payment_status', 'pending')
            ->where('status', 'pending')
            ->exists();

        return Inertia::render('guest/shop/index', [
            'products' => $products,
            'cart' => [
                'items' => $cartItems,
                'total_items' => collect($cartItems)->sum('quantity'),
                'total_price' => collect($cartItems)->sum('subtotal'),
            ],
            'has_pending_order' => $hasPendingOrder,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::where('id', $data['product_id'])
            ->where('is_active', true)
            ->firstOrFail();

        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            [
                'session_id' => 'user-' . $user->id,
                'expires_at' => now()->addDays(30),
            ]
        );

        $existing = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        $newQty = $data['quantity'] + ($existing?->quantity ?? 0);
        if ($newQty > (int) $product->stock) {
            return back()->withErrors([
                'shop' => 'Jumlah melebihi stok produk',
            ]);
        }

        if ($existing) {
            $existing->update([
                'quantity' => $newQty,
                'harga_awal' => (float) $product->harga_awal,
                'diskon' => (float) $product->diskon,
                'harga_akhir' => (float) $product->harga_akhir,
            ]);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $data['quantity'],
                'harga_awal' => (float) $product->harga_awal,
                'diskon' => (float) $product->diskon,
                'harga_akhir' => (float) $product->harga_akhir,
            ]);
        }

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang');
    }

    public function checkout(Request $request)
    {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return back()->withErrors([
                'shop' => 'Keranjang kosong',
            ]);
        }

        $sessionAffiliateId = (int) $request->session()->get('ref_affiliate_id', 0);
        $affiliateId = null;
        if ($sessionAffiliateId > 0) {
            $affiliateId = Affiliate::where('id', $sessionAffiliateId)
                ->where('is_active', true)
                ->value('id');
        }

        try {
            $order = DB::transaction(function () use ($cart, $user, $affiliateId) {
                $items = CartItem::where('cart_id', $cart->id)
                    ->with('product')
                    ->lockForUpdate()
                    ->get();

                if ($items->isEmpty()) {
                    throw new \RuntimeException('Keranjang kosong');
                }

                $grandTotal = 0;
                $totalQty = 0;
                $firstProduct = $items->first()->product;
                $generatesActivationCode = false;

                foreach ($items as $item) {
                    $product = $item->product;
                    if (!$product || !$product->is_active) {
                        throw new \RuntimeException('Produk tidak aktif / tidak ditemukan');
                    }

                    if ((int) $product->stock < (int) $item->quantity) {
                        throw new \RuntimeException('Stok produk tidak cukup untuk checkout');
                    }

                    $lineTotal = (float) $item->harga_akhir * (int) $item->quantity;
                    $grandTotal += $lineTotal;
                    $totalQty += (int) $item->quantity;
                    $itemGeneratesActivationCode = (bool) $product->generates_activation_code
                        || strtolower((string) $product->type) === 'bundle';
                    $generatesActivationCode = $generatesActivationCode || $itemGeneratesActivationCode;
                }

                $order = Order::create([
                    'order_number' => 'ORD-' . uniqid(),
                    'user_id' => $user->id,
                    'affiliate_id' => $affiliateId,
                    'payment_method' => 'midtrans_snap',
                    'midtrans_order_id' => 'MT-' . uniqid(),
                    'shipping_data' => [
                        'recipient_name' => $user->name,
                        'recipient_phone' => $user->phone,
                        'address' => $this->resolveUserAddress($user),
                    ],
                    'product_type' => strtolower((string) ($firstProduct?->type ?? 'single')),
                    'product_id' => $firstProduct?->id,
                    'product_name' => $firstProduct?->name ?? 'Cart Checkout',
                    'quantity' => $totalQty,
                    'price' => $items->count() === 1 ? (float) $items->first()->harga_akhir : ($totalQty > 0 ? ($grandTotal / $totalQty) : 0),
                    'total_amount' => $grandTotal,
                    'shipping_cost' => 0,
                    'tax_amount' => 0,
                    'grand_total' => $grandTotal,
                    'payment_status' => 'pending',
                    'status' => 'pending',
                    'generates_activation_code' => $generatesActivationCode,
                    'notes' => 'Created from guest cart checkout',
                ]);

                foreach ($items as $item) {
                    $product = $item->product;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product?->id,
                        'package_id' => null,
                        'quantity' => (int) $item->quantity,
                        'gives_activation_code' => (bool) ($product?->generates_activation_code ?? false)
                            || strtolower((string) ($product?->type ?? '')) === 'bundle',
                        'harga_awal' => (float) $item->harga_awal,
                        'diskon' => (float) $item->diskon,
                        'harga_akhir' => (float) $item->harga_akhir,
                    ]);

                    $product?->decrement('stock', (int) $item->quantity);
                }

                return $order->load('items.product');
            });
        } catch (\Throwable $e) {
            return back()->withErrors([
                'shop' => 'Checkout gagal: ' . $e->getMessage(),
            ]);
        }

        try {
            $redirectUrl = $this->createMidtransTransaction($order, $user);
        } catch (\Throwable $e) {
            Log::error('Guest midtrans transaction create failed: ' . $e->getMessage(), [
                'order_id' => $order->id,
            ]);

            app(OrderService::class)->cancelPendingOrder(
                $order->id,
                'Midtrans create transaction failed'
            );

            return back()->withErrors([
                'shop' => 'Gagal membuat transaksi Midtrans',
            ]);
        }

        CartItem::where('cart_id', $cart->id)->delete();

        return back()->with('midtrans', [
            'snap_token' => $order->midtrans_data['snap_token'] ?? null,
            'redirect_url' => $redirectUrl,
            'order_number' => $order->order_number,
        ]);
    }

    public function cancel(Request $request)
    {
        $user = $request->user();

        $pendingOrder = Order::where('user_id', $user->id)
            ->where('payment_method', 'midtrans_snap')
            ->where('payment_status', 'pending')
            ->where('status', 'pending')
            ->latest('id')
            ->first();

        if ($pendingOrder) {
            app(OrderService::class)->cancelPendingOrder(
                $pendingOrder->id,
                'Cancelled by user from guest cart'
            );
        }

        $cart = Cart::where('user_id', $user->id)->first();
        if ($cart) {
            CartItem::where('cart_id', $cart->id)->delete();
        }

        return back()->with('success', 'Keranjang dibatalkan');
    }

    private function resolveImageUrl(Product $product): ?string
    {
        $image = $product->image;

        if (is_string($image) && $image !== '') {
            $decoded = json_decode($image, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $image = $decoded;
            } else {
                if (str_starts_with($image, 'http')) {
                    return $image;
                }

                $normalized = ltrim($image, '/');
                $normalized = preg_replace('#^storage/#', '', $normalized);

                return route('media.public', ['path' => $normalized]);
            }
        }

        if (!is_array($image) || !isset($image[0])) {
            return null;
        }

        $first = $image[0];
        if (is_string($first) && $first !== '') {
            if (str_starts_with($first, 'http')) {
                return $first;
            }

            $normalized = ltrim($first, '/');
            $normalized = preg_replace('#^storage/#', '', $normalized);

            return route('media.public', ['path' => $normalized]);
        }

        if (!is_array($first)) {
            return null;
        }

        if (!empty($first['url'])) {
            if (str_starts_with((string) $first['url'], 'http')) {
                return $first['url'];
            }

            $normalized = ltrim((string) $first['url'], '/');
            $normalized = preg_replace('#^storage/#', '', $normalized);

            return route('media.public', ['path' => $normalized]);
        }

        if (!empty($first['path'])) {
            return route('media.public', ['path' => ltrim((string) $first['path'], '/')]);
        }

        return null;
    }

    private function createMidtransTransaction(Order $order, $user): string
    {
        MidtransConfig::$serverKey = config('midtans.server_key') ?: env('MIDTRANS_SERVER_KEY');
        MidtransConfig::$isProduction = (bool) (config('midtans.is_production') ?? env('MIDTRANS_IS_PRODUCTION', false));
        MidtransConfig::$isSanitized = (bool) (config('midtans.is_sanitized') ?? env('MIDTRANS_IS_SANITIZED', true));
        MidtransConfig::$is3ds = (bool) (config('midtans.is_3ds') ?? env('MIDTRANS_IS_3DS', true));

        $itemDetails = $order->items->map(function ($item) {
            return [
                'id' => (string) ($item->product_id ?? $item->id),
                'price' => (int) round((float) $item->harga_akhir),
                'quantity' => (int) $item->quantity,
                'name' => substr($item->product?->name ?? 'Product', 0, 50),
            ];
        })->values()->all();

        $params = [
            'transaction_details' => [
                'order_id' => $order->midtrans_order_id,
                'gross_amount' => (int) round((float) $order->grand_total),
            ],
            'item_details' => $itemDetails,
            'customer_details' => [
                'first_name' => $user->name ?? 'Customer',
                'email' => $user->email ?? 'customer@example.com',
                'phone' => $user->phone ?? '-',
            ],
            'callbacks' => [
                'finish' => route('shop.index'),
                'error' => route('shop.index'),
                'pending' => route('shop.index'),
            ],
        ];

        $transaction = Snap::createTransaction($params);

        $order->update([
            'midtrans_data' => [
                'snap_token' => $transaction->token ?? null,
                'redirect_url' => $transaction->redirect_url ?? null,
                'source' => 'guest_cart',
            ],
            'payment_reference' => $transaction->token ?? null,
        ]);

        return $transaction->redirect_url;
    }

    private function resolveUserAddress($user): ?string
    {
        $address = $user->profile?->address;
        if (is_string($address) && trim($address) !== '') {
            return trim($address);
        }

        if (!is_array($address)) {
            return null;
        }

        if (!empty($address['full_address'])) {
            return (string) $address['full_address'];
        }

        $parts = array_filter([
            $address['street'] ?? null,
            $address['subdistrict'] ?? null,
            $address['district'] ?? null,
            $address['city'] ?? null,
            $address['province'] ?? null,
            $address['postal_code'] ?? null,
        ]);

        return !empty($parts) ? implode(', ', $parts) : null;
    }
}
