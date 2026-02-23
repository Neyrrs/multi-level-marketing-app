# PERBAIKAN ZIGGY ROUTES - LAPORAN FINAL

## MASALAH YANG DIPERBAIKI

### 1. **Route Name Conflicts (FIXED ✓)**
**Masalah:**
- API routes di `/admin/api/*` menggunakan nama yang SAMA seperti routes di `/admin/*`
- Contoh:
  - Route `/admin/products` → `admin.products.index`
  - Route `/admin/api/products` → `admin.products.index` (CONFLICT!)
- Laravel only keep the LAST registered route dengan nama yang sama
- Akibatnya: `admin.products.index` menunjuk ke API route, bukan UI route

**Solusi:**
```php
// Sebelum (SALAH)
Route::apiResource('api/products', ProductsController::class);

// Sesudah (BENAR)
Route::apiResource('api/products', ProductsController::class, ['names' => 'api.products']);
```

Perubahan di `routes/web.php`:
- `api/products` → route names: `api.products.index`, `api.products.store`, etc
- `api/commission-methods` → route names: `api.commission-methods.*`
- `api/commission-rules` → route names: `api.commission-rules.*`
- `api/withdrawals` → route names: `api.withdrawals.*`

---

### 2. **Sidebar Route Names Inconsistency (FIXED ✓)**
**Masalah:**
- Sidebar menggunakan route name `pengaturan-plan.index` 
- Tapi actual route name adalah `admin.plan-setting` (tanpa `.index`)
- Result: Ziggy can't find the route → error "Cannot read properties of undefined"

**Solusi:**
- Ubah di `app-sidebar.tsx` line 100:
  - Dari: `getHref('pengaturan-plan.index', '/admin/plan-setting')`
  - Ke: `getHref('admin.plan-setting', '/admin/plan-setting')`

---

### 3. **Ziggy Integration Not Passed to Frontend (FIXED ✓)**
**Masalah:**
- Ziggy library diinstall dan imported di React
- Tapi route definitions (Ziggy object) tidak di-share dari Laravel ke frontend
- Frontend call `route('admin.products.index')` tapi Ziggy tidak tahu routes apa yang available
- Result: Ziggy returns undefined untuk semua routes

**Solusi A - Share via Inertia Props:**
```php
// app/Providers/AppServiceProvider.php
Inertia::share([
    'ziggy' => fn () => [
        ...(new Ziggy())->toArray(),
        'location' => Request::url(),
    ],
    'auth.user.roles' => fn() => auth()->check() ? auth()->user()->getRoleNames()->toArray() : [],
]);
```

**Solusi B - Initialize in app.tsx:**
```tsx
// resources/js/app.tsx
setup({ el, App, props }) {
    if (props.initialPage?.props?.ziggy) {
        (window as any).route = (name: string, params?: any) => 
            route(name, params, undefined, props.initialPage?.props?.ziggy);
    } else {
        (window as any).route = route;
    }
    // ...
}
```

---

## FILE YANG DIUBAH

### 1. routes/web.php
- Lines 90-93: Ubah apiResource routes untuk pakai custom names
- Lines 99-102: Ubah pengaturan-plan.index → admin.plan-setting

### 2. app/Providers/AppServiceProvider.php
- Tambah import: `use Tighten\Ziggy\Ziggy;`
- Update Inertia::share() untuk include Ziggy routes object

### 3. resources/js/app.tsx
- Update setup() untuk properly initialize window.route dengan Ziggy data

### 4. resources/js/components/app-sidebar.tsx
- Line 100: Fix 'pengaturan-plan.index' → 'admin.plan-setting'

---

## VERIFICATION CHECKLIST

✓ Route name conflicts resolved
✓ API routes have unique names (`api.products.*` not `admin.products.*`)
✓ Sidebar route names match actual Laravel routes
✓ Ziggy object passed via Inertia
✓ window.route initialization updated
✓ All caches cleared (`php artisan optimize:clear`)

---

## ROUTE NAMES YANG BENAR (untuk reference)

