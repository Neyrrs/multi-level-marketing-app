'use client';

import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Eye, PackageX, TrendingDown, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Logistik', href: '#' },
    { title: 'Pengembalian', href: '/logistik/returns' },
];

interface Return {
    id: number;
    shipment_number: string;
    tracking_number: string;
    order_number: string;
    recipient_name: string;
    courier: string;
    reason: string;
    created_at: string;
    actual_delivery_date: string;
    user_name: string;
    status: string;
}

interface Stats {
    totalReturns: number;
    returnedThisMonth: number;
    returnRate: number;
}

interface Pagination {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    hasMore: boolean;
}

export default function ReturnsIndex() {
    const { returns, stats, pagination } = usePage().props as any;
    const [search, setSearch] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengembalian" />
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl md:p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="md:text-xl text-base font-semibold">Total Pengembalian</CardTitle>
                            <PackageX className="h-6 w-6 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Stats).totalReturns}</div>
                            <p className="text-xs text-gray-500">Semua waktu</p>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="md:text-xl text-base font-semibold">Bulan Ini</CardTitle>
                            <AlertCircle className="h-6 w-6 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Stats).returnedThisMonth}</div>
                            <p className="text-xs text-gray-500">Pengembalian bulan ini</p>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="md:text-xl text-base font-semibold">Tingkat Pengembalian</CardTitle>
                            <TrendingDown className="h-4 w-6 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{(stats as Stats).returnRate}%</div>
                            <p className="text-xs text-gray-500">Dari total pengiriman</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="flex gap-2">
                    <Input
                        placeholder="Cari nomor resi, nomor order, atau nama penerima..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-md"
                    />
                    <Button variant="outline">Cari</Button>
                </div>

                {/* Returns Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengembalian Barang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nomor Pengiriman</TableHead>
                                    <TableHead>Nomor Resi</TableHead>
                                    <TableHead>Nomor Order</TableHead>
                                    <TableHead>Penerima</TableHead>
                                    <TableHead>Kurir</TableHead>
                                    <TableHead>Alasan</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(returns as Return[]).map((returnItem) => (
                                    <TableRow key={returnItem.id}>
                                        <TableCell className="font-mono text-sm">{returnItem.shipment_number}</TableCell>
                                        <TableCell className="font-mono text-sm">{returnItem.tracking_number}</TableCell>
                                        <TableCell className="font-medium">{returnItem.order_number}</TableCell>
                                        <TableCell>{returnItem.recipient_name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{returnItem.courier}</Badge>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-sm text-gray-600">
                                            {returnItem.reason}
                                        </TableCell>
                                        <TableCell className="text-sm">{returnItem.created_at}</TableCell>
                                        <TableCell className="text-center">
                                            <Link href={`/logistik/returns/${returnItem.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {(returns as Return[]).length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 py-8">
                                <PackageX className="h-8 w-8 text-gray-400" />
                                <p className="text-gray-500">Tidak ada pengembalian ditemukan</p>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Menampilkan {(pagination as Pagination).perPage} dari {(pagination as Pagination).total} pengembalian
                            </p>
                            <div className="flex gap-2">
                                {(pagination as Pagination).currentPage > 1 && (
                                    <Button variant="outline">← Sebelumnya</Button>
                                )}
                                {(pagination as Pagination).hasMore && (
                                    <Button variant="outline">Berikutnya →</Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
