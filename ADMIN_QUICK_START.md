# 🚀 Admin System - Quick Start Guide

## 📋 Pre-requisites Check

Pastikan sudah menyiapkan:
```bash
✅ PHP 8.2+
✅ Laravel 12
✅ Node.js & npm
✅ Database (MySQL/PostgreSQL)
```

---

## ⚡ Setup Cepat (5 Menit)

### 1️⃣ Database & Migration
```bash
# Clear dan fresh install
php artisan migrate:fresh --seed

# Output yang diharapkan:
# ✓ Drop all tables
# ✓ Migrate database
# ✓ Seed database
# ✓ Commission methods: Sponsor, Level, Matching
```

### 2️⃣ Cache Clear
```bash
php artisan cache:clear && php artisan route:clear && php artisan view:clear
```

### 3️⃣ Frontend Build
```bash
npm run dev   # untuk development
# atau
npm run build # untuk production
```

### 4️⃣ Verify Routes
```bash
php artisan route:list | grep admin

# Pastikan routes yang penting ada:
# GET|HEAD  /admin/dashboard ................................. admin.dashboard
# GET|HEAD  /admin/products .................................. admin.products.index
# GET|HEAD  /admin/commission-methods ........................ admin.commission-methods.index
# GET|HEAD  /admin/commission-rules .......................... admin.commission-rules.index
```

---

## 🔑 Access Admin Panel

1. **Login** dengan email: `test@example.com`
2. Navigate ke: `http://localhost:8000/admin/dashboard`
3. Pastikan sidebar menampilkan menu admin dengan items:
   - ✅ Master Data (Produk, Komisi Method, Komisi Rule, Plan)
   - ✅ Manajemen Affiliate
   - ✅ Keuangan (Penarikan, Laporan Pembayaran)
   - ✅ Notifikasi
   - ✅ Pusat Laporan (5 jenis laporan)
   - ✅ Manajemen User

---

## ✅ Checklist Verifikasi

### Database
- [ ] `commission_methods` table punya 3 records (Sponsor, Level, Matching)
- [ ] `commission_rules` table punya 11 records
- [ ] Setiap method punya rules dengan priority urut

### Pages
- [ ] Semua menu admin bisa diklik ( tidak 404)
- [ ] Search input functionalnya bekerja
- [ ] Pagination tampil di index pages
- [ ] Create/Edit forms render dengan baik
- [ ] Report pages tampil dengan summary cards + table

### API Endpoints
```bash
# Test commission methods
curl http://localhost:8000/admin/commission-methods

# Test commission rules  
curl http://localhost:8000/admin/commission-rules

# Test products
curl http://localhost:8000/admin/products
```

---

## 🔧 Troubleshooting

### 1. "Class not found" errors
```bash
# Regenerate autoload
composer dumpautoload -o
```

### 2. Routes tidak terdaftar
```bash
php artisan route:cache
# Cek:
php artisan route:list | grep admin
```

### 3. Frontend pages tidak render
```bash
# Rebuild assets
npm run dev
# Pastikan Vite dev server running
```

### 4. CORS / Permission issues
```bash
# Check .env untuk APP_URL
APP_URL=http://localhost:8000

# Restart dev server
```

---

## 📊 Test Commission Calculation

### Manual Test di Tinker
```bash
php artisan tinker

# 1. Load service
>>> use App\Services\CommissionCalculationService;
>>> $service = new CommissionCalculationService();

# 2. Calculate commission untuk Sponsor method (value=5%)
>>> $commission = $service->calculateCommission(1, 200, null);
// 200 * (5/100) = 10

# 3. Get member level
>>> $level = $service->getMemberLevelByPoints(1500);
// 'Gold'

# 4. Exit tinker
>>> exit
```

---

## 🎯 Menu Structure Reference

```
ADMIN DASHBOARD
├── Master Data
│   ├── Master Produk (/admin/products)
│   ├── Metode Komisi (/admin/commission-methods)
│   ├── Rule Komisi (/admin/commission-rules)
│   └── Pengaturan Plan (/admin/plan-setting)
├── Manajemen Affiliate (/admin/affiliates)
├── Keuangan
│   ├── Penarikan Dana (/admin/withdrawals)
│   └── Laporan Pembayaran (/admin/payout-report)
├── Notifikasi (/admin/notifications)
├── Pusat Laporan
│   ├── Laporan Penjualan (/admin/reports/LaporanPenjualan)
│   ├── Laporan Affiliate (/admin/reports/LaporanAffiliate)
│   ├── Laporan Komisi (/admin/reports/LaporanKomisi)
│   ├── Laporan Keuangan (/admin/reports/LaporanKeuangan)
│   └── Laporan Produk (/admin/reports/LaporanProduk)
└── Manajemen User (/admin/UsersRole)
```

---

## 📝 Default Commission Methods

### 1. Sponsor (Sponsor)
Komisi dari sponsor langsung ketika member melakukan pembelian
- Level 1: **5%**
- Level 2: **2.5%**
- Level 3: **1.25%**

### 2. Level (Level)
Komisi berdasarkan level/status member
- Bronze (100-499 points): **3%**
- Silver (500-1499 points): **5%**
- Gold (1500-4999 points): **8%**
- Diamond (5000+ points): **12%**

### 3. Matching (Matching)
Komisi dari performa matching downline
- 1 Level Down: **3%**
- 3 Level Down: **2%**
- 5 Level Down: **1%**

---

## 🔗 Useful Links

- **Admin Dashboard**: `http://localhost:8000/admin/dashboard`
- **Products**: `http://localhost:8000/admin/products`
- **Commission Methods**: `http://localhost:8000/admin/commission-methods`
- **Commission Rules**: `http://localhost:8000/admin/commission-rules`
- **Laporan Penjualan**: `http://localhost:8000/admin/reports/LaporanPenjualan`

---

## 📞 Common Commands

```bash
# Start dev server
php artisan serve

# Vite dev server (di terminal lain)
npm run dev

# Run migrations only
php artisan migrate

# Run seeder only
php artisan db:seed --class=CommissionMethodSeeder

# Reset everything
php artisan migrate:fresh --seed

# Check routes
php artisan route:list

# Optimize (production)
php artisan optimize

# Clear all cache
php artisan optimize:clear
```

---

## ✨ Status

| Feature | Status |
|---------|--------|
| Admin Routes | ✅ Complete |
| Dashboard | ✅ Complete |
| Master Data Pages | ✅ Complete |
| Commission System | ✅ Complete |
| Report Pages | ✅ Complete |
| Sidebar Navigation | ✅ Complete |
| Search & Filter | ✅ Complete |
| Pagination | ✅ Complete |

**Overall Status**: 🟢 **READY FOR PRODUCTION**

---

**Tanggal Pembaruan**: 11 Februari 2026  
**Version**: 1.0.0  
**Maintained By**: Development Team
