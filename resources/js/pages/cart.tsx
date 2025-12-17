import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import { Button } from '@/components/ui/button';

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    qty: number;
    image: string;
}

const cartItems: CartItem[] = [
    {
        id: 1,
        name: 'Produk 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam est dolor, malesuada non mollis sed, sodales eget sapien. Etiam eleifend ultrices lobortis. Etiam vel imperdiet turpis, vitae sollicitudin lorem. Proin eget sapien urna. Donec tincidunt finibus orci, nec vulputate nunc iaculis ut. Aliquam varius commodo magna, in iaculis ligula consectetur in. Sed ornare turpis tellus, non tincidunt lectus condimentum a. Maecenas vel interdum augue.',
        price: 100000,
        qty: 1,
        image: 'https://via.placeholder.com/80',
    },
    {
        id: 2,
        name: 'Produk 2',
        description: 'Pellentesque lobortis id lacus id commodo. Curabitur ac.',
        price: 240000,
        qty: 1,
        image: 'https://via.placeholder.com/80',
    },
    {
        id: 3,
        name: 'Produk 3',
        description: 'Pellentesque lobortis id lacus id commodo.',
        price: 50000,
        qty: 1,
        image: 'https://via.placeholder.com/80',
    },
    {
        id: 4,
        name: 'Produk 4',
        description: 'Curabitur ac consectetur ligula.',
        price: 60000,
        qty: 1,
        image: 'https://via.placeholder.com/80',
    },
];

const formatRupiah = (value: number = 0) =>
    `Rp${value.toLocaleString('id-ID')}`;

const Cart = () => {
    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0,
    );

    return (
        <MainLayout>
            <div className="py-16">
                <ContainerWrapper>
                    <div className="mb-6 flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-primary">
                            Keranjangku
                        </h1>
                        <div className="flex-1 border-t border-black" />
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex flex-col gap-8 lg:flex-row">
                            <div className="flex flex-1 flex-col gap-6 pr-0 lg:pr-8">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start gap-4 border-b pb-6 last:border-b-0"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-20 w-20 rounded-xl object-cover"
                                        />

                                        <div className="flex flex-1 flex-col gap-1">
                                            <p className="font-semibold">
                                                {item.name}
                                            </p>
                                            <p className="line-clamp-2 text-xs text-gray-500">
                                                {item.description}
                                            </p>
                                            <button className="w-fit text-xs text-red-500">
                                                Hapus
                                            </button>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <p className="font-semibold">
                                                {formatRupiah(item.price)}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                                                    -
                                                </button>
                                                <span className="text-sm">
                                                    {item.qty}
                                                </span>
                                                <button className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="hidden w-px bg-black lg:block" />

                            <div className="w-full lg:w-80">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Details
                                </h2>

                                <p className="mb-4 text-sm text-gray-500">
                                    ut nunc. Vivamus nisl mauris, eleifend vel
                                    mauris quis, cursus ultricies diam.
                                </p>

                                <div className="flex flex-col gap-3 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{formatRupiah(subtotal)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Fee</span>
                                        <span>Free</span>
                                    </div>

                                    <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
                                        <span>Total</span>
                                        <span>{formatRupiah(subtotal)}</span>
                                    </div>
                                </div>

                                <Button className="mt-6 w-full">
                                    Pesan Sekarang
                                </Button>
                            </div>
                        </div>
                    </div>
                </ContainerWrapper>
            </div>
        </MainLayout>
    );
};

export default Cart;
