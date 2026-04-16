import { ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { SharedData } from '@/types';

// ─── Types ───────────────────────────────────────────────────────────────

export interface ProductItem {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    harga_awal?: number;
    diskon?: number;
    harga_akhir: number;
    stock?: number;
    type?: string;
    image?: string | null;
}

export interface CartStorageItem {
    id: number;
    name: string;
    description: string;
    price: number;
    qty: number;
    image: string;
    stock: number;
    type?: string;
    slug?: string;
}

// ─── LocalStorage helpers ─────────────────────────────────────────────────

const CART_KEY_PREFIX = 'alus_cart';

function getCartKey(userId?: number | null): string {
    if (userId && userId > 0) {
        return `${CART_KEY_PREFIX}_user_${userId}`;
    }

    return `${CART_KEY_PREFIX}_guest`;
}

export function getCart(userId?: number | null): CartStorageItem[] {
    try {
        return JSON.parse(localStorage.getItem(getCartKey(userId)) ?? '[]');
    } catch {
        return [];
    }
}

export function saveCart(items: CartStorageItem[], userId?: number | null): void {
    localStorage.setItem(getCartKey(userId), JSON.stringify(items));
    // Dispatch a custom event so cart icon and cart page can react.
    window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(product: ProductItem, qty = 1, userId?: number | null): void {
    const cart = getCart(userId);
    const existing = cart.find((i) => i.id === product.id);
    const productType = String(product.type ?? 'single').toLowerCase();
    const isBundle = productType === 'bundle' || productType === 'package';
    if (existing) {
        existing.qty = Math.min(existing.qty + qty, product.stock ?? 99);
        existing.type = existing.type ?? productType;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            price: product.harga_akhir,
            qty,
            image: product.image ?? '',
            stock: product.stock ?? 99,
            type: productType,
            slug: product.slug,
        });
    }

    // Guest only: allow max 1 bundle item in cart at a time (frontend guard).
    if (!userId && isBundle) {
        const totalBundleQty = cart.reduce((sum, item) => {
            const type = String(item.type ?? '').toLowerCase();
            return sum + ((type === 'bundle' || type === 'package') ? (item.qty ?? 0) : 0);
        }, 0);

        if (totalBundleQty > 1) {
            throw new Error('Guest hanya bisa menambahkan 1 produk bundle ke keranjang.');
        }
    }

    saveCart(cart, userId);
}

// ─── ProductCard ──────────────────────────────────────────────────────────

interface ProductCardProps {
    product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { auth } = usePage<SharedData>().props;
    const [added, setAdded] = useState(false);
    const [imgSrc, setImgSrc] = useState(product.image ?? '');

    useEffect(() => {
        setImgSrc(product.image ?? '');
    }, [product.image]);

    const handleAddToCart = () => {
        if (Number(product.stock ?? 0) <= 0) {
            toast.error('Stok produk habis', {
                description: 'Produk ini sedang tidak tersedia untuk ditambahkan ke keranjang.',
            });
            return;
        }

        if (!auth.user) {
            toast.error('Harus login dulu', {
                description: 'Silakan login dulu sebelum menambahkan produk ke keranjang.',
            });
            return;
        }

        try {
            const productType = String(product.type ?? 'single').toLowerCase();
            const isBundle = productType === 'bundle' || productType === 'package';
            const currentCart = getCart(auth.user.id);
            const currentBundleQty = currentCart.reduce((sum, item) => {
                const type = String(item.type ?? '').toLowerCase();
                return sum + ((type === 'bundle' || type === 'package') ? (item.qty ?? 0) : 0);
            }, 0);

            const roleNames = Array.isArray(auth.user.roles)
                ? auth.user.roles.map((r: any) => String(r?.name ?? '').toLowerCase())
                : [];
            const isGuestRole = roleNames.includes('guest');

            if (isGuestRole && isBundle && currentBundleQty >= 1) {
                toast.error('Batas produk bundle', {
                    description: 'Guest hanya bisa menambahkan 1 produk bundle ke keranjang.',
                });
                return;
            }

            addToCart(product, 1, auth.user.id);
        } catch (error) {
            toast.error('Tidak bisa menambah produk', {
                description: error instanceof Error ? error.message : 'Terjadi kesalahan saat menambahkan produk.',
            });
            return;
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const formatRupiah = (value: number) =>
        `Rp${value.toLocaleString('id-ID')}`;

    const hargaAwal = Number(product.harga_awal ?? 0);
    const hargaAkhir = Number(product.harga_akhir ?? 0);
    const diskon = Number(product.diskon ?? 0);
    const hasDiscount = diskon > 0 && hargaAwal > 0 && hargaAwal > hargaAkhir;
    const productType = String(product.type ?? 'single').toLowerCase();
    const isBundle = productType === 'bundle' || productType === 'package';
    const categoryLabel = isBundle ? 'Bundle' : 'Single';

    return (
        <div className="flex h-fit flex-col gap-0 rounded-xl bg-slate-200 shadow-md w-65 md:w-75 shrink-0 overflow-hidden">
            <div className="h-45 md:h-60 w-full bg-slate-300">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={() => setImgSrc('')}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                        <ShoppingCart className="w-12 h-12 opacity-30" />
                    </div>
                )}
            </div>

            <div className="flex h-fit min-h-50 w-full flex-col justify-between gap-4 md:gap-8 rounded-xl bg-white px-4 py-6">
                <div className="flex flex-col gap-2">
                    <div className="flex">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                isBundle
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-emerald-100 text-emerald-700'
                            }`}
                        >
                            {categoryLabel}
                        </span>
                    </div>
                    <h2 className="text-base md:text-lg font-bold line-clamp-2">
                        {product.name}
                    </h2>
                    <p className="line-clamp-3 min-h-12 text-xs md:text-sm text-gray-500">
                        {product.description || 'Tidak ada deskripsi.'}
                    </p>
                    <p
                        className={`text-xs font-medium ${
                            (product.stock ?? 0) > 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}
                    >
                        {(product.stock ?? 0) > 0
                            ? `Sisa stok: ${product.stock}`
                            : 'Stok kosong!'}
                    </p>
                </div>

                <div className="flex w-full items-center justify-between">
                    <div className="md:text-base text-sm flex flex-col items-start justify-center">
                        <p className="font-semibold text-xs text-gray-400">Harga</p>
                        {hasDiscount && (
                            <p className="text-xs line-through text-gray-400">
                                {formatRupiah(hargaAwal)}
                            </p>
                        )}
                        <p className="text-base md:text-lg font-extrabold text-primary">
                            {formatRupiah(hargaAkhir)}
                        </p>
                    </div>
                    <div className="w-fit">
                        <Button
                            size={'lg'}
                            onClick={handleAddToCart}
                            disabled={added || Number(product.stock ?? 0) <= 0}
                            variant={added ? 'outline' : 'default'}
                            className="transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {added ? 'Ditambahkan ✓' : (
                                <>Keranjang <ShoppingCart className="ml-1 h-4 w-4" /></>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── ContainerProductCard ─────────────────────────────────────────────────

export const ContainerProductCard: React.FC<{ products?: ProductItem[] }> = ({ products = [] }) => {
    return (
        <>
            <h2 className="font-poppins text-2xl md:text-4xl font-semibold">Produk Kami</h2>
            {products.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">Belum ada produk tersedia.</p>
            ) : (
                <div className="flex max-w-full items-stretch overflow-x-auto justify-start gap-5 pb-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
    );
};
