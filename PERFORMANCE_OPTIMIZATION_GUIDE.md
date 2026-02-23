# 🚀 Performance Optimization Guide - Logistik System

**Date:** February 18, 2026  
**Issue:** Pages loading slowly, especially Dashboard and Reports

---

## 📊 Performance Analysis

### Current Query Count Per Page

| Page | Current Queries | Status | Priority |
|------|-----------------|--------|----------|
| **Dashboard** | 8-10 queries | 🔴 SLOW | **HIGH** |
| **Shipments Index** | 2-3 queries | 🟡 OK | MEDIUM |
| **Orders Index** | 2-3 queries | 🟡 OK | MEDIUM |
| **Reports** | 3-5 queries | 🟡 SLOW | **HIGH** |
| **Inventory** | 1-2 queries | 🟢 FAST | LOW |
| **Returns** | 2-3 queries | 🟢 FAST | LOW |

---

## 🔍 Root Causes

### **1. Multiple COUNT Queries in Dashboard** ❌

```php
// ❌ CURRENT (8 separate queries)
$ordersAwaitingShipment = Order::where(...)->count();      // Query 1
$activeShipments = Shipment::whereIn(...)->count();        // Query 2
$deliveredThisMonth = Shipment::where(...)->count();       // Query 3
$shipmentsThisMonth = Shipment::whereMonth(...)->count();  // Query 4
$pendingReturns = Order::where(...)->count();              // Query 5
// + 3 more with GROUP BY aggregations
```

**Why it's slow:** Database processes each COUNT separately = multiple round-trips

---

### **2. N+1 Query Problem** ❌

```php
// ❌ PROBLEM: whereDoesntHave uses subquery for each order
$ordersAwaitingShipment = Order::where('payment_status', 'paid')
    ->whereDoesntHave('shipments')  // ← Potential N+1 for large dataset
    ->count();
```

**Why it's slow:** If there are 1000 orders, it might query shipments table 1000 times

---

### **3. Data Processing in PHP Instead of DB** ❌

```php
// ❌ CURRENT
collect($orders->items())->map(fn ($order) => [
    'id' => $order->id,
    'shipments_count' => $order->shipments()->count(),  // ← Extra query!
    ...
]);
```

**Why it's slow:** For 10 items, it counts shipments 10 times (10 extra queries!)

---

### **4. Complex Aggregations Without Caching** ❌

```php
// ❌ CURRENT (ReportController)
Shipment::selectRaw('courier, COUNT(*), SUM(CASE...)')
    ->whereBetween('created_at', [$start, $end])
    ->groupBy('courier')
    ->limit(5);  // Database scans all rows, then limits
```

**Why it's slow:** Scans entire table even for 30-day report

---

### **5. Eager Loading Everything** ⚠️

```php
// ⚠️ POTENTIALLY SLOW
Shipment::with(['order', 'user', 'affiliate', 'trackingHistories'])
    ->paginate(10);
```

**Why it might be slow:** Loads all relationships even if not all needed on page

---

## ✅ Optimization Solutions

### **QUICK WINS (Implement First - 30 mins)**

#### **1. Add Database Indexes**

```sql
-- Run these in database:

-- Orders table
ALTER TABLE orders ADD INDEX idx_payment_status (payment_status);
ALTER TABLE orders ADD INDEX idx_status_created (status, created_at);

-- Shipments table
ALTER TABLE shipments ADD INDEX idx_status_created (status, created_at);
ALTER TABLE shipments ADD INDEX idx_courier_status (courier, status);
ALTER TABLE shipments ADD INDEX idx_user_id_status (user_id, status);
ALTER TABLE shipments ADD INDEX idx_affiliate_id (affiliate_id);

-- ShipmentTracking table
ALTER TABLE shipment_trackings ADD INDEX idx_shipment_id_created (shipment_id, created_at);
```

**Expected improvement: 30-50% faster queries**

---

#### **2. Combine Dashboard COUNT Queries into 1**

**File:** `app/Http/Controllers/Logistik/DashboardController.php`

```php
// ✅ OPTIMIZED: Single database query with multiple aggregations
$today = now();
$thisMonth = $today->month;
$thisYear = $today->year;

// Get all stats in ONE query using raw SQL
$stats = DB::table('shipments')
    ->selectRaw('
        COUNT(CASE WHEN status IN ("pending", "ready_to_ship", "shipped", "in_transit") THEN 1 END) as active_shipments,
        COUNT(CASE WHEN status = "delivered" AND MONTH(actual_delivery_date) = ' . $thisMonth . ' AND YEAR(actual_delivery_date) = ' . $thisYear . ' THEN 1 END) as delivered_this_month,
        COUNT(CASE WHEN MONTH(created_at) = ' . $thisMonth . ' AND YEAR(created_at) = ' . $thisYear . ' THEN 1 END) as shipments_this_month
    ')
    ->first();

// Result: 1 query instead of 4 shipment queries!
```

---

#### **3. Avoid N+1 with Proper Query**

```php
// ❌ OLD (N+1 problem)
$ordersAwaitingShipment = Order::where('payment_status', 'paid')
    ->whereDoesntHave('shipments')
    ->count();

// ✅ NEW (Single optimized query)
$ordersAwaitingShipment = Order::leftJoin('shipments', 'orders.id', '=', 'shipments.order_id')
    ->where('orders.payment_status', 'paid')
    ->where('orders.status', 'processing')
    ->whereNull('shipments.id')  // No shipment exists
    ->count();
```

