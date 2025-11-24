'use client';

import { User, Building, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function StockistSettingsPage() {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Settings</h1>
                <p className="text-slate-500">Manage your account and preferences.</p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="business">Business Details</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input defaultValue="Rajesh Gupta" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input defaultValue="rajesh@medicare.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input defaultValue="+91 9876543210" />
                                </div>
                            </div>
                            <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="business" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Manage your company details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Business Name</Label>
                                <Input defaultValue="MediCare Distributors" />
                            </div>
                            <div className="space-y-2">
                                <Label>GSTIN</Label>
                                <Input defaultValue="29ABCDE1234F1Z5" />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input defaultValue="123, Industrial Area, Bangalore" />
                            </div>
                            <Button className="bg-[var(--stockist-primary)] hover:bg-orange-700">Update Details</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>New Orders</Label>
                                    <p className="text-sm text-slate-500">Receive alerts for new orders.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Low Stock Alerts</Label>
                                    <p className="text-sm text-slate-500">Get notified when stock is low.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Payment Received</Label>
                                    <p className="text-sm text-slate-500">Alerts for new payments.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your password and account access.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-start">Change Password</Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Sign Out
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
