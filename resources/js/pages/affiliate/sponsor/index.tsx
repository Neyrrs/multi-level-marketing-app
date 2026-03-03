import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Sponsor', href: '/affiliate/sponsor' },
];

interface Props {
    sponsor: { name: string; username: string; level: number; total_downline: number } | null;
    siblings: Array<any>;
}

export default function Sponsor({ sponsor, siblings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sponsor" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                {/* Sponsor Info */}
                {sponsor && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Sponsor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="font-semibold">Nama:</span> {sponsor.name}</p>
                            <p><span className="font-semibold">Username:</span> @{sponsor.username}</p>
                            <p><span className="font-semibold">Level:</span> {sponsor.level}</p>
                            <p><span className="font-semibold">Total Downline:</span> {sponsor.total_downline}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Siblings */}
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4">Rekan Sejawat (Siblings)</h3>
                    {siblings?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Downline</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {siblings.map((sibling, i) => (
                                    <TableRow key={sibling.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{sibling.name}</TableCell>
                                        <TableCell>@{sibling.username}</TableCell>
                                        <TableCell>{sibling.level}</TableCell>
                                        <TableCell>{sibling.direct_downline}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No siblings</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
