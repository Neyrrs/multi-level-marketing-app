import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Bonus Matching', href: '/affiliate/matching-bonus' },
];

interface Props {
    matchingHistory: { data: Array<any>; total: number };
    stats: any;
}

export default function MatchingBonus({ matchingHistory, stats }: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bonus Matching" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Total Matching</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp {stats?.totalMatching?.toLocaleString('id-ID')}</div>
                        </CardContent>
                    </Card>
                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Bulan Ini</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">Rp {stats?.thisMonth?.toLocaleString('id-ID')}</div>
                        </CardContent>
                    </Card>
                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Total Kiri</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.leftCount}</div>
                        </CardContent>
                    </Card>
                    <Card className='flex flex-col justify-between'>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Total Kanan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.rightCount}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Riwayat Matching</h3>
                    {matchingHistory?.data?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Vol Kiri</TableHead>
                                    <TableHead>Vol Kanan</TableHead>
                                    <TableHead>Pasangan</TableHead>
                                    <TableHead>Bonus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {matchingHistory.data.map((r, i) => (
                                    <TableRow key={r.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{r.period}</TableCell>
                                        <TableCell>Rp {r.left_volume?.toLocaleString?.('id-ID')}</TableCell>
                                        <TableCell>Rp {r.right_volume?.toLocaleString?.('id-ID')}</TableCell>
                                        <TableCell>{r.pair_count}</TableCell>
                                        <TableCell className="font-semibold text-green-600">Rp {r.bonus?.toLocaleString?.('id-ID')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No matching data</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
