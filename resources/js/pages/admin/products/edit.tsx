import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    description?: string;
    harga_modal: string;
    harga_awal: string;
    diskon?: string;
    harga_akhir?: string;
    point_value?: string;
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
        harga_modal: product.harga_modal ?? product.harga_awal,
        harga_awal: product.harga_awal ?? '',
        diskon: product.diskon ?? '',
        point_value: product.point_value ?? '',
        type: product.type ?? 'single',
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

                    <Input placeholder="Harga Modal" name="harga_modal" type="number" value={data.harga_modal} onChange={handleChange} />
                    {errors.harga_modal && <p className="text-sm text-red-600">{errors.harga_modal}</p>}

                    <Input placeholder="Harga Jual (Sebelum Diskon)" name="harga_awal" type="number" value={data.harga_awal} onChange={handleChange} />
                    {errors.harga_awal && <p className="text-sm text-red-600">{errors.harga_awal}</p>}

                    <Input placeholder="Diskon (%)" name="diskon" type="number" value={data.diskon} onChange={handleChange} />
                    {errors.diskon && <p className="text-sm text-red-600">{errors.diskon}</p>}

                    <Input placeholder="Poin Produk" name="point_value" type="number" value={data.point_value} onChange={handleChange} />
                    {errors.point_value && <p className="text-sm text-red-600">{errors.point_value}</p>}

                    <Input placeholder="Tipe: single / bundle" name="type" value={data.type} onChange={handleChange} />
                    {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}

                    <p className="text-sm text-muted-foreground">
                        Stok saat ini: <span className="font-medium">{product.stock ?? 0}</span> (ubah stok hanya dari logistik/inventaris).
                    </p>

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
