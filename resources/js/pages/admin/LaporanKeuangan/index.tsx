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
        title: 'Laporan Keuangan',
        href: '/admin/LaporanKeuangan',
    },
];

interface FinanceData {
    kategori: string;
    masuk: number;
    keluar: number;
    saldo: number;
}

const dummyData: FinanceData[] = [
    { kategori: 'Penjualan Produk', masuk: 10000000, keluar: 0, saldo: 10000000 },
    { kategori: 'Komisi Member', masuk: 0, keluar: 2000000, saldo: -2000000 },
    { kategori: 'Withdrawal Request', masuk: 0, keluar: 1500000, saldo: -1500000 },
    { kategori: 'Fee Bank/Admin', masuk: 0, keluar: 500000, saldo: -500000 },
];

export default function LaporanKeuangan() {
    const totalMasuk = dummyData.reduce((sum, item) => sum + item.masuk, 0);
    const totalKeluar = dummyData.reduce((sum, item) => sum + item.keluar, 0);
    const nettFlow = totalMasuk - totalKeluar;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Keuangan" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Masuk</p><p className="text-2xl font-bold text-green-600">Rp {(totalMasuk / 1000000).toFixed(1)}M</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Keluar</p><p className="text-2xl font-bold text-red-600">Rp {(totalKeluar / 1000000).toFixed(1)}M</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Net Flow</p><p className={`text-2xl font-bold ${nettFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>Rp {(nettFlow / 1000000).toFixed(1)}M</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Saldo Akhir</p><p className="text-2xl font-bold">Rp {(nettFlow / 1000000).toFixed(1)}M</p></div></Card>
                </div>
                <Card className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kategori</TableHead>
                                <TableHead className="text-right">Masuk</TableHead>
                                <TableHead className="text-right">Keluar</TableHead>
                                <TableHead className="text-right">Saldo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyData.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{item.kategori}</TableCell>
                                    <TableCell className="text-right">Rp {item.masuk.toLocaleString('id-ID')}</TableCell>
                                    <TableCell className="text-right">Rp {item.keluar.toLocaleString('id-ID')}</TableCell>
                                    <TableCell className={`text-right font-semibold ${item.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>Rp {item.saldo.toLocaleString('id-ID')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
