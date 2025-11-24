'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    content: React.ReactNode;
}

interface OnboardingFlowProps {
    role: 'stockist' | 'pharmacy';
    onComplete: () => void;
    onSkip?: () => void;
}

const stockistSteps: OnboardingStep[] = [
    {
        id: 'welcome',
        title: 'Welcome to Digi Swasthya',
        description: 'Your complete stockist management solution',
        content: (
            <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-orange-600" />
                </div>
                <p className="text-slate-600">
                    Manage your inventory, track orders, and handle payments all in one place.
                </p>
            </div>
        ),
    },
    {
        id: 'features',
        title: 'Key Features',
        description: 'Everything you need to run your business',
        content: (
            <div className="space-y-4">
                <FeatureItem icon="📦" title="Inventory Management" description="Track products, batches, and stock levels" />
                <FeatureItem icon="🛒" title="Order Processing" description="Process orders from pharmacies quickly" />
                <FeatureItem icon="💰" title="Payment Tracking" description="Monitor payments and outstanding amounts" />
                <FeatureItem icon="📊" title="Analytics" description="Make data-driven decisions with insights" />
            </div>
        ),
    },
    {
        id: 'terms',
        title: 'Terms & Conditions',
        description: 'Please read and accept our terms',
        content: (
            <div className="space-y-4 max-h-64 overflow-y-auto">
                <p className="text-sm text-slate-600">
                    By using Digi Swasthya, you agree to our Terms of Service and Privacy Policy.
                    This platform is designed for pharmaceutical business use only.
                </p>
                <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Points:</h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        <li>Ensure accurate product information</li>
                        <li>Maintain compliance with pharmaceutical regulations</li>
                        <li>Protect customer data and privacy</li>
                        <li>Use the platform responsibly</li>
                    </ul>
                </div>
            </div>
        ),
    },
];

const pharmacySteps: OnboardingStep[] = [
    {
        id: 'welcome',
        title: 'Welcome to Digi Swasthya',
        description: 'Your complete pharmacy management solution',
        content: (
            <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-slate-600">
                    Order medicines, manage inventory, and handle customer billing efficiently.
                </p>
            </div>
        ),
    },
    {
        id: 'features',
        title: 'Key Features',
        description: 'Everything you need to run your pharmacy',
        content: (
            <div className="space-y-4">
                <FeatureItem icon="🛍️" title="Easy Ordering" description="Order from multiple stockists quickly" />
                <FeatureItem icon="📋" title="Prescription Upload" description="AI-powered prescription reading" />
                <FeatureItem icon="💳" title="Customer Billing" description="Generate bills and manage payments" />
                <FeatureItem icon="📦" title="Inventory Tracking" description="Monitor stock levels and expiry dates" />
            </div>
        ),
    },
    {
        id: 'terms',
        title: 'Terms & Conditions',
        description: 'Please read and accept our terms',
        content: (
            <div className="space-y-4 max-h-64 overflow-y-auto">
                <p className="text-sm text-slate-600">
                    By using Digi Swasthya, you agree to our Terms of Service and Privacy Policy.
                    This platform is designed for pharmaceutical business use only.
                </p>
                <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Points:</h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        <li>Verify prescription authenticity</li>
                        <li>Maintain compliance with pharmaceutical regulations</li>
                        <li>Protect customer data and privacy</li>
                        <li>Use the platform responsibly</li>
                    </ul>
                </div>
            </div>
        ),
    },
];

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <span className="text-2xl">{icon}</span>
            <div>
                <h4 className="font-semibold text-slate-900">{title}</h4>
                <p className="text-sm text-slate-600">{description}</p>
            </div>
        </div>
    );
}

export default function OnboardingFlow({ role, onComplete, onSkip }: OnboardingFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const steps = role === 'stockist' ? stockistSteps : pharmacySteps;
    const currentStepData = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const progress = ((currentStep + 1) / steps.length) * 100;

    const handleNext = () => {
        if (isLastStep) {
            if (acceptedTerms) {
                onComplete();
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-lg"
            >
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{currentStepData.title}</CardTitle>
                                <CardDescription>{currentStepData.description}</CardDescription>
                            </div>
                            {onSkip && (
                                <Button variant="ghost" size="icon" onClick={onSkip}>
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <Progress value={progress} className="mt-4" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStepData.content}
                            </motion.div>
                        </AnimatePresence>

                        {isLastStep && (
                            <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300"
                                />
                                <label htmlFor="terms" className="text-sm text-slate-700 cursor-pointer">
                                    I accept the Terms & Conditions
                                </label>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={isLastStep && !acceptedTerms}
                                className={role === 'stockist' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}
                            >
                                {isLastStep ? 'Get Started' : 'Next'}
                                {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

