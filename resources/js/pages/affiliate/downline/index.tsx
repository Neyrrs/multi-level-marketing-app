import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Downline',
        href: '/affiliate/downline',
    },
];

interface Downline {
    id: number;
    name: string;
    username: string;
    level: number;
    position: string;
    created_at: string;
    is_active: boolean;
}

interface Props {
    downlines: {
        data: Downline[];
        total: number;
    };
    total: number;
}

export default function DownlineComponent({ downlines, total }: Props) {
    const [search, setSearch] = useState<string>('');

    const [perPage, setPerPage] = useState('10');

    const handlePerPageChange = (value: string) => {
        setPerPage(value);

        router.get(
            '/affiliate/downline',
            { perPage: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSearch = (value: string) => {
        router.get(
            '/affiliate/downline',
            { search: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Downline" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                {/* Statistics Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Total Downline
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {total}
                        </div>
                    </CardContent>
                </Card>

                {/* Downline Table */}
                <div className="rounded-xl border bg-white overflow-hidden">
                    <div className="p-4">
                        <h3 className="font-semibold mb-4 text-lg">Daftar Downline</h3>

                        {downlines && downlines.data && downlines.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Username</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Terdaftar</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {downlines.data.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.username}</TableCell>
                                            <TableCell>{item.level}</TableCell>
                                            <TableCell className="capitalize">{item.position}</TableCell>
                                            <TableCell>
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Tidak ada data downline
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
