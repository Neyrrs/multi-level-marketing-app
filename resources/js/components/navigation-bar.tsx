import { cart, home, login, mitra, product, profile } from '@/routes';
import type { RouteDefinition } from '@/wayfinder';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, LogOut, ShoppingCart, User2 } from 'lucide-react';
import { useState } from 'react';
import ContainerWrapper from './fragments/container-wrapper';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

type UserRole = 'user' | 'admin';

interface LinkTypes {
    path: RouteDefinition<'get'>;
    name: string;
}

interface NavigationItem {
    name: string;
    link: RouteDefinition<'get'>;
    icon: React.ReactNode;
    roles?: UserRole[];
}

const NavigationBar = () => {
    const isLoggedIn = true;
    const userRole: UserRole = 'admin';
    const [showPopup, setShowPopup] = useState<boolean>(false);
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
        <nav className="fixed z-20 h-15 w-full bg-card">
            <ContainerWrapper>
                <div className="flex h-full w-full items-center justify-between">
                    <Link
                        href={home()}
                        className="flex h-full w-20 items-center text-2xl font-bold"
                    >
                        Helo
                    </Link>
                    <div className="flex h-full w-fit items-center gap-5 font-poppins">
                        {links.map((item, i) => (
                            <Link
                                key={i}
                                href={item.path}
                                className="opacity-100 hover:opacity-80"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {isLoggedIn ? (
                        <div className="flex gap-4">
                            <Button
                                className="relative bg-transparent font-bold text-primary shadow-none hover:bg-transparent"
                                asChild
                            >
                                <Link href={cart()}>
                                    <ShoppingCart className="size-6" />
                                    <Badge className="absolute -top-1 -right-2 flex h-fit w-fit items-center justify-center bg-red-500 text-[10px]">
                                        10
                                    </Badge>
                                </Link>
                            </Button>
                            <div className="flex items-center gap-2">
                                <p className="font-poppins font-semibold text-primary">
                                    John Doe
                                </p>
                                <div
                                    className="relative h-10 w-10"
                                    onClick={() => setShowPopup(!showPopup)}
                                >
                                    <img
                                        src="#"
                                        alt="Ini adalah profil"
                                        className="aspect-square h-full w-full rounded-full border-2 border-primary object-fill"
                                    />
                                    {showPopup && (
                                        <NavbarPopup userRole={userRole} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full w-fit items-center">
                            <Button
                                className="h-8 rounded-sm px-8 text-xs font-bold"
                                asChild
                            >
                                <Link href={login()}>Login</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </ContainerWrapper>
        </nav>
    );
};

const NavbarPopup = ({ userRole }: { userRole: UserRole }) => {
    const navigations: NavigationItem[] = [
        {
            name: 'Profil',
            link: profile(),
            icon: <User2 className="h-5 w-5" />,
            roles: ['user', 'admin'],
        },
        {
            name: 'Dasbor',
            link: home(),
            icon: <LayoutDashboard className="h-5 w-5" />,
            roles: ['admin'],
        },
        {
            name: 'Keluar',
            link: login(),
            icon: <LogOut className="h-5 w-5" />,
            roles: ['user', 'admin'],
        },
    ];

    return (
        <div className="absolute top-full mt-4 flex w-45 -translate-x-35 flex-col gap-2 rounded-xl border-3 border-border bg-white px-2 py-5 shadow-md">
            {navigations
                .filter((item) => !item.roles || item.roles.includes(userRole))
                .map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.link}
                        className="group flex items-center justify-between rounded-md px-3 py-2 text-foreground transition-all duration-200 hover:bg-muted hover:text-primary"
                    >
                        <div className="flex w-full items-center justify-between">
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default NavigationBar;
