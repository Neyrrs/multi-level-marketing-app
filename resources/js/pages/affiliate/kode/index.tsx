import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Kode', href: '/affiliate/kode' },
];

interface Props {
    codes: {
        data: Array<any>;
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        from: number | null;
        to: number | null;
    };
}

export default function Kode({ codes }: Props) {
    const goToPage = (page: number) => {
        router.get(
            '/affiliate/kode',
            { page, perPage: codes.per_page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const changePerPage = (perPage: number) => {
        router.get(
            '/affiliate/kode',
            { page: 1, perPage },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kode" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Total Kode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{codes?.total || 0}</div>
                    </CardContent>
                </Card>
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Daftar Kode Saya</h3>
                    {codes?.data?.length > 0 ? (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Kode</TableHead>
                                        <TableHead>Produk</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {codes.data.map((code, i) => (
                                        <TableRow key={code.id}>
                                            <TableCell>{(codes.from ?? 1) + i}</TableCell>
                                            <TableCell className="font-mono font-semibold">{code.code}</TableCell>
                                            <TableCell>{code.product_name}</TableCell>
                                            <TableCell>{code.status}</TableCell>
                                            <TableCell>{new Date(code.created_at).toLocaleDateString('id-ID')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {codes.from ?? 0}-{codes.to ?? 0} dari {codes.total} data
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={codes.per_page}
                                        onChange={(e) => changePerPage(Number(e.target.value))}
                                        className="h-9 rounded-md border px-2 text-sm"
                                    >
                                        <option value={10}>10 / halaman</option>
                                        <option value={25}>25 / halaman</option>
                                        <option value={50}>50 / halaman</option>
                                        <option value={100}>100 / halaman</option>
                                    </select>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={codes.current_page <= 1}
                                        onClick={() => goToPage(codes.current_page - 1)}
                                    >
                                        Prev
                                    </Button>
                                    <span className="px-2 text-sm">
                                        {codes.current_page} / {codes.last_page}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={codes.current_page >= codes.last_page}
                                        onClick={() => goToPage(codes.current_page + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No codes</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
