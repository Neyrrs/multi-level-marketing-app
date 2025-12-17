import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface ProductProps {
    image?: string;
    title?: string;
    description?: string;
    price?: number;
}

const formatRupiah = (value: number = 0) =>
    `Rp${value.toLocaleString('id-ID')}`;

export const ProductCard: React.FC<ProductProps> = ({
    image,
    title,
    description,
    price,
}) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
            <div className="h-56 w-full bg-slate-100">
                <img
                    src={image || 'https://via.placeholder.com/400x300'}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-6 p-5">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">
                        {title || 'Produk Demo'}
                    </h3>
                    <p className="line-clamp-3 text-sm opacity-70">
                        {description ||
                            'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs opacity-60">Harga</p>
                        <p className="text-lg font-bold text-primary">
                            {formatRupiah(price)}
                        </p>
                    </div>

                    <Button size="sm" className="gap-2">
                        Keranjang <ShoppingCart size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
