import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface OrderInfo {
    id: number;
    order_number: string;
    user: {
        name: string;
        email: string;
    };
    affiliate?: {
        username: string;
    };
    total_amount: number;
    quantity: number;
    items: Array<{
        id: number;
        product_name: string;
        quantity: number;
    }>;
}

interface Props {
    order?: OrderInfo;
    couriers: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistik',
        href: '/logistik/dashboard',
    },
    {
        title: 'Pengiriman',
        href: '/logistik/shipments',
    },
    {
        title: 'Buat Pengiriman',
        href: '#',
    },
];

export default function CreateShipment({ order, couriers = {} }: Props) {
    const [selectedCourier, setSelectedCourier] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderSearch, setOrderSearch] = useState('');
    const [availableOrders, setAvailableOrders] = useState<OrderInfo[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderInfo | null>(order || null);
    const [showOrderList, setShowOrderList] = useState(!order);

    const { data, setData, post, errors, processing } = useForm({
        order_id: order?.id || '',
        courier: '',
        recipient_name: '',
        recipient_phone: '',
        estimated_delivery: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        post('/logistik/shipments', {
            onSuccess: () => {
                setLoading(false);
                router.visit('/logistik/shipments');
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    const handleSearchOrders = async (search: string) => {
        setOrderSearch(search);
        if (search.length < 3) {
            setAvailableOrders([]);
            return;
        }

        try {
            const response = await fetch(`/logistik/orders/awaiting-shipment?search=${search}`);
            const result = await response.json();
            if (result.orders) {
                setAvailableOrders(result.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSelectOrder = (ord: OrderInfo) => {
        setSelectedOrder(ord);
        setData('order_id', ord.id.toString());
        setShowOrderList(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pengiriman" />

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get('/logistik/shipments')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Button>
                    <h1 className="text-2xl font-bold">Buat Pengiriman Baru</h1>
                </div>

                {selectedOrder && (
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">No. Pesanan</p>
                                    <p className="font-semibold">{selectedOrder.order_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Nama Penerima</p>
                                    <p className="font-semibold">{selectedOrder.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Pesanan</p>
                                    <p className="font-semibold">
                                        Rp {new Intl.NumberFormat('id-ID').format(selectedOrder.total_amount)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Jumlah Item</p>
                                    <p className="font-semibold">{selectedOrder.quantity} item</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!selectedOrder && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Pilih Pesanan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <Label htmlFor="order-search">Cari Pesanan</Label>
                                    <Input
                                        id="order-search"
                                        type="text"
                                        placeholder="Ketik nomor pesanan atau nama customer..."
                                        value={orderSearch}
                                        onChange={(e) => handleSearchOrders(e.target.value)}
                                        onFocus={() => setShowOrderList(true)}
                                    />
                                </div>
                                {showOrderList && availableOrders.length > 0 && (
                                    <div className="border rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                                        {availableOrders.map((ord) => (
                                            <button
                                                key={ord.id}
                                                type="button"
                                                onClick={() => handleSelectOrder(ord)}
                                                className="w-full p-3 border-b hover:bg-gray-50 text-left last:border-b-0"
                                            >
                                                <p className="font-semibold">{ord.order_number}</p>
                                                <p className="text-sm text-gray-600">{ord.user.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {orderSearch && showOrderList && availableOrders.length === 0 && (
                                    <p className="text-sm text-gray-500">Tidak ada pesanan yang ditemukan</p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {selectedOrder && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pengiriman</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="courier">Kurir *</Label>
                                        <Select value={data.courier} onValueChange={(value) => setData('courier', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih kurir..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(couriers).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.courier && <p className="text-red-600 text-sm mt-1">{errors.courier}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="recipient_name">Nama Penerima *</Label>
                                            <Input
                                                id="recipient_name"
                                                type="text"
                                                value={data.recipient_name}
                                                onChange={(e) => setData('recipient_name', e.target.value)}
                                                placeholder="Masukkan nama penerima"
                                            />
                                            {errors.recipient_name && (
                                                <p className="text-red-600 text-sm mt-1">{errors.recipient_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="recipient_phone">Telepon Penerima *</Label>
                                            <Input
                                                id="recipient_phone"
                                                type="tel"
                                                value={data.recipient_phone}
                                                onChange={(e) => setData('recipient_phone', e.target.value)}
                                                placeholder="Masukkan nomor telepon"
                                            />
                                            {errors.recipient_phone && (
                                                <p className="text-red-600 text-sm mt-1">{errors.recipient_phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="estimated_delivery">Estimasi Pengiriman</Label>
                                        <Input
                                            id="estimated_delivery"
                                            type="date"
                                            value={data.estimated_delivery}
                                            onChange={(e) => setData('estimated_delivery', e.target.value)}
                                        />
                                        {errors.estimated_delivery && (
                                            <p className="text-red-600 text-sm mt-1">{errors.estimated_delivery}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="notes">Catatan</Label>
                                        <Input
                                            id="notes"
                                            type="text"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Catatan tambahan (opsional)"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={processing || !data.courier || !data.recipient_name}
                                    className="flex items-center gap-2"
                                >
                                    {processing && <Loader className="w-4 h-4 animate-spin" />}
                                    Buat Pengiriman
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedOrder(null);
                                        setOrderSearch('');
                                    }}
                                >
                                    Ubah Pesanan
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
