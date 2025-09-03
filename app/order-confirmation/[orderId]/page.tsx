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
			<OrderConfirmation orderId={orderId} />
		</main>
	);
}
