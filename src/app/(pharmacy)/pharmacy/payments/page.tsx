'use client';

import { useState } from 'react';
import { CreditCard, History, Filter, Search, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PharmacyPaymentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payments</h1>
                    <p className="text-slate-500">Manage your payables and transaction history.</p>
                </div>
                <Button className="bg-[var(--pharmacy-primary)] hover:bg-blue-700">
                    <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Payable</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">₹ 45,200</div>
                        <p className="text-xs text-slate-500 mt-1">To 3 stockists</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Due This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">₹ 12,450</div>
                        <p className="text-xs text-slate-500 mt-1">2 invoices expiring</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Available Credit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹ 1,54,800</div>
                        <p className="text-xs text-slate-500 mt-1">From total limit</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search stockist or invoice..." className="pl-9" />
                    </div>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                </div>

                <Tabs defaultValue="due">
                    <TabsList>
                        <TabsTrigger value="due">Due Invoices</TabsTrigger>
                        <TabsTrigger value="history">Payment History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="due" className="mt-4">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Stockist</TableHead>
                                        <TableHead>Invoice #</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">MediCare Distributors</TableCell>
                                        <TableCell>INV-2023-001</TableCell>
                                        <TableCell>2023-11-01</TableCell>
                                        <TableCell className="text-red-600">2023-11-16</TableCell>
                                        <TableCell>₹12,450</TableCell>
                                        <TableCell><Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Overdue</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">Pay</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Global Pharma</TableCell>
                                        <TableCell>INV-2023-089</TableCell>
                                        <TableCell>2023-11-15</TableCell>
                                        <TableCell>2023-11-30</TableCell>
                                        <TableCell>₹8,200</TableCell>
                                        <TableCell><Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Due Soon</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">Pay</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
