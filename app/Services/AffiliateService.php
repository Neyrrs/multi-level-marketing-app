<?php

namespace App\Services;

use App\Models\Affiliate;
use App\Models\ActivationCode;
use App\Services\ActivationService;
use App\Services\CommissionService;
use App\Models\Commission;
use App\Models\CommissionCalculation;
use App\Models\CommissionLedger;
use App\Models\CommissionMethod;
use App\Models\MlmTree;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AffiliateService
{
    /**
     * Assign random sponsor dari active affiliates
     * Gunakan saat visitor baru akses app
     */
    public function assignRandomSponsor(): ?Affiliate
    {
        return Affiliate::where('is_active', true)
            ->inRandomOrder()
            ->first();
    }

    /**
     * Get affiliate dari slug/username
     * Gunakan saat akses app.com/abdu
     */
    public function getAffiliateBySlug(string $slug): ?Affiliate
    {
        return Affiliate::where('slug', $slug)
            ->orWhere('username', $slug)
            ->where('is_active', true)
            ->first();
    }

    /**
     * Register new affiliate
     * Hanya bisa dilakukan oleh sponsor
     * 
     * @param User $newUser - Customer yang akan jadi affiliate
     * @param Affiliate $sponsor - Sponsor affiliate
     * @param string $position - 'left' atau 'right' dalam binary tree
     * @param ActivationCode $activationCode - Kode aktivasi
     */
    public function registerNewAffiliate(
        User $newUser,
        Affiliate $sponsor,
        string $position = 'left',
        ?ActivationCode $activationCode = null
    ): Affiliate {
        // Validate position
        if (!in_array($position, ['left', 'right'])) {
            throw new \InvalidArgumentException("Position harus 'left' atau 'right'");
        }

        // Validate user tidak sudah affiliate
        if ($newUser->affiliate()->exists()) {
            throw new \InvalidArgumentException("User sudah menjadi affiliate");
        }

        // Create activation code jika tidak provided
        if (!$activationCode) {
            $activationCode = $this->generateActivationCode($sponsor->user);
        }

        // Validate activation code
        if ($activationCode->status !== 'available') {
            throw new \InvalidArgumentException("Activation code tidak tersedia");
        }

        // Create username & slug dari user name
        $username = $this->generateUniqueUsername($newUser->name);
        $slug = Str::slug($username);

        // Create affiliate record
        $defaultPlanId = $this->resolveDefaultPlanId();
        $newAffiliate = Affiliate::create([
            'user_id' => $newUser->id,
            'sponsor_id' => $sponsor->user_id,
            'upline_id' => $sponsor->user_id,
            'activation_code_id' => $activationCode->id,
            'commission_method_id' => $defaultPlanId,
            'username' => $username,
            'slug' => $slug,
            'position' => $position,
            'level' => $sponsor->level + 1,
            'direct_downline' => 0,
            'total_downline' => 0,
            'left_count' => 0,
            'right_count' => 0,
            'pair_count' => 0,
            'left_volume' => 0,
            'right_volume' => 0,
            'total_personal_volume' => 0,
            'total_volume' => 0,
            'is_active' => true,
            'activated_at' => now(),
        ]);

        // Ensure sponsor has MLM tree root node.
        $parentTree = $sponsor->mlmTree;
        if (!$parentTree) {
            $parentTree = MlmTree::create([
                'affiliate_id' => $sponsor->id,
                'parent_id' => null,
                'position' => null,
                'depth' => 0,
                'left_position' => 1,
                'right_position' => 2,
                'path' => (string) $sponsor->id,
                'lineage' => (string) $sponsor->id,
            ]);
        }

        // Create MLM Tree node for new affiliate under sponsor tree.
        MlmTree::create([
            'affiliate_id' => $newAffiliate->id,
            'parent_id' => $parentTree->id,
            'position' => $position,
            'depth' => max(1, (int) $newAffiliate->level),
            'left_position' => 0,
            'right_position' => 0,
            'path' => trim(($parentTree->path ? $parentTree->path . '/' : '') . $newAffiliate->id, '/'),
            'lineage' => trim(($parentTree->lineage ? $parentTree->lineage . ' > ' : '') . $newAffiliate->id, ' >'),
        ]);

        $this->updateNestedSet($newAffiliate->id);

        // Consume one usage from activation code.
        $remainingUsage = (int) ($activationCode->remaining_usage ?? $activationCode->usage_count ?? 1);
        $remainingUsage = max(0, $remainingUsage - 1);

        $activationCode->update([
            'status' => $remainingUsage <= 0 ? 'used' : 'available',
            'remaining_usage' => $remainingUsage,
            'used_by' => $newUser->id,
            'used_at' => now(),
        ]);

        // Update sponsor downline count
        $sponsor->increment('direct_downline');
        if ($position === 'left') {
            $sponsor->increment('left_count');
        } else {
            $sponsor->increment('right_count');
        }

        return $newAffiliate;
    }

    /**
     * Generate activation codes dari package purchase
     * Codes diberikan ke SPONSOR (bukan buyer)
     * 
     * @param Order $order - Order yang just created
     * @param int $count - Jumlah codes yang generate
     */
    public function generateActivationCodesFromOrder(Order $order, int $count = 1): array
    {
        // Delegate to ActivationService to centralize creation
        $activationService = new ActivationService();
        return $activationService->generateFromOrder($order, $count);
    }

    /**
     * Generate single activation code (manual)
     */
    public function generateActivationCode(
        User $owner,
        ?int $usageCount = 1,
        ?string $productType = null
    ): ActivationCode {
        $activationService = new ActivationService();
        // Use package_id = null when not known
        return $activationService->generateCodeWithOwner($productType ? (int)$productType : 0, $owner->id, $usageCount ?? 1);
    }

    /**
     * Apply commission untuk order
     * Follow commission method & rules yang sudah di-setup di database
     * 
     * @param Order $order
     * @param CommissionMethod|null $method - Jika null, gunakan default
     */
    public function applyCommission(
        Order $order,
        ?CommissionMethod $method = null
    ): array {
        $commissions = [];

        // Get commission method (default: Direct Commission)
        if (!$method) {
            $method = CommissionMethod::where('name', 'Direct Commission - Percentage')
                ->where('is_active', true)
                ->first();
        }

        if (!$method || !$method->is_active) {
            return $commissions;
        }

        // Get rules ordered by priority
        $rules = $method->rules()
            ->where('is_active', true)
            ->orderBy('priority')
            ->get();

        // Get seller affiliate
        $currentAffiliate = $order->affiliate;
        if (!$currentAffiliate) {
            return $commissions;
        }

        // Loop through levels & apply commission
        $level = 1;
        $tempAffiliate = $currentAffiliate;

        while ($tempAffiliate && $level <= 5) {  // Max 5 levels deep
            // Find rule by priority matching level
            $rule = $rules->where('priority', $level)->first();
            if (!$rule) {
                break;
            }

            // Calculate commission
            $commissionAmount = $this->calculateCommissionAmount(
                $order->total_amount,
                $rule
            );

            if ($commissionAmount <= 0) {
                break;
            }

                // Delegate creation to CommissionService
                $commissionService = new CommissionService();
                $commission = $commissionService->distributeCommission(
                    $tempAffiliate->id,
                    $commissionAmount,
                    $method->id,
                    $rule->id,
                    'level',
                    $order->id,
                    $level
                );

                $commissions[] = $commission;

            // Move to next level (parent affiliate)
            $tempAffiliate = Affiliate::where('user_id', $tempAffiliate->upline_id)
                ->first();
            $level++;
        }

        return $commissions;
    }

    /**
     * Approve commission oleh admin
     */
    public function approveCommission(
        Commission $commission,
        User $approver
    ): void {
        $commission->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => $approver->id,
        ]);

        CommissionLedger::create([
            'affiliate_id' => $commission->affiliate_id,
            'commission_id' => $commission->id,
            'order_id' => $commission->order_id,
            'action' => 'approved',
            'description' => "Commission approved by {$approver->name}",
        ]);
    }

    /**
     * Get affiliate summary/statistics
     */
    public function getAffiliateSummary(Affiliate $affiliate): array
    {
        $totalSales = Order::where('affiliate_id', $affiliate->id)
            ->where('status', 'completed')
            ->sum('total_amount');

        $totalCommission = Commission::where('affiliate_id', $affiliate->id)
            ->where('status', '!=', 'rejected')
            ->sum('amount_net');

        $directDownline = Affiliate::where('upline_id', $affiliate->user_id)->count();

        $totalDownline = Affiliate::where('upline_id', $affiliate->user_id)
            ->orWhere('sponsor_id', $affiliate->user_id)
            ->count();

        return [
            'affiliate_id' => $affiliate->id,
            'name' => $affiliate->user->name,
            'username' => $affiliate->username,
            'slug' => $affiliate->slug,
            'level' => $affiliate->level,
            'generation' => $affiliate->total_downline,
            'direct_downline' => $directDownline,
            'total_downline' => $totalDownline,
            'total_sales' => $totalSales,
            'total_commission' => $totalCommission,
            'left_volume' => $affiliate->left_volume,
            'right_volume' => $affiliate->right_volume,
            'pair_volume' => min($affiliate->left_volume, $affiliate->right_volume),
            'status' => $affiliate->is_active ? 'Active' : 'Inactive',
        ];
    }

    /**
     * Private helper: Generate unique code
     */
    private function generateUniqueCode(int $length = 12): string
    {
        do {
            $code = strtoupper(Str::random($length));
        } while (ActivationCode::where('code', $code)->exists());

        return $code;
    }

    /**
     * Private helper: Generate unique username
     */
    private function generateUniqueUsername(string $baseName): string
    {
        $username = Str::slug($baseName, '');
        $original = $username;
        $counter = 1;

        while (Affiliate::where('username', $username)->exists()) {
            $username = $original . $counter;
            $counter++;
        }

        return $username;
    }

    /**
     * Private helper: Calculate commission amount
     */
    private function calculateCommissionAmount(float $orderAmount, $rule): float
    {
        // Check minimum sales requirement
        if ($rule->min_sales && $orderAmount < $rule->min_sales) {
            return 0;
        }

        // Check maximum sales limit
        if ($rule->max_sales && $orderAmount > $rule->max_sales) {
            return 0;
        }

        if ($rule->percentage) {
            return ($orderAmount * $rule->percentage) / 100;
        } elseif ($rule->fixed_amount) {
            return $rule->fixed_amount;
        }

        return 0;
    }

    /**
     * Create a downline affiliate under a sponsor.
     * Returns the created Affiliate model.
     */
    public function createDownline(int $sponsorId, int $packageId, string $position = 'left') : Affiliate
    {
        $sponsor = Affiliate::findOrFail($sponsorId);

        // Create a user placeholder for the downline (email generated)
        $user = User::create([
            'name' => 'affiliate_' . uniqid(),
            'email' => 'aff_' . uniqid() . '@example.local',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        // Create affiliate using existing logic
        return $this->registerNewAffiliate($user, $sponsor, $position, null);
    }

    /**
     * Place affiliate position (left/right) under its sponsor/upline.
     */
    public function placePosition(int $affiliateId, string $side): Affiliate
    {
        $affiliate = Affiliate::findOrFail($affiliateId);
        if (!in_array($side, ['left', 'right'])) {
            throw new \InvalidArgumentException('Side must be left or right');
        }

        $affiliate->update(['position' => $side]);
        return $affiliate;
    }

    /**
     * Calculate depth (level) of an affiliate in the tree.
     */
    public function calculateDepth(int $affiliateId): int
    {
        $affiliate = Affiliate::findOrFail($affiliateId);
        $depth = 0;
        $current = $affiliate;
        while ($current && $current->upline_id) {
            $depth++;
            $current = Affiliate::where('user_id', $current->upline_id)->first();
        }

        return $depth;
    }

    /**
     * Get tree structure (downlines) for visualization.
     */
    public function getTree(int $affiliateId): array
    {
        $root = Affiliate::with('user')->findOrFail($affiliateId);

        $build = function (Affiliate $node) use (&$build) {
            $children = Affiliate::where('upline_id', $node->user_id)->get();
            return [
                'id' => $node->id,
                'username' => $node->username,
                'user' => $node->user->name ?? null,
                'position' => $node->position,
                'children' => $children->map(fn($c) => $build($c))->toArray(),
            ];
        };

        return $build($root);
    }

    /**
     * Create a pending affiliate record (awaiting user confirmation).
     */
    public function registerPendingAffiliate(
        User $user,
        Affiliate $sponsor,
        ?ActivationCode $activationCode = null,
        string $requestedPosition = 'left'
    ): Affiliate
    {
        $requestedPosition = in_array($requestedPosition, ['left', 'right'], true)
            ? $requestedPosition
            : 'left';

        // don't create mlm tree node yet; wait for confirmation
        $affiliate = Affiliate::create([
            'user_id' => $user->id,
            'sponsor_id' => $sponsor->user_id,
            'upline_id' => $sponsor->user_id,
            'activation_code_id' => $activationCode?->id,
            'commission_method_id' => $this->resolveDefaultPlanId(),
            'username' => $this->generateUniqueUsername($user->name),
            'slug' => Str::slug($user->name) . '-' . uniqid(),
            'position' => $requestedPosition,
            'level' => $sponsor->level + 1,
            'is_active' => false,
        ]);

        return $affiliate;
    }

    /**
     * Confirm a pending affiliate and place them into the tree.
     */
    public function confirmAffiliate(int $affiliateId, string $position = 'left'): Affiliate
    {
        $affiliate = Affiliate::findOrFail($affiliateId);
        if ($affiliate->is_active) {
            return $affiliate; // already active
        }

        // set position and active
        $defaultPlanId = $this->resolveDefaultPlanId();
        $affiliate->update([
            'position' => in_array($position, ['left','right']) ? $position : 'none',
            'is_active' => true,
            'activated_at' => now(),
            'commission_method_id' => $affiliate->commission_method_id ?: $defaultPlanId,
        ]);

        // Promote user role to affiliate only after approval.
        $affiliate->user?->syncRoles(['affiliate']);

        // create mlm tree node under sponsor's tree
        $sponsor = Affiliate::where('user_id', $affiliate->sponsor_id)->first();
        $parentTree = $sponsor->mlmTree ?? null;
        $parentId = $parentTree?->id ?? null;

        $node = MlmTree::create([
            'affiliate_id' => $affiliate->id,
            'parent_id' => $parentId,
            'position' => $affiliate->position,
            'depth' => $sponsor->level ?? 1,
            'path' => null,
        ]);

        // recalc nested set
        $this->updateNestedSet($affiliate->id);

        return $affiliate;
    }

    /**
     * Recalculate nested set positions for MLM tree.
     * This is a recursive DFS assigner starting from root nodes.
     */
    public function updateNestedSet(?int $changedAffiliateId = null): void
    {
        // start from all root nodes (parent_id is null)
        $counter = 1;

        $roots = MlmTree::whereNull('parent_id')->orderBy('id')->get();

        $recurse = function ($node) use (&$recurse, &$counter) {
            $left = $counter++;
            $children = MlmTree::where('parent_id', $node->id)->orderBy('id')->get();
            foreach ($children as $child) {
                $recurse($child);
            }
            $right = $counter++;

            $node->update(['left_position' => $left, 'right_position' => $right]);
        };

        foreach ($roots as $root) {
            $recurse($root);
        }
    }

    private function resolveDefaultPlanId(): ?int
    {
        $defaultMethod = CommissionMethod::query()
            ->where('is_default', true)
            ->where('is_active', true)
            ->first();

        return $defaultMethod?->id;
    }
}
