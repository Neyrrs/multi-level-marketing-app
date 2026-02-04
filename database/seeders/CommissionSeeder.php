<?php

namespace Database\Seeders;

use App\Models\CommissionMethod;
use App\Models\CommissionRule;
use Illuminate\Database\Seeder;

class CommissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing data first
        CommissionRule::truncate();
        CommissionMethod::truncate();

        // ================================================
        // METHOD 1: DIRECT COMMISSION - PERCENTAGE
        // ================================================
        // Komisi langsung dari penjualan affiliate
        // Level 1: Penjual langsung (10%)
        // Level 2: Sponsor (5%)
        // Level 3: Generasi ke-3 (2%)

        $directMethod = CommissionMethod::create([
            'name' => 'Direct Commission - Percentage',
            'description' => 'Komisi langsung berdasarkan persentase penjualan untuk setiap level',
            'calculation_type' => 'percentage',
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $directMethod->id,
            'rule_name' => 'Level 1 - Penjual Langsung (10%)',
            'condition' => json_encode(['level' => 1, 'type' => 'direct']),
            'value' => 10.00,
            'priority' => 1,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $directMethod->id,
            'rule_name' => 'Level 2 - Sponsor (5%)',
            'condition' => json_encode(['level' => 2, 'type' => 'sponsor']),
            'value' => 5.00,
            'priority' => 2,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $directMethod->id,
            'rule_name' => 'Level 3 - Generasi (2%)',
            'condition' => json_encode(['level' => 3, 'type' => 'generation']),
            'value' => 2.00,
            'priority' => 3,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $directMethod->id,
            'rule_name' => 'Level 4 - Generasi (1%)',
            'condition' => json_encode(['level' => 4, 'type' => 'generation']),
            'value' => 1.00,
            'priority' => 4,
            'is_active' => true,
        ]);

        // ================================================
        // METHOD 2: BINARY COMMISSION - VOLUME BASED
        // ================================================
        // Komisi berdasarkan volume matching kiri-kanan
        // Bonus untuk setiap pasangan yang match (kiri + kanan)

        $binaryMethod = CommissionMethod::create([
            'name' => 'Binary Commission - Volume Matching',
            'description' => 'Komisi berdasarkan volume matching antara sisi kiri dan kanan tree',
            'calculation_type' => 'percentage',
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $binaryMethod->id,
            'rule_name' => 'Binary Level 1 - 15% dari pair volume',
            'condition' => json_encode(['min_pair_volume' => 500000, 'type' => 'binary']),
            'value' => 15.00,
            'priority' => 1,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $binaryMethod->id,
            'rule_name' => 'Binary Level 2 - 10% dari pair volume upline',
            'condition' => json_encode(['min_pair_volume' => 500000, 'type' => 'binary']),
            'value' => 10.00,
            'priority' => 2,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $binaryMethod->id,
            'rule_name' => 'Binary Level 3 - 5% dari pair volume',
            'condition' => json_encode(['min_pair_volume' => 500000, 'type' => 'binary']),
            'value' => 5.00,
            'priority' => 3,
            'is_active' => true,
        ]);

        // ================================================
        // METHOD 3: TIER-BASED COMMISSION
        // ================================================
        // Komisi berdasarkan tier/ranking affiliate
        // Semakin tinggi tier, semakin tinggi komisi

        $tierMethod = CommissionMethod::create([
            'name' => 'Tier-Based Commission',
            'description' => 'Komisi berdasarkan tier/ranking affiliate yang dicapai',
            'calculation_type' => 'tier_based',
            'is_active' => false,  // Disabled by default
        ]);

        CommissionRule::create([
            'method_id' => $tierMethod->id,
            'rule_name' => 'Tier Basic - 8% komisi',
            'condition' => json_encode(['tier' => 'basic', 'min_sales' => 0, 'max_sales' => 10000000]),
            'value' => 8.00,
            'priority' => 1,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $tierMethod->id,
            'rule_name' => 'Tier Silver - 12% komisi',
            'condition' => json_encode(['tier' => 'silver', 'min_sales' => 10000000, 'max_sales' => 50000000]),
            'value' => 12.00,
            'priority' => 2,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $tierMethod->id,
            'rule_name' => 'Tier Gold - 15% komisi',
            'condition' => json_encode(['tier' => 'gold', 'min_sales' => 50000000, 'max_sales' => 100000000]),
            'value' => 15.00,
            'priority' => 3,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $tierMethod->id,
            'rule_name' => 'Tier Platinum - 20% komisi',
            'condition' => json_encode(['tier' => 'platinum', 'min_sales' => 100000000]),
            'value' => 20.00,
            'priority' => 4,
            'is_active' => true,
        ]);

        // ================================================
        // METHOD 4: FIXED AMOUNT COMMISSION
        // ================================================
        // Komisi dengan jumlah tetap per tier/level

        $fixedMethod = CommissionMethod::create([
            'name' => 'Fixed Amount Commission',
            'description' => 'Komisi dengan jumlah nominal tetap per transaksi',
            'calculation_type' => 'fixed',
            'is_active' => false,  // Disabled by default
        ]);

        CommissionRule::create([
            'method_id' => $fixedMethod->id,
            'rule_name' => 'Level 1 - Rp 50.000 per transaksi',
            'condition' => json_encode(['level' => 1, 'min_sales' => 500000]),
            'value' => 50000.00,
            'priority' => 1,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $fixedMethod->id,
            'rule_name' => 'Level 2 - Rp 25.000 per transaksi',
            'condition' => json_encode(['level' => 2, 'min_sales' => 500000]),
            'value' => 25000.00,
            'priority' => 2,
            'is_active' => true,
        ]);

        // ================================================
        // METHOD 5: HYBRID COMMISSION
        // ================================================
        // Kombinasi percentage + fixed amount
        // Affiliate dapat: (sales * percentage%) + fixed amount

        $hybridMethod = CommissionMethod::create([
            'name' => 'Hybrid Commission',
            'description' => 'Komisi gabungan percentage + fixed amount',
            'calculation_type' => 'percentage',
            'is_active' => false,  // Disabled by default
        ]);

        CommissionRule::create([
            'method_id' => $hybridMethod->id,
            'rule_name' => 'Level 1 - 7% + Rp 50.000 fixed',
            'condition' => json_encode(['level' => 1, 'percentage' => 7, 'fixed' => 50000]),
            'value' => 7.00,  // percentage value
            'priority' => 1,
            'is_active' => true,
        ]);

        CommissionRule::create([
            'method_id' => $hybridMethod->id,
            'rule_name' => 'Level 2 - 3% + Rp 25.000 fixed',
            'condition' => json_encode(['level' => 2, 'percentage' => 3, 'fixed' => 25000]),
            'value' => 3.00,  // percentage value
            'priority' => 2,
            'is_active' => true,
        ]);

        echo "✅ Commission Methods & Rules seeding completed!\n";
        echo "   - 5 Methods created (Direct, Binary, Tier, Fixed, Hybrid)\n";
        echo "   - 14 Rules created\n";
        echo "   - Active: Direct, Binary\n";
        echo "   - Inactive (for testing): Tier, Fixed, Hybrid\n";
    }
}
