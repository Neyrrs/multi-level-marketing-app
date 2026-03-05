<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Services\AffiliateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateManagementController extends Controller
{
    public function __construct(private readonly AffiliateService $service)
    {
    }

    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));

        $query = Affiliate::query()
            ->with(['user:id,name,email', 'sponsor:id,name'])
            ->where('is_active', false)
            ->orderByDesc('id');

        if ($search !== '') {
            $query->where(function ($q) use ($search): void {
                $q->where('username', 'ilike', "%{$search}%")
                    ->orWhereRelation('user', 'name', 'ilike', "%{$search}%")
                    ->orWhereRelation('user', 'email', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('manager/affiliate-management/index', [
            'pendingAffiliates' => $query->get()->map(fn (Affiliate $affiliate) => [
                'id' => $affiliate->id,
                'username' => $affiliate->username,
                'position' => $affiliate->position,
                'user' => [
                    'name' => $affiliate->user?->name,
                    'email' => $affiliate->user?->email,
                ],
                'sponsor' => [
                    'name' => $affiliate->sponsor?->name,
                ],
                'created_at' => $affiliate->created_at?->format('Y-m-d H:i'),
            ]),
            'search' => $search,
        ]);
    }

    public function approve(Request $request, Affiliate $affiliate)
    {
        $request->validate([
            'position' => ['required', 'in:left,right'],
        ]);

        if ($affiliate->is_active) {
            return back()->with('info', 'Affiliate ini sudah aktif.');
        }

        $positionTaken = Affiliate::query()
            ->where('upline_id', $affiliate->upline_id)
            ->where('position', $request->string('position')->toString())
            ->where('is_active', true)
            ->exists();

        if ($positionTaken) {
            return back()->withErrors([
                'position' => 'Posisi ini sudah terisi oleh downline aktif lain.',
            ]);
        }

        $this->service->confirmAffiliate(
            $affiliate->id,
            $request->string('position')->toString()
        );

        return back()->with('success', 'Affiliate berhasil disetujui dan diaktifkan.');
    }
}

