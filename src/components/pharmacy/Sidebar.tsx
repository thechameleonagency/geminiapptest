'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, FileText, BarChart3, Settings, LogOut, Pill, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/pharmacy/dashboard' },
    { icon: ShoppingBag, label: 'My Orders', href: '/pharmacy/orders' },
    { icon: Pill, label: 'Inventory', href: '/pharmacy/inventory' },
    { icon: ClipboardList, label: 'Billing', href: '/pharmacy/billing' },
    { icon: FileText, label: 'Payments', href: '/pharmacy/payments' },
    { icon: BarChart3, label: 'Analytics', href: '/pharmacy/analytics' },
];

export default function PharmacySidebar() {
    const pathname = usePathname();
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-30 hidden md:flex">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-2xl font-bold text-[var(--pharmacy-primary)] tracking-tight">Digi Swasthya</h1>
                <p className="text-xs text-slate-500 mt-1">Pharmacy Portal</p>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start mb-1",
                                    isActive
                                        ? "bg-blue-50 text-[var(--pharmacy-primary)] hover:bg-blue-100 hover:text-[var(--pharmacy-primary)]"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-[var(--pharmacy-primary)]" : "text-slate-400")} />
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100 space-y-1">
                <Link href="/pharmacy/settings">
                    <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50">
                        <Settings className="mr-3 h-5 w-5 text-slate-400" />
                        Settings
                    </Button>
                </Link>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
