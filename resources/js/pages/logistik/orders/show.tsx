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
import { ArrowLeft, Package, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
}

interface ShipmentInfo {
    id: number;
    shipment_number: string;
    tracking_number: string;
    courier: string;
    status: string;
    shipped_date: string;
    estimated_delivery: string;
    actual_delivery_date: string;
}

interface UserInfo {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface AffiliateInfo {
    username: string;
    name: string;
}

interface OrderDetails {
    id: number;
    order_number: string;
    status: string;
    payment_status: string;
    total_amount: number;
    shipping_cost: number;
    tax_amount: number;
    grand_total: number;
    payment_method: string;
    shipping_data: Record<string, any>;
    created_at: string;
    paid_at: string;
    user: UserInfo;
    affiliate: AffiliateInfo | null;
    items: OrderItem[];
    shipments: ShipmentInfo[];
}

interface Props {
    order: OrderDetails;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistik',
        href: '/logistik/dashboard',
    },
    {
        title: 'Pesanan',
        href: '/logistik/orders',
    },
    {
        title: 'Detail Pesanan',
        href: '#',
    },
];

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        completed: 'bg-green-100 text-green-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

export default function OrderShow({ order }: Props) {
    const hasShipment = order.shipments && order.shipments.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pesanan ${order.order_number}`} />

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get('/logistik/orders')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Button>
                    <h1 className="text-2xl font-bold">{order.order_number}</h1>
                    <Badge className={getStatusColor(order.status)}>
                        {order.status === 'pending' && 'Pending'}
                        {order.status === 'processing' && 'Diproses'}
                        {order.status === 'shipped' && 'Terkirim'}
                        {order.status === 'completed' && 'Selesai'}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Order Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Pesanan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">No.  Pesanan</p>
                                <p className="font-semibold">{order.order_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Status Pembayaran</p>
                                <p className="font-semibold capitalize">{order.payment_status}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Metode Pembayaran</p>
                                <p className="font-semibold">{order.payment_method}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tanggal Pesanan</p>
                                <p className="font-semibold">{order.created_at}</p>
                            </div>
                            {order.paid_at && (
                                <div>
                                    <p className="text-sm text-gray-600">Tanggal Pembayaran</p>
                                    <p className="font-semibold">{order.paid_at}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Customer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Pelanggan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">Nama</p>
                                <p className="font-semibold">{order.user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold">{order.user.email}</p>
                            </div>
                            {order.user.phone && (
                                <div>
                                    <p className="text-sm text-gray-600">Telepon</p>
                                    <p className="font-semibold">{order.user.phone}</p>
                                </div>
                            )}
                            {order.affiliate && (
                                <div>
                                    <p className="text-sm text-gray-600">Affiliate</p>
                                    <p className="font-semibold">{order.affiliate.name}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Order Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Item Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produk</TableHead>
                                    <TableHead className="text-right">Jumlah</TableHead>
                                    <TableHead className="text-right">Harga</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">
                                            Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            Rp {new Intl.NumberFormat('id-ID').format(item.total)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="border-t-2">
                                    <TableCell colSpan={3} className="text-right font-semibold">
                                        Subtotal:
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        Rp {new Intl.NumberFormat('id-ID').format(order.total_amount)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} className="text-right">
                                        Ongkos Kirim:
                                    </TableCell>
                                    <TableCell className="text-right">
                                        Rp {new Intl.NumberFormat('id-ID').format(order.shipping_cost)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} className="text-right">
                                        Pajak:
                                    </TableCell>
                                    <TableCell className="text-right">
                                        Rp {new Intl.NumberFormat('id-ID').format(order.tax_amount)}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-t-2 bg-blue-50">
                                    <TableCell colSpan={3} className="text-right font-semibold">
                                        Total:
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        Rp {new Intl.NumberFormat('id-ID').format(order.grand_total)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Shipment Information */}
                {hasShipment ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="w-5 h-5" />
                                Informasi Pengiriman
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.shipments.map((shipment, idx) => (
                                <div key={shipment.id} className="mb-4 pb-4 border-b last:border-b-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">No. Pengiriman</p>
                                            <p className="font-semibold">{shipment.shipment_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Kurir</p>
                                            <p className="font-semibold">{shipment.courier}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <Badge className={getStatusColor(shipment.status)}>
                                                {shipment.status}
                                            </Badge>
                                        </div>
                                        {shipment.tracking_number && (
                                            <div>
                                                <p className="text-sm text-gray-600">No. Resi</p>
                                                <p className="font-semibold text-blue-600">{shipment.tracking_number}</p>
                                            </div>
                                        )}
                                        {shipment.shipped_date && (
                                            <div>
                                                <p className="text-sm text-gray-600">Tgl. Pengiriman</p>
                                                <p className="font-semibold">{shipment.shipped_date}</p>
                                            </div>
                                        )}
                                        {shipment.estimated_delivery && (
                                            <div>
                                                <p className="text-sm text-gray-600">Estimasi Sampai</p>
                                                <p className="font-semibold">{shipment.estimated_delivery}</p>
                                            </div>
                                        )}
                                        {shipment.actual_delivery_date && (
                                            <div>
                                                <p className="text-sm text-gray-600">Tgl. Diterima</p>
                                                <p className="font-semibold text-green-600">
                                                    {shipment.actual_delivery_date}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <Button
                                            size="sm"
                                            onClick={() => router.get(`/logistik/shipments/${shipment.id}`)}
                                        >
                                            <Package className="w-4 h-4 mr-2" />
                                            Lihat Detail Pengiriman
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-yellow-200 bg-yellow-50">
                        <CardContent className="pt-6">
                            <p className="text-sm text-yellow-800">
                                📦 Pesanan ini belum memiliki pengiriman. 
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => router.get(`/logistik/shipments/create?order_id=${order.id}`)}
                                    className="ml-1"
                                >
                                    Buat pengiriman sekarang
                                </Button>
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
