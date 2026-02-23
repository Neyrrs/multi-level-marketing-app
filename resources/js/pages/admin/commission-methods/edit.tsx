import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

interface CommissionMethod {
    id: number;
    name: string;
    description: string;
    calculation_type: string;
}

interface Props {
    method: CommissionMethod;
}

export default function EditCommissionMethod({ method }: Props) {
    const [data, setData] = useState({
        name: method.name,
        description: method.description,
        calculation_type: method.calculation_type,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        router.put(`/admin/commission-methods/${method.id}`, data, {
            onSuccess: () => router.visit('/admin/commission-methods'),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Metode Komisi</h1>
            <div className="space-y-4 max-w-2xl">
                <Input
                    placeholder="Nama Metode"
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
                    placeholder="Tipe Perhitungan"
                    name="calculation_type"
                    value={data.calculation_type}
                    onChange={handleChange}
                />
                <div className="flex gap-2">
                    <Button onClick={handleSubmit}>Simpan</Button>
                    <Button variant="outline" onClick={() => router.visit('/admin/commission-methods')}>
                        Batal
                    </Button>
                </div>
            </div>
        </div>
    );
}
