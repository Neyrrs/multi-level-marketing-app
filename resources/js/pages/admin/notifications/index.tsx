import { Button } from '@/components/ui/button';
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
import { RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';
import { dashboardUrl } from '@/routes';

interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data?: any;
    read_at?: string;
    created_at: string;
}

interface Props {
    notifications: Notification[];
    total: number;
    currentPage: number;
    perPage: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Manajemen Notifikasi',
        href: '/admin/notifications',
    },
];

export default function NotificationsIndex({
    notifications = [],
    total = 0,
    currentPage = 1,
    perPage = 25,
}: Props) {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/notifications', { search: value, page: 1 }, { preserveState: true, replace: true });
    };

    const handleResend = (id: string) => {
        router.post(`/admin/notifications/${id}/resend`, {}, {
                onSuccess: () => {
                    alert('Notifikasi berhasil dikirim ulang');
                },
            }
        );
    };

    const handleDelete = (id: string) => {
            if (confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) {
            router.delete(`/admin/notifications/${id}`, {
                onSuccess: () => router.reload(),
            });
        }
    };

    const getNotificationType = (type: string) => {
        const parts = type.split('\\');
        return parts[parts.length - 1];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Notifikasi" />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manajemen Notifikasi</h1>
                    <span className="text-sm text-gray-600">Total: {total}</span>
                </div>

                <SearchInput
                    value={search}
                    onSearchChange={handleSearch}
                />

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Dibaca</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notifications.length > 0 ? (
                                notifications.map((notif, idx) => (
                                    <TableRow key={notif.id}>
                                        <TableCell>{(currentPage - 1) * perPage + idx + 1}</TableCell>
                                        <TableCell className="text-sm">
                                            {getNotificationType(notif.type)}
                                        </TableCell>
                                        <TableCell>
                                            {notif.notifiable_type} (ID: {notif.notifiable_id})
                                        </TableCell>
                                        <TableCell>
                                            <code className="text-xs bg-gray-100 p-1 rounded">
                                                {notif.data
                                                    ? JSON.stringify(notif.data).substring(0, 50) +
                                                      '...'
                                                    : '-'}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            {notif.read_at ? (
                                                <span className="text-green-600">Ya</span>
                                            ) : (
                                                <span className="text-yellow-600">Belum</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(notif.created_at).toLocaleDateString(
                                                'id-ID'
                                            )}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                title="Kirim Ulang"
                                                onClick={() => handleResend(notif.id)}
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                title="Hapus"
                                                onClick={() => handleDelete(notif.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        Tidak ada data notifikasi
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
