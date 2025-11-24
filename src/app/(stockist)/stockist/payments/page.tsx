'use client';

import { useState } from 'react';
import { DollarSign, Download, Filter, Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StockistPaymentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payments</h1>
                    <p className="text-slate-500">Track collections and outstanding invoices.</p>
                </div>
                <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">
                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Record Payment
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Outstanding</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">₹ 12,45,000</div>
                        <p className="text-xs text-slate-500 mt-1">Across 45 pharmacies</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Collected Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹ 85,000</div>
                        <p className="text-xs text-slate-500 mt-1">12 transactions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Overdue (&gt;30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">₹ 2,10,000</div>
                        <p className="text-xs text-slate-500 mt-1">Needs attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search pharmacy or invoice..." className="pl-9" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                    </div>
                </div>

                <Tabs defaultValue="outstanding">
                    <TabsList>
                        <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
                        <TabsTrigger value="received">Received History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="outstanding" className="mt-4">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pharmacy</TableHead>
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
                                        <TableCell className="font-medium">City Pharmacy</TableCell>
                                        <TableCell>INV-2023-001</TableCell>
                                        <TableCell>2023-11-01</TableCell>
                                        <TableCell className="text-red-600">2023-11-16</TableCell>
                                        <TableCell>₹12,450</TableCell>
                                        <TableCell><Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Overdue</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="outline">Remind</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Wellness Chemist</TableCell>
                                        <TableCell>INV-2023-045</TableCell>
                                        <TableCell>2023-11-20</TableCell>
                                        <TableCell>2023-12-05</TableCell>
                                        <TableCell>₹5,600</TableCell>
                                        <TableCell><Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Due Soon</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="outline">Remind</Button>
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
