import ProductCard from '@/components/fragments/shop-dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

export default function CostumerDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CostumerDashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <h1 className="text-xl font-semibold text-primary">
                    Produk Tersedia
                </h1>
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
        </AppLayout>
    );
}
