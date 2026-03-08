<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TreeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/tree/index', [
                'currentAffiliate' => null,
                'focusAffiliate' => null,
                'treeData' => null,
                'maxDepth' => 0,
            ]);
        }

        $planDepth = $this->resolvePlanDepth($affiliate);
        $maxDepth = min(3, $planDepth);

        $focusAffiliate = $affiliate;
        $focusId = (int) $request->input('focus');
        if ($focusId > 0) {
            $candidate = Affiliate::with('user')->find($focusId);
            if ($candidate && $this->isWithinTree($candidate, $affiliate)) {
                $focusAffiliate = $candidate;
            }
        }

        $treeData = $this->buildTreeStructure($focusAffiliate, 0, $maxDepth);

        return Inertia::render('affiliate/tree/index', [
            'currentAffiliate' => [
                'id' => $affiliate->id,
                'name' => $user->name,
                'username' => $affiliate->username,
                'level' => $affiliate->level,
                'position' => $affiliate->position,
            ],
            'focusAffiliate' => [
                'id' => $focusAffiliate->id,
                'name' => $focusAffiliate->user?->name ?? '-',
                'username' => $focusAffiliate->username,
                'level' => $focusAffiliate->level,
                'position' => $focusAffiliate->position,
            ],
            'treeData' => $treeData,
            'maxDepth' => $maxDepth,
        ]);
    }

    /**
     * Build tree structure recursively
     */
    private function buildTreeStructure(Affiliate $affiliate, int $depth = 0, int $maxDepth = 3): ?array
    {
        if ($depth >= $maxDepth) {
            return null;
        }

        $leftChild = Affiliate::where('upline_id', $affiliate->user_id)
            ->where('position', 'left')
            ->with('user')
            ->first();
        $rightChild = Affiliate::where('upline_id', $affiliate->user_id)
            ->where('position', 'right')
            ->with('user')
            ->first();

        return [
            'id' => $affiliate->id,
            'name' => $affiliate->user?->name ?? '-',
            'username' => $affiliate->username,
            'level' => $affiliate->level,
            'position' => $affiliate->position,
            'is_active' => $affiliate->is_active,
            'depth' => $depth,
            'left' => $leftChild ? $this->buildTreeStructure($leftChild, $depth + 1) : null,
            'right' => $rightChild ? $this->buildTreeStructure($rightChild, $depth + 1) : null,
        ];
    }

    private function resolvePlanDepth(Affiliate $affiliate): int
    {
        $defaultDepth = 3;
        $plan = $affiliate->commissionPlan()->with('rules')->first();
        if (!$plan) {
            return $defaultDepth;
        }

        $ruleDepth = collect($plan->rules)
            ->pluck('condition')
            ->filter(fn ($condition) => is_array($condition) && isset($condition['max_depth']))
            ->map(fn ($condition) => (int) $condition['max_depth'])
            ->filter(fn (int $depth) => $depth > 0)
            ->max();

        return $ruleDepth ?: $defaultDepth;
    }

    private function isWithinTree(Affiliate $candidate, Affiliate $root): bool
    {
        if ($candidate->id === $root->id) {
            return true;
        }

        $current = $candidate;
        $guard = 0;
        while ($current && $current->upline_id && $guard < 100) {
            if ((int) $current->upline_id === (int) $root->user_id) {
                return true;
            }

            $current = Affiliate::where('user_id', $current->upline_id)->first();
            $guard++;
        }

        return false;
    }
}
