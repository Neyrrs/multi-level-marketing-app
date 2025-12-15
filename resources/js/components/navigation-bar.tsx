import { home, login, mitra, product } from '@/routes';
import type { RouteDefinition } from '@/wayfinder';
import { Link } from '@inertiajs/react';
import ContainerWrapper from './fragments/container-wrapper';
import { Button } from './ui/button';

interface LinkTypes {
    path: RouteDefinition<'get'>;
    name: string;
}

const NavigationBar = () => {
    const links: LinkTypes[] = [
        {
            path: home(),
            name: 'Home',
        },
        {
            path: mitra(),
            name: 'Mitra',
        },
        {
            path: product(),
            name: 'Produk',
        },
    ];
    return (
        <nav className="bg-card fixed h-15 w-full z-20">
            <ContainerWrapper>
                <div className="flex h-full w-full items-center justify-between">
                    <div className="flex h-full w-20 items-center text-2xl font-bold">
                        Helo
                    </div>
                    <div className="flex h-full w-fit items-center gap-5 font-poppins">
                        {links.map((item, i) => (
                            <Link key={i} href={item.path} className="hover:opacity-80 opacity-100">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex h-full w-fit items-center">
                        <Button
                            className="h-8 rounded-sm px-8 text-xs font-bold"
                            asChild
                        >
                            <Link href={login()}>Login</Link>
                        </Button>
                    </div>
                </div>
            </ContainerWrapper>
        </nav>
    );
};

export default NavigationBar;
