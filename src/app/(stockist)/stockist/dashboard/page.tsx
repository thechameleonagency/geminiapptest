'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, AlertCircle, DollarSign, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StockistDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Download Report</Button>
                    <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">Create New Order</Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Revenue"
                    value="₹ 2,45,000"
                    trend="+12.5%"
                    icon={DollarSign}
                    color="text-green-600"
                    bg="bg-green-100"
                />
                <MetricCard
                    title="Active Orders"
                    value="24"
                    trend="+4"
                    icon={Truck}
                    color="text-blue-600"
                    bg="bg-blue-100"
                />
                <MetricCard
                    title="Low Stock Items"
                    value="12"
                    trend="-2"
                    icon={AlertCircle}
                    color="text-red-600"
                    bg="bg-red-100"
                />
                <MetricCard
                    title="Active Pharmacies"
                    value="156"
                    trend="+3"
                    icon={Users}
                    color="text-purple-600"
                    bg="bg-purple-100"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders - Takes up 2 columns */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-[var(--stockist-primary)] font-bold">
                                            #{1000 + i}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">City Pharmacy</p>
                                            <p className="text-sm text-slate-500">24 items • ₹ 12,450</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                            Processing
                                        </span>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions & Activity */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-[var(--stockist-primary)] hover:text-[var(--stockist-primary)]">
                                <Package className="h-6 w-6" />
                                Add Product
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-[var(--stockist-primary)] hover:text-[var(--stockist-primary)]">
                                <Users className="h-6 w-6" />
                                Add Pharmacy
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-[var(--stockist-primary)] hover:text-[var(--stockist-primary)]">
                                <TrendingUp className="h-6 w-6" />
                                Analytics
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:border-[var(--stockist-primary)] hover:text-[var(--stockist-primary)]">
                                <DollarSign className="h-6 w-6" />
                                Payments
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-[var(--stockist-primary)] shrink-0" />
                                        <div>
                                            <p className="text-slate-800">New order received from <span className="font-medium">Wellness Chemist</span></p>
                                            <p className="text-slate-400 text-xs">2 mins ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, icon: Icon, color, bg }: any) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${bg}`}>
                        <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {trend}
                    </span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </CardContent>
        </Card>
    );
}
