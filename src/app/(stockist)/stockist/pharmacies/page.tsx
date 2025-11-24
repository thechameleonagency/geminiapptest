'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, Phone, MoreHorizontal, MapPin, Mail, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePharmaciesStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

export default function PharmaciesPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { pharmacies, loading, fetchPharmacies } = usePharmaciesStore();

    useEffect(() => {
        fetchPharmacies();
    }, [fetchPharmacies]);

    const filteredPharmacies = pharmacies.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading && pharmacies.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Pharmacies</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Manage your pharmacy network and connections.</p>
                </div>
                <Button 
                    className="bg-[var(--stockist-primary)] hover:bg-orange-700 w-full sm:w-auto"
                    onClick={() => router.push('/stockist/pharmacies/add')}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Pharmacy
                </Button>
            </div>

            <Card className="border border-slate-200 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between mb-4 sm:mb-6">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by name, location..."
                                className="pl-9 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredPharmacies.length > 0 ? (
                            filteredPharmacies.map((pharmacy) => (
                                <Card 
                                    key={pharmacy.id} 
                                    className="cursor-pointer hover:shadow-lg transition-shadow border-slate-200"
                                    onClick={() => router.push(`/stockist/pharmacies/${pharmacy.id}`)}
                                >
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <Avatar className="h-12 w-12 shrink-0">
                                                    <AvatarFallback className="bg-orange-100 text-orange-600">
                                                        {pharmacy.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 truncate">
                                                        {pharmacy.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-500 mt-1">
                                                        <MapPin className="h-3 w-3 shrink-0" />
                                                        <span className="truncate">{pharmacy.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/stockist/pharmacies/${pharmacy.id}`);
                                                    }}>
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/stockist/orders/quick?pharmacy=${pharmacy.id}`);
                                                    }}>
                                                        Create Order
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="space-y-2 sm:space-y-3">
                                            {pharmacy.phone && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                                                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                                                    <a href={`tel:${pharmacy.phone}`} onClick={(e) => e.stopPropagation()}>
                                                        {pharmacy.phone}
                                                    </a>
                                                </div>
                                            )}
                                            {pharmacy.email && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                                                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                                                    <span className="truncate">{pharmacy.email}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between pt-2 border-t">
                                                <div>
                                                    <div className="text-xs text-slate-500">Pending Amount</div>
                                                    <div className="text-sm sm:text-base font-semibold text-slate-900">
                                                        ₹{pharmacy.pendingAmount.toLocaleString()}
                                                    </div>
                                                </div>
                                                <Badge 
                                                    variant={pharmacy.status === 'active' ? "default" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {pharmacy.status}
                                                </Badge>
                                            </div>
                                            {pharmacy.lastOrderDate && (
                                                <div className="text-xs text-slate-500">
                                                    Last order: {new Date(pharmacy.lastOrderDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                <p className="mb-4">No pharmacies found</p>
                                <Button 
                                    variant="outline"
                                    onClick={() => router.push('/stockist/pharmacies/add')}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add First Pharmacy
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
