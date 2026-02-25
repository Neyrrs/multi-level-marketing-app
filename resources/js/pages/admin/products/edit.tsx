import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    description?: string;
    harga_awal: string;
    diskon?: string;
    harga_akhir?: string;
    type?: string;
    stock?: string;
    image_url?: string | null;
}

interface Props {
    product: Product;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Master Produk',
        href: '/admin/products',
    },
    {
        title: 'Edit Produk',
        href: '#',
    },
];

export default function EditProduct({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description ?? '',
        harga_awal: product.harga_awal,
        diskon: product.diskon ?? '',
        harga_akhir: product.harga_akhir ?? '',
        type: product.type ?? 'single',
        stock: product.stock ?? '',
        image: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/products/${product.id}`, {
            forceFormData: true,
            onSuccess: () => router.visit('/admin/products'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Produk" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                    <Input placeholder="Nama Produk" name="name" value={data.name} onChange={handleChange} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

                    <textarea
                        placeholder="Deskripsi"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                    />
                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}

                    <Input placeholder="Harga Awal" name="harga_awal" type="number" value={data.harga_awal} onChange={handleChange} />
                    {errors.harga_awal && <p className="text-sm text-red-600">{errors.harga_awal}</p>}

                    <Input placeholder="Diskon (%)" name="diskon" type="number" value={data.diskon} onChange={handleChange} />
                    {errors.diskon && <p className="text-sm text-red-600">{errors.diskon}</p>}

                    <Input placeholder="Harga Akhir (opsional)" name="harga_akhir" type="number" value={data.harga_akhir} onChange={handleChange} />
                    {errors.harga_akhir && <p className="text-sm text-red-600">{errors.harga_akhir}</p>}

                    <Input placeholder="Tipe: single / bundle" name="type" value={data.type} onChange={handleChange} />
                    {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}

                    <Input placeholder="Stok" name="stock" type="number" value={data.stock} onChange={handleChange} />
                    {errors.stock && <p className="text-sm text-red-600">{errors.stock}</p>}

                    {product.image_url && (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-24 w-24 rounded border object-cover"
                        />
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                    />
                    {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>Simpan</Button>
                        <Button type="button" variant="outline" onClick={() => router.visit('/admin/products')}>
                            Batal
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
