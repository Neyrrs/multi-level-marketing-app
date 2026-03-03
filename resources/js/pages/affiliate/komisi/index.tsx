import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Komisi Affiliate',
        href: '/affiliate/komisi',
    },
];

interface Commission {
    id: number;
    amount: number;
    type: string;
    status: string;
    order_number: string;
    created_at: string;
}

interface Stats {
    pending: number;
    approved: number;
    paid: number;
    total: number;
}

interface Props {
    commissions: {
        data: Commission[];
        total: number;
    };
    stats: Stats | null;
}

export default function AffiliateKomisi({ commissions, stats }: Props) {
    const [status, setStatus] = useState<string>('all');

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        router.get(
            '/affiliate/komisi',
            { status: newStatus },
            { preserveState: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Komisi Affiliate" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                {/* Statistics Cards */}
                {stats && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Komisi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    Rp {stats.total.toLocaleString('id-ID')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Pending
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">
                                    Rp {stats.pending.toLocaleString('id-ID')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Approved
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">
                                    Rp {stats.approved.toLocaleString('id-ID')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Paid
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    Rp {stats.paid.toLocaleString('id-ID')}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Commission Table */}
                <div className="overflow-hidden rounded-xl border bg-white">
                    <div className="p-4">
                        <h3 className="mb-4 font-semibold">Riwayat Komisi</h3>

                        {/* Filter Buttons */}
                        <div className="mb-4 flex gap-2 overflow-scroll">
                            {['all', 'pending', 'approved', 'paid'].map((s) => (
                                <Button
                                    size={'sm'}
                                    key={s}
                                    onClick={() => handleStatusChange(s)}
                                    className={`${
                                        status === s
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {s === 'all'
                                        ? 'Semua'
                                        : s.charAt(0).toUpperCase() +
                                          s.slice(1)}
                                </Button>
                            ))}
                        </div>

                        {commissions &&
                        commissions.data &&
                        commissions.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Order Number</TableHead>
                                        <TableHead>Jenis</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {commissions.data.map(
                                        (commission, index) => (
                                            <TableRow key={commission.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {commission.order_number}
                                                </TableCell>
                                                <TableCell>
                                                    {commission.type}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    Rp{' '}
                                                    {commission.amount.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            commission.status ===
                                                            'paid'
                                                                ? 'bg-green-100 text-green-700'
                                                                : commission.status ===
                                                                    'approved'
                                                                  ? 'bg-blue-100 text-blue-700'
                                                                  : 'bg-yellow-100 text-yellow-700'
                                                        }`}
                                                    >
                                                        {commission.status.toUpperCase()}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {commission.created_at}
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="py-4 text-center text-muted-foreground">
                                Belum ada komisi
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
