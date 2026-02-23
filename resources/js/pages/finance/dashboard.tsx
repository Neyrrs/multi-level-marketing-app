import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Users, Activity } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
    totalTransactions: string;
    totalEarned: string;
    totalPaid: string;
    avgCommission: string;
    monthTransactions: number;
    monthEarned: string;
    monthPaid: string;
}

interface WithdrawalStats {
    totalCount: number;
    pendingAmount: string;
    processedAmount: string;
    pendingCount: number;
}

interface CommissionType {
    type: string;
    count: number;
    total: number;
}

interface RecentWithdrawal {
    id: number;
    withdrawal_number: string;
    affiliate: string;
    amount: string;
    fee: string;
    net_amount: string;
    status: string;
    created_at: string;
    processed_at: string;
}

interface TopAffiliate {
    name: string;
    transactions: number;
    earned: string;
}

interface WithdrawalStatusItem {
    status: string;
    count: number;
    total: number;
}

interface Props {
    stats: DashboardStats;
    withdrawals: WithdrawalStats;
    commissionByType: CommissionType[];
    recentWithdrawals: RecentWithdrawal[];
    topAffiliates: TopAffiliate[];
    withdrawalStatus: WithdrawalStatusItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Keuangan',
        href: '#',
    },
];

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-blue-100 text-blue-800',
        processed: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

export default function FinanceDashboard({
    stats,
    withdrawals,
    commissionByType,
    recentWithdrawals,
    topAffiliates,
    withdrawalStatus,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Keuangan" />

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Dashboard Keuangan</h1>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Earned */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Komisi Diterima</p>
                                    <p className="text-2xl font-bold mt-2">Rp {stats.totalEarned}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stats.totalTransactions} Transaksi</p>
                                </div>
                                <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Paid */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Komisi Dibayar</p>
                                    <p className="text-2xl font-bold mt-2">Rp {stats.totalPaid}</p>
                                </div>
                                <DollarSign className="w-12 h-12 text-blue-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Withdrawals */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Penarikan Pending</p>
                                    <p className="text-2xl font-bold mt-2">Rp {withdrawals.pendingAmount}</p>
                                    <p className="text-xs text-gray-500 mt-1">{withdrawals.pendingCount} Permintaan</p>
                                </div>
                                <AlertCircle className="w-12 h-12 text-yellow-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Month Stats */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Bulan Ini</p>
                                    <p className="text-2xl font-bold mt-2">Rp {stats.monthEarned}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stats.monthTransactions} Transaksi</p>
                                </div>
                                <Activity className="w-12 h-12 text-purple-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Recent Withdrawals */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Penarikan Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentWithdrawals.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nomor Penarikan</TableHead>
                                                <TableHead>Affiliate</TableHead>
                                                <TableHead className="text-right">Jumlah</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Tanggal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentWithdrawals.map((withdrawal) => (
                                                <TableRow key={withdrawal.id}>
                                                    <TableCell className="font-mono text-sm">
                                                        {withdrawal.withdrawal_number}
                                                    </TableCell>
                                                    <TableCell>{withdrawal.affiliate}</TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="font-semibold">Rp {withdrawal.net_amount}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={getStatusColor(withdrawal.status)}>
                                                            {withdrawal.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-gray-500">
                                                        {withdrawal.created_at}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Tidak ada data penarikan</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Withdrawal Status Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Status Penarikan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {withdrawalStatus.length > 0 ? (
                                <div className="space-y-3">
                                    {withdrawalStatus.map((status, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium capitalize">{status.status}</p>
                                                <p className="text-xs text-gray-500">{status.count} permintaan</p>
                                            </div>
                                            <Badge variant="outline">
                                                Rp {(status.total || 0).toLocaleString('id-ID')}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">Tidak ada data</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Top Affiliate Earners */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Top Affiliate Pemberi Komisi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {topAffiliates.length > 0 ? (
                                <div className="space-y-3">
                                    {topAffiliates.map((affiliate, idx) => (
                                        <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{affiliate.name}</p>
                                                    <p className="text-xs text-gray-500">{affiliate.transactions} transaksi</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-sm">Rp {affiliate.earned}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">Tidak ada data</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Commission Types */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tipe Komisi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {commissionByType.length > 0 ? (
                                <div className="space-y-3">
                                    {commissionByType.map((type, idx) => (
                                        <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                                            <div>
                                                <p className="font-medium text-sm capitalize">{type.type}</p>
                                                <p className="text-xs text-gray-500">{type.count} transaksi</p>
                                            </div>
                                            <p className="font-semibold text-sm">Rp {(type.total || 0).toLocaleString('id-ID')}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">Tidak ada data</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

