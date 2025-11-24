'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function BulkUploadPage() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleUpload = () => {
        setUploading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    setCompleted(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Bulk Upload</h1>
                <p className="text-slate-500">Upload multiple products using Excel or CSV.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>
                        <CardDescription>Drag and drop your file here or click to browse.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!completed ? (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={handleUpload}>
                                <div className="p-4 bg-blue-50 rounded-full mb-4">
                                    <Upload className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-1">Click to upload</h3>
                                <p className="text-sm text-slate-500 mb-4">XLSX or CSV files up to 10MB</p>
                                {uploading && (
                                    <div className="w-full max-w-xs mt-4 space-y-2">
                                        <Progress value={progress} className="h-2" />
                                        <p className="text-xs text-slate-500">Uploading... {progress}%</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="border-2 border-green-100 bg-green-50 rounded-xl p-10 flex flex-col items-center justify-center text-center">
                                <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-lg font-medium text-green-900 mb-1">Upload Successful</h3>
                                <p className="text-sm text-green-700 mb-6">Processed 145 products successfully.</p>
                                <Button onClick={() => setCompleted(false)} variant="outline" className="bg-white">Upload Another</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Instructions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1"><FileSpreadsheet className="h-5 w-5 text-green-600" /></div>
                                <div>
                                    <p className="font-medium text-sm text-slate-900">Download Template</p>
                                    <p className="text-xs text-slate-500 mb-2">Use our standard template for error-free uploads.</p>
                                    <Button variant="outline" size="sm" className="w-full">Download .XLSX</Button>
                                </div>
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <h4 className="text-sm font-medium mb-2">Important Notes:</h4>
                                <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                                    <li>Do not change column headers</li>
                                    <li>Date format should be DD-MM-YYYY</li>
                                    <li>Batch number is mandatory</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
