import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import {
    cart,
    dashboard,
    home,
    login,
    logout,
    mitra,
    product,
    profile,
} from '@/routes';
import { SharedData } from '@/types';
import type { RouteDefinition } from '@/wayfinder';
import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Menu,
    ShoppingCart,
    User,
    X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ContainerWrapper from './fragments/container-wrapper';
import { getCart } from './fragments/product-card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { UserInfo } from './user-info';

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
    const cleanup = useMobileNavigation();
    const [open, setOpen] = useState(false);
    const [cartCount, setCartCount] = useState(() =>
        getCart().reduce((sum, item) => sum + item.qty, 0)
    );

    useEffect(() => {
        const refresh = () => setCartCount(getCart().reduce((sum, item) => sum + item.qty, 0));
        window.addEventListener('cart-updated', refresh);
        return () => window.removeEventListener('cart-updated', refresh);
    }, []);

    const links: LinkTypes[] = [
        { path: home(), name: 'Beranda', protected: false },
        { path: mitra(), name: 'Mitra', protected: false },
        { path: product(), name: 'Produk', protected: false },
    ];

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <nav className="fixed z-20 h-15 w-full border-b bg-card">
            <ContainerWrapper>
                <div className="flex h-full w-full items-center justify-between">
                    {/* LOGO */}
                    <Link
                        href={home()}
                        className="flex h-full w-20 items-center text-xl font-bold md:text-2xl"
                    >
                        Alus
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden h-full items-center gap-5 font-poppins md:flex">
                        {links.map((item, i) => {
                            if (item.protected && !auth.user) return null;

                            return (
                                <Link
                                    key={i}
                                    href={item.path}
                                    className="hover:opacity-80"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        {auth.user && (
                            <>
                                <Button
                                    className="relative bg-transparent text-primary shadow-none hover:bg-transparent"
                                    asChild
                                >
                                    <Link href={cart()}>
                                        <ShoppingCart className="size-6" />
                                        {cartCount > 0 && (
                                            <Badge className="absolute -top-1 -right-2 bg-red-500 text-[10px]">
                                                {cartCount > 99 ? '99+' : cartCount}
                                            </Badge>
                                        )}
                                    </Link>
                                </Button>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            variant={'ghost'}
                                            className="p-0 px-2"
                                        >
                                            <UserInfo user={auth.user} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex w-50 flex-col gap-4">
                                        <Button
                                            variant={'ghost'}
                                            className="p-0 hover:bg-transparent"
                                        >
                                            <UserInfo
                                                showEmail
                                                user={auth.user}
                                            />
                                        </Button>
                                            <Separator />
                                        <div>
                                            <Link href={profile()}>
                                                <Button
                                                    variant={'ghost'}
                                                    className="flex w-full justify-start text-left text-sidebar-accent-foreground hover:opacity-80"
                                                >
                                                    <User />
                                                    <span>Profil</span>
                                                </Button>
                                            </Link>
                                            <Link href={dashboard()}>
                                                <Button
                                                    variant={'ghost'}
                                                    className="flex w-full justify-start text-left text-sidebar-accent-foreground hover:opacity-80"
                                                >
                                                    <LayoutDashboard />
                                                    <span>Dasbor</span>
                                                </Button>
                                            </Link>
                                        </div>
                                        <Button
                                            variant={'destructive'}
                                            className="flex w-full justify-start gap-4 opacity-90"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toast.warning('Konfirmasi Keluar', {
                                                    description: 'Apakah Anda yakin ingin keluar?',
                                                    action: {
                                                        label: 'Ya, Keluar',
                                                        onClick: () => {
                                                            handleLogout();
                                                            window.location.href = logout() as unknown as string;
                                                        },
                                                    },
                                                    cancel: {
                                                        label: 'Batal',
                                                        onClick: () => {}
                                                    },
                                                });
                                            }}
                                        >
                                            <LogOut />
                                            Keluar
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                        {auth.user === null && (
                            <>
                                <Button
                                    className="hidden h-8 rounded-sm px-6 text-xs font-bold md:inline-flex"
                                    asChild
                                >
                                    <Link href={login()}>Login</Link>
                                </Button>
                            </>
                        )}

                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            onClick={() => setOpen(!open)}
                            className="md:hidden"
                        >
                            {open ? (
                                <X className="size-6" />
                            ) : (
                                <Menu className="size-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </ContainerWrapper>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="border-t bg-card md:hidden"
                    >
                        <motion.div
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.06,
                                    },
                                },
                            }}
                            className="flex flex-col gap-4 px-6 py-6"
                        >
                            {links.map((item, i) => {
                                if (item.protected && !auth.user) return null;

                                return (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            show: { opacity: 1, x: 0 },
                                        }}
                                    >
                                        <Link
                                            href={item.path}
                                            className="text-sm font-medium"
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            {auth.user === null && (
                                <motion.div
                                    className="w-full"
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        show: { opacity: 1, y: 0 },
                                    }}
                                >
                                    <Button
                                        className="mt-2 w-full text-sm font-bold md:h-9"
                                        asChild
                                    >
                                        <Link href={login()}>Login</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
