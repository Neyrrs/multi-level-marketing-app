# 🎯 ANALISIS AKTIVASI PANEL AFFILIATE - TERSTRUKTUR

**Tanggal:** 13 Februari 2026  
**Status:** DALAM PROSES  
**Objective:** Mengaktifkan semua menu affiliate dengan backend yang lengkap

---

## 📑 DAFTAR MENU AFFILIATE & STATUS

| # | Menu | File | Controller | Model | Service | Status | Priority |
|---|------|------|-----------|-------|---------|--------|----------|
| 1 | Dashboard | `dashboard.tsx` | BinaryController? | - | - | ❌ Template | ⭐⭐⭐ |
| 2 | Belanja/Shop | `belanja/index.tsx` | - | - | - | ❌ Empty | ⭐⭐⭐ |
| 3 | Binary/Pohon Kiri/Kanan | `binary/index.tsx` | BinaryController | Affiliate,MlmTree | BinaryService? | ❌ Empty | ⭐⭐⭐ |
| 4 | Downline | `downline/index.tsx` | DownlineController | Affiliate | AffiliateService | ⚠️ Partial | ⭐⭐ |
| 5 | Generation RO | `generation-ro/index.tsx` | GeneraionController | Affiliate,Order | CommissionService | ❌ Missing | ⭐ |
| 6 | Kode Aktivasi | `kode/index.tsx` | KodeController | ActivationCode | ActivationService | ❌ Empty | ⭐⭐⭐ |
| 7 | Komisi | `komisi/index.tsx` | KomisiController | Commission | CommissionService | ⚠️ Partial | ⭐⭐⭐ |
| 8 | Matching Bonus | `matching-bonus/index.tsx` | MatchingController | MatchingHistory | CommissionService | ❌ Empty | ⭐⭐ |
| 9 | Pengaturan | `pengaturan/index.tsx` | PengaturanController | UserProfile | UserProfileService | ❌ Empty | ⭐ |
| 10 | Personal RO | `personal-ro/index.tsx` | PersonalController | Affiliate,Order | CommissionService | ⚠️ Partial | ⭐ |
| 11 | Pin History | `pin-history/index.tsx` | PinHistoryController | OrderActivationCode | OrderService | ⚠️ Template | ⭐ |
| 12 | Pin List | `pin-list/index.tsx` | PinListController | ActivationCode | ActivationService | ⚠️ Template | ⭐⭐ |
| 13 | Redeem | `redeem/index.tsx` | ReedemController | ? | ? | ❌ Empty | ⭐ |
| 14 | Reward | `reward/index.tsx` | ProductController | Product | ProductService | ⚠️ Dummy | ⭐ |
| 15 | Shop | `shop/index.tsx` | ShopController | Cart,CartItem | OrderService | ⚠️ Dummy | ⭐⭐⭐ |
| 16 | Shop History | `shop-history/index.tsx` | ShopHistoryController | Order | OrderService | ⚠️ Dummy | ⭐⭐⭐ |
| 17 | Sponsor Tree | `sponsor/index.tsx` | SponsorController | Affiliate | AffiliateService | ❌ Missing | ⭐⭐ |
| 18 | Network Tree | `tree/index.tsx` | TreeController | Affiliate,MlmTree | AffiliateService | ⚠️ Partial | ⭐⭐⭐ |

---

## 📊 MODEL SUMMARY

### ✅ Models yang Sudah Ada:
- `Affiliate` - Struktur MLM (sponsor_id, upline_id, position, level, left_count, right_count, pair_count)
- `Order` - Pesanan & pembayaran
- `OrderItem` - Item dalam order
- `OrderActivationCode` - Link order ke activation code
- `ActivationCode` - Kode aktivasi untuk affiliate baru
- `Commission` - Komisi affiliate
- `CommissionCalculation` - Kalkulasi detail komisi
- `CommissionLedger` - Ledger transaksi komisi
- `BinaryPayout` - Payout dari binary matching
- `MatchingHistory` - History matching bonus
- `Cart` - Shopping cart
- `CartItem` - Items dalam cart
- `WithdrawalPolicy` - Kebijakan withdrawal
- `Withdrawal` - Withdrawal affiliate
- `WithdrawalHistory` - History withdrawal
- `UserProfile` - Profile tambahan user
- `Product` - Produk untuk dijual
- `MlmTree` - Tree structure data
- `AffiliateBankAccount` - Bank account affiliate

### ⚠️ Models Yang Perlu Ditambah atau Diperbaiki:
- `Pin` Model (untuk tracking PIN secara terpisah?)
- Engagement/Activity model untuk tracking aktivitas affiliate

---

## 🔧 SERVICE SUMMARY

