import { Button } from '@/components/ui/button';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

type ProductCardProps = {
    image: string;
    title: string;
    price: string;
    stock?: number;
    point?: string;
    pin?: string;
    productInfo: string[];
    onAddToCart?: (qty: number) => void;
};

export default function ProductCard({
    image,
    title,
    price,
    stock = 0,
    point,
    pin,
    productInfo,
    onAddToCart,
}: ProductCardProps) {
    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
    const [quantity, setQuantity] = useState(1);
    const [imgSrc, setImgSrc] = useState(image || fallbackImage);
    const isOutOfStock = stock <= 0;
    const maxReached = quantity >= stock && stock > 0;

    useEffect(() => {
        setImgSrc(image || fallbackImage);
    }, [image]);

    return (
        <div className="group relative flex h-full w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative w-40 shrink-0">
                <div className="relative h-full overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={() => setImgSrc(fallbackImage)}
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-white shadow">
                        Paket
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold">{title}</h3>

                <ul className="mt-2 space-y-1 text-xs text-neutral-600">
                    {productInfo.map((info, index) => (
                        <li key={index} className="flex gap-2">
                            <Check
                                size={14}
                                className="mt-[2px] text-primary"
                            />
                            <span>{info}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-2">
                    {point && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {point}
                        </span>
                    )}
                    {pin && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {pin}
                        </span>
                    )}
                </div>

                <div className="mt-auto space-y-3 pt-4">
                    <div>
                        <p className="text-[10px] text-neutral-500">Harga</p>
                        <p className="text-base font-bold text-primary">
                            {price}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                className="rounded-lg border p-1"
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                disabled={isOutOfStock}
                            >
                                <Minus size={14} />
                            </button>

                            <span className="w-6 text-center text-sm font-semibold">
                                {quantity}
                            </span>

                            <button
                                className="rounded-lg border p-1"
                                onClick={() =>
                                    setQuantity((q) =>
                                        stock > 0 ? Math.min(stock, q + 1) : q,
                                    )
                                }
                                disabled={isOutOfStock || maxReached}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <Button
                            size="sm"
                            className="ml-auto w-full gap-2 rounded-xl sm:w-auto"
                            onClick={() => onAddToCart?.(quantity)}
                            disabled={isOutOfStock}
                        >
                            <ShoppingCart size={16} />
                            <span>
                                {isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
