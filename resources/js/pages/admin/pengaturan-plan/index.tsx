import SearchInput from '@/components/fragments/search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Plan {
    id: number;
    plan: string;
    description?: string | null;
    calculation_type: string;
    rules_count: number;
    is_active: boolean;
    is_default: boolean;
}

interface Props {
    plans: Plan[];
    availableRules: Array<{
        id: number;
        method_name: string;
        rule_name: string;
        priority: number;
        value: number;
    }>;
    affiliates: Array<{
        id: number;
        username: string;
        user_name: string;
        user_email: string;
        assigned_plan_id?: number | null;
        assigned_plan_name?: string | null;
        is_active: boolean;
    }>;
    filters?: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Register',
        href: dashboard().url,
    },
];

export default function PengaturanPlan({ plans = [], availableRules = [], affiliates = [], filters }: Props) {
    const [search, setSearch] = useState<string>(filters?.search ?? '');
    const { data, setData, post, processing, errors, reset } = useForm({
        plan: '',
        description: '',
        calculation_type: 'percentage',
        is_active: true,
        is_default: false,
        selected_rule_ids: [] as number[],
    });
    const {
        data: assignData,
        setData: setAssignData,
        post: postAssign,
        processing: processingAssign,
    } = useForm({
        affiliate_id: '',
        plan_id: '',
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/admin/plan-setting', { search: value }, { preserveState: true, replace: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/PengaturanPlan', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const toggleRule = (ruleId: number) => {
        if (data.selected_rule_ids.includes(ruleId)) {
            setData(
                'selected_rule_ids',
                data.selected_rule_ids.filter((id) => id !== ruleId),
            );
            return;
        }

        setData('selected_rule_ids', [...data.selected_rule_ids, ruleId]);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus plan ini?')) return;
        router.delete(`/admin/PengaturanPlan/${id}`, { preserveScroll: true });
    };

    const handleSetDefault = (id: number) => {
        router.post(`/admin/plan-setting/${id}/set-default`, {}, { preserveScroll: true });
    };

    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault();
        postAssign('/admin/plan-setting/assign', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Plan" />
            <div className="space-y-4 p-4">
                <div className="flex w-full items-start border-b-2 pb-4">
                    <div className="w-3/4">
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-primary md:text-2xl">Pengaturan Plan</p>
                            <span className="text-sm">Data plan mengambil metode komisi dan jumlah rule aktifnya.</span>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <SearchInput onSearchChange={handleSearch} value={search} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 rounded-lg border p-4 md:grid-cols-5">
                    <Input
                        placeholder='Plan (contoh: "A")'
                        value={data.plan}
                        onChange={(e) => setData('plan', e.target.value)}
                    />
                    <Input
                        placeholder="Deskripsi plan"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <Input
                        placeholder="Tipe hitung (percentage/tier_based)"
                        value={data.calculation_type}
                        onChange={(e) => setData('calculation_type', e.target.value)}
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        Aktif
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={data.is_default}
                            onChange={(e) => setData('is_default', e.target.checked)}
                        />
                        Default Plan
                    </label>
                    <Button type="submit" disabled={processing}>
                        Buat Plan
                    </Button>
                    {(errors.plan || errors.calculation_type) && (
                        <div className="text-sm text-red-600 md:col-span-5">
                            {errors.plan || errors.calculation_type}
                        </div>
                    )}

                    <div className="md:col-span-5 rounded-md border p-3">
                        <p className="mb-2 text-sm font-medium">Pilih Rule dari Pengaturan Komisi</p>
                        {availableRules.length > 0 ? (
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                {availableRules.map((rule) => (
                                    <label key={rule.id} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={data.selected_rule_ids.includes(rule.id)}
                                            onChange={() => toggleRule(rule.id)}
                                        />
                                        <span>
                                            [{rule.method_name}] {rule.rule_name} | P{rule.priority} | {rule.value}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Belum ada rule aktif.</p>
                        )}
                    </div>
                </form>

                <form onSubmit={handleAssign} className="grid grid-cols-1 gap-2 rounded-lg border p-4 md:grid-cols-4">
                    <div className="md:col-span-4">
                        <p className="text-sm font-medium">Assign Plan ke Affiliate</p>
                    </div>
                    <select
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={assignData.affiliate_id}
                        onChange={(e) => setAssignData('affiliate_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih Affiliate</option>
                        {affiliates
                            .filter((a) => a.is_active)
                            .map((affiliate) => (
                                <option key={affiliate.id} value={affiliate.id}>
                                    {affiliate.username} - {affiliate.user_name}
                                </option>
                            ))}
                    </select>
                    <select
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={assignData.plan_id}
                        onChange={(e) => setAssignData('plan_id', e.target.value)}
                    >
                        <option value="">Tanpa Plan Khusus (Default System)</option>
                        {plans
                            .filter((plan) => plan.is_active)
                            .map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                    {plan.plan}
                                </option>
                            ))}
                    </select>
                    <Button type="submit" disabled={processingAssign || !assignData.affiliate_id}>
                        {processingAssign ? 'Menyimpan...' : 'Simpan Assignment'}
                    </Button>
                    <div className="text-xs text-gray-500">
                        Plan yang di-assign akan dipakai saat hitung komisi affiliate tersebut.
                    </div>
                </form>

                <div className="rounded-lg border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Jumlah Rule</TableHead>
                                <TableHead>Default</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {plans.length > 0 ? (
                                plans.map((item, idx) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell className="font-semibold">{item.plan}</TableCell>
                                        <TableCell>{item.calculation_type}</TableCell>
                                        <TableCell>{item.rules_count}</TableCell>
                                        <TableCell>{item.is_default ? 'Ya' : '-'}</TableCell>
                                        <TableCell>{item.is_active ? 'Aktif' : 'Nonaktif'}</TableCell>
                                        <TableCell>{item.description || '-'}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {!item.is_default && (
                                                    <Button size="sm" variant="outline" onClick={() => handleSetDefault(item.id)}>
                                                        Jadikan Default
                                                    </Button>
                                                )}
                                                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-4 text-center text-gray-500">
                                        Belum ada plan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="rounded-lg border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Affiliate</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Plan Aktif</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {affiliates.length > 0 ? (
                                affiliates.map((affiliate) => (
                                    <TableRow key={affiliate.id}>
                                        <TableCell className="font-semibold">{affiliate.username}</TableCell>
                                        <TableCell>{affiliate.user_name}</TableCell>
                                        <TableCell>{affiliate.user_email}</TableCell>
                                        <TableCell>{affiliate.assigned_plan_name ?? 'Default System'}</TableCell>
                                        <TableCell>{affiliate.is_active ? 'Aktif' : 'Pending'}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                                        Belum ada affiliate.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
