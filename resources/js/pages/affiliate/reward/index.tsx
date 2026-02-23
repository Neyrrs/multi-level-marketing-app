import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Produk Reward', href: '/affiliate/reward' },
];

interface Props {
    products: Array<{ id: number; name: string; price: number; image: string; category: string }>;
}

export default function Reward({ products }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk Reward" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="font-semibold mb-6">Produk Reward Tersedia</h3>
                    {products?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <Card key={product.id}>
                                    <CardContent className="pt-6">
                                        <img src={product.image || 'https://via.placeholder.com/400x300'} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
                                        <h4 className="font-semibold">{product.name}</h4>
                                        <p className="text-sm text-gray-600">{product.category}</p>
                                        <p className="text-lg font-bold text-primary mt-2">Rp {product.price.toLocaleString('id-ID')}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">No products available</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
