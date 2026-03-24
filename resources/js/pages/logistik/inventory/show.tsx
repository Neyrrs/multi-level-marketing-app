import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Box, Package, Plus } from 'lucide-react';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    stock: number;
    price: number;
    original_price: number;
    discount: number;
    weight: number;
    is_active: boolean;
    type: string;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface Props {
    product: ProductData;
}

export default function InventoryShow({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Logistik', href: '/logistik/dashboard' },
        { title: 'Inventaris', href: '/logistik/inventory' },
        { title: 'Detail Produk', href: '#' },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        quantity: '1',
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/logistik/inventory/${product.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('quantity', 'reason');
                router.reload({ only: ['product'] });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Inventaris - ${product.name}`} />

            <div className="space-y-4 md:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => router.get('/logistik/inventory')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{product.name}</h1>
                            <p className="text-sm text-muted-foreground">@{product.slug}</p>
                        </div>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                        {product.status === 'in_stock' ? 'Tersedia' : product.status === 'low_stock' ? 'Stok Rendah' : 'Habis'}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Informasi Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Nama</p>
                                    <p className="font-semibold">{product.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Kategori</p>
                                    <p className="font-semibold uppercase">{product.type}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Harga</p>
                                    <p className="font-semibold">Rp {product.price.toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Berat</p>
                                    <p className="font-semibold">{product.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm">Deskripsi</p>
                                <p className="font-medium">{product.description || '-'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Box className="h-5 w-5" />
                                Informasi Stok
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Stok Saat Ini</p>
                                <p className="text-3xl font-bold">{product.stock}</p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Penambahan stok hanya dilakukan dari halaman inventaris logistik.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card id="restock" className="border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <p className="text-blue-700">
                                Isi jumlah stok yang mau ditambahkan untuk produk ini.
                            </p>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        placeholder="Jumlah tambah stok"
                                    />
                                    {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        value={data.reason}
                                        onChange={(e) => setData('reason', e.target.value)}
                                        placeholder="Catatan (opsional)"
                                    />
                                    {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Tambah Stok
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

