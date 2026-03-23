import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import { getCart, saveCart, type CartStorageItem } from '@/components/fragments/product-card';
import { Button } from '@/components/ui/button';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// ─── Types and Globals ────────────────────────────────────────────────────

type InertiaPageProps = {
    auth: {
        user: any;
    };
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
        success?: string | null;
        error?: string | null;
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

// ─── Helpers ──────────────────────────────────────────────────────────────

const formatRupiah = (value: number = 0) =>
    `Rp${value.toLocaleString('id-ID')}`;

// ─── Success Screen ───────────────────────────────────────────────────────

// ─── Main Cart Page ───────────────────────────────────────────────────────

const Cart = () => {
    const { auth, midtransConfig, flash } = usePage<InertiaPageProps>().props;
    const authUserId = auth.user?.id ? Number(auth.user.id) : null;
    const [items, setItems] = useState<CartStorageItem[]>([]);
    const [isPaying, setIsPaying] = useState(false);
    const handledMidtransOrderRef = useRef<string | null>(null);

    // Load cart from localStorage on mount
    useEffect(() => {
        setItems(getCart(authUserId));

        const onCartUpdated = () => setItems(getCart(authUserId));
        window.addEventListener('cart-updated', onCartUpdated);
        return () => window.removeEventListener('cart-updated', onCartUpdated);
    }, [authUserId]);

    // Load Midtrans Script
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
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [midtransConfig?.clientKey, midtransConfig?.isProduction]);

    const updateQty = (id: number, delta: number) => {
        const updated = items.map((item) => {
            if (item.id !== id) return item;
            const newQty = Math.max(1, Math.min(item.qty + delta, item.stock));
            return { ...item, qty: newQty };
        });
        setItems(updated);
        saveCart(updated, authUserId);
    };

    const removeItem = (id: number) => {
        const updated = items.filter((item) => item.id !== id);
        setItems(updated);
        saveCart(updated, authUserId);
    };

    const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);

    const clearCart = () => {
        saveCart([], authUserId);
        setItems([]);
    };

    const openMidtransPopup = (snapToken?: string | null, redirectUrl?: string | null) => {
        if (snapToken && window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: () => router.reload(),
                onPending: () => router.reload(),
                onError: () => router.reload(),
                onClose: () => router.reload(),
            });
            return;
        }

        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };

    useEffect(() => {
        const midtrans = flash?.midtrans;
        if (!midtrans) return;

        const orderNumber = midtrans.order_number ?? null;
        if (orderNumber && handledMidtransOrderRef.current === orderNumber) {
            return;
        }

        if (orderNumber) {
            handledMidtransOrderRef.current = orderNumber;
        }

        // Fallback-safe: if Snap JS is not ready yet, redirect URL still works.
        openMidtransPopup(midtrans.snap_token, midtrans.redirect_url);
    }, [flash?.midtrans]);

    const handleCheckout = () => {
        if (items.length === 0 || isPaying) return;

        if (!auth.user) {
            router.get('/login');
            return;
        }

        if (!auth.user.phone || auth.user.phone === '-' || !auth.user.alamat || auth.user.alamat === '-') {
            toast.error('Gagal Checkout', {
                description: 'Mohon lengkapi Alamat dan Nomor Telepon di Profil Anda sebelum checkout.',
            });
            router.get('/edit-profile');
            return;
        }

        setIsPaying(true);
        router.post(
            '/cart/checkout',
            {
                items: items.map((item) => ({
                    id: item.id,
                    qty: item.qty,
                })),
                notes: 'Pesanan dari keranjang',
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const pageProps = page.props as unknown as InertiaPageProps;
                    const snapToken = pageProps.flash?.midtrans?.snap_token;
                    const redirectUrl = pageProps.flash?.midtrans?.redirect_url;
                    const orderNumber = pageProps.flash?.midtrans?.order_number ?? null;
                    
                    if (snapToken || redirectUrl) {
                        if (orderNumber) {
                            handledMidtransOrderRef.current = orderNumber;
                        }
                        clearCart();
                        openMidtransPopup(snapToken, redirectUrl);
                    } else {
                        if (!pageProps.errors || Object.keys(pageProps.errors).length === 0) {
                            clearCart();
                            toast.success('Order berhasil dibuat. Lanjutkan pembayaran di riwayat transaksi.');
                        }
                    }
                },
                onFinish: () => setIsPaying(false),
            }
        );
    };

    // ── Summary panel (shared between desktop & mobile) ───────────────
    const SummaryPanel = () => (
        <div className="flex flex-col gap-3 text-sm">
            <p className="text-base font-bold mb-1">Ringkasan Belanja</p>
            <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({items.length} produk)</span>
                <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Ongkos Kirim</span>
                <span className="text-green-500 font-medium">Gratis</span>
            </div>
            <div className="mt-3 flex justify-between border-t pt-3 font-bold text-base">
                <span>Total</span>
                <span className="text-primary">{formatRupiah(subtotal)}</span>
            </div>

            {flash?.error && (
                <div className="mt-2 p-3 text-red-600 bg-red-50 rounded-lg text-xs font-medium">
                    {flash.error}
                </div>
            )}

            <Button
                className="mt-4 w-full"
                size="lg"
                disabled={items.length === 0 || isPaying}
                onClick={handleCheckout}
            >
                {isPaying ? 'Memproses...' : (auth.user ? 'Pesan Sekarang' : 'Login untuk Pesan')}
            </Button>
        </div>
    );

    return (
        <MainLayout>
            <Head title="Keranjang" />

            <div className="py-10 relative">
                <ContainerWrapper>
                    {/* Title */}
                    <div className="mb-6 flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-primary">Keranjangku</h1>
                        <div className="flex-1 border-t border-black" />
                        {items.length > 0 && (
                            <span className="text-sm text-gray-500">
                                {items.length} produk
                            </span>
                        )}
                    </div>

                    {/* Empty state */}
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center gap-5 py-20 text-center">
                            <ShoppingBag className="w-20 h-20 text-gray-200" />
                            <p className="text-lg font-semibold text-gray-400">Keranjang kamu masih kosong</p>
                            <p className="text-sm text-gray-400">Yuk, tambahkan produk dari halaman utama!</p>
                            <Link href="/product">
                                <Button size="lg">Lihat Produk</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-white p-6 shadow-lg">
                            <div className="flex flex-col gap-8 lg:flex-row">

                                {/* Items list */}
                                <div className="flex flex-1 flex-col gap-6 pr-0 lg:pr-8">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-start gap-4 border-b pb-6 last:border-b-0"
                                        >
                                            {/* Thumbnail */}
                                            <div className="h-20 w-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                                                        <ShoppingBag className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-1 flex-col gap-1 min-w-0">
                                                <p className="font-semibold truncate">{item.name}</p>
                                                <p className="line-clamp-2 text-xs text-gray-400">
                                                    {item.description}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="mt-1 flex items-center gap-1 text-xs text-red-500 hover:text-red-400 transition w-fit"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Hapus
                                                </button>
                                            </div>

                                            {/* Price + Qty */}
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <p className="font-semibold text-sm">
                                                    {formatRupiah(item.price)}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQty(item.id, -1)}
                                                        disabled={item.qty <= 1}
                                                        className="h-8 w-8 rounded-md"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm font-medium w-6 text-center">
                                                        {item.qty}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQty(item.id, 1)}
                                                        disabled={item.qty >= item.stock}
                                                        className="h-8 w-8 rounded-md"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-gray-400">
                                                    Subtotal: {formatRupiah(item.price * item.qty)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop summary sidebar */}
                                <div className="hidden w-px bg-gray-200 lg:block" />
                                <div className="hidden w-full lg:block lg:w-72 shrink-0">
                                    <SummaryPanel />
                                </div>
                            </div>
                        </div>
                    )}
                </ContainerWrapper>

                {/* Mobile sticky summary bar */}
                {items.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 lg:hidden z-40">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-xs text-gray-500">Total</p>
                                <p className="text-lg font-bold text-primary">{formatRupiah(subtotal)}</p>
                            </div>
                            <Button size="lg" disabled={isPaying} onClick={handleCheckout}>
                                {isPaying ? 'Memproses...' : (auth.user ? 'Pesan Sekarang' : 'Login')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Cart;
