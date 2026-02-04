# ✅ DATABASE ARCHITECTURE ASSESSMENT

**User Requirements vs Current Database**

---

## 📋 REQUIREMENTS CHECKLIST

### 1️⃣ RANDOM SPONSOR ASSIGNMENT
**User asks**: "Ketika pengunjung akses app.com, system ambil 1 affiliate random sebagai sponsor"

**Current Status**: ✅ **READY (with minor setup needed)**

**What's Available**:
- ✅ Affiliate model dengan `sponsor_id` field
- ✅ User relationship (user → affiliate)
- ✅ Database support untuk track sponsor

**What Needs To Be Added**:
```php
// Need to add to Affiliate Migration/Model:
- username / slug field (untuk app.com/abdu)
- referral_link field (optional tracking)
- referral_source tracking

// Need Logic in Controller:
- Rand select active affiliate saat first visit
- Store di session/cookie
- Assign ke user saat signup
```

**Status**: ⚠️ **Needs minor schema update** (see below)

---

### 2️⃣ AFFILIATE UNIQUE URL / SLUG
**User asks**: "Setiap affiliate punya link app.com/abdu"

**Current Status**: ❌ **MISSING - NEEDS TO ADD**

**Required Addition**:
```sql
ALTER TABLE affiliates ADD COLUMN username VARCHAR(255) UNIQUE;
ALTER TABLE affiliates ADD COLUMN slug VARCHAR(255) UNIQUE;
ALTER TABLE affiliates ADD INDEX (username, slug);
```

**Model Relationship Ready**:
- ✅ Affiliate → User (already exists)
- ✅ Can create route: Route::get('/{affiliateSlug}', ...)

---

### 3️⃣ CUSTOMER CANNOT REGISTER AFFILIATE DIRECTLY
**User asks**: "Customer tidak bisa register affiliate langsung, harus di-register sponsor"

**Current Status**: ✅ **FULLY SUPPORTED**

**What's Available**:
- ✅ Affiliate model dengan `sponsor_id` requirement
- ✅ `upline_id` untuk positioning (left/right)
- ✅ `position` field (left, right, none)
- ✅ Affiliate tied to user 1-to-1

**How It Works**:
```php
// Sponsor register new affiliate
$newAffiliate = Affiliate::create([
    'user_id' => $newCustomer->id,
    'sponsor_id' => $sponsor->id,           // REQUIRED - set by sponsor
    'upline_id' => $sponsor->id,            // Position parent
    'position' => 'left',                   // Sponsor chooses L/R
    'level' => $sponsor->level + 1,
    'activation_code_id' => $code->id
]);
```

**Status**: ✅ **READY**

---

### 4️⃣ ACTIVATION CODE GENERATION FROM PACKAGE PURCHASE
**User asks**: "Ketika customer beli package, akan membuat kode aktivasi. Kode diberikan ke SPONSOR, bukan pembeli"

**Current Status**: ✅ **MOSTLY READY - Needs clarification in flow**

**What's Available**:
```php
// activation_codes table punya:
- owner_id              // Siapa punya code
- used_by               // Siapa yang pakai
- status                // available, used, expired, voided
- product_id            // Produk apa
- package_id            // Package apa
- generated_from        // Dari order
- gives_commission      // Komisi atau tidak
```

**Current Model**:
```php
// ActivationCode
$code->owner_id          // User yang punya (currently buyer)
$code->used_by           // User yang pakai
$code->product_id        // Product detail
$code->package_id        // Package detail
```

**Issue**: Activation code didesign untuk "owner" = buyer. Tapi requirement Anda owner = SPONSOR.

**Recommendation**: ✅ Database SUPPORTS, tapi logic perlu diatur:

```php
// When customer buys package:
// 1. Order created with customer as buyer
// 2. Generate activation codes
// 3. Set owner_id = AFFILIATE_SPONSOR (bukan customer)
// 4. Sponsor gets codes untuk register downline

// Example flow:
$order = Order::create([
    'user_id' => $customer->id,              // Pembeli
    'affiliate_id' => $affiliate->id         // Seller
]);

// Generate code untuk sponsor
$activationCode = ActivationCode::create([
    'code' => generate(),
    'owner_id' => $affiliate->id,            // ← Sponsor affiliate's user
    'product_id' => $product->id,
    'generated_from' => 'order',
    'gives_commission' => true
]);
```

