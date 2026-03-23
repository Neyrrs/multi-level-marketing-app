import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Redeem Kode', href: '/affiliate/redeem' },
];

interface Props {
    availableCodes: Array<{
        id: number;
        code: string;
        product_name: string;
        remaining_usage: number;
        request_user?: {
            id: number;
            name: string;
            email: string;
        } | null;
    }>;
    placementOptions: Array<{
        id: number;
        name: string;
        username: string;
        level: number;
        left_available: boolean;
        right_available: boolean;
    }>;
    defaultPlacementAffiliateId?: number;
}

export default function Redeem({ availableCodes, placementOptions = [], defaultPlacementAffiliateId }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code_id: '',
        request_user_id: '',
        placement_affiliate_id: defaultPlacementAffiliateId ? String(defaultPlacementAffiliateId) : '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        position: 'left',
    });

    const selectedCode = useMemo(
        () => availableCodes.find((code) => String(code.id) === data.code_id),
        [availableCodes, data.code_id],
    );
    const selectedPlacement = useMemo(
        () => placementOptions.find((item) => String(item.id) === data.placement_affiliate_id),
        [placementOptions, data.placement_affiliate_id],
    );
    const hasRequestUser = !!selectedCode?.request_user;

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
                                    onChange={(e) => {
                                        const codeId = e.target.value;
                                        const selected = availableCodes.find((code) => String(code.id) === codeId);
                                        setData('code_id', codeId);
                                        setData(
                                            'request_user_id',
                                            selected?.request_user?.id
                                                ? String(selected.request_user.id)
                                                : '',
                                        );
                                        if (selected?.request_user) {
                                            setData('name', selected.request_user.name);
                                            setData('email', selected.request_user.email);
                                        }
                                    }}
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
                                {selectedCode?.request_user && (
                                    <p className="text-xs text-emerald-600">
                                        Request terdeteksi: {selectedCode.request_user.name} ({selectedCode.request_user.email})
                                    </p>
                                )}
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
                                        required={!hasRequestUser}
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
                                        required={!hasRequestUser}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="placement_affiliate_id">Taruh Di Bawah Affiliate</Label>
                                <select
                                    id="placement_affiliate_id"
                                    value={data.placement_affiliate_id}
                                    onChange={(e) => setData('placement_affiliate_id', e.target.value)}
                                    className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="">Pilih node</option>
                                    {placementOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name} (@{option.username}) | L{option.level} | Left {option.left_available ? 'kosong' : 'isi'} | Right {option.right_available ? 'kosong' : 'isi'}
                                        </option>
                                    ))}
                                </select>
                                {errors.placement_affiliate_id && <p className="text-sm text-red-600">{errors.placement_affiliate_id}</p>}
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
                                    <option value="left" disabled={selectedPlacement ? !selectedPlacement.left_available : false}>
                                        Kiri {selectedPlacement && !selectedPlacement.left_available ? '(terisi)' : ''}
                                    </option>
                                    <option value="right" disabled={selectedPlacement ? !selectedPlacement.right_available : false}>
                                        Kanan {selectedPlacement && !selectedPlacement.right_available ? '(terisi)' : ''}
                                    </option>
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

            </div>
        </AppLayout>
    );
}
