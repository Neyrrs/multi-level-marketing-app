import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { router } from '@inertiajs/react';

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
        condition_type: 'percentage',
        min_points: '',
        min_leg_points: '',
        template: '',
        depth: '',
        max_depth: '',
        value: '',
        priority: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const condition: Record<string, unknown> = {
            type: data.condition_type || 'percentage',
        };
        if (data.min_points !== '') {
            condition.min_points = Number(data.min_points);
        }
        if (data.min_leg_points !== '') {
            condition.min_leg_points = Number(data.min_leg_points);
        }
        if (data.template !== '') {
            condition.template = data.template;
        }

        const payload: Record<string, unknown> = {
            method_id: Number(data.method_id),
            rule_name: data.rule_name,
            value: Number(data.value),
            priority: data.priority === '' ? null : Number(data.priority),
            depth: data.depth === '' ? null : Number(data.depth),
            max_depth: data.max_depth === '' ? null : Number(data.max_depth),
            condition,
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <select
                        name="condition_type"
                        value={data.condition_type}
                        onChange={handleChange}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="percentage">Tipe Kondisi: Percentage</option>
                        <option value="fixed">Tipe Kondisi: Fixed</option>
                    </select>
                    <Input
                        placeholder="Template (opsional, contoh: standard)"
                        name="template"
                        value={data.template}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Min Points (opsional)"
                        name="min_points"
                        type="number"
                        min={0}
                        value={data.min_points}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Min Leg Points (opsional)"
                        name="min_leg_points"
                        type="number"
                        min={0}
                        value={data.min_leg_points}
                        onChange={handleChange}
                    />
                </div>
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
