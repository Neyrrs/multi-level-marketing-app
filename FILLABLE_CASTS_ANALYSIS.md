# Detailed Fillable & Casts Analysis Report

**Generated:** January 22, 2026
**Analysis Scope:** Key models with critical business logic

---

## SECTION 1: MODELS WITH MISMATCHES (NEEDS FIXING)

### 1. **User Model** ❌ MISSING FIELDS IN FILLABLE
**File:** [app/Models/User.php](app/Models/User.php)
**Migration:** [create_users_table.php](database/migrations/0001_01_01_000000_create_users_table.php)

**Issues Found:**
- Missing `status` field in $fillable (exists in migration as enum)
- Missing `phone` field in $fillable (exists in migration as nullable string)
- Missing cast for `status` field
- Missing cast for `phone` field

**Current $fillable:**
```php
protected $fillable = [
    'name',
    'email',
    'password',
];
```

**Current $casts:**
```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'two_factor_confirmed_at' => 'datetime',
    ];
}
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'name',
    'email',
    'password',
    'status',
    'phone',
];
```

**CORRECTED $casts:**
```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'two_factor_confirmed_at' => 'datetime',
        'status' => 'string',
        'phone' => 'string',
    ];
}
```

---

### 2. **UserProfile Model** ❌ MULTIPLE ISSUES
**File:** [app/Models/UserProfile.php](app/Models/UserProfile.php)
**Migration:** [create_user_profiles_table.php](database/migrations/2026_01_13_060344_create_user_profiles_table.php)

**Issues Found:**
- Field name mismatch: migration has `photo_profile` but model has `foto_profile` in fillable
- Missing `personal_info` field in $fillable (exists in migration)
- Missing `photo_profile` field in $fillable
- Missing `user_id` field in $fillable
- Incorrect cast types: should be `json` or `array`, not just `array`

**Current $fillable:**
```php
protected $fillable = ['name', 'address', 'foto_profile'];
```

**Current $casts:**
```php
protected $casts = [
    'name' => 'array',
    'address' => 'array',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'user_id',
    'personal_info',
    'address',
    'photo_profile',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'personal_info' => 'json',
    'address' => 'json',
];
```

---

### 3. **Order Model** ❌ SIGNIFICANT MISMATCH
**File:** [app/Models/Order.php](app/Models/Order.php)
**Migration:** [create_orders_table.php](database/migrations/2026_01_14_073811_create_orders_table.php)

**Issues Found:**
- Missing 10+ fields in $fillable compared to migration
- Missing `order_number` field
- Missing `affiliate_id` field
- Missing `payment_method` field
- Missing `midtrans_order_id` field
- Missing `midtrans_data` field
- Missing `shipping_data` field
- Missing `product_type` field
- Missing `product_name` field
- Missing `quantity` field
- Missing `price` field
- Missing `shipping_cost` field
- Missing `grand_total` field
- Missing `payment_status` field
- Missing `paid_at` field
- Missing `payment_reference` field
- Missing `status` field
- Missing `activation_codes_count` field
- Missing `generates_activation_code` field
- Missing `notes` field
- Wrong field names used: `subtotal_amount`, `order_status`, `discount_amount` (not in migration)
- Missing casts for multiple fields

**Current $fillable:**
```php
protected $fillable = [
    'order_number',
    'user_id',
    'affiliate_id',
    'product_id',
    'subtotal_amount',
    'tax_amount',
    'discount_amount',
    'total_amount',
    'payment_status',
    'order_status',
    'payment_method',
    'notes',
    'activation_codes_generated',
];
```

