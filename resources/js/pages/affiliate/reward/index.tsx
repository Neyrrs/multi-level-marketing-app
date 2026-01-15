import SearchInput from '@/components/fragments/search-input';
import { PaginationCombobox } from '@/components/fragments/combo-box/pagination-combobox';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

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
    const [search, setSearch] = useState<string>('');

    const [perPage, setPerPage] = useState('10');

    const handlePerPageChange = (value: string) => {
        setPerPage(value);

        router.get(
            route('users.index'),
            { perPage: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSearch = (value: string) => {
        router.get(
            route('users.index'),
            { search: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat belanja" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div className="flex w-full items-start border-b-2 pb-4">
                        <div className="w-3/4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-primary md:text-2xl">
                                    Hadiah
                                </p>
                                <span className="text-sm">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </span>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <SearchInput
                                onSearchChange={handleSearch}
                                value={search}
                            />
                        </div>
                    </div>

                    <div className="flex w-full justify-between">
                        <p className="w-1/3">Hadiah</p>
                        <div className="w-40">
                            <PaginationCombobox
                                onChange={handlePerPageChange}
                                value={perPage}
                            />
                        </div>
                    </div>

                    <Table>
                        <TableCaption>
                            Ini adalah data hadiah terbaru
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Poin R.O.</TableHead>
                                <TableHead>Syarat</TableHead>
                                <TableHead>Pencapaian</TableHead>
                                <TableHead>Hadiah</TableHead>
                                <TableHead>Status</TableHead>
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
