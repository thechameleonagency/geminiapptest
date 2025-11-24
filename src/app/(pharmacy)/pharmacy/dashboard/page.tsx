'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, AlertTriangle, CreditCard, Package, Plus, Upload, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useDashboardStore, useOrdersStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

export default function PharmacyDashboard() {
    const router = useRouter();
    const { userProfile, userRole } = useAuthStore();
    const { metrics, loading, fetchMetrics } = useDashboardStore();
    const { orders, fetchOrders } = useOrdersStore();

    useEffect(() => {
        if (!userProfile || userRole !== 'pharmacy') {
            router.push('/pharmacy/login');
            return;
        }
        
        fetchMetrics('pharmacy', userProfile.id);
        fetchOrders();
    }, [userProfile, userRole, fetchMetrics, fetchOrders, router]);

    if (loading || !metrics) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Welcome back, {userProfile?.businessName || userProfile?.name}</p>
                </div>
                <Button 
                    className="bg-[var(--pharmacy-primary)] hover:bg-blue-700 w-full sm:w-auto text-xs sm:text-sm"
                    onClick={() => router.push('/pharmacy/orders/new')}
                >
                    <Plus className="mr-2 h-4 w-4" /> New Order
                </Button>
            </div>

            {/* Metrics Grid - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <MetricCard
                    title="Today's Sales"
                    value={`₹ ${((metrics.todaySales || 0) / 1000).toFixed(1)}K`}
                    trend={`+${metrics.salesChange || 0}%`}
                    icon={CreditCard}
                    color="text-green-600"
                    bg="bg-green-100"
                    onClick={() => router.push('/pharmacy/analytics')}
                />
                <MetricCard
                    title="Pending Orders"
                    value={metrics.pendingOrders.toString()}
                    trend="On time"
                    icon={ShoppingBag}
                    color="text-blue-600"
                    bg="bg-blue-100"
                    onClick={() => router.push('/pharmacy/orders')}
                />
                <MetricCard
                    title="Low Stock Alerts"
                    value={metrics.lowStockItems.toString()}
                    trend="Urgent"
                    icon={AlertTriangle}
                    color="text-red-600"
                    bg="bg-red-100"
                    onClick={() => router.push('/pharmacy/inventory')}
                />
                <MetricCard
                    title="Total Products"
                    value={(metrics.totalProducts || 0).toString()}
                    trend={`+${metrics.productsChange || 0}`}
                    icon={Package}
                    color="text-purple-600"
                    bg="bg-purple-100"
                    onClick={() => router.push('/pharmacy/inventory')}
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="sm:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        <ActionButton icon={Search} label="Stock Check" onClick={() => router.push('/pharmacy/inventory')} />
                        <ActionButton icon={ShoppingBag} label="Quick Order" onClick={() => router.push('/pharmacy/orders/new')} />
                        <ActionButton icon={Upload} label="Upload Rx" onClick={() => router.push('/pharmacy/orders/prescription')} />
                        <ActionButton icon={CreditCard} label="Pay Bill" onClick={() => router.push('/pharmacy/payments')} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg">Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 sm:space-y-3">
                            {metrics.lowStockItems > 0 ? (
                                Array.from({ length: Math.min(3, metrics.lowStockItems) }).map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg border border-red-100">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-800 text-xs sm:text-sm truncate">Product {i + 1}</p>
                                            <p className="text-xs text-red-600">Low stock</p>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-7 sm:h-8 text-xs text-red-600 border-red-200 hover:bg-red-100">
                                            Order
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs sm:text-sm text-slate-500 text-center py-4">No stock alerts</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => router.push('/pharmacy/orders')}
                            className="text-xs sm:text-sm"
                        >
                            View All <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                        {orders.slice(0, 5).map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                onClick={() => router.push(`/pharmacy/orders/${order.id}`)}
                            >
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 flex items-center justify-center text-[var(--pharmacy-primary)] font-bold text-xs sm:text-sm shrink-0">
                                        #{order.orderNumber.split('-').pop()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{order.stockistName || 'Stockist'}</p>
                                        <p className="text-xs sm:text-sm text-slate-500">{order.itemsCount} items • ₹ {order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                                    <StatusBadge status={order.status} />
                                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm">View</Button>
                                </div>
                            </motion.div>
                        ))}
                        {orders.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                <ShoppingBag className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                                <p>No orders yet</p>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-4"
                                    onClick={() => router.push('/pharmacy/orders/new')}
                                >
                                    Create First Order
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function MetricCard({ title, value, trend, icon: Icon, color, bg, onClick }: any) {
    return (
        <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${onClick ? 'hover:scale-[1.02]' : ''}`}
            onClick={onClick}
        >
            <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-2.5 rounded-lg ${bg}`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {trend}
                    </span>
                </div>
                <h3 className="text-slate-500 text-xs sm:text-sm font-medium">{title}</h3>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </CardContent>
        </Card>
    );
}

function ActionButton({ icon: Icon, label, onClick }: any) {
    return (
        <Button 
            variant="outline" 
            className="h-20 sm:h-24 flex flex-col gap-2 sm:gap-3 hover:border-[var(--pharmacy-primary)] hover:text-[var(--pharmacy-primary)] transition-all"
            onClick={onClick}
        >
            <div className="p-2 bg-slate-50 rounded-full group-hover:bg-blue-50">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-xs sm:text-sm">{label}</span>
        </Button>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, { bg: string; text: string }> = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
        processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
        dispatched: { bg: 'bg-purple-100', text: 'text-purple-700' },
        delivered: { bg: 'bg-green-100', text: 'text-green-700' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    
    const color = colors[status] || colors.pending;
    
    return (
        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