**Current $casts:**
```php
protected $casts = [
    'subtotal_amount' => 'decimal:2',
    'tax_amount' => 'decimal:2',
    'discount_amount' => 'decimal:2',
    'total_amount' => 'decimal:2',
    'activation_codes_generated' => 'boolean',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'order_number',
    'user_id',
    'affiliate_id',
    'payment_method',
    'midtrans_order_id',
    'midtrans_data',
    'shipping_data',
    'product_type',
    'product_id',
    'product_name',
    'quantity',
    'price',
    'total_amount',
    'shipping_cost',
    'tax_amount',
    'grand_total',
    'payment_status',
    'paid_at',
    'payment_reference',
    'status',
    'activation_codes_count',
    'generates_activation_code',
    'notes',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'price' => 'decimal:2',
    'total_amount' => 'decimal:2',
    'shipping_cost' => 'decimal:2',
    'tax_amount' => 'decimal:2',
    'grand_total' => 'decimal:2',
    'quantity' => 'integer',
    'activation_codes_count' => 'integer',
    'generates_activation_code' => 'boolean',
    'payment_status' => 'string',
    'status' => 'string',
    'product_type' => 'string',
    'midtrans_data' => 'json',
    'shipping_data' => 'json',
    'paid_at' => 'datetime',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

---

### 4. **CommissionMethod Model** ❌ FIELD NAME MISMATCH
**File:** [app/Models/CommissionMethod.php](app/Models/CommissionMethod.php)
**Migration:** [create_commission_methods_table.php](database/migrations/2026_01_14_073928_create_commission_methods_table.php)

**Issues Found:**
- Field name mismatch: migration has `calculation_type` but model uses `type`
- Missing `calculation_type` field
- Missing cast for `calculation_type`

**Current $fillable:**
```php
protected $fillable = [
    'name',
    'description',
    'type',
    'is_active',
];
```

**Current $casts:**
```php
protected $casts = [
    'is_active' => 'boolean',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'name',
    'description',
    'calculation_type',
    'is_active',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'calculation_type' => 'string',
    'is_active' => 'boolean',
];
```

---

### 5. **CommissionRule Model** ❌ SIGNIFICANT MISMATCH
**File:** [app/Models/CommissionRule.php](app/Models/CommissionRule.php)
**Migration:** [create_commission_rules_table.php](database/migrations/2026_01_14_073943_create_commission_rules_table.php)

**Issues Found:**
- Missing `rule_name` field in $fillable (exists in migration)
- Missing `condition` field in $fillable (jsonb field)
- Missing `value` field in $fillable (decimal in migration)
- Missing `priority` field in $fillable (integer in migration)
- Missing `is_active` field in $fillable
- Extra fields in $fillable not in migration: `description`, `percentage`, `fixed_amount`, `calculation_mode`, `min_requirement`, `notes`
- Missing proper casts

**Current $fillable:**
```php
protected $fillable = [
    'method_id',
    'description',
    'percentage',
    'fixed_amount',
    'calculation_mode',
    'min_requirement',
    'notes',
];
```

**Current $casts:**
```php
protected $casts = [
    'percentage' => 'decimal:2',
    'fixed_amount' => 'decimal:2',
    'min_requirement' => 'decimal:2',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'method_id',
    'rule_name',
    'condition',
    'value',
    'priority',
    'is_active',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'condition' => 'json',
    'value' => 'decimal:2',
    'priority' => 'integer',
    'is_active' => 'boolean',
];
```

---

### 6. **Commission Model** ❌ MULTIPLE MISSING FIELDS
**File:** [app/Models/Commission.php](app/Models/Commission.php)
**Migration:** [create_commissions_table.php](database/migrations/2026_01_14_073948_create_commissions_table.php)

**Issues Found:**
- Missing `commission_type` field in $fillable
- Missing `depth_level` field in $fillable
- Missing `calculation_detail` field in $fillable (jsonb)
- Missing `status` field in $fillable
- Missing `calculated_at` field in $fillable
- Extra fields in $fillable: `amount_gross`, `amount_tax`, `amount_fee`, `amount_net` (not in migration)
- Wrong field in migration: should be `amount`, not the decomposed fields
- Missing casts for several fields

**Current $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'order_id',
    'method_id',
    'rule_id',
    'amount_gross',
    'amount_tax',
    'amount_fee',
    'amount_net',
    'status',
    'approved_at',
    'paid_at',
    'notes',
];
```

