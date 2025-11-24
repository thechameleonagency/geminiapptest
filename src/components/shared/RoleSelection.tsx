'use client';

import { motion } from 'framer-motion';
import { Building2, Store, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RoleSelection() {
    const router = useRouter();
    const { login } = useAuthStore();

    const handleRoleSelect = (role: 'stockist' | 'pharmacy') => {
        // In a real app, this would redirect to login, but for prototype we might set role context
        // For now, let's redirect to the respective login pages
        router.push(`/${role}/login`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome to Digi Swasthya</h2>
                <p className="text-slate-600 max-w-md mx-auto">
                    Please select your role to continue to the platform designed specifically for your business needs.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Stockist Card */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Card
                        className="cursor-pointer hover:shadow-xl transition-all border-l-4 border-l-[var(--stockist-primary)] h-full"
                        onClick={() => handleRoleSelect('stockist')}
                    >
                        <CardContent className="p-8 flex flex-col items-center text-center h-full justify-between">
                            <div>
                                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6 mx-auto">
                                    <Building2 className="w-10 h-10 text-[var(--stockist-primary)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">I am a Stockist</h3>
                                <p className="text-slate-500 mb-8">
                                    Manage inventory, receive orders from pharmacies, and track payments efficiently.
                                </p>
                            </div>
                            <Button
                                className="w-full bg-[var(--stockist-primary)] hover:bg-orange-700 text-white"
                                size="lg"
                            >
                                Continue as Stockist <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Pharmacy Card */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Card
                        className="cursor-pointer hover:shadow-xl transition-all border-l-4 border-l-[var(--pharmacy-primary)] h-full"
                        onClick={() => handleRoleSelect('pharmacy')}
                    >
                        <CardContent className="p-8 flex flex-col items-center text-center h-full justify-between">
                            <div>
                                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                                    <Store className="w-10 h-10 text-[var(--pharmacy-primary)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">I am a Pharmacy</h3>
                                <p className="text-slate-500 mb-8">
                                    Order medicines, manage your store inventory, and handle customer billing.
                                </p>
                            </div>
                            <Button
                                className="w-full bg-[var(--pharmacy-primary)] hover:bg-blue-700 text-white"
                                size="lg"
                            >
                                Continue as Pharmacy <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
