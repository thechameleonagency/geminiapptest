// Mock API Service - Fully Functional Data Layer
// This simulates a real backend with persistent data

import { Product, Order, Pharmacy, Payment, Invoice, DashboardMetrics, AnalyticsData, CartItem } from '../types';

// In-memory database (persisted to localStorage in production)
class Database {
    private static instance: Database;
    private products: Product[] = [];
    private orders: Order[] = [];
    private pharmacies: Pharmacy[] = [];
    private payments: Payment[] = [];
    private invoices: Invoice[] = [];
    private stockistCart: CartItem[] = [];
    private pharmacyCarts: Map<string, CartItem[]> = new Map();

    private constructor() {
        this.loadFromStorage();
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private loadFromStorage() {
        if (typeof window === 'undefined') return;
        
        try {
            this.products = JSON.parse(localStorage.getItem('db_products') || '[]');
            this.orders = JSON.parse(localStorage.getItem('db_orders') || '[]');
            this.pharmacies = JSON.parse(localStorage.getItem('db_pharmacies') || '[]');
            this.payments = JSON.parse(localStorage.getItem('db_payments') || '[]');
            this.invoices = JSON.parse(localStorage.getItem('db_invoices') || '[]');
            
            // Initialize with sample data if empty
            if (this.products.length === 0) {
                this.initializeSampleData();
            }
        } catch (e) {
            console.error('Failed to load from storage:', e);
        }
    }

    private saveToStorage() {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem('db_products', JSON.stringify(this.products));
            localStorage.setItem('db_orders', JSON.stringify(this.orders));
            localStorage.setItem('db_pharmacies', JSON.stringify(this.pharmacies));
            localStorage.setItem('db_payments', JSON.stringify(this.payments));
            localStorage.setItem('db_invoices', JSON.stringify(this.invoices));
        } catch (e) {
            console.error('Failed to save to storage:', e);
        }
    }

    private initializeSampleData() {
        // Sample products
        this.products = [
            { id: '1', name: 'Paracetamol 500mg', composition: 'Paracetamol', manufacturer: 'ABC Pharma', mrp: 50, stockistPrice: 35, stock: 1000, category: 'Pain Relief', hsnCode: '30049099', gstRate: 12, status: 'live' },
            { id: '2', name: 'Azithromycin 500mg', composition: 'Azithromycin', manufacturer: 'XYZ Pharma', mrp: 200, stockistPrice: 150, stock: 500, category: 'Antibiotic', hsnCode: '30042090', gstRate: 12, status: 'live' },
            { id: '3', name: 'Omeprazole 20mg', composition: 'Omeprazole', manufacturer: 'ABC Pharma', mrp: 120, stockistPrice: 85, stock: 750, category: 'Gastro', hsnCode: '30049059', gstRate: 12, status: 'live' },
            { id: '4', name: 'Amoxicillin 500mg', composition: 'Amoxicillin', manufacturer: 'DEF Pharma', mrp: 150, stockistPrice: 110, stock: 300, category: 'Antibiotic', hsnCode: '30041019', gstRate: 12, status: 'live' },
            { id: '5', name: 'Cetirizine 10mg', composition: 'Cetirizine', manufacturer: 'XYZ Pharma', mrp: 80, stockistPrice: 60, stock: 200, category: 'Antihistamine', hsnCode: '30049099', gstRate: 12, status: 'live', minStock: 100 },
        ];

        // Sample pharmacies
        this.pharmacies = [
            { id: '1', name: 'City Pharmacy', location: 'Mumbai', phone: '+91 9876543210', email: 'city@pharmacy.com', status: 'active', pendingAmount: 5000, creditLimit: 50000, paymentDays: 15, totalOrders: 45 },
            { id: '2', name: 'Health Care Pharmacy', location: 'Delhi', phone: '+91 9876543211', email: 'health@pharmacy.com', status: 'active', pendingAmount: 3200, creditLimit: 30000, paymentDays: 7, totalOrders: 28 },
            { id: '3', name: 'Wellness Medical Store', location: 'Bangalore', phone: '+91 9876543212', email: 'wellness@pharmacy.com', status: 'active', pendingAmount: 8500, creditLimit: 75000, paymentDays: 30, totalOrders: 62 },
        ];

        // Sample orders
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        this.orders = [
            { 
                id: '1', 
                orderNumber: 'ORD-2024-001', 
                pharmacyId: '1', 
                pharmacyName: 'City Pharmacy',
                date: today.toISOString(),
                status: 'pending',
                totalAmount: 2500,
                itemsCount: 3,
                paymentStatus: 'pending',
                paymentTerms: '15 days',
                createdAt: today.toISOString(),
            },
            {
                id: '2',
                orderNumber: 'ORD-2024-002',
                pharmacyId: '2',
                pharmacyName: 'Health Care Pharmacy',
                date: yesterday.toISOString(),
                status: 'processing',
                totalAmount: 1800,
                itemsCount: 2,
                paymentStatus: 'pending',
                paymentTerms: '7 days',
                createdAt: yesterday.toISOString(),
            },
        ];

        this.saveToStorage();
    }

