import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavChildren({ item }: { item: NavItem }) {
    const page = usePage();

    const hasChildren = !!item.children?.length;
    const isChildActive =
        hasChildren &&
        item.children!.some((child) =>
            page.url.startsWith(resolveUrl(child.href!)),
        );

    const [open, setOpen] = useState(isChildActive);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => setOpen(!open)}
                isActive={isChildActive}
            >
                <div className="flex w-full items-center gap-2">
                    {item.icon && <item.icon />}
                    <span className="flex-1">{item.title}</span>
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                            open ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </SidebarMenuButton>

            {open && (
                <SidebarMenu className="mt-1 ml-6">
                    {item.children!.map((child) => (
                        <SidebarMenuItem key={child.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={page.url.startsWith(
                                    resolveUrl(child.href!),
                                )}
                            >
                                <Link href={child.href!} prefetch>
                                    <span>{child.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            )}
        </SidebarMenuItem>
    );
}
