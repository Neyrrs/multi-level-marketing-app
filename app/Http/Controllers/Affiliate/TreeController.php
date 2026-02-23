<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\MlmTree;
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
                'treeData' => null,
            ]);
        }

        // Build tree structure recursively
        $treeData = $this->buildTreeStructure($affiliate);

        return Inertia::render('affiliate/tree/index', [
            'currentAffiliate' => [
                'id' => $affiliate->id,
                'name' => $user->name,
                'username' => $affiliate->username,
                'level' => $affiliate->level,
                'position' => $affiliate->position,
            ],
            'treeData' => $treeData,
        ]);
    }

    /**
     * Build tree structure recursively
     */
    private function buildTreeStructure(Affiliate $affiliate, $depth = 0, $maxDepth = 3)
    {
        if ($depth >= $maxDepth) {
            return null;
        }

        $leftChild = Affiliate::where('upline_id', $affiliate->user_id)
            ->where('position', 'left')
            ->first();
        $rightChild = Affiliate::where('upline_id', $affiliate->user_id)
            ->where('position', 'right')
            ->first();

        return [
            'id' => $affiliate->id,
            'name' => $affiliate->user->name,
            'username' => $affiliate->username,
            'level' => $affiliate->level,
            'position' => $affiliate->position,
            'is_active' => $affiliate->is_active,
            'left' => $leftChild ? $this->buildTreeStructure($leftChild, $depth + 1) : null,
            'right' => $rightChild ? $this->buildTreeStructure($rightChild, $depth + 1) : null,
        ];
    }
}
