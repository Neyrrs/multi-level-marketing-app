import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Eye, Package } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';
import { Badge } from '@/components/ui/badge';

interface Order {
    id: number;
    order_number: string;
    user_name: string;
    user_email: string;
    affiliate_name?: string;
    total_amount: number;
    status: string;
    payment_status: string;
    quantity: number;
    created_at: string;
    shipments_count: number;
    has_shipment: boolean;
}

interface PaginationData {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    hasMore: boolean;
}

interface Props {
    orders: Order[];
    pagination: PaginationData;
    search: string;
    status: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistik',
        href: '/logistik/dashboard',
    },
    {
        title: 'Pesanan',
        href: '#',
    },
];

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

export default function OrdersIndex({ orders = [], pagination, search = '', status = '' }: Props) {
    const [searchInput, setSearchInput] = useState(search);
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleSearch = (value: string) => {
        setSearchInput(value);
        router.get('/logistik/orders', { search: value, status: selectedStatus }, { preserveState: true, replace: true });
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        router.get('/logistik/orders', { search: searchInput, status: value }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesanan - Logistik" />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Daftar Pesanan</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SearchInput
                        value={searchInput}
                        onSearchChange={handleSearch}
                    />
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter berdasarkan status..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Diproses</SelectItem>
                            <SelectItem value="shipped">Terkirim</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSelectedStatus('');
                            router.get('/logistik/orders', { search: searchInput }, { preserveState: true, replace: true });
                        }}
                    >
                        Reset Filter
                    </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No Pesanan</TableHead>
                                <TableHead>Nama Customer</TableHead>
                                <TableHead>Jumlah</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Pengiriman</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.order_number}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{order.user_name}</span>
                                                <span className="text-xs text-gray-500">{order.user_email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{order.quantity} item</TableCell>
                                        <TableCell>
                                            Rp {new Intl.NumberFormat('id-ID').format(order.total_amount)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(order.status)}>
                                                {order.status === 'pending' && 'Pending'}
                                                {order.status === 'processing' && 'Diproses'}
                                                {order.status === 'shipped' && 'Terkirim'}
                                                {order.status === 'completed' && 'Selesai'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {order.has_shipment ? (
                                                <div className="flex items-center gap-1">
                                                    <Package className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm">{order.shipments_count} pengiriman</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{order.created_at}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(`/logistik/orders/${order.id}`)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-4">
                                        Tidak ada pesanan yang ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {pagination.lastPage > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {pagination.currentPage > 1 && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.get('/logistik/orders', {
                                        ...{ search: searchInput, status: selectedStatus },
                                        page: pagination.currentPage - 1,
                                    })
                                }
                            >
                                Sebelumnya
                            </Button>
                        )}
                        {pagination.hasMore && (
                            <Button
                                onClick={() =>
                                    router.get('/logistik/orders', {
                                        ...{ search: searchInput, status: selectedStatus },
                                        page: pagination.currentPage + 1,
                                    })
                                }
                            >
                                Selanjutnya
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
