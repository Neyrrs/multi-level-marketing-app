import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, PlusCircleIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/fragments/search-input';

interface Product {
    id: number;
    name: string;
    harga_akhir: number;
    description?: string;
}

interface Props {
    products: Product[];
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Master Produk',
        href: '#',
    },
];

export default function ProductsIndex({ products = [] }: Props) {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/products', { search: value }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Produk" />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Master Produk</h1>
                    <Button onClick={() => router.get('/admin/products/create')} className="gap-2">
                        <PlusCircleIcon className="w-4 h-4" />
                        Tambah Produk
                    </Button>
                </div>

                <SearchInput
                    value={search}
                    onSearchChange={handleSearch}
                />

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama Produk</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product, idx) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>
                                            Rp {new Intl.NumberFormat('id-ID').format(product.harga_akhir)}
                                        </TableCell>
                                        <TableCell>{product.description || '-'}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(`/admin/products/${product.id}/edit`)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        Tidak ada data produk
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
