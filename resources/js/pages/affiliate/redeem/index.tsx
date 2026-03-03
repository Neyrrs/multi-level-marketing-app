import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Redeem Kode', href: '/affiliate/redeem' },
];

interface Props {
    availableCodes: Array<{ id: number; code: string; product_name: string }>;
}

export default function Redeem({ availableCodes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Redeem Kode" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="font-semibold text-lg mb-6 text-lg">Kode Aktivasi Tersedia</h3>
                    {availableCodes?.length > 0 ? (
                        <div className="grid gap-4">
                            {availableCodes.map((code) => (
                                <Card key={code.id}>
                                    <CardContent className="pt-6 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{code.product_name}</p>
                                            <p className="text-sm text-gray-600 font-mono">{code.code}</p>
                                        </div>
                                        <Button onClick={() => router.post('/affiliate/redeem', { code_id: code.id })}>
                                            Redeem
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">No codes available for redemption</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
