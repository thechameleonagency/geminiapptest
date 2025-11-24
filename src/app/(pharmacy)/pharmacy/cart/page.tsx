'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Order Placed Successfully!</h1>
                    <p className="text-slate-500 mt-2">Your order #ORD-2023-892 has been sent to MediCare Distributors.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => router.push('/pharmacy/dashboard')}>Go to Dashboard</Button>
                    <Button className="bg-[var(--pharmacy-primary)]" onClick={() => router.push('/pharmacy/orders')}>Track Order</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Items from MediCare Distributors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <p className="font-medium">Dolo 650mg</p>
                                            <p className="text-xs text-slate-500">Paracetamol</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 border rounded-md w-fit">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">-</Button>
                                                <span className="w-6 text-center text-sm">10</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">₹24.40</TableCell>
                                        <TableCell className="text-right">₹244.00</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <p className="font-medium">Azithral 500mg</p>
                                            <p className="text-xs text-slate-500">Azithromycin</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 border rounded-md w-fit">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">-</Button>
                                                <span className="w-6 text-center text-sm">5</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">₹95.20</TableCell>
                                        <TableCell className="text-right">₹476.00</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span>₹720.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">GST (12%)</span>
                                <span>₹86.40</span>
                            </div>
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount (5%)</span>
                                <span>-₹36.00</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹770.40</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-[var(--pharmacy-primary)] hover:bg-blue-700"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Place Order <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
