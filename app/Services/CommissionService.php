<?php

namespace App\Services;

use App\Models\Affiliate;
use App\Models\Commission;
use App\Models\CommissionMethod;
use App\Models\CommissionPlan;
use App\Models\CommissionLedger;
use App\Models\CommissionRule;
use Illuminate\Support\Arr;

class CommissionService
{
    public function calculateSponsorCommission(\App\Models\Order $order): ?Commission
    {
        $affiliate = $order->affiliate;
        if (!$affiliate) return null;

        $rule = $this->resolveRuleForAffiliate($affiliate, ['sponsor_direct', 'percentage'], ['sponsor'], 1);
        if (!$rule) return null;

        $amount = $this->evaluateRule($rule, $order);

        return $this->distributeCommission($affiliate->id, $amount, $rule->method_id, $rule->id, 'direct', $order->id);
    }

    public function calculateLevelCommission(\App\Models\Order $order): array
    {
        $results = [];
        $level = 1;
        $current = $order->affiliate;
        while ($current && $level <= 5) {
            $parent = Affiliate::where('user_id', $current->upline_id)->first();
            if (!$parent) break;
            $rule = $this->resolveRuleForAffiliate($parent, ['level_based', 'tier_based'], ['level'], $level);
            if (!$rule) {
                $current = $parent;
                $level++;
                continue;
            }
            $amount = $this->evaluateRule($rule, $order, $level, $parent);
            if ($amount <= 0) {
                $current = $parent;
                $level++;
                continue;
            }
            $results[] = $this->distributeCommission($parent->id, $amount, $rule->method_id, $rule->id, 'level', $order->id, $level);
            $current = $parent;
            $level++;
        }

        return $results;
    }

    public function calculateMatching(int $affiliateId): ?Commission
    {
        $aff = Affiliate::find($affiliateId);
        if (!$aff) return null;

        $left = $aff->left_count ?? 0;
        $right = $aff->right_count ?? 0;
        $pairs = min($left, $right);
        if ($pairs <= 0) return null;

        $rule = $this->resolveRuleForAffiliate($aff, ['matching_binary', 'percentage'], ['matching'], null, true);
        if (!$rule) {
            return null;
        }

        $amount = $this->evaluateMatchingRule($aff, $rule, $pairs);
        if ($amount <= 0) {
            return null;
        }

        return $this->distributeCommission($aff->id, $amount, $rule->method_id, $rule->id, 'matching', null);
    }