    // Products
    getProducts(filters?: { search?: string; category?: string; status?: string }): Product[] {
        let filtered = [...this.products];
        
        if (filters?.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(search) ||
                p.composition.toLowerCase().includes(search) ||
                p.manufacturer.toLowerCase().includes(search)
            );
        }
        
        if (filters?.category) {
            filtered = filtered.filter(p => p.category === filters.category);
        }
        
        if (filters?.status) {
            filtered = filtered.filter(p => p.status === filters.status);
        }
        
        return filtered;
    }

    getProduct(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }

    createProduct(product: Omit<Product, 'id'>): Product {
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
        };
        this.products.push(newProduct);
        this.saveToStorage();
        return newProduct;
    }

    updateProduct(id: string, updates: Partial<Product>): Product | null {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        this.products[index] = { ...this.products[index], ...updates };
        this.saveToStorage();
        return this.products[index];
    }

    deleteProduct(id: string): boolean {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return false;
        
        this.products.splice(index, 1);
        this.saveToStorage();
        return true;
    }

    // Orders
    getOrders(filters?: { pharmacyId?: string; stockistId?: string; status?: string }): Order[] {
        let filtered = [...this.orders];
        
        if (filters?.pharmacyId) {
            filtered = filtered.filter(o => o.pharmacyId === filters.pharmacyId);
        }
        
        if (filters?.stockistId) {
            filtered = filtered.filter(o => o.stockistId === filters.stockistId);
        }
        
        if (filters?.status) {
            filtered = filtered.filter(o => o.status === filters.status);
        }
        
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    getOrder(id: string): Order | undefined {
        return this.orders.find(o => o.id === id);
    }

    createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
        const orderNumber = `ORD-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, '0')}`;
        const newOrder: Order = {
            ...order,
            id: Date.now().toString(),
            orderNumber,
            createdAt: new Date().toISOString(),
        };
        this.orders.push(newOrder);
        this.saveToStorage();
        return newOrder;
    }

    updateOrderStatus(id: string, status: Order['status']): Order | null {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) return null;
        
        this.orders[index] = {
            ...this.orders[index],
            status,
            updatedAt: new Date().toISOString(),
        };
        this.saveToStorage();
        return this.orders[index];
    }

    // Pharmacies
    getPharmacies(): Pharmacy[] {
        return [...this.pharmacies];
    }

    getPharmacy(id: string): Pharmacy | undefined {
        return this.pharmacies.find(p => p.id === id);
    }

    createPharmacy(pharmacy: Omit<Pharmacy, 'id'>): Pharmacy {
        const newPharmacy: Pharmacy = {
            ...pharmacy,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        this.pharmacies.push(newPharmacy);
        this.saveToStorage();
        return newPharmacy;
    }

    updatePharmacy(id: string, updates: Partial<Pharmacy>): Pharmacy | null {
        const index = this.pharmacies.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        this.pharmacies[index] = { ...this.pharmacies[index], ...updates };
        this.saveToStorage();
        return this.pharmacies[index];
    }

    // Payments
    getPayments(filters?: { pharmacyId?: string; stockistId?: string }): Payment[] {
        let filtered = [...this.payments];
        
        if (filters?.pharmacyId) {
            filtered = filtered.filter(p => p.pharmacyId === filters.pharmacyId);
        }
        
        if (filters?.stockistId) {
            filtered = filtered.filter(p => p.stockistId === filters.stockistId);
        }
        
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    createPayment(payment: Omit<Payment, 'id'>): Payment {
        const newPayment: Payment = {
            ...payment,
            id: Date.now().toString(),
        };
        this.payments.push(newPayment);
        
        // Update pharmacy pending amount if applicable
        if (payment.pharmacyId) {
            const pharmacy = this.pharmacies.find(p => p.id === payment.pharmacyId);
            if (pharmacy) {
                pharmacy.pendingAmount = Math.max(0, pharmacy.pendingAmount - payment.amount);
                this.saveToStorage();
            }
        }
        
        this.saveToStorage();
        return newPayment;
    }

    // Dashboard Metrics
    getDashboardMetrics(role: 'stockist' | 'pharmacy', userId?: string): DashboardMetrics {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (role === 'stockist') {
            const allOrders = this.orders;
            const todayOrders = allOrders.filter(o => {
                const orderDate = new Date(o.date);
                orderDate.setHours(0, 0, 0, 0);
                return orderDate.getTime() === today.getTime();
            });
            
            const totalRevenue = allOrders
                .filter(o => o.status === 'delivered')
                .reduce((sum, o) => sum + o.totalAmount, 0);
            
            const todayRevenue = todayOrders
                .filter(o => o.status === 'delivered')
                .reduce((sum, o) => sum + o.totalAmount, 0);
            
            const pendingOrders = allOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
            const activePharmacies = this.pharmacies.filter(p => p.status === 'active').length;
            const lowStockItems = this.products.filter(p => p.stock < (p.minStock || 50)).length;
            const pendingPayments = this.pharmacies.reduce((sum, p) => sum + p.pendingAmount, 0);
            
            return {
                totalRevenue,
                revenueChange: 12.5,
                pendingOrders,
                ordersChange: 4,
                activePharmacies,
                pharmaciesChange: 3,
                lowStockItems,
                stockChange: -2,
                pendingPayments,
                paymentsChange: -5.2,
            };
        } else {
            // Pharmacy metrics
            const pharmacyOrders = this.orders.filter(o => o.pharmacyId === userId);
            const todaySales = pharmacyOrders
                .filter(o => {
                    const orderDate = new Date(o.date);
                    orderDate.setHours(0, 0, 0, 0);
                    return orderDate.getTime() === today.getTime();
                })
                .reduce((sum, o) => sum + o.totalAmount, 0);
            
            const totalProducts = this.products.length;
            const lowStockItems = this.products.filter(p => p.stock < (p.minStock || 50)).length;
            
            return {
                totalRevenue: 0,
                revenueChange: 0,
                pendingOrders: pharmacyOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length,
                ordersChange: 0,
                lowStockItems,
                stockChange: 0,
                todaySales,
                salesChange: 8.2,
                totalProducts,
                productsChange: 12,
            };
        }
    }

    // Analytics
    getAnalyticsData(role: 'stockist' | 'pharmacy', userId?: string): AnalyticsData {
        const last30Days: { date: string; amount: number }[] = [];
        const orderCounts: { date: string; count: number }[] = [];
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            let orders = this.orders;
            if (role === 'pharmacy' && userId) {
                orders = orders.filter(o => o.pharmacyId === userId);
            }
            
            const dayOrders = orders.filter(o => {
                const orderDate = o.date.split('T')[0];
                return orderDate === dateStr;
            });
            
            last30Days.push({
                date: dateStr,
                amount: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
            });
            
            orderCounts.push({
                date: dateStr,
                count: dayOrders.length,
            });
        }
        
        const productData = this.products.slice(0, 10).map(p => ({
            name: p.name,
            quantity: p.stock,
            revenue: p.stock * p.stockistPrice,
        }));
        
        let pharmacyData;
        if (role === 'stockist') {
            pharmacyData = this.pharmacies.slice(0, 10).map(p => ({
                name: p.name,
                orders: p.totalOrders || 0,
                revenue: (p.totalOrders || 0) * 2000, // Estimate
            }));
        }
        
        return {
            salesData: last30Days,
            orderData: orderCounts,
            productData,
            pharmacyData,
        };
    }

    // Cart management
    getCart(stockistId?: string, pharmacyId?: string): CartItem[] {
        if (pharmacyId) {
            return this.pharmacyCarts.get(pharmacyId) || [];
        }
        return this.stockistCart;
    }

    addToCart(item: CartItem, stockistId?: string, pharmacyId?: string): void {
        if (pharmacyId) {
            const cart = this.pharmacyCarts.get(pharmacyId) || [];
            const existing = cart.find(i => i.productId === item.productId);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                cart.push(item);
            }
            this.pharmacyCarts.set(pharmacyId, cart);
        } else {
            const existing = this.stockistCart.find(i => i.productId === item.productId);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                this.stockistCart.push(item);
            }
        }
        this.saveToStorage();
    }

    removeFromCart(productId: string, stockistId?: string, pharmacyId?: string): void {
        if (pharmacyId) {
            const cart = this.pharmacyCarts.get(pharmacyId) || [];
            const filtered = cart.filter(i => i.productId !== productId);
            this.pharmacyCarts.set(pharmacyId, filtered);
        } else {
            this.stockistCart = this.stockistCart.filter(i => i.productId !== productId);
        }
        this.saveToStorage();
    }

    clearCart(stockistId?: string, pharmacyId?: string): void {
        if (pharmacyId) {
            this.pharmacyCarts.delete(pharmacyId);
        } else {
            this.stockistCart = [];
        }
        this.saveToStorage();
    }
}

export const db = Database.getInstance();

