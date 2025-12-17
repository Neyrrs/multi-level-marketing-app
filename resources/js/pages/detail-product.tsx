import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const DetailProduct = () => {
    const [quantity, setQuantity] = useState<number>(1);

    const images = [
        '/images/shoe-1.png',
        '/images/shoe-2.png',
        '/images/shoe-3.png',
        '/images/shoe-4.png',
        '/images/shoe-5.png',
    ];

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {};

    return (
        <MainLayout>
            <ContainerWrapper>
                <div className="my-15 flex h-fit w-full justify-between gap-6">
                    <ImageSelectorDashboard images={images} />
                    <div className="flex flex-col gap-8">
                        <div className="h-ffull flex w-full flex-col gap-2">
                            <h1 className="font-poppins text-4xl font-bold">
                                Ini adalah produk sebuah demo lestari
                            </h1>
                            <p className="text-xl font-extrabold text-primary">
                                Rp{(100000).toLocaleString()}
                            </p>
                            <p className="text-sm font-medium">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Id beatae similique commodi,
                                tenetur maiores sed qui? Eum aspernatur officia
                                corpori.
                            </p>
                        </div>
                        <div className="h-full w-full gap-6 overflow-scroll rounded-md border-2 border-border bg-white p-6 text-xs">
                            <p className="text-base font-bold">Detail Paket</p>
                            <p className="max-w-prose">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Harum iusto quidem ut est
                                aspernatur mollitia quasi placeat eius,
                                reiciendis eos? Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit. Sed in amet
                                suscipit illum veritatis accusantium, eum ipsa.
                                Porro culpa possimus aperiam reprehenderit ea
                                rerum a voluptatibus, corrupti, eveniet, nobis
                                libero? Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Distinctio, voluptatum soluta,
                                enim suscipit sit a minus aliquam ducimus nobis
                                ipsum commodi porro dolores at cum atque facere.
                                Molestiae, pariatur sint.
                            </p>
                        </div>
                        <div className="flex">
                            <div className="flex w-40 items-center gap-3">
                                <Button
                                    size={'icon'}
                                    onClick={handleDecreaseQuantity}
                                >
                                    <Minus />
                                </Button>
                                <p className="font-bold text-primary">
                                    {quantity}
                                </p>
                                <Button
                                    size={'icon'}
                                    onClick={handleIncreaseQuantity}
                                    className="rounded-sm"
                                >
                                    <Plus />
                                </Button>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                className="w-full rounded-sm"
                            >
                                Keranjang <ShoppingCart />
                            </Button>
                        </div>
                    </div>
                </div>
            </ContainerWrapper>
        </MainLayout>
    );
};

export default DetailProduct;

const ImageSelectorDashboard = ({images}: {images: string[]}) => {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="flex min-h-100 w-full gap-6">
            <div className="flex flex-col gap-3">
                {images.map((img) => (
                    <button
                        key={img}
                        onClick={() => setActiveImage(img)}
                        className={`h-20 w-20 rounded-lg border transition ${
                            activeImage === img
                                ? 'border-blue-500 ring-2 ring-blue-300'
                                : 'border-gray-300 hover:border-gray-400'
                        } `}
                    >
                        <img
                            src={img}
                            alt="Thumbnail"
                            className="h-full w-full object-contain"
                        />
                    </button>
                ))}
            </div>

            <div className="flex flex-1 items-center justify-center rounded-xl border p-6">
                <img
                    src={activeImage}
                    alt="Preview"
                    className="max-h-87.5 object-contain"
                />
            </div>
        </div>
    );
};
