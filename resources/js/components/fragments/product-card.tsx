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
        <div className="flex h-fit shrink-0 flex-col gap-0 rounded-xl bg-slate-300 shadow-md md:w-75">
            <div className="h-60 w-full">
                <img
                    src="#"
                    alt="ini gambar product"
                    className="h-full w-full rounded-xl"
                />
            </div>
            <div className="flex h-fit min-h-50 w-full flex-col justify-between rounded-xl bg-white px-4 py-6 gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold">Lorem, ipsum dolor.</h1>
                    <p className="line-clamp-3 min-h-15 text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Ex, cumque! Lorem
                    </p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col items-start justify-center">
                        <p className="font-semibold">Harga</p>
                        <p className="text-lg font-extrabold text-primary">
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
            <h1 className='text-4xl font-semibold font-poppins'>Produk Kami</h1>
            <div className="flex max-w-full items-center justify-between gap-2">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    );
};
