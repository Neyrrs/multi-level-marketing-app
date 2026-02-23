<?php

namespace App\Services;

use App\Models\ActivationCode;
use App\Models\CommissionMethod;
use App\Models\CommissionRule;
use App\Models\User;
use Illuminate\Support\Collection;

class CommissionCalculationService
{
    /**
     * Calculate commission based on points from activation code
     * 
     * Formula: points * (rule_value / 100) untuk percentage
     * 
     * @param int $methodId
     * @param float $points
     * @param int|null $userId
     * @return float
     */
    public function calculateCommission(int $methodId, float $points, ?int $userId = null): float
    {
        $method = CommissionMethod::find($methodId);
        
        if (!$method || !$method->is_active) {
            return 0;
        }

        $rule = $this->getApplicableRule($method, $points, $userId);
        
        if (!$rule) {
            return 0;
        }

        return $this->applyRule($points, $rule);
    }

    /**
     * Get applicable rule based on condition
     */
    private function getApplicableRule(CommissionMethod $method, float $points, ?int $userId = null): ?CommissionRule
    {
        $rules = $method->rules()
            ->where('is_active', true)
            ->orderBy('priority')
            ->get();

        foreach ($rules as $rule) {
            if ($this->ruleMatches($rule, $points, $userId)) {
                return $rule;
            }
        }

        return null;
    }

    /**
     * Check if rule condition matches
     */
    private function ruleMatches(CommissionRule $rule, float $points, ?int $userId = null): bool
    {
        $condition = $rule->condition ?? [];

        // For Sponsor method - check level depth
        if ($rule->method->name === 'Sponsor') {
            // Sponsor rules are always applicable, level is checked elsewhere
            return true;
        }

        // For Level (Downline Depth) method - check points range
        if ($rule->method->name === 'Level') {
            $minPoints = $condition['min_points'] ?? 0;
            $maxPoints = $condition['max_points'] ?? PHP_INT_MAX;
            return $points >= $minPoints && $points <= $maxPoints;
        }

        // For Matching method - check depth
        if ($rule->method->name === 'Matching') {
            return true; // Depth is handled in commission distribution
        }

        return false;
    }

    /**
     * Calculate commission for depth-based (level berjenjang) method
     * Jika Ajeng beli dengan 300 points:
     * - Rana (depth 1) dapat 5% = 15
     * - Abdul (depth 2) dapat 4% = 12
     * - etc
     */
    public function calculateDepthBasedCommission(
        CommissionRule $rule,
        float $points,
        int $memberId
    ): array
    {
        $depthPercentages = $rule->depth_percentages ?? [];
        $maxDepth = $rule->max_depth ?? 5;

        if (empty($depthPercentages)) {
            return [];
        }

        $commissions = [];
        $affiliate = \App\Models\Affiliate::find($memberId);

        if (!$affiliate) {
            return [];
        }

        // Trace upline chain
        $currentUpline = $affiliate->upline;
        $depth = 1;

        while ($currentUpline && $depth <= $maxDepth) {
            $percentage = $depthPercentages[$depth] ?? null;

            if ($percentage !== null) {
                $commission = $points * ($percentage / 100);
                $commissions[$currentUpline->id] = [
                    'affiliate_id' => $currentUpline->id,
                    'depth' => $depth,
                    'percentage' => $percentage,
                    'amount' => $commission,
                    'points' => $points,
                ];
            }

            $currentUpline = $currentUpline->upline;
            $depth++;
        }

        return $commissions;
    }

    /**
     * Apply rule to calculate final commission amount
     */
    private function applyRule(float $points, CommissionRule $rule): float
    {
        $method = $rule->method;

        if ($method->calculation_type === 'percentage') {
            // Formula: points * (rule_value / 100)
            // Example: 200 points * (5 / 100) = 10
            return $points * ($rule->value / 100);
        }

        if ($method->calculation_type === 'fixed') {
            return $rule->value;
        }

        if ($method->calculation_type === 'tier_based') {
            return $points * ($rule->value / 100);
        }

        return 0;
    }

    /**
     * Calculate commission for all applicable methods
     */
    public function calculateAllCommissions(User $user, float $points, ActivationCode $activationCode): array
    {
        $commissions = [];
        $methods = CommissionMethod::where('is_active', true)->get();

        foreach ($methods as $method) {
            $amount = $this->calculateCommission($method->id, $points, $user->id);
            if ($amount > 0) {
                $commissions[$method->name] = [
                    'method_id' => $method->id,
                    'amount' => $amount,
                    'points' => $points,
                    'activation_code_id' => $activationCode->id,
                ];
            }
        }

        return $commissions;
    }

    /**
     * Get member level based on points
     */
    public function getMemberLevelByPoints(float $points): string
    {
        if ($points < 100) {
            return 'Member';
        }
        if ($points < 500) {
            return 'Bronze';
        }
        if ($points < 1500) {
            return 'Silver';
        }
        if ($points < 5000) {
            return 'Gold';
        }
        return 'Diamond';
    }

    /**
     * Get points from activation code
     */
    public function getPointsFromCode(string $code): float
    {
        $activationCode = ActivationCode::where('code', $code)->first();
        return $activationCode ? $activationCode->value : 0;
    }

    /**
     * Format commission for display
     */
    public function formatCommissionForDisplay(float $amount, string $currency = 'Rp'): string
    {
        return $currency . ' ' . number_format($amount, 0, ',', '.');
    }
}
