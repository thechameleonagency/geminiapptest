'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, ScanLine, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
    name: z.string().min(2, "Product name is required"),
    composition: z.string().min(2, "Composition is required"),
    manufacturer: z.string().min(2, "Manufacturer is required"),
    category: z.string().min(1, "Category is required"),
    mrp: z.string().refine((val) => !isNaN(Number(val)), "Must be a number"),
    stockistPrice: z.string().refine((val) => !isNaN(Number(val)), "Must be a number"),
    initialStock: z.string().refine((val) => !isNaN(Number(val)), "Must be a number"),
    batchNumber: z.string().min(1, "Batch number is required"),
    expiryDate: z.string().min(1, "Expiry date is required"),
});

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            composition: "",
            manufacturer: "",
            category: "",
            mrp: "",
            stockistPrice: "",
            initialStock: "",
            batchNumber: "",
            expiryDate: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setTimeout(() => {
            console.log(values);
            setIsLoading(false);
            router.push('/stockist/products');
        }, 1000);
    }

    function simulateAiFill() {
        setIsAiLoading(true);
        setTimeout(() => {
            form.reset({
                name: "Dolo 650mg",
                composition: "Paracetamol 650mg",
                manufacturer: "Micro Labs Ltd",
                category: "tablet",
                mrp: "30.50",
                stockistPrice: "24.40",
                initialStock: "100",
                batchNumber: "BATCH-AI-001",
                expiryDate: "2025-12-31",
            });
            setIsAiLoading(false);
        }, 1500);
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Add New Product</h1>
                    <p className="text-slate-500">Enter product details manually or use AI auto-fill.</p>
                </div>
                <Button
                    variant="outline"
                    onClick={simulateAiFill}
                    disabled={isAiLoading}
                    className="border-[var(--stockist-primary)] text-[var(--stockist-primary)] hover:bg-orange-50"
                >
                    {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    AI Auto-Fill
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Basic information about the medicine.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Dolo 650" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="composition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Composition</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Paracetamol 650mg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="manufacturer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Manufacturer</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Micro Labs" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="tablet">Tablet</SelectItem>
                                                    <SelectItem value="syrup">Syrup</SelectItem>
                                                    <SelectItem value="injection">Injection</SelectItem>
                                                    <SelectItem value="cream">Cream/Ointment</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="mrp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>MRP (₹)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stockistPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stockist Price (₹)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="initialStock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Initial Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="batchNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Batch Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. B12345" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="expiryDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Expiry Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" className="bg-[var(--stockist-primary)] hover:bg-orange-700" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Save Product
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