    /**
     * Calculate matching for all affiliates (daily)
     */
    public function calculateMatchingDaily(): void
    {
        $method = $this->resolveMethod(['matching_binary', 'percentage'], ['matching']);
        if (!$method) return;

        $affiliates = Affiliate::where('is_active', true)->get();
        foreach ($affiliates as $aff) {
            $left = (int)$aff->left_count;
            $right = (int)$aff->right_count;
            $pairs = min($left, $right);
            if ($pairs <= 0) continue;

            $resolvedRule = $this->resolveRuleForAffiliate($aff, ['matching_binary', 'percentage'], ['matching'], null, true);
            if (!$resolvedRule) {
                continue;
            }

            $amount = $this->evaluateMatchingRule($aff, $resolvedRule, $pairs);
            if ($amount <= 0) {
                continue;
            }

            $this->distributeCommission($aff->id, $amount, $resolvedRule->method_id ?? $method->id, $resolvedRule->id, 'matching', null);
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

        // Optional depth guard from rule condition.
        if ($depth !== null) {
            $exactDepth = Arr::get($cond, 'depth');
            if ($exactDepth !== null && (int) $exactDepth !== (int) $depth) {
                return 0;
            }

            $maxDepth = Arr::get($cond, 'max_depth');
            if ($maxDepth !== null && (int) $depth > (int) $maxDepth) {
                return 0;
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

    /**
     * Resolve commission method by expected calculation_type first, then by name fallback.
     */
    private function resolveMethod(array $types, array $names): ?CommissionMethod
    {
        $query = CommissionMethod::query()->where('is_active', true); 

        if (!empty($types)) {
            $typed = (clone $query)->whereIn('calculation_type', $types)->first();
            if ($typed) {
                return $typed;
            }
        }

        if (!empty($names)) {
            return (clone $query)->where(function ($q) use ($names) {
                foreach ($names as $name) {
                    $q->orWhereRaw('LOWER(name) LIKE ?', ['%' . strtolower($name) . '%']);
                }
            })->first();
        }

        return null;
    }

    /**
     * Resolve method with affiliate-specific override first.
     */
    private function resolveMethodForAffiliate(?Affiliate $affiliate, array $types, array $names): ?CommissionMethod
    {
        return $this->resolveMethod($types, $names);
    }

    private function resolveRuleForAffiliate(
        ?Affiliate $affiliate,
        array $types,
        array $names,
        ?int $priority = null,
        bool $requirePlanRule = false
    ): ?CommissionRule
    {
        if ($affiliate) {
            $plan = $affiliate->commissionPlan()->where('is_active', true)->first();
            if (!$plan) {
                $plan = CommissionPlan::query()
                    ->where('is_default', true)
                    ->where('is_active', true)
                    ->first();
            }

            if ($plan) {
                $query = $plan->rules()
                    ->where('commission_rules.is_active', true)
                    ->whereHas('method', function ($q) use ($types, $names) {
                        $q->where('is_active', true)->where(function ($inner) use ($types, $names) {
                            if (!empty($types)) {
                                $inner->whereIn('calculation_type', $types);
                            }

                            if (!empty($names)) {
                                $inner->orWhere(function ($nq) use ($names) {
                                    foreach ($names as $name) {
                                        $nq->orWhereRaw('LOWER(name) LIKE ?', ['%' . strtolower($name) . '%']);
                                    }
                                });
                            }
                        });
                    });

                $priorityQuery = clone $query;
                if ($priority !== null) {
                    $priorityQuery->where('commission_rules.priority', $priority);
                }

                $rule = $priorityQuery
                    ->orderBy('commission_rules.priority')
                    ->first();

                if ($rule) {
                    return $rule;
                }

                // Fallback for single-rule-per-method setup: use first active rule from plan.
                $fallbackRule = $query
                    ->orderBy('commission_rules.priority')
                    ->first();
                if ($fallbackRule) {
                    return $fallbackRule;
                }

                if ($requirePlanRule) {
                    return null;
                }
            } elseif ($requirePlanRule) {
                // Matching (or other strict mode) must come from active/default plan.
                return null;
            }
        }

        if ($requirePlanRule) {
            return null;
        }

        $method = $this->resolveMethodForAffiliate($affiliate, $types, $names);
        if (!$method) {
            return null;
        }

        $ruleQuery = $method->rules()->where('is_active', true);
        $priorityRuleQuery = clone $ruleQuery;
        if ($priority !== null) {
            $priorityRuleQuery->where('priority', $priority);
        }

        $priorityRule = $priorityRuleQuery->orderBy('priority')->first();
        if ($priorityRule) {
            return $priorityRule;
        }

        return $ruleQuery->orderBy('priority')->first();
    }

    /**
     * Matching calculation is rule-driven:
     * - percentage: value% dari matched volume (min left/right volume)
     * - fixed: value x pair count
     * You can override via condition.type = fixed|percentage.
     */
    private function evaluateMatchingRule(Affiliate $affiliate, CommissionRule $rule, int $pairs): float
    {
        $condition = is_array($rule->condition) ? $rule->condition : [];
        $minLegPoints = (float) Arr::get($condition, 'min_leg_points', 0);

        $leftVolume = (float) ($affiliate->left_volume ?? 0);
        $rightVolume = (float) ($affiliate->right_volume ?? 0);
        $matchedVolume = min($leftVolume, $rightVolume);

        if ($minLegPoints > 0 && ($leftVolume < $minLegPoints || $rightVolume < $minLegPoints)) {
            return 0;
        }

        $type = strtolower((string) Arr::get($condition, 'type', ''));
        if ($type === '') {
            $methodType = strtolower((string) ($rule->method?->calculation_type ?? ''));
            $type = $methodType === 'fixed' ? 'fixed' : 'percentage';
        }

        if ($type === 'fixed') {
            return round($pairs * (float) $rule->value, 2);
        }

        return round(($matchedVolume * (float) $rule->value) / 100, 2);
    }
}
