import { Button } from '@/components/ui/button';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type ProductCardProps = {
    image: string;
    title: string;
    price: string;
    point?: string;
    pin?: string;
    productInfo: string[];
    onAddToCart?: (qty: number) => void;
};

export default function ProductCard({
    image,
    title,
    price,
    point,
    pin,
    productInfo,
    onAddToCart,
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="group relative flex overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative w-40 flex-shrink-0">
                <div className="relative h-full overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover"
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

                    <div className="flex items-center gap-2">
                        <button
                            className="rounded-lg border p-1"
                            onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                            }
                        >
                            <Minus size={14} />
                        </button>

                        <span className="w-6 text-center text-sm font-semibold">
                            {quantity}
                        </span>

                        <button
                            className="rounded-lg border p-1"
                            onClick={() => setQuantity((q) => q + 1)}
                        >
                            <Plus size={14} />
                        </button>
                        <Button
                            size="sm"
                            className="gap-2 rounded-xl"
                            onClick={() => onAddToCart?.(quantity)}
                        >
                            <ShoppingCart size={16} />
                            <span className="hidden sm:inline">
                                Tambah ke Keranjang
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
