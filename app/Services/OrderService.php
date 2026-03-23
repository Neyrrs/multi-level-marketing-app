<?php

namespace App\Services;

use App\Models\Affiliate;
use App\Models\Order;
use App\Services\ActivationService;
use App\Services\AffiliateService;
use App\Models\OrderActivationCode;
use Midtrans\Config as MidtransConfig;
use Midtrans\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\CommissionService;

class OrderService
{
    protected ActivationService $activationService;
    protected AffiliateService $affiliateService;
    protected CommissionService $commissionService;

    public function __construct()
    {
        $this->activationService = new ActivationService();
        $this->affiliateService = new AffiliateService();
        $this->commissionService = new CommissionService();
    }

    public function createOrder(int $userId, int $productId, ?int $affiliateId = null): Order
    {
        $order = Order::create([
            'order_number' => 'ORD-' . uniqid(),
            'user_id' => $userId,
            'affiliate_id' => $affiliateId,
            'payment_method' => 'midtrans_va',
            'midtrans_order_id' => 'MT-' . uniqid(),
            'product_type' => 'bundle',
            'product_id' => $productId,
            'product_name' => 'bundle_' . $productId,
            'quantity' => 1,
            'price' => 0,
            'total_amount' => 0,
            'shipping_cost' => 0,
            'tax_amount' => 0,
            'grand_total' => 0,
            'payment_status' => 'pending',
            'status' => 'pending',
            'generates_activation_code' => true,
        ]);

        return $order;
    }

    public function processPayment(int $orderId, ?Request $request = null): ?Order
    {
        $order = Order::find($orderId);
        if (!$order) return null;

        // cancelled order should never be marked paid again
        if ($order->status === 'cancelled') {
            Log::warning('Payment ignored because order already cancelled: ' . $order->id);
            return null;
        }

        // idempotent: if already paid, skip re-processing
        if ($order->payment_status === 'paid') {
            return $order;
        }

        // If request present, optionally verify signature (basic placeholder)
        if ($request) {
            if (!$this->verifyMidtransSignature($request)) {
                Log::warning('Midtrans signature verification failed for order ' . $order->id);
                return null;
            }
        }

        // Mark paid
        $midtransPayload = $request ? $request->all() : [];

        $order->update([
            'payment_status' => 'paid',
            'status' => 'processing',
            'paid_at' => now(),
            'midtrans_data' => !empty($midtransPayload)
                ? array_merge((array) ($order->midtrans_data ?? []), $midtransPayload)
                : $order->midtrans_data,
            'payment_reference' => $request?->input('transaction_id')
                ?? $request?->input('approval_code')
                ?? $request?->input('order_id')
                ?? $order->payment_reference,
        ]);

        // RO behavior: paid affiliate bundle order extends active period when expired.
        $wasAutoRenewedByBundleRo = $this->renewAffiliateActivePeriod($order);

        $activationCodeCount = (int) $order->items()
            ->where('gives_activation_code', true)
            ->sum('quantity');
        $shouldGenerateActivationCode = (bool) $order->generates_activation_code || $activationCodeCount > 0;

        if ($shouldGenerateActivationCode) {
            if ($activationCodeCount <= 0) {
                $activationCodeCount = 1;
            }

            $generated = $this->activationService->generateFromOrder($order, $activationCodeCount);

            // If affiliate was expired and got reactivated by bundle purchase, consume one code automatically for RO.
            if ($wasAutoRenewedByBundleRo) {
                $this->consumeGeneratedCodeForAutoRo($order, $generated);
            }

            foreach ($generated as $code) {
                OrderActivationCode::firstOrCreate([
                    'order_id' => $order->id,
                    'activation_code_id' => $code->id,
                ]);
            }

            $this->createPendingAffiliateRequestForGuest($order, $generated);
        }

        // trigger commission calculation via CommissionService
        $this->commissionService->calculateSponsorCommission($order);
        $this->commissionService->calculateLevelCommission($order);

        if ($shouldGenerateActivationCode) {
            $order->update([
                'generates_activation_code' => true,
                'activation_codes_count' => $activationCodeCount,
            ]);
        }

        return $order;
    }

