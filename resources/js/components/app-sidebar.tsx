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
    DollarSign,
    Gift,
    Home,
    KeySquareIcon,
    LayoutGrid,
    Network,
    Newspaper,
    Package,
    ShoppingBasket,
    User,
} from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/',
        icon: Home,
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
                    title: 'Dashboard',
                    icon: User,
                    href: getHref('admin.dashboard', '/admin/dashboard'),
                },
                {
                    title: 'Master Produk',
                    href: getHref('admin.products.index', '/admin/products'),
                    icon: ShoppingBasket,
                },
                {
                    title: 'Affiliate',
                    icon: LayoutGrid,
                    children: [
                        {
                            title: 'Manajemen Affiliate',
                            icon: User,
                            href: getHref(
                                'admin.affiliates.index',
                                '/admin/affiliates',
                            ),
                        },
                        {
                            title: 'Pengaturan Plan',
                            href: getHref(
                                'admin.plan-setting',
                                '/admin/plan-setting',
                            ),
                        },
                        {
                            title: 'Pengaturan Komisi',
                            href: getHref(
                                'admin.commission-rules.index',
                                '/admin/commission-rules',
                            ),
                        },
                    ],
                },
                {
                    title: 'Pusat Laporan',
                    icon: Newspaper,
                    children: [
                        {
                            title: 'Laporan Penjualan',
                            href: getHref(
                                'admin.reports.LaporanPenjualan',
                                '/admin/reports/LaporanPenjualan',
                            ),
                        },
                        {
                            title: 'Laporan Affiliate',
                            href: getHref(
                                'admin.reports.LaporanAffiliate',
                                '/admin/reports/LaporanAffiliate',
                            ),
                        },
                        {
                            title: 'Laporan Keuangan',
                            href: getHref(
                                'admin.reports.LaporanKeuangan',
                                '/admin/reports/LaporanKeuangan',
                            ),
                        },
                        {
                            title: 'Laporan Produk',
                            href: getHref(
                                'admin.reports.LaporanProduk',
                                '/admin/reports/LaporanProduk',
                            ),
                        },
                    ],
                },
                {
                    title: 'Manajemen User',
                    href: getHref('manajemen-produk.index', '/admin/UsersRole'),
                    icon: User,
                },
                // },
                // {
                //     title: 'Master Data',
                //     icon: LayoutGrid,
                //     children: [
                //         {
                //             title: 'Metode Komisi',
                //             href: getHref(
                //                 'admin.commission-methods.index',
                //                 '/admin/commission-methods',
                //             ),
                //         },
                //     ],
                // },

                // {
                //     title: 'Struktur Tree MLM',
                //     icon: Network,
                //     href: '/admin/mlm-tree',
                // },
                // {
                //     title: 'Keuangan',
                //     icon: Package,
                //     children: [
                //         {
                //             title: 'Penarikan Dana',
                //             href: getHref(
                //                 'admin.withdrawals.index',
                //                 '/admin/withdrawals',
                //             ),
                //         },
                //         {
                //             title: 'Laporan Pembayaran',
                //             href: getHref(
                //                 'admin.payout-report',
                //                 '/admin/payout-report',
                //             ),
                //         },
                //     ],
                // },
                // {
                //     title: 'Notifikasi',
                //     icon: Package,
                //     href: getHref(
                //         'admin.notifications.index',
                //         '/admin/notifications',
                //     ),
                // },
                // {
                //     title: 'Pusat Laporan',
                //     icon: Newspaper,
                //     children: [
                //         {
                //             title: 'Laporan Komisi',
                //             href: getHref(
                //                 'admin.reports.LaporanKomisi',
                //                 '/admin/reports/LaporanKomisi',
                //             ),
                //             icon: Package,
                //         },
                //     ],
                // },

                // // === MASTER DATA ===

                // {
                //     title: 'Manajemen Affiliate',
                //     href: getHref(
                //         'admin.ManajemenAffiliate.index',
                //         '/admin/ManajemenAffiliate',
                //     ),
                //     icon: Package,
                // },
                // {
                //     title: 'Pengaturan Plan',
                //     href: getHref(
                //         'admin.PengaturanPlan.index',
                //         '/admin/PengaturanPlan',
                //     ),
                //     icon: Package,
                // },
                // {
                //     title: 'Pengaturan Komisi',
                //     href: getHref(
                //         'admin.PengaturanKomisi.index',
                //         '/admin/PengaturanKomisi',
                //     ),
                //     icon: Package,
                // },

                // === TRANSAKSI ===
                // {
                //     title: 'Orders / Penjualan',
                //     href: getHref('admin.Orders.index', '/admin/Orders'),
                //     icon: Package,
                // },
                // {
                //     title: 'Transaksi',
                //     href: getHref('admin.Transaksi.index', '/admin/Transaksi'),
                //     icon: Package,
                // },

                // // === SYSTEM ===
                // {
                //     title: 'Users & Roles',
                //     href: getHref('admin.UsersRole.index', '/admin/UsersRole'),
                //     icon: Package,
                // },
                // {
                //     title: 'Settings',
                //     href: getHref('admin.settings', '/admin/settings'),
                //     icon: Package,
                // },
            ],

            manager: [
                {
                    title: 'Dashboard Monitoring',
                    href: getHref('manager.dashboard', '/manager/dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Manajemen Affiliate',
                    href: getHref(
                        'manager.affiliate-management.index',
                        '/manager/affiliate-management',
                    ),
                    icon: User,
                },
                {
                    title: 'Laporan',
                    icon: Package,
                    children: [
                        {
                            title: 'Penjualan',
                            href: getHref(
                                'manager.reports.sold-record',
                                '/manager/reports/sold-record',
                            ),
                        },
                        {
                            title: 'Produk',
                            href: getHref(
                                'manager.reports.product-record',
                                '/manager/reports/product-record',
                            ),
                        },
                        {
                            title: 'Laporan Affiliate',
                            href: getHref(
                                'manager.reports.affiliate-record',
                                '/manager/reports/affiliate-record',
                            ),
                            icon: Package,
                        },
                        {
                            title: 'Laporan Komisi',
                            href: getHref(
                                'manager.reports.commission-record',
                                '/manager/reports/commission-record',
                            ),
                            icon: Package,
                        },
                        {
                            title: 'Laporan Keuangan',
                            href: getHref(
                                'manager.reports.finance-record',
                                '/manager/reports/finance-record',
                            ),
                            icon: Package,
                        },
                    ],
                },
            ],

            affiliate: [
                {
                    title: 'Dashboard',
                    href: getHref(
                        'affiliate.dashboard',
                        '/affiliate/dashboard',
                    ),
                    icon: LayoutGrid,
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
                    title: 'Daftar Pin',
                    href: getHref(
                        'affiliate.pin-list.index',
                        '/affiliate/pin-list',
                    ),
                    icon: KeySquareIcon,
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
                    title: 'Redeem',
                    href: getHref(
                        'affiliate.redeem.index',
                        '/affiliate/redeem',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Reward',
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
                    icon: Network,
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
                {
                    title: 'Matching Bonus',
                    href: getHref(
                        'affiliate.matching-bonus.index',
                        '/affiliate/matching-bonus',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Komisi',
                    href: getHref(
                        'affiliate.komisi.index',
                        '/affiliate/komisi',
                    ),
                    icon: Gift,
                },
                {
                    title: 'Kode',
                    href: getHref('affiliate.kode.index', '/affiliate/kode'),
                    icon: KeySquareIcon,
                },
                {
                    title: 'Binary',
                    href: getHref(
                        'affiliate.binary.index',
                        '/affiliate/binary',
                    ),
                    icon: Network,
                },
                {
                    title: 'Pengaturan',
                    href: getHref(
                        'affiliate.pengaturan.index',
                        '/affiliate/pengaturan',
                    ),
                    icon: Package,
                },
                {
                    title: 'Tree',
                    href: getHref('affiliate.tree.index', '/affiliate/tree'),
                    icon: Network,
                },
                // {
                //     title: 'Affiliate Dashboard',
                //     href: getHref(
                //         'affiliate.dashboard',
                //         '/affiliate/dashboard',
                //     ),
                //     icon: LayoutGrid,
                // },
                // {
                //     title: 'Pengaturan Profil',
                //     href: getHref('affiliate.dashboard', '/profile'),
                //     icon: Package,
                // },

                // {
                //     title: 'Belanja',
                //     href: getHref('affiliate.shop.index', '/affiliate/shop'),
                //     icon: ShoppingBasket,
                // },
                // {
                //     title: 'Riwayat Belanja',
                //     href: getHref(
                //         'affiliate.shop-history.index',
                //         '/affiliate/shop-history',
                //     ),
                //     icon: ShoppingBasket,
                // },
                // {
                //     title: 'Riwayat Pin',
                //     href: getHref(
                //         'affiliate.pin-history.index',
                //         '/affiliate/pin-history',
                //     ),
                //     icon: KeySquareIcon,
                // },

                // {
                //     title: 'Hadiah',
                //     href: getHref(
                //         'affiliate.reward.index',
                //         '/affiliate/reward',
                //     ),
                //     icon: Gift,
                // },
                // {
                //     title: 'Sponsor',
                //     href: getHref(
                //         'affiliate.sponsor.index',
                //         '/affiliate/sponsor',
                //     ),
                //     icon: Gift,
                // },
                // {
                //     title: 'Downline',
                //     href: getHref(
                //         'affiliate.downline.index',
                //         '/affiliate/downline',
                //     ),
                //     icon: Gift,
                // },
                // {
                //     title: 'Personal RO',
                //     href: getHref(
                //         'affiliate.personal-ro.index',
                //         '/affiliate/personal-ro',
                //     ),
                //     icon: Gift,
                // },
                // {
                //     title: 'Generasi RO',
                //     href: getHref(
                //         'affiliate.generation-ro.index',
                //         '/affiliate/generation-ro',
                //     ),
                //     icon: Gift,
                // },
                // {
                //     title: 'Matching Nonus',
                //     href: getHref(
                //         'affiliate.matching-bonus.index',
                //         '/affiliate/matching-bonus',
                //     ),
                //     icon: Gift,
                // },
            ],

            logistik: [
                {
                    title: 'Dashboard',
                    icon: Home,
                    href: getHref('logistik.dashboard', '/logistik/dashboard'),
                },
                {
                    title: 'Pesanan',
                    icon: ShoppingBasket,
                    href: getHref('logistik.orders.index', '/logistik/orders'),
                },
                {
                    title: 'Pengiriman',
                    icon: Package,
                    href: getHref(
                        'logistik.shipments.index',
                        '/logistik/shipments',
                    ),
                },
                {
                    title: 'Inventaris',
                    icon: LayoutGrid,
                    href: getHref(
                        'logistik.inventory.index',
                        '/logistik/inventory',
                    ),
                },
                {
                    title: 'Pengembalian',
                    icon: Package,
                    href: getHref(
                        'logistik.returns.index',
                        '/logistik/returns',
                    ),
                },
                {
                    title: 'Laporan',
                    icon: Newspaper,
                    children: [
                        {
                            title: 'Laporan Pengiriman',
                            href: getHref(
                                'logistik.reports.delivery',
                                '/logistik/reports/delivery',
                            ),
                        },
                        {
                            title: 'Statistik Pengiriman',
                            href: getHref(
                                'logistik.reports.shipment',
                                '/logistik/reports/shipment',
                            ),
                        },
                    ],
                },
            ],

            finance: [
                {
                    title: 'Dashboard',
                    icon: Home,
                    href: getHref('finance.dashboard', '/finance/dashboard'),
                },
                {
                    title: 'Transaksi',
                    icon: Package,
                    href: getHref(
                        'finance.transactions.index',
                        '/finance/transactions',
                    ),
                },
                {
                    title: 'Penarikan Dana',
                    icon: DollarSign,
                    href: getHref(
                        'finance.withdrawals.index',
                        '/finance/withdrawals',
                    ),
                },
                {
                    title: 'Laporan',
                    icon: Newspaper,
                    href: getHref('finance.reports.index', '/finance/reports'),
                },
                {
                    title: 'Jaringan Komisi',
                    icon: Network,
                    href: getHref('finance.network', '/finance/network'),
                },
            ],

            guest: [
                {
                    title: 'Depan',
                    href: getHref('home', '/dashboard'),
                    icon: LayoutGrid,
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

        const seen = new Set<string>();

        return items.filter((item) => {
            if (!item.href) return true;

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
