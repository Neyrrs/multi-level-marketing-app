import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { Search, Eye } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Withdrawal {
    id: number;
    withdrawal_number: string;
    affiliate: string;
    affiliate_code: string;
    amount: string;
    fee: string;
    net_amount: string;
    status: string;
    approved_by: string;
    approved_at: string;
    processed_at: string;
    created_at: string;
}

interface Props {
    withdrawals: {
        data: Withdrawal[];
        links: any;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    filters: {
        status: string;
        start_date: string;
        end_date: string;
        search: string;
    };
    statuses: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Penarikan Dana',
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

export default function WithdrawalsIndex({ withdrawals, filters, statuses }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ? filters.status : 'all');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const handleFilter = () => {
        router.get('/finance/withdrawals', {
            search,
            status: status === 'all' ? '' : status,
            start_date: startDate,
            end_date: endDate,
        } as any);
    };

    const handleReset = () => {
        setSearch('');
        setStatus('all');
        setStartDate('');
        setEndDate('');
        router.get('/finance/withdrawals');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penarikan Dana" />

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Penarikan Dana</h1>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            <div>
                                <label className="text-sm font-medium">Cari</label>
                                <Input
                                    placeholder="Nomor penarikan..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Status</label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Status</SelectItem>
                                        {statuses.map((s) => (
                                            <SelectItem key={s} value={s}>
                                                {s}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Dari</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Sampai</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div className="flex gap-2 items-end">
                                <Button onClick={handleFilter} className="flex-1">
                                    <Search className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                                <Button onClick={handleReset} variant="outline" className="flex-1">
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Withdrawals List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Daftar Penarikan ({withdrawals.meta.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {withdrawals.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nomor Penarikan</TableHead>
                                            <TableHead>Affiliate</TableHead>
                                            <TableHead className="text-right">Jumlah Diminta</TableHead>
                                            <TableHead className="text-right">Biaya</TableHead>
                                            <TableHead className="text-right">Jumlah Bersih</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead className="text-center">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {withdrawals.data.map((withdrawal) => (
                                            <TableRow key={withdrawal.id}>
                                                <TableCell className="font-mono text-sm">
                                                    {withdrawal.withdrawal_number}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium text-sm">{withdrawal.affiliate}</p>
                                                        <p className="text-xs text-gray-500">{withdrawal.affiliate_code}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span className="font-semibold">Rp {withdrawal.amount}</span>
                                                </TableCell>
                                                <TableCell className="text-right text-sm">
                                                    Rp {withdrawal.fee}
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    Rp {withdrawal.net_amount}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(withdrawal.status)}>
                                                        {withdrawal.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-gray-500">
                                                    {withdrawal.created_at}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(`/finance/withdrawals/${withdrawal.id}`)
                                                        }
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Tidak ada data penarikan</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {withdrawals.meta.last_page > 1 && (
                            <div className="mt-4 flex justify-center gap-2">
                                {Array.from({ length: withdrawals.meta.last_page }).map((_, idx) => (
                                    <Button
                                        key={idx}
                                        variant={
                                            idx + 1 === withdrawals.meta.current_page ? 'default' : 'outline'
                                        }
                                        onClick={() => {
                                            router.get('/finance/withdrawals', {
                                                page: idx + 1,
                                                ...filters,
                                            } as any);
                                        }}
                                        size="sm"
                                    >
                                        {idx + 1}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

