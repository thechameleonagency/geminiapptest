export type UserRole = 'stockist' | 'pharmacy' | 'admin';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    businessName?: string;
    avatarUrl?: string;
    phone?: string;
    address?: string;
}

export interface Product {
    id: string;
    name: string;
    composition: string;
    manufacturer: string;
    hsnCode?: string;
    mrp: number;
    stockistPrice: number;
    retailerPrice?: number;
    stock: number;
    minStock?: number;
    expiryDate?: string;
    batchNumber?: string;
    gstRate?: number;
    category?: string;
    imageUrl?: string;
    prescriptionRequired?: boolean;
    status?: 'live' | 'offline';
}

export interface Order {
    id: string;
    orderNumber: string;
    pharmacyId?: string;
    pharmacyName: string;
    stockistId?: string;
    stockistName?: string;
    date: string;
    status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
    totalAmount: number;
    itemsCount: number;
    items?: OrderItem[];
    paymentStatus?: 'pending' | 'paid' | 'partial';
    paymentTerms?: string;
    dueDate?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    batchNumber?: string;
    expiryDate?: string;
}

export interface Pharmacy {
    id: string;
    name: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    location: string;
    address?: string;
    gstin?: string;
    licenseNumber?: string;
    status: 'active' | 'inactive';
    lastOrderDate?: string;
    pendingAmount: number;
    creditLimit?: number;
    paymentDays?: number;
    totalOrders?: number;
    createdAt?: string;
}

export interface Payment {
    id: string;
    invoiceId?: string;
    orderId?: string;
    pharmacyId?: string;
    pharmacyName?: string;
    stockistId?: string;
    stockistName?: string;
    amount: number;
    method: 'cash' | 'upi' | 'card' | 'cheque' | 'bank_transfer';
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
    date: string;
    notes?: string;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    orderId: string;
    pharmacyId: string;
    stockistId: string;
    amount: number;
    gstAmount?: number;
    totalAmount: number;
    dueDate: string;
    paymentStatus: 'pending' | 'paid' | 'partial';
    date: string;
}

export interface CartItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    stock?: number;
}

export interface DashboardMetrics {
    totalRevenue: number;
    revenueChange: number;
    pendingOrders: number;
    ordersChange: number;
    activePharmacies?: number;
    pharmaciesChange?: number;
    lowStockItems: number;
    stockChange: number;
    pendingPayments?: number;
    paymentsChange?: number;
    todaySales?: number;
    salesChange?: number;
    totalProducts?: number;
    productsChange?: number;
}

export interface AnalyticsData {
    salesData: { date: string; amount: number }[];
    orderData: { date: string; count: number }[];
    productData: { name: string; quantity: number; revenue: number }[];
    pharmacyData?: { name: string; orders: number; revenue: number }[];
}
