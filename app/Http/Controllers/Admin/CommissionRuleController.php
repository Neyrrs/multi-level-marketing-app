<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommissionMethod;
use App\Models\CommissionRule;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CommissionRuleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $query = CommissionRule::with('method')
            ->orderBy('method_id')
            ->orderBy('priority')
            ->orderBy('id');
        if ($search) {
            $query->whereRelation('method', 'name', 'like', "%{$search}%");
        }

        // One visible rule per method (first by priority).
        $rules = $query->get()
            ->groupBy('method_id')
            ->map(fn ($rows) => $rows->first())
            ->values();

        return Inertia::render('admin/commission-rules/index', [
            'rules' => $rules,
            'pagination' => [
                'total' => $rules->count(),
                'currentPage' => 1,
                'perPage' => $rules->count(),
                'lastPage' => 1,
                'hasMore' => false,
            ],
            'search' => $search,
            'locked_single_rule' => true,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/commission-rules/create', [
            'methods' => CommissionMethod::query()
                ->orderBy('id')
                ->get(['id', 'name']),
        ]);
    }

    public function edit(CommissionRule $commissionRule)
    {
        return Inertia::render('admin/commission-rules/edit', [
            'rule' => $commissionRule,
            'methods' => CommissionMethod::query()
                ->orderBy('id')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'method_id' => 'required|exists:commission_methods,id',
            'rule_name' => 'nullable|string|max:255',
            'condition' => 'nullable|array',
            'value' => 'required|numeric|min:0',
            'priority' => 'nullable|integer|min:0',
            'depth' => 'nullable|integer|min:1',
            'max_depth' => 'nullable|integer|min:1',
        ]);

        $data['condition'] = $this->mergeDepthCondition(
            $data['condition'] ?? [],
            $data['depth'] ?? null,
            $data['max_depth'] ?? null
        );
        unset($data['depth'], $data['max_depth']);
        $data['priority'] = 1;

        // Enforce single rule per method.
        $existing = CommissionRule::query()
            ->where('method_id', $data['method_id'])
            ->orderBy('priority')
            ->orderBy('id')
            ->first();

        if ($existing) {
            $existing->update($data);
            return redirect()
                ->route('admin.commission-rules.index')
                ->with('success', 'Rule komisi berhasil diperbarui untuk metode terpilih.');
        }

        CommissionRule::create($data);
        return redirect()
            ->route('admin.commission-rules.index')
            ->with('success', 'Rule komisi berhasil dibuat.');
    }

    public function update(Request $request, CommissionRule $commissionRule)
    {
        $data = $request->validate([
            'method_id' => 'required|exists:commission_methods,id',
            'rule_name' => 'nullable|string|max:255',
            'condition' => 'nullable|array',
            'value' => 'required|numeric|min:0',
            'priority' => 'nullable|integer|min:0',
            'depth' => 'nullable|integer|min:1',
            'max_depth' => 'nullable|integer|min:1',
        ]);

        $data['condition'] = $this->mergeDepthCondition(
            $data['condition'] ?? [],
            $data['depth'] ?? null,
            $data['max_depth'] ?? null
        );
        unset($data['depth'], $data['max_depth']);
        $data['priority'] = 1;

        $conflict = CommissionRule::query()
            ->where('method_id', $data['method_id'])
            ->where('id', '!=', $commissionRule->id)
            ->exists();
        if ($conflict) {
            throw ValidationException::withMessages([
                'method_id' => 'Setiap metode hanya boleh memiliki 1 rule.',
            ]);
        }

        $commissionRule->update($data);
        return redirect()
            ->route('admin.commission-rules.index')
            ->with('success', 'Rule komisi berhasil disimpan.');
    }

    public function destroy(CommissionRule $commissionRule)
    {
        $commissionRule->delete();
        return redirect()
            ->route('admin.commission-rules.index')
            ->with('success', 'Rule komisi berhasil dihapus.');
    }

    private function mergeDepthCondition(array $condition, ?int $depth, ?int $maxDepth): array
    {
        if ($depth !== null) {
            $condition['depth'] = $depth;
        } else {
            unset($condition['depth']);
        }

        if ($maxDepth !== null) {
            $condition['max_depth'] = $maxDepth;
        } else {
            unset($condition['max_depth']);
        }

        return $condition;
    }
}
