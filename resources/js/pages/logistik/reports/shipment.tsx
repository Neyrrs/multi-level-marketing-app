import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusItem {
    status: string;
    count: number;
}

interface CourierItem {
    courier: string;
    count: number;
}

interface TopCourier {
    courier: string;
    total: number;
    delivered: number;
    delivery_rate: number;
}

interface Props {
    byStatus: StatusItem[];
    byCourier: CourierItem[];
    topCouriers: TopCourier[];
    startDate: string;
    endDate: string;
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

export default function ShipmentReport({
    byStatus,
    byCourier,
    topCouriers,
    startDate,
    endDate,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Pengiriman - Statistik" />

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-8 h-8 md:block hidden" />
                    <h1 className="text-xl md:text-3xl font-bold">Laporan Pengiriman - Statistik</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Shipments by Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="md:text-lg text-base">Pengiriman Berdasarkan Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {byStatus.length > 0 ? (
                                    byStatus.map((item) => (
                                        <div key={item.status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <p className="font-medium capitalize">{item.status.replace('_', ' ')}</p>
                                            <Badge variant="outline" className="text-lg font-semibold">
                                                {item.count}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipments by Courier */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="md:text-lg text-base">Pengiriman Berdasarkan Kurir</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {byCourier.length > 0 ? (
                                    byCourier.map((item) => (
                                        <div key={item.courier} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <p className="font-medium">{item.courier}</p>
                                            <Badge variant="outline" className="text-lg font-semibold">
                                                {item.count}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Performing Couriers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base md:text-lg">Kurir Terbaik (Berdasarkan Tingkat Sukses)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topCouriers.length > 0 ? (
                                topCouriers.map((courier, idx) => (
                                    <div key={courier.courier} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-bold text-purple-600">#{idx + 1}</span>
                                                <div>
                                                    <p className="font-semibold">{courier.courier}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {courier.delivered} dari {courier.total} pengiriman
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-bold text-green-600">
                                                    {courier.delivery_rate}%
                                                </p>
                                                <p className="text-xs text-gray-600">Tingkat Sukses</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${courier.delivery_rate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center">Tidak ada data</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <p className="text-xs text-gray-500 text-center">
                    Laporan periode: {startDate} hingga {endDate}
                </p>
            </div>
        </AppLayout>
    );
}
