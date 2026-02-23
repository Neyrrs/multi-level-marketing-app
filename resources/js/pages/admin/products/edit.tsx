import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

interface Product {
    id: number;
    name: string;
    description: string;
    harga_awal: string;
    diskon: string;
    harga_akhir: string;
    type: string;
    stock: string;
}

interface Props {
    product: Product;
}

export default function EditProduct({ product }: Props) {
    const [data, setData] = useState({
        name: product.name,
        description: product.description,
        harga_awal: product.harga_awal,
        diskon: product.diskon,
        harga_akhir: product.harga_akhir,
        type: product.type,
        stock: product.stock,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        router.put(`/admin/products/${product.id}`, data, {
            onSuccess: () => router.visit('/admin/products'),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
            <div className="space-y-4 max-w-2xl">
                <Input
                    placeholder="Nama Produk"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
                <Textarea
                    placeholder="Deskripsi"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Harga Awal"
                    name="harga_awal"
                    type="number"
                    value={data.harga_awal}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Diskon"
                    name="diskon"
                    type="number"
                    value={data.diskon}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Harga Akhir"
                    name="harga_akhir"
                    type="number"
                    value={data.harga_akhir}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Tipe"
                    name="type"
                    value={data.type}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Stok"
                    name="stock"
                    type="number"
                    value={data.stock}
                    onChange={handleChange}
                />
                <div className="flex gap-2">
                    <Button onClick={handleSubmit}>Simpan</Button>
                    <Button variant="outline" onClick={() => router.visit('/admin/products')}>
                        Batal
                    </Button>
                </div>
            </div>
        </div>
    );
}
