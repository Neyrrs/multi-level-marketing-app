import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat Belanja',
        href: dashboard().url,
    },
];

const orders = [
    {
        id: 1,
        date: '12 Jan 2026',
        orderCode: 'ORD-20260112-001',
        status: 'Selesai',
    },
    {
        id: 2,
        date: '14 Jan 2026',
        orderCode: 'ORD-20260114-002',
        status: 'Diproses',
    },
    {
        id: 3,
        date: '15 Jan 2026',
        orderCode: 'ORD-20260115-003',
        status: 'Menunggu Pembayaran',
    },
    {
        id: 4,
        date: '18 Jan 2026',
        orderCode: 'ORD-20260118-004',
        status: 'Dibatalkan',
    },
];

export default function ShopHistory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat belanja" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div className="flex w-full items-start border-b-2 pb-4">
                        <div className="w-3/4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-primary md:text-2xl">
                                    Riwayat Pin
                                </p>
                                <span className="text-sm">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </span>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>
                            Ini adalah data riwayat pembelanjaan terbaru
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Pesanan</TableHead>
                                <TableHead>Cek Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell>{order.date}</TableCell>

                                    <TableCell>{order.orderCode}</TableCell>

                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
