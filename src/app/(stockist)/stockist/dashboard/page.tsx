'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, AlertCircle, DollarSign, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useDashboardStore, useOrdersStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

export default function StockistDashboard() {
    const router = useRouter();
    const { userProfile, userRole } = useAuthStore();
    const { metrics, loading, fetchMetrics } = useDashboardStore();
    const { orders, fetchOrders } = useOrdersStore();

    useEffect(() => {
        if (!userProfile || userRole !== 'stockist') {
            router.push('/stockist/login');
            return;
        }
        
        fetchMetrics('stockist', userProfile.id);
        fetchOrders();
    }, [userProfile, userRole, fetchMetrics, fetchOrders, router]);

    if (loading || !metrics) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
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
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
                        Download Report
                    </Button>
                    <Button 
                        className="bg-[var(--stockist-primary)] hover:bg-orange-700 flex-1 sm:flex-none text-xs sm:text-sm"
                        onClick={() => router.push('/stockist/orders/quick')}
                    >
                        Quick Order
                    </Button>
                </div>
            </div>

            {/* Metrics Grid - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <MetricCard
                    title="Total Revenue"
                    value={`₹ ${(metrics.totalRevenue / 1000).toFixed(1)}K`}
                    trend={`+${metrics.revenueChange}%`}
                    icon={DollarSign}
                    color="text-green-600"
                    bg="bg-green-100"
                    onClick={() => router.push('/stockist/analytics')}
                />
                <MetricCard
                    title="Pending Orders"
                    value={metrics.pendingOrders.toString()}
                    trend={metrics.ordersChange > 0 ? `+${metrics.ordersChange}` : `${metrics.ordersChange}`}
                    icon={ShoppingBag}
                    color="text-blue-600"
                    bg="bg-blue-100"
                    onClick={() => router.push('/stockist/orders')}
                />
                <MetricCard
                    title="Low Stock Items"
                    value={metrics.lowStockItems.toString()}
                    trend={metrics.stockChange > 0 ? `+${metrics.stockChange}` : `${metrics.stockChange}`}
                    icon={AlertCircle}
                    color="text-red-600"
                    bg="bg-red-100"
                    onClick={() => router.push('/stockist/products')}
                />
                <MetricCard
                    title="Active Pharmacies"
                    value={(metrics.activePharmacies || 0).toString()}
                    trend={`+${metrics.pharmaciesChange || 0}`}
                    icon={Users}
                    color="text-purple-600"
                    bg="bg-purple-100"
                    onClick={() => router.push('/stockist/pharmacies')}
                />
            </div>

            {/* Pending Payments Card */}
            {metrics.pendingPayments !== undefined && metrics.pendingPayments > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Pending Payments</p>
                                    <p className="text-2xl font-bold text-slate-900">₹ {(metrics.pendingPayments / 1000).toFixed(1)}K</p>
                                </div>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push('/stockist/payments')}
                            >
                                View All
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Recent Orders - Takes up 2 columns on desktop */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg sm:text-xl">Recent Orders</CardTitle>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => router.push('/stockist/orders')}
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
                                    onClick={() => router.push(`/stockist/orders/${order.id}`)}
                                >
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-orange-100 flex items-center justify-center text-[var(--stockist-primary)] font-bold text-xs sm:text-sm shrink-0">
                                            #{order.orderNumber.split('-').pop()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{order.pharmacyName}</p>
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
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions & Activity - Right sidebar */}
                <div className="space-y-4 sm:space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-2 sm:gap-3">
                            <ActionButton
                                icon={ShoppingBag}
                                label="Quick Order"
                                onClick={() => router.push('/stockist/orders/quick')}
                            />
                            <ActionButton
                                icon={Package}
                                label="Add Product"
                                onClick={() => router.push('/stockist/products/add')}
                            />
                            <ActionButton
                                icon={Users}
                                label="Add Pharmacy"
                                onClick={() => router.push('/stockist/pharmacies/add')}
                            />
                            <ActionButton
                                icon={TrendingUp}
                                label="Analytics"
                                onClick={() => router.push('/stockist/analytics')}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base sm:text-lg">Activity Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {orders.slice(0, 3).map((order, i) => (
                                    <div key={order.id} className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-[var(--stockist-primary)] shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-800 truncate">
                                                New order from <span className="font-medium">{order.pharmacyName}</span>
                                            </p>
                                            <p className="text-slate-400 text-xs">{new Date(order.date).toLocaleDateString()}</p>
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
                    <span className={`text-xs sm:text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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
            className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2 hover:border-[var(--stockist-primary)] hover:text-[var(--stockist-primary)]"
            onClick={onClick}
        >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
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

