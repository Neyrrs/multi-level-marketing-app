import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Affiliate',
        href: '/affiliate/dashboard',
    },
];

interface DashboardStats {
    totalDownline: number;
    directDownline: number;
    leftCount: number;
    rightCount: number;
    totalVolume: number;
    totalPersonalVolume: number;
    earningThisMonth: number;
    pendingCommission: number;
    level: number;
    isActive: boolean;
    pairCount: number;
}

interface RecentCommission {
    id: number;
    amount: number;
    type: string;
    status: string;
    order_number: string;
    created_at: string;
}

interface BinaryTreeData {
    currentPosition: string;
    leftChild: { name: string; username: string; isActive: boolean } | null;
    rightChild: { name: string; username: string; isActive: boolean } | null;
}

export default function AffiliateDashboard({
    stats,
    recentCommissions,
    binaryTree,
}: {
    stats: DashboardStats | null;
    recentCommissions: RecentCommission[];
    binaryTree: BinaryTreeData | null;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Affiliate" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                {/* Key Statistics */}
                {stats && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Komisi Bulan Ini
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Rp {stats.earningThisMonth.toLocaleString('id-ID')}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Pending: Rp {stats.pendingCommission.toLocaleString('id-ID')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Downline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalDownline}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Direct: {stats.directDownline}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Binary Tree
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    L: {stats.leftCount} | R: {stats.rightCount}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Pairs: {stats.pairCount}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Volume
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Rp {stats.totalVolume.toLocaleString('id-ID')}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Personal: Rp {stats.totalPersonalVolume.toLocaleString('id-ID')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Recent Commissions */}
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Komisi Terbaru</h3>
                    {recentCommissions && recentCommissions.length > 0 ? (
                        <div className="space-y-2">
                            {recentCommissions.map((commission) => (
                                <div
                                    key={commission.id}
                                    className="flex justify-between items-center p-2 border rounded text-sm"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {commission.order_number || 'Order'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {commission.created_at}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            Rp {commission.amount.toLocaleString('id-ID')}
                                        </p>
                                        <p className={`text-xs ${
                                            commission.status === 'paid'
                                                ? 'text-green-600'
                                                : commission.status === 'approved'
                                                  ? 'text-blue-600'
                                                  : 'text-yellow-600'
                                        }`}>
                                            {commission.status.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Belum ada komisi</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
