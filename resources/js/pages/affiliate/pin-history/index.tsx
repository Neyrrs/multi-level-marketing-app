import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Riwayat PIN', href: '/affiliate/pin-history' },
];

interface Props {
    history: { data: Array<any>; total: number };
}

export default function PinHistory({ history }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat PIN" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Riwayat PIN yang Digunakan</h3>
                    {history?.data?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>PIN</TableHead>
                                    <TableHead>Produk</TableHead>
                                    <TableHead>Dibuat</TableHead>
                                    <TableHead>Digunakan</TableHead>
                                    <TableHead>Dipakai Oleh</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.data.map((item, i) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell className="font-mono">{item.code}</TableCell>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell>{new Date(item.created_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>{new Date(item.used_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>{item.used_by_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No history</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
