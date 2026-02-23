<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DownlineController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $affiliate = $user->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/downline/index', [
                'downlines' => [],
                'total' => 0,
            ]);
        }

        // Get all downlines
        $query = Affiliate::where('sponsor_id', $user->id)
            ->with(['user'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            })->orWhere('username', 'like', "%{$search}%");
        }

        $perPage = $request->get('perPage', 10);
        $downlines = $query->paginate($perPage);

        // Transform data for frontend
        $downlines->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->user->name,
                'username' => $item->username,
                'email' => $item->user->email,
                'level' => $item->level,
                'position' => $item->position,
                'created_at' => $item->created_at->format('Y-m-d'),
                'is_active' => $item->is_active,
                'direct_downline' => $item->direct_downline,
            ];
        });

        return Inertia::render('affiliate/downline/index', [
            'downlines' => $downlines,
            'total' => $affiliate->total_downline,
        ]);
    }
}
