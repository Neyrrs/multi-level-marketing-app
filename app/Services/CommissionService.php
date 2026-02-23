<?php

namespace App\Services;

use App\Models\Affiliate;
use App\Models\Commission;
use App\Models\CommissionMethod;
use App\Models\CommissionLedger;
use App\Models\CommissionRule;
use Illuminate\Support\Arr;

class CommissionService
{
    public function calculateSponsorCommission(\App\Models\Order $order): ?Commission
    {
        $method = CommissionMethod::where('calculation_type', 'sponsor_direct')->first();
        if (!$method) return null;

        // simple lookup of rule priority 1
        $rule = $method->rules()->where('priority', 1)->first();
        if (!$rule) return null;

        $affiliate = $order->affiliate;
        if (!$affiliate) return null;

        $amount = $this->evaluateRule($rule, $order);

        return $this->distributeCommission($affiliate->id, $amount, $method->id, $rule->id, 'sponsor', $order->id);
    }

    public function calculateLevelCommission(\App\Models\Order $order): array
    {
        $results = [];
        $method = CommissionMethod::where('calculation_type', 'level_based')->first();
        if (!$method) return $results;
        $level = 1;
        $current = $order->affiliate;
        while ($current && $level <= 5) {
            $parent = Affiliate::where('user_id', $current->upline_id)->first();
            if (!$parent) break;
            $rule = $method->rules()->where('priority', $level)->first();
            if (!$rule) break;
            $amount = $this->evaluateRule($rule, $order, $level, $parent);
            $results[] = $this->distributeCommission($parent->id, $amount, $method->id, $rule->id, 'level', $order->id, $level);
            $current = $parent;
            $level++;
        }

        return $results;
    }

    public function calculateMatching(int $affiliateId): ?Commission
    {
        // Count left/right direct volumes and calculate pairs
        $aff = Affiliate::find($affiliateId);
        if (!$aff) return null;

        $left = $aff->left_count ?? 0;
        $right = $aff->right_count ?? 0;
        $pairs = min($left, $right);
        if ($pairs <= 0) return null;

        $amount = $pairs * 5000; // fixed rule per spec
        $method = CommissionMethod::where('calculation_type', 'matching_binary')->first();
        $rule = $method?->rules()->first();

        return $this->distributeCommission($aff->id, $amount, $method->id ?? null, $rule->id ?? null, 'matching', null);
    }

    /**
     * Calculate matching for all affiliates (daily)
     */
    public function calculateMatchingDaily(): void
    {
        $method = CommissionMethod::where('calculation_type', 'matching_binary')->first();
        if (!$method) return;

        $affiliates = Affiliate::where('is_active', true)->get();
        foreach ($affiliates as $aff) {
            $left = (int)$aff->left_count;
            $right = (int)$aff->right_count;
            $pairs = min($left, $right);
            if ($pairs <= 0) continue;

            $amount = $pairs * 5000;
            $rule = $method->rules()->first();
            $this->distributeCommission($aff->id, $amount, $method->id, $rule->id ?? null, 'matching', null);
        }
    }

    /**
     * Evaluate rule conditions and compute commission amount for a given order.
     */
    public function evaluateRule(CommissionRule $rule, \App\Models\Order $order, ?int $depth = null, ?Affiliate $affiliate = null): float
    {
        $cond = $rule->condition ?? [];

        // min_sales
        if (Arr::get($cond, 'min_sales') && $order->total_amount < Arr::get($cond, 'min_sales')) {
            return 0;
        }

        // max_sales
        if (Arr::get($cond, 'max_sales') && $order->total_amount > Arr::get($cond, 'max_sales')) {
            return 0;
        }

        // Tiered rules: condition contains 'tiers' array with min/max/value/type
        if (Arr::has($cond, 'tiers') && is_array($cond['tiers'])) {
            foreach ($cond['tiers'] as $tier) {
                $min = Arr::get($tier, 'min', null);
                $max = Arr::get($tier, 'max', null);
                $matches = true;
                if (!is_null($min) && $order->total_amount < $min) $matches = false;
                if (!is_null($max) && $order->total_amount > $max) $matches = false;
                if ($matches) {
                    if (Arr::get($tier, 'type') === 'percentage') {
                        return ($order->total_amount * (float)Arr::get($tier, 'value')) / 100;
                    }
                    return (float)Arr::get($tier, 'value');
                }
            }
            // no tier matched
            return 0;
        }

        // Loop/Depth-based rules: condition contains 'loop_percentages' or 'percentages' keyed by depth
        if (($depth !== null) && (Arr::has($cond, 'loop_percentages') || Arr::has($cond, 'percentages'))) {
            $map = Arr::get($cond, 'loop_percentages', Arr::get($cond, 'percentages', []));
            if (is_array($map)) {
                // try depth-specific
                if (isset($map[$depth])) {
                    $pct = (float)$map[$depth];
                    return ($order->total_amount * $pct) / 100;
                }
                // try positional (0-based)
                if (isset($map[$depth - 1])) {
                    $pct = (float)$map[$depth - 1];
                    return ($order->total_amount * $pct) / 100;
                }
            }
        }

        // percentage vs fixed (value field semantics)
        if ($rule->value && Arr::get($cond, 'type') === 'percentage') {
            return ($order->total_amount * $rule->value) / 100;
        }

        if ($rule->value && Arr::get($cond, 'type') === 'fixed') {
            return (float)$rule->value;
        }

        // default: treat as percent
        return ($order->total_amount * $rule->value) / 100;
    }

    public function distributeCommission(int $affiliateId, float $amount, ?int $methodId = null, ?int $ruleId = null, string $type = 'manual', ?int $orderId = null, ?int $depth = null): Commission
    {
        $commission = Commission::create([
            'affiliate_id' => $affiliateId,
            'order_id' => $orderId,
            'method_id' => $methodId,
            'rule_id' => $ruleId,
            'amount' => $amount,
            'commission_type' => $type,
            'depth_level' => $depth,
            'status' => 'calculated',
            'calculated_at' => now(),
        ]);

        // Create ledger entry for traceability
        CommissionLedger::create([
            'affiliate_id' => $affiliateId,
            'commission_id' => $commission->id,
            'order_id' => $orderId,
            'type' => 'credit',
            'amount' => $amount,
            'description' => "Auto generated commission ({$type})",
            'balance_before' => 0,
            'balance_after' => $amount,
            'reference' => $orderId ? 'order:' . $orderId : null,
            'reference_type' => $orderId ? 'order' : null,
            'status' => 'posted',
        ]);

        return $commission;
    }
}
