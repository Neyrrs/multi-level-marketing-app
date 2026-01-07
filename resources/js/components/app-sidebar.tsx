import React, { useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Package, Folder, BookOpen, Network } from 'lucide-react';
import AppLogo from './app-logo';
import { NavMain } from '@/components/nav-main';
import { NavFooter } from '@/components/nav-footer';
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
import finance from '@/routes/finance';

const footerNavItems: NavItem[] = [
  { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: Folder },
  { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen },
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
      { title: 'Dashboard Utama', href: getHref('admin.dashboard', '/admin/dashboard'), icon: LayoutGrid },

      // === MASTER DATA ===
      { title: 'Master Produk', href: getHref('admin.products.index', '/admin/products'), icon: Package },
      { title: 'Manajemen Affiliate', href: getHref('admin.affiliates.index', '/admin/affiliates'), icon: Package },
      { title: 'Pengaturan Plan', href: getHref('admin.plans.index', '/admin/plans'), icon: Package },
      { title: 'Pengaturan Komisi', href: getHref('admin.commissions.settings', '/admin/commissions/settings'), icon: Package },

      // === TRANSAKSI ===
      { title: 'Orders / Penjualan', href: getHref('admin.orders.index', '/admin/orders'), icon: Package },
      { title: 'Transaksi', href: getHref('admin.transactions.index', '/admin/transactions'), icon: Package },

      // === LAPORAN ===
      { title: 'Laporan Penjualan', href: getHref('admin.reports.sales', '/admin/reports/sales'), icon: Package },
      { title: 'Laporan Affiliate', href: getHref('admin.reports.affiliates', '/admin/reports/affiliates'), icon: Package },
      { title: 'Laporan Komisi', href: getHref('admin.reports.commissions', '/admin/reports/commissions'), icon: Package },
      { title: 'Laporan Keuangan', href: getHref('admin.reports.finance', '/admin/reports/finance'), icon: Package },
      { title: 'Laporan Produk', href: getHref('admin.reports.products', '/admin/reports/products'), icon: Package },

      // === SYSTEM ===
      { title: 'Users & Roles', href: getHref('admin.users.index', '/admin/users'), icon: Package },
      { title: 'Settings', href: getHref('admin.settings', '/admin/settings'), icon: Package },
    ],

    manager: [
      { title: 'Dashboard Monitoring', href: getHref('manager.dashboard', '/manager/dashboard'), icon: LayoutGrid },

      { title: 'Laporan Penjualan', href: getHref('manager.reports.sales', '/manager/reports/sales'), icon: Package },
      { title: 'Laporan Affiliate', href: getHref('manager.reports.affiliates', '/manager/reports/affiliates'), icon: Package },
      { title: 'Laporan Komisi', href: getHref('manager.reports.commissions', '/manager/reports/commissions'), icon: Package },
      { title: 'Laporan Keuangan', href: getHref('manager.reports.finance', '/manager/reports/finance'), icon: Package },
      { title: 'Laporan Produk', href: getHref('manager.reports.products', '/manager/reports/products'), icon: Package },
      { title: 'Laporan 111111', href: getHref('manager.reports.products', '/manager/reports/products'), icon: Package },
    ],

    affiliate: [
      { title: 'Affiliate Dashboard', href: getHref('affiliate.dashboard', '/affiliate/dashboard'), icon: LayoutGrid },

      { title: 'Belanja Produk', href: getHref('affiliate.products.index', '/affiliate/products'), icon: Package },
      { title: 'Kode Aktivasi', href: getHref('affiliate.activation-codes.index', '/affiliate/activation-codes'), icon: Package },
      { title: 'Redeem Kode', href: getHref('affiliate.activation-codes.redeem', '/affiliate/activation-codes/redeem'), icon: Package },

      { title: 'Binary Tree / Network', href: getHref('affiliate.network.index', '/affiliate/network'), icon: Package },

      { title: 'Komisi & Payout', href: getHref('affiliate.commissions.index', '/affiliate/commissions'), icon: Package },

      { title: 'Pengaturan Profil', href: getHref('profile', '/profile'), icon: Package },
    ],

    logistik: [
      { title: 'Dashboard Logistik', href: getHref('logistik.dashboard', '/logistik/dashboard'), icon: LayoutGrid },

      { title: 'Kelola Pemesanan', href: getHref('logistik.orders.index', '/logistik/orders'), icon: Package },
      { title: 'Manajemen Stok', href: getHref('logistik.inventory.index', '/logistik/inventory'), icon: Package },
      { title: 'Retur Produk', href: getHref('logistik.returns.index', '/logistik/returns'), icon: Package },
    ],

    finance: [
      { title: 'Dashboard Keuangan', href: getHref('finance.dashboard', '/finance/dashboard'), icon: LayoutGrid },

      { title: 'Manajemen Transaksi', href: getHref('finance.transactions.index', '/finance/transactions'), icon: Package },
      { title: 'Pengajuan Withdraw', href: getHref('finance.withdrawals.index', '/finance/withdrawals'), icon: Package },
      { title: 'Laporan Keuangan', href: getHref('finance.reports.index', '/finance/reports'), icon: Package },

      { title: 'Binary Tree', href: getHref('finance.network.index', '/finance/network'), icon: Package },

      { title: 'Pengaturan Profil', href: getHref('profile', '/profile'), icon: Package },
    ],

    guest: [
      { title: 'Home', href: getHref('home', '/'), icon: LayoutGrid },
      { title: 'Produk', href: getHref('produk.index', '/produk'), icon: Package },
      { title: 'Cara Kerja', href: getHref('CaraKerja.index', '/CaraKerja'), icon: Package },
      { title: 'Daftar Affiliate', href: getHref('DaftarAffiliate.register', '/DaftarAffiliate'), icon: Package },
      { title: 'Contact', href: getHref('Contact.index', '/Contact'), icon: Package },
      { title: 'Pohon', href: getHref('tree.index', '/tree'), icon: Network },
    ],
  };

    }

  // Build main nav items from roles, fallback to guest if no roles
  const mainNavItems = useMemo<NavItem[]>(() => {
    const menus = getRoleMenus();
    const items = roles.length ? roles.flatMap((role) => menus[role] ?? []) : menus['guest'];
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
    if (roles.includes('admin')) return getHref('admin.dashboard', '/admin/dashboard');
    if (roles.includes('manager')) return getHref('manager.dashboard', '/manager/dashboard');
    if (roles.includes('logistik')) return getHref('logistik.dashboard', '/logistik/dashboard');
    if (roles.includes('affiliate')) return getHref('affiliate.dashboard', '/affiliate/dashboard');
    if (roles.includes('guest')) return getHref('dashboard', '/dashboard');
    return getHref('home', '/');
  };

  // Debug logs (remove in production)
  // console.log('AppSidebar - rawRoles:', rawRoles);
  // console.log('AppSidebar - roles:', roles);
  console.log('AppSidebar - mainNavItems:', mainNavItems);

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