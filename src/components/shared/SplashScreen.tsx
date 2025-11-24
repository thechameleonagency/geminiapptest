'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pill } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 z-50">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-3xl shadow-xl mb-6"
            >
                <Pill className="w-16 h-16 text-blue-600" />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold text-slate-800 mb-2 tracking-tight"
            >
                Digi Swasthya
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-slate-500 text-lg"
            >
                Connecting Healthcare Supply Chain
            </motion.p>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="h-1 bg-blue-600 rounded-full mt-8"
            />
        </div>
    );
}
