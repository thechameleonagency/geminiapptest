export type UserRole = 'stockist' | 'pharmacy' | 'admin';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    businessName?: string;
    avatarUrl?: string;
}

export interface Product {
    id: string;
    name: string;
    composition: string;
    manufacturer: string;
    mrp: number;
    stockistPrice: number;
    stock: number;
    expiryDate?: string;
    batchNumber?: string;
}

export interface Order {
    id: string;
    pharmacyName: string;
    date: string;
    status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
    totalAmount: number;
    itemsCount: number;
}

export interface Pharmacy {
    id: string;
    name: string;
    location: string;
    status: 'active' | 'inactive';
    lastOrderDate?: string;
    pendingAmount: number;
}