### ✅ Services yang Sudah Ada:
1. **AffiliateService** - Basic affiliate operations
2. **CommissionService** - Commission calculations
3. **CommissionCalculationService** - Detailed commission math
4. **OrderService** - Order operations
5. **ActivationService** - Activation code operations
6. **UserProfileService** - User profile management

### ❌ Services yang Perlu Dibuat:
1. **BinaryService** - Manage binary tree operations (left/right positioning)
2. **PinService** - Manage activation PIN operations
3. **MatchingBonusService** - Calculate and track matching bonuses
4. **GenerationRewardService** - Calculate generation-based rewards
5. **WithdrawalService** - Manage withdrawal operations
6. **ShoppingService** - Shopping cart operations & checkout
7. **ReportService** - Generate various reports

---

## 🔌 ROUTES MAPPING

### Current Routes (dari web.php):
```
GET  /affiliate/dashboard          → dashboard.tsx
GET  /affiliate/binary             → binary/index.tsx (BinaryController)
GET  /affiliate/komisi             → komisi/index.tsx (KomisiController)
GET  /affiliate/kode               → kode/index.tsx (KodeController)
GET  /affiliate/pengaturan         → pengaturan/index.tsx (PengaturanController)
GET  /affiliate/personal           → personal-ro/index.tsx (PersonalController)
GET  /affiliate/downline           → downline/index.tsx (DownlineController)
GET  /affiliate/tree               → tree/index.tsx (TreeController)
GET  /affiliate/shop               → shop/index.tsx (ShopController)
GET  /affiliate/shop-history       → shop-history/index.tsx (ShopHistoryController)
GET  /affiliate/pin-list           → pin-list/index.tsx (PinListController)
GET  /affiliate/pin-history        → pin-history/index.tsx (PinHistoryController)
GET  /affiliate/generation-ro      → generation-ro/index.tsx (GeneraionController)
GET  /affiliate/personal-ro        → personal-ro/index.tsx (PersonalController)
GET  /affiliate/matching-bonus     → matching-bonus/index.tsx (MatchingController)
GET  /affiliate/sponsor            → sponsor/index.tsx (SponsorController)
GET  /affiliate/reward             → reward/index.tsx (ProductController)
POST /affiliate/redeem             → ? (ReedemController)
```

### Routes Yang Perlu Ditambah (untuk data & operations):
```
POST /affiliate/shop/add-to-cart           → Add item to cart
POST /affiliate/shop/remove-from-cart      → Remove item from cart
POST /affiliate/shop/checkout              → Process checkout
GET  /affiliate/downline?search=&perPage=  → List downline dengan pagination
GET  /affiliate/pin-list?search=&perPage=  → List activation codes
POST /affiliate/pin-history                → Track PIN usage history
GET  /affiliate/komisi?status=&month=      → Commission list with filters
POST /affiliate/redeem/{id}                → Redeem activation code
GET  /affiliate/tree/structure             → Get tree data untuk visualisasi
GET  /affiliate/binary/structure           → Get binary tree structure
```

---

## 📋 IMPLEMENTATION FLOW (PER MENU)

### FLOW 1: Dashboard Affiliate
**Objectives:** Show summary statistics

**Required Data:**
- Total earnings this month
- Total affiliate downline
- Binary tree status (left/right count)
- Recent commissions
- Pending withdrawals
- Notifications

**Backend:**
- Controller: Implement `index()` with dashboard stats
- Service: Create `DashboardStatisticsService` or use existing services
- Query: Aggregate commissions, orders, affiliates

**Frontend:**
- Props: Pass `{ stats: {...}, recentCommissions: [...], notifications: [...] }`
- Display: Charts, cards showing key metrics

---

### FLOW 2: Shop / Belanja
**Objectives:** Affiliate bisa lihat products & add to cart

**Required Data:**
- Product listing (with pagination, search, filters)
- Cart contents
- Cart totals

**Backend:**
- Model: Product (sudah ada), Cart (sudah ada)
- Controller: ShopController implement `index()` to show products
- Routes: POST `/affiliate/shop/add-to-cart`, POST `/affiliate/shop/remove-from-cart`
- Service: ShoppingService untuk manage cart operations

**Frontend:**
- Display: ProductCard component showing images, prices, points, pins
- Actions: Add to cart, view details

---

### FLOW 3: Binary / Pohon MLM
**Objectives:** Show left/right tree structure

**Required Data:**
- Current user position (left/right)
- First level downline (left, right)
- Tree depth visualization
- Count stats (left volume, right volume, pair count)

**Backend:**
- Model: Affiliate (sudah ada fields: position, left_count, right_count, left_volume, right_volume)
- Controller: BinaryController implement tree structure query
- Service: BinaryService untuk construct tree data
- Query: Get current affiliate + immediate children + counts

