<?php

namespace App\Services;

use App\Models\Affiliate;
use App\Models\ActivationCode;
use App\Models\Commission;
use App\Models\CommissionCalculation;
use App\Models\CommissionLedger;
use App\Models\CommissionMethod;
use App\Models\MlmTree;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Str;

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
        $newAffiliate = Affiliate::create([
            'user_id' => $newUser->id,
            'sponsor_id' => $sponsor->user_id,
            'upline_id' => $sponsor->user_id,
            'activation_code_id' => $activationCode->id,
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

        // Create MLM Tree node
        $parentTree = $sponsor->mlmTree;
        MlmTree::create([
            'affiliate_id' => $newAffiliate->id,
            'parent_id' => $parentTree->id,
            'position' => $position,
        ]);

        // Mark activation code as used
        $activationCode->update([
            'status' => 'used',
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
        $codes = [];

        // Code diberikan ke sponsor affiliate (bukan customer/buyer)
        $sponsorUser = $order->affiliate?->user;
        if (!$sponsorUser) {
            return $codes;
        }

        // Ambil products/packages dari order
        $orderItems = $order->items()->first();

        for ($i = 0; $i < $count; $i++) {
            $code = ActivationCode::create([
                'code' => $this->generateUniqueCode(),
                'owner_id' => $sponsorUser->id,  // ← Sponsor dapat codes
                'generated_by' => $order->affiliate->user_id,
                'generated_from' => 'order',
                'product_id' => $orderItems?->product_id,
                'package_id' => $orderItems?->package_id,
                'price' => $order->total_amount,
                'value' => $order->total_amount,
                'gives_commission' => true,
                'commission_value' => ($order->total_amount * 10) / 100,  // 10% default
                'usage_count' => 1,
                'remaining_usage' => 1,
                'status' => 'available',
                'valid_from' => now(),
                'valid_until' => now()->addMonths(1),
                'notes' => "Generated dari order {$order->order_number}",
            ]);

            $codes[] = $code;
        }

        return $codes;
    }

    /**
     * Generate single activation code (manual)
     */
    public function generateActivationCode(
        User $owner,
        ?int $usageCount = 1,
        ?string $productType = null
    ): ActivationCode {
        return ActivationCode::create([
            'code' => $this->generateUniqueCode(),
            'owner_id' => $owner->id,
            'generated_by' => auth()?->user()?->id,
            'generated_from' => 'manual',
            'status' => 'available',
            'usage_count' => $usageCount ?? 1,
            'remaining_usage' => $usageCount ?? 1,
            'valid_from' => now(),
            'valid_until' => now()->addMonths(1),
            'gives_commission' => true,
        ]);
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

            // Create commission record
            $commission = Commission::create([
                'affiliate_id' => $tempAffiliate->id,
                'order_id' => $order->id,
                'method_id' => $method->id,
                'rule_id' => $rule->id,
                'amount' => $commissionAmount,
                'commission_type' => 'level',
                'depth_level' => $level,
                'calculation_detail' => [
                    'level' => $level,
                    'rule_name' => $rule->rule_name,
                    'order_amount' => $order->total_amount,
                    'calculated_amount' => $commissionAmount,
                ],
                'status' => 'pending',
            ]);

            // Create ledger entry
            CommissionLedger::create([
                'affiliate_id' => $tempAffiliate->id,
                'commission_id' => $commission->id,
                'order_id' => $order->id,
                'type' => 'credit',
                'amount' => $commissionAmount,
                'description' => "Commission Level {$level} dari order {$order->order_number}",
                'balance_before' => 0,
                'balance_after' => $commissionAmount,
                'reference' => $order->order_number,
                'reference_type' => 'order',
                'status' => 'posted',
            ]);

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
}
