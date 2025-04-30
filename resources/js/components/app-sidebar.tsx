import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Car, LayoutGrid, MapPin, Package, Settings, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Cars',
        href: '/dashboard/cars',
        icon: Car,
    },
    {
        title: 'Clients',
        href: '/dashboard/clients',
        icon: Users,
    },
    {
        title: 'Reservations',
        href: '/dashboard/reservations',
        icon: Calendar,
    },
    {
        title: 'Packs',
        href: '/dashboard/packs',
        icon: Package,
    },
    {
        title: 'Pack Items',
        href: '/dashboard/packitems',
        icon: Settings,
    },
    {
        title: 'Added Options',
        href: '/dashboard/added-options',
        icon: Settings,
    },
    {
        title: 'Places',
        href: '/dashboard/places',
        icon: MapPin,
    },
];



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
