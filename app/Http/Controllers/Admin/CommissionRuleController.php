<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommissionMethod;
use App\Models\CommissionRule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommissionRuleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = (int) $request->input('per_page', 10);

        $query = CommissionRule::with('method');
        if ($search) {
            $query->whereRelation('method', 'name', 'like', "%{$search}%");
        }

        $rules = $query->paginate($perPage);

        return Inertia::render('admin/commission-rules/index', [
            'rules' => $rules->items(),
            'pagination' => [
                'total' => $rules->total(),
                'currentPage' => $rules->currentPage(),
                'perPage' => $rules->perPage(),
                'lastPage' => $rules->lastPage(),
                'hasMore' => $rules->hasMorePages(),
            ],
            'search' => $search,
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

        $rule = CommissionRule::create($data);
        return response()->json(['success' => true, 'rule' => $rule], 201);
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

        $commissionRule->update($data);
        return response()->json(['success' => true, 'rule' => $commissionRule]);
    }

    public function destroy(CommissionRule $commissionRule)
    {
        $commissionRule->delete();
        return response()->json(['success' => true]);
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
