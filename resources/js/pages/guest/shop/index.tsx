import SearchInput from '@/components/fragments/search-input';
import ProductCard from '@/components/fragments/shop-dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image?: string | null;
    category?: string;
}

interface Props {
    products: {
        data: Product[];
        total: number;
    };
    filters?: {
        search?: string;
    };
}

export default function Shop({ products, filters }: Props) {
    const [search, setSearch] = useState<string>(filters?.search ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/shop', { search: value }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Belanja" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div className="flex w-full items-start border-b-2 pb-4">
                        <div className="w-3/4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-primary md:text-2xl">Produk Tersedia</p>
                                <span className="text-sm">Produk aktif dari database</span>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <SearchInput onSearchChange={handleSearch} value={search} />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {products?.data?.length > 0 ? (
                            products.data.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    image={item.image || 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5'}
                                    title={item.name}
                                    price={`Rp${item.price.toLocaleString('id-ID')}`}
                                    point={`${(item.price / 1000).toFixed(0)} point`}
                                    pin="1 PIN"
                                    productInfo={[
                                        `Kategori: ${item.category ?? 'single'}`,
                                        item.description || 'Tidak ada deskripsi',
                                    ]}
                                    onAddToCart={() => {}}
                                />
                            ))
                        ) : (
                            <div className="py-8 text-gray-500">Tidak ada produk tersedia</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
