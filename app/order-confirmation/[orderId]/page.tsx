import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { OrderConfirmation } from '@/components/order-confirmation';

interface OrderConfirmationPageProps {
	params: Promise<{
		orderId: string;
	}>;
}

export default async function OrderConfirmationPage({
	params,
}: OrderConfirmationPageProps) {
	const { orderId } = await params;
	return (
		<main className="min-h-screen bg-background">
			<Navigation />
			<Suspense
				fallback={
					<div className="container max-w-4xl mx-auto py-12 px-4 text-center">
						Loading order confirmation...
					</div>
				}
			>
				<OrderConfirmation orderId={orderId} />
			</Suspense>
		</main>
	);
}
