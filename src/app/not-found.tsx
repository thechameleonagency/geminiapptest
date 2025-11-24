import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
            <div className="bg-white p-8 rounded-full shadow-lg mb-6">
                <FileQuestion className="h-16 w-16 text-slate-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Page Not Found</h1>
            <p className="text-slate-500 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link href="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
