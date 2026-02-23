# 🔥 INSTRUKSI LANJUTAN - AKTIVASI AFFILIATE PANEL

**Status**: 50% selesai ✅  
**Waktu baca**: 5 menit  
**Action**: Siap untuk lanjutan

---

## 📍 POSISI SAAT INI

```
✅ DONE:
- 16 controllers dengan data fetching
- Routes dikonfigurasi
- Dashboard page aktif (real data)
- Komisi page aktif (real data)
- Semua database queries siap
- TypeScript types ready

⏳ NEXT:
- Update 15 halaman lagi (copy & paste pattern)
- Test semuanya
- Buat POST endpoints
```

---

## 🚀 INSTRUKSI STEP-BY-STEP LANJUTAN

### **STEP 1: Verify Current Implementation** (10 menit)

```bash
# Terminal 1
cd c:\Project\alus-astech
npm run dev

# Terminal 2 (di folder yang sama)
php artisan serve
```

**Acara di browser:**
1. Buka `http://localhost:3000` (atau sesuai port npm)
2. Login sebagai affiliate
3. Buka **`/affiliate/dashboard`**
   - ✅ Should see: 4 cards dengan stats real
   - ✅ Should see: Recent commissions list
4. Buka **`/affiliate/komisi`**
   - ✅ Should see: Commission table
   - ✅ Should see: 4 status filter buttons
   - ✅ Should see: Stats cards

Jika TIDAK bisa akses:
- Check user punya role 'affiliate'
- Check if affiliate record exists di database
- Check Laravel logs: `storage/logs/laravel.log`

---

### **STEP 2: Copy Template Halaman** (2-3 jam)

Untuk 15 halaman lain, gunakan PATTERN dari `komisi/index.tsx`:

#### **Template To Copy:**

**File**: `resources/js/pages/affiliate/komisi/index.tsx`

**Gunakan pattern ini untuk setiap halaman:**

```tsx
// 1. Add imports (sesuaikan dengan halaman)
import { Table, TableBody, ... } from '@/components/ui/table';
import { Card, CardContent, ... } from '@/components/ui/card';

// 2. Define interface untuk props
interface Props {
    items: { data: ItemType[]; total: number };
    stats?: StatsType;
}

// 3. Component menerima props
export default function ComponentName({ items, stats }: Props) {
    // 4. Display stats cards (jika ada)
    // 5. Display filter buttons (jika ada)
    // 6. Display table/list dengan real data
}
```

#### **15 Halaman yang perlu update:**

| # | Halaman | File | Priority | Props dari Controller |
|---|---------|------|----------|-----|
| 1 | Downline | `downline/index.tsx` | 🔴 HIGH | `downlines`, `total` |
| 2 | Shop | `shop/index.tsx` | 🔴 HIGH | `products`, `cart` |
| 3 | Binary | `binary/index.tsx` | 🔴 HIGH | `affiliate`, `binaryTree`, `stats` |
| 4 | Pin List | `pin-list/index.tsx` | 🟡 MED | `pins`, `statusCounts` |
| 5 | Shop History | `shop-history/index.tsx` | 🟡 MED | `orders` |
| 6 | Tree | `tree/index.tsx` | 🟡 MED | `currentAffiliate`, `treeData` |
| 7 | Matching | `matching-bonus/index.tsx` | 🟡 MED | `matchingHistory`, `stats` |
| 8 | Personal | `personal-ro/index.tsx` | 🟡 MED | `personalCommissions`, `stats` |
| 9 | Generation | `generation-ro/index.tsx` | 🟡 MED | `generationCommissions`, `stats` |
| 10 | Sponsor | `sponsor/index.tsx` | 🟡 MED | `sponsor`, `siblings` |
| 11 | Settings | `pengaturan/index.tsx` | 🟡 MED | `user`, `profile`, `bankAccounts` |
| 12 | Kode | `kode/index.tsx` | 🟡 MED | `codes` |
| 13 | Reward | `reward/index.tsx` | 🟡 MED | `products` |
| 14 | Pin History | `pin-history/index.tsx` | 🟡 MED | `history` |
| 15 | Redeem | `redeem/index.tsx` | 🟡 MED | `availableCodes` |

