'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Store, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/lib/store';

const formSchema = z.object({
    identifier: z.string().min(3, { message: "Please enter a valid ID, Email or Mobile" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function PharmacyLoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            login('pharmacy', {
                id: 'ph-456',
                name: 'City Pharmacy',
                email: values.identifier.includes('@') ? values.identifier : 'pharmacy@example.com',
                role: 'pharmacy',
                businessName: 'City Pharmacy'
            });
            setIsLoading(false);
            router.push('/pharmacy/dashboard');
        }, 1500);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
            <Card className="w-full max-w-md border-t-4 border-t-[var(--pharmacy-primary)] shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Store className="w-8 h-8 text-[var(--pharmacy-primary)]" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-800">Pharmacy Login</CardTitle>
                    <CardDescription>
                        Access your store account to order medicines
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pharmacy ID / Email / Mobile</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your ID or Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-[var(--pharmacy-primary)] hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-slate-500">
                    New to Digi Swasthya? <span className="text-[var(--pharmacy-primary)] ml-1 cursor-pointer hover:underline">Register your pharmacy</span>
                </CardFooter>
            </Card>
        </div>
    );
}
