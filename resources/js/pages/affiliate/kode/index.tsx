import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Kode', href: '/affiliate/kode' },
];

interface Props {
    codes: { data: Array<any>; total: number };
}

export default function Kode({ codes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kode" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Kode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{codes?.data?.length || 0}</div>
                    </CardContent>
                </Card>
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Daftar Kode Saya</h3>
                    {codes?.data?.length > 0 ? (
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
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell className="font-mono font-semibold">{code.code}</TableCell>
                                        <TableCell>{code.product_name}</TableCell>
                                        <TableCell>{code.status}</TableCell>
                                        <TableCell>{new Date(code.created_at).toLocaleDateString('id-ID')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No codes</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
