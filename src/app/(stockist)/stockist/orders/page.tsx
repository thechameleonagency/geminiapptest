'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockOrders } from '@/lib/mock-data';

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredOrders = activeTab === 'all'
        ? mockOrders
        : mockOrders.filter(o => o.status === activeTab);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>;
            case 'processing': return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Processing</Badge>;
            case 'dispatched': return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Dispatched</Badge>;
            case 'delivered': return <Badge variant="secondary" className="bg-green-100 text-green-700">Delivered</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Orders</h1>
                    <p className="text-slate-500">Manage and track all pharmacy orders.</p>
                </div>
                <Link href="/stockist/orders/quick">
                    <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">
                        + Quick Order
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by Order ID, Pharmacy..."
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>

                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="dispatched">Dispatched</TabsTrigger>
                        <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Pharmacy</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id.toUpperCase()}</TableCell>
                                            <TableCell>{order.pharmacyName}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.itemsCount}</TableCell>
                                            <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/stockist/orders/${order.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4 mr-1" /> View
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
