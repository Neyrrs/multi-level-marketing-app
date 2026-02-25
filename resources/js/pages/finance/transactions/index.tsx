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
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Transaction {
    id: number;
    reference: string;
    affiliate: string;
    affiliate_code: string;
    type: string;
    amount: string;
    description: string;
    created_at: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: any;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    filters: {
        type: string;
        start_date: string;
        end_date: string;
        search: string;
    };
    types: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaksi Keuangan',
        href: '#',
    },
];

export default function TransactionsIndex({ transactions, filters, types }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type ? filters.type : 'all');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const handleFilter = () => {
        router.get('/finance/transactions', {
            search,
            type: type === 'all' ? '' : type,
            start_date: startDate,
            end_date: endDate,
        } as any);
    };

    const handleReset = () => {
        setSearch('');
        setType('all');
        setStartDate('');
        setEndDate('');
        router.get('/finance/transactions');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaksi Keuangan" />

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Transaksi Keuangan</h1>

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
                                    placeholder="Ref transaksi..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Tipe</label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Semua Tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Tipe</SelectItem>
                                        {types.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t}
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

                {/* Transactions List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Daftar Transaksi ({transactions.meta.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {transactions.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ref Transaksi</TableHead>
                                            <TableHead>Affiliate</TableHead>
                                            <TableHead>Tipe</TableHead>
                                            <TableHead className="text-right">Jumlah</TableHead>
                                            <TableHead>Deskripsi</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.data.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell className="font-mono text-sm">
                                                    {transaction.reference}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium text-sm">{transaction.affiliate}</p>
                                                        <p className="text-xs text-gray-500">{transaction.affiliate_code}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{transaction.type}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    Rp {transaction.amount}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">
                                                    {transaction.description}
                                                </TableCell>
                                                <TableCell className="text-xs text-gray-500">
                                                    {transaction.created_at}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Tidak ada data transaksi</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {transactions.meta.last_page > 1 && (
                            <div className="mt-4 flex justify-center gap-2">
                                {Array.from({ length: transactions.meta.last_page }).map((_, idx) => (
                                    <Button
                                        key={idx}
                                        variant={
                                            idx + 1 === transactions.meta.current_page ? 'default' : 'outline'
                                        }
                                        onClick={() => {
                                            router.get('/finance/transactions', {
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
