import SearchInput from '@/components/fragments/search-input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, PlusCircleIcon, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { PaginationCombobox } from '@/components/fragments/combo-box/pagination-combobox';

interface User {
    name: string;
    email: string;
}

interface Sponsor {
    name?: string;
    username?: string;
}

interface Affiliate {
    id: number;
    username: string;
    user?: User;
    sponsor?: Sponsor;
    sponsor_id?: number | null;
    upline_id?: number | null;
    is_active: boolean;
    position?: string;
    total_downline: number;
    total_volume: number;
    sponsored_at?: string;
}

interface Pagination {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    hasMore: boolean;
}

interface Props {
    affiliates: Affiliate[];
    pagination: Pagination;
    search: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Manajemen Affiliate', href: '/admin/affiliate-management' },
];

export default function ManajemenAffiliate({ affiliates = [], pagination, search: initialSearch = '' }: Props) {
    const [search, setSearch] = useState<string>(initialSearch);
    const [perPage, setPerPage] = useState(pagination?.perPage?.toString() || '10');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/admin/affiliate-management',
            { search: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePerPageChange = (value: string) => {
        setPerPage(value);
        router.get(
            '/admin/affiliate-management',
            { per_page: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus affiliate ini?')) {
            router.delete(`/admin/ManajemenAffiliate/${id}`, {
                onSuccess: () => {
                    alert('Affiliate berhasil dihapus');
                },
                onError: () => {
                    alert('Gagal menghapus affiliate');
                },
            });
        }
    };

    const handleEdit = (id: number) => {
        router.get(`/admin/ManajemenAffiliate/${id}/edit`);
    };

    const activeCount = affiliates.filter((a) => a.is_active).length;
    const totalVolume = affiliates.reduce((sum, a) => sum + (a.total_volume || 0), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Affiliate" />
            <div className="flex flex-col gap-6 p-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Affiliate</p>
                            <p className="text-3xl font-bold">{pagination?.total || 0}</p>
                            <p className="text-xs text-gray-500">Aktif: {activeCount}</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Volume</p>
                            <p className="text-3xl font-bold">Rp {(totalVolume / 1000000).toFixed(1)}M</p>
                            <p className="text-xs text-gray-500">Semua Affiliate</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Page</p>
                            <p className="text-3xl font-bold">{pagination?.currentPage || 1}/{pagination?.lastPage || 1}</p>
                            <p className="text-xs text-gray-500">Total Pages</p>
                        </div>
                    </Card>
                </div>

                {/* Controls */}
                <div className="flex w-full justify-between items-center">
                    <div className="w-1/3">
                        <p className="text-sm font-medium">Data Affiliate</p>
                    </div>
                    <div className="flex w-fit flex-col-reverse items-end gap-2 md:flex-row md:items-center">
                        <div className="w-40">
                            <PaginationCombobox
                                onChange={handlePerPageChange}
                                value={perPage}
                            />
                        </div>
                        <Button>
                            <PlusCircleIcon /> Tambah Affiliate
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <Card className="p-4">
                    <SearchInput onSearchChange={handleSearch} value={search} placeholder="Cari nama atau username affiliate..." />
                </Card>

                {/* Table */}
                <Card className="overflow-hidden">
                    <Table>
                        <TableCaption>
                            {affiliates.length === 0 ? 'Tidak ada data affiliate' : `Menampilkan ${affiliates.length} dari ${pagination?.total || 0} affiliate`}
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Sponsor</TableHead>
                                <TableHead className="text-right">Downline</TableHead>
                                <TableHead className="text-right">Volume</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Posisi</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {affiliates.length > 0 ? (
                                affiliates.map((affiliate) => (
                                    (() => {
                                        const normalizedPosition = (affiliate.position ?? '').toLowerCase();
                                        const isRootNode =
                                            (affiliate.upline_id ?? null) === null &&
                                            (affiliate.sponsor_id ?? null) === null;
                                        const positionLabel =
                                            normalizedPosition && normalizedPosition !== 'none'
                                                ? normalizedPosition
                                                : isRootNode
                                                    ? 'parent'
                                                    : 'none';

                                        return (
                                    <TableRow key={affiliate.id}>
                                        <TableCell className="font-medium">{affiliate.username}</TableCell>
                                        <TableCell>{affiliate.user?.name || '-'}</TableCell>
                                        <TableCell>{affiliate.user?.email || '-'}</TableCell>
                                        <TableCell>{affiliate.sponsor?.name || affiliate.sponsor?.username || '-'}</TableCell>
                                        <TableCell className="text-right">{affiliate.total_downline || 0}</TableCell>
                                        <TableCell className="text-right">Rp {((affiliate.total_volume || 0) / 1000000).toFixed(2)}M</TableCell>
                                        <TableCell>
                                            {affiliate.is_active ? (
                                                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                                                    <CheckCircle className="w-3 h-3" /> Aktif
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                                                    <XCircle className="w-3 h-3" /> Pending
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                                {positionLabel}
                                            </span>
                                        </TableCell>
                                        <TableCell className="flex h-fit w-fit items-center gap-2">
                                            <Button
                                                size={'sm'}
                                                variant={'default'}
                                                onClick={() => handleEdit(affiliate.id)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(affiliate.id)}
                                                size={'sm'}
                                                variant={'destructive'}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                        );
                                    })()
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                                        Tidak ada data affiliate ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                {/* Pagination Info */}
                {pagination && pagination.total > 0 && (
                    <div className="text-sm text-gray-600 text-center">
                        Menampilkan halaman {pagination.currentPage} dari {pagination.lastPage} 
                        ({pagination.perPage} item per halaman)
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
