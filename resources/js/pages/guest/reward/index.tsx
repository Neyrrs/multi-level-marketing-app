import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hadiah',
        href: dashboard().url,
    },
];

const rewards = [
    {
        no: 1,
        poin: '0 | 0',
        level: 'Premium',
        syarat: '12 | 12',
        pencapaian: 'Belum Qualified',
        hadiah: 'Rp 250.000',
        status: 'PENDING',
    },
    {
        no: 2,
        poin: '0 | 0',
        level: 'Premium',
        syarat: '100 | 100',
        pencapaian: 'Belum Qualified',
        hadiah: 'Rp 1.000.000',
        status: 'PENDING',
    },
    {
        no: 3,
        poin: '0 | 0',
        level: 'Premium',
        syarat: '500 | 500',
        pencapaian: 'Belum Qualified',
        hadiah: 'Rp 3.750.000',
        status: 'PENDING',
    },
    {
        no: 4,
        poin: '0 | 0',
        level: 'Diamond',
        syarat: '4 | 4',
        pencapaian: 'Belum Qualified',
        hadiah: 'Rp 100.000.000',
        status: 'PENDING',
    },
];

export default function Reward() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat belanja" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NO</TableHead>
                                <TableHead>POIN R.O.</TableHead>
                                <TableHead>SYARAT</TableHead>
                                <TableHead>PENCAPAIAN</TableHead>
                                <TableHead>HADIAH</TableHead>
                                <TableHead>STATUS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rewards.map((reward, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>
                                        <div>{reward.poin}</div>
                                        <div>{reward.level}</div>
                                    </TableCell>

                                    <TableCell>
                                        <div>{reward.syarat}</div>
                                        <div>{reward.level}</div>
                                    </TableCell>

                                    <TableCell>{reward.pencapaian}</TableCell>

                                    <TableCell>{reward.hadiah}</TableCell>

                                    <TableCell>
                                        <span>{reward.status}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
