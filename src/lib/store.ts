import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole, UserProfile, Product, Order, Pharmacy, CartItem } from './types';
import { db } from './services/api';

interface AuthState {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    userProfile: UserProfile | null;
    token?: string;
    login: (role: UserRole, profile: UserProfile, token?: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            userRole: null,
            userProfile: null,
            token: undefined,
            login: (role, profile, token) => set({ 
                isAuthenticated: true, 
                userRole: role, 
                userProfile: profile,
                token 
            }),
            logout: () => set({ 
                isAuthenticated: false, 
                userRole: null, 
                userProfile: null,
                token: undefined 
            }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

interface UIState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

interface OnboardingState {
    hasCompletedOnboarding: boolean;
    setOnboardingComplete: (completed: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            hasCompletedOnboarding: false,
            setOnboardingComplete: (completed) => set({ hasCompletedOnboarding: completed }),
        }),
        {
            name: 'onboarding-storage',
        }
    )
);

// Products Store
interface ProductsState {
    products: Product[];
    loading: boolean;
    filters: { search?: string; category?: string; status?: string };
    fetchProducts: () => void;
    setFilters: (filters: { search?: string; category?: string; status?: string }) => void;
    addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<Product | null>;
    deleteProduct: (id: string) => Promise<boolean>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    loading: false,
    filters: {},
    fetchProducts: async () => {
        set({ loading: true });
        const { filters } = get();
        const products = db.getProducts(filters);
        set({ products, loading: false });
    },
    setFilters: (filters) => {
        set({ filters });
        get().fetchProducts();
    },
    addProduct: async (product) => {
        const newProduct = db.createProduct(product);
        get().fetchProducts();
        return newProduct;
    },
    updateProduct: async (id, updates) => {
        const updated = db.updateProduct(id, updates);
        get().fetchProducts();
        return updated;
    },
    deleteProduct: async (id) => {
        const deleted = db.deleteProduct(id);
        get().fetchProducts();
        return deleted;
    },
}));

// Orders Store
interface OrdersState {
    orders: Order[];
    loading: boolean;
    filters: { pharmacyId?: string; stockistId?: string; status?: string };
    fetchOrders: () => void;
    setFilters: (filters: { pharmacyId?: string; stockistId?: string; status?: string }) => void;
    createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
    updateOrderStatus: (id: string, status: Order['status']) => Promise<Order | null>;
    getOrder: (id: string) => Order | undefined;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
    orders: [],
    loading: false,
    filters: {},
    fetchOrders: async () => {
        set({ loading: true });
        const { filters } = get();
        const orders = db.getOrders(filters);
        set({ orders, loading: false });
    },
    setFilters: (filters) => {
        set({ filters });
        get().fetchOrders();
    },
    createOrder: async (order) => {
        const newOrder = db.createOrder(order);
        get().fetchOrders();
        return newOrder;
    },
    updateOrderStatus: async (id, status) => {
        const updated = db.updateOrderStatus(id, status);
        get().fetchOrders();
        return updated;
    },
    getOrder: (id) => {
        return db.getOrder(id);
    },
}));

// Pharmacies Store
interface PharmaciesState {
    pharmacies: Pharmacy[];
    loading: boolean;
    fetchPharmacies: () => void;
    getPharmacy: (id: string) => Pharmacy | undefined;
    addPharmacy: (pharmacy: Omit<Pharmacy, 'id'>) => Promise<Pharmacy>;
    updatePharmacy: (id: string, updates: Partial<Pharmacy>) => Promise<Pharmacy | null>;
}

export const usePharmaciesStore = create<PharmaciesState>((set, get) => ({
    pharmacies: [],
    loading: false,
    fetchPharmacies: async () => {
        set({ loading: true });
        const pharmacies = db.getPharmacies();
        set({ pharmacies, loading: false });
    },
    getPharmacy: (id) => {
        return db.getPharmacy(id);
    },
    addPharmacy: async (pharmacy) => {
        const newPharmacy = db.createPharmacy(pharmacy);
        get().fetchPharmacies();
        return newPharmacy;
    },
    updatePharmacy: async (id, updates) => {
        const updated = db.updatePharmacy(id, updates);
        get().fetchPharmacies();
        return updated;
    },
}));

