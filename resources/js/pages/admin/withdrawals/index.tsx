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
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';

interface Withdrawal {
    id: number;
    withdrawal_number: string;
    affiliate?: { username: string };
    amount: number;
    status: 'pending' | 'approved' | 'rejected' | 'paid';
    created_at: string;
}

interface Props {
    withdrawals: Withdrawal[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Manajemen Penarikan',
        href: '#',
    },
];

const statusColors: Record<string, string> = {
    pending: 'text-yellow-600',
    approved: 'text-blue-600',
    paid: 'text-green-600',
    rejected: 'text-red-600',
};

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    paid: 'Dibayar',
    rejected: 'Ditolak',
};

export default function WithdrawalsIndex({ withdrawals = [] }: Props) {
    const [search, setSearch] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/withdrawals', { search: value }, { preserveState: true, replace: true });
    };

    const handleApprove = (id: number) => {
        if (confirm('Setujui penarikan ini?')) {
            router.post(`/admin/withdrawals/${id}/approve`, {}, { onSuccess: () => router.reload() });
        }
    };

    const handleReject = () => {
        if (!selectedId) return;
        router.post(`/admin/withdrawals/${selectedId}/reject`, { reason: rejectReason }, {
                onSuccess: () => {
                    setShowRejectModal(false);
                    setRejectReason('');
                    setSelectedId(null);
                },
            }
        );
    };

    const openRejectModal = (id: number) => {
        setSelectedId(id);
        setShowRejectModal(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Penarikan" />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manajemen Penarikan Dana</h1>
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
                                <TableHead>No Penarikan</TableHead>
                                <TableHead>Affiliate</TableHead>
                                <TableHead>Jumlah</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {withdrawals.length > 0 ? (
                                withdrawals.map((wd, idx) => (
                                    <TableRow key={wd.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{wd.withdrawal_number}</TableCell>
                                        <TableCell>{wd.affiliate?.username || '-'}</TableCell>
                                        <TableCell>
                                            Rp{' '}
                                            {new Intl.NumberFormat('id-ID').format(wd.amount)}
                                        </TableCell>
                                        <TableCell className={statusColors[wd.status]}>
                                            {statusLabels[wd.status]}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(wd.created_at).toLocaleDateString(
                                                'id-ID'
                                            )}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            {wd.status === 'pending' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleApprove(wd.id)}
                                                        className="gap-1"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Setujui
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => openRejectModal(wd.id)}
                                                        className="gap-1"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Tolak
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        Tidak ada data penarikan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Tolak Penarikan</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Alasan Penolakan:
                            </label>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="w-full border rounded p-2 text-sm"
                                rows={4}
                                placeholder="Masukkan alasan penolakan..."
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setShowRejectModal(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleReject}
                            >
                                Tolak
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
