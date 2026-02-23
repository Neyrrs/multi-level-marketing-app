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
import { CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';

interface Affiliate {
    id: number;
    username: string;
    user?: { name: string; email: string };
    is_active: boolean;
    position?: string;
    sponsor_id?: number;
    sponsor?: { username: string };
}

interface Props {
    affiliates: Affiliate[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Manajemen Affiliate',
        href: '#',
    },
];

export default function AffiliatesAdminIndex({ affiliates = [] }: Props) {
    const [search, setSearch] = useState('');
    const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [approvalPosition, setApprovalPosition] = useState('left');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/affiliates', { search: value }, { preserveState: true, replace: true });
    };

    const handleApprove = (affiliate: Affiliate) => {
        setSelectedAffiliate(affiliate);
        setShowApprovalModal(true);
    };

    const submitApproval = () => {
        if (!selectedAffiliate) return;
        router.post(`/admin/affiliates/${selectedAffiliate.id}/approve`, { position: approvalPosition }, {
                onSuccess: () => {
                    setShowApprovalModal(false);
                    setSelectedAffiliate(null);
                },
            }
        );
    };

    const pendingAffiliates = affiliates.filter((a) => !a.is_active);
    const activeAffiliates = affiliates.filter((a) => a.is_active);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Affiliate" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manajemen Affiliate</h1>
                </div>

                <SearchInput
                    value={search}
                    onSearchChange={handleSearch}
                />

                {/* Pending Affiliates */}
                <div>
                    <h2 className="text-lg font-semibold mb-2 text-yellow-600">
                        Menunggu Persetujuan ({pendingAffiliates.length})
                    </h2>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Nama User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingAffiliates.length > 0 ? (
                                    pendingAffiliates.map((aff, idx) => (
                                        <TableRow key={aff.id}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{aff.username}</TableCell>
                                            <TableCell>{aff.user?.name || '-'}</TableCell>
                                            <TableCell>{aff.user?.email || '-'}</TableCell>
                                            <TableCell>
                                                <span className="text-yellow-600">Pending</span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleApprove(aff)}
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Setujui
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-4">
                                            Tidak ada affiliate yang menunggu persetujuan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Active Affiliates */}
                <div>
                    <h2 className="text-lg font-semibold mb-2 text-green-600">
                        Affiliate Aktif ({activeAffiliates.length})
                    </h2>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Nama User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Posisi</TableHead>
                                    <TableHead>Sponsor</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeAffiliates.length > 0 ? (
                                    activeAffiliates.map((aff, idx) => (
                                        <TableRow key={aff.id}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{aff.username}</TableCell>
                                            <TableCell>{aff.user?.name || '-'}</TableCell>
                                            <TableCell>{aff.user?.email || '-'}</TableCell>
                                            <TableCell>
                                                <span className="capitalize">
                                                    {aff.position || 'none'}
                                                </span>
                                            </TableCell>
                                            <TableCell>{aff.sponsor?.username || '-'}</TableCell>
                                            <TableCell>
                                                <span className="text-green-600">Aktif</span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-4">
                                            Tidak ada affiliate aktif
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Approval Modal */}
            {showApprovalModal && selectedAffiliate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            Setujui Affiliate: {selectedAffiliate.username}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Pilih Posisi:
                            </label>
                            <select
                                value={approvalPosition}
                                onChange={(e) => setApprovalPosition(e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="left">Kiri</option>
                                <option value="right">Kanan</option>
                            </select>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setShowApprovalModal(false)}
                            >
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
