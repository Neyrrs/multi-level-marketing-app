import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';

interface MethodOption {
    id: number;
    name: string;
}

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
    methods: MethodOption[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Rule Komisi', href: '/admin/commission-rules' },
    { title: 'Edit', href: '#' },
];

export default function EditCommissionRule({ rule, methods = [] }: Props) {
    const [data, setData] = useState({
        method_id: rule.method_id.toString(),
        rule_name: rule.rule_name,
        condition_type: rule.condition?.type ? String(rule.condition.type) : 'percentage',
        min_points: rule.condition?.min_points ? String(rule.condition.min_points) : '',
        min_leg_points: rule.condition?.min_leg_points ? String(rule.condition.min_leg_points) : '',
        template: rule.condition?.template ? String(rule.condition.template) : '',
        depth: rule.condition?.depth ? String(rule.condition.depth) : '',
        max_depth: rule.condition?.max_depth ? String(rule.condition.max_depth) : '',
        value: rule.value,
        priority: rule.priority.toString(),
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

        const submitData = {
            method_id: Number(data.method_id),
            rule_name: data.rule_name,
            value: Number(data.value),
            priority: data.priority === '' ? null : Number(data.priority),
            depth: data.depth === '' ? null : Number(data.depth),
            max_depth: data.max_depth === '' ? null : Number(data.max_depth),
            condition,
        };
        router.put(`/admin/commission-rules/${rule.id}`, submitData, {
            onSuccess: () => router.visit('/admin/commission-rules'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Rule Komisi" />
            <div className="mx-auto w-full max-w-4xl p-6">
                <Card className="border border-slate-200 shadow-sm">
                    <CardHeader className="border-b bg-slate-50/70">
                        <CardTitle className="text-2xl font-semibold">Edit Rule Komisi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
                            <p className="text-sm font-semibold text-slate-700">Informasi Rule</p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
                            <p className="text-sm font-semibold text-slate-700">Kondisi</p>
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
                        </div>

                        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
                            <p className="text-sm font-semibold text-slate-700">Struktur Dan Nilai</p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button onClick={handleSubmit}>Simpan</Button>
                            <Button variant="outline" onClick={() => router.visit('/admin/commission-rules')}>
                                Batal
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
