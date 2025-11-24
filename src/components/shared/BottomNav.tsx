'use client';

import { Home, Users, Package, ShoppingBag, DollarSign, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface BottomNavProps {
    role: 'stockist' | 'pharmacy';
}

// Mobile bottom nav shows 4-5 items max for better UX
const stockistNavItems: NavItem[] = [
    { href: '/stockist/dashboard', label: 'Home', icon: Home },
    { href: '/stockist/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/stockist/products', label: 'Products', icon: Package },
    { href: '/stockist/payments', label: 'Payments', icon: DollarSign },
    { href: '/stockist/analytics', label: 'Analytics', icon: BarChart3 },
];

const pharmacyNavItems: NavItem[] = [
    { href: '/pharmacy/dashboard', label: 'Home', icon: Home },
    { href: '/pharmacy/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/pharmacy/inventory', label: 'Stock', icon: Package },
    { href: '/pharmacy/billing', label: 'Billing', icon: DollarSign },
    { href: '/pharmacy/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function BottomNav({ role }: BottomNavProps) {
    const pathname = usePathname();
    const navItems = role === 'stockist' ? stockistNavItems : pharmacyNavItems;
    const primaryColor = role === 'stockist' ? 'text-orange-600' : 'text-blue-600';

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Check if current path matches or starts with nav item path
                    const isActive = pathname === item.href || (pathname && pathname.startsWith(item.href) && pathname !== '/');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full transition-colors min-w-0",
                                isActive ? primaryColor : "text-slate-500"
                            )}
                        >
                            <Icon className={cn("h-5 w-5 mb-1 transition-transform", isActive && "scale-110")} />
                            <span className={cn("text-xs font-medium truncate w-full text-center", isActive && "font-semibold")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