**Frontend:**
- Display: Tree visualization component
- Show: Position, counts, volumes, status (active/inactive)

---

### FLOW 4: Downline / Daftar Downline
**Objectives:** List all downline affiliates with details

**Required Data:**
- Downline list (with pagination, search, filters)
- Per downline: name, username, level, position, status, join date, activity
- Total downline count

**Backend:**
- Controller: DownlineController implement `index(Request $request)` with search/pagination
- Service: AffiliateService get downlines by direct_downline
- Query: Paginate with search, order by recent
- Response: Pass array of downlines to frontend

**Frontend:**
- Display: Table with columns (name, username, level, position, status, date)
- Features: Search, pagination, sort

---

### FLOW 5: Kode Aktivasi
**Objectives:** Affiliate lihat PIN/activation codes yang dimiliki

**Required Data:**
- List of activation codes owned by affiliate
- Status per code (available, used, expired)
- Product info per code
- Usage details

**Backend:**
- Model: ActivationCode (owner_id, used_by, status)
- Controller: KodeController implement `index()` 
- Service: ActivationService get codes by owner_id
- Query: List codes owned by current affiliate

**Frontend:**
- Display: Table showing code, product, status, date_generated
- Actions: View, copy code, share

---

### FLOW 6: Komisi / Commission
**Objectives:** Track commissions earned

**Required Data:**
- Commission list (with filters: date range, status, type)
- Commission details (amount, type, source order, commission_type, status)
- Commission totals (pending, approved, paid)

**Backend:**
- Model: Commission (sudah ada)
- Controller: KomisiController implement `index()` with filters
- Service: CommissionService with filtering & pagination
- Query: Filter by status, date range, type

**Frontend:**
- Display: Table with commission details
- Summary: Total pending, approved, paid
- Actions: View details, request withdrawal

---

### FLOW 7: Matching Bonus
**Objectives:** View matching bonus calculations

**Required Data:**
- Matching history (left volume, right volume, matched pair count)
- Calculation details (bonus per pair)
- Payment status

**Backend:**
- Model: MatchingHistory (sudah ada? atau gunakan BinaryPayout)
- Controller: MatchingController implement `index()`
- Service: MatchingBonusService calculate & retrieve
- Query: Get matching history with calculations

**Frontend:**
- Display: Table showing period, left vol, right vol, pairs, bonus
- Summary: Total matching bonus

---

### FLOW 8: Pin History
**Objectives:** Track PIN usage history

**Required Data:**
- List of used activation codes
- Usage details (code, when used, by whom, product, activation date)

**Backend:**
- Model: OrderActivationCode (linking order to activation code)
- Controller: PinHistoryController implement `index()`
- Service: PinService get history
- Query: Find activation codes used by current affiliate

**Frontend:**
- Display: Table with code, used date, user details, product
- Actions: View details

---

### FLOW 9: Shop History / Belanja History
**Objectives:** View order history as buyer

**Required Data:**
- Order list (pagination, filters by status/date)
- Per order: order #, date, total, status, items

**Backend:**
- Model: Order (sudah ada)
- Controller: ShopHistoryController implement `index()`
- Service: OrderService filter by user_id (buyer)
- Query: Paginate orders in DESC date order

**Frontend:**
- Display: Table with order info
- Actions: View invoice, reorder, cancel

---

### FLOW 10: Settings / Pengaturan
**Objectives:** Affiliate manage account settings

**Required Data:**
- User profile (name, email, phone)
- Bank account info (for withdrawal)
- Affiliate settings

**Backend:**
- Model: User, UserProfile, AffiliateBankAccount
- Controller: PengaturanController implement `index()` & `update()`
- Service: UserProfileService for updates
- Route: Need POST for update

**Frontend:**
- Display: Form for editing profile
- Actions: Update profile, manage bank accounts

---

## 🚀 NEXT STEPS

1. ✅ Analisis lengkap (SEKARANG)
2. ⏳ Update Controllers - Add data fetching logic
3. ⏳ Create/Update Services - Business logic layer
4. ⏳ Update Routes - Add API endpoints & name routes properly
5. ⏳ Update Frontend - Add data props & integrate with backend
6. ⏳ Testing - E2E testing semua fitur

---

## 🎯 CONSISTENCY CHECKLIST

- ✅ Use route name strings: `/affiliate/dashboard` not route('affiliate.dashboard')
- ✅ Use Inertia::render()
- ✅ Pass data as second array parameter
- ✅ Frontend receive props from Inertia
- ✅ Keep naming consistent (models, controllers, services)
- ✅ Follow existing code patterns (e.g., Commission model structure)
