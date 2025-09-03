import { ReviewForm } from '@/components/review-form';

export default async function ReviewPage({
	params,
}: {
	params: Promise<{ orderId: string }>;
}) {
	const { orderId } = await params;
	return (
		<div className="min-h-screen bg-coconut-white">
			<div className="container mx-auto px-4 py-8">
				<ReviewForm orderId={orderId} />
			</div>
		</div>
	);
}