    private function createPendingAffiliateRequestForGuest(Order $order, array $generatedCodes): void
    {
        $buyer = $order->user;
        if (!$buyer || !$buyer->hasRole('guest')) {
            return;
        }

        if ($buyer->affiliate()->exists()) {
            return;
        }

        $sponsorAffiliate = Affiliate::query()
            ->whereKey($order->affiliate_id)
            ->where('is_active', true)
            ->first();

        if (!$sponsorAffiliate) {
            return;
        }

        $primaryCode = collect($generatedCodes)->first();
        if (!$primaryCode) {
            return;
        }

        $existingPending = Affiliate::query()
            ->where('user_id', $buyer->id)
            ->where('sponsor_id', $sponsorAffiliate->user_id)
            ->where('is_active', false)
            ->latest('id')
            ->first();

        if ($existingPending) {
            $existingPending->update([
                'activation_code_id' => $primaryCode->id,
            ]);
            return;
        }

        $this->affiliateService->registerPendingAffiliate(
            $buyer,
            $sponsorAffiliate,
            $primaryCode,
            'left'
        );
    }

    public function cancelPendingOrder(int $orderId, string $reason = '', string $paymentStatus = 'failed'): ?Order
    {
        $order = Order::with('items.product')->find($orderId);
        if (!$order) {
            return null;
        }

        if ($order->payment_status !== 'pending' || $order->status === 'cancelled') {
            return $order;
        }

        if (!in_array($paymentStatus, ['failed', 'expired', 'pending', 'paid'], true)) {
            $paymentStatus = 'failed';
        }

        if ($paymentStatus === 'pending' || $paymentStatus === 'paid') {
            $paymentStatus = 'failed';
        }

        DB::transaction(function () use ($order, $reason, $paymentStatus) {
            foreach ($order->items as $item) {
                if ($item->product_id && $item->product) {
                    $item->product->increment('stock', (int) $item->quantity);
                }
            }

            $noteSuffix = $reason !== '' ? " | {$reason}" : '';
            $existingNotes = $order->notes ?? '';

            $order->update([
                'payment_status' => $paymentStatus,
                'status' => 'cancelled',
                'notes' => trim($existingNotes . $noteSuffix),
            ]);
        });

        return $order->fresh();
    }

    public function syncMidtransStatus(Order $order): ?Order
    {
        if (empty($order->midtrans_order_id)) {
            return $order;
        }

        if ($order->payment_status === 'paid' || $order->status === 'cancelled') {
            return $order;
        }

        $this->configureMidtrans();

        try {
            $status = (array) Transaction::status($order->midtrans_order_id);
            $transactionStatus = (string) ($status['transaction_status'] ?? '');
            $fraudStatus = (string) ($status['fraud_status'] ?? '');

            $order->update([
                'midtrans_data' => array_merge((array) ($order->midtrans_data ?? []), $status),
            ]);

            $isPaid = $transactionStatus === 'settlement'
                || ($transactionStatus === 'capture' && ($fraudStatus === '' || $fraudStatus === 'accept'));

            if ($isPaid) {
                return $this->processPayment($order->id, null);
            }

            if (in_array($transactionStatus, ['cancel', 'deny', 'failure'], true)) {
                return $this->cancelPendingOrder($order->id, 'Midtrans sync status: ' . $transactionStatus, 'failed');
            }

            if ($transactionStatus === 'expire') {
                return $this->cancelPendingOrder($order->id, 'Midtrans sync status: expire', 'expired');
            }
        } catch (\Throwable $e) {
            Log::warning('Failed to sync Midtrans status', [
                'order_id' => $order->id,
                'midtrans_order_id' => $order->midtrans_order_id,
                'error' => $e->getMessage(),
            ]);
        }

        return $order->fresh();
    }

    public function completeOrder(int $orderId): ?Order
    {
        $order = Order::find($orderId);
        if (!$order) return null;
        $order->update(['status' => 'completed']);
        return $order;
    }

