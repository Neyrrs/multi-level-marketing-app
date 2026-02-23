<?php

namespace Database\Seeders;

use App\Models\CommissionMethod;
use App\Models\CommissionRule;
use Illuminate\Database\Seeder;

class CommissionMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        CommissionRule::truncate();
        CommissionMethod::truncate();

        // ===== 1. SPONSOR METHOD =====
        $sponsor = CommissionMethod::create([
            'name' => 'Sponsor',
            'description' => 'Komisi dari sponsor (pendiri) langsung ketika member melakukan pembelian',
            'calculation_type' => 'percentage',
            'is_active' => true,
        ]);

        CommissionRule::insert([
            [
                'method_id' => $sponsor->id,
                'rule_name' => 'Sponsor - Level 1',
                'condition' => json_encode(['level' => 1, 'min_points' => 0]),
                'value' => 5.00,
                'priority' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'method_id' => $sponsor->id,
                'rule_name' => 'Sponsor - Level 2',
                'condition' => json_encode(['level' => 2, 'min_points' => 0]),
                'value' => 2.50,
                'priority' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'method_id' => $sponsor->id,
                'rule_name' => 'Sponsor - Level 3',
                'condition' => json_encode(['level' => 3, 'min_points' => 0]),
                'value' => 1.25,
                'priority' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ===== 2. LEVEL METHOD (BERJENJANG/DOWNLINE DEPTH) =====
        $level = CommissionMethod::create([
            'name' => 'Level',
            'description' => 'Komisi berjenjang berdasarkan kedalaman downline. Contoh: Ketika Ajeng (depth 2) membeli 300 points, maka Rana (depth 1) dapat 5% dan Abdul (depth 2) dapat 4%',
            'calculation_type' => 'tier_based',
            'is_active' => true,
        ]);

        CommissionRule::insert([
            [
                'method_id' => $level->id,
                'rule_name' => 'Level Berjenjang - Template Standard',
                'condition' => json_encode(['template' => 'standard', 'max_depth' => 5]),
                'value' => 0,  // Tidak digunakan untuk method ini, gunakan depth_percentages
                'depth_percentages' => json_encode(['1' => 5, '2' => 4, '3' => 3, '4' => 2, '5' => 1]),
                'max_depth' => 5,
                'template_config' => json_encode([
                    'description' => 'Komisi berjenjang standard 5 level',
                    'levels' => [
                        ['depth' => 1, 'percentage' => 5, 'description' => 'Level 1 (Direct Upline)'],
                        ['depth' => 2, 'percentage' => 4, 'description' => 'Level 2'],
                        ['depth' => 3, 'percentage' => 3, 'description' => 'Level 3'],
                        ['depth' => 4, 'percentage' => 2, 'description' => 'Level 4'],
                        ['depth' => 5, 'percentage' => 1, 'description' => 'Level 5'],
                    ],
                ]),
                'priority' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'method_id' => $level->id,
                'rule_name' => 'Level Berjenjang - Template Agresif',
                'condition' => json_encode(['template' => 'aggressive', 'max_depth' => 3]),
                'value' => 0,
                'depth_percentages' => json_encode(['1' => 10, '2' => 5, '3' => 2]),
                'max_depth' => 3,
                'template_config' => json_encode([
                    'description' => 'Komisi berjenjang agresif 3 level dengan persentase lebih tinggi',
                    'levels' => [
                        ['depth' => 1, 'percentage' => 10, 'description' => 'Level 1 (Incentive Tinggi)'],
                        ['depth' => 2, 'percentage' => 5, 'description' => 'Level 2'],
                        ['depth' => 3, 'percentage' => 2, 'description' => 'Level 3'],
                    ],
                ]),
                'priority' => 2,
                'is_active' => false,  // By default disabled, admin bisa enable
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // ===== 3. MATCHING METHOD =====
        $matching = CommissionMethod::create([
            'name' => 'Matching',
            'description' => 'Komisi dari performa matching downline (bonus matching dari dua kaki)',
            'calculation_type' => 'percentage',
            'is_active' => true,
        ]);

        CommissionRule::insert([
            [
                'method_id' => $matching->id,
                'rule_name' => 'Matching - 1 Level Down',
                'condition' => json_encode(['depth' => 1, 'min_leg_points' => 0]),
                'value' => 3.00,
                'priority' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'method_id' => $matching->id,
                'rule_name' => 'Matching - 3 Level Down',
                'condition' => json_encode(['depth' => 3, 'min_leg_points' => 0]),
                'value' => 2.00,
                'priority' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'method_id' => $matching->id,
                'rule_name' => 'Matching - 5 Level Down',
                'condition' => json_encode(['depth' => 5, 'min_leg_points' => 0]),
                'value' => 1.00,
                'priority' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
