'use client';

import PharmacySidebar from '@/components/pharmacy/Sidebar';
import PharmacyHeader from '@/components/pharmacy/Header';
import BottomNav from '@/components/shared/BottomNav';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function PharmacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { sidebarOpen } = useUIStore();

    return (
        <div className="min-h-screen bg-slate-50">
            <PharmacySidebar />
            <div className={cn(
                "transition-all duration-300 ease-in-out flex flex-col min-h-screen",
                sidebarOpen ? "md:ml-64" : "ml-0"
            )}>
                <PharmacyHeader />
                <main className="flex-1 p-6 overflow-x-hidden pb-20 md:pb-6">
                    {children}
                </main>
                <BottomNav role="pharmacy" />
            </div>
        </div>
    );
}
