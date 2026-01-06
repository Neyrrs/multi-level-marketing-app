import ContainerWrapper from '@/components/fragments/container-wrapper';
import MainLayout from '@/components/fragments/main-layout';
import { ProductCard } from '@/components/ui/display-all-product-card';

const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: 'Ini adalah produk demo',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec blandit velit.',
    price: 100000,
    image: 'https://via.placeholder.com/400x300',
}));

const Product = () => {
    return (
        <MainLayout>
            <div className="py-12">
                <ContainerWrapper>
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Produk Lengkap
                            </h1>
                            <p className="text-sm text-gray-500">
                                Produk dengan filter:{' '}
                                <span className="font-medium text-primary">
                                    Paket 1
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {dummyProducts.map((item) => (
                            <ProductCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                </ContainerWrapper>
            </div>
        </MainLayout>
    );
};

export default Product;