import CheckoutSteps from '@/components/fragments/checkout-steps';
import ContainerWrapper from '@/components/fragments/container-wrapper';
import HomeAboutUs from '@/components/fragments/home-about-us';
import MainLayout from '@/components/fragments/main-layout';
import { ContainerProductCard, type ProductItem } from '@/components/fragments/product-card';
import TopReviews from '@/components/fragments/top-reviews';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface HomeProps {
    canRegister?: boolean;
    products?: ProductItem[];
}

export default function Home({ canRegister = true, products = [] }: HomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <MainLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex flex-col gap-10">
                <ContainerWrapper>
                    <div className="flex flex-col gap-6">
                        <div className="h-80 md:h-160 w-full">
                            <img
                                src=""
                                alt="ini-foto"
                                className="h-full aspect-video w-full rounded-2xl border"
                            />
                        </div>
                        <ContainerProductCard products={products} />
                    </div>
                </ContainerWrapper>
                <CheckoutSteps />
                <HomeAboutUs/>
                <TopReviews />
            </div>
        </MainLayout>
    );
}
