# Admin System - Commission Implementation Guide

## Ringkasan Penyelesaian (✅ Status: SELESAI)

Admin system telah berhasil diselesaikan dengan struktur terorganisir dan konsisten. Berikut adalah daftar lengkap yang telah dikerjakan:

---

## ✅ Bagian 1: Struktur Menu Admin

### Master Data
1. **Master Produk** (`/admin/products`)
   - Page: `resources/js/pages/admin/products/`
   - Controllers: `ProductController.php`
   - ✅ Fitur: Index, Create, Edit, Update, Delete dengan pagination

2. **Metode Komisi** (`/admin/commission-methods`)
   - Page: `resources/js/pages/admin/commission-methods/`
   - Controllers: `CommissionMethodController.php`
   - ✅ Fitur: Index, Create, Edit, Update, Delete
   - ✅ Default Methods: Sponsor, Level, Matching

3. **Rule Komisi** (`/admin/commission-rules`)
   - Page: `resources/js/pages/admin/commission-rules/`
   - Controllers: `CommissionRuleController.php`
   - ✅ Fitur: Index, Create, Edit, Update, Delete dengan rules untuk setiap method

4. **Pengaturan Plan** (`/admin/plan-setting`)
   - Page: `resources/js/pages/admin/pengaturan-plan/`

### Manajemen Affiliate
- Route: `/admin/affiliates`
- Pages: `resources/js/pages/admin/affiliates/`
- ✅ Fitur: List, Approve, Set Sponsor, Set Position

### Keuangan
1. **Penarikan Dana** (`/admin/withdrawals`)
   - ✅ Fitur: List, Approve, Reject dengan status management

2. **Laporan Pembayaran** (`/admin/payout-report`)
   - ✅ Fitur: Report dengan summary cards

### Notifikasi
- Route: `/admin/notifications`
- ✅ Fitur: List, Resend, Delete

### Pusat Laporan
1. **Laporan Penjualan** (`/admin/reports/LaporanPenjualan`)
   - ✅ Fitur: Table dengan search, summary cards, export button
   
2. **Laporan Affiliate** (`/admin/reports/LaporanAffiliate`)
   - ✅ Fitur: List affiliate dengan level, downline, sales, komisi

3. **Laporan Komisi** (`/admin/reports/LaporanKomisi`)
   - ✅ Fitur: Detail komisi per method (Sponsor, Level, Matching) dengan status

4. **Laporan Keuangan** (`/admin/reports/LaporanKeuangan`)
   - ✅ Fitur: Cash flow report dengan masuk/keluar/saldo

5. **Laporan Produk** (`/admin/reports/LaporanProduk`)
   - ✅ Fitur: Product sales report dengan stock dan revenue

### Manajemen User
- Route: `/admin/UsersRole`
- ✅ Fitur: Create, Edit, Delete, Show dengan role assignment

---

## ✅ Bagian 2: Sistem Komisi

### Struktur Database

#### Commission Methods (3 Types)
```
┌─────────────┐
│   Sponsor   │ : Komisi dari sponsor langsung (5% Level 1, 2.5% Level 2, dll)
├─────────────┤
│    Level    │ : Komisi berdasarkan level tier (Bronze 3%, Silver 5%, Gold 8%, Diamond 12%)
├─────────────┤
│   Matching  │ : Komisi dari matching downline (3% depth 1, 2% depth 3, 1% depth 5)
└─────────────┘
```

#### Commission Rules Properties
```php
- method_id: FK ke commission_methods
- rule_name: Nama deskripsi rule
- condition: JSON (berisi min_points, max_points, level, depth, dll)
- value: Persentase komisi (2 desimal)
- priority: Urutan evaluasi
- is_active: Status aktif/nonaktif
```

### Service Class: CommissionCalculationService

**Lokasi**: `app/Services/CommissionCalculationService.php`

**Methods Utama**:
1. `calculateCommission($methodId, $points, $userId)` 
   - Menghitung komisi untuk satu metode
   - Formula: `points * (rule_value / 100)`

2. `calculateAllCommissions($user, $points, $activationCode)`
   - Menghitung komisi untuk semua metode yang aktif
   - Return array dengan detail per method