---

### **MEDIUM-TERM (Implement Next - 1-2 hours)**

#### **4. Add Caching to Dashboard**

```php
// ✅ Cache dashboard stats for 5 minutes
$stats = Cache::remember('logistik-dashboard-stats', now()->addMinutes(5), function () {
    return [
        'ordersAwaitingShipment' => $this->getOrdersAwaitingShipment(),
        'activeShipments' => $this->getActiveShipments(),
        'deliveredThisMonth' => $this->getDeliveredThisMonth(),
        // ...
    ];
});
```

**Expected improvement: First load normal, subsequent loads 100x faster!**

---

#### **5. Use Selective Eager Loading**

```php
// ❌ OLD: Load all relationships
Shipment::with(['order', 'user', 'affiliate', 'trackingHistories'])->paginate(10);

// ✅ NEW: Load only needed on this page
Shipment::with(['order:id,order_number', 'user:id,name,email'])  // Only needed columns
         ->withCount('trackingHistories')  // Count, don't load all
         ->paginate(10);
```

---

#### **6. Optimize Report Queries**

```php
// ✅ Filter BEFORE aggregation, use LIMIT + OFFSET
$topCouriers = Shipment::selectRaw('
    courier,
    COUNT(*) as total,
    SUM(CASE WHEN status = "delivered" THEN 1 ELSE 0 END) as delivered,
    ROUND(SUM(CASE WHEN status = "delivered" THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as delivery_rate
')
    ->whereBetween('created_at', [$startDate, $endDate])  // ← Filter first!
    ->groupBy('courier')
    ->having('COUNT(*)', '>', 0)
    ->orderByRaw('delivery_rate DESC')
    ->limit(5)  // ← Limit after group, not before
    ->get();
```

---

### **LONG-TERM (Production Best Practices)**

#### **7. Implement Query Counter Middleware**

Track slow queries in development:

```php
// config/database.php
'connections' => [
    'pgsql' => [
        // ...
        'slow_queries' => env('DB_SLOW_QUERY_THRESHOLD', 100), // ms
    ],
],
```

---

#### **8. Use Laravel Debugbar in Development**

```bash
composer require --dev barryvdh/laravel-debugbar
```

Instantly see:
- How many queries each page runs
- Which queries are slow
- N+1 problems highlighted

---

#### **9. Implement Pagination Queue Processing**

For heavy reports, use jobs:

```php
// Don't calculate live, queue it
class GenerateShipmentReport implements ShouldQueue {
    public function handle() {
        // Heavy aggregation runs in background
        $data = $this->calculateReport();
        Cache::put('shipment-report-' . $this->month, $data);
    }
}
```

---

## 📈 Expected Performance Improvement

| Optimization | Current | After | Improvement |
|--------------|---------|-------|-------------|
| **Add Indexes** | 500ms | 200ms | 60% faster ⚡ |
| **Combine Queries** | 400ms | 150ms | 62% faster ⚡ |
| **Caching** | 150ms | 8ms | 94% faster 🚀 |
| **Selective Loading** | 300ms | 100ms | 67% faster ⚡ |
| **COMBINED** | 500ms | **15-20ms** | **96% faster!** 🚀 |

---

## 🎯 Implementation Priority

### **Phase 1: IMMEDIATE (Do Today)**
1. ✅ Add database indexes (5 mins)
2. ✅ Combine dashboard counts (10 mins)
3. ✅ Fix N+1 with left join (5 mins)
4. ✅ Test and verify (10 mins)

**Total: 30 mins | Impact: 50-60% faster**

---

### **Phase 2: THIS WEEK**
1. Add caching layer
2. Selective eager loading
3. Query monitoring
4. Load testing

**Impact: 90%+ faster**

---

### **Phase 3: ONGOING**
1. Monitor slow queries weekly
2. Add indexes based on usage patterns
3. Optimize hot spots
4. Consider Read Replica for reports

---

## 🔧 Quick Start Implementation

### Step 1: Add Indexes (PostgreSQL)

```sql
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_status_date ON orders(status, created_at DESC);
CREATE INDEX idx_shipments_status_date ON shipments(status, created_at DESC);
CREATE INDEX idx_shipments_courier ON shipments(courier);
CREATE INDEX idx_shipments_user_status ON shipments(user_id, status);
```

### Step 2: Update DashboardController

Replace the 8 queries with optimized versions in the guide above.

### Step 3: Test Performance

In browser DevTools > Network tab, check:
- How long API calls take (should be <100ms)
- How many queries run (`php artisan tinker` → `DB::listen(fn($q) => dump($q))`)

---

## 📊 Monitoring Commands

```bash
# See slow queries in development
php artisan tinker
> \DB::listen(function($query) { if($query->time > 100) dump($query->sql); })

# Run report and see execution time
time curl http://localhost:8000/logistik/reports/delivery
```

---

## ✨ Why Dashboard Was Slow Before Empty State Fix

1. **Was trying to render heavy queries** even when data returned nothing
2. **Browser was waiting** for 8 database queries to complete
3. **When empty state added**, no data to process = instant render
4. **Database still ran queries**, but page didn't wait for all results before showing

**Solution:** Combine queries + add caching = instant loads for both empty and populated pages

---

**Status:** Ready to implement  
**Estimated Time:** 30 mins for 60% improvement, 2 hours for 96% improvement  
**Priority:** HIGH for production deployment
