import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

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
        title: 'Tambah Produk',
        href: '#',
    },
];

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        harga_awal: '',
        diskon: '',
        harga_akhir: '',
        type: 'single',
        stock: '',
        image: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/products', {
            forceFormData: true,
            onSuccess: () => router.visit('/admin/products'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>
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