**Current $casts:**
```php
protected $casts = [
    'amount_gross' => 'decimal:2',
    'amount_tax' => 'decimal:2',
    'amount_fee' => 'decimal:2',
    'amount_net' => 'decimal:2',
    'approved_at' => 'datetime',
    'paid_at' => 'datetime',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'order_id',
    'method_id',
    'rule_id',
    'amount',
    'commission_type',
    'depth_level',
    'calculation_detail',
    'status',
    'calculated_at',
    'paid_at',
    'approved_at',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'amount' => 'decimal:2',
    'depth_level' => 'integer',
    'calculation_detail' => 'json',
    'calculated_at' => 'datetime',
    'paid_at' => 'datetime',
    'approved_at' => 'datetime',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

---

### 7. **CommissionLedger Model** ❌ SIGNIFICANT MISMATCH
**File:** [app/Models/CommissionLedger.php](app/Models/CommissionLedger.php)
**Migration:** [create_commission_ledgers_table.php](database/migrations/2026_01_20_050200_create_commission_ledgers_table.php)

**Issues Found:**
- Missing `type` field in $fillable (credit/debit/adjustment)
- Missing `amount` field in $fillable (decimal)
- Missing `description` field in $fillable (string)
- Missing `balance_before` field in $fillable (decimal)
- Missing `balance_after` field in $fillable (decimal)
- Missing `reference` field in $fillable
- Missing `reference_type` field in $fillable
- Missing `status` field in $fillable
- Missing `metadata` field in $fillable (jsonb)
- Missing `notes` field in $fillable
- Extra field: `action` (not in migration)
- Missing all casts

**Current $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'commission_id',
    'order_id',
    'action',
    'description',
    'notes',
];
```

**Current $casts:**
```php
// No casts defined!
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'commission_id',
    'order_id',
    'type',
    'amount',
    'description',
    'balance_before',
    'balance_after',
    'reference',
    'reference_type',
    'status',
    'metadata',
    'notes',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'amount' => 'decimal:2',
    'balance_before' => 'decimal:2',
    'balance_after' => 'decimal:2',
    'metadata' => 'json',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

---

### 8. **Cart Model** ❌ FIELD MISMATCH
**File:** [app/Models/Cart.php](app/Models/Cart.php)
**Migration:** [create_carts_table.php](database/migrations/2026_01_20_041143_create_carts_table.php)

**Issues Found:**
- Missing `session_id` field in $fillable
- Missing `expires_at` field in $fillable
- Extra field: `checked_out_at` (not in migration)

**Current $fillable:**
```php
protected $fillable = [
    'user_id',
    'checked_out_at',
];
```

**Current $casts:**
```php
protected $casts = [
    'checked_out_at' => 'datetime',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'user_id',
    'session_id',
    'expires_at',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'expires_at' => 'datetime',
];
```

---

### 9. **CartItem Model** ❌ MISSING PRICE FIELDS
**File:** [app/Models/CartItem.php](app/Models/CartItem.php)
**Migration:** [create_cart_items_table.php](database/migrations/2026_01_20_041200_create_cart_items_table.php)

**Issues Found:**
- Missing `harga_awal` field in $fillable (decimal)
- Missing `diskon` field in $fillable (decimal)
- Missing `harga_akhir` field in $fillable (decimal)
- Missing casts for price fields

**Current $fillable:**
```php
protected $fillable = [
    'cart_id',
    'product_id',
    'package_id',
    'quantity',
];
```

**Current $casts:**
```php
protected $casts = [
    'quantity' => 'integer',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'cart_id',
    'product_id',
    'package_id',
    'quantity',
    'harga_awal',
    'diskon',
    'harga_akhir',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'quantity' => 'integer',
    'harga_awal' => 'decimal:2',
    'diskon' => 'decimal:2',
    'harga_akhir' => 'decimal:2',
];
```

---

### 10. **Withdrawal Model** ❌ MULTIPLE FIELD MISMATCHES
**File:** [app/Models/Withdrawal.php](app/Models/Withdrawal.php)
**Migration:** [create_withdrawals_table.php](database/migrations/2026_01_20_042003_create_withdrawals_table.php)

**Issues Found:**
- Missing `withdrawal_number` field in $fillable
- Missing `destination_account` field in $fillable
- Missing `destination_bank` field in $fillable
- Missing `destination_name` field in $fillable
- Missing `fee` field in $fillable (migration has `fee`, model has `fee_amount`)
- Missing `net_amount` field in $fillable
- Missing `status` field in $fillable
- Missing `approved_by` field in $fillable
- Missing `approved_at` field in $fillable
- Missing `processed_at` field in $fillable
- Missing `midtrans_reference` field in $fillable
- Missing `midtrans_response` field in $fillable
- Missing `rejection_reason` field in $fillable
- Missing `notes` field in $fillable
- Extra field: `payment_method` (not in migration)
- Extra field: `paid_at` (not in migration)

**Current $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'bank_account_id',
    'amount',
    'fee_amount',
    'net_amount',
    'status',
    'payment_method',
    'midtrans_reference',
    'approved_at',
    'approved_by',
    'paid_at',
    'notes',
];
```

