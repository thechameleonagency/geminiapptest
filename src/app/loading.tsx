import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
