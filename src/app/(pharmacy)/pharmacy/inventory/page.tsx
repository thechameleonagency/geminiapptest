'use client';

import { useState } from 'react';
import { Search, Filter, AlertTriangle, ArrowDown, ArrowUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mock-data';

export default function InventoryPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Simulate pharmacy inventory by adding random stock levels to mock products
    const inventoryItems = mockProducts.map(p => ({
        ...p,
        currentStock: Math.floor(Math.random() * 50),
        minStock: 10,
        status: Math.random() > 0.7 ? 'low' : 'ok'
    }));

    const filteredItems = inventoryItems.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Inventory</h1>
                    <p className="text-slate-500">Track stock levels and expiry dates.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <History className="mr-2 h-4 w-4" /> Stock History
                    </Button>
                    <Button className="bg-[var(--pharmacy-primary)] hover:bg-blue-700">
                        <ArrowDown className="mr-2 h-4 w-4" /> Stock In
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-red-50 border-red-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-800">Low Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">12 Items</div>
                        <p className="text-xs text-red-500 mt-1">Below minimum level</p>
                    </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-orange-800">Expiring Soon</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">5 Batches</div>
                        <p className="text-xs text-orange-500 mt-1">In next 30 days</p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800">Total Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">₹ 4.2L</div>
                        <p className="text-xs text-blue-500 mt-1">Current stock value</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search inventory..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead>Expiry</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-slate-900">{item.name}</p>
                                            <p className="text-xs text-slate-500">{item.composition}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.batchNumber}</TableCell>
                                    <TableCell>{item.expiryDate}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.currentStock}</div>
                                    </TableCell>
                                    <TableCell>
                                        {item.status === 'low' ? (
                                            <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                                                <AlertTriangle className="h-3 w-3 mr-1" /> Low Stock
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                                                In Stock
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Update</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
