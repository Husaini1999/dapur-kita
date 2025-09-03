'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import {
	Minus,
	Plus,
	Trash2,
	ShoppingBag,
	ArrowLeft,
	Truck,
	Clock,
} from 'lucide-react';

export function CartPage() {
	const {
		state,
		updateQuantity,
		removeItem,
		updateInstructions,
		getItemsByCook,
	} = useCart();
	const [promoCode, setPromoCode] = useState('');

	const itemsByCook = getItemsByCook();
	const deliveryFee = 3.5; // Mock delivery fee
	const serviceFee = 2.0; // Mock service fee
	const subtotal = state.total;
	const total = subtotal + deliveryFee + serviceFee;

	if (state.items.length === 0) {
		return (
			<div className="container max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
				<div className="text-center space-y-6">
					<div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
						<ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
					</div>
					<div className="space-y-2">
						<h1 className="font-serif font-bold text-2xl sm:text-3xl text-foreground">
							Your cart is empty
						</h1>
						<p className="text-muted-foreground px-4">
							Looks like you haven&apos;t added any delicious dishes to your
							cart yet.
						</p>
					</div>
					<Button asChild className="bg-primary hover:bg-primary/90">
						<Link href="/browse">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Browse Cooks
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
			<div className="flex items-center space-x-4 mb-6 sm:mb-8">
				<Button variant="ghost" asChild className="p-0">
					<Link href="/browse">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Continue Shopping
					</Link>
				</Button>
				<h1 className="font-serif font-bold text-2xl sm:text-3xl text-foreground">
					Your Cart
				</h1>
			</div>

			<div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
				{/* Cart Items */}
				<div className="lg:col-span-2 space-y-4 sm:space-y-6">
					{Object.entries(itemsByCook).map(([cookId, items]) => {
						const cookName = items[0].cookName;
						const cookTotal = items.reduce(
							(sum, item) => sum + item.price * item.quantity,
							0
						);

						return (
							<Card key={cookId}>
								<CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
									<CardTitle className="flex items-center justify-between text-base sm:text-lg">
										<span>{cookName}</span>
										<Badge
											variant="secondary"
											className="bg-primary/10 text-primary"
										>
											RM {cookTotal.toFixed(2)}
										</Badge>
									</CardTitle>
									<div className="flex items-center space-x-4 text-sm text-muted-foreground">
										<div className="flex items-center space-x-1">
											<Clock className="h-3 w-3" />
											<span>30-45 mins</span>
										</div>
										<div className="flex items-center space-x-1">
											<Truck className="h-3 w-3" />
											<span>RM 3.50 delivery</span>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
									{items.map((item) => (
										<div
											key={item.id}
											className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 border rounded-lg"
										>
											<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
												<img
													src={item.image || '/placeholder.svg'}
													alt={item.dishName}
													className="w-full h-full object-cover"
												/>
											</div>

											<div className="flex-1 space-y-2 min-w-0">
												<div className="flex items-start justify-between">
													<div className="min-w-0 flex-1">
														<h3 className="font-medium text-sm sm:text-base line-clamp-1">
															{item.dishName}
														</h3>
														<p className="text-xs sm:text-sm text-muted-foreground">
															RM {item.price.toFixed(2)} each
														</p>
													</div>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => removeItem(item.id)}
														className="text-destructive hover:text-destructive h-8 w-8 p-0 ml-2"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>

												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																updateQuantity(item.id, item.quantity - 1)
															}
															className="h-7 w-7 sm:h-8 sm:w-8 p-0"
														>
															<Minus className="h-3 w-3" />
														</Button>
														<span className="w-6 sm:w-8 text-center font-medium text-sm">
															{item.quantity}
														</span>
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																updateQuantity(item.id, item.quantity + 1)
															}
															className="h-7 w-7 sm:h-8 sm:w-8 p-0"
														>
															<Plus className="h-3 w-3" />
														</Button>
													</div>
													<div className="font-semibold text-sm sm:text-base">
														RM {(item.price * item.quantity).toFixed(2)}
													</div>
												</div>

												<div className="space-y-2">
													<label className="text-xs sm:text-sm font-medium">
														Special Instructions (Optional)
													</label>
													<Textarea
														placeholder="e.g., Extra spicy, no onions..."
														value={item.specialInstructions || ''}
														onChange={(e) =>
															updateInstructions(item.id, e.target.value)
														}
														rows={2}
														className="text-xs sm:text-sm"
													/>
												</div>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Order Summary */}
				<div className="space-y-4 sm:space-y-6">
					<Card>
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="text-base sm:text-lg">
								Order Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 px-4 sm:px-6">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Subtotal ({state.itemCount} items)</span>
									<span>RM {subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Delivery Fee</span>
									<span>RM {deliveryFee.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Service Fee</span>
									<span>RM {serviceFee.toFixed(2)}</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold">
									<span>Total</span>
									<span>RM {total.toFixed(2)}</span>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Promo Code</label>
								<div className="flex space-x-2">
									<Input
										placeholder="Enter code"
										value={promoCode}
										onChange={(e) => setPromoCode(e.target.value)}
										className="text-sm"
									/>
									<Button
										variant="outline"
										className="bg-transparent text-sm px-3"
									>
										Apply
									</Button>
								</div>
							</div>

							<Button
								asChild
								className="w-full bg-primary hover:bg-primary/90 h-11 sm:h-12"
								size="lg"
							>
								<Link href="/checkout">Proceed to Checkout</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Delivery Info */}
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
									<Truck className="h-5 w-5 text-primary" />
								</div>
								<div>
									<div className="font-medium text-sm">
										Free delivery on orders over RM 30
									</div>
									<div className="text-xs text-muted-foreground">
										Add RM {Math.max(0, 30 - subtotal).toFixed(2)} more to
										qualify
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
