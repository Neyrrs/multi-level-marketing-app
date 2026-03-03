'use client';

import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Eye, Package, AlertTriangle, Minus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Logistik', href: '#' },
    { title: 'Inventaris', href: '/logistik/inventory' },
];

interface Product {
    id: number;
    name: string;
    slug: string;
    stock: number;
    price: number;
    weight: number;
    is_active: boolean;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
    image: string | null;
}

interface Stats {
    totalProducts: number;
    totalStock: number;
    lowStockCount: number;
    outOfStockCount: number;
}

interface Pagination {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    hasMore: boolean;
}

export default function InventoryIndex() {
    const { products, stats, pagination, filters } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || '');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in_stock':
                return <Badge className="bg-green-100 text-green-800">Tersedia</Badge>;
            case 'low_stock':
                return <Badge className="bg-yellow-100 text-yellow-800">Stok Rendah</Badge>;
            case 'out_of_stock':
                return <Badge className="bg-red-100 text-red-800">Habis</Badge>;
            default:
                return <Badge>-</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'in_stock':
                return <Package className="h-4 w-4 text-green-600" />;
            case 'low_stock':
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
            case 'out_of_stock':
                return <Minus className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventaris" />
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl md:p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className='gap-4'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold">Total Produk</CardTitle>
                            <Package className="h-8 w-8 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Stats).totalProducts}</div>
                            <p className="text-sm text-gray-500">Produk aktif</p>
                        </CardContent>
                    </Card>

                    <Card className='gap-4'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold">Total Stok</CardTitle>
                            <Package className="h-8 w-8 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Stats).totalStock}</div>
                            <p className="text-sm text-gray-500">Unit tersedia</p>
                        </CardContent>
                    </Card>

                    <Card className='gap-4'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold">Stok Rendah</CardTitle>
                            <AlertTriangle className="8-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{(stats as Stats).lowStockCount}</div>
                            <p className="text-sm text-gray-500">Perlu restok</p>
                        </CardContent>
                    </Card>

                    <Card className='gap-4'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold">Habis Terjual</CardTitle>
                            <Minus className="h-48w-4 8ext-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{(stats as Stats).outOfStockCount}</div>
                            <p className="text-sm text-gray-500">Tidak tersedia</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="flex gap-2">
                    <Input
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button variant="outline">Cari</Button>
                </div>

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Inventaris</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produk</TableHead>
                                    <TableHead className="text-right">Stok</TableHead>
                                    <TableHead className="text-right">Harga</TableHead>
                                    <TableHead className="text-right">Berat (kg)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(products as Product[]).map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="text-right">{product.stock}</TableCell>
                                        <TableCell className="text-right">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell className="text-right">{product.weight}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(product.status)}
                                                {getStatusBadge(product.status)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Link href={`/logistik/inventory/${product.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Menampilkan {(pagination as Pagination).perPage} dari {(pagination as Pagination).total} produk
                            </p>
                            <div className="flex gap-2">
                                {(pagination as Pagination).currentPage > 1 && (
                                    <Button variant="outline">← Sebelumnya</Button>
                                )}
                                {(pagination as Pagination).hasMore && (
                                    <Button variant="outline">Berikutnya →</Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
