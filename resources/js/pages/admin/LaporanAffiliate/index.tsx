import SearchInput from '@/components/fragments/search-input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { DownloadIcon, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { PaginationCombobox } from '@/components/fragments/combo-box/pagination-combobox';
// import { dashboardUrl } from '@/routes';

interface User {
    name: string;
    email: string;
}

interface Affiliate {
    id: number;
    username: string;
    user?: User;
    is_active: boolean;
    total_downline: number;
    downline_count?: number;
    total_volume: number;
    total_commission?: number;
}

interface Statistics {
    totalAffiliates: number;
    activeAffiliates: number;
    totalSalesVolume: number;
    totalCommission: number;
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
    statistics: Statistics;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Laporan Affiliate',
        href: '/admin/LaporanAffiliate',
    },
];

export default function LaporanAffiliate({ 
    affiliates = [], 
    pagination, 
    search: initialSearch = '', 
    statistics = {
        totalAffiliates: 0,
        activeAffiliates: 0,
        totalSalesVolume: 0,
        totalCommission: 0,
    } 
}: Props) {
    const [search, setSearch] = useState(initialSearch);
    const [perPage, setPerPage] = useState(pagination?.perPage?.toString() || '15');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/admin/reports/LaporanAffiliate',
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
            '/admin/reports/LaporanAffiliate',
            { per_page: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleRefresh = () => {
        router.get(
            '/admin/reports/LaporanAffiliate',
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleExport = () => {
        alert('Fitur export akan segera tersedia');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Affiliate" />
            <div className="flex flex-col gap-6 p-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Affiliate</p>
                            <p className="text-3xl font-bold">{statistics?.totalAffiliates || 0}</p>
                            <p className="text-xs text-gray-500">Aktif: {statistics?.activeAffiliates || 0}</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
                            <p className="text-3xl font-bold">Rp {((statistics?.totalSalesVolume || 0) / 1000000).toFixed(1)}M</p>
                            <p className="text-xs text-gray-500">Semua Affiliate</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Total Komisi</p>
                            <p className="text-3xl font-bold">Rp {((statistics?.totalCommission || 0) / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-gray-500">Periode Ini</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Perpage</p>
                            <p className="text-3xl font-bold">{pagination?.perPage || 15}</p>
                            <p className="text-xs text-gray-500">Items per Page</p>
                        </div>
                    </Card>
                </div>

                {/* Controls */}
                <div className="flex w-full justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleRefresh}>
                            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                        </Button>
                        <Button variant="outline" onClick={handleExport}>
                            <DownloadIcon className="w-4 h-4 mr-2" /> Export
                        </Button>
                    </div>
                    <div className="flex w-fit flex-col-reverse items-end gap-2 md:flex-row md:items-center">
                        <div className="w-40">
                            <PaginationCombobox
                                onChange={handlePerPageChange}
                                value={perPage}
                            />
                        </div>
                    </div>
                </div>

                {/* Search */}
                <Card className="p-4">
                    <SearchInput 
                        onSearchChange={handleSearch} 
                        value={search}
                    />
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
                                <TableHead className="text-right">Downline</TableHead>
                                <TableHead className="text-right">Penjualan</TableHead>
                                <TableHead className="text-right">Komisi</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {affiliates.length > 0 ? (
                                affiliates.map((affiliate) => (
                                    <TableRow key={affiliate.id}>
                                        <TableCell className="font-medium">{affiliate.username}</TableCell>
                                        <TableCell>{affiliate.user?.name || '-'}</TableCell>
                                        <TableCell>{affiliate.user?.email || '-'}</TableCell>
                                        <TableCell className="text-right">{affiliate.downline_count ?? affiliate.total_downline ?? 0}</TableCell>
                                        <TableCell className="text-right">Rp {((affiliate.total_volume || 0) / 1000000).toFixed(1)}M</TableCell>
                                        <TableCell className="text-right">Rp {((affiliate.total_commission || 0)).toLocaleString('id-ID')}</TableCell>
                                        <TableCell>
                                            <span className={`text-xs px-2 py-1 rounded ${affiliate.is_active ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {affiliate.is_active ? 'Aktif' : 'Pending'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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
