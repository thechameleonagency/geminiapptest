import { Product, Order, Pharmacy } from './types';

export const mockProducts: Product[] = [
    {
        id: 'p1',
        name: 'Dolo 650mg',
        composition: 'Paracetamol 650mg',
        manufacturer: 'Micro Labs',
        mrp: 30.50,
        stockistPrice: 24.40,
        stock: 1500,
        expiryDate: '2024-12-31',
        batchNumber: 'B12345'
    },
    {
        id: 'p2',
        name: 'Azithral 500mg',
        composition: 'Azithromycin 500mg',
        manufacturer: 'Alembic',
        mrp: 119.00,
        stockistPrice: 95.20,
        stock: 450,
        expiryDate: '2025-06-30',
        batchNumber: 'A98765'
    },
    {
        id: 'p3',
        name: 'Pan 40',
        composition: 'Pantoprazole 40mg',
        manufacturer: 'Alkem',
        mrp: 155.00,
        stockistPrice: 124.00,
        stock: 800,
        expiryDate: '2024-10-15',
        batchNumber: 'P45678'
    },
    {
        id: 'p4',
        name: 'Zincovit',
        composition: 'Multivitamin & Mineral',
        manufacturer: 'Apex',
        mrp: 105.00,
        stockistPrice: 84.00,
        stock: 2000,
        expiryDate: '2025-03-20',
        batchNumber: 'Z11223'
    },
    {
        id: 'p5',
        name: 'Shelcal 500',
        composition: 'Calcium + Vitamin D3',
        manufacturer: 'Torrent',
        mrp: 118.00,
        stockistPrice: 94.40,
        stock: 1200,
        expiryDate: '2025-08-10',
        batchNumber: 'S33445'
    }
];

export const mockOrders: Order[] = [
    {
        id: 'ord-1001',
        pharmacyName: 'City Pharmacy',
        date: '2023-11-24',
        status: 'processing',
        totalAmount: 12450,
        itemsCount: 24
    },
    {
        id: 'ord-1002',
        pharmacyName: 'Wellness Chemist',
        date: '2023-11-24',
        status: 'pending',
        totalAmount: 5600,
        itemsCount: 8
    },
    {
        id: 'ord-1003',
        pharmacyName: 'Apollo Pharmacy',
        date: '2023-11-23',
        status: 'dispatched',
        totalAmount: 28900,
        itemsCount: 45
    }
];

export const mockPharmacies: Pharmacy[] = [
    {
        id: 'ph-1',
        name: 'City Pharmacy',
        location: 'Indiranagar, Bangalore',
        status: 'active',
        lastOrderDate: '2023-11-24',
        pendingAmount: 12450
    },
    {
        id: 'ph-2',
        name: 'Wellness Chemist',
        location: 'Koramangala, Bangalore',
        status: 'active',
        lastOrderDate: '2023-11-24',
        pendingAmount: 5600
    },
    {
        id: 'ph-3',
        name: 'HealthPlus',
        location: 'HSR Layout, Bangalore',
        status: 'inactive',
        lastOrderDate: '2023-10-15',
        pendingAmount: 0
    }
];
