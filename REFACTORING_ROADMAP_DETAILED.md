# 🏗️ DETAILED REFACTORING ROADMAP - 5 PHASES

**Status:** Ready to Execute | **Estimated Duration:** 4-6 weeks | **Database Changes:** None

---

## 📋 TABLE OF CONTENTS
1. [Phase 1: Konsistensi UI Dasar](#fase-1--konsistensi-ui-dasar)
2. [Phase 2: Shared Komponen](#fase-2--shared-komponen)
3. [Phase 3: Konsolidasi Fitur Duplikat](#fase-3--konsolidasi-fitur-duplikat)
4. [Phase 4: Standarisasi Web Standards](#fase-4--standarisasi-web-standards)
5. [Phase 5: Optimasi & Dark Mode](#fase-5--optimasi--dark-mode)
6. [Dependencies & Order](#dependencies--execution-order)
7. [Testing Strategy](#testing-strategy)

---

## FASE 1 – Konsistensi UI Dasar

**Duration:** 1.5 weeks | **Effort:** 40 hours | **Status:** 🔴 CRITICAL

### 1.1 Create Core Constants File

**File to Create:** `resources/js/constants/ui.ts`

**Content:**
```typescript
// Color status mapping - SINGLE SOURCE OF TRUTH
export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  ready_to_ship: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  returned: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  lost: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
} as const;

// Spacing standards
export const SPACING = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

export const GAP = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const;

// Responsive grid standards
export const GRID_COLS = {
  auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  twoCol: 'grid-cols-1 md:grid-cols-2 gap-4',
  threeCol: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  fourCol: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
} as const;
```

**✅ Checklist:**
- [ ] Create `resources/js/constants/ui.ts`
- [ ] Export from `resources/js/constants/index.ts` (create if not exist)
- [ ] Import constants in all files that need them

---

### 1.2 Fix Raw HTML Tables → shadcn/ui Table

**Priority:** 🔴 CRITICAL

**File:** `resources/js/pages/admin/UsersRole/index.tsx`

**Current State:**
```tsx
<table className="w-full text-sm">
  <thead>
    <tr className="border-b text-left">
      <th className="py-2">#</th>
      ...
    </tr>
  </thead>
```

**Target State:**
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>#</TableHead>
      ...
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Content */}
  </TableBody>
</Table>
```

**Other Files with Raw Tables:**
- ❌ None identified after admin/UsersRole

**✅ Checklist:**
- [ ] Import shadcn/ui Table components
- [ ] Replace `<table>` with `<Table>`
- [ ] Replace `<thead/tbody` with `<TableHeader>/<TableBody>`
- [ ] Replace `<tr>` with `<TableRow>`
- [ ] Replace `<th>` with `<TableHead>`
- [ ] Replace `<td>` with `<TableCell>`
- [ ] Test table rendering
- [ ] Verify responsive behavior
- [ ] Check keyboard navigation

---

### 1.3 Standardize Status Badge Colors

**Files to Update:** (All files with status badges)

```
admin/LaporanKeuangan/index.tsx
admin/affiliates/index.tsx
admin/Orders/index.tsx
admin/withdrawals/index.tsx
affiliate/komisi/index.tsx
finance/dashboard.tsx
finance/transactions/index.tsx
finance/withdrawals/index.tsx
finance/network/index.tsx
finance/reports/index.tsx
logistik/dashboard.tsx
logistik/orders/index.tsx
logistik/shipments/index.tsx
logistik/reports/delivery.tsx
logistik/reports/shipment.tsx
manager/commission-record/index.tsx
manager/finance-record/index.tsx
```

**Current Pattern (REMOVE):**
```tsx
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    // ... repeated in every file
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};
```

**New Pattern (USE):**
```tsx
import { STATUS_COLORS } from '@/constants/ui';

// In component:
<Badge className={STATUS_COLORS[status as keyof typeof STATUS_COLORS]}>
  {status}
</Badge>
```

**✅ Checklist per file:**
- [ ] Remove local `getStatusColor` function
- [ ] Import `STATUS_COLORS` from constants
- [ ] Replace all `className={getStatusColor(...)}` with `className={STATUS_COLORS[...]}`
- [ ] Use Badge component consistently
- [ ] Test dark mode rendering

**Effort per file:** 10-15 minutes × 15 files = ~3.5 hours

---

### 1.4 Standardize Statistics Cards Pattern

**Current Issue:** 3 different patterns

**Files Affected:**
```
Pattern A (KEEP - Card/CardHeader):
├─ affiliate/komisi/index.tsx
├─ affiliate/dashboard.tsx
├─ affiliate/downline/index.tsx
└─ affiliate/binary/index.tsx

Pattern B (UPDATE - Manual divs):
├─ admin/LaporanKeuangan/index.tsx
└─ finance/dashboard.tsx

Pattern C (REMOVE - PlaceholderPattern):
├─ admin/dashboard.tsx
├─ manager/dashboard.tsx
└─ affiliate/orders/index.tsx (if exists)
```

**Target Pattern (CREATE):** ALL use Pattern A

**Migration for Pattern B:**

**From:**
```tsx
<Card className="p-6">
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-600">Total Masuk</p>
    <p className="text-2xl font-bold text-green-600">Rp {totalMasuk}</p>
  </div>
</Card>
```

**To:**
```tsx
<Card>
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Total Masuk
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold text-green-600">
      Rp {totalMasuk}
    </div>
  </CardContent>
</Card>
```

**✅ Checklist:**
- [ ] Update `admin/LaporanKeuangan/index.tsx`
- [ ] Update `finance/dashboard.tsx`
- [ ] Verify all 4 affiliate pages use same pattern
- [ ] Test spacing and alignment
- [ ] Check dark mode

---

### 1.5 Standardize Button Patterns

**Current Issue:** 3 different button styles

**Pattern A (KEEP - shadcn/ui Button):**
```tsx
<Button onClick={() => router.get('/path')} className="gap-2">
  <PlusCircleIcon className="w-4 h-4" />
  Tambah Produk
</Button>
```

**Pattern B (UPDATE - Link as Button):**
```tsx
<Link
  href="/path"
  className="rounded-md bg-primary px-4 py-2 text-sm text-white"
>
  + Tambah User
</Link>
```

**SHOULD BE:**
```tsx
<Button onClick={() => router.get('/path')}>
  + Tambah User
</Button>
```

**Pattern C (UPDATE - Raw Button):**
```tsx
<button onClick={() => handleDelete(id)} className="text-red-600">
  Delete
</button>
```

**SHOULD BE:**
```tsx
<Button
  variant="destructive"
  size="sm"
  onClick={() => handleDelete(id)}
>
  Delete
</Button>
```

**Files to Update:**
- `admin/UsersRole/index.tsx` - Fix all 3 button patterns
- `affiliate/pengaturan/index.tsx` - Check if has custom buttons

**✅ Checklist:**
- [ ] Find all custom `<button>` and `<Link>` used as button
- [ ] Replace with `<Button>` component
- [ ] Use appropriate `variant` (destructive, outline, ghost, etc.)
- [ ] Use appropriate `size` (sm, md, lg, icon)
- [ ] Test all button states

---

### 1.6 Standardize Pagination Response Structure

**Current Inconsistency:**

**Files using correct structure:**
- `finance/transactions/index.tsx` - ✅ Correct
- `finance/withdrawals/index.tsx` - ✅ Correct

**Files with different structure:**
- `logistik/orders/index.tsx` - Uses flat structure

**Target Structure (ALL PAGES):**
```tsx
{
  data: T[];
  links: Record<string, {url: string, active: boolean, label: string}>;
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}
```

**Affected Controllers:**
```
Backend (Laravel):
├─ Finance/TransactionController.php - ✅ ALREADY FIXED
├─ Finance/WithdrawalController.php - ✅ ALREADY FIXED
├─ Logistik/OrderController.php - ⚠️ NEEDS FIX
├─ Logistik/ShipmentController.php - ⚠️ NEEDS FIX
├─ Affiliate/KomisiController.php - ⚠️ CHECK
└─ Admin/* - ⚠️ CHECK ALL

Frontend (React):
├─ finance/transactions/index.tsx - ✅ ALREADY FIXED
├─ finance/withdrawals/index.tsx - ✅ ALREADY FIXED
├─ logistik/orders/index.tsx - ⚠️ NEEDS FIX
├─ affiliate/komisi/index.tsx - ⚠️ NEEDS FIX
└─ affiliate/downline/index.tsx - ⚠️ NEEDS FIX
```

**✅ Checklist (Backend):**
- [ ] Find all `paginate()` calls in controllers
- [ ] Wrap with correct response structure:
  ```php
  $paginated = Model::paginate();
  return response()->json([
      'data' => $paginated->items(),
      'links' => $paginated->linkCollection(),
      'meta' => [
          'current_page' => $paginated->currentPage(),
          'last_page' => $paginated->lastPage(),
          'total' => $paginated->total(),
      ],
  ]);
  ```
- [ ] Test each controller endpoint

**✅ Checklist (Frontend):**
- [ ] Update `logistik/orders/index.tsx` to use new structure
- [ ] Update all affiliate pages using pagination
- [ ] Update admin pages if they use pagination
- [ ] Test pagination links (next, previous, goto)

---

### 1.7 Add Accessibility Attributes (Fase 1 Priority)

**Core Categories:**

**A. Aria Labels on Buttons/Icons:**
```tsx
// Before
<Button onClick={() => router.get('/admin/products/create')}>
  <PlusCircleIcon className="w-4 h-4" />
</Button>

// After
<Button 
  aria-label="Tambah produk baru" 
  onClick={() => router.get('/admin/products/create')}
>
  <PlusCircleIcon className="w-4 h-4" aria-hidden="true" />
</Button>
```

**B. Semantic HTML for Headings:**
```tsx
// Before
<div className="text-2xl font-bold">Dashboard Keuangan</div>

// After
<h1 className="text-2xl font-bold">Dashboard Keuangan</h1>
```

**C. Form Labels:**
```tsx
// Ensure all inputs have <label> with htmlFor
<Label htmlFor="search">Cari...</Label>
<Input id="search" {...props} />
```

**D. Table Accessibility:**
```tsx
// Ensure table has proper headers
<Table role="table">
  <TableHeader role="rowgroup">
    <TableRow role="row">
      <TableHead role="columnheader">Nama</TableHead>
    </TableRow>
  </TableHeader>
```

**Files for Fase 1 Priority (Top 5):**
1. `admin/UsersRole/index.tsx`
2. `admin/products/index.tsx`
3. `admin/affiliates/index.tsx`
4. `finance/transactions/index.tsx`
5. `logistik/orders/index.tsx`

**✅ Checklist:**
- [ ] Add aria-label to all icon-only buttons
- [ ] Add aria-hidden="true" to decorative icons
- [ ] Use semantic HTML headings (h1, h2, h3)
- [ ] Ensure all form inputs have labels
- [ ] Add alt attributes to images
- [ ] Test with screen reader (NVDA/JAWS simulator)

---

## FASE 2 – Shared Komponen

**Duration:** 2 weeks | **Effort:** 45 hours | **Dependency:** Phase 1 ✅

### 2.1 Create FilterPanel Component

**File to Create:** `resources/js/components/shared/FilterPanel.tsx`

**Purpose:** Standardize all filter implementations

**Example Usage:**
```tsx
<FilterPanel onApply={handleFilter} onReset={handleReset}>
  <FilterGroup label="Periode">
    <FilterInput
      type="date"
      name="start_date"
      placeholder="Dari"
      value={startDate}
      onChange={setStartDate}
    />
    <FilterInput
      type="date"
      name="end_date"
      placeholder="Sampai"
      value={endDate}
      onChange={setEndDate}
    />
  </FilterGroup>

  <FilterGroup label="Tipe Komisi">
    <FilterSelect
      name="type"
      placeholder="Pilih tipe..."
      value={type}
      onChange={setType}
      options={types}
      allowClear
    />
  </FilterGroup>

  <FilterGroup label="Pencarian">
    <FilterInput
      type="search"
      name="search"
      placeholder="Cari..."
      value={search}
      onChange={setSearch}
    />
  </FilterGroup>

  <FilterActions>
    {/* Apply, Reset buttons auto-generated */}
  </FilterActions>
</FilterPanel>
```

**Component Structure:**
```
FilterPanel (main wrapper)
├─ FilterGroup (optional sections)
│  ├─ FilterInput (text/date/search input)
│  ├─ FilterSelect (select dropdown)
│  ├─ FilterCheckbox (checkbox filter)
│  └─ FilterDateRange (custom date range)
└─ FilterActions (auto-generated buttons)
```

**✅ Checklist:**
- [ ] Create `resources/js/components/shared/FilterPanel.tsx`
- [ ] Create `resources/js/components/shared/FilterGroup.tsx`
- [ ] Create `resources/js/components/shared/FilterInput.tsx`
- [ ] Create `resources/js/components/shared/FilterSelect.tsx`
- [ ] Create `resources/js/components/shared/FilterDateRange.tsx`
- [ ] Create story/example file with usage
- [ ] Update `finance/transactions/index.tsx` to use FilterPanel
- [ ] Update `finance/withdrawals/index.tsx` to use FilterPanel
- [ ] Update `finance/reports/index.tsx` to use FilterPanel
- [ ] Update `logistik/orders/index.tsx` to use FilterPanel

---

### 2.2 Create StatsCard Component

**File to Create:** `resources/js/components/shared/StatsCard.tsx`

**Purpose:** Replace all statistics card variations

**Example Usage:**
```tsx
<StatsCard
  title="Total Komisi"
  value={stats.total}
  valueFormat="currency" // or 'number', 'percentage'
  icon={DollarSign}
  color="blue" // or 'green', 'red', 'yellow', 'purple'
  trend={{ value: 12, direction: 'up' }} // optional
  description="Bulan ini"
/>
```

**Component Props:**
```typescript
interface StatsCardProps {
  title: string;
  value: number | string;
  valueFormat?: 'currency' | 'number' | 'percentage' | 'text';
  icon?: React.ComponentType<{className?: string}>;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  description?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  onClick?: () => void;
  href?: string;
  isLoading?: boolean;
}
```

**✅ Checklist:**
- [ ] Create `resources/js/components/shared/StatsCard.tsx`
- [ ] Support all 5 color variants with dark mode
- [ ] Add optional trend indicator (up/down arrow with %)
- [ ] Add optional click handler or link
- [ ] Add loading skeleton state
- [ ] Update `admin/LaporanKeuangan/index.tsx`
- [ ] Update `finance/dashboard.tsx`
- [ ] Update `affiliate/komisi/index.tsx`
- [ ] Update `affiliate/dashboard.tsx`
- [ ] Update `logistik/dashboard.tsx`

---

### 2.3 Create ReportTable Component

**File to Create:** `resources/js/components/shared/ReportTable.tsx`

**Purpose:** Unify table rendering across reports

**Example Usage:**
```tsx
<ReportTable
  title="Transaksi Komisi"
  columns={[
    { key: 'date', label: 'Tanggal', format: 'date' },
    { key: 'affiliate', label: 'Affiliate', format: 'text' },
    { key: 'amount', label: 'Jumlah', format: 'currency' },
    { key: 'status', label: 'Status', format: 'badge' },
  ]}
  data={transactions}
  pagination={pagination}
  onPageChange={handlePageChange}
  onSearch={handleSearch}
  searchPlaceholder="Cari nafas affiliate atau referensi..."
  emptyMessage="Tidak ada transaksi"
  isLoading={isLoading}
/>
```

**Features:**
- Built-in search
- Built-in pagination
- Column formatting (currency, date, badge, text)
- Row selection checkbox (optional)
- Expandable rows (optional)
- Export to CSV (optional)
- Responsive scroll on mobile

**✅ Checklist:**
- [ ] Create `resources/js/components/shared/ReportTable.tsx`
- [ ] Create `resources/js/components/shared/TableColumn.tsx`
- [ ] Add column formatters (currency, date, badge, text, link)
- [ ] Add pagination controls
- [ ] Add search functionality
- [ ] Add mobile responsive scroll
- [ ] Add accessibility attributes
- [ ] Update `finance/transactions/index.tsx`
- [ ] Update `finance/withdrawals/index.tsx`
- [ ] Update `finance/reports/index.tsx`
- [ ] Update `logistik/orders/index.tsx`

---

### 2.4 Create LoadingState & EmptyState Components

**File to Create:** `resources/js/components/shared/LoadingState.tsx`

**Example Usage:**
```tsx
{isLoading ? (
  <LoadingState type="table" rows={5} />
) : transactions.length === 0 ? (
  <EmptyState
    icon={AlertCircle}
    title="Tidak ada transaksi"
    description="Mulai dengan membuat komisi baru"
    action={{
      label: "Buat Komisi",
      onClick: () => router.get('/create')
    }}
  />
) : (
  <table>{/* content */}</table>
)}
```

**Component Types:**
- `LoadingState` - Skeleton loaders for different layouts
- `EmptyState` - User-friendly empty message
- Both with dark mode support

**✅ Checklist:**
- [ ] Create `resources/js/components/shared/LoadingState.tsx`
- [ ] Create `resources/js/components/shared/EmptyState.tsx`
- [ ] Create skeleton variants: table, grid, list, card
- [ ] Add to all data listing pages
- [ ] Test with slow network (throttle in DevTools)

---

## FASE 3 – Konsolidasi Fitur Duplikat

**Duration:** 2 weeks | **Effort:** 40 hours | **Dependency:** Phase 1 & 2 ✅

### 3.1 Commission System Consolidation

**Problem:** Commission data accessed 4 different ways

**Current Implementation:**
```
1. Finance/Transactions → Shows all affiliate commissions
2. Finance/Dashboard → Summary view
3. Affiliate/Komisi → Shows own commissions
4. Manager/Commission-record → Read-only view
5. Admin/Reports → Via LaporanKomisi
```

**Target Architecture:**

```
┌─ Finance/Transactions (Source of Truth)
│  ├─ Can filter by type, date, affiliate, status
│  ├─ Can approve/reject (Finance role only)
│  └─ Can export as CSV
│
├─ Finance/Dashboard (Summary View)
│  ├─ Shows the same data as source
│  ├─ Read-only
│  └─ Only shows last 5 recent
│
├─ Affiliate/Komisi (Personal View)
│  ├─ Shows only affiliate's own commissions
│  ├─ Links to Finance/Transactions for details
│  ├─ Read-only
│  └─ Can see status only
│
├─ Manager/Commission-record (Read-only View)
│  ├─ Shows all affiliates' commissions
│  ├─ Read-only
│  ├─ Can export summary
│  └─ Cannot approve
│
└─ Admin/Reports (Analyst View)
   ├─ Advanced filtering
   ├─ Grouping by type/affiliate/date
   ├─ Aggregations
   └─ Can export detailed reports
```

**Implementation Plan:**

**Step 1: Consolidate Data Source**
- Ensure all endpoints return same data structure
- Create shared interface for Commission data

**Step 2: Create Commission API Wrapper**
- File: `resources/js/services/commission.ts`
- Methods: `getCommissions()`, `getCommissionById()`, `approveCommission()`, etc.

**Step 3: Refactor Each Page**

**A. Finance/Transactions** (Keep as is - use new API)
- Use Commission API service
- Use ReportTable component
- Use FilterPanel component

**B. Finance/Dashboard** (Refactor)
- Before: Custom implementation
- After: Uses Finance/Transactions data + limits display

**C. Affiliate/Komisi** (Refactor)
- Before: Duplicate data fetching
- After: Uses Commission API with `affiliate_id` filter

**D. Manager/Commission-record** (Refactor)
- Before: Separate implementation
- After: Uses Commission API, read-only with export

**E. Admin/LaporanKomisi** (Refactor)
- Before: Separate report
- After: Uses Commission API with advanced filters

**✅ Checklist:**

**Backend:**
- [ ] Audit all commission endpoints
- [ ] Ensure consistent response structure
- [ ] Add role-based filtering in CommissionController
- [ ] Test each endpoint with different roles

**Frontend:**
- [ ] Create `resources/js/services/commission.ts`
- [ ] Define shared Commission interface
- [ ] Update Finance/Transactions to use API service
- [ ] Update Finance/Dashboard to share data with Transactions
- [ ] Refactor Affiliate/Komisi to use API service
- [ ] Refactor Manager/Commission-record to use API service
- [ ] Update Admin reports to use API service
- [ ] Test all 5 implementations with same data

---

### 3.2 Orders System Ownership Definition

**Problem:** Orders not consistently managed across roles

**Current State:**
- Admin: `admin/Orders` - Just placeholder
- Finance: No orders module
- Logistik: `logistik/orders` - Full implementation
- Manager: No orders module

**Target Ownership:**
```
┌─ Logistik (OWNER)
│  ├─ `logistik/orders/index.tsx` - Full CRUD
│  ├─ `logistik/orders/show.tsx` - Detail view
│  └─ `logistik/orders/create.tsx` - Create shipment
│
├─ Admin (VISIBILITY ONLY)
│  └─ `admin/Orders/index.tsx` - Read-only list with all other statuses
│
├─ Finance (VISIBILITY ONLY)
│  └─ Orders appear in financial reports
│  └─ No direct access, but data used for calculations
│
└─ Manager (VISIBILITY ONLY)
   └─ `manager/sold-record/index.tsx` - View sales metrics
```

**Implementation Plan:**

**Step 1: Replace Admin Order Placeholder**
- Update `admin/Orders/index.tsx` to show:
  - All orders in system (read-only)
  - Order status distribution
  - Link to Logistik for details
  - Filter by date, status, customer

**Step 2: Verify Logistik Orders**
- Ensure `logistik/orders/index.tsx` has all CRUD

**Step 3: Document Ownership**
- Create `ORDERS_OWNERSHIP.md` in project root

**✅ Checklist:**
- [ ] Update `admin/Orders/index.tsx` from placeholder to read-only list
- [ ] Add status filter to admin orders
- [ ] Add date range filter to admin orders
- [ ] Verify logistik orders full CRUD works
- [ ] Test admin can view but not edit
- [ ] Document ownership model

---

### 3.3 Reports System Consolidation

**Problem:** 8+ separate report implementations

**Current Fragmentation:**
```
Admin Reports (5 files):
├─ LaporanKeuangan
├─ LaporanKomisi
├─ LaporanAffiliate
├─ LaporanPenjualan
└─ LaporanProduk

Finance Reports (2 modes):
├─ Dashboard (summary)
└─ Reports (detailed)

Logistik Reports (2 files):
├─ Delivery
└─ Shipment

Manager Reports (5 files):
├─ Commission-record
├─ Finance-record
├─ Product-record
├─ Sold-record
└─ Affiliate-record
```

**Target Architecture - Create Report Builder System:**

```
┌─ Create Report Builder Component
│  ├─ ReportBuilder.tsx (main component)
│  ├─ ReportTemplate.tsx (template selection)
│  ├─ ReportFilter.tsx (filtering UI)
│  ├─ ReportChart.tsx (chart rendering)
│  └─ ReportExport.tsx (export options)
│
├─ Define Report Templates
│  ├─ Commission Summary Template
│  ├─ Sales Report Template
│  ├─ Delivery Performance Template
│  ├─ Financial Statement Template
│  ├─ Affiliate Performance Template
│  └─ Product Sales Template
│
└─ Refactor Individual Pages
   ├─ Use ReportBuilder component
   ├─ Pass report template
   ├─ Pass data source
   └─ Show unified interface
```

**Implementation Plan:**

**Step 1: Create Report Builder Infrastructure** (3 hours)
- Create `resources/js/components/reports/ReportBuilder.tsx`
- Create report type definitions
- Create report template system

**Step 2: Define Report Templates** (5 hours)
- Create each report template with default filters
- Define chart types needed
- Define export formats needed

**Step 3: Migrate Existing Reports** (Per role)
- Admin: 5 reports × 1 hour = 5 hours
- Finance: Already good, add template option = 30 min
- Logistik: 2 reports × 45 min = 1.5 hours
- Manager: 5 reports × 45 min = 3.75 hours

**✅ Checklist:**
- [ ] Create ReportBuilder component system
- [ ] Create template definitions
- [ ] Migrate admin reports (1 by 1)
- [ ] Migrate logistik reports
- [ ] Migrate manager reports
- [ ] Test report generation
- [ ] Test report export (CSV, PDF)
- [ ] Test date range filters

---

## FASE 4 – Standarisasi Web Standards

**Duration:** 1.5 weeks | **Effort:** 35 hours | **Dependency:** Phase 1 ✅

### 4.1 Add Loading States & Skeleton Loaders

**Files Affected:** All data listing pages (~25 pages)

**Pattern:**

```tsx
// Pattern for implementation
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const handleStart = () => setIsLoading(true);
  const handleFinish = () => setIsLoading(false);

  router.on('start', handleStart);
  router.on('finish', handleFinish);

  return () => {
    router.off('start', handleStart);
    router.off('finish', handleFinish);
  };
}, []);

return (
  <div>
    {isLoading && <LoadingState type="table" rows={5} />}
    {!isLoading && data.length === 0 && <EmptyState {...props} />}
    {!isLoading && data.length > 0 && (
      <Table>{/* content */}</Table>
    )}
  </div>
);
```

**Pages Priority Order:**
1. 🔴 HIGH: finance/transactions, finance/withdrawals, logistik/orders, admin/affiliates
2. 🟡 MEDIUM: admin/products, admin/commission-methods, admin/commission-rules
3. 🟢 LOW: Other list pages

**✅ Checklist:**
- [ ] Add router event listeners for loading state
- [ ] Add LoadingState component to top 4 pages
- [ ] Test with DevTools throttling (Slow 3G)
- [ ] Verify UX feels responsive

---

### 4.2 Image Optimization & Lazy Loading

**Issue:** Only identified in `affiliate/shop`

**Current:**
```tsx
image={item.image || 'https://images.unsplash.com/...'}
```

**Target:** Implement lazy loading

**Solution:**
```tsx
{/* Use Next-optimized image or native lazy loading */}
<img
  src={item.image}
  alt={item.name}
  loading="lazy"
  className="w-full h-48 object-cover"
/>

// Or create wrapper component
<LazyImage
  src={item.image}
  alt={item.name}
  fallback="https://via.placeholder.com/300"
/>
```

**✅ Checklist:**
- [ ] Create `resources/js/components/shared/LazyImage.tsx`
- [ ] Add `loading="lazy"` to all `<img>` tags
- [ ] Update `affiliate/shop/index.tsx` to use LazyImage
- [ ] Update `guest/shop/index.tsx` to use LazyImage
- [ ] Test image loading with DevTools throttling

---

### 4.3 Meta Tags & SEO

**File:** `resources/js/layouts/app-layout.tsx` (main layout)

**Add:**
```tsx
<Head>
  <title>{pageTitle} - ALUS ASTECH</title>
  <meta name="description" content={pageDescription} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={currentUrl} />
  {breadcrumbs && (
    <script type="application/ld+json">
      {JSON.stringify(generateBreadcrumbSchema(breadcrumbs))}
    </script>
  )}
</Head>
```

**Per-Page Updates:** Add descriptions to each page component

**✅ Checklist:**
- [ ] Update layout to support dynamic meta tags
- [ ] Add `getPageMeta()` function per pagefile
- [ ] Add breadcrumb schema (JSON-LD)
- [ ] Create `robots.txt` in public folder
- [ ] Generate `sitemap.xml` (dynamic)
- [ ] Add open graph tags

---

### 4.4 Mobile Table Scrolling

**Issue:** Tables overflow on mobile

**Solution:** Add horizontal scroll wrapper

```tsx
// Create wrapper component
<div className="overflow-x-auto rounded-lg border">
  <Table>
    {/* Table content */}
  </Table>
</div>

// Or add to responsive utility
className="w-full overflow-x-auto"
```

**Affected Pages:**
```
├─ admin/products/index.tsx
├─ admin/affiliates/index.tsx
├─ admin/commission-methods/index.tsx
├─ finance/transactions/index.tsx
├─ finance/withdrawals/index.tsx
├─ logistik/orders/index.tsx
└─ ... (all table pages)
```

**✅ Checklist:**
- [ ] Add overflow-x-auto wrapper to all tables
- [ ] Test on mobile device (or DevTools mobile view)
- [ ] Verify finger scroll works smoothly
- [ ] Check scroll indicator visibility

---

### 4.5 Error Boundary Implementation

**File:** Create `resources/js/components/shared/ErrorBoundary.tsx`

**Usage:**
```tsx
<ErrorBoundary
  onError={(error) => console.error(error)}
  fallback={<ErrorFallback />}
>
  <YourComponent />
</ErrorBoundary>
```

**✅ Checklist:**
- [ ] Create ErrorBoundary component
- [ ] Wrap main app layout
- [ ] Wrap each major section
- [ ] Create ErrorFallback UI
- [ ] Test by throwing errors in DevTools

---

## FASE 5 – Optimasi & Dark Mode

**Duration:** 1.5 weeks | **Effort:** 30 hours | **Dependency:** Phase 1 ✅

### 5.1 Dark Mode Implementation

**Current State:** Inconsistent dark: variants

**Target:** Consistent dark:* variants on all components

**Audit Required Components:**

**1. Cards & Backgrounds:**
```tsx
// Before (inconsistent)
<Card className="bg-white">

// After (consistent)
<Card className="bg-white dark:bg-slate-950">
```

**2. Text Colors:**
```tsx
// Colors need dark variants
text-gray-600 → text-gray-600 dark:text-gray-400
text-yellow-800 → text-yellow-800 dark:text-yellow-200
```

**3. Borders:**
```tsx
border-gray-200 → border-gray-200 dark:border-gray-800
```

**Files Needing Dark Mode Pass:**

**Priority 1 (Used in dashboards):**
- [ ] admin/dashboard.tsx
- [ ] manager/dashboard.tsx
- [ ] finance/dashboard.tsx
- [ ] affiliate/dashboard.tsx
- [ ] logistik/dashboard.tsx

**Priority 2 (Main content pages):**
- [ ] finance/transactions/index.tsx
- [ ] finance/withdrawals/index.tsx
- [ ] finance/reports/index.tsx
- [ ] admin/products/index.tsx
- [ ] logistik/orders/index.tsx

**Priority 3 (List pages):**
- [ ] admin/affiliates/index.tsx
- [ ] admin/commission-methods/index.tsx
- [ ] admin/commission-rules/index.tsx
- [ ] affiliate/komisi/index.tsx

**✅ Checklist (Per File):**
- [ ] Add dark:bg-* to all cards and containers
- [ ] Add dark:text-* to all text elements
- [ ] Add dark:border-* to all borders
- [ ] Test toggle dark mode (use browser DevTools or Tailwind toggle)
- [ ] Verify contrast ratios meet WCAG AA standards

---

### 5.2 Type Safety - Remove All `any` Types

**Audit Current Use:**

**Files with `any` types:**
```
admin/UsersRole/index.tsx - e.g., users: any
settings/profile.tsx - ProfileController: any
finance/reports/index.tsx - router.get(...) as any
logistik/orders/index.tsx - searchInput: string, but used loosely
```

**Replacement Pattern:**

**Step 1: Create Shared Types**

Create `resources/js/types/models/index.ts`:
```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  roles?: Role[];
}

export interface Affiliate {
  id: number;
  user_id: number;
  username: string;
  user?: User;
  // ... more fields
}

export interface Commission {
  id: number;
  affiliate_id: number;
  amount: string;
  type: string;
  status: string;
  created_at: string;
  // ... more fields
}

// ... more models
```

**Step 2: Replace `any` Usage**

```typescript
// Before
export default function Index({ users }: any) {

// After
import type { User } from '@/types/models';
export default function Index({ users }: { users: User[] }) {
```

**Step 3: Fix Inertia Props**

```typescript
// Before
interface Props {
  users: any;
}

// After
interface Props {
  users: User[];
  pagination?: PaginationMeta;
}
```

**Affected Files (~10 files):**
- [ ] admin/UsersRole/index.tsx
- [ ] finance/reports/index.tsx
- [ ] Other pages using loose types

**✅ Checklist:**
- [ ] Create comprehensive types/models/index.ts
- [ ] Find all `any` declarations
- [ ] Replace with proper types
- [ ] Run TypeScript check: `npx tsc --noEmit`
- [ ] Fix any compilation errors

---

### 5.3 Error & Empty State Handling

**Common Patterns to Add:**

**Pattern 1: Try/Catch for Route Calls**
```tsx
const handleFilter = async () => {
  try {
    await router.get('/path', { ...filters });
  } catch (error) {
    showErrorToast('Gagal memuat data');
  }
};
```

**Pattern 2: Empty States**
```tsx
{data.length === 0 && (
  <EmptyState
    icon={AlertCircle}
    title="Tidak ada data"
    description="Mulai dengan membuat item baru"
  />
)}
```

**Pattern 3: Error States**
```tsx
{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

**Files to Add Error Handling** (Priority order):
1. finance/transactions/index.tsx
2. finance/withdrawals/index.tsx
3. finance/reports/index.tsx
4. logistik/orders/index.tsx
5. admin/affiliates/index.tsx

**✅ Checklist (Per File):**
- [ ] Add error state management
- [ ] Add error message display
- [ ] Add try/catch to route calls
- [ ] Add empty state message
- [ ] Test by simulating API error

---

### 5.4 Security Audit

**Items to Check:**

1. **CSRF Protection:**
   - ✅ Using Inertia.js (should be protected)
   - [ ] Verify CSRF headers in requests

2. **Authorization:**
   - [ ] Verify role-based route protection
   - [ ] Check middleware enforcement
   - [ ] Test accessing unauthorized routes

3. **Data Privacy:**
   - [ ] Check if sensitive data needs masking
   - [ ] Bank account numbers visible?
   - [ ] Personal emails exposed?

4. **XSS Prevention:**
   - ✅ React escapes strings
   - [ ] Verify no dangerous HTML rendering
   - [ ] Check for dangerouslySetInnerHTML usage

5. **Input Validation:**
   - [ ] Verify form inputs validated
   - [ ] Verify date ranges validated
   - [ ] Verify search inputs sanitized

**✅ Checklist:**
- [ ] Review all routes for auth middleware
- [ ] Test direct URL access to protected routes
- [ ] Check for data masking needs
- [ ] Run security audit with npm audit
- [ ] Review for OWASP Top 10 issues

---

### 5.5 PWA Compliance (Optional for Phase 5)

**If time permits:**

- [ ] Create manifest.json in public folder
- [ ] Add service worker basic template
- [ ] Add install icons
- [ ] Test installability

**✅ Checklist:**
- [ ] Create manifest.json
- [ ] Add web app meta tags
- [ ] Create basic service worker
- [ ] Test install prompt on Chrome

---

## dependencies & Execution Order

```
┌─ PHASE 1: Konsistensi UI Dasar (INDEPENDENT)
│  ├─ No dependencies
│  └─ CAN START IMMEDIATELY
│
├─ PHASE 2: Shared Komponen (DEPENDS ON Phase 1)
│  ├─ Must have STATUS_COLORS defined
│  └─ Can START after Phase 1 constants
│
├─ PHASE 3: Konsolidasi (DEPENDS ON Phase 2)
│  ├─ Can use shared components
│  └─ START once FilterPanel ready
│
├─ PHASE 4: Web Standards (INDEPENDENT from 3)
│  ├─ Can run parallel with Phase 3
│  └─ Focus on loading states & SEO
│
└─ PHASE 5: Optimization (INDEPENDENT)
   ├─ Can start immediately
   ├─ Dark mode doesn't block others
   └─ Type safety can happen anytime
```

**Recommended Execution Timeline:**

```
WEEK 1:
├─ Phase 1: UI Constants & Tables (4 days)
└─ Phase 4: Add loading states (2 days)

WEEK 2:
├─ Phase 1: Finish accessibility (3 days)
├─ Phase 2: Create FilterPanel (4 days)
└─ Phase 5: Start dark mode (1 day)

WEEK 3:
├─ Phase 2: Create StatsCard & ReportTable (5 days)
├─ Phase 5: Complete dark mode (2 days)
└─ Phase 5: Type safety pass (1 day)

WEEK 4:
├─ Phase 3: Commission consolidation (4 days)
├─ Phase 3: Orders ownership (2 days)
├─ Phase 4: Meta tags & SEO (1 day)
└─ Phase 5: Error handling (1 day)

WEEK 5:
├─ Phase 3: Reports consolidation (5 days)
└─ Phase 2/4: Mobile table scroll (2 days)

WEEK 6:
├─ Testing & QA (3 days)
├─ Bug fixes & polish (2 days)
└─ Documentation & handoff (1 day)
```

---

## Testing Strategy

### Unit Testing
```
// Create test for critical components
resources/js/components/shared/__tests__/
├─ FilterPanel.test.tsx
├─ StatsCard.test.tsx
├─ ReportTable.test.tsx
└─ LoadingState.test.tsx
```

### Integration Testing
```
Test complete user flows:
1. Finance person filters & exports transactions
2. Affiliate views own commissions
3. Manager generates commission report
4. Logistik manages orders end-to-end
```

### Manual Testing Checklist

**Before Release:**
- [ ] Test on Chrome (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Safari (desktop)
- [ ] Test on Chrome mobile
- [ ] Test on Safari iOS
- [ ] Test keyboard navigation
- [ ] Test screen reader (nvda/jaws simulator)
- [ ] Test dark mode toggle
- [ ] Test with throttled network (Slow 3G)
- [ ] Test all error scenarios

---

## Success Metrics

| Phase | Metric | Target | Current |
|-------|--------|--------|---------|
| Phase 1 | Component consistency | 95% | 60% |
| Phase 2 | Code duplication | <5% | 23% |
| Phase 3 | Feature consolidation | 100% | 0% |
| Phase 4 | Loading states | 100% | 0% |
| Phase 5 | Dark mode coverage | 100% | 40% |
| Phase 5 | Type safety | 100% | 70% |

---

## Milestones

- ✅ **Week 1:** Phase 1 complete, basic UI consistency
- ✅ **Week 2:** Components created, Phase 2 complete
- ✅ **Week 3:** Dark mode finished, type safety improved
- ✅ **Week 4:** Feature consolidation started, SEO added
- ✅ **Week 5:** All duplications removed
- ✅ **Week 6:** QA, bug fixes, documentation

---

## Notes

- **No Database Migrations Required** - All changes are frontend/component level
- **Backward Compatible** - Refactoring doesn't break existing functionality
- **Progressive Enhancement** - Can deploy phases incrementally
- **Testing Required** - Each phase needs testing before next phase

**Next Steps:**
1. Review this roadmap with team
2. Assign team members to phases
3. Create GitHub issues for each task
4. Start Phase 1 immediately

