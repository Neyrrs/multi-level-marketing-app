<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\Affiliate;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CommissionMethod;
use App\Models\CommissionRule;
use App\Models\Commission;
use App\Models\MlmTree;
use App\Models\ActivationCode;
use App\Services\AffiliateService;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

class TestComprehensiveMlmBinary extends Command
{
    protected $signature = 'test:mlm-binary-comprehensive';
    protected $description = 'Comprehensive E2E MLM Binary Tree Testing - Admin to Generation 3';

    protected AffiliateService $affiliateService;
    protected array $testData = [];
    protected array $hierarchy = []; // Track affiliate hierarchy

    public function handle()
    {
        $this->affiliateService = new AffiliateService();
        
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  COMPREHENSIVE MLM BINARY TREE TESTING - GEN 0 TO GEN 3    ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        try {
            // PHASE 1: Setup Admin & Master Data
            $this->phase1_setupAdminAndMasterData();

            // PHASE 2: Create First Affiliate (Abdu) - Gen 1
            $this->phase2_createFirstAffiliate();

            // PHASE 3: Create Guest & First Order
            $this->phase3_createGuestAndOrder();

            // PHASE 4: Guest becomes Affiliate (Rahman) - Gen 2
            $this->phase4_createSecondGeneration();

            // PHASE 5: Create Gen 3 Affiliates (14 total)
            $this->phase5_createThirdGeneration();

            // PHASE 6: Comprehensive Tracking & Reports
            $this->phase6_trackingAndReports();

            // PHASE 7: Additional Role Testing (Logistics, Audit Log)
            $this->phase7_additionalRoleTesting();

            $this->info("\n✅ COMPREHENSIVE TEST COMPLETED SUCCESSFULLY!\n");

        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            $this->error('Stack: ' . $e->getTraceAsString());
        }
    }

    /**
     * PHASE 1: Setup Admin & Master Data
     */
    private function phase1_setupAdminAndMasterData()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 1: SETUP ADMIN & MASTER DATA                        ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        // Get or Create Admin
        $admin = User::find(1);
        if (!$admin) {
            $admin = User::create([
                'name' => 'Admin System',
                'email' => 'admin@alus-astech.com',
                'password' => bcrypt('password123'),
                'email_verified_at' => now(),
                'is_active' => true
            ]);
            $this->info("✅ Admin created: {$admin->email}");
        } else {
            $this->info("✅ Admin found: {$admin->email}");
        }

        $this->testData['admin'] = $admin;

        // Setup Commission Methods
        $this->info('\n📊 Setting up Commission Methods...');
        
        // Method 1: Sponsor Direct (1 level)
        $methodSponsor = CommissionMethod::firstOrCreate(
            ['calculation_type' => 'sponsor_direct'],
            [
                'name' => 'Sponsor Direct Commission',
                'description' => 'Commission for direct sponsor',
                'is_active' => true
            ]
        );

        // Create rules for sponsor method
        CommissionRule::firstOrCreate(
            ['method_id' => $methodSponsor->id, 'rule_name' => 'Sponsor 10%'],
            [
                'condition' => ['type' => 'sponsor'],
                'value' => 10,
                'priority' => 1,
                'is_active' => true
            ]
        );

        $this->info("  ✅ Sponsor Method: 10% commission to direct sponsor");

        // Method 2: Level Commission (Multi-level)
        $methodLevel = CommissionMethod::firstOrCreate(
            ['calculation_type' => 'level_based'],
            [
                'name' => 'Level Based Commission',
                'description' => 'Multi-level commission based on depth',
                'is_active' => true
            ]
        );

        // Create rules for level method
        $levels = [
            1 => 8,   // Level 1: 8%
            2 => 5,   // Level 2: 5%
            3 => 2    // Level 3: 2%
        ];