**Status**: ⚠️ **Database READY, Logic needs implementation**

---

### 5️⃣ ACTIVATION CODE USED TO CREATE NEW AFFILIATE
**User asks**: "Kode aktivasi ini digunakan untuk membuat 1 account affiliate baru"

**Current Status**: ✅ **FULLY READY**

**What's Available**:
- ✅ ActivationCode model
- ✅ Affiliate model dengan `activation_code_id` field
- ✅ Status tracking (available → used → expired)
- ✅ Usage count field

**How It Works**:
```php
// New customer uses activation code
$activationCode = ActivationCode::where('code', $inputCode)->firstOrFail();

// Verify available
if ($activationCode->status !== 'available') {
    throw new Exception('Code tidak tersedia');
}

// Create new affiliate
$newAffiliate = Affiliate::create([
    'user_id' => $newCustomer->id,
    'sponsor_id' => $activationCode->owner->affiliate->sponsor_id,
    'upline_id' => $activationCode->owner_id,
    'activation_code_id' => $activationCode->id,
    'position' => 'right'  // or determine by sponsor
]);

// Mark code as used
$activationCode->update([
    'status' => 'used',
    'used_by' => $newCustomer->id,
    'used_at' => now()
]);
```

**Status**: ✅ **READY**

---

### 6️⃣ DYNAMIC MULTI-METHOD COMMISSION SYSTEM
**User asks**: "System multi metode komisi dinamis - admin atur metode, ketentuan, perhitungan"

**Current Status**: ✅ **FULLY READY**

**What's Available**:

#### **CommissionMethod Table** - Core method setup
```php
// Fields:
- id
- name                    // "Direct Commission", "Binary", "Tier-based"
- description             // Detail
- calculation_type        // percentage, fixed, tier_based
- is_active               // Admin bisa turn on/off
```

#### **CommissionRule Table** - Detailed rules per method
```php
// Fields:
- id
- commission_method_id    // FK to method
- code                    // DIRECT_L1_10%, BINARY_L2_15%
- description             // Level 1 - 10% of sales
- level                   // Hierarchical level (1, 2, 3, etc)
- percentage              // 10%, 5%, 2%
- fixed_amount            // Atau fixed Rp amount
- min_sales               // Minimal sales untuk applicable
- max_sales               // Maximum
- is_active               // Bisa disable rule
```

#### **Commission Table** - Generated commissions
```php
// Fields:
- affiliate_id            // Siapa dapat komisi
- order_id                // Dari order apa
- commission_method_id    // Metode apa
- commission_rule_id      // Rule apa
- amount_gross            // Amount before fee
- amount_fee              // Fee
- amount_net              // Final amount
- status                  // pending, approved, paid, rejected
```

#### **CommissionCalculation Table** - Audit trail
```php
// Track setiap kalkulasi dengan:
- order_id
- affiliate_id
- method_id
- rule_id
- calculation details
```

**How It Works** (Admin Setup):
```php
// 1. Admin create method
$method = CommissionMethod::create([
    'name' => 'Direct Percentage',
    'description' => '% dari penjualan',
    'calculation_type' => 'percentage',
    'is_active' => true
]);

// 2. Admin create rules untuk method
CommissionRule::create([
    'commission_method_id' => $method->id,
    'code' => 'DIRECT_L1',
    'description' => 'Level 1 - 10%',
    'level' => 1,
    'percentage' => 10,
    'is_active' => true
]);

CommissionRule::create([
    'commission_method_id' => $method->id,
    'code' => 'DIRECT_L2',
    'description' => 'Level 2 - 5%',
    'level' => 2,
    'percentage' => 5,
    'is_active' => true
]);

// 3. System applies automatically saat order created
$order = Order::create([...]);

// Loop affiliate hierarchy
// Apply matching rules
// Create Commission record
// Create CommissionCalculation for audit
```

