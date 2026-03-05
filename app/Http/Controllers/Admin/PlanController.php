<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommissionMethod;
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

        $query = CommissionMethod::query()->withCount('rules')->orderBy('id');
        if ($search !== '') {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $plans = $query->get()->map(function (CommissionMethod $method) {
            return [
                'id' => $method->id,
                'plan' => $method->name,
                'description' => $method->description,
                'calculation_type' => $method->calculation_type,
                'rules_count' => (int) ($method->rules_count ?? 0),
                'is_active' => (bool) $method->is_active,
            ];
        })->values();

        $availableRules = CommissionRule::with('method:id,name')
            ->where('is_active', true)
            ->orderBy('method_id')
            ->orderBy('priority')
            ->get()
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

        return Inertia::render('admin/pengaturan-plan/index', [
            'plans' => $plans,
            'availableRules' => $availableRules,
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
            'calculation_type' => 'required|string|max:50',
            'is_active' => 'nullable|boolean',
            'selected_rule_ids' => 'nullable|array',
            'selected_rule_ids.*' => 'integer|exists:commission_rules,id',
        ]);

        DB::transaction(function () use ($data) {
            $method = CommissionMethod::create([
                'name' => $data['plan'],
                'description' => $data['description'] ?? null,
                'calculation_type' => $data['calculation_type'],
                'is_active' => (bool) ($data['is_active'] ?? true),
            ]);

            $ruleIds = collect($data['selected_rule_ids'] ?? [])->filter()->values();
            if ($ruleIds->isEmpty()) {
                return;
            }

            CommissionRule::whereIn('id', $ruleIds)->get()->each(function (CommissionRule $rule) use ($method) {
                CommissionRule::create([
                    'method_id' => $method->id,
                    'rule_name' => $rule->rule_name,
                    'condition' => $rule->condition,
                    'value' => $rule->value,
                    'priority' => $rule->priority,
                    'is_active' => $rule->is_active,
                ]);
            });
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
        $method = CommissionMethod::findOrFail($id);
        $data = $request->validate([
            'plan' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calculation_type' => 'required|string|max:50',
            'is_active' => 'nullable|boolean',
        ]);

        $method->update([
            'name' => $data['plan'],
            'description' => $data['description'] ?? null,
            'calculation_type' => $data['calculation_type'],
            'is_active' => (bool) ($data['is_active'] ?? true),
        ]);

        return redirect()->route('admin.PengaturanPlan.index')->with('success', 'Plan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $method = CommissionMethod::findOrFail($id);
        $method->delete();

        return redirect()->route('admin.PengaturanPlan.index')->with('success', 'Plan berhasil dihapus.');
    }
}
