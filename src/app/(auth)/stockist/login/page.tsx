'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/lib/store';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function StockistLoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            login('stockist', {
                id: 'stk-123',
                name: 'MediCare Distributors',
                email: values.email,
                role: 'stockist',
                businessName: 'MediCare Distributors'
            });
            setIsLoading(false);
            router.push('/stockist/dashboard');
        }, 1500);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
            <Card className="w-full max-w-md border-t-4 border-t-[var(--stockist-primary)] shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <Building2 className="w-8 h-8 text-[var(--stockist-primary)]" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-800">Stockist Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="stockist@example.com" {...field} />
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
                                className="w-full bg-[var(--stockist-primary)] hover:bg-orange-700"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-slate-500">
                    Don't have an account? <span className="text-[var(--stockist-primary)] ml-1 cursor-pointer hover:underline">Register here</span>
                </CardFooter>
            </Card>
        </div>
    );
}