    public function attachActivationCode(int $orderId): array
    {
        $order = Order::find($orderId);
        if (!$order) return [];

        $codes = [];
        // generate 1 code
        $acs = $this->activationService->generateFromOrder($order, 1);
        foreach ($acs as $c) {
            $codes[] = $c->code;
        }

        $order->update(['activation_codes_count' => count($codes)]);

        return $codes;
    }

    /**
     * Basic placeholder for verifying Midtrans signature.
     * Replace with real signature verification using Midtrans server key.
     */
    public function verifyMidtransSignature(Request $request): bool
    {
        $serverKey = config('services.midtrans.server_key')
            ?? config('midtans.server_key')
            ?? env('MIDTRANS_SERVER_KEY');
        if (empty($serverKey)) {
            Log::warning('Midtrans server key not configured');
            return false;
        }

        $orderId = $request->input('order_id') ?? $request->input('order_id');
        $statusCode = $request->input('status_code');
        $grossAmount = $request->input('gross_amount');
        $signature = $request->input('signature_key') ?? $request->input('signature');

        if (!$orderId || !$statusCode || !$grossAmount || !$signature) {
            Log::warning('Midtrans webhook missing required fields');
            return false;
        }

        $expected = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        return hash_equals($expected, $signature);
    }

    private function configureMidtrans(): void
    {
        MidtransConfig::$serverKey = config('midtans.server_key')
            ?: config('services.midtrans.server_key')
            ?: env('MIDTRANS_SERVER_KEY');
        MidtransConfig::$isProduction = (bool) (config('midtans.is_production')
            ?? config('services.midtrans.is_production')
            ?? env('MIDTRANS_IS_PRODUCTION', false));
        MidtransConfig::$isSanitized = (bool) (config('midtans.is_sanitized')
            ?? env('MIDTRANS_IS_SANITIZED', true));
        MidtransConfig::$is3ds = (bool) (config('midtans.is_3ds')
            ?? env('MIDTRANS_IS_3DS', true));
    }

    private function renewAffiliateActivePeriod(Order $order): bool
    {
        $buyer = $order->user;
        if (!$buyer || !$buyer->hasRole('affiliate')) {
            return false;
        }

        $affiliate = $buyer->affiliate;
        if (!$affiliate) {
            return false;
        }

        $hasBundleItem = $order->items()
            ->whereHas('product', function ($q) {
                $q->whereRaw('LOWER(type) = ?', ['bundle']);
            })
            ->exists() || strtolower((string) $order->product_type) === 'bundle';

        if (!$hasBundleItem) {
            return false;
        }

        $isExpired = !$affiliate->active_until || now()->greaterThan($affiliate->active_until);
        if (!$isExpired && $affiliate->is_active) {
            // Active account buying bundle should still get code, but no RO extension.
            return false;
        }

        $affiliate->update([
            'is_active' => true,
            'activated_at' => $affiliate->activated_at ?? now(),
            'active_until' => now()->addMonth(),
            'last_activity_at' => now(),
        ]);

        return true;
    }

    /**
     * Auto-consume one generated activation code when bundle payment is used as RO reactivation.
     */
    private function consumeGeneratedCodeForAutoRo(Order $order, array $generatedCodes): void
    {
        $buyer = $order->user;
        if (!$buyer || empty($generatedCodes)) {
            return;
        }

        $code = $generatedCodes[0] ?? null;
        if (!$code) {
            return;
        }

        $remaining = (int) ($code->remaining_usage ?? $code->usage_count ?? 1);
        $remaining = max(0, $remaining - 1);
        $existingNotes = trim((string) ($code->notes ?? ''));
        $autoNote = 'Auto-used for RO reactivation (affiliate expired) order=' . $order->order_number;

        $code->update([
            'remaining_usage' => $remaining,
            'status' => $remaining <= 0 ? 'used' : 'available',
            'used_by' => $buyer->id,
            'used_at' => now(),
            'notes' => trim($existingNotes . ' | ' . $autoNote, ' |'),
        ]);
    }
}
