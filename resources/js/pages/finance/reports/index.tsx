import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Summary {
    total_transactions: number;
    total_earned: string;
    total_paid: string;
    net_total: string;
    total_orders?: number;
    total_sales?: string;
}

interface AffiliateCommission {
    name: string;
    code: string;
    transactions: number;
    earned: string;
    paid: string;
    net: string;
}

interface CommissionBreakdown {
    type: string;
    count: number;
    earned: string;
    paid: string;
}

interface DailyTransaction {
    date: string;
    count: number;
    earned: string;
    paid: string;
    net: string;
}

interface WithdrawalStat {
    status: string;
    count: number;
    total: string;
    avg_net: string;
}

interface Props {
    summary: Summary;
    affiliate_commissions: AffiliateCommission[];
    commission_breakdown: CommissionBreakdown[];
    daily_transactions: DailyTransaction[];
    withdrawal_stats: WithdrawalStat[];
    filters: {
        start_date: string;
        end_date: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Keuangan',
        href: '#',
    },
];

export default function FinanceReports({
    summary,
    affiliate_commissions,
    commission_breakdown,
    daily_transactions,
    withdrawal_stats,
    filters,
}: Props) {
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const handleFilter = () => {
        router.get('/finance/reports', {
            start_date: startDate,
            end_date: endDate,
        } as any);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Keuangan" />

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Laporan Keuangan</h1>

                {/* Date Filter */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filter Tanggal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3 items-end">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Dari</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Sampai</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <Button onClick={handleFilter}>
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Total Transaksi</p>
                            <p className="text-2xl font-bold mt-2">{summary.total_transactions}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Total Komisi Diterima</p>
                            <p className="text-2xl font-bold mt-2">Rp {summary.total_earned}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Total Komisi Dibayar</p>
                            <p className="text-2xl font-bold mt-2">Rp {summary.total_paid}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Total Bersih</p>
                            <p className="text-2xl font-bold mt-2 text-green-600">Rp {summary.net_total}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Order Paid</p>
                            <p className="text-2xl font-bold mt-2">{summary.total_orders ?? 0}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Total Penjualan</p>
                            <p className="text-2xl font-bold mt-2">Rp {summary.total_sales ?? '0,00'}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Affiliate Commissions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Komisi Per Affiliate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {affiliate_commissions.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Affiliate</TableHead>
                                                <TableHead className="text-right">Diterima</TableHead>
                                                <TableHead className="text-right">Dibayar</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {affiliate_commissions.slice(0, 10).map((comm, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-sm">{comm.name}</p>
                                                            <p className="text-xs text-gray-500">{comm.code}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        Rp {comm.earned}
                                                    </TableCell>
                                                    <TableCell className="text-right text-sm">
                                                        Rp {comm.paid}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">Tidak ada data</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Commission Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Breakdown Tipe Komisi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {commission_breakdown.length > 0 ? (
                                <div className="space-y-3">
                                    {commission_breakdown.map((type, idx) => (
                                        <div key={idx} className="border-b pb-2 last:border-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Badge variant="outline" className="capitalize">
                                                        {type.type}
                                                    </Badge>
                                                    <p className="text-xs text-gray-500 mt-1">{type.count} transaksi</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">Rp {type.earned}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">Tidak ada data</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Daily Transactions */}
                {daily_transactions.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Transaksi Harian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead className="text-right">Jumlah</TableHead>
                                            <TableHead className="text-right">Diterima</TableHead>
                                            <TableHead className="text-right">Dibayar</TableHead>
                                            <TableHead className="text-right">Bersih</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {daily_transactions.slice(0, 20).map((day, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{day.date}</TableCell>
                                                <TableCell className="text-right">{day.count}</TableCell>
                                                <TableCell className="text-right font-semibold text-green-600">
                                                    Rp {day.earned}
                                                </TableCell>
                                                <TableCell className="text-right text-red-600">
                                                    Rp {day.paid}
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    Rp {day.net}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Withdrawal Statistics */}
                {withdrawal_stats.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Statistik Penarikan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {withdrawal_stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <Badge className="capitalize">{stat.status}</Badge>
                                            <p className="text-xs text-gray-500 mt-1">{stat.count} permintaan</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">Rp {stat.total}</p>
                                            <p className="text-xs text-gray-500">Rata-rata: Rp {stat.avg_net}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
