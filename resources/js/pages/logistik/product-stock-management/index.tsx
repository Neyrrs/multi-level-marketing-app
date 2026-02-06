import SearchInput from '@/components/fragments/search-input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
        title: 'Dashboard Logistik',
        href: dashboard().url,
    },
];

export default function ProductStockManagement() {
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
            <Head title="CostumerDashboard" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div className="flex w-full items-start border-b-2 pb-4">
                        <div className="w-3/4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-primary md:text-2xl">
                                    Manajemen Stok Produk
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

                    <Table>
                        <TableCaption>
                            Ini adalah data manajemen stok produk terbaru
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-25">No</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Akun</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead>Nilai</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">
                                        {invoice.invoice}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.paymentStatus}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.paymentMethod}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {invoice.totalAmount}
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>Total</TableCell>
                                <TableCell className="text-right">
                                    {/* $2,500.00 */}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
