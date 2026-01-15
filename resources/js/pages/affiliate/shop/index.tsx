import SearchInput from '@/components/fragments/search-input';
import ProductCard from '@/components/fragments/shop-dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Jawa',
        href: dashboard().url,
    },
];

const products = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5',
        title: 'Nara Bio Energy Card PROMO',
        price: 'Rp300.000',
        point: '300 point',
        pin: '1 PIN',
        productInfo: [
            '10 pcs Scalar Bio Energy Card',
            'Bonus energi aktif',
            'Masa aktif 30 hari',
        ],
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5',
        title: 'Nara Bio Energy Card REGULER',
        price: 'Rp350.000',
        point: '350 point',
        pin: '1 PIN',
        productInfo: [
            '10 pcs Scalar Bio Energy Card',
            'Energi stabil',
            'Masa aktif 45 hari',
        ],
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5',
        title: 'Nara Bio Energy Card PREMIUM',
        price: 'Rp500.000',
        point: '500 point',
        pin: '2 PIN',
        productInfo: [
            '20 pcs Scalar Bio Energy Card',
            'Energi premium',
            'Masa aktif 60 hari',
        ],
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5',
        title: 'Nara Bio Energy Card KEREN',
        price: 'Rp300.000',
        point: '300 point',
        pin: '1 PIN',
        productInfo: [
            '10 pcs Scalar Bio Energy Card',
            'Bonus energi aktif',
            'Masa aktif 30 hari',
        ],
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5',
        title: 'Nara Bio Energy Card BIG',
        price: 'Rp350.000',
        point: '350 point',
        pin: '1 PIN',
        productInfo: [
            '10 pcs Scalar Bio Energy Card',
            'Energi stabil',
            'Masa aktif 45 hari',
        ],
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5',
        title: 'Nara Bio Energy Card SMALL',
        price: 'Rp500.000',
        point: '500 point',
        pin: '2 PIN',
        productInfo: [
            '20 pcs Scalar Bio Energy Card',
            'Energi premium',
            'Masa aktif 60 hari',
        ],
    },
];

export default function Shop() {
    const [search, setSearch] = useState<string>('');

    const [perPage, setPerPage] = useState('10');

    const handlePerPageChange = (value: string) => {
        setPerPage(value);

        router.get(
            route('users.index'),
            { perPage: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSearch = (value: string) => {
        router.get(
            route('users.index'),
            { search: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CostumerDashboard" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
                    <div className="flex w-full items-start border-b-2 pb-4">
                        <div className="w-3/4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-primary md:text-2xl">
                                    Produk Tersedia
                                </p>
                                <span className="text-sm">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </span>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <SearchInput
                                onSearchChange={handleSearch}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {products.map((item) => (
                            <ProductCard
                                key={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                point={item.point}
                                pin={item.pin}
                                productInfo={item.productInfo}
                                onAddToCart={() => console.log('Tambah:', item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
