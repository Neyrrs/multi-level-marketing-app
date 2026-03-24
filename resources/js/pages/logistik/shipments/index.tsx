import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Eye, Truck } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';
import { Badge } from '@/components/ui/badge';

interface Shipment {
    id: number;
    shipment_number: string;
    tracking_number?: string;
    courier: string;
    status: string;
    recipient_name: string;
    shipped_date?: string;
    created_at: string;
}

interface PaginationData {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    hasMore: boolean;
}

interface Props {
    shipments: Shipment[];
    pagination: PaginationData;
    search: string;
    status: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistik',
        href: '/logistik/dashboard',
    },
    {
        title: 'Pengiriman',
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
        lost: 'bg-red-100 text-red-800',
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

const formatWIBDateTime = (value?: string) => {
    if (!value) return '-';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const formatted = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);

    return `${formatted.replace(',', '').replace(':', '.')} WIB`;
};

export default function ShipmentsIndex({ shipments = [], pagination, search = '', status = '' }: Props) {
    const [searchInput, setSearchInput] = useState(search);
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleSearch = (value: string) => {
        setSearchInput(value);
        router.get(
            '/logistik/shipments',
            { search: value, status: selectedStatus },
            { preserveState: true, replace: true }
        );
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        router.get(
            '/logistik/shipments',
            { search: searchInput, status: value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengiriman - Logistik" />

            <div className="space-y-4">
                <div className="md:flex-row flex-col flex justify-between items-start gap-2 md:items-center">
                    <h1 className="md:text-2xl text-xl font-bold flex items-center gap-2">
                        <Truck className="w-8 h-8 md:block hidden" />
                        Daftar Pengiriman
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SearchInput
                        value={searchInput}
                        onSearchChange={handleSearch}
                    />
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter berdasarkan status..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="ready_to_ship">Siap Dikirim</SelectItem>
                            <SelectItem value="shipped">Terkirim</SelectItem>
                            <SelectItem value="in_transit">Dalam Perjalanan</SelectItem>
                            <SelectItem value="delivered">Diterima</SelectItem>
                            <SelectItem value="returned">Dikembalikan</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSelectedStatus('');
                            router.get('/logistik/shipments', { search: searchInput }, { preserveState: true, replace: true });
                        }}
                    >
                        Reset Filter
                    </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No. Pengiriman</TableHead>
                                <TableHead>No. Resi</TableHead>
                                <TableHead>Kurir</TableHead>
                                <TableHead>Penerima</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tgl. Dibuat</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shipments.length > 0 ? (
                                shipments.map((shipment) => (
                                    <TableRow key={shipment.id}>
                                        <TableCell className="font-medium">{shipment.shipment_number}</TableCell>
                                        <TableCell>
                                            {shipment.tracking_number ? (
                                                <span className="text-blue-600 font-semibold">{shipment.tracking_number}</span>
                                            ) : (
                                                <span className="text-gray-500 text-sm">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{shipment.courier}</TableCell>
                                        <TableCell>{shipment.recipient_name}</TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(shipment.status)}>
                                                {getStatusLabel(shipment.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{formatWIBDateTime(shipment.created_at)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(`/logistik/shipments/${shipment.id}`)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        Tidak ada pengiriman yang ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {pagination.lastPage > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {pagination.currentPage > 1 && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.get('/logistik/shipments', {
                                        ...{ search: searchInput, status: selectedStatus },
                                        page: pagination.currentPage - 1,
                                    })
                                }
                            >
                                Sebelumnya
                            </Button>
                        )}
                        {pagination.hasMore && (
                            <Button
                                onClick={() =>
                                    router.get('/logistik/shipments', {
                                        ...{ search: searchInput, status: selectedStatus },
                                        page: pagination.currentPage + 1,
                                    })
                                }
                            >
                                Selanjutnya
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
