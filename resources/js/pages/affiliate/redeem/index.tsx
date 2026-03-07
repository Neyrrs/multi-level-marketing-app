import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Redeem Kode', href: '/affiliate/redeem' },
];

interface Props {
    availableCodes: Array<{ id: number; code: string; product_name: string; remaining_usage: number }>;
}

export default function Redeem({ availableCodes }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code_id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        position: 'left',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/affiliate/redeem', {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'email', 'password', 'password_confirmation');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Redeem Kode" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="mb-6 text-lg font-semibold">Redeem Kode + Daftarkan Affiliate Baru</h3>
                    {availableCodes?.length > 0 ? (
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="code_id">Pilih Kode Aktivasi</Label>
                                <select
                                    id="code_id"
                                    value={data.code_id}
                                    onChange={(e) => setData('code_id', e.target.value)}
                                    className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="">Pilih kode</option>
                                    {availableCodes.map((code) => (
                                        <option key={code.id} value={code.id}>
                                            {code.code} | {code.product_name} | sisa {code.remaining_usage}
                                        </option>
                                    ))}
                                </select>
                                {errors.code_id && <p className="text-sm text-red-600">{errors.code_id}</p>}
                              
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama User Baru</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email User Baru</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="position">Posisi Downline</Label>
                                <select
                                    id="position"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value as 'left' | 'right')}
                                    className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="left">Kiri</option>
                                    <option value="right">Kanan</option>
                                </select>
                                {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Memproses...' : 'Redeem & Buat Affiliate'}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-12 text-gray-500">Tidak ada kode aktivasi yang tersedia</div>
                    )}
                </div>

                {availableCodes?.length > 0 && (
                    <div className="rounded-xl border bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold">Daftar Kode Tersedia</h3>
                        <div className="grid gap-3">
                            {availableCodes.map((code) => (
                                <Card key={code.id}>
                                    <CardContent className="flex items-center justify-between pt-6">
                                        <div>
                                            <p className="font-semibold">{code.product_name}</p>
                                            <p className="font-mono text-sm text-gray-600">{code.code}</p>
                                        </div>
                                        <p className="text-sm text-gray-600">Sisa: {code.remaining_usage}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
