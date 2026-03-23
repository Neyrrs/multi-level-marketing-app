<?php

namespace App\Http\Controllers;

use App\Models\Affiliate;
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

class PublicCartController extends Controller
{
    public function __construct(private readonly OrderService $orderService)
    {
    }

    /**
     * Process checkout from localStorage cart items.
     * Expects JSON body: { items: [{ id, name, price, qty }] }
     */
    public function checkout(Request $request)
    {
        $user = $request->user();
        $address = $this->resolveProfileAddress($user);
        if (blank($user?->name) || blank($user?->email) || blank($user?->phone) || blank($address)) {
            return back()->withErrors([
                'cart' => 'Lengkapi data profil (nama, email, no. HP, alamat) sebelum checkout.',
            ]);
        }

        $data = $request->validate([
            'items'         => 'required|array|min:1',
            'items.*.id'    => 'required|integer|exists:products,id',
            'items.*.qty'   => 'required|integer|min:1',
            'notes'         => 'nullable|string|max:500',
        ]);

        $sessionAffiliateId = (int) $request->session()->get('ref_affiliate_id', 0);
        $affiliateId = null;
        if ($user && $user->hasRole('affiliate')) {
            $affiliateId = $user->affiliate?->id;
        }

        if ($sessionAffiliateId > 0) {
            $sessionAffiliate = Affiliate::where('id', $sessionAffiliateId)
                ->where('is_active', true)
                ->value('id');
            if (!$affiliateId && $sessionAffiliate) {
                $affiliateId = $sessionAffiliate;
            }
        }

        if (!$affiliateId && $user && $user->hasRole('guest')) {
            $randomAffiliate = app(\App\Services\AffiliateService::class)->assignRandomSponsor();
            if ($randomAffiliate) {
                $affiliateId = $randomAffiliate->id;
                $request->session()->put('ref_affiliate_id', $randomAffiliate->id);
                $request->session()->put('ref_affiliate_slug', $randomAffiliate->slug);
            }
        }

        try {
            $order = DB::transaction(function () use ($data, $user, $affiliateId, $address) {
                $productIds = collect($data['items'])->pluck('id');
                $products   = Product::whereIn('id', $productIds)
                    ->where('is_active', true)
                    ->lockForUpdate()
                    ->get()
                    ->keyBy('id');

                $grandTotal            = 0;
                $totalQty              = 0;
                $firstProduct          = null;
                $generatesActivationCode = false;
                $lineItems             = [];

                foreach ($data['items'] as $cartItem) {
                    $product = $products->get($cartItem['id']);

                    if (!$product) {
                        throw new \RuntimeException("Produk ID {$cartItem['id']} tidak ditemukan atau tidak aktif.");
                    }

                    $qty = (int) $cartItem['qty'];

                    if ((int) $product->stock < $qty) {
                        throw new \RuntimeException("Stok produk \"{$product->name}\" tidak mencukupi.");
                    }

                    $lineTotal   = (float) $product->harga_akhir * $qty;
                    $grandTotal += $lineTotal;
                    $totalQty   += $qty;

                    $generatesActivationCode = $generatesActivationCode
                        || (bool) $product->generates_activation_code
                        || strtolower((string) $product->type) === 'bundle';

                    if ($firstProduct === null) {
                        $firstProduct = $product;
                    }

                    $lineItems[] = [
                        'product'    => $product,
                        'qty'        => $qty,
                        'harga_awal' => (float) $product->harga_awal,
                        'diskon'     => (float) $product->diskon,
                        'harga_akhir'=> (float) $product->harga_akhir,
                    ];
                }

                $this->enforceGuestBundleRule($user, $lineItems);

                $order = Order::create([
                    'order_number'             => 'ORD-' . uniqid(),
                    'user_id'                  => $user->id,
                    'affiliate_id'             => $affiliateId,
                    'payment_method'           => 'midtrans_snap',
                    'midtrans_order_id'        => 'MT-' . uniqid(),
                    'shipping_data'            => [
                        'recipient_name'  => $user->name,
                        'recipient_phone' => $user->phone,
                        'address'         => $address,
                    ],
                    'product_type'             => strtolower((string) ($firstProduct?->type ?? 'single')),
                    'product_id'               => $firstProduct?->id,
                    'product_name'             => $firstProduct?->name ?? 'Cart Checkout',
                    'quantity'                 => $totalQty,
                    'price'                    => count($lineItems) === 1
                        ? $lineItems[0]['harga_akhir']
                        : ($totalQty > 0 ? $grandTotal / $totalQty : 0),
                    'total_amount'             => $grandTotal,
                    'shipping_cost'            => 0,
                    'tax_amount'               => 0,
                    'grand_total'              => $grandTotal,
                    'payment_status'           => 'pending',
                    'status'                   => 'pending',
                    'generates_activation_code'=> $generatesActivationCode,
                    'notes'                    => $data['notes'] ?? 'Created from public cart checkout',
                ]);

                foreach ($lineItems as $line) {
                    $product = $line['product'];

                    OrderItem::create([
                        'order_id'              => $order->id,
                        'product_id'            => $product->id,
                        'package_id'            => null,
                        'quantity'              => $line['qty'],
                        'gives_activation_code' => (bool) ($product->generates_activation_code ?? false)
                            || strtolower((string) ($product->type ?? '')) === 'bundle',
                        'harga_awal'            => $line['harga_awal'],
                        'diskon'                => $line['diskon'],
                        'harga_akhir'           => $line['harga_akhir'],
                    ]);

                    $product->decrement('stock', $line['qty']);
                }

                return $order->load('items.product');
            });
        } catch (\Throwable $e) {
            return back()->withErrors(['cart' => 'Checkout gagal: ' . $e->getMessage()]);
        }

        try {
            $redirectUrl = $this->createMidtransTransaction($order, $user);
        } catch (\Throwable $e) {
            Log::error('Public cart midtrans failed: ' . $e->getMessage(), ['order_id' => $order->id]);

            app(OrderService::class)->cancelPendingOrder($order->id, 'Midtrans create transaction failed');

            return back()->withErrors(['cart' => 'Gagal membuat transaksi Midtrans.']);
        }

        return back()->with('midtrans', [
            'snap_token'   => $order->midtrans_data['snap_token'] ?? null,
            'redirect_url' => $redirectUrl,
            'order_number' => $order->order_number,
        ]);
    }

