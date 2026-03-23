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
        title: 'Daftar PIN',
        href: '/affiliate/pin-list',
    },
];

interface Pin {
    id: number;
    code: string;
    status: string;
    product_name: string;
    usage_remaining: number;
    created_at: string;
    used_at: string | null;
    auto_used_for_ro?: boolean;
}

interface StatusCounts {
    available: number;
    used: number;
    expired: number;
}

interface Props {
    pins: {
        data: Pin[];
        total: number;
    };
    statusCounts: StatusCounts;
}

export default function PinList({ pins, statusCounts }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-700';
            case 'used':
                return 'bg-blue-100 text-blue-700';
            case 'expired':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'available':
                return 'Tersedia';
            case 'used':
                return 'Digunakan';
            case 'expired':
                return 'Kadaluarsa';
            default:
                return status;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar PIN" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                {/* Status Statistics */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className='flex flex-col justify-between py-4'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold md:text-lg">
                                Tersedia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {statusCounts.available}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-col justify-between py-4'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold md:text-lg">
                                Digunakan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {statusCounts.used}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-col justify-between py-4'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold md:text-lg">
                                Kadaluarsa
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {statusCounts.expired}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* PIN Table */}
                <div className="rounded-xl border bg-white overflow-hidden">
                    <div className="p-4">
                        <h3 className="font-semibold mb-4">Daftar PIN Saya</h3>

                        {pins && pins.data && pins.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Kode PIN</TableHead>
                                        <TableHead>Produk</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Sisa Penggunaan</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pins.data.map((pin, index) => (
                                        <TableRow key={pin.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-mono font-semibold">{pin.code}</TableCell>
                                            <TableCell>{pin.product_name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pin.status)}`}>
                                                        {getStatusLabel(pin.status)}
                                                    </span>
                                                    {pin.auto_used_for_ro && (
                                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                                            Auto-used for RO
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{pin.usage_remaining}</TableCell>
                                            <TableCell>
                                                {new Date(pin.created_at).toLocaleDateString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Tidak ada PIN tersedia
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
