import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface ProductProps {
    image?: string;
    title?: string;
    description?: string;
    price?: number;
    id_product?: string;
}

export const ProductCard: React.FC<ProductProps> = () => {
    return (
        <div className="flex h-fit flex-col gap-0 rounded-xl bg-slate-300 shadow-md w-65 md:w-75 shrink-0">
            <div className="h-45 md:h-60 w-full">
                <img
                    src="#"
                    alt="ini gambar product"
                    className="h-full w-full rounded-xl"
                />
            </div>
            <div className="flex h-fit min-h-50 w-full flex-col justify-between gap-4 md:gap-8 rounded-xl bg-white px-4 py-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-base md:text-lg font-bold">Lorem, ipsum dolor.</h1>
                    <p className="line-clamp-3 min-h-15 text-xs md:text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Ex, cumque! Lorem
                    </p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="md:text-base text-sm flex flex-col items-start justify-center">
                        <p className="font-semibold">Harga</p>
                        <p className="text-base md:text-lg font-extrabold text-primary">
                            Rp100.000
                        </p>
                    </div>
                    <div className="w-fit">
                        <Button size={'lg'}>
                            Keranjang <ShoppingCart />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ContainerProductCard = () => {
    return (
        <>
            <h1 className="font-poppins text-2xl md:text-4xl font-semibold">Produk Kami</h1>
            <div className="flex max-w-full items-center overflow-scroll justify-between gap-5">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    );
};
