# MLM Commission System - Depth-Based Level Implementation

## 🎯 Penjelasan Sistem Komisi Level (Berjenjang)

Sistem komisi Level (**bukan berdasarkan rank/tier**) adalah komisi yang dihitung berdasarkan **kedalaman downline** (depth) dalam struktur MLM.

### Konsep Dasar

```
Struktur Affiliate:
├─ Abdul (Admin/Top)
│  ├─ Rana (Depth 1 dari Abdul)
│  │  └─ Ajeng (Depth 2 dari Abdul / Depth 1 dari Rana)
│  │     └─ Vita (Depth 3 dari Abdul / Depth 2 dari Rana)
│  └─ Budi (Depth 1 dari Abdul)
│     └─ Citra (Depth 2 dari Abdul)

SKENARIO PEMBELIAN:
Ketika Ajeng membeli dengan 300 points:

1. Rana (Depth 1 dari Ajeng) tidak dapat komisi (Rana adalah sponsor)
   ➜ Sebaliknya, Rana dapat komisi dari posisi Ajeng di tree

2. Ajeng membeli 300 points
   ├─ Rana (Upline Level 1): 300 * 5% = 15 points
   ├─ Abdul (Upline Level 2): 300 * 4% = 12 points
   ├─ [Upline Level 3]: 300 * 3% = 9 points (jika ada)
   └─ [Upline Level 4+]: sesuai rule

PENTING:
⚠️  Komisi dihitung ke UPLINE (parent), bukan ke downline
⚠️  Depth dihitung berdasarkan posisi dalam struktur tree (upline chain)
⚠️  Semakin dalam depth, semakin kecil komisi yang diterima
```

---

## 📐 Rumus Kalkulasi

### Formula Umum
```
Commission = Points × (Percentage untuk Depth N / 100)

Contoh:
Member membeli dengan kode aktivasi bernilai 300 points
Upline depth 1 dapat: 300 × (5 / 100) = 15 points
Upline depth 2 dapat: 300 × (4 / 100) = 12 points
Upline depth 3 dapat: 300 × (3 / 100) = 9 points
```

### Database Structure

```php
commission_rules table:
- method_id: FK ke commission_methods
- rule_name: Deskripsi rule (contoh: "Level Berjenjang - Template Standard")
- condition: JSON store (metadata konfigurasi)
- value: Legacy field (tidak digunakan untuk Level method)
- depth_percentages: ✅ JSON array - persentase per depth
  Contoh: {"1": 5, "2": 4, "3": 3, "4": 2, "5": 1}
- max_depth: Max depth yang dihitung komisi (default: 5)
- template_config: JSON store - detailed config untuk admin
  Contoh: {
    "description": "Komisi berjenjang standard 5 level",
    "levels": [
      {"depth": 1, "percentage": 5, "description": "Level 1 (Direct Upline)"},
      {"depth": 2, "percentage": 4, "description": "Level 2"},
      ...
    ]
  }
```

---

## 🎛️ Template System (Value Management)

Admin dapat **membuat dan mengkonfigurasi** berbagai template komisi:

### Contoh Template yang Tersedia

#### 1. Template Standard (Default)
```json
{
  "name": "Level Berjenjang - Template Standard",
  "max_depth": 5,
  "depth_percentages": {
    "1": 5,
    "2": 4,
    "3": 3,
    "4": 2,
    "5": 1
  }
}
```

#### 2. Template Agresif
```json
{
  "name": "Level Berjenjang - Template Agresif",
  "max_depth": 3,
  "depth_percentages": {
    "1": 10,
    "2": 5,
    "3": 2
  }
}
```

#### 3. Template Custom (Contoh Bisnis Lain)
```json
{
  "name": "Level Berjenjang - Template Heavy Top",
  "max_depth": 7,
  "depth_percentages": {
    "1": 8,
    "2": 6,
    "3": 4,
    "4": 3,
    "5": 2,
    "6": 1,
    "7": 0.5
  }
}
```

