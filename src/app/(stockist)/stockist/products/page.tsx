'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, MoreHorizontal, FileDown, Upload, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useProductsStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { products, loading, fetchProducts, deleteProduct, setFilters } = useProductsStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        setFilters({ search: searchTerm });
    }, [searchTerm, setFilters]);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    if (loading && products.length === 0) {
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Products</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Manage your inventory and pricing.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => router.push('/stockist/products/bulk')}
                    >
                        <Upload className="mr-2 h-4 w-4" /> Bulk Upload
                    </Button>
                    <Button 
                        className="bg-[var(--stockist-primary)] hover:bg-orange-700 w-full sm:w-auto"
                        onClick={() => router.push('/stockist/products/add')}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            <Card className="border border-slate-200 shadow-sm">
                <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by name, composition..."
                                className="pl-9 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>

                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-xs sm:text-sm">Product Name</TableHead>
                                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Manufacturer</TableHead>
                                    <TableHead className="text-xs sm:text-sm">Stock</TableHead>
                                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">MRP</TableHead>
                                    <TableHead className="text-xs sm:text-sm">Price</TableHead>
                                    <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Status</TableHead>
                                    <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <TableRow key={product.id} className="hover:bg-slate-50">
                                            <TableCell className="font-medium text-xs sm:text-sm">
                                                <div>
                                                    <div>{product.name}</div>
                                                    <div className="text-xs text-slate-500 sm:hidden">{product.manufacturer}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                                                {product.manufacturer}
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant={product.stock < (product.minStock || 50) ? "destructive" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {product.stock}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                                                ₹{product.mrp}
                                            </TableCell>
                                            <TableCell className="text-xs sm:text-sm font-medium">
                                                ₹{product.stockistPrice}
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <Badge 
                                                    variant={product.status === 'live' ? "default" : "outline"}
                                                    className="text-xs"
                                                >
                                                    {product.status || 'live'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => router.push(`/stockist/products/add?id=${product.id}`)}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                                            No products found. Add your first product!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
