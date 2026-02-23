<?php

namespace App\Http\Controllers;

use App\Models\CommissionRule;
use Illuminate\Http\Request;

class CommissionRuleController extends Controller
{
    public function index()
    {
        return response()->json(CommissionRule::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'method_id' => 'required|integer',
            'priority' => 'required|integer',
            'value' => 'nullable',
            'condition' => 'nullable',
        ]);

        if (isset($data['condition']) && is_string($data['condition'])) {
            $data['condition'] = json_decode($data['condition'], true);
        }

        $rule = CommissionRule::create($data);
        return response()->json($rule, 201);
    }

    public function update(Request $request, CommissionRule $commissionRule)
    {
        $data = $request->validate([
            'priority' => 'sometimes|integer',
            'value' => 'nullable',
            'condition' => 'nullable',
        ]);

        if (isset($data['condition']) && is_string($data['condition'])) {
            $data['condition'] = json_decode($data['condition'], true);
        }

        $commissionRule->update($data);
        return response()->json($commissionRule);
    }

    public function destroy(CommissionRule $commissionRule)
    {
        $commissionRule->delete();
        return response()->json(null, 204);
    }
}
