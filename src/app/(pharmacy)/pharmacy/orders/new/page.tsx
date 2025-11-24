'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Plus, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts } from '@/lib/mock-data';

export default function NewOrderPage() {
    const [cartCount, setCartCount] = useState(0);
    const [selectedStockist, setSelectedStockist] = useState<string | null>(null);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">New Order</h1>
                    <p className="text-slate-500">Select a stockist and add medicines to cart.</p>
                </div>
                <Link href="/pharmacy/cart">
                    <Button className="bg-[var(--pharmacy-primary)] hover:bg-blue-700 relative">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </Link>
            </div>

            {!selectedStockist ? (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-800">Select Stockist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['MediCare Distributors', 'Global Pharma', 'Health Connect'].map((name, i) => (
                            <Card
                                key={i}
                                className="cursor-pointer hover:border-[var(--pharmacy-primary)] hover:shadow-md transition-all"
                                onClick={() => setSelectedStockist(name)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-xl">
                                            {name.charAt(0)}
                                        </div>
                                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                                            <Star className="h-3 w-3 mr-1 fill-current" /> 4.{8 - i}
                                        </Badge>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                                    <p className="text-sm text-slate-500 mb-4">Indiranagar, Bangalore</p>
                                    <div className="flex gap-2 text-xs text-slate-600">
                                        <span className="bg-slate-100 px-2 py-1 rounded">Min Order: ₹1000</span>
                                        <span className="bg-slate-100 px-2 py-1 rounded">Delivery: 24h</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedStockist(null)}>
                                Change
                            </Button>
                            <span className="text-slate-300">|</span>
                            <h2 className="font-bold text-slate-800">Ordering from: <span className="text-[var(--pharmacy-primary)]">{selectedStockist}</span></h2>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search medicines..." className="pl-9" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockProducts.map((product) => (
                            <Card key={product.id}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{product.name}</h3>
                                            <p className="text-xs text-slate-500">{product.composition}</p>
                                        </div>
                                        <Badge variant="outline">₹{product.stockistPrice}</Badge>
                                    </div>
                                    <div className="text-xs text-slate-500 mb-4">
                                        <p>Mfr: {product.manufacturer}</p>
                                        <p>Exp: {product.expiryDate}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2 border rounded-md">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">-</Button>
                                            <span className="w-8 text-center text-sm">1</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">+</Button>
                                        </div>
                                        <Button size="sm" className="bg-[var(--pharmacy-primary)] hover:bg-blue-700" onClick={addToCart}>
                                            Add
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