// Cart Store
interface CartState {
    items: CartItem[];
    loading: boolean;
    fetchCart: (stockistId?: string, pharmacyId?: string) => void;
    addToCart: (item: CartItem, stockistId?: string, pharmacyId?: string) => void;
    removeFromCart: (productId: string, stockistId?: string, pharmacyId?: string) => void;
    updateQuantity: (productId: string, quantity: number, stockistId?: string, pharmacyId?: string) => void;
    clearCart: (stockistId?: string, pharmacyId?: string) => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => {
    const fetchCart = (stockistId?: string, pharmacyId?: string) => {
        const items = db.getCart(stockistId, pharmacyId);
        set({ items });
    };

    return {
        items: [],
        loading: false,
        fetchCart,
        addToCart: (item, stockistId, pharmacyId) => {
            db.addToCart(item, stockistId, pharmacyId);
            get().fetchCart(stockistId, pharmacyId);
        },
        removeFromCart: (productId, stockistId, pharmacyId) => {
            db.removeFromCart(productId, stockistId, pharmacyId);
            get().fetchCart(stockistId, pharmacyId);
        },
        updateQuantity: (productId, quantity, stockistId, pharmacyId) => {
            const items = get().items;
            const item = items.find(i => i.productId === productId);
            if (item) {
                if (quantity <= 0) {
                    get().removeFromCart(productId, stockistId, pharmacyId);
                } else {
                    item.quantity = quantity;
                    db.addToCart(item, stockistId, pharmacyId);
                    get().fetchCart(stockistId, pharmacyId);
                }
            }
        },
        clearCart: (stockistId, pharmacyId) => {
            db.clearCart(stockistId, pharmacyId);
            get().fetchCart(stockistId, pharmacyId);
        },
        getTotal: () => {
            return get().items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        },
        getItemCount: () => {
            return get().items.reduce((sum, item) => sum + item.quantity, 0);
        },
    };
});

// Payments Store
interface PaymentsState {
    payments: Payment[];
    loading: boolean;
    filters: { pharmacyId?: string; stockistId?: string };
    fetchPayments: () => void;
    setFilters: (filters: { pharmacyId?: string; stockistId?: string }) => void;
    createPayment: (payment: Omit<Payment, 'id'>) => Promise<Payment>;
}

export const usePaymentsStore = create<PaymentsState>((set, get) => ({
    payments: [],
    loading: false,
    filters: {},
    fetchPayments: async () => {
        set({ loading: true });
        const { filters } = get();
        const payments = db.getPayments(filters);
        set({ payments, loading: false });
    },
    setFilters: (filters) => {
        set({ filters });
        get().fetchPayments();
    },
    createPayment: async (payment) => {
        const newPayment = db.createPayment(payment);
        get().fetchPayments();
        return newPayment;
    },
}));

// Dashboard Store
interface DashboardState {
    metrics: DashboardMetrics | null;
    analytics: AnalyticsData | null;
    loading: boolean;
    fetchMetrics: (role: 'stockist' | 'pharmacy', userId?: string) => void;
    fetchAnalytics: (role: 'stockist' | 'pharmacy', userId?: string) => void;
}

import { AnalyticsData, DashboardMetrics } from './types';

export const useDashboardStore = create<DashboardState>((set) => ({
    metrics: null,
    analytics: null,
    loading: false,
    fetchMetrics: (role, userId) => {
        set({ loading: true });
        const metrics = db.getDashboardMetrics(role, userId);
        set({ metrics, loading: false });
    },
    fetchAnalytics: (role, userId) => {
        set({ loading: true });
        const analytics = db.getAnalyticsData(role, userId);
        set({ analytics, loading: false });
    },
}));
