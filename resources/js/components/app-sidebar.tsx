import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    Gift,
    KeySquareIcon,
    LayoutGrid,
    Network,
    Package,
    ShoppingBasket,
} from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    // Inertia props typing: adjust if your auth shape differs
    const { auth } = usePage<SharedData>().props;

    // Raw roles from server (could be array of strings or objects)
    const rawRoles = auth?.user?.roles ?? [];

    // Normalize roles into array of strings (e.g., ['admin', 'manager'])
    const roles = useMemo<string[]>(() => {
        if (!Array.isArray(rawRoles)) return [];
        return rawRoles.map((r) => {
            if (typeof r === 'string') return r;
            if (r?.name) return String(r.name);
            if (r?.role) return String(r.role);
            return String(r);
        });
    }, [rawRoles]);

    // Safe Ziggy route helper (returns fallback path if not available)
    const getHref = (routeName: string, fallback: string): string => {
        try {
            // @ts-expect-error - Ziggy exposes window.route
            const route = window.route?.(routeName);
            return route && route !== '#' ? route : fallback;
        } catch {
            return fallback;
        }
    };

    // Role menus (function declaration is hoisted and safe to call)
    function getRoleMenus(): Record<string, NavItem[]> {
        return {
            admin: [
                {
                    title: 'Dashboard Utama',
                    href: getHref('admin.dashboard', '/admin/dashboard'),
                    icon: LayoutGrid,
                },

                // === MASTER DATA ===
                {
                    title: 'Master Produk',
                    href: getHref(
                        'admin.MasterProduk.index',
                        '/admin/MasterProduk',
                    ),
                    icon: Package,
                },
                {
                    title: 'Manajemen Affiliate',
                    href: getHref(
                        'admin.ManajemenAffiliate.index',
                        '/admin/ManajemenAffiliate',
                    ),
                    icon: Package,
                },
                {
                    title: 'Pengaturan Plan',
                    href: getHref(
                        'admin.PengaturanPlan.index',
                        '/admin/PengaturanPlan',
                    ),
                    icon: Package,
                },
                {
                    title: 'Pengaturan Komisi',
                    href: getHref(
                        'admin.PengaturanKomisi.index',
                        '/admin/PengaturanKomisi',
                    ),
                    icon: Package,
                },

                // === TRANSAKSI ===
                {
                    title: 'Orders / Penjualan',
                    href: getHref('admin.Orders.index', '/admin/Orders'),
                    icon: Package,
                },
                {
                    title: 'Transaksi',
                    href: getHref('admin.Transaksi.index', '/admin/Transaksi'),
                    icon: Package,
                },

                // === LAPORAN ===
                {
                    title: 'Laporan Penjualan',
                    href: getHref(
                        'admin.reports.LaporanPenjualan',
                        '/admin/reports/LaporanPenjualan',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Affiliate',
                    href: getHref(
                        'admin.reports.LaporanAffiliate',
                        '/admin/reports/LaporanAffiliate',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Komisi',
                    href: getHref(
                        'admin.reports.LaporanKomisi',
                        '/admin/reports/LaporanKomisi',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Keuangan',
                    href: getHref(
                        'admin.reports.LaporanKeuangan',
                        '/admin/reports/LaporanKeuangan',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Produk',
                    href: getHref(
                        'admin.reports.LaporanProduk',
                        '/admin/reports/LaporanProduk',
                    ),
                    icon: Package,
                },

                // === SYSTEM ===
                {
                    title: 'Users & Roles',
                    href: getHref('admin.UsersRole.index', '/admin/UsersRole'),
                    icon: Package,
                },
                {
                    title: 'Settings',
                    href: getHref('admin.settings', '/admin/settings'),
                    icon: Package,
                },
            ],

            manager: [
                {
                    title: 'Dashboard Monitoring',
                    href: getHref('manager.dashboard', '/manager/dashboard'),
                    icon: LayoutGrid,
                },

                {
                    title: 'Laporan Penjualan',
                    href: getHref(
                        'manager.reports.LaporanPenjualan',
                        '/manager/reports/LaporanPenjualan',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Affiliate',
                    href: getHref(
                        'manager.reports.LaporanAffiliate',
                        '/manager/reports/LaporanAffiliate',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Komisi',
                    href: getHref(
                        'manager.reports.LaporanKomisi',
                        '/manager/reports/LaporanKomisi',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Keuangan',
                    href: getHref(
                        'manager.reports.LaporanKeuangan',
                        '/manager/reports/LaporanKeuangan',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Produk',
                    href: getHref(
                        'manager.reports.LaporanProduk',
                        '/manager/reports/LaporanProduk',
                    ),
                    icon: Package,
                },
            ],

            affiliate: [
                {
                    title: 'Affiliate Dashboard',
                    href: getHref(
                        'affiliate.dashboard',
                        '/affiliate/dashboard',
                    ),
                    icon: LayoutGrid,
                },
                {
                    title: 'Pengaturan Profil',
                    href: getHref('affiliate.dashboard', '/profile'),
                    icon: Package,
                },
                {
                    title: 'Pohon',
                    href: getHref('affiliate.tree.index', '/affiliate/tree'),
                    icon: Network,
                },
                {
                    title: 'Belanja',
                    href: getHref('affiliate.shop.index', '/affiliate/shop'),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Riwayat Belanja',
                    href: getHref(
                        'affiliate.shop-history.index',
                        '/affiliate/shop-history',
                    ),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Riwayat Pin',
                    href: getHref(
                        'affiliate.pin-history.index',
                        '/affiliate/pin-history',
                    ),
                    icon: KeySquareIcon,
                },
                {
                    title: 'Daftar Pin',
                    href: getHref(
                        'affiliate.pin-list.index',
                        '/affiliate/pin-list',
                    ),
                    icon: KeySquareIcon,
                },
                {
                    title: 'Hadiah',
                    href: getHref(
                        'affiliate.reward.index',
                        '/affiliate/reward',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Sponsor',
                    href: getHref(
                        'affiliate.sponsor.index',
                        '/affiliate/sponsor',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Downline',
                    href: getHref(
                        'affiliate.downline.index',
                        '/affiliate/downline',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Personal RO',
                    href: getHref(
                        'affiliate.personal-ro.index',
                        '/affiliate/personal-ro',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Generasi RO',
                    href: getHref(
                        'affiliate.generation-ro.index',
                        '/affiliate/generation-ro',
                    ),
                    icon: Gift,
                },
            ],

            logistik: [],

            finance: [],

            guest: [
                { title: 'Home', href: getHref('home', '/'), icon: LayoutGrid },
                {
                    title: 'Produk',
                    href: getHref('produk.index', '/produk'),
                    icon: Package,
                },
                {
                    title: 'Belanja',
                    href: getHref('shop.index', '/shop'),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Riwayat Belanja',
                    href: getHref('shop-history.index', '/shop-history'),
                    icon: ShoppingBasket,
                },
            ],
        };
    }

    // Build main nav items from roles, fallback to guest if no roles
    const mainNavItems = useMemo<NavItem[]>(() => {
        const menus = getRoleMenus();
        const items = roles.length
            ? roles.flatMap((role) => menus[role] ?? [])
            : menus['guest'];
        // Deduplicate by href
        const seen = new Set<string>();
        return items.filter((item) => {
            if (seen.has(item.href)) return false;
            seen.add(item.href);
            return true;
        });
    }, [roles]);

    // Determine logo link based on roles (priority order)
    const getLogoDashboard = (): string => {
        if (roles.includes('admin'))
            return getHref('admin.dashboard', '/admin/dashboard');
        if (roles.includes('manager'))
            return getHref('manager.dashboard', '/manager/dashboard');
        if (roles.includes('logistik'))
            return getHref('logistik.dashboard', '/logistik/dashboard');
        if (roles.includes('affiliate'))
            return getHref('affiliate.dashboard', '/affiliate/dashboard');
        if (roles.includes('guest')) return getHref('dashboard', '/dashboard');
        return getHref('home', '/');
    };

    // Debug logs (remove in production)
    // console.log('AppSidebar - rawRoles:', rawRoles);
    // console.log('AppSidebar - roles:', roles);
    // console.log('AppSidebar - mainNavItems:', mainNavItems);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={getLogoDashboard()}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
