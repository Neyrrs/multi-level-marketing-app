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
import { Edit, PlusCircleIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';

interface CommissionMethod {
    id: number;
    name: string;
    calculation_type: string;
    rules_count?: number;
}

interface Props {
    methods: CommissionMethod[];
    locked_methods?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Metode Komisi',
        href: '#',
    },
];

export default function CommissionMethodsIndex({ methods = [], locked_methods = true }: Props) {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/commission-methods', { search: value }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus metode komisi ini?')) {
            router.delete(`/admin/commission-methods/${id}`);
        }
    };

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            sponsor_direct: 'Sponsor Langsung',
            level_based: 'Berbasis Level',
            matching_binary: 'Matching Binary',
        };
        return labels[type] || type;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Metode Komisi" />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Metode Komisi</h1>
                    <Button
                        onClick={() => router.get('/admin/commission-methods/create')}
                        className="gap-2"
                        disabled={locked_methods}
                        title={locked_methods ? 'Metode komisi dikunci' : undefined}
                    >
                        <PlusCircleIcon className="w-4 h-4" />
                        Tambah Metode
                    </Button>
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
                                <TableHead>Nama Metode</TableHead>
                                <TableHead>Tipe Perhitungan</TableHead>
                                <TableHead>Jumlah Rule</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {methods.length > 0 ? (
                                methods.map((method, idx) => (
                                    <TableRow key={method.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{method.name}</TableCell>
                                        <TableCell>{getTypeLabel(method.calculation_type)}</TableCell>
                                        <TableCell>{method.rules_count || 0}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(`/admin/commission-methods/${method.id}/edit`)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                disabled={locked_methods}
                                                onClick={() => handleDelete(method.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        Tidak ada data metode komisi
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
