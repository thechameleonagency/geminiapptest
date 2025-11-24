'use client';

import { useState } from 'react';
import { Wand2, Send, Check, AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function QuickOrderPage() {
    const [orderText, setOrderText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedItems, setProcessedItems] = useState<any[]>([]);
    const [step, setStep] = useState<'input' | 'review'>('input');

    const handleProcess = () => {
        if (!orderText.trim()) return;

        setIsProcessing(true);
        // Simulate AI processing
        setTimeout(() => {
            setProcessedItems([
                { id: 1, name: 'Dolo 650mg', quantity: 20, unit: 'strips', status: 'available', confidence: 'high' },
                { id: 2, name: 'Azithral 500mg', quantity: 5, unit: 'boxes', status: 'available', confidence: 'high' },
                { id: 3, name: 'Pan 40', quantity: 10, unit: 'strips', status: 'low_stock', confidence: 'medium' },
                { id: 4, name: 'Volini Spray', quantity: 2, unit: 'pieces', status: 'available', confidence: 'high' },
            ]);
            setIsProcessing(false);
            setStep('review');
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Quick Order</h1>
                <p className="text-slate-500">Paste order text from WhatsApp or Email to auto-create orders.</p>
            </div>

            {step === 'input' && (
                <Card className="border-2 border-blue-50 shadow-lg">
                    <CardHeader className="bg-blue-50/50">
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                            <Wand2 className="h-5 w-5" />
                            AI Order Parser
                        </CardTitle>
                        <CardDescription>
                            Paste the raw order text below. Our AI will identify products and quantities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Textarea
                            placeholder="Example: Need 20 strips of Dolo 650, 5 boxes of Azithral 500, and 10 Pan 40."
                            className="min-h-[200px] text-lg p-4 resize-none focus:ring-blue-500"
                            value={orderText}
                            onChange={(e) => setOrderText(e.target.value)}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between bg-slate-50 p-4 rounded-b-xl">
                        <Button variant="ghost" onClick={() => setOrderText('')}>Clear</Button>
                        <Button
                            onClick={handleProcess}
                            disabled={isProcessing || !orderText.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Process Order <Wand2 className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {step === 'review' && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Review Items</CardTitle>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <Check className="mr-1 h-3 w-3" /> AI Confidence: 98%
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {processedItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-6 w-6">-</Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button variant="outline" size="icon" className="h-6 w-6">+</Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>
                                                {item.status === 'low_stock' ? (
                                                    <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">Low Stock</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Available</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="mt-4 flex justify-center">
                                <Button variant="outline" className="border-dashed border-slate-300 text-slate-500 hover:text-slate-700">
                                    <Plus className="mr-2 h-4 w-4" /> Add Missing Item
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pharmacy Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Pharmacy</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select pharmacy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ph1">City Pharmacy</SelectItem>
                                        <SelectItem value="ph2">Wellness Chemist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Payment Terms</label>
                                <Select defaultValue="credit_15">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select terms" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                                        <SelectItem value="credit_7">7 Days Credit</SelectItem>
                                        <SelectItem value="credit_15">15 Days Credit</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 bg-slate-50 p-4 rounded-b-xl">
                            <Button variant="outline" onClick={() => setStep('input')}>Back to Edit</Button>
                            <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">
                                Confirm Order <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
