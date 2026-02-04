<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\Affiliate;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CommissionMethod;
use App\Models\Commission;
use App\Models\MlmTree;
use App\Services\AffiliateService;
use Illuminate\Console\Command;

class TestMlmWorkflow extends Command
{
    protected $signature = 'test:mlm-workflow';
    protected $description = 'Complete E2E MLM workflow testing';

    public function handle()
    {
        $this->info('🚀 Starting MLM Workflow Test...\n');

        // Get existing data
        $sponsor = User::find(2);
        $sponsorAffiliate = Affiliate::where('user_id', 2)->first();
        $admin = User::find(1);

        if (!$sponsor || !$sponsorAffiliate) {
            $this->error('❌ Sponsor or Admin not found. Please run Tinker setup first.');
            return;
        }

        $affiliateService = new AffiliateService();

        // Create Upline User
        $this->info('📝 Creating Upline User...');
        $upline = User::where('email', 'ahmad.wijaya@test.com')->first();
        
        if (!$upline) {
            $upline = User::create([
                'name' => 'Ahmad Wijaya',
                'email' => 'ahmad.wijaya@test.com',
                'password' => bcrypt('password123'),
                'email_verified_at' => now(),
                'is_active' => true
            ]);

            UserProfile::create([
                'user_id' => $upline->id,
                'phone' => '0821-2222-2222',
                'address' => 'Jakarta Utara',
                'city' => 'Jakarta',
                'verified' => true
            ]);
        }

        $uplineAffiliate = Affiliate::where('user_id', $upline->id)->first();
        
        if (!$uplineAffiliate) {
            $uplineAffiliate = $affiliateService->registerNewAffiliate(
                newUser: $upline,
                sponsor: $sponsorAffiliate,
                position: 'left'
            );
        }

        $this->info("✅ Upline registered: {$upline->name} (@{$uplineAffiliate->slug})\n");

        // Create Customer
        $this->info('📝 Creating Customer User...');
        $customer = User::where('email', 'siti.nurhaliza@test.com')->first();
        
        if (!$customer) {
            $customer = User::create([
                'name' => 'Siti Nurhaliza',
                'email' => 'siti.nurhaliza@test.com',
                'password' => bcrypt('password123'),
                'email_verified_at' => now(),
                'is_active' => true
            ]);

            UserProfile::create([
                'user_id' => $customer->id,
                'phone' => '0821-3333-3333',
                'address' => 'Bandung',
                'city' => 'Bandung',
                'verified' => true
            ]);
        }

        $this->info("✅ Customer created: {$customer->email}\n");

        // Create Order
        $this->info('📝 Creating Order...');
        $product1 = Product::find(1);
        $product2 = Product::find(2);

        $order = Order::create([
            'order_number' => 'ORD-' . date('YmdHis') . '-001',
            'user_id' => $customer->id,
            'affiliate_id' => $uplineAffiliate->id,
            'payment_method' => 'transfer',
            'midtrans_order_id' => 'ORD-' . date('YmdHis') . '-001-MID',
            'product_type' => 'single',
            'product_name' => 'Starter Package Bundle',
            'quantity' => 1,
            'price' => 3500000,
            'total_amount' => 3500000,
            'grand_total' => 3500000,
            'payment_status' => 'paid',
            'paid_at' => now(),
            'status' => 'completed',
            'notes' => 'Initial purchase'
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product1->id,
            'package_id' => null,
            'quantity' => 1,
            'harga_awal' => 500000,
            'diskon' => 0,
            'harga_akhir' => 500000
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product2->id,
            'package_id' => null,
            'quantity' => 2,
            'harga_awal' => 1500000,
            'diskon' => 0,
            'harga_akhir' => 3000000
        ]);

        $this->info("✅ Order created: {$order->order_number}");
        $this->info("   Total: Rp " . number_format($order->total_amount, 0, ',', '.') . "\n");

        // Generate Activation Codes
        $this->info('📝 Generating Activation Codes...');
        $codes = $affiliateService->generateActivationCodesFromOrder($order, 2);
        $this->info("✅ Generated " . count($codes) . " activation codes\n");
        foreach ($codes as $code) {
            $this->info("   └─ {$code->code}");
        }
        $this->info('');

        // Register New Affiliate
        $this->info('📝 Registering New Affiliate...');
        $codeToUse = $codes[0];

        $newAffiliate = Affiliate::where('user_id', $customer->id)->first();
        
        if (!$newAffiliate) {
            $newAffiliate = $affiliateService->registerNewAffiliate(
                newUser: $customer,
                sponsor: $uplineAffiliate,
                position: 'right',
                activationCode: $codeToUse
            );
        }

        $this->info("✅ New affiliate registered!");
        $this->info("   Name: {$customer->name}");
        $this->info("   Link: app.com/{$newAffiliate->slug}");
        $this->info("   Position: RIGHT (under Ahmad)\n");

        // Apply Commission
        $this->info('💰 Calculating Commissions...');
        $method = CommissionMethod::where('calculation_type', 'percentage')->first();

        if (!$method) {
            $this->warn('⚠️ No commission method found');
            return;
        }

        $commissions = $affiliateService->applyCommission($order, $method);
        $commissionsCollection = collect($commissions);

        $this->info("✅ Commissions generated: " . $commissionsCollection->count() . "\n");

        foreach ($commissionsCollection as $comm) {
            $aff = $comm->affiliate->user;
            $rule = $comm->commissionRule;
            $this->info("Level - {$aff->name}");
            $this->info("├─ Amount: Rp " . number_format($comm->amount, 0, ',', '.'));
            $this->info("├─ Type: {$comm->commission_type}");
            $this->info("├─ Status: {$comm->status}");
            $this->info("└─ Rule: {$rule->rule_name}\n");
        }

        $totalCommission = $commissionsCollection->sum('amount');
        $this->info("Total Commission: Rp " . number_format($totalCommission, 0, ',', '.') . "\n");

        // Approve Commissions
        $this->info('✅ Approving Commissions...');
        Commission::where('status', 'pending')->each(function($comm) use ($admin, $affiliateService) {
            $affiliateService->approveCommission($comm, $admin);
        });
        $this->info("✅ All commissions approved\n");

        // Summary
        $this->info("\n╔════════════════════════════════════════╗");
        $this->info("║    TESTING SUMMARY                     ║");
        $this->info("╚════════════════════════════════════════╝\n");

        $this->info("Users: " . User::count());
        $this->info("Affiliates: " . Affiliate::count());
        $this->info("Orders: " . Order::count());
        $this->info("Commissions: " . Commission::count());
        $this->info("Total Commission: Rp " . number_format(Commission::sum('amount'), 0, ',', '.'));
        $this->info("Total Sales: Rp " . number_format(Order::sum('total_amount'), 0, ',', '.') . "\n");

        // MLM Tree
        $this->info("🌳 MLM STRUCTURE\n");
        $root = MlmTree::where('parent_id', null)->with('affiliate.user', 'children.affiliate.user')->first();
        if ($root) {
            $this->displayTree($root);
        }

        $this->info("\n✅ TESTING COMPLETE!\n");
    }

    private function displayTree($node, $prefix = '')
    {
        $aff = $node->affiliate->user;
        $this->info("{$prefix}└─ {$aff->name}");
        foreach ($node->children as $child) {
            $this->displayTree($child, $prefix . "   ");
        }
    }
}
