'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export function CustomerLogin() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const router = useRouter();
	const searchParams = useSearchParams();
	const isRegistered = searchParams.get('registered') === 'true';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Mock login - in real app would call API
		console.log('Customer login:', formData);
		router.push('/browse');
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="max-w-md mx-auto">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
							Welcome Back
						</h1>
						<p className="text-lg text-muted-foreground">
							Sign in to continue ordering delicious meals
						</p>
					</div>

					{/* Registration Success Alert */}
					{isRegistered && (
						<Alert className="mb-6 border-green-200 bg-green-50">
							<CheckCircle className="h-4 w-4 text-green-600" />
							<AlertDescription className="text-green-800">
								Account created successfully! Please sign in to continue.
							</AlertDescription>
						</Alert>
					)}

					<Card className="shadow-lg border-0 bg-white">
						<CardHeader className="space-y-1 pb-6">
							<CardTitle className="text-2xl font-semibold text-center">
								Sign In
							</CardTitle>
							<CardDescription className="text-center">
								Enter your credentials to access your account
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										placeholder="ahmad@example.com"
										value={formData.email}
										onChange={(e) => handleInputChange('email', e.target.value)}
										required
										className="h-11"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? 'text' : 'password'}
											placeholder="Enter your password"
											value={formData.password}
											onChange={(e) =>
												handleInputChange('password', e.target.value)
											}
											required
											className="h-11 pr-10"
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<Link
										href="/forgot-password"
										className="text-sm text-primary hover:underline"
									>
										Forgot password?
									</Link>
								</div>

								<Button
									type="submit"
									className="w-full h-12 text-base bg-primary hover:bg-primary/90"
								>
									Sign In
								</Button>
							</form>

							<div className="text-center space-y-4">
								<p className="text-sm text-muted-foreground">
									Don&apos;t have an account?{' '}
									<Link
										href="/register"
										className="text-primary hover:underline font-medium"
									>
										Create one here
									</Link>
								</p>

								<Separator />

								<p className="text-sm text-muted-foreground">
									Want to become a cook?{' '}
									<Link
										href="/register-cook"
										className="text-primary hover:underline font-medium"
									>
										Join as a Cook
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