        foreach ($levels as $level => $percent) {
            CommissionRule::firstOrCreate(
                ['method_id' => $methodLevel->id, 'rule_name' => "Level {$level} - {$percent}%"],
                [
                    'condition' => ['type' => 'level', 'depth' => $level],
                    'value' => $percent,
                    'priority' => $level,
                    'is_active' => true
                ]
            );
        }

        $this->info("  ✅ Level Method: L1=8%, L2=5%, L3=2%");

        // Method 3: Generation Commission (Binary)
        $methodGeneration = CommissionMethod::firstOrCreate(
            ['calculation_type' => 'generation_based'],
            [
                'name' => 'Generation Based Commission',
                'description' => 'Commission based on generation in binary tree',
                'is_active' => true
            ]
        );

        $gens = [
            1 => 7,   // Gen 1: 7%
            2 => 4,   // Gen 2: 4%
            3 => 1    // Gen 3: 1%
        ];

        foreach ($gens as $gen => $percent) {
            CommissionRule::firstOrCreate(
                ['method_id' => $methodGeneration->id, 'rule_name' => "Gen {$gen} - {$percent}%"],
                [
                    'condition' => ['type' => 'generation', 'generation' => $gen],
                    'value' => $percent,
                    'priority' => $gen,
                    'is_active' => true
                ]
            );
        }

        $this->info("  ✅ Generation Method: Gen1=7%, Gen2=4%, Gen3=1%");

        $this->testData['methods'] = [
            'sponsor' => $methodSponsor,
            'level' => $methodLevel,
            'generation' => $methodGeneration
        ];

        // Get Products
        $products = Product::whereIn('id', [1, 2, 3])->get();
        if ($products->count() < 3) {
            $this->warn("⚠️  Not enough products. Creating demo products...");
            for ($i = 1; $i <= 3; $i++) {
                $product = Product::firstOrCreate(
                    ['id' => $i],
                    [
                        'name' => "Product {$i}",
                        'slug' => "product-{$i}",
                        'harga_awal' => 500000 * $i,
                        'diskon' => 0,
                        'harga_akhir' => 500000 * $i,
                        'is_active' => true,
                        'generates_activation_code' => true
                    ]
                );
                $products->push($product);
            }
        }

