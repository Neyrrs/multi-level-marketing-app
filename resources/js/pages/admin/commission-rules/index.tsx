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

interface CommissionRule {
    id: number;
    method_id: number;
    priority: number;
    value?: number;
    condition?: any;
    method?: { name: string };
}

interface Props {
    rules: CommissionRule[];
    locked_single_rule?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Rule Komisi',
        href: '#',
    },
];

export default function CommissionRulesIndex({ rules = [], locked_single_rule = true }: Props) {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/commission-rules', { search: value }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus rule komisi ini?')) {
            router.delete(`/admin/commission-rules/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rule Komisi" />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Rule Komisi</h1>
                    <Button
                        onClick={() => router.get('/admin/commission-rules/create')}
                        className="gap-2"
                        disabled={locked_single_rule}
                        title={locked_single_rule ? 'Rule dikunci: 1 metode = 1 rule' : undefined}
                    >
                        <PlusCircleIcon className="w-4 h-4" />
                        Tambah Rule
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
                                <TableHead>Metode</TableHead>
                                <TableHead>Prioritas</TableHead>
                                <TableHead>Nilai</TableHead>
                                <TableHead>Depth</TableHead>
                                <TableHead>Kondisi</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rules.length > 0 ? (
                                rules.map((rule, idx) => (
                                    <TableRow key={rule.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{rule.method?.name || `-`}</TableCell>
                                        <TableCell>{rule.priority}</TableCell>
                                        <TableCell>{rule.value || '-'}</TableCell>
                                        <TableCell>
                                            {rule.condition?.depth ?? '-'}
                                            {rule.condition?.max_depth ? ` / ${rule.condition.max_depth}` : ''}
                                        </TableCell>
                                        <TableCell>
                                            <code className="text-xs bg-gray-100 p-1 rounded">
                                                {rule.condition
                                                    ? JSON.stringify(rule.condition).substring(0, 50) + '...'
                                                    : '-'}
                                            </code>
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(`/admin/commission-rules/${rule.id}/edit`)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(rule.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        Tidak ada data rule komisi
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
