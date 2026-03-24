import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Loader, Package, Truck, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface TrackingHistory {
    id: number;
    status: string;
    location: string;
    description: string;
    tracked_at: string;
}

interface ShipmentDetails {
    id: number;
    shipment_number: string;
    tracking_number?: string;
    courier: string;
    status: string;
    recipient_name: string;
    recipient_phone: string;
    shipping_address: Record<string, any>;
    shipped_date?: string;
    estimated_delivery?: string;
    actual_delivery_date?: string;
    receiver_name?: string;
    signature_received: boolean;
    notes?: string;
    created_at: string;
    order: {
        id: number;
        order_number: string;
        total_amount: number;
        status: string;
    };
    user: {
        name: string;
        email: string;
    };
    affiliate?: {
        username: string;
        name: string;
    };
    trackingHistories: TrackingHistory[];
}

interface Props {
    shipment: ShipmentDetails;
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
        title: 'Detail Pengiriman',
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

const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
        pending: 'Pending',
        ready_to_ship: 'Siap Dikirim',
        shipped: 'Terkirim',
        in_transit: 'Dalam Perjalanan',
        delivered: 'Diterima',
        returned: 'Dikembalikan',
        lost: 'Hilang',
    };
    return labels[status] || status;
};

export default function ShipmentShow({ shipment }: Props) {
    const [showTrackingForm, setShowTrackingForm] = useState(false);
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);

    const { data: trackingData, setData: setTrackingData, post: postTracking, processing: trackingProcessing } = useForm({
        tracking_number: shipment.tracking_number || '',
        courier: shipment.courier,
    });

    const { data: deliveryData, setData: setDeliveryData, post: postDelivery, processing: deliveryProcessing } = useForm({
        receiver_name: shipment.receiver_name || '',
        signature_received: shipment.signature_received,
    });

    const handleInputTracking = (e: React.FormEvent) => {
        e.preventDefault();
        postTracking(`/logistik/shipments/${shipment.id}/mark-shipped`, {
            onSuccess: () => {
                setShowTrackingForm(false);
                router.reload();
            },
        });
    };

    const handleDeliveryConfirmation = (e: React.FormEvent) => {
        e.preventDefault();
        postDelivery(`/logistik/shipments/${shipment.id}/mark-delivered`, {
            onSuccess: () => {
                setShowDeliveryForm(false);
                router.reload();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pengiriman ${shipment.shipment_number}`} />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get('/logistik/shipments')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{shipment.shipment_number}</h1>
                            <p className="text-sm text-gray-600">{shipment.order.order_number}</p>
                        </div>
                    </div>
                    <Badge className={getStatusColor(shipment.status)} style={{ fontSize: '14px', padding: '8px 12px' }}>
                        {getStatusLabel(shipment.status)}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="w-5 h-5" />
                                Informasi Pengiriman
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Kurir</p>
                                    <p className="font-semibold">{shipment.courier}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">No. Resi</p>
                                    {shipment.tracking_number ? (
                                        <p className="font-semibold text-blue-600 text-lg">{shipment.tracking_number}</p>
                                    ) : (
                                        <p className="text-gray-500 italic">Belum ada resi</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Dibuat</p>
                                    <p className="font-semibold">{shipment.created_at}</p>
                                </div>
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
                                        <p className="font-semibold text-green-600">{shipment.actual_delivery_date}</p>
                                    </div>
                                )}
                            </div>

                            {shipment.notes && (
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-gray-600">Catatan</p>
                                    <p className="font-semibold">{shipment.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Penerima</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">Nama</p>
                                <p className="font-semibold">{shipment.recipient_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Telepon</p>
                                <p className="font-semibold">{shipment.recipient_phone}</p>
                            </div>
                            {shipment.receiver_name && (
                                <div className="pt-2 border-t">
                                    <p className="text-sm text-green-600 font-semibold">Diterima oleh:</p>
                                    <p className="font-semibold">{shipment.receiver_name}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {shipment.status === 'pending' && (
                    <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-900">Siap kirim pesanan ini?</p>
                                    <p className="text-sm text-blue-800">
                                        Input nomor resi untuk mengubah status menjadi <span className="font-semibold">Terkirim</span>.
                                    </p>
                                </div>
                                <Dialog open={showTrackingForm} onOpenChange={setShowTrackingForm}>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2">
                                            <Package className="w-4 h-4" />
                                            Input Resi
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Input Resi Pengiriman</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleInputTracking} className="space-y-4">
                                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
                                                Setelah disimpan, status shipment akan berubah ke <strong>Terkirim</strong>.
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="tracking_number">Nomor Resi</Label>
                                                <Input
                                                    id="tracking_number"
                                                    type="text"
                                                    value={trackingData.tracking_number}
                                                    onChange={(e) => setTrackingData('tracking_number', e.target.value)}
                                                    placeholder="Contoh: JNE1234567890"
                                                    required
                                                />
                                                <p className="text-xs text-gray-500">Nomor resi harus unik per shipment.</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 rounded-lg border p-3">
                                                <div>
                                                    <p className="text-xs text-gray-500">Kurir</p>
                                                    <p className="font-medium">{shipment.courier}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">No. Pengiriman</p>
                                                    <p className="font-medium">{shipment.shipment_number}</p>
                                                </div>
                                            </div>
                                            <Button type="submit" disabled={trackingProcessing} className="w-full">
                                                {trackingProcessing && <Loader className="w-4 h-4 animate-spin mr-2" />}
                                                Tandai Terkirim
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {shipment.status === 'shipped' && (
                    <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-purple-900">Paket dalam perjalanan</p>
                                    <p className="text-sm text-purple-800">Konfirmasi penerimaan ketika barang benar-benar sudah sampai ke penerima.</p>
                                </div>
                                <Dialog open={showDeliveryForm} onOpenChange={setShowDeliveryForm}>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Konfirmasi Diterima
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Konfirmasi Penerimaan Barang</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleDeliveryConfirmation} className="space-y-4">
                                            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm text-purple-900">
                                                Gunakan nama penerima yang benar untuk kebutuhan pelacakan dan audit.
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="receiver_name">Nama Penerima</Label>
                                                <Input
                                                    id="receiver_name"
                                                    type="text"
                                                    value={deliveryData.receiver_name}
                                                    onChange={(e) => setDeliveryData('receiver_name', e.target.value)}
                                                    placeholder="Nama orang yang menerima barang"
                                                    required
                                                />
                                            </div>
                                            <div className="rounded-lg border p-3">
                                                <label htmlFor="signature" className="flex cursor-pointer items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium">Tanda tangan diterima</p>
                                                        <p className="text-xs text-gray-500">Aktifkan jika penerima sudah tanda tangan.</p>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        id="signature"
                                                        checked={deliveryData.signature_received}
                                                        onChange={(e) => setDeliveryData('signature_received', e.target.checked)}
                                                        className="h-4 w-4"
                                                    />
                                                </label>
                                            </div>
                                            <Button type="submit" disabled={deliveryProcessing} className="w-full">
                                                {deliveryProcessing && <Loader className="w-4 h-4 animate-spin mr-2" />}
                                                Konfirmasi Penerimaan
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {shipment.status === 'delivered' && (
                    <Card className="border-green-200 bg-green-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 text-green-800">
                                <CheckCircle className="w-6 h-6" />
                                <div>
                                    <p className="font-semibold">Barang Telah Diterima</p>
                                    <p className="text-sm">
                                        Diterima oleh {shipment.receiver_name} pada {shipment.actual_delivery_date}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {shipment.trackingHistories && shipment.trackingHistories.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Riwayat Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {shipment.trackingHistories.map((history, idx) => (
                                    <div key={history.id} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                            {idx < shipment.trackingHistories.length - 1 && (
                                                <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <p className="font-semibold text-sm">{history.description}</p>
                                            {history.location && (
                                                <p className="text-sm text-gray-500">Lokasi: {history.location}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">{history.tracked_at}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
