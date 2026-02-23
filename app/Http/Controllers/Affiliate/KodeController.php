<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\ActivationCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KodeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Get activation codes owned by this user
        $query = ActivationCode::where('owner_id', $user->id)
            ->with(['product'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('code', 'like', "%{$search}%");
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $perPage = $request->get('perPage', 10);
        $codes = $query->paginate($perPage);

        // Transform data for frontend
        $codes->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'code' => $item->code,
                'status' => $item->status,
                'product' => $item->product ? [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                ] : null,
                'created_at' => $item->created_at->format('Y-m-d H:i'),
                'used_at' => $item->used_at ? $item->used_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('affiliate/kode/index', [
            'codes' => $codes,
        ]);
    }
}
