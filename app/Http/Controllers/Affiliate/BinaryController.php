<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BinaryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/binary/index', [
                'affiliate' => null,
                'binaryTree' => null,
                'stats' => null,
            ]);
        }

        // Get binary tree structure
        $leftChild = Affiliate::where('upline_id', $user->id)
            ->where('position', 'left')
            ->first();
        $rightChild = Affiliate::where('upline_id', $user->id)
            ->where('position', 'right')
            ->first();

        $binaryTree = [
            'affiliate' => [
                'id' => $affiliate->id,
                'name' => $user->name,
                'username' => $affiliate->username,
                'position' => $affiliate->position,
                'level' => $affiliate->level,
                'is_active' => $affiliate->is_active,
            ],
            'left' => $leftChild ? [
                'id' => $leftChild->id,
                'name' => $leftChild->user->name,
                'username' => $leftChild->username,
                'level' => $leftChild->level,
                'is_active' => $leftChild->is_active,
            ] : null,
            'right' => $rightChild ? [
                'id' => $rightChild->id,
                'name' => $rightChild->user->name,
                'username' => $rightChild->username,
                'level' => $rightChild->level,
                'is_active' => $rightChild->is_active,
            ] : null,
        ];

        $stats = [
            'leftCount' => $affiliate->left_count,
            'rightCount' => $affiliate->right_count,
            'pairCount' => $affiliate->pair_count,
            'leftVolume' => $affiliate->left_volume,
            'rightVolume' => $affiliate->right_volume,
            'totalVolume' => $affiliate->total_volume,
        ];

        return Inertia::render('affiliate/binary/index', [
            'affiliate' => $affiliate,
            'binaryTree' => $binaryTree,
            'stats' => $stats,
        ]);
    }
}
