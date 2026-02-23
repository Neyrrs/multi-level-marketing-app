# ✅ REFACTORING EXECUTION CHECKLIST - QUICK REFERENCE

**Print this out or bookmark for daily use during refactoring**

---

## 🎯 PHASE 1: Konsistensi UI Dasar (Week 1)

### Task 1.1: Create UI Constants File
- [ ] Create `resources/js/constants/ui.ts`
- [ ] Define STATUS_COLORS map (12+ statuses)
- [ ] Define SPACING constants (xs, sm, md, lg, xl)
- [ ] Define GAP constants
- [ ] Define GRID_COLS templates
- [ ] Export from `constants/index.ts`
- [ ] Import throughout app

**Files to Update:** Status badge pages (see audit list)

---

### Task 1.2: Fix Raw HTML Tables
- [ ] Update `admin/UsersRole/index.tsx`
  - [ ] Replace `<table>` with `<Table>`
  - [ ] Replace `<tr>` with `<TableRow>`
  - [ ] Replace `<td>` with `<TableCell>`
  - [ ] Replace `<th>` with `<TableHead>`
  - [ ] Replace buttons: `<Link>` → `<Button>`, raw `<button>` → `<Button variant="destructive">`
  - [ ] Add aria-labels to icon buttons
  - [ ] Test responsive behavior
  - [ ] Verify dark mode

---

### Task 1.3: Standardize Status Badges (15 files)
- [ ] Remove all `getStatusColor()` functions
- [ ] Import `STATUS_COLORS` constant
- [ ] Replace with `className={STATUS_COLORS[status]}`
- [ ] Files to update:
  - [ ] admin/LaporanKeuangan/index.tsx
  - [ ] admin/affiliates/index.tsx
  - [ ] affiliate/komisi/index.tsx
  - [ ] finance/dashboard.tsx
  - [ ] finance/transactions/index.tsx
  - [ ] finance/withdrawals/index.tsx
  - [ ] finance/reports/index.tsx
  - [ ] logistik/dashboard.tsx
  - [ ] logistik/orders/index.tsx
  - [ ] logistik/reports/delivery.tsx
  - [ ] manager/commission-record/index.tsx
  - [ ] ... (see audit for complete list)

---

### Task 1.4: Standardize Statistics Cards (3 files)
- [ ] Update `admin/LaporanKeuangan/index.tsx` - Change Pattern B → Pattern A
- [ ] Update `finance/dashboard.tsx` - Change Pattern B → Pattern A
- [ ] Verify `affiliate/komisi`, `affiliate/dashboard`, `affiliate/downline` use consistent Pattern A

**Pattern A (Target):**
```tsx
<Card>
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">Value</div>
  </CardContent>
</Card>
```

---

### Task 1.5: Standardize Pagination (Backend + Frontend)
**Backend Fixes:**
- [ ] Find all `paginate()` calls in controllers
- [ ] Wrap responses with correct structure:
  ```php
  'data' => $paginated->items(),
  'links' => $paginated->linkCollection(),
  'meta' => ['current_page' => ..., 'last_page' => ..., 'total' => ...]
  ```
- [ ] Controllers to check: Logistik, Affiliate, Admin

**Frontend Fixes:**
- [ ] Update `logistik/orders/index.tsx` to use nested structure
- [ ] Update `affiliate/komisi/index.tsx` if needed
- [ ] Test pagination links work

---

### Task 1.6: Add Accessibility Attributes (Top 5 pages)
- [ ] `admin/UsersRole/index.tsx`
  - [ ] Add aria-label to all buttons
  - [ ] Add aria-hidden to decorative icons
  - [ ] Use semantic HTML (h1, h2)
  - [ ] Ensure form labels have htmlFor
- [ ] `admin/products/index.tsx`
  - [ ] Add aria-label to action buttons
  - [ ] Add alt to any images
- [ ] `finance/transactions/index.tsx`
  - [ ] Add aria-label to filter buttons
- [ ] `logistik/orders/index.tsx`
  - [ ] Add accessibility attributes
