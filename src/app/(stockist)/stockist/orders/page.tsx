'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Eye, Truck, CheckCircle, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrdersStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function OrdersPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { orders, loading, fetchOrders, setFilters } = useOrdersStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        setFilters({ status: activeTab === 'all' ? undefined : activeTab });
    }, [activeTab, setFilters]);

    const filteredOrders = orders.filter(order => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                order.orderNumber.toLowerCase().includes(query) ||
                order.pharmacyName.toLowerCase().includes(query) ||
                order.id.toLowerCase().includes(query)
            );
        }
        return true;
    });

    const getStatusBadge = (status: string) => {
        const colors: Record<string, { bg: string; text: string }> = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
            processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
            dispatched: { bg: 'bg-purple-100', text: 'text-purple-700' },
            delivered: { bg: 'bg-green-100', text: 'text-green-700' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
        };
        const color = colors[status] || colors.pending;
        return (
            <Badge className={`${color.bg} ${color.text} border-0`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    if (loading) {
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Orders</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Manage and track all pharmacy orders.</p>
                </div>
                <Button 
                    className="bg-[var(--stockist-primary)] hover:bg-orange-700 w-full sm:w-auto"
                    onClick={() => router.push('/stockist/orders/quick')}
                >
                    <Plus className="mr-2 h-4 w-4" /> Quick Order
                </Button>
            </div>

            <Card className="border border-slate-200 shadow-sm">
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by Order ID, Pharmacy..."
                                className="pl-9 text-sm sm:text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>

                    <Tabs defaultValue="all" onValueChange={setActiveTab}>
                        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2">
                            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                            <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
                            <TabsTrigger value="processing" className="text-xs sm:text-sm">Processing</TabsTrigger>
                            <TabsTrigger value="dispatched" className="text-xs sm:text-sm">Dispatched</TabsTrigger>
                            <TabsTrigger value="delivered" className="text-xs sm:text-sm">Delivered</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-4 sm:mt-6">
                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs sm:text-sm">Order ID</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Pharmacy</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Date</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Items</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Status</TableHead>
                                            <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.length > 0 ? (
                                            filteredOrders.map((order) => (
                                                <TableRow key={order.id} className="cursor-pointer hover:bg-slate-50">
                                                    <TableCell className="font-medium text-xs sm:text-sm">
                                                        {order.orderNumber}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">{order.pharmacyName}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                                                        {new Date(order.date).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">{order.itemsCount}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm font-medium">
                                                        ₹{order.totalAmount.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => router.push(`/stockist/orders/${order.id}`)}
                                                            className="text-xs sm:text-sm"
                                                        >
                                                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
                                                            <span className="hidden sm:inline">View</span>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                                                    No orders found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
