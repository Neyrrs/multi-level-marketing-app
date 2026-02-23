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
import { Filter, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface BinaryPayout {
    name: string;
    code: string;
    payouts: number;
    amount: string;
    last_payout: string;
}

interface MatchingPayout {
    name: string;
    code: string;
    bonuses: number;
    amount: string;
    last_bonus: string;
}

interface TopEarner {
    name: string;
    code: string;
    commissions: number;
    earned: string;
    network_earned: string;
}

interface Summary {
    binary_count: number;
    binary_total: string;
    matching_count: number;
    matching_total: string;
}

interface Props {
    binary_payouts: BinaryPayout[];
    matching_payouts: MatchingPayout[];
    summary: Summary;
    top_earners: TopEarner[];
    filters: {
        start_date: string;
        end_date: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jaringan Komisi',
        href: '#',
    },
];

export default function NetworkIndex({
    binary_payouts,
    matching_payouts,
    summary,
    top_earners,
    filters,
}: Props) {
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const handleFilter = () => {
        router.get('/finance/network', {
            start_date: startDate,
            end_date: endDate,
        } as any);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jaringan Komisi" />

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Jaringan & Bonus Komisi</h1>

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

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Komisi Binary</p>
                                    <p className="text-2xl font-bold mt-2">Rp {summary.binary_total}</p>
                                    <p className="text-xs text-gray-500 mt-1">{summary.binary_count} payout</p>
                                </div>
                                <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Bonus Matching</p>
                                    <p className="text-2xl font-bold mt-2">Rp {summary.matching_total}</p>
                                    <p className="text-xs text-gray-500 mt-1">{summary.matching_count} bonus</p>
                                </div>
                                <Users className="w-12 h-12 text-green-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Total Keseluruhan</p>
                            <p className="text-2xl font-bold mt-2">
                                Rp{' '}
                                {(
                                    parseFloat(summary.binary_total.replace(/[^0-9]/g, '') || '0') +
                                    parseFloat(summary.matching_total.replace(/[^0-9]/g, '') || '0')
                                ).toLocaleString('id-ID')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-gray-600">Top Earner</p>
                            <p className="text-lg font-bold mt-2">
                                {top_earners[0]?.name || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Rp {top_earners[0]?.network_earned || '0'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Binary Payouts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Komisi Binary Terkemuka</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {binary_payouts.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Affiliate</TableHead>
                                                <TableHead className="text-right">Jumlah</TableHead>
                                                <TableHead className="text-right">Payout</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {binary_payouts.slice(0, 10).map((payout, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-sm">{payout.name}</p>
                                                            <p className="text-xs text-gray-500">{payout.code}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        Rp {payout.amount}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs text-gray-500">
                                                        {payout.payouts}x
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

                    {/* Matching Payouts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Bonus Matching Terkemuka</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {matching_payouts.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Affiliate</TableHead>
                                                <TableHead className="text-right">Jumlah</TableHead>
                                                <TableHead className="text-right">Bonus</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {matching_payouts.slice(0, 10).map((payout, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-sm">{payout.name}</p>
                                                            <p className="text-xs text-gray-500">{payout.code}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        Rp {payout.amount}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs text-gray-500">
                                                        {payout.bonuses}x
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
                </div>

                {/* Top Earners */}
                {top_earners.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Top Earners Jaringan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Peringkat</TableHead>
                                            <TableHead>Affiliate</TableHead>
                                            <TableHead className="text-right">Total Komisi</TableHead>
                                            <TableHead className="text-right">Komisi Jaringan</TableHead>
                                            <TableHead className="text-right">Transaksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {top_earners.map((earner, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>
                                                    <Badge variant="outline" className="font-bold">
                                                        #{idx + 1}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium text-sm">{earner.name}</p>
                                                        <p className="text-xs text-gray-500">{earner.code}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    Rp {earner.earned}
                                                </TableCell>
                                                <TableCell className="text-right font-semibold text-green-600">
                                                    Rp {earner.network_earned}
                                                </TableCell>
                                                <TableCell className="text-right">{earner.commissions}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