- [ ] `admin/affiliates/index.tsx`
  - [ ] Add accessibility attributes

---

## 🎯 PHASE 2: Shared Komponen (Week 2)

### Task 2.1: Create FilterPanel Component System
- [ ] Create `resources/js/components/shared/FilterPanel.tsx`
- [ ] Create `resources/js/components/shared/FilterGroup.tsx`
- [ ] Create `resources/js/components/shared/FilterInput.tsx`
- [ ] Create `resources/js/components/shared/FilterSelect.tsx`
- [ ] Create `resources/js/components/shared/FilterDateRange.tsx`
- [ ] Create example/demo file
- [ ] Test with FilterPanel props

**Pages to Migrate:**
- [ ] `finance/transactions/index.tsx`
- [ ] `finance/withdrawals/index.tsx`
- [ ] `finance/reports/index.tsx`
- [ ] `logistik/orders/index.tsx`

---

### Task 2.2: Create StatsCard Component
- [ ] Create `resources/js/components/shared/StatsCard.tsx`
- [ ] Support props: title, value, valueFormat, icon, color, trend, description
- [ ] Add 5 color variants (blue, green, red, yellow, purple)
- [ ] Add dark mode support
- [ ] Add optional trend indicator
- [ ] Add loading skeleton state

**Pages to Migrate:**
- [ ] `admin/LaporanKeuangan/index.tsx`
- [ ] `finance/dashboard.tsx`
- [ ] `affiliate/komisi/index.tsx`
- [ ] `affiliate/dashboard.tsx`
- [ ] `logistik/dashboard.tsx`

---

### Task 2.3: Create ReportTable Component
- [ ] Create `resources/js/components/shared/ReportTable.tsx`
- [ ] Support column formatting: currency, date, badge, text, link
- [ ] Add built-in pagination
- [ ] Add built-in search
- [ ] Add empty state
- [ ] Add responsive scroll

**Pages to Migrate:**
- [ ] `finance/transactions/index.tsx`
- [ ] `finance/withdrawals/index.tsx`
- [ ] `finance/reports/index.tsx`
- [ ] `logistik/orders/index.tsx`

---

### Task 2.4: Create Loading & Empty State Components
- [ ] Create `resources/js/components/shared/LoadingState.tsx`
  - [ ] Skeleton variants: table, grid, list, card
- [ ] Create `resources/js/components/shared/EmptyState.tsx`
  - [ ] Icon, title, description, action button
- [ ] Add to all data listing pages (~25 pages)

---

## 🎯 PHASE 3: Konsolidasi Fitur Duplikat (Week 3-4)

### Task 3.1: Commission System Consolidation
**Backend:**
- [ ] Audit all commission endpoints
- [ ] Ensure consistent response structure
- [ ] Add role-based filtering

**Frontend:**
- [ ] Create `resources/js/services/commission.ts`
- [ ] Define shared Commission interface
- [ ] Update `finance/transactions/index.tsx` - Use API service
- [ ] Update `finance/dashboard.tsx` - Share data with transactions
- [ ] Update `affiliate/komisi/index.tsx` - Use API with affiliate filter
- [ ] Update `manager/commission-record/index.tsx` - Use API, read-only
- [ ] Update `admin/LaporanKomisi/index.tsx` - Use API with advanced filters

**Verification:**
- [ ] All 5 pages show same commission data
- [ ] Different roles see appropriate filters
- [ ] Finance can approve/reject
- [ ] Affiliate sees only own commissions
- [ ] Manager sees all but read-only

---

### Task 3.2: Orders System Ownership Definition
- [ ] Define `Logistik` as primary owner
- [ ] Update `admin/Orders/index.tsx`
  - [ ] Remove placeholder
  - [ ] Show all orders (read-only)
  - [ ] Add filters: date, status, customer
  - [ ] Add link to Logistik for details
- [ ] Verify `logistik/orders/index.tsx` has full CRUD
- [ ] Document in `ORDERS_OWNERSHIP.md`

