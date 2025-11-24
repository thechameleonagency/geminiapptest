'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Truck, CheckCircle, Package, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [status, setStatus] = useState('pending');
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setStatus(newStatus);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Order #{params.id.toUpperCase()}</h1>
                    <p className="text-slate-500">Placed on Nov 24, 2023 • City Pharmacy</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" /> Invoice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Batch</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <p className="font-medium">Dolo 650mg</p>
                                            <p className="text-xs text-slate-500">Paracetamol</p>
                                        </TableCell>
                                        <TableCell>B12345</TableCell>
                                        <TableCell>20</TableCell>
                                        <TableCell className="text-right">₹24.40</TableCell>
                                        <TableCell className="text-right">₹488.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <p className="font-medium">Azithral 500mg</p>
                                            <p className="text-xs text-slate-500">Azithromycin</p>
                                        </TableCell>
                                        <TableCell>A98765</TableCell>
                                        <TableCell>5</TableCell>
                                        <TableCell className="text-right">₹95.20</TableCell>
                                        <TableCell className="text-right">₹476.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="mt-6 flex justify-end">
                                <div className="w-64 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span>₹964.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">GST (12%)</span>
                                        <span>₹115.68</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₹1,079.68</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 relative pl-4 border-l-2 border-slate-100 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[21px] bg-green-500 h-3 w-3 rounded-full border-2 border-white ring-2 ring-green-100"></div>
                                    <p className="text-sm font-medium">Order Placed</p>
                                    <p className="text-xs text-slate-500">Nov 24, 10:30 AM</p>
                                </div>
                                {status !== 'pending' && (
                                    <div className="relative">
                                        <div className="absolute -left-[21px] bg-blue-500 h-3 w-3 rounded-full border-2 border-white ring-2 ring-blue-100"></div>
                                        <p className="text-sm font-medium">Processed & Packed</p>
                                        <p className="text-xs text-slate-500">Nov 24, 11:15 AM</p>
                                    </div>
                                )}
                                {status === 'dispatched' || status === 'delivered' ? (
                                    <div className="relative">
                                        <div className="absolute -left-[21px] bg-purple-500 h-3 w-3 rounded-full border-2 border-white ring-2 ring-purple-100"></div>
                                        <p className="text-sm font-medium">Dispatched for Delivery</p>
                                        <p className="text-xs text-slate-500">Nov 24, 02:00 PM</p>
                                    </div>
                                ) : null}
                                {status === 'delivered' && (
                                    <div className="relative">
                                        <div className="absolute -left-[21px] bg-green-600 h-3 w-3 rounded-full border-2 border-white ring-2 ring-green-100"></div>
                                        <p className="text-sm font-medium">Delivered</p>
                                        <p className="text-xs text-slate-500">Nov 24, 04:30 PM</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Status Actions */}
                    <Card className="border-t-4 border-t-[var(--stockist-primary)]">
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                            <CardDescription>Current Status: <span className="font-bold uppercase">{status}</span></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {status === 'pending' && (
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleStatusChange('processing')} disabled={isLoading}>
                                    <Package className="mr-2 h-4 w-4" /> Process Order
                                </Button>
                            )}
                            {status === 'processing' && (
                                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => handleStatusChange('dispatched')} disabled={isLoading}>
                                    <Truck className="mr-2 h-4 w-4" /> Dispatch Order
                                </Button>
                            )}
                            {status === 'dispatched' && (
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange('delivered')} disabled={isLoading}>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Mark Delivered
                                </Button>
                            )}
                            {status === 'delivered' && (
                                <Button variant="outline" className="w-full" disabled>
                                    Order Completed
                                </Button>
                            )}
                            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">Cancel Order</Button>
                        </CardContent>
                    </Card>

                    {/* Pharmacy Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pharmacy Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">City Pharmacy</p>
                                    <p className="text-xs text-slate-500">123, Indiranagar Double Road, Bangalore - 560038</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="font-medium text-sm">Payment Terms</p>
                                    <p className="text-xs text-slate-500">15 Days Credit</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">View Profile</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