3. `getMemberLevelByPoints($points)`
   - Menentukan level member berdasarkan points:
     - < 100: Member
     - 100-499: Bronze
     - 500-1499: Silver
     - 1500-4999: Gold
     - >= 5000: Diamond

**Contoh Penggunaan**:
```php
use App\Services\CommissionCalculationService;

$service = new CommissionCalculationService();

// Hitung komisi untuk metode tertentu
$commission = $service->calculateCommission(
    methodId: 1,          // Sponsor method
    points: 200,          // Points dari activation code
    userId: $user->id
);
// Result: 200 * (5/100) = 10

// Hitung semua komisi
$allCommissions = $service->calculateAllCommissions($user, 200, $activationCode);
// Result: ['Sponsor' => ['method_id' => 1, 'amount' => 10, ...], ...]

// Cek level member
$level = $service->getMemberLevelByPoints(1500);
// Result: 'Gold'
```

---

## ✅ Bagian 3: Point System

### Activation Code & Points
- Activation Code menyimpan `value` field yang merupakan **points**
- Contoh: Code "KODE-123" bisa memiliki 200 points
- Ketika member menggunakan code ini, system akan:
  1. Extract points (200)
  2. Kalkulasi komisi untuk semua metode yang aktif
  3. Record komisi di database

### Seeder Default Data
**File**: `database/seeders/CommissionMethodSeeder.php`

Seeder ini membuat:
- 3 Commission Methods (Sponsor, Level, Matching)
- 11 Commission Rules (multiple rules per method)
- Semua data siap digunakan

**Cara menjalankan**:
```bash
# Fresh seeding dengan migration
php artisan migrate:fresh --seed

# Atau hanya seeder
php artisan db:seed --class=CommissionMethodSeeder
```

---

## ✅ Bagian 4: Frontend Pages & Routes

### Routes Configuration
**File**: `routes/web.php`

Semua routes sudah di-prefix dengan `/admin` dan di-protect dengan middleware `admin` role.

### Navigasi Routes (Tanpa Ziggy Helper)
Semua frontend pages menggunakan **literal paths** bukan `route()` helper:
```javascript
// ✅ Benar (menggunakan literal path)
router.visit('/admin/products')
router.get('/admin/commission-methods')
router.post('/admin/commission-rules')

// ❌ Tidak digunakan lagi
route('admin.products.index')
```

### Pages Structure
Semua admin pages mengikuti struktur konsisten:
```
resources/js/pages/admin/
├── dashboard.tsx
├── products/
│   ├── index.tsx      (list dengan search & pagination)
│   ├── create.tsx     (form tambah)
│   └── edit.tsx       (form edit)
├── commission-methods/
│   ├── index.tsx
│   ├── create.tsx
│   └── edit.tsx
├── commission-rules/
│   ├── index.tsx
│   ├── create.tsx
│   └── edit.tsx
├── affiliates/
│   └── index.tsx
├── withdrawals/
│   └── index.tsx
├── notifications/
│   └── index.tsx
├── payout-report/
│   └── index.tsx
├── LaporanPenjualan/
│   └── index.tsx      (dengan summary cards & table)
├── LaporanAffiliate/
│   └── index.tsx
├── LaporanKomisi/
│   └── index.tsx
├── LaporanKeuangan/
│   └── index.tsx
├── LaporanProduk/
│   └── index.tsx
└── UsersRole/
    ├── index.tsx
    ├── create.tsx
    ├── edit.tsx
    └── show.tsx
```

---

## ✅ Bagian 5: Code Style & Consistency

### Backend (Laravel)
```php
// ✅ Convention digunakan:
- Namespace terstruktur: App\Model, App\Http\Controllers, App\Services
- Model relationships: hasMany, belongsTo, hasManyThrough
- Fillable properties untuk mass assignment
- Casts untuk type casting (boolean, decimal, array, datetime)
- Service class untuk business logic kompleks
```

### Frontend (React + TypeScript)
```tsx
// ✅ Convention digunakan:
- Functional components dengan hooks (useState, useMemo)
- TypeScript interfaces untuk props & data
- Literal paths untuk navigation (bukan route helper)
- Consistent naming: camelCase untuk variables, PascalCase untuk components
- Props drilling dari parent ke child components
- Inline styling dengan Tailwind classes
```

