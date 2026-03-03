import SearchInput from '@/components/fragments/search-input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Laporan Produk',
        href: '/admin/LaporanProduk',
    },
];

interface ProductData {
    id: number;
    nama_produk: string;
    stock: number;
    terjual: number;
    sisa: number;
    harga: number;
    total_revenue: number;
}

interface Props {
    products: ProductData[];
    filters: { search?: string };
    summary: {
        totalTerjual: number;
        totalRevenue: number;
        totalSku: number;
    };
}

export default function LaporanProduk({ products, filters, summary }: Props) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/reports/LaporanProduk', { search: value }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Produk" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Terjual</p><p className="text-3xl font-bold">{summary.totalTerjual}</p><p className="text-xs text-gray-500">Unit Produk</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Revenue</p><p className="text-3xl font-bold">Rp {(summary.totalRevenue / 1000000).toFixed(1)}M</p><p className="text-xs text-gray-500">Dari Penjualan</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Jenis Produk</p><p className="text-3xl font-bold">{summary.totalSku}</p><p className="text-xs text-gray-500">Total SKU</p></div></Card>
                </div>
                <Card className="p-6"><SearchInput onSearchChange={handleSearch} value={search}/></Card>
                <Card className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Produk</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                                <TableHead className="text-right">Terjual</TableHead>
                                <TableHead className="text-right">Sisa</TableHead>
                                <TableHead className="text-right">Harga</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama_produk}</TableCell>
                                    <TableCell className="text-right">{item.stock}</TableCell>
                                    <TableCell className="text-right text-green-600 font-semibold">{item.terjual}</TableCell>
                                    <TableCell className="text-right">{item.sisa}</TableCell>
                                    <TableCell className="text-right">Rp {item.harga.toLocaleString('id-ID')}</TableCell>
                                    <TableCell className="text-right font-semibold">Rp {item.total_revenue.toLocaleString('id-ID')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
