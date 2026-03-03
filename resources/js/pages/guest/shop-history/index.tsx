import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat Pembelian',
        href: '/shop-history',
    },
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
    payment_method_label: string;
    items_count: number;
}

interface Props {
    orders: {
        data: Order[];
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        from: number | null;
        to: number | null;
    };
}

export default function ShopHistory({ orders }: Props) {
    const goToPage = (page: number) => {
        router.get(
            '/shop-history',
            { page, perPage: orders.per_page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const changePerPage = (perPage: number) => {
        router.get(
            '/shop-history',
            { page: 1, perPage },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pembelian" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white overflow-hidden">
                    <div className="p-4">
                        <h3 className="font-semibold mb-4">Riwayat Pembelian Saya</h3>

                        {orders && orders.data && orders.data.length > 0 ? (
                            <>
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
                                                <TableCell>{(orders.from ?? 1) + index}</TableCell>
                                                <TableCell className="font-medium">{order.order_number}</TableCell>
                                                <TableCell>{order.items_count}</TableCell>
                                                <TableCell className="font-semibold">
                                                    Rp {order.total_amount.toLocaleString('id-ID')}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            order.status === 'completed' || order.status === 'shipped'
                                                                ? 'bg-green-100 text-green-700'
                                                                : order.status === 'pending' || order.status === 'processing'
                                                                  ? 'bg-yellow-100 text-yellow-700'
                                                                  : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            order.payment_status === 'paid'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                        }`}
                                                    >
                                                        {order.payment_method_label} - {order.payment_status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(order.created_at).toLocaleDateString('id-ID')}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <div className="text-sm text-gray-600">
                                        Menampilkan {orders.from ?? 0}-{orders.to ?? 0} dari {orders.total} data
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={orders.per_page}
                                            onChange={(e) => changePerPage(Number(e.target.value))}
                                            className="h-9 rounded-md border px-2 text-sm"
                                        >
                                            <option value={10}>10 / halaman</option>
                                            <option value={25}>25 / halaman</option>
                                            <option value={50}>50 / halaman</option>
                                            <option value={100}>100 / halaman</option>
                                        </select>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={orders.current_page <= 1}
                                            onClick={() => goToPage(orders.current_page - 1)}
                                        >
                                            Prev
                                        </Button>
                                        <span className="px-2 text-sm">
                                            {orders.current_page} / {orders.last_page}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={orders.current_page >= orders.last_page}
                                            onClick={() => goToPage(orders.current_page + 1)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">Tidak ada riwayat pembelian</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

