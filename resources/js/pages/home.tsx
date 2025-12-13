import CheckoutSteps from '@/components/fragments/checkout-steps';
import ContainerWrapper from '@/components/fragments/container-wrapper';
import HomeAboutUs from '@/components/fragments/home-about-us';
import MainLayout from '@/components/fragments/main-layout';
import { ContainerProductCard } from '@/components/fragments/product-card';
import TopReviews from '@/components/fragments/top-reviews';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';

export default function Home({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const { updateAppearance, appearance } = useAppearance();

    return (
        <MainLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            {appearance == 'dark' ? (
                <Button onClick={() => updateAppearance('light')}>
                    <Sun />
                </Button>
            ) : (
                <Button onClick={() => updateAppearance('dark')}>
                    <Moon />
                </Button>
            )}
            <div className="flex flex-col gap-10">
                <ContainerWrapper>
                    <div className="flex flex-col gap-6">
                        <div className="h-160 w-full">
                            <img
                                src=""
                                alt="ini-foto"
                                className="h-full w-full rounded-2xl border"
                            />
                        </div>
                        <ContainerProductCard />
                    </div>
                </ContainerWrapper>
                <CheckoutSteps />
                <HomeAboutUs/>
                <TopReviews />
            </div>
        </MainLayout>
    );
}
