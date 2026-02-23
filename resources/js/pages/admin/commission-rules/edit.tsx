import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

interface CommissionRule {
    id: number;
    method_id: number;
    rule_name: string;
    condition: Record<string, any>;
    value: string;
    priority: number;
}

interface Props {
    rule: CommissionRule;
}

export default function EditCommissionRule({ rule }: Props) {
    const [data, setData] = useState({
        method_id: rule.method_id.toString(),
        rule_name: rule.rule_name,
        condition: JSON.stringify(rule.condition || {}),
        value: rule.value,
        priority: rule.priority.toString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const submitData = {
            ...data,
            condition: data.condition ? JSON.parse(data.condition) : null,
        };
        router.put(`/admin/commission-rules/${rule.id}`, submitData, {
            onSuccess: () => router.visit('/admin/commission-rules'),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Rule Komisi</h1>
            <div className="space-y-4 max-w-2xl">
                <Input
                    placeholder="ID Metode Komisi"
                    name="method_id"
                    type="number"
                    value={data.method_id}
                    onChange={handleChange}
                />
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