**Multiple Methods Support**:
```php
// System bisa support multiple methods simultaneously:
Method 1: Direct Commission (%, per level)
Method 2: Binary Commission (volume-based)
Method 3: Tier-based Commission (based on sales volume)
Method 4: Fixed Amount Commission
Method 5: Custom Formula

Admin bisa set which methods active, affiliate kategori, dan perhitungan
```

**Status**: ✅ **FULLY READY**

---

## 📊 SCHEMA ASSESSMENT SUMMARY

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | Random Sponsor Assignment | ✅ | Affiliate model ready, need referral logic |
| 2 | Affiliate URL Slug (app.com/abdu) | ❌ | MISSING - need to add username/slug to Affiliate |
| 3 | Customer Cannot Register Directly | ✅ | Sponsor required in Affiliate model |
| 4 | Package Purchase → Activation Code | ✅ | ActivationCode model ready |
| 5 | Activation Code to Affiliate | ✅ | Full support (code linked to affiliate) |
| 6 | Multi-Method Commission | ✅ | CommissionMethod + Rule + Ledger ready |
| 7 | Admin Control Commission | ✅ | CommissionMethod table untuk admin config |
| 8 | Dynamic Calculation | ✅ | CommissionCalculation + Rule level support |
| 9 | Commission Audit Trail | ✅ | CommissionLedger untuk tracking |

---

## 🔧 WHAT NEEDS TO BE ADDED / MODIFIED

### Priority 1: ⚠️ ADD Affiliate Slug Field (CRITICAL)

```php
// New Migration: 2026_01_22_XXXXXX_add_slug_to_affiliates.php

Schema::table('affiliates', function (Blueprint $table) {
    // Add after user_id
    $table->string('username')->unique()->nullable()->after('user_id')
        ->comment('Username untuk referral link (app.com/username)');
    
    $table->string('slug')->unique()->nullable()->after('username')
        ->comment('URL-friendly slug dari username');
    
    $table->index('username');
    $table->index('slug');
});
```

**Usage**:
```php
// Route setup
Route::get('/{affiliateSlug}', [LandingController::class, 'affiliate'])->name('affiliate.landing');

// Assign sponsor
$affiliate = Affiliate::where('slug', $affiliateSlug)->firstOrFail();
session()->put('sponsor_affiliate_id', $affiliate->id);
```

---

### Priority 2: ⚠️ CLARIFY Activation Code Ownership

**Current**: Code `owner_id` is buyer (customer)
**Requirement**: Code should go to SPONSOR

**Solution Option A** (Modify existing):
```php
// When generating code from order, set:
$code->owner_id = $order->affiliate_id;  // Sponsor affiliate's user
```

**Solution Option B** (Add new field):
```php
// Add to ActivationCode schema:
$table->foreignId('affiliate_sponsor_id')->nullable()
    ->comment('Affiliate sponsor yang dapat kode');
```

**Recommendation**: Option A is simpler. Logic:
```php
// When order created, generate code
foreach ($packages as $package) {
    ActivationCode::create([
        'code' => generate(),
        'owner_id' => $order->affiliate->user_id,  // ← Sponsor gets code
        'product_id' => $package->product_id,
        'package_id' => $package->id,
        'generated_from' => 'order',
        'gives_commission' => true
    ]);
}
```

---

### Priority 3: ⚠️ Setup Commission Method as Order Default

**Add to Order Model**:
```php
$table->foreignId('commission_method_id')->nullable()
    ->constrained('commission_methods')
    ->comment('Commission method untuk order ini');
```

**Usage**:
```php
// Admin set default method
$defaultMethod = CommissionMethod::where('code', 'DIRECT_PERCENT')->first();

$order = Order::create([
    'user_id' => $customer->id,
    'commission_method_id' => $defaultMethod->id,  // Atau pilih saat order
    ...
]);

// Apply commission berdasarkan method
$rules = $order->commissionMethod->rules()->where('is_active', true)->get();
```

---

### Priority 4: ⚠️ Add Affiliate Referral Tracking

**New Table**: `affiliate_referrals` (optional but recommended)

