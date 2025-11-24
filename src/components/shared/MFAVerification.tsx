'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface MFAVerificationProps {
    role: 'stockist' | 'pharmacy';
    method: 'sms' | 'email' | 'authenticator';
    phoneOrEmail?: string;
    onVerify: (code: string) => Promise<boolean>;
    onResend: () => Promise<void>;
    onCancel?: () => void;
}

export default function MFAVerification({
    role,
    method,
    phoneOrEmail,
    onVerify,
    onResend,
    onCancel,
}: MFAVerificationProps) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        // Resend timer
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only numbers

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        setError('');

        // Auto-submit when all 6 digits are entered
        if (index === 5 && value) {
            handleVerify(newCode.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
            setCode(newCode);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
            if (pastedData.length === 6) {
                handleVerify(pastedData);
            }
        }
    };

    const handleVerify = async (verificationCode: string) => {
        if (verificationCode.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            const success = await onVerify(verificationCode);
            if (!success) {
                setError('Invalid code. Please try again.');
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setCanResend(false);
        setResendTimer(60);
        setCode(['', '', '', '', '', '']);
        setError('');
        inputRefs.current[0]?.focus();
        await onResend();
    };

    const getMethodLabel = () => {
        switch (method) {
            case 'sms':
                return 'SMS';
            case 'email':
                return 'Email';
            case 'authenticator':
                return 'Authenticator App';
            default:
                return '';
        }
    };

    const maskedContact = phoneOrEmail
        ? method === 'sms'
            ? `****${phoneOrEmail.slice(-4)}`
            : phoneOrEmail.split('@')[0].slice(0, 2) + '***@' + phoneOrEmail.split('@')[1]
        : '';

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md"
            >
                <Card>
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>
                            Enter the 6-digit code sent to {maskedContact} via {getMethodLabel()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-center gap-2">
                            {code.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className="w-12 h-14 text-center text-xl font-semibold"
                                    disabled={isVerifying}
                                />
                            ))}
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
                            >
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm">{error}</span>
                            </motion.div>
                        )}

                        <div className="text-center space-y-4">
                            <p className="text-sm text-slate-600">
                                Didn't receive the code?{' '}
                                {canResend ? (
                                    <button
                                        onClick={handleResend}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Resend Code
                                    </button>
                                ) : (
                                    <span className="text-slate-400">
                                        Resend in {resendTimer}s
                                    </span>
                                )}
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                {onCancel && (
                                    <Button variant="outline" onClick={onCancel} disabled={isVerifying}>
                                        Cancel
                                    </Button>
                                )}
                                <Button
                                    onClick={() => handleVerify(code.join(''))}
                                    disabled={code.some((d) => !d) || isVerifying}
                                    className={role === 'stockist' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}
                                >
                                    {isVerifying ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Verify
                                            <CheckCircle2 className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {method === 'authenticator' && (
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-slate-700">
                                    <strong>Using Authenticator App?</strong>
                                    <br />
                                    Open your authenticator app and enter the 6-digit code displayed.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

