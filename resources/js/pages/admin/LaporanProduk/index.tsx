import SearchInput from '@/components/fragments/search-input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboardUrl } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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

const dummyData: ProductData[] = [
    { id: 1, nama_produk: 'Produk A Premium', stock: 100, terjual: 35, sisa: 65, harga: 150000, total_revenue: 5250000 },
    { id: 2, nama_produk: 'Produk B Standard', stock: 150, terjual: 80, sisa: 70, harga: 100000, total_revenue: 8000000 },
    { id: 3, nama_produk: 'Produk C Limited', stock: 50, terjual: 25, sisa: 25, harga: 500000, total_revenue: 12500000 },
];

export default function LaporanProduk() {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(dummyData);

    const handleSearch = (value: string) => {
        setSearch(value);
        setFiltered(dummyData.filter(item => item.nama_produk.toLowerCase().includes(value.toLowerCase())));
    };

    const totalTerjual = filtered.reduce((sum, item) => sum + item.terjual, 0);
    const totalRevenue = filtered.reduce((sum, item) => sum + item.total_revenue, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Produk" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Terjual</p><p className="text-3xl font-bold">{totalTerjual}</p><p className="text-xs text-gray-500">Unit Produk</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Revenue</p><p className="text-3xl font-bold">Rp {(totalRevenue / 1000000).toFixed(1)}M</p><p className="text-xs text-gray-500">Dari Penjualan</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Jenis Produk</p><p className="text-3xl font-bold">{dummyData.length}</p><p className="text-xs text-gray-500">Total SKU</p></div></Card>
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
                            {filtered.map(item => (
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
