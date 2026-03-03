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
        title: 'Laporan Komisi',
        href: '/admin/LaporanKomisi',
    },
];

interface CommissionData {
    id: number;
    tanggal: string;
    member_name: string;
    method: 'Sponsor' | 'Level' | 'Matching';
    poin: number;
    persentase: number;
    amount: number;
    status: 'paid' | 'pending' | 'on_hold';
}

interface Props {
    commissionData: CommissionData[];
    filters: { search?: string };
    summary: {
        totalComm: number;
        totalTransactions: number;
        paidTotal: number;
    };
}

export default function LaporanKomisi({ commissionData, filters, summary }: Props) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/reports/LaporanKomisi', { search: value }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Komisi" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Komisi</p><p className="text-3xl font-bold">Rp {summary.totalComm.toLocaleString('id-ID')}</p><p className="text-xs text-gray-500">Bulan Ini</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Total Transaksi</p><p className="text-3xl font-bold">{summary.totalTransactions}</p><p className="text-xs text-gray-500">Entri Komisi</p></div></Card>
                    <Card className="p-6"><div className="space-y-2"><p className="text-sm font-medium text-gray-600">Sudah Dibayar</p><p className="text-3xl font-bold text-green-600">Rp {summary.paidTotal.toLocaleString('id-ID')}</p><p className="text-xs text-gray-500">Status Paid</p></div></Card>
                </div>
                <Card className="p-6"><SearchInput onSearchChange={handleSearch} value={search} /></Card>
                <Card className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Nama Member</TableHead>
                                <TableHead>Metode</TableHead>
                                <TableHead className="text-right">Poin</TableHead>
                                <TableHead className="text-right">%</TableHead>
                                <TableHead className="text-right">Jumlah</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {commissionData.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{new Date(item.tanggal).toLocaleDateString('id-ID')}</TableCell>
                                    <TableCell className="font-medium">{item.member_name}</TableCell>
                                    <TableCell><span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">{item.method}</span></TableCell>
                                    <TableCell className="text-right">{item.poin}</TableCell>
                                    <TableCell className="text-right">{item.persentase}%</TableCell>
                                    <TableCell className="text-right font-semibold">Rp {item.amount.toLocaleString('id-ID')}</TableCell>
                                    <TableCell><span className={`text-xs px-2 py-1 rounded ${item.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.status}</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