---

### Task 3.3: Reports System Consolidation
- [ ] Create Report Builder component infrastructure
- [ ] Define report templates (6 types)
- [ ] Migrate Admin reports (5 files)
- [ ] Migrate Logistik reports (2 files)
- [ ] Migrate Manager reports (5 files)
- [ ] Keep Finance as is (already good)

---

## 🎯 PHASE 4: Web Standards (Week 2-4, can parallel Phase 3)

### Task 4.1: Add Loading States
- [ ] Add router event listeners for loading state
- [ ] Implement on top 4 pages:
  - [ ] finance/transactions/index.tsx
  - [ ] finance/withdrawals/index.tsx
  - [ ] logistik/orders/index.tsx
  - [ ] admin/affiliates/index.tsx
- [ ] Test with DevTools throttling

---

### Task 4.2: Image Optimization
- [ ] Create `resources/js/components/shared/LazyImage.tsx`
- [ ] Update `affiliate/shop/index.tsx` - Use LazyImage
- [ ] Update `guest/shop/index.tsx` - Use LazyImage
- [ ] Add `loading="lazy"` to all `<img>` tags

---

### Task 4.3: SEO & Meta Tags
- [ ] Update `resources/js/layouts/app-layout.tsx`
- [ ] Add support for dynamic meta tags
- [ ] Add breadcrumb schema (JSON-LD)
- [ ] Create/update `public/robots.txt`
- [ ] Generate `sitemap.xml`

---

### Task 4.4: Mobile Table Scrolling
- [ ] Add `overflow-x-auto` wrapper to all table containers
- [ ] Test on mobile device DevTools
- [ ] Verify smooth finger scroll

---

### Task 4.5: Error Boundary
- [ ] Create `resources/js/components/shared/ErrorBoundary.tsx`
- [ ] Wrap main app layout
- [ ] Create ErrorFallback UI
- [ ] Test by throwing errors

---

## 🎯 PHASE 5: Optimization & Dark Mode (Week 2-6)

### Task 5.1: Dark Mode - Priority 1 (Dashboards)
- [ ] `admin/dashboard.tsx`
  - [ ] Add dark:bg-* to all containers
  - [ ] Add dark:text-* to all text
  - [ ] Add dark:border-* to all borders
  - [ ] Test toggle
- [ ] `manager/dashboard.tsx` - Same checklist
- [ ] `finance/dashboard.tsx` - Same checklist
- [ ] `affiliate/dashboard.tsx` - Same checklist
- [ ] `logistik/dashboard.tsx` - Same checklist

### Task 5.2: Dark Mode - Priority 2 (Main Content)
- [ ] `finance/transactions/index.tsx`
- [ ] `finance/withdrawals/index.tsx`
- [ ] `finance/reports/index.tsx`
- [ ] `admin/products/index.tsx`
- [ ] `logistik/orders/index.tsx`

### Task 5.3: Dark Mode - Priority 3 (List Pages)
- [ ] `admin/affiliates/index.tsx`
- [ ] `admin/commission-methods/index.tsx`
- [ ] `admin/commission-rules/index.tsx`
- [ ] `affiliate/komisi/index.tsx`
- [ ] (and others as time permits)

---

### Task 5.4: Remove `any` Types
- [ ] Create `resources/js/types/models/index.ts`
  - [ ] Define User interface
  - [ ] Define Affiliate interface
  - [ ] Define Commission interface
  - [ ] Define Order interface
  - [ ] Define Product interface
  - [ ] Define Withdrawal interface
  - [ ] ... (other models)

- [ ] Find all `any` declarations
- [ ] Replace with proper types:
  - [ ] `admin/UsersRole/index.tsx`
  - [ ] `finance/reports/index.tsx`
  - [ ] Others (search codebase)

- [ ] Run TypeScript check: `npx tsc --noEmit`
- [ ] Fix compilation errors

---