---

### **STEP 3: Update Each Component** (15 menit per component)

**Contoh: Update `downline/index.tsx`**

1. **Open file:**
   ```
   resources/js/pages/affiliate/downline/index.tsx
   ```

2. **Add imports:**
   ```tsx
   import { Table, TableBody, ... } from '@/components/ui/table';
   import { Card, CardContent, ... } from '@/components/ui/card';
   ```

3. **Define interface di top:**
   ```tsx
   interface Props {
       downlines: {
           data: Array<{
               id: number;
               name: string;
               username: string;
               level: number;
               position: string;
               created_at: string;
               is_active: boolean;
           }>;
       };
       total: number;
   }
   ```

4. **Update component:**
   ```tsx
   export default function Downline({ downlines, total }: Props) {
       return (
           <AppLayout breadcrumbs={breadcrumbs}>
               <Head title="Downline" />
               <div className="...">
                   {/* Stats card */}
                   <Card>
                       <CardContent>
                           Total Downline: {total}
                       </CardContent>
                   </Card>

                   {/* Table */}
                   <Table>
                       <TableHeader>
                           <TableRow>
                               <TableHead>Name</TableHead>
                               <TableHead>Username</TableHead>
                               <TableHead>Level</TableHead>
                               <TableHead>Position</TableHead>
                           </TableRow>
                       </TableHeader>
                       <TableBody>
                           {downlines.data.map(item => (
                               <TableRow key={item.id}>
                                   <TableCell>{item.name}</TableCell>
                                   <TableCell>{item.username}</TableCell>
                                   <TableCell>{item.level}</TableCell>
                                   <TableCell>{item.position}</TableCell>
                               </TableRow>
                           ))}
                       </TableBody>
                   </Table>
               </div>
           </AppLayout>
       );
   }
   ```

5. **Test di browser:**
   - Open `/affiliate/downline`
   - Check: Data tampil?
   - Check: Console ada error?

6. **Repeat untuk 14 halaman lain** (copy pattern yang sama)

---

### **STEP 4: Test All Pages** (30 menit)

List semua 17 halaman dan test masing-masing:

```
Components to test:
☐ /affiliate/dashboard         ✅ (already done)
☐ /affiliate/komisi            ✅ (already done)
☐ /affiliate/downline          [After update]
☐ /affiliate/shop              [After update]
☐ /affiliate/binary            [After update]
☐ /affiliate/tree              [After update]
☐ /affiliate/pin-list          [After update]
☐ /affiliate/pin-history       [After update]
☐ /affiliate/shop-history      [After update]
☐ /affiliate/matching-bonus    [After update]
☐ /affiliate/personal          [After update]
☐ /affiliate/generation-ro     [After update]
☐ /affiliate/sponsor           [After update]
☐ /affiliate/pengaturan        [After update]
☐ /affiliate/kode              [After update]
☐ /affiliate/reward            [After update]
```

**Test criteria:**
- [ ] Page loading tanpa error
- [ ] Data tampil
- [ ] No console errors
- [ ] No TypeScript warnings
- [ ] Formatting correct (Rp for currency, dates, etc.)

---

### **STEP 5: Next Phase - POST Endpoints** (OPTIONAL, boleh skip untuk sekarang)

Jika sudah selesai update UI, next adalah write operations:

**Endpoints yang perlu:**
```php
POST /affiliate/shop/add-to-cart           → ShoppingService
POST /affiliate/shop/checkout              → OrderService

POST /affiliate/withdrawals                → WithdrawalService
GET  /affiliate/withdrawals               

POST /affiliate/pengaturan                 → UserProfileService
POST /affiliate/bank-accounts              → UserProfileService
```

**Steps:**
1. Create Service class di `app/Services/`
2. Add POST routes di `routes/web.php`
3. Add endpoint methods di controller
4. Create form components di frontend
5. Add form handlers (using `@inertiajs/react` router.post)

---

## 💾 FILES REFERENCE

### **Untuk Copy Pattern:**
- Template page: `resources/js/pages/affiliate/komisi/index.tsx`
- Template stats: `resources/js/pages/affiliate/dashboard.tsx`

