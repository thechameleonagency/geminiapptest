'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const spendingData = [
    { name: 'Week 1', amount: 12000 },
    { name: 'Week 2', amount: 15000 },
    { name: 'Week 3', amount: 8000 },
    { name: 'Week 4', amount: 22000 },
];

const categoryData = [
    { name: 'Tablets', value: 400 },
    { name: 'Syrups', value: 300 },
    { name: 'Injections', value: 100 },
    { name: 'Others', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PharmacyAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Analytics</h1>
                    <p className="text-slate-500">Track your purchase history and inventory distribution.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Last 30 Days</Button>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Spending</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spendingData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `₹${value}`} />
                                <Tooltip />
                                <Bar dataKey="amount" fill="var(--pharmacy-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inventory by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 text-sm text-slate-500 mt-2">
                            {categoryData.map((entry, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
