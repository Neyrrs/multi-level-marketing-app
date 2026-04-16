import SearchInput from '@/components/fragments/search-input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Laporan Penjualan',
        href: '/admin/LaporanPenjualan',
    },
];

interface SalesData {
    id: number;
    tanggal: string;
    nama_member: string;
    produk: string;
    jumlah: number;
    harga: number;
    total: number;
    status: 'completed' | 'pending' | 'failed';
}

interface Props {
    salesData: SalesData[];
    filters: { search?: string };
    summary: {
        totalSales: number;
        totalTransactions: number;
        completedCount: number;
    };
}

export default function LaporanPenjualan({ salesData, filters, summary }: Props) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/reports/LaporanPenjualan', { search: value }, { preserveState: true, replace: true });
    };

    const handleRefresh = () => {
        router.get('/admin/reports/LaporanPenjualan', {}, { preserveState: true });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-50';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            case 'failed':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Selesai';
            case 'pending':
                return 'Menunggu';
            case 'failed':
                return 'Gagal';
            default:
                return status;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Penjualan" />
            <div className="flex flex-col gap-6 p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
                            <p className="text-3xl font-bold">Rp {summary.totalSales.toLocaleString('id-ID')}</p>
                            <p className="text-xs text-gray-500">Periode: Bulan Ini</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
                            <p className="text-3xl font-bold">{summary.totalTransactions}</p>
                            <p className="text-xs text-gray-500">Semua Status</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Transaksi Selesai</p>
                            <p className="text-3xl font-bold text-green-600">{summary.completedCount}</p>
                            <p className="text-xs text-gray-500">Status Completed</p>
                        </div>
                    </Card>
                </div>

                {/* Filter & Actions */}
                <Card className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <SearchInput
                                onSearchChange={handleSearch}
                                value={search}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                className="gap-2"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Table */}
                <Card className="overflow-hidden">
                    <Table>
                        <TableCaption className="p-4">
                            Menampilkan {salesData.length} transaksi penjualan
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Nama Member</TableHead>
                                <TableHead>Produk</TableHead>
                                <TableHead className="text-right">Jumlah</TableHead>
                                <TableHead className="text-right">Harga</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {salesData.length > 0 ? (
                                salesData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            {new Date(item.tanggal).toLocaleDateString('id-ID')}
                                        </TableCell>
                                        <TableCell>{item.nama_member}</TableCell>
                                        <TableCell>{item.produk}</TableCell>
                                        <TableCell className="text-right">{item.jumlah}</TableCell>
                                        <TableCell className="text-right">
                                            Rp {item.harga.toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            Rp {item.total.toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    item.status
                                                )}`}
                                            >
                                                {getStatusLabel(item.status)}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        Tidak ada data yang cocok dengan pencarian
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
