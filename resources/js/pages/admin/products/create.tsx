import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

export default function CreateProduct() {
    const [data, setData] = useState({
        name: '',
        description: '',
        harga_awal: '',
        diskon: '',
        harga_akhir: '',
        type: '',
        stock: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        router.post('/admin/products', data, {
            onSuccess: () => router.visit('/admin/products'),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>
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