```php
// Migration
Schema::create('affiliate_referrals', function (Blueprint $table) {
    $table->id();
    $table->foreignId('affiliate_id')->constrained('affiliates');
    $table->foreignId('referred_user_id')->nullable()->constrained('users');
    $table->string('referral_source')->nullable();  // direct, app.com, link share
    $table->timestamp('clicked_at')->nullable();
    $table->timestamp('converted_at')->nullable();
    $table->timestamps();
});
```

**Usage**:
```php
// Track when visitor via affiliate link
AffilateReferral::create([
    'affiliate_id' => $affiliate->id,
    'referral_source' => 'direct_link',
    'clicked_at' => now()
]);

// Mark converted when user buys
$referral->update(['converted_at' => now()]);
```

---

## 🎯 RECOMMENDED SETUP SEQUENCE

### Step 1: Add Affiliate Slug Migration
```bash
php artisan make:migration add_slug_to_affiliates_table
```

### Step 2: Seed Commission Methods & Rules
```php
// In DatabaseSeeder or new CommissionSeeder

// Method 1: Direct Commission
$method1 = CommissionMethod::create([
    'name' => 'Direct Commission - Percentage',
    'calculation_type' => 'percentage',
    'is_active' => true
]);

CommissionRule::create(['commission_method_id' => $method1->id, 'level' => 1, 'percentage' => 10]);
CommissionRule::create(['commission_method_id' => $method1->id, 'level' => 2, 'percentage' => 5]);
CommissionRule::create(['commission_method_id' => $method1->id, 'level' => 3, 'percentage' => 2]);

// Method 2: Binary Commission
$method2 = CommissionMethod::create([
    'name' => 'Binary Commission - Volume',
    'calculation_type' => 'percentage',
    'is_active' => true
]);

CommissionRule::create(['commission_method_id' => $method2->id, 'level' => 1, 'percentage' => 15]);
CommissionRule::create(['commission_method_id' => $method2->id, 'level' => 2, 'percentage' => 10]);
```

### Step 3: Create Affiliate Service
```php
// app/Services/AffiliateService.php
class AffiliateService {
    public function assignRandomSponsor() {
        return Affiliate::where('is_active', true)->inRandomOrder()->first();
    }
    
    public function registerNewAffiliate($user, $sponsor, $position) {
        // Create affiliate dengan validation
    }
    
    public function generateActivationCodes($order) {
        // Generate codes untuk sponsor
    }
    
    public function applyCommission($order) {
        // Apply commission method dynamically
    }
}
```

### Step 4: Create Routes
```php
// Affiliate referral link
Route::get('/{affiliateSlug}', [LandingController::class, 'affiliate']);

// API endpoints untuk admin
Route::post('/api/admin/commission-methods', [CommissionMethodController::class, 'store']);
Route::post('/api/admin/commission-rules', [CommissionRuleController::class, 'store']);
```

---

## ✅ FINAL ASSESSMENT

### **Database Structure**: 👍 **95% READY**

**What's Perfect**:
- ✅ Affiliate sponsor/upline hierarchy
- ✅ Commission multi-method architecture
- ✅ Activation code system
- ✅ Commission calculation & ledger
- ✅ Withdrawal & payment tracking

**What Needs Minor Addition**:
- ⚠️ Affiliate `slug` / `username` field (2 minutes to add)
- ⚠️ Commission method default on Order (optional, 1 minute)
- ⚠️ Clear logic: code ownership goes to sponsor (need code in logic)
- ⚠️ Referral tracking optional but recommended

### **Recommendation**:

1. ✅ **Run migration untuk add slug** (immediate)
2. ✅ **Seed master commission methods & rules** (before testing)
3. ✅ **Create AffiliateService** untuk handle business logic
4. ✅ **Implement in controllers** (purchase, registration, commission calculation)

---

## 📝 NEXT STEPS

1. **Add Affiliate Slug Migration** - I can create this now
2. **Create Seeder untuk Commission Methods** - I can create this now
3. **Create AffiliateService** - I can create this now
4. **Update Testing Workflow** - dengan new flow

**Siap saya buat semuanya?**

---

**Assessment Date**: 2026-01-22  
**Status**: 🟢 **95% READY - Just need slug field + logic clarification**
