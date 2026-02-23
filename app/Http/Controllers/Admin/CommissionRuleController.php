<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return Inertia::render('admin/commission-rules/create');
    }

    public function edit(CommissionRule $commissionRule)
    {
        return Inertia::render('admin/commission-rules/edit', [
            'rule' => $commissionRule,
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
        ]);

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
        ]);

        $commissionRule->update($data);
        return response()->json(['success' => true, 'rule' => $commissionRule]);
    }

    public function destroy(CommissionRule $commissionRule)
    {
        $commissionRule->delete();
        return response()->json(['success' => true]);
    }
}
