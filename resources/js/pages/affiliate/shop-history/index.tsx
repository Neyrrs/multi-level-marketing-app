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
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat Pembelian',
        href: '/affiliate/shop-history',
    },
];

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
    items_count: number;
}

interface Props {
    orders: {
        data: Order[];
        total: number;
    };
}

export default function ShopHistory({ orders }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pembelian" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white overflow-hidden">
                    <div className="p-4">
                        <h3 className="font-semibold mb-4">Riwayat Pembelian Saya</h3>

                        {orders && orders.data && orders.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Nomor Order</TableHead>
                                        <TableHead>Jumlah Item</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Pembayaran</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.data.map((order, index) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{order.order_number}</TableCell>
                                            <TableCell>{order.items_count}</TableCell>
                                            <TableCell className="font-semibold">
                                                Rp {order.total_amount.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    order.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : order.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    order.payment_status === 'paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {order.payment_status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(order.created_at).toLocaleDateString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Tidak ada riwayat pembelian
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
