<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MlmTreeController extends Controller
{
    /**
     * Display MLM tree structure
     * Admin hanya bisa melihat downline mereka sendiri
     */
    public function index(Request $request)
    {
        // Get current user's affiliate profile (if exists)
        $userAffiliate = auth()->user()->affiliate;
        
        if (!$userAffiliate) {
            return Inertia::render('admin/mlm-tree/index', [
                'treeData' => null,
                'affiliateNode' => null,
                'totalDownline' => 0,
                'message' => 'Anda tidak terdaftar sebagai affiliate',
            ]);
        }

        // Get affiliate's downline tree structure
        $treeData = $this->buildTreeStructure($userAffiliate);
        
        return Inertia::render('admin/mlm-tree/index', [
            'treeData' => $treeData,
            'affiliateNode' => [
                'id' => $userAffiliate->id,
                'name' => $userAffiliate->user->name,
                'username' => $userAffiliate->username,
                'level' => $userAffiliate->level,
                'total_downline' => $userAffiliate->total_downline,
                'total_volume' => $userAffiliate->total_volume,
            ],
            'totalDownline' => $userAffiliate->total_downline,
        ]);
    }

    /**
     * Build tree structure recursively
     * Returns array dengan struktur tree yang bisa ditampilkan di frontend
     */
    private function buildTreeStructure(Affiliate $affiliate, int $depth = 0, int $maxDepth = 5): array
    {
        if ($depth > $maxDepth) {
            return [];
        }

        $node = [
            'id' => $affiliate->id,
            'name' => $affiliate->user->name,
            'username' => $affiliate->username,
            'level' => $affiliate->level,
            'position' => $affiliate->position,
            'direct_downline' => $affiliate->direct_downline,
            'total_downline' => $affiliate->total_downline,
            'total_volume' => $affiliate->total_volume,
            'is_active' => $affiliate->is_active,
            'children' => [],
        ];

        // Get direct downline
        $downlines = Affiliate::where('upline_id', $affiliate->id)
            ->orderBy('position') // left, right, none
            ->get();

        foreach ($downlines as $downline) {
            $node['children'][] = $this->buildTreeStructure($downline, $depth + 1, $maxDepth);
        }

        return $node;
    }

    /**
     * Get affiliate details dengan commission info
     */
    public function show(Affiliate $affiliate)
    {
        // Check if user is authorized to view this affiliate
        // Either the affiliate themselves or their upline
        $userAffiliate = auth()->user()->affiliate;
        
        if (!$userAffiliate || !$this->isDownlineOf($affiliate, $userAffiliate)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'id' => $affiliate->id,
            'name' => $affiliate->user->name,
            'email' => $affiliate->user->email,
            'phone' => $affiliate->user->phone,
            'username' => $affiliate->username,
            'level' => $affiliate->level,
            'position' => $affiliate->position,
            'direct_downline' => $affiliate->direct_downline,
            'total_downline' => $affiliate->total_downline,
            'total_personal_volume' => $affiliate->total_personal_volume,
            'total_volume' => $affiliate->total_volume,
            'left_volume' => $affiliate->left_volume,
            'right_volume' => $affiliate->right_volume,
            'pair_count' => $affiliate->pair_count,
            'is_active' => $affiliate->is_active,
            'activated_at' => $affiliate->activated_at,
            'sponsor' => $affiliate->sponsor?->user->name ?? 'N/A',
            'upline' => $affiliate->upline?->user->name ?? 'N/A',
        ]);
    }

    /**
     * Check if $affiliate is downline of $upline
     */
    private function isDownlineOf(Affiliate $affiliate, Affiliate $upline): bool
    {
        $current = $affiliate;
        
        while ($current) {
            if ($current->id === $upline->id) {
                return true;
            }
            $current = $current->upline;
        }
        
        return false;
    }
}
