import AppLayout from '@/layouts/app-layout';
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
    totalCommissionReceived: number;
    pendingCommission: number;
    level: number;
    isActive: boolean;
    pairCount: number;
    activeUntil?: string | null;
    activeRemainingDays: number;
}

interface LatestCommission {
    amount: number;
    created_at?: string | null;
    description?: string | null;
    reference?: string | null;
}

interface BinaryTreeData {
    currentPosition: string;
    leftChild: { name: string; username: string; isActive: boolean } | null;
    rightChild: { name: string; username: string; isActive: boolean } | null;
}

export default function AffiliateDashboard({
    stats,
    latestCommission,
    binaryTree,
}: {
    stats: DashboardStats | null;
    latestCommission: LatestCommission | null;
    binaryTree: BinaryTreeData | null;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Affiliate" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                {/* Key Statistics */}
                {stats && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Komisi Diterima
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Rp {stats.totalCommissionReceived.toLocaleString('id-ID')}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Bulan ini: Rp {stats.earningThisMonth.toLocaleString('id-ID')} | Pending: Rp {stats.pendingCommission.toLocaleString('id-ID')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Masa Aktif Akun
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{Math.max(0, stats.activeRemainingDays)} hari</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stats.activeUntil ? `Sampai: ${new Date(stats.activeUntil).toLocaleString('id-ID')}` : 'Belum ada tanggal masa aktif'}
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

                    </div>
                )}

                {/* Latest Commission */}
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Komisi Terbaru</h3>
                    {latestCommission ? (
                        <div className="rounded border p-3">
                            <div className="text-2xl font-bold">
                                Rp {latestCommission.amount.toLocaleString('id-ID')}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {latestCommission.created_at
                                    ? new Date(latestCommission.created_at).toLocaleString('id-ID')
                                    : '-'}
                            </p>
                            {latestCommission.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {latestCommission.description}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Belum ada komisi</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
