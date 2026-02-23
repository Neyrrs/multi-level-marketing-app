import ProductCard from '@/components/fragments/shop-dashboard-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Shop',
        href: '/affiliate/shop',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product_name: string;
    product_price: number;
}

interface Props {
    products: {
        data: Product[];
        total: number;
    };
    cart: {
        items: CartItem[];
        total_items: number;
        total_price: number;
    } | null;
}

export default function Shop({ products, cart }: Props) {
    const cartTotal = cart?.total_price ?? 0;
    const cartItems = cart?.items ?? [];

    const handleAddToCart = (product: Product) => {
        console.log('Tambah ke cart:', product);
        // TODO: Implement add to cart functionality
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shop" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Cart Summary */}
                {cart && (
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Keranjang Saya
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Item:</span>
                                    <span className="font-semibold">{cartItems.length}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span>Total:</span>
                                    <span className="font-bold">Rp {cartTotal.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Products Grid */}
                <div className="rounded-xl border bg-white p-6">
                    <h3 className="font-bold text-lg mb-6">Produk Tersedia</h3>

                    {products && products.data && products.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.data.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    image={item.image || 'https://images.unsplash.com/photo-1762692496722-de2a899e3af5'}
                                    title={item.name}
                                    price={`Rp${item.price.toLocaleString('id-ID')}`}
                                    point={`${(item.price / 1000).toFixed(0)} point`}
                                    pin="1 PIN"
                                    productInfo={[
                                        `Kategori: ${item.category}`,
                                        `Harga: Rp${item.price.toLocaleString('id-ID')}`,
                                    ]}
                                    onAddToCart={() => handleAddToCart(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Tidak ada produk tersedia
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