---

## 🔧 CRUD Commission Methods & Rules

### Admin dapat:

#### ✅ 1. Membuat Commission Method Baru
```
POST /admin/commission-methods
{
  "name": "Level Custom",
  "description": "Komisi dengan struktur 7 level",
  "calculation_type": "tier_based",
  "is_active": true
}
```

#### ✅ 2. Membuat Commission Rule Baru (Template)
```
POST /admin/commission-rules
{
  "method_id": 2,  // FK ke Level method
  "rule_name": "Level Berjenjang - 7 Level Custom",
  "condition": { "template": "custom", "max_depth": 7 },
  "value": 0,  // Tidak digunakan
  "depth_percentages": {
    "1": 8,
    "2": 6,
    "3": 4,
    "4": 3,
    "5": 2,
    "6": 1,
    "7": 0.5
  },
  "max_depth": 7,
  "template_config": {
    "description": "Komisi berjenjang 7 level dengan distribusi ke atas",
    "levels": [
      {"depth": 1, "percentage": 8},
      {"depth": 2, "percentage": 6},
      ...
    ]
  },
  "priority": 3,
  "is_active": true
}
```

#### ✅ 3. Edit Commission Rule (Update Template)
```
PUT /admin/commission-rules/{id}
// Update depth_percentages, max_depth, template_config
```

#### ✅ 4. Activate/Deactivate Template
```
PUT /admin/commission-rules/{id}
{
  "is_active": false  // Disable template ini
}
```

#### ✅ 5. Delete Commission Rule
```
DELETE /admin/commission-rules/{id}
```

---

## 🌳 MLM Tree Visualization

### Fitur Pohon Binary (MLM Tree)

Menu `/admin/mlm-tree` menampilkan:

```
Abdul Account
├─ Struktur downline visual (tree format)
├─ Informasi setiap affiliate:
│  ├─ Nama & Username
│  ├─ Level (kedalaman)
│  ├─ Position (left/right/* none)
│  ├─ Direct downline count
│  ├─ Total downline
│  └─ Total volume penjualan
├─ Search & Filter downline
└─ Detail affiliate (klik untuk lihat stats)
```

### Restricted View (Security)
- **Admin hanya bisa melihat downline mereka sendiri**
- Tidak ada akses ke struktur affiliate lain
- Jika admin tidak terdaftar sebagai affiliate → tidak ada tree data

### Struktur Tree Logic
```
/admin/mlm-tree
├─ GET: Tampilkan tree dari user authenticated
│  └─ Recursive build dari affiliate.upline chain
└─ GET /admin/mlm-tree/{affiliateId}: Detail affiliate
   └─ Verify authorization (upline check)
```

---

## 💾 Database Implementation

### Migration Structure
```sql
commission_rules table - NEW COLUMNS:
├─ depth_percentages JSON
│  └─ Menyimpan {"1": 5, "2": 4, ...}
├─ max_depth INTEGER
│  └─ Max level yang dihitung (default 5)
└─ template_config JSON
   └─ Detailed config untuk display & admin management

affiliate table (existing):
├─ user_id (FK)
├─ upline_id (FK) ⬅️ PENTING untuk trace depth
├─ sponsor_id (FK) ⬅️ Original sponsor
├─ position (left/right/none)
└─ level (kedalaman dari tree root)
```

### Seeder Default Data
```php
CommissionMethodSeeder:
├─ Commission Method: "Sponsor"
├─ Commission Method: "Level" ⬅️ UPDATED dengan depth templates
├─ Commission Method: "Matching"

Template Rules untuk Level:
├─ Level Berjenjang - Template Standard (ACTIVE)
└─ Level Berjenjang - Template Agresif (DISABLED)
```

---

## 🚀 Implementation Flow

