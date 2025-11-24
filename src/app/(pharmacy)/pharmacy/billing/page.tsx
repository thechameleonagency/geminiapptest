'use client';

import { useState } from 'react';
import { Search, Plus, Trash2, Printer, User, CreditCard, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BillingPage() {
    const [billItems, setBillItems] = useState([
        { id: 1, name: 'Dolo 650mg', qty: 2, price: 30.50, total: 61.00 },
        { id: 2, name: 'Cough Syrup', qty: 1, price: 120.00, total: 120.00 },
    ]);

    const subtotal = billItems.reduce((acc, item) => acc + item.total, 0);
    const gst = subtotal * 0.12;
    const total = subtotal + gst;

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
            {/* Left Side - Product Selection */}
            <div className="flex-1 flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Billing</h1>
                    <p className="text-slate-500">Create new bill for customer.</p>
                </div>

                <Card className="flex-1 flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input placeholder="Scan barcode or search medicine..." className="pl-10 h-12 text-lg" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                            {['Paracetamol', 'Cetirizine', 'Azithromycin', 'Pantoprazole', 'Vitamin C', 'Calcium'].map((item, i) => (
                                <Button key={i} variant="outline" className="h-16 justify-start px-4 hover:border-[var(--pharmacy-primary)] hover:text-[var(--pharmacy-primary)]">
                                    <div className="text-left">
                                        <div className="font-semibold">{item}</div>
                                        <div className="text-xs text-slate-500">Strip of 10</div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Side - Bill Details */}
            <div className="w-full md:w-[400px] flex flex-col">
                <Card className="flex-1 flex flex-col border-2 border-blue-100 shadow-lg">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <CardTitle>Bill #INV-001</CardTitle>
                            <div className="text-sm text-slate-500">{new Date().toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-2">
                            <Input placeholder="Customer Mobile" className="bg-white" />
                            <Button variant="outline" size="icon"><User className="h-4 w-4" /></Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50%]">Item</TableHead>
                                    <TableHead className="w-[20%] text-center">Qty</TableHead>
                                    <TableHead className="w-[30%] text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {billItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            {item.name}
                                            <div className="text-xs text-slate-500">₹{item.price}</div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <div className="font-bold">{item.qty}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div>₹{item.total.toFixed(2)}</div>
                                            <Trash2 className="h-3 w-3 text-red-400 ml-auto mt-1 cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>

                    <div className="bg-slate-50 p-4 border-t border-slate-100 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">GST</span>
                            <span>₹{gst.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-xl font-bold text-slate-800">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <CardFooter className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3">
                        <Tabs defaultValue="cash" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="cash">Cash</TabsTrigger>
                                <TabsTrigger value="upi">UPI</TabsTrigger>
                                <TabsTrigger value="card">Card</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button className="w-full h-12 text-lg bg-[var(--pharmacy-primary)] hover:bg-blue-700">
                            <Printer className="mr-2 h-5 w-5" /> Print Bill
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