### **Untuk Understand Props:**
- Open respective controller di `app/Http/Controllers/Affiliate/`
- Lihat di `Inertia::render()` call
- Props yang dikirim = apa yang bisa diakses di component

### **Untuk UI Components:**
- Buka: `resources/js/components/ui/`
- Available: Card, Table, Button, Badge, Input, Select, Dialog, dll.

---

## 🎯 PRIORITY ORDER

Jika waktu terbatas, prioritas:

1. **🔴 HIGH** (WAJIB duluan):
   - Downline
   - Shop
   - Binary

2. **🟡 MEDIUM** (Penting):
   - Pin List
   - Shop History
   - Tree

3. **🟢 LOW** (Boleh belakangan):
   - Matching bonus
   - Personal
   - Generation
   - Sponsor
   - Settings
   - Kode
   - Reward
   - Pin History

---

## ❌ Common Mistakes To Avoid

```
❌ Don't: Use placeholder images/text
   ✅ Do: Use real data dari props

❌ Don't: Forget to define props interface
   ✅ Do: Add interface at top of file

❌ Don't: Skip the optional props
   ✅ Do: Use `stats?: Object` untuk optional

❌ Don't: Hardcode styling
   ✅ Do: Copy Tailwind classes dari komisi page

❌ Don't: Forget to test each page
   ✅ Do: Test sambil bikin

❌ Don't: Use old route() helper
   ✅ Do: Use route strings (/affiliate/...)
```

---

## 📊 PROGRESS TRACKER

**Start Time**: Now  
**Target Time**: Next 3-4 hours

```
0%     ────────────────────────────────────── 100%
✅ 50% (Done: Backend + 2 components)
       ⏳ 90% (Target: All components UI updated)
              ✅ 100% (Target: All pages tested)
```

---

## 🆘 Troubleshooting Quick Tips

| Problem | Solution |
|---------|----------|
| Page blank | Check if props passed. See Network tab in DevTools |
| "Cannot read property" | Add null check: `if (!items?.data)` |
| No data showing | Console error? Check Laravel logs. Check controller query |
| Styling wrong | Copy Tailwind from komisi page. Check class names |
| TypeScript error | Define interface for props. Check prop types |
| Route 404 | Check routes/web.php. Run: `php artisan route:list` |

---

## ✅ FINAL CHECKLIST

Before saying "DONE":

```
Backend:
☑ All 16 controllers have index() methods
☑ All return Inertia::render() with data
☑ Routes configured with names
☑ Middleware setup correct

Frontend:
☑ All 17 pages have props interface  
☑ All pages display data from props
☑ No TypeScript errors
☑ No JavaScript console errors
☑ All pages tested & working
☑ Data formatting correct (Rp, dates)
☑ Status colors appropriate

Testing:
☑ Dashboard loads
☑ Komisi filters work
☑ All pages accessible
☑ Pagination works (where applicable)
☑ Search works (where applicable)
```

---

## 🎉 After Completion

Setelah 15 halaman selesai:

1. **Celebrate!** 🎊 Anda sudah 90% selesai

2. **Test end-to-end:**
   - Login sebagai affiliate
   - Navigate 17 halaman
   - Verify data

3. **Next phase (optional):**
   - Add write operations (POST/PUT)
   - Add forms & validations
   - Add real-time updates

4. **Go live preparation:**
   - Performance optimization
   - Security audit
   - Production deployment

---

## 📞 QUICK REFERENCE

**Jika stuck atau ada pertanyaan:**

1. Check `AFFILIATE_IMPLEMENTATION_GUIDE.md` - Technical details
2. Check `AFFILIATE_QUICK_START.md` - Quick reference
3. Look at existing components:
   - `dashboard.tsx` - For card layouts
   - `komisi/index.tsx` - For table layouts
4. Check controller to see what data available

---

**GOOD LUCK! Semoga cepat selesai!** 🚀

Next action: Buka `downline/index.tsx` dan mulai update!

---

**Time to Complete Remaining Work:**
- Update 15 components: **2-3 hours**
- Testing: **30 minutes**
- **TOTAL**: **~3 hours**

**Estimated Completion**: Today (in 3 hours) ✅
