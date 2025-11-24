'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Set initial status
        setIsOnline(navigator.onLine);

        // Listen for online/offline events
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 bg-orange-500 text-white px-4 py-3 z-50 shadow-lg"
                >
                    <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
                        <WifiOff className="h-5 w-5" />
                        <span className="font-medium">You're offline. Some features may be limited.</span>
                    </div>
                </motion.div>
            )}
            {isOnline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 bg-green-500 text-white px-4 py-3 z-50 shadow-lg"
                >
                    <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
                        <Wifi className="h-5 w-5" />
                        <span className="font-medium">Back online!</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

