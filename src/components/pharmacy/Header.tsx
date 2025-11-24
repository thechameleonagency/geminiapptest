'use client';

import { Bell, Search, Menu, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore, useUIStore } from '@/lib/store';

export default function PharmacyHeader() {
    const { userProfile } = useAuthStore();
    const { toggleSidebar } = useUIStore();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                    <Menu className="h-6 w-6 text-slate-600" />
                </Button>
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search medicines..."
                        className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-[var(--pharmacy-primary)]">
                    <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-[var(--pharmacy-primary)]">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-900">{userProfile?.businessName || 'Pharmacy Admin'}</p>
                        <p className="text-xs text-slate-500">{userProfile?.email || 'admin@pharmacy.com'}</p>
                    </div>
                    <Avatar className="h-9 w-9 border border-slate-200 cursor-pointer">
                        <AvatarImage src={userProfile?.avatarUrl} />
                        <AvatarFallback className="bg-blue-100 text-[var(--pharmacy-primary)]">PH</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
