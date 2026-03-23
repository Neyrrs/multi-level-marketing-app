<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\CommissionPlan;
use App\Models\CommissionRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));

        $query = CommissionPlan::query()->withCount('rules')->orderBy('id');
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $plans = $query->get()->map(function (CommissionPlan $plan) {
            return [
                'id' => $plan->id,
                'plan' => $plan->name,
                'description' => $plan->description,
                'rules_count' => (int) ($plan->rules_count ?? 0),
                'is_active' => (bool) $plan->is_active,
                'is_default' => (bool) $plan->is_default,
            ];
        })->values();

        $availableRules = CommissionRule::with('method:id,name')
            ->where('is_active', true)
            ->orderBy('method_id')
            ->orderBy('priority')
            ->orderBy('id')
            ->get()
            ->groupBy('method_id')
            ->map(fn ($rows) => $rows->first())
            ->values()
            ->map(function (CommissionRule $rule) {
                return [
                    'id' => $rule->id,
                    'method_name' => $rule->method?->name ?? '-',
                    'rule_name' => $rule->rule_name ?: 'Rule #' . $rule->id,
                    'priority' => $rule->priority,
                    'value' => (float) $rule->value,
                ];
            })
            ->values();

        $affiliates = Affiliate::query()
            ->with(['user:id,name,email', 'commissionPlan:id,name', 'commissionMethod:id,name'])
            ->orderByDesc('id')
            ->get()
            ->map(function (Affiliate $affiliate) {
                return [
                    'id' => $affiliate->id,
                    'username' => $affiliate->username,
                    'user_name' => $affiliate->user?->name ?? '-',
                    'user_email' => $affiliate->user?->email ?? '-',
                    'assigned_plan_id' => $affiliate->commission_plan_id,
                    'assigned_plan_name' => $affiliate->commissionPlan?->name ?? $affiliate->commissionMethod?->name,
                    'is_active' => (bool) $affiliate->is_active,
                ];
            })
            ->values();

        return Inertia::render('admin/pengaturan-plan/index', [
            'plans' => $plans,
            'availableRules' => $availableRules,
            'affiliates' => $affiliates,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'plan' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'is_default' => 'nullable|boolean',
            'selected_rule_ids' => 'required|array|min:1',
            'selected_rule_ids.*' => 'integer|exists:commission_rules,id',
        ]);

        DB::transaction(function () use ($data) {
            $isDefault = (bool) ($data['is_default'] ?? false);
            if ($isDefault) {
                CommissionPlan::query()->update(['is_default' => false]);
            }

            $plan = CommissionPlan::create([
                'name' => $data['plan'],
                'description' => $data['description'] ?? null,
                'is_active' => (bool) ($data['is_active'] ?? true),
                'is_default' => $isDefault,
            ]);

            $ruleIds = $this->normalizeRuleIds($data['selected_rule_ids'] ?? []);
            $plan->rules()->sync($ruleIds);

            if ($isDefault) {
                $this->assignPlanToAllAffiliates($plan->id);
            }
        });

        return redirect()->route('admin.PengaturanPlan.index')->with('success', 'Plan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return redirect()->route('admin.PengaturanPlan.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return redirect()->route('admin.PengaturanPlan.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $plan = CommissionPlan::findOrFail($id);
        $data = $request->validate([
            'plan' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'is_default' => 'nullable|boolean',
            'selected_rule_ids' => 'nullable|array',
            'selected_rule_ids.*' => 'integer|exists:commission_rules,id',
        ]);

        DB::transaction(function () use ($plan, $data) {
            $isDefault = (bool) ($data['is_default'] ?? false);
            if ($isDefault) {
                CommissionPlan::query()
                    ->whereKeyNot($plan->id)
                    ->update(['is_default' => false]);
            }

            $plan->update([
                'name' => $data['plan'],
                'description' => $data['description'] ?? null,
                'is_active' => (bool) ($data['is_active'] ?? true),
                'is_default' => $isDefault,
            ]);

            if (array_key_exists('selected_rule_ids', $data)) {
                $ruleIds = $this->normalizeRuleIds($data['selected_rule_ids'] ?? []);
                $plan->rules()->sync($ruleIds);
            }

            if ($isDefault) {
                $this->assignPlanToAllAffiliates($plan->id);
            }
        });

        return redirect()->route('admin.PengaturanPlan.index')->with('success', 'Plan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $plan = CommissionPlan::findOrFail($id);
        $plan->delete();

        return redirect()->route('admin.PengaturanPlan.index')->with('success', 'Plan berhasil dihapus.');
    }

    public function assignAffiliatePlan(Request $request)
    {
        $data = $request->validate([
            'affiliate_id' => ['required', 'integer', 'exists:affiliates,id'],
            'plan_id' => ['nullable', 'integer', 'exists:commission_plans,id'],
        ]);

        $affiliate = Affiliate::findOrFail($data['affiliate_id']);
        $affiliate->update([
            'commission_plan_id' => $data['plan_id'] ?? null,
        ]);

        return redirect()->route('admin.plan-setting')->with('success', 'Plan affiliate berhasil diperbarui.');
    }

    public function setDefault(string $id)
    {
        $plan = CommissionPlan::findOrFail($id);

        DB::transaction(function () use ($plan) {
            CommissionPlan::query()->update(['is_default' => false]);
            $plan->update(['is_default' => true, 'is_active' => true]);
            $this->assignPlanToAllAffiliates($plan->id);
        });

        return redirect()->route('admin.plan-setting')->with('success', 'Default plan berhasil diperbarui.');
    }

    /**
     * Enforce single-method plan:
     * - A plan can only contain rules from one method.
     * - If multiple methods are selected, only the first method (by priority/id)
     *   is retained and the first active rule for that method is used.
     */
    private function normalizeRuleIds(array $selectedRuleIds): array
    {
        $ruleIds = collect($selectedRuleIds)
            ->filter()
            ->map(fn ($id) => (int) $id)
            ->values();

        if ($ruleIds->isEmpty()) {
            return [];
        }

        $rules = CommissionRule::query()
            ->whereIn('id', $ruleIds->all())
            ->where('is_active', true)
            ->orderBy('method_id')
            ->orderBy('priority')
            ->orderBy('id')
            ->get();

        if ($rules->isEmpty()) {
            return [];
        }

        $firstMethodId = (int) $rules->first()->method_id;

        $firstRuleForMethod = $rules
            ->where('method_id', $firstMethodId)
            ->first();

        return $firstRuleForMethod ? [(int) $firstRuleForMethod->id] : [];
    }

    private function assignPlanToAllAffiliates(int $planId): void
    {
        Affiliate::query()->update([
            'commission_plan_id' => $planId,
        ]);
    }
}
