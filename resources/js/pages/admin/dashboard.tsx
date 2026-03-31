import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Metrics {
    totalUsers: number;
    totalActiveAffiliates: number;
    totalOrdersToday: number;
    todayRevenue: number;
    totalCalculatedCommission: number;
    totalPaidCommission: number;
    totalPendingCommission: number;
}

interface Props {
    metrics: Metrics;
    filters?: {
        start_date?: string;
        end_date?: string;
    };
    periodLabel?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: dashboard().url,
    },
];

export default function AdminDashboard({ metrics, filters, periodLabel }: Props) {
    const [startDate, setStartDate] = useState(filters?.start_date ?? '');
    const [endDate, setEndDate] = useState(filters?.end_date ?? '');

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value ?? 0);

    const formatNumber = (value: number) => new Intl.NumberFormat('id-ID').format(value ?? 0);

    const applyFilter = () => {
        router.get(
            '/admin/dashboard',
            {
                start_date: startDate || undefined,
                end_date: endDate || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetFilter = () => {
        const today = new Date().toISOString().slice(0, 10);
        setStartDate(today);
        setEndDate(today);
        router.get(
            '/admin/dashboard',
            {
                start_date: today,
                end_date: today,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AdminDashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                    <h1 className="text-xl font-semibold">Ringkasan Dashboard Admin</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Ringkasan angka utama operasional periode {periodLabel ?? '-'}.
                    </p>
                </div>

                <div className="grid gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4 md:grid-cols-4">
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Dari Tanggal</p>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Sampai Tanggal</p>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={applyFilter}
                            className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                        >
                            Terapkan
                        </button>
                    </div>
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={resetFilter}
                            className="h-10 w-full rounded-md border border-input bg-background px-4 text-sm font-medium"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Total User</p>
                        <p className="mt-2 text-2xl font-bold">{formatNumber(metrics?.totalUsers ?? 0)}</p>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Affiliate Aktif</p>
                        <p className="mt-2 text-2xl font-bold">{formatNumber(metrics?.totalActiveAffiliates ?? 0)}</p>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Order Periode</p>
                        <p className="mt-2 text-2xl font-bold">{formatNumber(metrics?.totalOrdersToday ?? 0)}</p>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Omzet Periode</p>
                        <p className="mt-2 text-2xl font-bold">{formatCurrency(metrics?.todayRevenue ?? 0)}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Komisi Terhitung</p>
                        <p className="mt-2 text-2xl font-bold">{formatCurrency(metrics?.totalCalculatedCommission ?? 0)}</p>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Komisi Cair</p>
                        <p className="mt-2 text-2xl font-bold text-emerald-600">{formatCurrency(metrics?.totalPaidCommission ?? 0)}</p>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                        <p className="text-sm text-muted-foreground">Komisi Pending</p>
                        <p className="mt-2 text-2xl font-bold text-amber-600">{formatCurrency(metrics?.totalPendingCommission ?? 0)}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
