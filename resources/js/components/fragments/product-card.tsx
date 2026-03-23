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
    if (existing) {
        existing.qty = Math.min(existing.qty + qty, product.stock ?? 99);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            price: product.harga_akhir,
            qty,
            image: product.image ?? '',
            stock: product.stock ?? 99,
            slug: product.slug,
        });
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
        if (!auth.user) {
            toast.error('Harus login dulu', {
                description: 'Silakan login dulu sebelum menambahkan produk ke keranjang.',
            });
            return;
        }

        addToCart(product, 1, auth.user.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const formatRupiah = (value: number) =>
        `Rp${value.toLocaleString('id-ID')}`;

    const hasDiscount = product.diskon && product.diskon > 0;

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
                    <h2 className="text-base md:text-lg font-bold line-clamp-2">
                        {product.name}
                    </h2>
                    <p className="line-clamp-3 min-h-12 text-xs md:text-sm text-gray-500">
                        {product.description || 'Tidak ada deskripsi.'}
                    </p>
                </div>

                <div className="flex w-full items-center justify-between">
                    <div className="md:text-base text-sm flex flex-col items-start justify-center">
                        <p className="font-semibold text-xs text-gray-400">Harga</p>
                        {hasDiscount && (
                            <p className="text-xs line-through text-gray-400">
                                {formatRupiah(product.harga_awal ?? product.harga_akhir)}
                            </p>
                        )}
                        <p className="text-base md:text-lg font-extrabold text-primary">
                            {formatRupiah(product.harga_akhir)}
                        </p>
                    </div>
                    <div className="w-fit">
                        <Button
                            size={'lg'}
                            onClick={handleAddToCart}
                            disabled={added || (product.stock ?? 0) === 0}
                            variant={added ? 'outline' : 'default'}
                            className="transition-all duration-300"
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
