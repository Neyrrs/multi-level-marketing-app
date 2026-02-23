# 🏁 FINAL 6 COMPONENTS - COPY & PASTE TEMPLATES

**Status**: 11/17 components updated ✅  
**Remaining**: 6 components  
**Time to complete**: ~15-20 minutes

---

## 📋 COMPONENT #1: Generation-RO

**File**: `resources/js/pages/affiliate/generation-ro/index.tsx`

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Komisi Generasi', href: '/affiliate/generation-ro' },
];

interface Props {
    generationCommissions: { data: Array<any>; total: number };
    stats?: any;
}

export default function GenerationRO({ generationCommissions, stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Komisi Generasi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {stats && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Total Generasi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp {stats.totalGeneration?.toLocaleString?.('id-ID') || '0'}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Max Level</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.maxLevel || 0}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Total Komisi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp {stats.grandTotal?.toLocaleString?.('id-ID') || '0'}</div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Komisi Berdasarkan Level</h3>
                    {generationCommissions?.data?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Depth Level</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {generationCommissions.data.map((item, i) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>Level {item.depth_level}</TableCell>
                                        <TableCell>Rp {item.amount?.toLocaleString?.('id-ID')}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No data</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
```

---

## 📋 COMPONENT #2: Sponsor

**File**: `resources/js/pages/affiliate/sponsor/index.tsx`

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Sponsor', href: '/affiliate/sponsor' },
];

interface Props {
    sponsor: { name: string; username: string; level: number; total_downline: number } | null;
    siblings: Array<any>;
}

export default function Sponsor({ sponsor, siblings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sponsor" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Sponsor Info */}
                {sponsor && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Sponsor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="font-semibold">Nama:</span> {sponsor.name}</p>
                            <p><span className="font-semibold">Username:</span> @{sponsor.username}</p>
                            <p><span className="font-semibold">Level:</span> {sponsor.level}</p>
                            <p><span className="font-semibold">Total Downline:</span> {sponsor.total_downline}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Siblings */}
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Rekan Sejawat (Siblings)</h3>
                    {siblings?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Downline</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {siblings.map((sibling, i) => (
                                    <TableRow key={sibling.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{sibling.name}</TableCell>
                                        <TableCell>@{sibling.username}</TableCell>
                                        <TableCell>{sibling.level}</TableCell>
                                        <TableCell>{sibling.direct_downline}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No siblings</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
```

---

## 📋 COMPONENT #3: Reward

**File**: `resources/js/pages/affiliate/reward/index.tsx`

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Produk Reward', href: '/affiliate/reward' },
];

interface Props {
    products: Array<{ id: number; name: string; price: number; image: string; category: string }>;
}

export default function Reward({ products }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk Reward" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-6">Produk Reward Tersedia</h3>
                    {products?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <Card key={product.id}>
                                    <CardContent className="pt-6">
                                        <img src={product.image || 'https://via.placeholder.com/400x300'} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
                                        <h4 className="font-semibold">{product.name}</h4>
                                        <p className="text-sm text-gray-600">{product.category}</p>
                                        <p className="text-lg font-bold text-primary mt-2">Rp {product.price.toLocaleString('id-ID')}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">No products available</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
```

---

## 📋 COMPONENT #4: Pin-History

**File**: `resources/js/pages/affiliate/pin-history/index.tsx`

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Riwayat PIN', href: '/affiliate/pin-history' },
];

interface Props {
    history: { data: Array<any>; total: number };
}

export default function PinHistory({ history }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat PIN" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Riwayat PIN yang Digunakan</h3>
                    {history?.data?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>PIN</TableHead>
                                    <TableHead>Produk</TableHead>
                                    <TableHead>Dibuat</TableHead>
                                    <TableHead>Digunakan</TableHead>
                                    <TableHead>Dipakai Oleh</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.data.map((item, i) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell className="font-mono">{item.code}</TableCell>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell>{new Date(item.created_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>{new Date(item.used_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>{item.used_by_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No history</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
```

---

## 📋 COMPONENT #5: Kode

**File**: `resources/js/pages/affiliate/kode/index.tsx`

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Kode', href: '/affiliate/kode' },
];

interface Props {
    codes: { data: Array<any>; total: number };
}

export default function Kode({ codes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kode" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Kode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{codes?.data?.length || 0}</div>
                    </CardContent>
                </Card>
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Daftar Kode Saya</h3>
                    {codes?.data?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Produk</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {codes.data.map((code, i) => (
                                    <TableRow key={code.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell className="font-mono font-semibold">{code.code}</TableCell>
                                        <TableCell>{code.product_name}</TableCell>
                                        <TableCell>{code.status}</TableCell>
                                        <TableCell>{new Date(code.created_at).toLocaleDateString('id-ID')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No codes</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
```

---

## 📋 COMPONENT #6: Redeem

**File**: `resources/js/pages/affiliate/redeem/index.tsx`

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Redeem Kode', href: '/affiliate/redeem' },
];

interface Props {
    availableCodes: Array<{ id: number; code: string; product_name: string }>;
}

export default function Redeem({ availableCodes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Redeem Kode" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="font-semibold text-lg mb-6">Kode Aktivasi Tersedia</h3>
                    {availableCodes?.length > 0 ? (
                        <div className="grid gap-4">
                            {availableCodes.map((code) => (
                                <Card key={code.id}>
                                    <CardContent className="pt-6 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{code.product_name}</p>
                                            <p className="text-sm text-gray-600 font-mono">{code.code}</p>
                                        </div>
                                        <Button onClick={() => router.post('/affiliate/redeem', { code_id: code.id })}>
                                            Redeem
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">No codes available for redemption</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
```

---

## ⚡ QUICK UPDATE STEPS

1. Open each file listed above
2. Select ALL content (Ctrl+A)
3. Delete ALL
4. Paste the template code from this file
5. Save (Ctrl+S)
6. Repeat for all 6 components

**Total time**: 10-15 minutes

---

## ✅ VERIFICATION CHECKLIST

After copying all 6:
- [ ] All files saved
- [ ] No syntax errors (check VS Code)
- [ ] Run `npm run build` - should complete
- [ ] Test in browser - visit `/affiliate/generation-ro`, etc.
- [ ] Confirm data displays (not empty)

---

## 🎉 COMPLETION STATUS

After implementing these 6:
- ✅ 17/17 components updated
- ✅ All pages displaying real data
- ✅ Phase 2 COMPLETE!

**Next**: POST endpoints implementation (Phase 3)

---

**Good luck! Copy and paste baby! 🚀**
