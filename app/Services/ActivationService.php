<?php

namespace App\Services;

use App\Models\ActivationCode;
use App\Models\Package;
use Illuminate\Support\Str;
use App\Models\Order;

class ActivationService
{
    public function generateCode(int $packageId): ActivationCode
    {
        // minimal implementation: create unique code and link to package
        do {
            $code = strtoupper(Str::random(12));
        } while (ActivationCode::where('code', $code)->exists());

        return ActivationCode::create([
            'code' => $code,
            'package_id' => $packageId,
            'status' => 'available',
            'usage_count' => 1,
            'remaining_usage' => 1,
            'valid_from' => now(),
            'valid_until' => now()->addMonths(1),
        ]);
    }

    public function assignToUser(int $userId, string $code): ?ActivationCode
    {
        $ac = ActivationCode::where('code', $code)->first();
        if (!$ac) return null;

        $ac->update(['owner_id' => $userId]);
        return $ac;
    }

    public function validateCode(string $code): bool
    {
        $ac = ActivationCode::where('code', $code)->first();
        if (!$ac) return false;
        if ($ac->status !== 'available') return false;
        if ($ac->valid_until && now()->greaterThan($ac->valid_until)) return false;
        if ($ac->remaining_usage !== null && $ac->remaining_usage <= 0) return false;
        return true;
    }

    /**
     * Generate codes from an Order. Codes ownership assigned to sponsor if exists.
     */
    public function generateFromOrder(Order $order, int $count = 1): array
    {
        $codes = [];
        $sponsorUserId = $order->affiliate?->user_id;

        for ($i = 0; $i < $count; $i++) {
            do {
                $code = strtoupper(Str::random(12));
            } while (ActivationCode::where('code', $code)->exists());

            $ac = ActivationCode::create([
                'code' => $code,
                'owner_id' => $sponsorUserId,
                'generated_by' => $order->affiliate?->user_id,
                'generated_from' => 'order',
                'product_id' => $order->product_id,
                'package_id' => $order->product_id,
                'price' => $order->total_amount,
                'value' => $order->total_amount,
                'gives_commission' => true,
                'commission_value' => ($order->total_amount * 10) / 100,
                'usage_count' => 1,
                'remaining_usage' => 1,
                'status' => 'available',
                'valid_from' => now(),
                'valid_until' => now()->addMonths(1),
                'notes' => "Generated dari order {$order->order_number}",
            ]);

            $codes[] = $ac;
        }

        return $codes;
    }

    /**
     * Generate single code linked to owner
     */
    public function generateCodeWithOwner(int $packageId, int $ownerId, int $usageCount = 1): ActivationCode
    {
        do {
            $code = strtoupper(Str::random(12));
        } while (ActivationCode::where('code', $code)->exists());

        return ActivationCode::create([
            'code' => $code,
            'package_id' => $packageId,
            'owner_id' => $ownerId,
            'status' => 'available',
            'usage_count' => $usageCount,
            'remaining_usage' => $usageCount,
            'valid_from' => now(),
            'valid_until' => now()->addMonths(1),
        ]);
    }
}