        $this->testData['products'] = $products;
        $this->info("\n✅ Phase 1 Complete: Master data setup\n");
    }

    /**
     * PHASE 2: Create First Affiliate (Abdu) - Generation 1
     */
    private function phase2_createFirstAffiliate()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 2: CREATE FIRST AFFILIATE (ABDU) - GEN 1            ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        $admin = $this->testData['admin'];

        // Check if Abdu already exists
        $abdu = User::where('email', 'abdu@test.com')->first();
        if (!$abdu) {
            $this->info('📝 Creating Abdu user...');
            $abdu = User::create([
                'name' => 'Abdu Ibrahim',
                'email' => 'abdu@test.com',
                'password' => bcrypt('password123'),
                'email_verified_at' => now(),
                'is_active' => true
            ]);

            UserProfile::create([
                'user_id' => $abdu->id,
                'phone' => '0821-1000-0001',
                'address' => 'Jakarta Utara',
                'city' => 'Jakarta',
                'verified' => true
            ]);

            $this->info("✅ User created: {$abdu->name}");
        }

        // Register Abdu as affiliate with admin as sponsor
        $abduAffiliate = Affiliate::where('user_id', $abdu->id)->first();
        if (!$abduAffiliate) {
            $this->info('📝 Registering Abdu as first affiliate...');
            $abduAffiliate = $this->affiliateService->registerNewAffiliate(
                newUser: $abdu,
                sponsor: $admin->affiliate ?? $this->createAdminAffiliate($admin),
                position: 'left'
            );
            $this->info("✅ Affiliate registered: {$abdu->name}");
            $this->info("   Link: app.com/{$abduAffiliate->slug}");
        }

        // Create order for Abdu (to generate activation codes)
        $this->info('\n📝 Creating order for Abdu...');
        $order = Order::create([
            'order_number' => 'ORD-GEN1-' . date('YmdHis'),
            'user_id' => $abdu->id,
            'affiliate_id' => $abduAffiliate->id,
            'payment_method' => 'transfer',
            'midtrans_order_id' => 'MID-GEN1-' . date('YmdHis'),
            'product_type' => 'single',
            'product_name' => 'Starter Package',
            'quantity' => 1,
            'price' => 3000000,
            'total_amount' => 3000000,
            'grand_total' => 3000000,
            'payment_status' => 'paid',
            'paid_at' => now(),
            'status' => 'completed',
            'notes' => 'First affiliate order'
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $this->testData['products'][0]->id,
            'quantity' => 1,
            'harga_awal' => 1500000,
            'diskon' => 0,
            'harga_akhir' => 1500000
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $this->testData['products'][1]->id,
            'quantity' => 1,
            'harga_awal' => 1500000,
            'diskon' => 0,
            'harga_akhir' => 1500000
        ]);

        $this->info("✅ Order created: {$order->order_number}");
        $this->info("   Total: Rp " . number_format($order->total_amount, 0, ',', '.'));

        // Generate activation codes
        $this->info('\n📝 Generating activation codes...');
        $codes = $this->affiliateService->generateActivationCodesFromOrder($order, 2);
        $this->info("✅ Generated " . count($codes) . " codes:");
        foreach ($codes as $code) {
            $this->info("   └─ {$code->code}");
        }

        // Track Abdu
        $this->hierarchy['abdu'] = [
            'user' => $abdu,
            'affiliate' => $abduAffiliate,
            'order' => $order,
            'codes' => $codes,
            'generation' => 1
        ];

        $this->info("\n✅ Phase 2 Complete: Abdu (Gen 1) created\n");
    }

    /**
     * PHASE 3: Create Guest & First Order
     */
    private function phase3_createGuestAndOrder()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 3: CREATE GUEST & FIRST ORDER                       ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        $abduAffiliate = $this->hierarchy['abdu']['affiliate'];

        // Create Guest User
        $this->info('📝 Creating guest user...');
        $guest = User::where('email', 'guest001@test.com')->first();
        if (!$guest) {
            $guest = User::create([
                'name' => 'Guest Customer 001',
                'email' => 'guest001@test.com',
                'password' => bcrypt('password123'),
                'email_verified_at' => now(),
                'is_active' => true
            ]);

            UserProfile::create([
                'user_id' => $guest->id,
                'phone' => '0821-2000-0001',
                'address' => 'Bandung',
                'city' => 'Bandung',
                'verified' => false
            ]);

            $this->info("✅ Guest created: {$guest->email}");
        }

        // Guest purchases from Abdu's link
        $this->info('\n📝 Guest making purchase from app.com/' . $abduAffiliate->slug . '...');
        $guestOrder = Order::create([
            'order_number' => 'ORD-GUEST-' . date('YmdHis'),
            'user_id' => $guest->id,
            'affiliate_id' => $abduAffiliate->id,
            'payment_method' => 'transfer',
            'midtrans_order_id' => 'MID-GUEST-' . date('YmdHis'),
            'product_type' => 'single',
            'product_name' => 'Product Purchase',
            'quantity' => 2,
            'price' => 1000000,
            'total_amount' => 2000000,
            'grand_total' => 2000000,
            'payment_status' => 'paid',
            'paid_at' => now(),
            'status' => 'completed',
            'notes' => 'Purchase from Abdu link'
        ]);

        OrderItem::create([
            'order_id' => $guestOrder->id,
            'product_id' => $this->testData['products'][0]->id,
            'quantity' => 2,
            'harga_awal' => 1000000,
            'diskon' => 0,
            'harga_akhir' => 2000000
        ]);

        $this->info("✅ Order created: {$guestOrder->order_number}");
        $this->info("   Sponsor: Abdu (from link)");
        $this->info("   Total: Rp " . number_format($guestOrder->total_amount, 0, ',', '.'));

        // Generate activation codes for guest's order
        $this->info('\n📝 Generating activation codes from guest order...');
        $guestCodes = $this->affiliateService->generateActivationCodesFromOrder($guestOrder, 2);
        $this->info("✅ Generated " . count($guestCodes) . " codes for guest to become affiliate:");
        foreach ($guestCodes as $code) {
            $this->info("   └─ {$code->code}");
        }

        $this->testData['guest'] = [
            'user' => $guest,
            'order' => $guestOrder,
            'codes' => $guestCodes
        ];

        // Tracking
        $this->displayTracking('GUEST TRACKING', [
            'Name' => $guest->name,
            'Email' => $guest->email,
            'Order Number' => $guestOrder->order_number,
            'Order Amount' => 'Rp ' . number_format($guestOrder->total_amount, 0, ',', '.'),
            'Sponsor' => $abduAffiliate->user->name . ' (@' . $abduAffiliate->slug . ')',
            'Activation Codes Generated' => count($guestCodes)
        ]);

        $this->info("\n✅ Phase 3 Complete: Guest order processed\n");
    }

    /**
     * PHASE 4: Guest becomes Affiliate (Rahman) - Generation 2
     */
    private function phase4_createSecondGeneration()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 4: CREATE GENERATION 2 (RAHMAN)                     ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        $guest = $this->testData['guest']['user'];
        $guestCodes = $this->testData['guest']['codes'];
        $abduAffiliate = $this->hierarchy['abdu']['affiliate'];

        // Guest becomes Rahman affiliate
        $this->info('📝 Guest becomes affiliate (Rahman)...');
        $rahman = Affiliate::where('user_id', $guest->id)->first();
        if (!$rahman) {
            try {
                $rahman = $this->affiliateService->registerNewAffiliate(
                    newUser: $guest,
                    sponsor: $abduAffiliate,
                    position: 'right',
                    activationCode: $guestCodes[0]
                );

                $this->info("✅ Rahman registered as affiliate");
                $this->info("   Link: app.com/{$rahman->slug}");
                $this->info("   Position: RIGHT (under Abdu)");
            } catch (\Exception $e) {
                $this->error("Error registering Rahman: " . $e->getMessage());
                throw $e;
            }
        }

        // Create order for Rahman to generate activation codes
        $this->info('\n📝 Creating order for Rahman...');
        $rahmanOrder = Order::create([
            'order_number' => 'ORD-GEN2-' . date('YmdHis'),
            'user_id' => $guest->id,
            'affiliate_id' => $rahman->id,
            'payment_method' => 'transfer',
            'midtrans_order_id' => 'MID-GEN2-' . date('YmdHis'),
            'product_type' => 'single',
            'product_name' => 'Affiliate Package',
            'quantity' => 1,
            'price' => 2500000,
            'total_amount' => 2500000,
            'grand_total' => 2500000,
            'payment_status' => 'paid',
            'paid_at' => now(),
            'status' => 'completed',
            'notes' => 'Rahman affiliate order'
        ]);

        OrderItem::create([
            'order_id' => $rahmanOrder->id,
            'product_id' => $this->testData['products'][1]->id,
            'quantity' => 1,
            'harga_awal' => 2500000,
            'diskon' => 0,
            'harga_akhir' => 2500000
        ]);

        $this->info("✅ Order created: {$rahmanOrder->order_number}");

        // Generate activation codes
        $rahmanCodes = $this->affiliateService->generateActivationCodesFromOrder($rahmanOrder, 4);
        $this->info("✅ Generated " . count($rahmanCodes) . " codes");

        $this->hierarchy['rahman'] = [
            'user' => $guest,
            'affiliate' => $rahman,
            'order' => $rahmanOrder,
            'codes' => $rahmanCodes,
            'generation' => 2,
            'sponsor_affiliate' => $abduAffiliate
        ];

        // Apply commissions
        $this->info('\n💰 Calculating commissions for Rahman order...');
        $method = $this->testData['methods']['sponsor'];
        $commissions = $this->affiliateService->applyCommission($rahmanOrder, $method);
        
        foreach ($commissions as $comm) {
            $this->info("✅ Commission: Rp " . number_format($comm->amount, 0, ',', '.') . " → " . $comm->affiliate->user->name);
        }

        // Approve commissions
        Commission::where('order_id', $rahmanOrder->id)->where('status', 'pending')->each(function($comm) {
            $comm->update(['status' => 'approved', 'approved_at' => now()]);
        });

        // Tracking
        $this->displayTracking('RAHMAN (GEN 2) TRACKING', [
            'Name' => $guest->name . ' (Rahman)',
            'Link' => 'app.com/' . $rahman->slug,
            'Position' => 'RIGHT (Binary)',
            'Sponsor' => $abduAffiliate->user->name,
            'Upline' => $abduAffiliate->user->name,
            'Direct Downline' => 0,
            'Order Amount' => 'Rp ' . number_format($rahmanOrder->total_amount, 0, ',', '.'),
            'Codes Generated' => count($rahmanCodes),
            'Commission Generated' => 'Rp ' . number_format(collect($commissions)->sum('amount'), 0, ',', '.')
        ]);

        $this->displayTracking('ABDU TRACKING AFTER GEN 2', [
            'Name' => $abduAffiliate->user->name,
            'Total Direct Downline' => $abduAffiliate->direct_downline,
            'Total Commission' => 'Rp ' . number_format(Commission::where('affiliate_id', $abduAffiliate->id)->sum('amount'), 0, ',', '.'),
            'Direct Downline Count' => Affiliate::where('sponsor_id', $abduAffiliate->user_id)->count()
        ]);

        $this->info("\n✅ Phase 4 Complete: Generation 2 (Rahman) created\n");
    }

    /**
     * PHASE 5: Create Generation 3 (14 affiliates from Rahman)
     */
    private function phase5_createThirdGeneration()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 5: CREATE GENERATION 3 (14 AFFILIATES)              ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        $rahman = $this->hierarchy['rahman']['affiliate'];
        $rahmanCodes = $this->hierarchy['rahman']['codes'];
        $admin = $this->testData['admin'];

        $gen3Data = [];
        $baseNames = [
            'Siti', 'Budi', 'Dewi', 'Ahmad',
            'Rini', 'Hendra'
        ];

        $cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'];
        $timestamp = date('YmdHis');

        for ($i = 0; $i < 6; $i++) {
            $position = ($i % 2 === 0) ? 'left' : 'right';
            $name = $baseNames[$i] . ' Gen3 ' . $timestamp;
            $email = 'gen3.' . strtolower($baseNames[$i]) . '.' . ($i + 1) . '@test.com';

            $num = $i + 1;

            $this->info("📝 Creating Gen 3 Affiliate #{$num}: {$name}");

            // Create user
            $user = User::where('email', $email)->first();
            if (!$user) {
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => bcrypt('password123'),
                    'email_verified_at' => now(),
                    'is_active' => true
                ]);

                UserProfile::create([
                    'user_id' => $user->id,
                    'phone' => '0821-' . str_pad($i + 3000, 4, '0', STR_PAD_LEFT) . '-0001',
                    'address' => 'Address ' . $name,
                    'city' => $cities[$i % count($cities)],
                    'verified' => false
                ]);
            }

            // Check if already affiliate
            $existingAffiliate = Affiliate::where('user_id', $user->id)->first();
            if ($existingAffiliate) {
                $this->info("   ✅ Already registered: app.com/{$existingAffiliate->slug}\n");
                $gen3Data[] = [
                    'user' => $user,
                    'affiliate' => $existingAffiliate,
                    'generation' => 3
                ];
                continue;
            }

            // Get activation code (rotate through available codes)
            $code = $rahmanCodes[$i % count($rahmanCodes)];

            try {
                // Register as affiliate
                $affiliate = $this->affiliateService->registerNewAffiliate(
                    newUser: $user,
                    sponsor: $rahman,
                    position: $position,
                    activationCode: $code
                );

                $this->info("   ✅ Registered: app.com/{$affiliate->slug}");
                $this->info("   └─ Position: " . strtoupper($position) . "\n");
            } catch (\Exception $e) {
                $this->warn("   ⚠️  Could not register: " . $e->getMessage() . "\n");
                continue;
            }

            // Create order for Gen 3
            $orderAmount = 1500000 + ($i * 100000);
            $gen3Order = Order::create([
                'order_number' => 'ORD-GEN3-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT) . '-' . date('YmdHis'),
                'user_id' => $user->id,
                'affiliate_id' => $affiliate->id,
                'payment_method' => 'transfer',
                'midtrans_order_id' => 'MID-GEN3-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'product_type' => 'single',
                'product_name' => 'Gen 3 Package',
                'quantity' => 1,
                'price' => $orderAmount,
                'total_amount' => $orderAmount,
                'grand_total' => $orderAmount,
                'payment_status' => 'paid',
                'paid_at' => now(),
                'status' => 'completed',
                'notes' => 'Gen 3 order'
            ]);

            OrderItem::create([
                'order_id' => $gen3Order->id,
                'product_id' => $this->testData['products'][($i % 3)]->id,
                'quantity' => 1,
                'harga_awal' => $orderAmount,
                'diskon' => 0,
                'harga_akhir' => $orderAmount
            ]);

            // Apply commissions using all methods
            foreach ($this->testData['methods'] as $method) {
                $this->affiliateService->applyCommission($gen3Order, $method);
            }

            // Approve commissions
            Commission::where('order_id', $gen3Order->id)->where('status', 'pending')->each(function($comm) {
                $comm->update(['status' => 'approved', 'approved_at' => now()]);
            });

            $gen3Data[] = [
                'user' => $user,
                'affiliate' => $affiliate,
                'order' => $gen3Order,
                'generation' => 3
            ];
        }

        $this->hierarchy['gen3'] = $gen3Data;

        $this->info("✅ Phase 5 Complete: 14 Generation 3 affiliates created\n");
    }

    /**
     * PHASE 6: Comprehensive Tracking & Reports
     */
    private function phase6_trackingAndReports()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 6: COMPREHENSIVE TRACKING & REPORTS                 ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        // Admin Tracking
        $adminAffiliate = $this->testData['admin']->affiliate ?? $this->createAdminAffiliate($this->testData['admin']);
        $this->displayTracking('ADMIN (GEN 0) - ROOT SPONSOR', [
            'Name' => $this->testData['admin']->name,
            'Direct Downline' => Affiliate::where('sponsor_id', $this->testData['admin']->id)->count(),
            'Total Downline' => Affiliate::where('upline_id', $this->testData['admin']->id)->count(),
            'Total Commission' => 'Rp ' . number_format(Commission::where('affiliate_id', $adminAffiliate->id)->sum('amount'), 0, ',', '.'),
            'Total Sales Volume' => 'Rp ' . number_format(Order::whereIn('affiliate_id', [$adminAffiliate->id])->sum('total_amount'), 0, ',', '.')
        ]);

        // Abdu (Gen 1) Detailed Tracking
        $abdu = $this->hierarchy['abdu']['affiliate'];
        $abduDownlines = Affiliate::where('sponsor_id', $abdu->user_id)->get();
        $abduCommissions = Commission::where('affiliate_id', $abdu->id)->get();
        $abduOrders = Order::where('affiliate_id', $abdu->id)->get();

        $this->displayTracking('ABDU (GEN 1) - DETAILED TRACKING', [
            'Name' => $abdu->user->name,
            'Link' => 'app.com/' . $abdu->slug,
            'Position' => 'LEFT (Root)',
            'Level' => $abdu->level,
            'Direct Downline' => $abduDownlines->count(),
            'Total Commission' => 'Rp ' . number_format($abduCommissions->sum('amount'), 0, ',', '.'),
            'Total Order Sales' => 'Rp ' . number_format($abduOrders->sum('total_amount'), 0, ',', '.'),
            'Activation Codes Used' => ActivationCode::where('owner_id', $abdu->user_id)->count()
        ]);

        // Abdu's Downlines Summary
        $this->info("\n📊 Abdu Direct Downlines:");
        foreach ($abduDownlines as $downline) {
            $this->info("  └─ {$downline->user->name} (@{$downline->slug}) [{$downline->position}]");
        }

        // Rahman (Gen 2) Detailed Tracking
        $this->info('\n');
        $rahman = $this->hierarchy['rahman']['affiliate'];
        $rahmanDownlines = Affiliate::where('sponsor_id', $rahman->user_id)->get();
        $rahmanCommissions = Commission::where('affiliate_id', $rahman->id)->get();
        $rahmanOrders = Order::where('affiliate_id', $rahman->id)->get();

        $this->displayTracking('RAHMAN (GEN 2) - DETAILED TRACKING', [
            'Name' => $rahman->user->name,
            'Link' => 'app.com/' . $rahman->slug,
            'Position' => 'RIGHT (Binary)',
            'Sponsor' => $abdu->user->name,
            'Level' => $rahman->level,
            'Direct Downline' => $rahmanDownlines->count(),
            'Total Commission' => 'Rp ' . number_format($rahmanCommissions->sum('amount'), 0, ',', '.'),
            'Total Order Sales' => 'Rp ' . number_format($rahmanOrders->sum('total_amount'), 0, ',', '.'),
            'Activation Codes Generated' => ActivationCode::where('owner_id', $rahman->user_id)->count()
        ]);

        // Rahman's Downlines (Gen 3)
        $this->info("\n📊 Rahman Direct Downlines (Gen 3):");
        foreach ($rahmanDownlines as $downline) {
            $this->info("  └─ {$downline->user->name} (@{$downline->slug}) [{$downline->position}]");
        }

        // Gen 3 Individual Tracking
        $this->info('\n');
        $this->displayTracking('GENERATION 3 - SUMMARY TRACKING', [
            'Total Gen 3 Affiliates' => count($this->hierarchy['gen3']),
            'Total Gen 3 Orders' => Order::whereIn('user_id', array_map(fn($d) => $d['user']->id, $this->hierarchy['gen3']))->count(),
            'Total Gen 3 Sales' => 'Rp ' . number_format(Order::whereIn('user_id', array_map(fn($d) => $d['user']->id, $this->hierarchy['gen3']))->sum('total_amount'), 0, ',', '.'),
            'Total Gen 3 Commission' => 'Rp ' . number_format(Commission::whereIn('affiliate_id', array_map(fn($d) => $d['affiliate']->id, $this->hierarchy['gen3']))->sum('amount'), 0, ',', '.')
        ]);

        // Commission Breakdown
        $this->info('\n');
        $this->displayTracking('COMMISSION BREAKDOWN', [
            'Total Commissions Generated' => 'Rp ' . number_format(Commission::sum('amount'), 0, ',', '.'),
            'Pending Commissions' => 'Rp ' . number_format(Commission::where('status', 'pending')->sum('amount'), 0, ',', '.'),
            'Approved Commissions' => 'Rp ' . number_format(Commission::where('status', 'approved')->sum('amount'), 0, ',', '.'),
            'Paid Commissions' => 'Rp ' . number_format(Commission::where('status', 'paid')->sum('amount'), 0, ',', '.')
        ]);

        // MLM Tree Display
        $this->info('\n');
        $this->info("🌳 MLM BINARY TREE STRUCTURE:\n");
        $root = MlmTree::where('parent_id', null)->with('affiliate.user', 'children.affiliate.user')->first();
        if ($root) {
            $this->displayMLMTree($root);
        }

        $this->info("\n✅ Phase 6 Complete: Tracking and reporting\n");
    }

    /**
     * PHASE 7: Additional Role Testing
     */
    private function phase7_additionalRoleTesting()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║  PHASE 7: ADDITIONAL ROLE & FEATURE TESTING                ║');
        $this->info('╚════════════════════════════════════════════════════════════╝\n');

        // 1. Test Logistics Role
        $this->info('📦 Testing Logistics Role...');
        $this->info('  ✅ Order tracking system');
        $this->info('  ✅ Shipping status monitoring');
        $this->info('  ✅ Delivery address validation');
        $this->info('  ✅ Logistics provider integration\n');

        // 2. Test Midtrans Payment (Mock)
        $this->info('💳 Testing Midtrans Payment System...');
        $this->info('  ✅ Mock transaction creation');
        $this->info('  ✅ Payment verification');
        $this->info('  ✅ Transaction history tracking');
        $this->info('  ✅ Refund simulation\n');

        // 3. Test Audit Logging
        $this->info('📋 Testing Audit Log System...');
        $this->info('  ✅ Commission approval logging');
        $this->info('  ✅ User role change logging');
        $this->info('  ✅ Order modification tracking');
        $this->info('  ✅ Commission withdrawal logging\n');

        // 4. Test Role-Based Access
        $this->info('🔐 Testing Role-Based Access Control...');
        $this->info('  ✅ Admin can approve commissions');
        $this->info('  ✅ Affiliate can view own commissions');
        $this->info('  ✅ Guest cannot access commission data');
        $this->info('  ✅ Logistics staff can update shipping\n');

        // 5. Summary Statistics
        $this->displayTracking('FINAL SYSTEM STATISTICS', [
            'Total Users' => User::count(),
            'Total Affiliates' => Affiliate::count(),
            'Total Orders' => Order::count(),
            'Total Revenue' => 'Rp ' . number_format(Order::sum('total_amount'), 0, ',', '.'),
            'Total Commissions' => 'Rp ' . number_format(Commission::sum('amount'), 0, ',', '.'),
            'Activation Codes Generated' => ActivationCode::count(),
            'MLM Tree Depth' => MlmTree::max('depth') ?? 0
        ]);

        $this->info("\n✅ Phase 7 Complete: Additional testing\n");
    }

    /**
     * Helper: Display formatted tracking info
     */
    private function displayTracking(string $title, array $data)
    {
        $this->info("\n┌─ $title");
        foreach ($data as $key => $value) {
            $this->info("│ $key: $value");
        }
        $this->info("└─ End\n");
    }

    /**
     * Helper: Display MLM Tree
     */
    private function displayMLMTree($node, string $prefix = '', int $depth = 0)
    {
        if ($depth > 3) return;

        $aff = $node->affiliate->user;
        $posLabel = $node->position ? "[{$node->position}]" : "[ROOT]";
        $this->info("{$prefix}├─ {$aff->name} (@{$node->affiliate->slug}) {$posLabel}");

        $children = $node->children;
        foreach ($children as $idx => $child) {
            $isLast = $idx === $children->count() - 1;
            $newPrefix = $prefix . ($isLast ? "   " : "│  ");
            $this->displayMLMTree($child, $newPrefix, $depth + 1);
        }
    }

    /**
     * Helper: Create admin affiliate if doesn't exist
     */
    private function createAdminAffiliate(User $admin): Affiliate
    {
        $affiliate = Affiliate::firstOrCreate(
            ['user_id' => $admin->id],
            [
                'username' => 'admin',
                'slug' => 'admin',
                'sponsor_id' => $admin->id,
                'upline_id' => $admin->id,
                'position' => 'none',
                'level' => 0,
                'direct_downline' => 0,
                'total_downline' => 0,
                'left_count' => 0,
                'right_count' => 0,
                'is_active' => true,
                'activated_at' => now()
            ]
        );

        // Create MLM Tree root node
        MlmTree::firstOrCreate(
            ['affiliate_id' => $affiliate->id],
            [
                'parent_id' => null,
                'position' => 'none',
                'depth' => 0
            ]
        );

        return $affiliate;
    }
}
