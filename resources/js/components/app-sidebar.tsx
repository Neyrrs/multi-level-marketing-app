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
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, KeySquareIcon, LayoutGrid, Network, Package, ShoppingBasket } from 'lucide-react';
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
    const { auth } = usePage<{ auth?: { user?: { roles?: any[] } } }>().props;

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
      { title: 'Master Produk', href: getHref('admin.MasterProduk.index', '/admin/MasterProduk'), icon: Package },
      { title: 'Manajemen Affiliate', href: getHref('admin.ManajemenAffiliate.index', '/admin/ManajemenAffiliate'), icon: Package },
      { title: 'Pengaturan Plan', href: getHref('admin.PengaturanPlan.index', '/admin/PengaturanPlan'), icon: Package },
      { title: 'Pengaturan Komisi', href: getHref('admin.PengaturanKomisi.index', '/admin/PengaturanKomisi'), icon: Package },

      // === TRANSAKSI ===
      { title: 'Orders / Penjualan', href: getHref('admin.Orders.index', '/admin/Orders'), icon: Package },
      { title: 'Transaksi', href: getHref('admin.Transaksi.index', '/admin/Transaksi'), icon: Package },

      // === LAPORAN ===
      { title: 'Laporan Penjualan', href: getHref('admin.reports.LaporanPenjualan', '/admin/reports/LaporanPenjualan'), icon: Package },
      { title: 'Laporan Affiliate', href: getHref('admin.reports.LaporanAffiliate', '/admin/reports/LaporanAffiliate'), icon: Package },
      { title: 'Laporan Komisi', href: getHref('admin.reports.LaporanKomisi', '/admin/reports/LaporanKomisi'), icon: Package },
      { title: 'Laporan Keuangan', href: getHref('admin.reports.LaporanKeuangan', '/admin/reports/LaporanKeuangan'), icon: Package },
      { title: 'Laporan Produk', href: getHref('admin.reports.LaporanProduk', '/admin/reports/LaporanProduk'), icon: Package },

      // === SYSTEM ===
      { title: 'Users & Roles', href: getHref('admin.UsersRole.index', '/admin/UsersRole'), icon: Package },
      { title: 'Settings', href: getHref('admin.settings', '/admin/settings'), icon: Package },
    ],

            manager: [
                {
                    title: 'Dashboard Monitoring',
                    href: getHref('manager.dashboard', '/manager/dashboard'),
                    icon: LayoutGrid,
                },

      { title: 'Laporan Penjualan', href: getHref('manager.reports.LaporanPenjualan', '/manager/reports/LaporanPenjualan'), icon: Package },
      { title: 'Laporan Affiliate', href: getHref('manager.reports.LaporanAffiliate', '/manager/reports/LaporanAffiliate'), icon: Package },
      { title: 'Laporan Komisi', href: getHref('manager.reports.LaporanKomisi', '/manager/reports/LaporanKomisi'), icon: Package },
      { title: 'Laporan Keuangan', href: getHref('manager.reports.LaporanKeuangan', '/manager/reports/LaporanKeuangan'), icon: Package },
      { title: 'Laporan Produk', href: getHref('manager.reports.LaporanProduk', '/manager/reports/LaporanProduk'), icon: Package },
      
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
                    title: 'Belanja Produk',
                    href: getHref(
                        'affiliate.products.index',
                        '/affiliate/products',
                    ),
                    icon: Package,
                },
                {
                    title: 'Kode Aktivasi',
                    href: getHref(
                        'affiliate.activation-codes.index',
                        '/affiliate/activation-codes',
                    ),
                    icon: Package,
                },
                {
                    title: 'Redeem Kode',
                    href: getHref(
                        'affiliate.activation-codes.redeem',
                        '/affiliate/activation-codes/redeem',
                    ),
                    icon: Package,
                },

                {
                    title: 'Binary Tree / Network',
                    href: getHref(
                        'affiliate.network.index',
                        '/affiliate/network',
                    ),
                    icon: Package,
                },

                {
                    title: 'Komisi & Payout',
                    href: getHref(
                        'affiliate.commissions.index',
                        '/affiliate/commissions',
                    ),
                    icon: Package,
                },

                {
                    title: 'Pengaturan Profil',
                    href: getHref('profile', '/profile'),
                    icon: Package,
                },
            ],

            logistik: [
                {
                    title: 'Dashboard Logistik',
                    href: getHref('logistik.dashboard', '/logistik/dashboard'),
                    icon: LayoutGrid,
                },

                {
                    title: 'Kelola Pemesanan',
                    href: getHref('logistik.orders.index', '/logistik/orders'),
                    icon: Package,
                },
                {
                    title: 'Manajemen Stok',
                    href: getHref(
                        'logistik.inventory.index',
                        '/logistik/inventory',
                    ),
                    icon: Package,
                },
                {
                    title: 'Retur Produk',
                    href: getHref(
                        'logistik.returns.index',
                        '/logistik/returns',
                    ),
                    icon: Package,
                },
            ],

            finance: [
                {
                    title: 'Dashboard Keuangan',
                    href: getHref('finance.dashboard', '/finance/dashboard'),
                    icon: LayoutGrid,
                },

                {
                    title: 'Manajemen Transaksi',
                    href: getHref(
                        'finance.transactions.index',
                        '/finance/transactions',
                    ),
                    icon: Package,
                },
                {
                    title: 'Pengajuan Withdraw',
                    href: getHref(
                        'finance.withdrawals.index',
                        '/finance/withdrawals',
                    ),
                    icon: Package,
                },
                {
                    title: 'Laporan Keuangan',
                    href: getHref('finance.reports.index', '/finance/reports'),
                    icon: Package,
                },

                {
                    title: 'Binary Tree',
                    href: getHref('finance.network.index', '/finance/network'),
                    icon: Package,
                },

                {
                    title: 'Pengaturan Profil',
                    href: getHref('profile', '/profile'),
                    icon: Package,
                },
            ],

            guest: [
                { title: 'Home', href: getHref('home', '/'), icon: LayoutGrid },
                {
                    title: 'Produk',
                    href: getHref('produk.index', '/produk'),
                    icon: Package,
                },
                {
                    title: 'Cara Kerja',
                    href: getHref('CaraKerja.index', '/CaraKerja'),
                    icon: Package,
                },
                {
                    title: 'Daftar Affiliate',
                    href: getHref(
                        'DaftarAffiliate.register',
                        '/DaftarAffiliate',
                    ),
                    icon: Package,
                },
                {
                    title: 'Contact',
                    href: getHref('Contact.index', '/Contact'),
                    icon: Package,
                },
                {
                    title: 'Belanja',
                    href: getHref('shop.index', '/shop'),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Pohon',
                    href: getHref('tree.index', '/tree'),
                    icon: Network,
                },
                {
                    title: 'Riwayat Pin',
                    href: getHref('pin-history.index', '/pin-history'),
                    icon: KeySquareIcon,
                },
                {
                    title: 'Daftar Pin',
                    href: getHref('pin-list.index', '/pin-list'),
                    icon: KeySquareIcon,
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
