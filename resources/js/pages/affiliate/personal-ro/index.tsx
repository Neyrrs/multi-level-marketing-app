import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personal RO', href: '/affiliate/personal-ro' },
];

interface Props {
    stats?: {
        isActive: boolean;
        activeUntil?: string | null;
        remainingDays: number;
    } | null;
    availableCodes: Array<{
        id: number;
        code: string;
        product_name: string;
        remaining_usage: number;
        expired_at?: string | null;
    }>;
    recentRedeems: Array<{
        id: number;
        code: string;
        used_at?: string | null;
        status: string;
    }>;
}

export default function PersonalRO({ stats, availableCodes, recentRedeems }: Props) {
    const { data, setData, post, processing } = useForm({
        code_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/affiliate/personal-ro', { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal RO" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Status Akun Affiliate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.isActive ? 'Aktif' : 'Nonaktif'}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Sisa masa aktif: {Math.max(0, stats?.remainingDays ?? 0)} hari
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {stats?.activeUntil ? `Sampai ${new Date(stats.activeUntil).toLocaleString('id-ID')}` : '-'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Redeem Kode RO</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="space-y-2">
                                    <Label>Pilih Kode RO</Label>
                                    <Select value={data.code_id} onValueChange={(val) => setData('code_id', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kode yang tersedia" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableCodes.map((item) => (
                                                <SelectItem key={item.id} value={String(item.id)}>
                                                    {item.code} - {item.product_name} (sisa {item.remaining_usage})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" disabled={processing || !data.code_id}>
                                    {processing ? 'Memproses...' : 'Redeem RO'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-4 text-lg">Riwayat Redeem RO</h3>
                    {recentRedeems.length > 0 ? (
                        <div className="space-y-2">
                            {recentRedeems.map((item, i) => (
                                <div key={item.id} className="flex items-center justify-between rounded border p-2 text-sm">
                                    <div>
                                        <div className="font-medium">{i + 1}. {item.code}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {item.used_at ? new Date(item.used_at).toLocaleString('id-ID') : '-'}
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium uppercase">{item.status}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">Belum ada redeem RO</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
