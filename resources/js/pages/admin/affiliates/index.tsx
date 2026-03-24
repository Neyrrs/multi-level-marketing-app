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

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/affiliates', { search: value }, { preserveState: true, replace: true });
    };

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
        </AppLayout>
    );
}
