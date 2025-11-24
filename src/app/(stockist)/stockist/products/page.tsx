'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileDown, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = mockProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.composition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Products</h1>
                    <p className="text-slate-500">Manage your inventory and pricing.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" /> Bulk Upload
                    </Button>
                    <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name, composition..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <FileDown className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Manufacturer</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>MRP</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Expiry</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-slate-900">{product.name}</p>
                                            <p className="text-xs text-slate-500">{product.composition}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.manufacturer}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.stock < 500 ? "destructive" : "secondary"}>
                                            {product.stock}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>₹{product.mrp.toFixed(2)}</TableCell>
                                    <TableCell className="font-medium">₹{product.stockistPrice.toFixed(2)}</TableCell>
                                    <TableCell>{product.expiryDate}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                <DropdownMenuItem>Update Stock</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
