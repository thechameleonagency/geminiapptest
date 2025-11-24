'use client';

import StockistSidebar from '@/components/stockist/Sidebar';
import StockistHeader from '@/components/stockist/Header';
import BottomNav from '@/components/shared/BottomNav';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function StockistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { sidebarOpen } = useUIStore();

    return (
        <div className="min-h-screen bg-slate-50">
            <StockistSidebar />
            <div className={cn(
                "transition-all duration-300 ease-in-out flex flex-col min-h-screen",
                sidebarOpen ? "md:ml-64" : "ml-0"
            )}>
                <StockistHeader />
                <main className="flex-1 p-6 overflow-x-hidden pb-20 md:pb-6">
                    {children}
                </main>
                <BottomNav role="stockist" />
            </div>
        </div>
    );
}
