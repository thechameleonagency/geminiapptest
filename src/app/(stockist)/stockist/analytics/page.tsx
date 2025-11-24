'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
];

const orderTrends = [
    { name: 'Week 1', orders: 45 },
    { name: 'Week 2', orders: 52 },
    { name: 'Week 3', orders: 48 },
    { name: 'Week 4', orders: 61 },
];

export default function StockistAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Analytics</h1>
                    <p className="text-slate-500">Insights into your business performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Last 30 Days</Button>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Sales Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `₹${value}`} />
                                <Tooltip />
                                <Bar dataKey="sales" fill="var(--stockist-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Volume Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={orderTrends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Top Selling Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-slate-900">Dolo 650mg</div>
                        <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Top Pharmacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-slate-900">City Pharmacy</div>
                        <p className="text-xs text-slate-500 mt-1">₹ 1.2L revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Avg Order Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-slate-900">₹ 12,450</div>
                        <p className="text-xs text-green-600 mt-1">+5% growth</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
