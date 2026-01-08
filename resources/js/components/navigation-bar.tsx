import { cart, dashboard, home, login, mitra, product } from '@/routes';
import { SharedData } from '@/types';
import type { RouteDefinition } from '@/wayfinder';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import ContainerWrapper from './fragments/container-wrapper';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

type UserRole = 'user' | 'admin';

interface LinkTypes {
    path: RouteDefinition<'get'>;
    name: string;
    protected: boolean;
}

interface NavigationItem {
    name: string;
    link: RouteDefinition<'get'>;
    icon: React.ReactNode;
    roles?: UserRole[];
}

const NavigationBar = () => {
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = true;
    const links: LinkTypes[] = [
        {
            path: home(),
            name: 'Home',
            protected: false,
        },
        {
            path: mitra(),
            name: 'Mitra',
            protected: false,
        },
        {
            path: product(),
            name: 'Produk',
            protected: false,
        },
        {
            path: dashboard(),
            name: 'Dasbor',
            protected: true,
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
                        Alus
                    </Link>
                    <div className="flex h-full w-fit items-center gap-5 font-poppins">
                        {links.map((item, i) => {
                            if (item.protected && !auth.user) return null;

                            return (
                                <Link
                                    key={i}
                                    href={item.path}
                                    className="opacity-100 hover:opacity-80"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
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
                        {auth.user === null && (
                            <Button
                                className="h-8 rounded-sm px-8 text-xs font-bold"
                                asChild
                            >
                                <Link href={login()}>Login</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </ContainerWrapper>
        </nav>
    );
};

// const NavbarPopup = ({ userRole }: { userRole: UserRole }) => {
//     const navigations: NavigationItem[] = [
//         {
//             name: 'Profil',
//             link: profile(),
//             icon: <User2 className="h-5 w-5" />,
//             roles: ['user', 'admin'],
//         },
//         {
//             name: 'Dasbor',
//             link: dashboard(),
//             icon: <LayoutDashboard className="h-5 w-5" />,
//             roles: ['admin'],
//         },
//         {
//             name: 'Keluar',
//             link: login(),
//             icon: <LogOut className="h-5 w-5" />,
//             roles: ['user', 'admin'],
//         },
//     ];

//     return (
//         <div className="absolute top-full mt-4 flex w-45 -translate-x-35 flex-col gap-2 rounded-xl border-3 border-border bg-white px-2 py-5 shadow-md">
//             {navigations
//                 .filter((item) => !item.roles || item.roles.includes(userRole))
//                 .map((item, idx) => (
//                     <Link
//                         key={idx}
//                         href={item.link}
//                         className="group flex items-center justify-between rounded-md px-3 py-2 text-foreground transition-all duration-200 hover:bg-muted hover:text-primary"
//                     >
//                         <div className="flex w-full items-center justify-between">
//                             {item.icon}
//                             <span className="font-medium">{item.name}</span>
//                         </div>
//                     </Link>
//                 ))}
//         </div>
//     );
// };

export default NavigationBar;