**Current $casts:**
```php
protected $casts = [
    'amount' => 'decimal:2',
    'fee_amount' => 'decimal:2',
    'net_amount' => 'decimal:2',
    'approved_at' => 'datetime',
    'paid_at' => 'datetime',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'withdrawal_number',
    'affiliate_id',
    'bank_account_id',
    'destination_account',
    'destination_bank',
    'destination_name',
    'amount',
    'fee',
    'net_amount',
    'status',
    'approved_by',
    'approved_at',
    'processed_at',
    'midtrans_reference',
    'midtrans_response',
    'rejection_reason',
    'notes',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'amount' => 'decimal:2',
    'fee' => 'decimal:2',
    'net_amount' => 'decimal:2',
    'approved_at' => 'datetime',
    'processed_at' => 'datetime',
    'midtrans_response' => 'json',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

---

### 11. **AffiliateBankAccount Model** ❌ MISSING FIELDS
**File:** [app/Models/AffiliateBankAccount.php](app/Models/AffiliateBankAccount.php)
**Migration:** [create_affiliate_bank_accounts_table.php](database/migrations/2026_01_20_040000_create_affiliate_bank_accounts_table.php)

**Issues Found:**
- Missing `bank_code` field in $fillable
- Missing `is_primary` field in $fillable
- Missing `verified_at` field in $fillable (migration has it)
- Extra field: `branch_code` (not in migration)
- Missing `minimum_withdrawal` field in $fillable
- Missing `maximum_withdrawal` field in $fillable
- Missing `midtrans_token` field in $fillable
- Missing `midtrans_data` field in $fillable
- Missing `notes` field in $fillable
- Missing several casts

**Current $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'bank_name',
    'account_number',
    'account_holder',
    'branch_code',
    'is_verified',
    'verified_at',
    'notes',
];
```

**Current $casts:**
```php
protected $casts = [
    'is_verified' => 'boolean',
    'verified_at' => 'datetime',
];
```

**CORRECTED $fillable:**
```php
protected $fillable = [
    'affiliate_id',
    'bank_name',
    'bank_code',
    'account_number',
    'account_holder',
    'is_primary',
    'is_verified',
    'verified_at',
    'minimum_withdrawal',
    'maximum_withdrawal',
    'midtrans_token',
    'midtrans_data',
    'notes',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'is_primary' => 'boolean',
    'is_verified' => 'boolean',
    'verified_at' => 'datetime',
    'minimum_withdrawal' => 'decimal:2',
    'maximum_withdrawal' => 'decimal:2',
    'midtrans_data' => 'json',
];
```

---

## SECTION 2: MODELS THAT ARE CORRECT (NO CHANGES NEEDED)

### ✅ Product Model
**Status:** CORRECT
- All migration fields are in $fillable
- All appropriate casts are defined
- No extra fields in $fillable

### ✅ Package Model
**Status:** CORRECT
- All migration fields are in $fillable
- All appropriate casts are defined
- Note: Has `discount` cast as `'decimal:5,2'` but migration defines as `'decimal:5,2'` - correct

