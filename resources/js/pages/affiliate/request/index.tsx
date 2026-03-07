import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface RequestItem {
    id: number;
    name: string;
    email: string;
    requested_at: string;
    status: string;
}

interface Props {
    requests: RequestItem[];
}

export default function AffiliateRequestIndex({ requests = [] }: Props) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Affiliate', href: '/affiliate/dashboard' },
                { title: 'Request', href: '/affiliate/request' },
            ]}
        >
            <Head title="Request Affiliate" />

            <div className="space-y-4 rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold">Request Jadi Affiliate</h1>
                    <p className="text-sm text-gray-500">
                        Daftar user yang request untuk diproses menjadi affiliate.
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Tanggal Request</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{request.name}</TableCell>
                                        <TableCell>{request.email}</TableCell>
                                        <TableCell>{request.requested_at}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                                        Belum ada request.
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