    /**
     * Cancel the latest pending Midtrans order for this user.
     */
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
                'Cancelled by user from public cart'
            );
        }

        return back()->with('success', 'Pesanan dibatalkan.');
    }

    // ── Private helpers ──────────────────────────────────────────────────

    private function createMidtransTransaction(Order $order, $user): string
    {
        MidtransConfig::$serverKey   = config('midtans.server_key') ?: env('MIDTRANS_SERVER_KEY');
        MidtransConfig::$isProduction = (bool) (config('midtans.is_production') ?? env('MIDTRANS_IS_PRODUCTION', false));
        MidtransConfig::$isSanitized  = (bool) (config('midtans.is_sanitized') ?? env('MIDTRANS_IS_SANITIZED', true));
        MidtransConfig::$is3ds        = (bool) (config('midtans.is_3ds') ?? env('MIDTRANS_IS_3DS', true));

        $itemDetails = $order->items->map(function ($item) {
            return [
                'id'       => (string) ($item->product_id ?? $item->id),
                'price'    => (int) round((float) $item->harga_akhir),
                'quantity' => (int) $item->quantity,
                'name'     => substr($item->product?->name ?? 'Product', 0, 50),
            ];
        })->values()->all();

        $params = [
            'transaction_details' => [
                'order_id'     => $order->midtrans_order_id,
                'gross_amount' => (int) round((float) $order->grand_total),
            ],
            'item_details'     => $itemDetails,
            'customer_details' => [
                'first_name' => $user->name ?? 'Customer',
                'email'      => $user->email ?? 'customer@example.com',
                'phone'      => $user->phone ?? '-',
            ],
            'callbacks' => [
                'finish'  => route('cart'),
                'error'   => route('cart'),
                'pending' => route('cart'),
            ],
        ];

        $transaction = Snap::createTransaction($params);

        $order->update([
            'midtrans_data'      => [
                'snap_token'   => $transaction->token ?? null,
                'redirect_url' => $transaction->redirect_url ?? null,
                'source'       => 'public_cart',
            ],
            'payment_reference'  => $transaction->token ?? null,
        ]);

        return $transaction->redirect_url;
    }

    private function resolveProfileAddress($user): ?string
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
            $address['street']      ?? null,
            $address['subdistrict'] ?? null,
            $address['district']    ?? null,
            $address['city']        ?? null,
            $address['province']    ?? null,
            $address['postal_code'] ?? null,
        ]);
        return !empty($parts) ? implode(', ', $parts) : null;
    }

    private function enforceGuestBundleRule($user, array $lineItems): void
    {
        if (!$user || !$user->hasRole('guest')) {
            return;
        }

        $bundleQty = collect($lineItems)->sum(function (array $line): int {
            $type = strtolower((string) ($line['product']->type ?? ''));
            return $type === 'bundle' ? (int) ($line['qty'] ?? 0) : 0;
        });

        if ($bundleQty <= 0) {
            return;
        }

        if ($bundleQty > 1) {
            throw new \RuntimeException('Guest hanya bisa membeli 1 produk bundle per transaksi.');
        }

        $hasPaidBundle = Order::query()
            ->where('user_id', $user->id)
            ->where('payment_status', 'paid')
            ->whereHas('items.product', function ($q) {
                $q->whereRaw('LOWER(type) = ?', ['bundle']);
            })
            ->exists();

        if ($hasPaidBundle) {
            throw new \RuntimeException('Guest sudah pernah membeli produk bundle sebelumnya.');
        }
    }
}
