'use client';

import { ShoppingBag, AlertTriangle, CreditCard, Package, Plus, Upload, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PharmacyDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500">Overview of your pharmacy's performance.</p>
                </div>
                <Button className="bg-[var(--pharmacy-primary)] hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" /> New Order
                </Button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Today's Sales"
                    value="₹ 12,450"
                    trend="+8.2%"
                    icon={CreditCard}
                    color="text-green-600"
                    bg="bg-green-100"
                />
                <MetricCard
                    title="Pending Orders"
                    value="3"
                    trend="On time"
                    icon={ShoppingBag}
                    color="text-blue-600"
                    bg="bg-blue-100"
                />
                <MetricCard
                    title="Low Stock Alerts"
                    value="5"
                    trend="Urgent"
                    icon={AlertTriangle}
                    color="text-red-600"
                    bg="bg-red-100"
                />
                <MetricCard
                    title="Total Products"
                    value="1,240"
                    trend="+12"
                    icon={Package}
                    color="text-purple-600"
                    bg="bg-purple-100"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <QuickActionButton icon={Search} label="Stock Check" />
                        <QuickActionButton icon={ShoppingBag} label="Quick Order" />
                        <QuickActionButton icon={Upload} label="Upload Rx" />
                        <QuickActionButton icon={CreditCard} label="Pay Bill" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                    <div>
                                        <p className="font-medium text-slate-800">Dolo 650mg</p>
                                        <p className="text-xs text-red-600">Only 2 strips left</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-8 text-red-600 border-red-200 hover:bg-red-100">
                                        Order
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
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
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {trend}
                    </span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </CardContent>
        </Card>
    );
}

function QuickActionButton({ icon: Icon, label }: any) {
    return (
        <Button variant="outline" className="h-24 flex flex-col gap-3 hover:border-[var(--pharmacy-primary)] hover:text-[var(--pharmacy-primary)] transition-all">
            <div className="p-2 bg-slate-50 rounded-full group-hover:bg-blue-50">
                <Icon className="h-6 w-6" />
            </div>
            <span>{label}</span>
        </Button>
    );
}
