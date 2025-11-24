'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, Phone, MoreHorizontal, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockPharmacies } from '@/lib/mock-data';

export default function PharmaciesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPharmacies = mockPharmacies.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Pharmacies</h1>
                    <p className="text-slate-500">Manage your pharmacy network and connections.</p>
                </div>
                <Link href="/stockist/pharmacies/add">
                    <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">
                        <Plus className="mr-2 h-4 w-4" /> Add Pharmacy
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search by name, location..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPharmacies.map((pharmacy) => (
                    <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12 border border-slate-100">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${pharmacy.name}`} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700">PH</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{pharmacy.name}</h3>
                                        <div className="flex items-center text-xs text-slate-500 mt-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {pharmacy.location}
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Order History</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Status</span>
                                    <Badge variant={pharmacy.status === 'active' ? 'default' : 'secondary'} className={pharmacy.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                        {pharmacy.status === 'active' ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Pending Amount</span>
                                    <span className="font-medium text-red-600">₹{pharmacy.pendingAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Last Order</span>
                                    <span>{pharmacy.lastOrderDate || 'Never'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full">
                                    <Phone className="mr-2 h-4 w-4" /> Call
                                </Button>
                                <Link href="/stockist/orders/quick" className="w-full">
                                    <Button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                                        Create Order
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
