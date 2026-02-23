import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Komisi Personal', href: '/affiliate/personal' },
];

interface Props {
    personalCommissions: { data: Array<any>; total: number };
    stats?: any;
}

export default function PersonalRO({ personalCommissions, stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Komisi Personal" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {stats && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Total Personal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp {stats.totalPersonal?.toLocaleString?.('id-ID') || '0'}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Total Volume</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp {stats.totalVolume?.toLocaleString?.('id-ID') || '0'}</div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Komisi Personal</h3>
                    {personalCommissions?.data?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {personalCommissions.data.map((item, i) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>Rp {item.amount?.toLocaleString?.('id-ID')}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{new Date(item.created_at).toLocaleDateString('id-ID')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No data</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
