import SearchInput from '@/components/fragments/search-input';
import ProductCard from '@/components/fragments/shop-dashboard-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    stock: number;
    image?: string | null;
    category?: string;
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
    filters?: {
        search?: string;
    };
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product_name: string;
    product_price: number;
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

export default function Shop({ products, cart, has_pending_order = false, filters }: Props) {
    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
    const { midtransConfig } = usePage<InertiaPageProps>().props;
    const [search, setSearch] = useState<string>(filters?.search ?? '');
    const [isPaying, setIsPaying] = useState(false);
    const cartItems = cart?.items ?? [];
    const cartTotal = cart?.total_price ?? 0;
    const canCheckout = cartItems.length > 0;
    const canCancel = canCheckout || has_pending_order;
    const getInCartQty = (productId: number) =>
        cartItems
            .filter((item) => item.product_id === productId)
            .reduce((sum, item) => sum + item.quantity, 0);
    const getRemainingStock = (product: Product) =>
        Math.max(0, product.stock - getInCartQty(product.id));

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/shop', { search: value }, { preserveState: true, replace: true });
    };

    const handleAddToCart = (product: Product, qty: number) => {
        router.post('/shop', { product_id: product.id, quantity: qty }, { preserveScroll: true });
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
            '/shop/checkout',
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
            <Head title="Belanja" />
            <div className="flex h-fit w-full flex-col px-5">
                <div className="flex min-h-screen w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 md:px-5">
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
                                        <Button size="sm" disabled={!canCheckout || isPaying} onClick={handleCheckout}>
                                            {isPaying ? 'Memproses...' : 'Bayar'}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={!canCancel}
                                            onClick={() => router.post('/shop/cancel', {}, { preserveScroll: true })}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

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
                            products.data.map((item) => {
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
                                            `Kategori: ${item.category ?? 'single'}`,
                                            `Stok tersisa: ${remainingStock}`,
                                            item.description || 'Tidak ada deskripsi',
                                        ]}
                                        onAddToCart={(qty) => handleAddToCart(item, qty)}
                                    />
                                );
                            })
                        ) : (
                            <div className="py-8 text-gray-500">Tidak ada produk tersedia</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