### Task 5.5: Error & Empty State Handling (Top 5)
- [ ] `finance/transactions/index.tsx`
  - [ ] Add error state management
  - [ ] Add error message display
  - [ ] Add empty state UI
- [ ] `finance/withdrawals/index.tsx` - Same
- [ ] `finance/reports/index.tsx` - Same
- [ ] `logistik/orders/index.tsx` - Same
- [ ] `admin/affiliates/index.tsx` - Same

---

### Task 5.6: Security Audit (Optional)
- [ ] Verify CSRF protection
- [ ] Test role-based access
- [ ] Check data privacy/masking needs
- [ ] Verify XSS prevention
- [ ] Validate form inputs
- [ ] Run `npm audit`

---

### Task 5.7: PWA Compliance (Optional)
- [ ] Create `public/manifest.json`
- [ ] Add web app meta tags
- [ ] Create basic service worker
- [ ] Test installability

---

## 📊 WEEKLY PROGRESS TRACKER

### Week 1
- [ ] Day 1-2: Constants + Raw HTML tables
- [ ] Day 3-4: Status badges standardization
- [ ] Day 5: Statistics cards + pagination

**Status Badges:** 15 files × 10 min = 2.5 hours
**Overall:** 16 hours committed

### Week 2
- [ ] Day 1-2: FilterPanel component
- [ ] Day 3-4: StatsCard component
- [ ] Day 5: Start ReportTable or LoadingStates

**Overall:** 20 hours committed

### Week 3
- [ ] Day 1-2: ReportTable + LoadingStates
- [ ] Day 3-4: Commission consolidation start
- [ ] Day 5: Dark mode (Priority 1 dashboards)

**Overall:** 18 hours committed

### Week 4
- [ ] Day 1-2: Commission consolidation complete
- [ ] Day 3: Orders system definition
- [ ] Day 4: Reports consolidation start
- [ ] Day 5: Dark mode (Priority 2)

**Overall:** 20 hours committed

### Week 5
- [ ] Day 1-3: Reports consolidation complete
- [ ] Day 4-5: Dark mode (Priority 3) + Type safety

**Overall:** 15 hours committed

### Week 6
- [ ] Day 1-3: Testing, QA, final dark mode
- [ ] Day 4-5: Bug fixes, documentation

**Overall:** 12 hours committed

---

## 🚀 HOW TO USE THIS CHECKLIST

1. **Print it out** - Keep on your desk
2. **Check off tasks** as you complete them
3. **Track time** spent on each task (helps with future estimation)
4. **Update weekly** - Move to next week's section
5. **Communicate progress** - Share completed tasks with team

---

## ⚠️ COMMON PITFALLS TO AVOID

- ❌ Don't skip Phase 1 to get to Phase 2 - Components need foundation
- ❌ Don't refactor all pages at once - Do one category at a time
- ❌ Don't forget to test dark mode while implementing
- ❌ Don't remove old code until new code tested
- ❌ Don't skip accessibility - Add as you go
- ❌ Don't deploy Phase 5 without Phase 1-2 complete

---

## ✅ SUCCESS SIGNS

**Phase 1 Complete When:**
- All pages use same status color map
- All tables use shadcn/ui Table component
- All statistics cards use consistent pattern
- Accessibility attributes visible in HTML

**Phase 2 Complete When:**
- FilterPanel used in all filter implementations
- StatsCard used in all dashboard pages
- ReportTable used in all report pages
- LoadingState shows on every page navigation

**Phase 3 Complete When:**
- Commission data consolidated
- Orders ownership defined
- Reports use builder pattern
- No duplicate data fetching

**Phase 4 Complete When:**
- All pages have loading states
- Images lazy load
- Meta tags configured
- Tables scroll on mobile

**Phase 5 Complete When:**
- Dark mode works everywhere
- No `any` types remain
- Error states handled
- All tests pass

---

**Last Updated:** 2026-02-23  
**Estimated Total Effort:** 100-120 hours (4-6 weeks, 1 developer)  
**Can Be Parallelized:** Yes, Phases 4-5 can run with Phase 3
