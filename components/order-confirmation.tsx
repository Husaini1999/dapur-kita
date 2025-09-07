'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Clock,
	MapPin,
	Phone,
	MessageCircle,
	Home,
	Star,
} from 'lucide-react';

interface OrderConfirmationProps {
	orderId: string;
}

// Fallback mock data for when no order data is available
const fallbackOrderData = {
	id: 'DK1703123456',
	status: 'confirmed',
	estimatedDelivery: '45-60 minutes',
	deliveryAddress: '123 Jalan Ampang, Kuala Lumpur 50450',
	customerPhone: '+60 12-345 6789',
	items: [
		{
			cookName: "Mak Cik's Kitchen",
			dishes: [
				{ name: 'Nasi Lemak Special', quantity: 2, price: 12.5 },
				{ name: 'Rendang Daging', quantity: 1, price: 18.0 },
			],
			cookPhone: '+60 19-876 5432',
		},
	],
	subtotal: 43.0,
	deliveryFee: 3.5,
	serviceFee: 2.0,
	total: 48.5,
	paymentMethod: 'Credit Card ending in 1234',
	orderTime: new Date().toLocaleString(),
};

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
	const searchParams = useSearchParams();

	// Try to get order data from URL parameters
	let order;
	try {
		const orderDataParam = searchParams.get('data');
		if (orderDataParam) {
			const decodedOrderData = JSON.parse(decodeURIComponent(orderDataParam));

			// Transform cart data into order confirmation format
			const itemsByCook = decodedOrderData.itemsByCook || {};
			const orderItems = Object.entries(itemsByCook).map(([cookId, items]) => {
				const itemsArray = items as any[];
				return {
					cookName: itemsArray[0]?.cookName || 'Unknown Cook',
					cookPhone: '+60 19-000 0000', // Default phone
					dishes: itemsArray.map((item) => ({
						name: item.dishName,
						quantity: item.quantity,
						price: item.price,
					})),
				};
			});

			order = {
				id: orderId,
				status: 'confirmed',
				estimatedDelivery: '30-45 minutes',
				deliveryAddress:
					decodedOrderData.customerInfo?.address || 'Address not provided',
				customerPhone:
					decodedOrderData.customerInfo?.phone || '+60 12-000 0000',
				items: orderItems,
				subtotal: decodedOrderData.subtotal || 0,
				deliveryFee: decodedOrderData.deliveryFee || 3.5,
				serviceFee: decodedOrderData.serviceFee || 2.0,
				total: decodedOrderData.total || 0,
				paymentMethod:
					decodedOrderData.paymentMethod === 'card'
						? 'Credit Card ending in 1234'
						: decodedOrderData.paymentMethod === 'ewallet'
						? "E-Wallet (GrabPay, Touch 'n Go)"
						: 'Online Banking',
				orderTime: decodedOrderData.orderTime || new Date().toLocaleString(),
			};
		} else {
			order = fallbackOrderData;
		}
	} catch (error) {
		console.error('Error parsing order data:', error);
		order = fallbackOrderData;
	}

	return (
		<div className="container max-w-4xl mx-auto py-12 px-4">
			{/* Success Header */}
			<div className="text-center space-y-6 mb-12">
				<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
					<CheckCircle className="h-12 w-12 text-green-600" />
				</div>
				<div className="space-y-2">
					<h1 className="font-serif font-bold text-3xl text-foreground">
						Order Confirmed!
					</h1>
					<p className="text-lg text-muted-foreground">
						Thank you for your order. We&apos;ve received it and the cook is
						preparing your delicious meal.
					</p>
				</div>
				<Badge
					variant="secondary"
					className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2"
				>
					Order #{order.id}
				</Badge>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Order Details */}
				<div className="lg:col-span-2 space-y-6">
					{/* Delivery Status */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Clock className="h-5 w-5 text-primary" />
								<span>Delivery Status</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">Estimated Delivery Time</div>
									<div className="text-sm text-muted-foreground">
										{order.estimatedDelivery}
									</div>
								</div>
								<Badge
									variant="secondary"
									className="bg-orange-100 text-orange-800 border-orange-200"
								>
									Preparing
								</Badge>
							</div>

							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-sm">
										Order confirmed - {order.orderTime}
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
									<span className="text-sm">Cook is preparing your food</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-muted rounded-full"></div>
									<span className="text-sm text-muted-foreground">
										Ready for pickup
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-muted rounded-full"></div>
									<span className="text-sm text-muted-foreground">
										Out for delivery
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-muted rounded-full"></div>
									<span className="text-sm text-muted-foreground">
										Delivered
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Delivery Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<MapPin className="h-5 w-5 text-primary" />
								<span>Delivery Information</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div>
								<div className="font-medium">Delivery Address</div>
								<div className="text-sm text-muted-foreground">
									{order.deliveryAddress}
								</div>
							</div>
							<div>
								<div className="font-medium">Contact Number</div>
								<div className="text-sm text-muted-foreground">
									{order.customerPhone}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Order Items */}
					<Card>
						<CardHeader>
							<CardTitle>Order Items</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{order.items.map((cookOrder, index) => (
								<div key={index} className="space-y-4">
									<div className="flex items-center justify-between">
										<h3 className="font-semibold">{cookOrder.cookName}</h3>
										<div className="flex space-x-2">
											<Button
												variant="outline"
												size="sm"
												className="bg-transparent"
											>
												<Phone className="h-3 w-3 mr-1" />
												Call
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="bg-transparent"
											>
												<MessageCircle className="h-3 w-3 mr-1" />
												Message
											</Button>
										</div>
									</div>

									<div className="space-y-2">
										{cookOrder.dishes.map((dish, dishIndex) => (
											<div
												key={dishIndex}
												className="flex justify-between text-sm"
											>
												<span>
													{dish.quantity}x {dish.name}
												</span>
												<span>
													RM {(dish.quantity * dish.price).toFixed(2)}
												</span>
											</div>
										))}
									</div>

									{index < order.items.length - 1 && <Separator />}
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Order Summary */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Subtotal</span>
									<span>RM {order.subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Delivery Fee</span>
									<span>RM {order.deliveryFee.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Service Fee</span>
									<span>RM {order.serviceFee.toFixed(2)}</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold">
									<span>Total Paid</span>
									<span>RM {order.total.toFixed(2)}</span>
								</div>
							</div>

							<div className="text-xs text-muted-foreground">
								<div className="font-medium mb-1">Payment Method</div>
								<div>{order.paymentMethod}</div>
							</div>
						</CardContent>
					</Card>

					{/* Actions */}
					<div className="space-y-3">
						<Button
							asChild
							className="w-full bg-amber-600 hover:bg-amber-700 text-white"
						>
							<Link href={`/review/${orderId}`}>
								<Star className="h-4 w-4 mr-2" />
								Rate & Review
							</Link>
						</Button>
						<Button asChild className="w-full bg-primary hover:bg-primary/90">
							<Link href="/browse">
								<Home className="h-4 w-4 mr-2" />
								Continue Shopping
							</Link>
						</Button>
						<Button
							variant="outline"
							className="w-full bg-transparent hover:bg-gray-50"
						>
							Track Order
						</Button>
						<Button
							variant="outline"
							className="w-full bg-transparent hover:bg-gray-50"
						>
							Download Receipt
						</Button>
					</div>

					{/* Support */}
					<Card>
						<CardContent className="p-4">
							<div className="text-center space-y-2">
								<div className="font-medium text-sm">Need Help?</div>
								<div className="text-xs text-muted-foreground">
									Contact our customer support team if you have any questions
									about your order.
								</div>
								<Button
									variant="outline"
									size="sm"
									className="bg-transparent hover:bg-gray-50"
								>
									Contact Support
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