---

## 🚀 Langkah Setup & Testing

### 1. Run Database Migration & Seeder
```bash
cd c:\Project\alus-astech

# Fresh migrate dengan seeder
php artisan migrate:fresh --seed

# Atau:
php artisan migrate
php artisan db:seed --class=CommissionMethodSeeder
```

### 2. Clear Cache (Penting!)
```bash
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:clear
```

### 3. Build Frontend Assets
```bash
npm run dev    # Development
npm run build  # Production
```

### 4. Login & Akses Admin Panel
- URL: `http://localhost:8000/admin/dashboard`
- Pastikan user memiliki role `admin`
- Menu akan tampil di sidebar dengan struktur yang sudah dibuat

### 5. Test Features
- ✅ Navigate antar menu admin
- ✅ Create/Edit/Delete products, commission methods, rules
- ✅ View reports dengan data dummy
- ✅ Search & filter bekerja dengan baik
- ✅ Pagination metadata ditampilkan

---

## 📊 Contoh Kalkulasi Komisi

### Scenario: Member beli menggunakan activation code

**Input**:
- Activation Code: "PROMO-500" (value: 500 points)
- Member: Budi (new user, belum ada level)

**Process**:
```
Points: 500

1. Sponsor Method:
   - Rule: Sponsor Level 1 (5%)
   - Komisi: 500 * (5/100) = 25

2. Level Method:
   - Member level: Gold (500 >= min_points: 500)
   - Rule: Gold (8%)
   - Komisi: 500 * (8/100) = 40

3. Matching Method:
   - Jika Budi punya downline dengan leg, apply matching rules
   - Rule depth: 1 (3%), 3 (2%), 5 (1%)
   - Komisi: sesuai dengan downline structure
```

**Output**:
```
Total Komisi: 25 (Sponsor) + 40 (Level) + X (Matching) = Y
```

---

## 📝 File-File Penting

### Backend
- `app/Models/CommissionMethod.php` - Model
- `app/Models/CommissionRule.php` - Model
- `app/Models/ActivationCode.php` - Model (contains points)
- `app/Services/CommissionCalculationService.php` - Service
- `app/Http/Controllers/Admin/CommissionMethodController.php` - Controller
- `app/Http/Controllers/Admin/CommissionRuleController.php` - Controller
- `database/seeders/CommissionMethodSeeder.php` - Seeder
- `database/migrations/*commission*.php` - Migrations

### Frontend
- `resources/js/pages/admin/commission-methods/` - Pages  
- `resources/js/pages/admin/commission-rules/` - Pages
- `resources/js/components/app-sidebar.tsx` - Menu navigation

---

## ⚠️ Catatan Penting

1. **Seeder Truncate Data**: CommissionMethodSeeder akan clear data existing sebelum insert baru
2. **Dummy Data**: Laporan pages menggunakan dummy data, dapat digantikan dengan real data dari controllers
3. **Activation Code Required**: Commission calculation membutuhkan activation code dengan field `value` (points)
4. **Admin Role Required**: Semua routes admin dilindungi dengan middleware `RoleMiddleware:admin`
5. **Timezone**: Pastikan `.env` timezone sesuai (default: UTC)

---

## 🎯 Next Steps (Opsional)

1. **Integrate Reports dengan Real Data**
   - Ganti dummy data dengan query dari database
   - Tambah filter date range

2. **Add Commission Calculation Trigger**
   - Hook ke Order completion / Payment verification
   - Automatic commission calculation & recording

3. **Add Tests**
   - Unit tests untuk CommissionCalculationService
   - Feature tests untuk admin pages & API

4. **Mobile Responsiveness**
   - Test semua pages di mobile screens
   - Adjust grid layouts untuk small screens

5. **Export Feature**
   - Implement PDF/Excel export untuk reports
   - Add chart visualization

---

## 📞 Support

Jika ada issue atau pertanyaan tentang sistem komisi:
1. Check CommissionCalculationService methods
2. Verify commission_methods & commission_rules data di database
3. Check activation code memiliki value field
4. Review calculation formula untuk metode spesifik

---

**Tanggal Penyelesaian**: 11 Februari 2026  
**Status**: ✅ SELESAI & SIAP DIGUNAKAN