### ✅ ActivationCode Model
**Status:** CORRECT
- All migration fields are in $fillable
- All appropriate casts are defined
- Properly handles all decimal, boolean, and datetime fields
- Correctly includes all foreign key relationships

### ✅ Affiliate Model
**Status:** CORRECT (mostly)
- Core fields match migration
- However, **MISSING** several fields in $fillable and $casts:
  - `username` field (migration has it)
  - `slug` field (migration has it)
  - `activation_code_id` field (migration has it)
  - `total_downline` field (migration has it)
  - `pair_count`, `left_count`, `right_count` are in $fillable but missing casts
  - `left_volume`, `right_volume`, `total_personal_volume`, `total_volume` (migration has them but model missing)
  - `is_active` is in $fillable but needs cast
  - `activated_at` field (migration has it)
  - `last_activity_at` field (migration has it)

**Note:** This model has significant gaps too. See additional analysis below.

---

## SECTION 3: ADDITIONAL CORRECTIONS NEEDED

### **Affiliate Model - ADDITIONAL CORRECTION NEEDED** ❌
**File:** [app/Models/Affiliate.php](app/Models/Affiliate.php)

**CORRECTED $fillable:**
```php
protected $fillable = [
    'username',
    'slug',
    'user_id',
    'sponsor_id',
    'upline_id',
    'activation_code_id',
    'position',
    'level',
    'direct_downline',
    'total_downline',
    'left_count',
    'right_count',
    'pair_count',
    'left_volume',
    'right_volume',
    'total_personal_volume',
    'total_volume',
    'is_active',
    'activated_at',
    'last_activity_at',
];
```

**CORRECTED $casts:**
```php
protected $casts = [
    'level' => 'integer',
    'direct_downline' => 'integer',
    'total_downline' => 'integer',
    'pair_count' => 'integer',
    'right_count' => 'integer',
    'left_count' => 'integer',
    'left_volume' => 'decimal:2',
    'right_volume' => 'decimal:2',
    'total_personal_volume' => 'decimal:2',
    'total_volume' => 'decimal:2',
    'is_active' => 'boolean',
    'activated_at' => 'datetime',
    'last_activity_at' => 'datetime',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
```

---

### OrderItem Model - Already Correct
**Status:** CORRECT
- All migration fields present in $fillable
- Appropriate casts defined
- Ready to use

---

### OrderActivationCode Model
**Status:** Not fully analyzed but migration fields are simple
- `order_id`, `activation_code_id`, `sequence` fields
- Consider whether model exists and needs $fillable/$casts

---

## SUMMARY STATISTICS

| Category | Count |
|----------|-------|
| Total Models Analyzed | 15 |
| Models with Mismatches | 11 |
| Models Correct | 4 |
| Total Fields Missing from $fillable | 47+ |
| Total Missing Casts | 30+ |
| Critical Issues (>5 missing fields) | 5 |

---

## PRIORITY FIXES

**CRITICAL (Fix First):**
1. **Order** - Missing 15+ fields
2. **CommissionLedger** - Missing 10+ fields and NO casts defined
3. **Commission** - Missing calculation fields
4. **Withdrawal** - Missing 8+ fields
5. **Affiliate** - Missing volume tracking fields

**HIGH PRIORITY (Fix Next):**
6. **UserProfile** - Field name mismatch (foto_profile vs photo_profile)
7. **CommissionRule** - Wrong fields entirely
8. **CommissionMethod** - Field name mismatch
9. **Cart** - Missing session_id
10. **CartItem** - Missing price snapshot fields

**MEDIUM PRIORITY:**
11. **User** - Missing 2 fields (status, phone)
12. **AffiliateBankAccount** - Missing 5 fields

---

## ACTIONABLE STEPS

1. Start with the CRITICAL section models
2. For each model, copy the CORRECTED $fillable array exactly
3. Replace the model's current $fillable with the corrected version
4. Add/update $casts with the corrected version
5. Test model creation with all fields
6. Run tests to ensure no validation errors

**Each model that was fixed should be tested with:**
```php
ModelName::create([...all fields...]);
```

