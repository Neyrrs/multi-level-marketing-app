import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Package, Truck, CheckCircle, AlertCircle, TrendingUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
    ordersAwaitingShipment: number;
    activeShipments: number;
    deliveredThisMonth: number;
    shipmentsThisMonth: number;
    deliverySuccessRate: number;
    pendingReturns: number;
}

interface ShipmentByCourier {
    courier: string;
    count: number;
}

interface RecentShipment {
    id: number;
    shipment_number: string;
    tracking_number: string;
    courier: string;
    status: string;
    recipient_name: string;
    order_number: string;
    created_at: string;
}

interface StatusItem {
    status: string;
    count: number;
}

interface Props {
    stats: DashboardStats;
    shipmentsByCourier: ShipmentByCourier[];
    recentShipments: RecentShipment[];
    statusDistribution: StatusItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Logistik',
        href: '#',
    },
];

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-gray-100 text-gray-800',
        ready_to_ship: 'bg-yellow-100 text-yellow-800',
        shipped: 'bg-blue-100 text-blue-800',
        in_transit: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        returned: 'bg-red-100 text-red-800',
        lost: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

export default function LogistikDashboard({
    stats,
    shipmentsByCourier,
    recentShipments,
    statusDistribution,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Logistik" />

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Dashboard Logistik</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Orders Awaiting Shipment */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Pesanan Menunggu Pengiriman</p>
                                    <p className="text-3xl font-bold mt-2">{stats.ordersAwaitingShipment}</p>
                                </div>
                                <AlertCircle className="w-12 h-12 text-yellow-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Shipments */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Pengiriman Aktif</p>
                                    <p className="text-3xl font-bold mt-2">{stats.activeShipments}</p>
                                </div>
                                <Truck className="w-12 h-12 text-blue-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivered This Month */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Terkirim Bulan Ini</p>
                                    <p className="text-3xl font-bold mt-2">{stats.deliveredThisMonth}</p>
                                </div>
                                <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipments This Month */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Pengiriman Bulan Ini</p>
                                    <p className="text-3xl font-bold mt-2">{stats.shipmentsThisMonth}</p>
                                </div>
                                <Package className="w-12 h-12 text-purple-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Success Rate */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Tingkat Keberhasilan</p>
                                    <p className="text-3xl font-bold mt-2">{stats.deliverySuccessRate}%</p>
                                </div>
                                <TrendingUp className="w-12 h-12 text-emerald-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Returns */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Pengembalian Pending</p>
                                    <p className="text-3xl font-bold mt-2">{stats.pendingReturns}</p>
                                </div>
                                <RotateCcw className="w-12 h-12 text-red-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Recent Shipments */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    Pengiriman Terbaru
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get('/logistik/shipments')}
                                >
                                    Lihat Semua
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No. Pengiriman</TableHead>
                                        <TableHead>No. Resi</TableHead>
                                        <TableHead>Kurir</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentShipments.length > 0 ? (
                                        recentShipments.map((shipment) => (
                                            <TableRow key={shipment.id}>
                                                <TableCell className="font-medium">{shipment.shipment_number}</TableCell>
                                                <TableCell>
                                                    {shipment.tracking_number ? (
                                                        <span className="text-blue-600 font-semibold text-sm">
                                                            {shipment.tracking_number}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>{shipment.courier}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(shipment.status)}>
                                                        {shipment.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => router.get(`/logistik/shipments/${shipment.id}`)}
                                                    >
                                                        Lihat
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-4">
                                                Tidak ada pengiriman terbaru
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Shipments by Courier */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Pengiriman per Kurir</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {shipmentsByCourier.length > 0 ? (
                                    shipmentsByCourier.map((item) => (
                                        <div key={item.courier} className="flex items-center justify-between">
                                            <p className="text-sm font-medium">{item.courier}</p>
                                            <Badge variant="outline">{item.count}</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Distribusi Status Pengiriman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                            {statusDistribution.length > 0 ? (
                                statusDistribution.map((item) => (
                                    <div key={item.status} className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-600 capitalize font-medium">{item.status.replace('_', ' ')}</p>
                                        <p className="text-2xl font-bold text-blue-600">{item.count}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Tidak ada data</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