### 1. Saat Member Membeli (Order Created)
```
Order Created Event
├─ Extract activation_code.value (points)
├─ Get member affiliate profile
├─ Trigger commission calculation:
│  ├─ Sponsor: Calculate dari sponsor_id
│  ├─ Level: Calculate dari upline chain ⬅️ NEW
│  └─ Matching: Calculate dari volume legs
├─ Record ke commission table
└─ Update affiliate.total_volume
```

### 2. Commission Calculation untuk Level Method
```php
$service->calculateDepthBasedCommission(
    rule: $levelRule,  // Rule dengan depth_percentages
    points: 300,       // Dari activation code
    memberId: $ajeng->id
);

// Returns:
{
  "$rana->id": [
    "affiliate_id" => $rana->id,
    "depth" => 1,
    "percentage" => 5,
    "amount" => 15,  // 300 * 5%
  ],
  "$abdul->id": [
    "affiliate_id" => $abdul->id,
    "depth" => 2,
    "percentage" => 4,
    "amount" => 12,  // 300 * 4%
  ],
  ...
}
```

### 3. MLM Tree Display
```
/admin/mlm-tree
├─ Auth check: User auth check
├─ Query affiliate tree:
│  └─ Affiliate.find(user.affiliate_id)
│     └─ Load downlines recursive
├─ Build tree structure (JSON)
└─ Pass to React component
   └─ Render tree visualization
```

---

## 🔄 Comparison: Old vs New

| Aspek | Old System | New System |
|-------|-----------|-----------|
| **Level Method** | Rank-based (Bronze/Silver/Gold) | Depth-based (berjenjang) |
| **Kalkulasi** | Dari user status/rank | Dari upline chain depth |
| **Template** | Single hardcoded rule | Multiple configurable rules |
| **Admin Control** | Limited | Full flexibility |
| **Komisi per Depth** | N/A | Definable per template |
| **MLM Tree** | N/A | ✅ Full visualization |

---

## 📝 Frontend Pages Updated

### 1. Commission Methods Index
- List semua methods (Sponsor, Level, Matching)
- Create/Edit/Delete method

### 2. Commission Rules Index
- List all rules untuk selected method
- Show depth_percentages di table
- Create/Edit/Delete rule dengan depth config

### 3. MLM Tree Page (NEW)
- Visualisasi tree struktur
- Expandable nodes
- Affiliate detail preview
- Only downline view

---

## 🧪 Testing Commission Calculation

### Manual Test di Tinker
```bash
php artisan tinker

>>> use App\Services\CommissionCalculationService;
>>> $service = new CommissionCalculationService();

// Test depth-based calculation
>>> $rule = \App\Models\CommissionRule::where('method_id', 2)->first();
>>> $commissions = $service->calculateDepthBasedCommission($rule, 300, $ajeng->id);
>>> dd($commissions);

// Check affiliate tree
>>> $abdul = \App\Models\Affiliate::find(1);
>>> $tree = $abdul->downlines;  // Recursive?
```

---

## 🎯 Key Points

1. **Level Method = Downline Depth Based**
   - Komisi dihitung dari upline chain
   - Semakin dalam, semakin kecil persentase

2. **Template System = Flexible Admin Control**
   - Admin bisa set berapa level (3, 5, 7, etc)
   - Admin bisa set persentase tiap level
   - Multiple templates bisa ada (switch dengan priority)

3. **MLM Tree = Visualization & Monitoring**
   - Admin lihat struktur downline mereka
   - Hanya authorized downlines
   - Real-time tree structure

4. **Database = Flexible JSON Columns**
   - `depth_percentages` untuk define %
   - `max_depth` untuk limit kedalaman
   - `template_config` untuk UI enhancement

---

## 🔧 Variable Names (untuk Admin Customization)

Ketika admin membuat template baru, bisa gunakan:

```json
{
  "depth": 1,          // Kedalaman level
  "percentage": 5,     // Persentase komisi
  "min_volume": 0,     // Optional: minimum volume requirement
  "note": "Direct sponsor gets 5%"
}
```

---

**Last Updated**: 11 Februari 2026
**Status**: ✅ READY FOR IMPLEMENTATION
