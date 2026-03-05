import SearchInput from '@/components/fragments/search-input';
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
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface PendingAffiliate {
    id: number;
    username: string;
    position: 'left' | 'right' | 'none';
    user: {
        name: string;
        email: string;
    };
    sponsor: {
        name: string;
    };
    created_at: string;
}

interface Props {
    pendingAffiliates: PendingAffiliate[];
    search: string;
}

export default function ManagerAffiliateManagement({
    pendingAffiliates = [],
    search = '',
}: Props) {
    const [query, setQuery] = useState(search);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [position, setPosition] = useState<'left' | 'right'>('left');

    const handleSearch = (value: string) => {
        setQuery(value);
        router.get(
            '/manager/affiliate-management',
            { search: value },
            { preserveState: true, replace: true },
        );
    };

    const submitApproval = () => {
        if (!selectedId) return;

        router.post(
            `/manager/affiliate-management/${selectedId}/approve`,
            { position },
            {
                onSuccess: () => {
                    setSelectedId(null);
                    setPosition('left');
                },
            },
        );
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Manager', href: '/manager/dashboard' },
                { title: 'Manajemen Affiliate', href: '/manager/affiliate-management' },
            ]}
        >
            <Head title="Manajemen Affiliate" />

            <div className="space-y-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Menunggu Persetujuan Affiliate</h1>
                </div>

                <SearchInput value={query} onSearchChange={handleSearch} />

                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Sponsor</TableHead>
                                <TableHead>Posisi Diminta</TableHead>
                                <TableHead>Diajukan</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingAffiliates.length > 0 ? (
                                pendingAffiliates.map((affiliate, idx) => (
                                    <TableRow key={affiliate.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{affiliate.username}</TableCell>
                                        <TableCell>{affiliate.user?.name ?? '-'}</TableCell>
                                        <TableCell>{affiliate.user?.email ?? '-'}</TableCell>
                                        <TableCell>{affiliate.sponsor?.name ?? '-'}</TableCell>
                                        <TableCell className="capitalize">{affiliate.position || '-'}</TableCell>
                                        <TableCell>{affiliate.created_at}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedId(affiliate.id);
                                                    setPosition(
                                                        affiliate.position === 'right' ? 'right' : 'left',
                                                    );
                                                }}
                                            >
                                                Approve
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-4 text-center">
                                        Tidak ada affiliate menunggu persetujuan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {selectedId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-lg font-semibold">Setujui Affiliate</h2>

                        <label className="mb-2 block text-sm font-medium">Posisi Downline</label>
                        <select
                            value={position}
                            onChange={(e) => setPosition(e.target.value as 'left' | 'right')}
                            className="mb-4 w-full rounded-md border px-3 py-2"
                        >
                            <option value="left">Kiri</option>
                            <option value="right">Kanan</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setSelectedId(null)}>
                                Batal
                            </Button>
                            <Button onClick={submitApproval}>Setujui</Button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

