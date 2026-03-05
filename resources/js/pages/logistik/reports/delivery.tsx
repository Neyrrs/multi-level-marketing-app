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
import { Head } from '@inertiajs/react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DeliveryStat {
    totalShipments: number;
    deliveredCount: number;
    pendingCount: number;
    shippedCount: number;
    deliveryRate: number;
}

interface ShipmentInfo {
    id: number;
    shipment_number: string;
    tracking_number: string;
    courier: string;
    status: string;
    recipient_name: string;
    shipped_date: string;
    actual_delivery_date: string;
    user_name: string;
    order_number: string;
}

interface PaginationData {
    total: number;
    currentPage: number;
    hasMore: boolean;
}

interface Props {
    stats: DeliveryStat;
    shipments: ShipmentInfo[];
    pagination: PaginationData;
    startDate: string;
    endDate: string;
    courier: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistik',
        href: '/logistik/dashboard',
    },
    {
        title: 'Laporan',
        href: '#',
    },
    {
        title: 'Pengiriman',
        href: '#',
    },
];

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-gray-100 text-gray-800',
        shipped: 'bg-blue-100 text-blue-800',
        delivered: 'bg-green-100 text-green-800',
        returned: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

export default function DeliveryReport({
    stats,
    shipments,
    pagination,
    startDate,
    endDate,
    courier,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Pengiriman" />

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-8 h-8 md:block hidden" />
                    <h1 className="text-xl md:text-2xl font-bold">Laporan Pengiriman</h1>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className='pt-0'>
                        <CardContent className="pt-6">
                            <div>
                                <p className="text-gray-600 text-sm">Total Pengiriman</p>
                                <p className="text-3xl font-bold mt-2">{stats.totalShipments}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='pt-0'>
                        <CardContent className="pt-6">
                            <div>
                                <p className="text-gray-600 text-sm">Berhasil Dikirim</p>
                                <p className="text-3xl font-bold mt-2 text-green-600">{stats.deliveredCount}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='pt-0'>
                        <CardContent className="pt-6">
                            <div>
                                <p className="text-gray-600 text-sm">Dalam Pengiriman</p>
                                <p className="text-3xl font-bold mt-2 text-blue-600">{stats.shippedCount}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='pt-0'>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-8 h-8 text-emerald-600" />
                                <div>
                                    <p className="text-gray-600 text-sm">Tingkat Sukses</p>
                                    <p className="text-3xl font-bold mt-2 text-emerald-600">{stats.deliveryRate}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detil Pengiriman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No. Pengiriman</TableHead>
                                        <TableHead>No. Resi</TableHead>
                                        <TableHead>Kurir</TableHead>
                                        <TableHead>Penerima</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tgl. Kirim</TableHead>
                                        <TableHead>Tgl. Terima</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {shipments.length > 0 ? (
                                        shipments.map((shipment) => (
                                            <TableRow key={shipment.id}>
                                                <TableCell className="font-medium">{shipment.shipment_number}</TableCell>
                                                <TableCell className="text-blue-600">{shipment.tracking_number}</TableCell>
                                                <TableCell>{shipment.courier}</TableCell>
                                                <TableCell>{shipment.recipient_name}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(shipment.status)}>
                                                        {shipment.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{shipment.shipped_date || '-'}</TableCell>
                                                <TableCell>
                                                    {shipment.actual_delivery_date ? (
                                                        <span className="text-green-600 font-semibold">
                                                            {shipment.actual_delivery_date}
                                                        </span>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-4">
                                                Tidak ada data pengiriman
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-xs text-gray-500 text-center">
                    Laporan periode: {startDate} hingga {endDate}
                    {courier && ` | Kurir: ${courier}`}
                </p>
            </div>
        </AppLayout>
    );
}
