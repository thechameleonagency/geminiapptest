'use client';

import { useState } from 'react';
import { Upload, ScanLine, CheckCircle2, AlertCircle, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PrescriptionUploadPage() {
    const [uploading, setUploading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState<'upload' | 'review'>('upload');

    const handleUpload = () => {
        setUploading(true);
        setProgress(0);

        // Simulate upload
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    setScanning(true);
                    // Simulate scanning
                    setTimeout(() => {
                        setScanning(false);
                        setStep('review');
                    }, 2000);
                    return 100;
                }
                return prev + 20;
            });
        }, 300);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Upload Prescription</h1>
                <p className="text-slate-500">Upload a photo of the prescription to auto-add medicines.</p>
            </div>

            {step === 'upload' ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Image</CardTitle>
                        <CardDescription>Supported formats: JPG, PNG, PDF</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer min-h-[300px]"
                            onClick={handleUpload}
                        >
                            {uploading ? (
                                <div className="w-full max-w-xs space-y-4">
                                    <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                        <Upload className="h-6 w-6 text-blue-600 animate-bounce" />
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                    <p className="text-sm text-slate-500">Uploading... {progress}%</p>
                                </div>
                            ) : scanning ? (
                                <div className="w-full max-w-xs space-y-4">
                                    <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                        <ScanLine className="h-6 w-6 text-purple-600 animate-pulse" />
                                    </div>
                                    <p className="text-sm font-medium text-purple-700">AI Scanning in progress...</p>
                                    <p className="text-xs text-slate-500">Identifying medicines and dosages</p>
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 bg-blue-50 rounded-full mb-4">
                                        <Upload className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900 mb-1">Click to upload</h3>
                                    <p className="text-sm text-slate-500">or drag and drop here</p>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    <Card className="border-green-100 bg-green-50/30">
                        <CardContent className="p-4 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <p className="text-green-800 font-medium">Prescription scanned successfully! 4 medicines identified.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Identified Medicines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Medicine Name</TableHead>
                                        <TableHead>Dosage</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Augmentin 625 Duo</TableCell>
                                        <TableCell>625mg</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 border rounded-md w-fit bg-white">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">-</Button>
                                                <span className="w-6 text-center text-sm">10</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Pantocid 40</TableCell>
                                        <TableCell>40mg</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 border rounded-md w-fit bg-white">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">-</Button>
                                                <span className="w-6 text-center text-sm">10</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Dolo 650</TableCell>
                                        <TableCell>650mg</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 border rounded-md w-fit bg-white">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">-</Button>
                                                <span className="w-6 text-center text-sm">15</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <div className="mt-4 flex justify-center">
                                <Button variant="outline" className="border-dashed border-slate-300 text-slate-500">
                                    <Plus className="mr-2 h-4 w-4" /> Add Manually
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={() => setStep('upload')}>Scan Another</Button>
                        <Button className="bg-[var(--pharmacy-primary)] hover:bg-blue-700">Add to Cart</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
