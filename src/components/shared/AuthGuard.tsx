'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: ('stockist' | 'pharmacy' | 'admin')[];
    redirectTo?: string;
}

export default function AuthGuard({ children, allowedRoles, redirectTo }: AuthGuardProps) {
    const router = useRouter();
    const { isAuthenticated, userRole } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(redirectTo || '/');
            return;
        }

        if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
            // Redirect to role-specific dashboard
            if (userRole === 'stockist') {
                router.push('/stockist/dashboard');
            } else if (userRole === 'pharmacy') {
                router.push('/pharmacy/dashboard');
            } else {
                router.push('/');
            }
        }
    }, [isAuthenticated, userRole, allowedRoles, router, redirectTo]);

    if (!isAuthenticated || (allowedRoles && userRole && !allowedRoles.includes(userRole))) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return <>{children}</>;
}