### Pages (Inertia Render)
```
admin.dashboard                         → GET /admin/dashboard
admin.products.index                    → GET /admin/products
admin.products.create                   → GET /admin/products/create
admin.products.edit                     → GET /admin/products/{product}/edit

admin.commission-methods.index          → GET /admin/commission-methods
admin.commission-methods.create         → GET /admin/commission-methods/create
admin.commission-methods.edit           → GET /admin/commission-methods/{commissionMethod}/edit

admin.commission-rules.index            → GET /admin/commission-rules
admin.commission-rules.create           → GET /admin/commission-rules/create
admin.commission-rules.edit             → GET /admin/commission-rules/{commissionRule}/edit

admin.affiliates.index                  → GET /admin/affiliates
admin.withdrawals.index                 → GET /admin/withdrawals
admin.payout-report                     → GET /admin/payout-report
admin.notifications.index               → GET /admin/notifications

admin.plan-setting                      → GET /admin/plan-setting
admin.product-management                → GET /admin/product-management
admin.affiliate-management              → GET /admin/affiliate-management
admin.commission-setting                → GET /admin/commission-setting
```

### API Resources
```
api.products.index, store, show, update, destroy
api.commission-methods.index, store, show, update, destroy
api.commission-rules.index, store, show, update, destroy
api.withdrawals.index, store, show, update, destroy
```

### Store/Update/Delete (JSON)
```
admin.products.store                    → POST /admin/products
admin.products.update                   → PUT /admin/products/{product}
admin.products.destroy                  → DELETE /admin/products/{product}

admin.commission-methods.store          → POST /admin/commission-methods
admin.commission-methods.update         → PUT /admin/commission-methods/{commissionMethod}
admin.commission-methods.destroy        → DELETE /admin/commission-methods/{commissionMethod}

admin.commission-rules.store            → POST /admin/commission-rules
admin.commission-rules.update           → PUT /admin/commission-rules/{commissionRule}
admin.commission-rules.destroy          → DELETE /admin/commission-rules/{commissionRule}

admin.affiliates.approve                → POST /admin/affiliates/{affiliate}/approve
admin.affiliates.set-sponsor            → POST /admin/affiliates/{affiliate}/set-sponsor
admin.affiliates.set-position           → POST /admin/affiliates/{affiliate}/set-position

admin.withdrawals.approve               → POST /admin/withdrawals/{withdrawal}/approve
admin.withdrawals.reject                → POST /admin/withdrawals/{withdrawal}/reject

admin.notifications.resend              → POST /admin/notifications/{id}/resend
admin.notifications.destroy             → DELETE /admin/notifications/{id}
```

---

## DEBUGGING TIPS

### Jika masih error "Cannot read properties of undefined"

**Step 1: Check Routes Registered**
```bash
php artisan route:list | grep admin
```
Pastikan nama routes benar (tidak ada duplicate `admin.products.index`)

**Step 2: Check Ziggy Share**
Buka browser DevTools → Network → Go to page → Find fetch request
Check response JSON untuk ada field `ziggy` dengan routes data

**Step 3: Check Window.route**
Buka browser Console ketik:
```javascript
window.route('admin.dashboard')
```
Harus return `/admin/dashboard` bukan undefined

**Step 4: Check Page Props**
Di React component, log props:
```tsx
const { ziggy } = usePage().props;
console.log('Ziggy available:', !!ziggy);
console.log('Routes:', ziggy?.routes ? Object.keys(ziggy.routes).length : 0);
```

### Jika route() function masih undefined

Pastikan semua pages import:
```tsx
import { route } from 'ziggy-js';
```

Dan sidebar component juga:
```tsx
import { route } from 'ziggy-js';
```

---

## DEPLOYMENT NOTES

Setelah perbaikan, run:
```bash
php artisan optimize:clear
php artisan route:clear
npm run build  # untuk production
```

---

## SUMMARY

✅ **Status: SEMUA MASALAH SUDAH DIPERBAIKI**

**Root causes yang diperbaiki:**
1. ✓ Route name collisions between API and UI routes
2. ✓ Sidebar using non-existent route names
3. ✓ Ziggy definition not passed to frontend
4. ✓ Frontend route() function not properly initialized

**Expected result:**
- `route('admin.dashboard')` → works ✓
- `route('admin.products.index')` → works ✓
- All sidebar links → redirect correctly ✓
- No "Cannot read properties of undefined" errors ✓

Error yang anda alami harusnya sudah fixed sekarang!
