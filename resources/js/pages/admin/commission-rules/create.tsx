import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

interface MethodOption {
    id: number;
    name: string;
}

interface Props {
    methods: MethodOption[];
}

export default function CreateCommissionRule({ methods = [] }: Props) {
    const [data, setData] = useState({
        method_id: '',
        rule_name: '',
        condition: '',
        depth: '',
        max_depth: '',
        value: '',
        priority: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        let parsedCondition: Record<string, unknown> = {};
        if (data.condition.trim() !== '') {
            try {
                parsedCondition = JSON.parse(data.condition);
            } catch {
                alert('Format Kondisi (JSON) tidak valid.');
                return;
            }
        }

        const payload: Record<string, unknown> = {
            ...data,
            method_id: Number(data.method_id),
            value: Number(data.value),
            priority: data.priority === '' ? null : Number(data.priority),
            depth: data.depth === '' ? null : Number(data.depth),
            max_depth: data.max_depth === '' ? null : Number(data.max_depth),
            condition: parsedCondition,
        };

        router.post('/admin/commission-rules', payload, {
            onSuccess: () => router.visit('/admin/commission-rules'),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Tambah Rule Komisi</h1>
            <div className="space-y-4 max-w-2xl">
                <select
                    name="method_id"
                    value={data.method_id}
                    onChange={(e) => setData((prev) => ({ ...prev, method_id: e.target.value }))}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                    <option value="">Pilih Metode Komisi</option>
                    {methods.map((method) => (
                        <option key={method.id} value={method.id}>
                            {method.name}
                        </option>
                    ))}
                </select>
                <Input
                    placeholder="Nama Rule"
                    name="rule_name"
                    value={data.rule_name}
                    onChange={handleChange}
                />
                <Textarea
                    placeholder="Kondisi (JSON)"
                    name="condition"
                    value={data.condition}
                    onChange={handleChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        placeholder="Depth (opsional)"
                        name="depth"
                        type="number"
                        min={1}
                        value={data.depth}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Max Depth (opsional)"
                        name="max_depth"
                        type="number"
                        min={1}
                        value={data.max_depth}
                        onChange={handleChange}
                    />
                </div>
                <Input
                    placeholder="Nilai"
                    name="value"
                    type="number"
                    step="0.01"
                    value={data.value}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Prioritas"
                    name="priority"
                    type="number"
                    value={data.priority}
                    onChange={handleChange}
                />
                <div className="flex gap-2">
                    <Button onClick={handleSubmit}>Simpan</Button>
                    <Button variant="outline" onClick={() => router.visit('/admin/commission-rules')}>
                        Batal
                    </Button>
                </div>
            </div>
        </div>
    );
}
