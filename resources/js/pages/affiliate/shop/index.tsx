import ProductCard from '@/components/fragments/shop-dashboard-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    stock: number;
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
    has_pending_order?: boolean;
}

type InertiaPageProps = {
    midtransConfig?: {
        clientKey?: string;
        isProduction?: boolean;
    };
    flash?: {
        midtrans?: {
            snap_token?: string | null;
            redirect_url?: string | null;
            order_number?: string | null;
        } | null;
    };
};

declare global {
    interface Window {
        snap?: {
            pay: (
                snapToken: string,
                options?: {
                    onSuccess?: (result: unknown) => void;
                    onPending?: (result: unknown) => void;
                    onError?: (result: unknown) => void;
                    onClose?: () => void;
                },
            ) => void;
        };
    }
}

export default function Shop({ products, cart, has_pending_order = false }: Props) {
    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
    const { midtransConfig } = usePage<InertiaPageProps>().props;
    const cartTotal = cart?.total_price ?? 0;
    const cartItems = cart?.items ?? [];
    const canCheckout = cartItems.length > 0;
    const canCancel = canCheckout || has_pending_order;
    const [isPaying, setIsPaying] = useState(false);
    const getInCartQty = (productId: number) =>
        cartItems
            .filter((item) => item.product_id === productId)
            .reduce((sum, item) => sum + item.quantity, 0);
    const getRemainingStock = (product: Product) =>
        Math.max(0, product.stock - getInCartQty(product.id));

    const handleAddToCart = (product: Product, qty: number) => {
        router.post(
            '/affiliate/shop',
            { product_id: product.id, quantity: qty },
            { preserveScroll: true },
        );
    };

    useEffect(() => {
        const clientKey = midtransConfig?.clientKey;
        if (!clientKey || window.snap) {
            return;
        }

        const script = document.createElement('script');
        script.src = midtransConfig?.isProduction
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [midtransConfig?.clientKey, midtransConfig?.isProduction]);

    const openMidtransPopup = (snapToken?: string | null, redirectUrl?: string | null) => {
        if (snapToken && window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: () => router.reload({ only: ['cart', 'products', 'has_pending_order'] }),
                onPending: () => router.reload({ only: ['cart', 'products', 'has_pending_order'] }),
                onError: () => router.reload({ only: ['cart', 'products', 'has_pending_order'] }),
                onClose: () => router.reload({ only: ['cart', 'products', 'has_pending_order'] }),
            });
            return;
        }

        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };

    const handleCheckout = () => {
        if (!canCheckout || isPaying) return;

        setIsPaying(true);
        router.post(
            '/affiliate/shop/checkout',
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = (page.props as InertiaPageProps).flash;
                    openMidtransPopup(
                        flash?.midtrans?.snap_token ?? null,
                        flash?.midtrans?.redirect_url ?? null,
                    );
                },
                onFinish: () => setIsPaying(false),
            },
        );
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
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        disabled={!canCheckout || isPaying}
                                        onClick={handleCheckout}
                                    >
                                        {isPaying ? 'Memproses...' : 'Bayar'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={!canCancel}
                                        onClick={() =>
                                            router.post('/affiliate/shop/cancel', {}, { preserveScroll: true })
                                        }
                                    >
                                        Cancel
                                    </Button>
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
                            {products.data.map((item) => {
                                const remainingStock = getRemainingStock(item);
                                return (
                                <ProductCard
                                    key={item.id}
                                    image={item.image || fallbackImage}
                                    title={item.name}
                                    price={`Rp${item.price.toLocaleString('id-ID')}`}
                                    stock={remainingStock}
                                    point={`${(item.price / 1000).toFixed(0)} point`}
                                    pin="1 PIN"
                                    productInfo={[
                                        `Kategori: ${item.category}`,
                                        `Harga: Rp${item.price.toLocaleString('id-ID')}`,
                                        `Stok tersisa: ${remainingStock}`,
                                    ]}
                                    onAddToCart={(qty) =>
                                        handleAddToCart(item, qty)
                                    }
                                />
                                );
                            })}
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
