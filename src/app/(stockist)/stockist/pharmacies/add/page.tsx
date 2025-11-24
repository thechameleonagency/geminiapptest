'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
    name: z.string().min(2, "Pharmacy name is required"),
    ownerName: z.string().min(2, "Owner name is required"),
    mobile: z.string().min(10, "Valid mobile number is required"),
    email: z.string().email().optional().or(z.literal('')),
    gstin: z.string().min(15, "GSTIN must be 15 characters").optional().or(z.literal('')),
    drugLicense: z.string().min(5, "Drug License is required"),
    address: z.string().min(10, "Full address is required"),
    creditLimit: z.string().refine((val) => !isNaN(Number(val)), "Must be a number"),
    paymentTerms: z.string().min(1, "Payment terms are required"),
});

export default function AddPharmacyPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            ownerName: "",
            mobile: "",
            email: "",
            gstin: "",
            drugLicense: "",
            address: "",
            creditLimit: "50000",
            paymentTerms: "15_days",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setTimeout(() => {
            console.log(values);
            setIsLoading(false);
            router.push('/stockist/pharmacies');
        }, 1000);
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Add New Pharmacy</h1>
                <p className="text-slate-500">Onboard a new pharmacy to your network.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pharmacy Details</CardTitle>
                    <CardDescription>Enter business and contact information.</CardDescription>
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
                                            <FormLabel>Pharmacy Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. City Pharmacy" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ownerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Owner Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Rajesh Kumar" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 9876543210" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. city@pharmacy.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="drugLicense"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Drug License Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. KA-B2-12345" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gstin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>GSTIN (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 29ABCDE1234F1Z5" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Shop No, Street, Area, City, Pincode" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="border-t border-slate-100 pt-6 mt-6">
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                    Credit & Payment Terms
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="creditLimit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Credit Limit (₹)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentTerms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Terms</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select terms" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                                                        <SelectItem value="7_days">7 Days Credit</SelectItem>
                                                        <SelectItem value="15_days">15 Days Credit</SelectItem>
                                                        <SelectItem value="30_days">30 Days Credit</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" className="bg-[var(--stockist-primary)] hover:bg-orange-700" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Add Pharmacy
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
