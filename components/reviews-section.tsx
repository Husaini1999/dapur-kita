import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface ReviewsSectionProps {
	cookId: number;
}

// Mock reviews data
const mockReviews = [
	{
		id: 1,
		customerName: 'Ahmad Rahman',
		avatar: '/customer-1.png',
		rating: 5,
		date: '2 days ago',
		comment:
			'Amazing nasi lemak! The sambal was perfectly spicy and the rice was so fragrant. Will definitely order again!',
		dishes: ['Nasi Lemak Special'],
	},
	{
		id: 2,
		customerName: 'Sarah Lee',
		avatar: '/customer-2.png',
		rating: 4,
		date: '1 week ago',
		comment:
			'Great rendang, very authentic taste. Delivery was on time and food was still warm. Highly recommended!',
		dishes: ['Rendang Daging', 'Roti Canai'],
	},
	{
		id: 3,
		customerName: 'David Tan',
		avatar: '/customer-3.png',
		rating: 5,
		date: '2 weeks ago',
		comment:
			"Mak Cik's cooking reminds me of my grandmother's. The ayam pongteh was incredible - so flavorful and tender.",
		dishes: ['Ayam Pongteh'],
	},
];

export function ReviewsSection({}: ReviewsSectionProps) {
	return (
		<div className="space-y-6">
			{/* Reviews Summary */}
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center space-x-6">
						<div className="text-center">
							<div className="text-4xl font-bold text-primary">4.8</div>
							<div className="flex items-center justify-center space-x-1 mt-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<div className="text-sm text-muted-foreground mt-1">
								127 reviews
							</div>
						</div>
						<div className="flex-1 space-y-2">
							{[5, 4, 3, 2, 1].map((rating) => (
								<div key={rating} className="flex items-center space-x-3">
									<div className="flex items-center space-x-1 w-12">
										<span className="text-sm">{rating}</span>
										<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
									</div>
									<div className="flex-1 bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{
												width: `${
													rating === 5
														? 70
														: rating === 4
														? 20
														: rating === 3
														? 7
														: rating === 2
														? 2
														: 1
												}%`,
											}}
										/>
									</div>
									<div className="text-sm text-muted-foreground w-8">
										{rating === 5
											? 89
											: rating === 4
											? 25
											: rating === 3
											? 9
											: rating === 2
											? 3
											: 1}
									</div>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Individual Reviews */}
			<div className="space-y-4">
				{mockReviews.map((review) => (
					<Card key={review.id}>
						<CardContent className="p-6">
							<div className="flex items-start space-x-4">
								<Avatar className="w-10 h-10">
									<AvatarImage
										src={review.avatar || '/placeholder.svg'}
										alt={review.customerName}
									/>
									<AvatarFallback>
										{review.customerName.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-3">
									<div className="flex items-center justify-between">
										<div>
											<div className="font-medium">{review.customerName}</div>
											<div className="flex items-center space-x-2 mt-1">
												<div className="flex items-center space-x-1">
													{[1, 2, 3, 4, 5].map((star) => (
														<Star
															key={star}
															className={`h-3 w-3 ${
																star <= review.rating
																	? 'fill-yellow-400 text-yellow-400'
																	: 'text-muted-foreground'
															}`}
														/>
													))}
												</div>
												<span className="text-sm text-muted-foreground">
													{review.date}
												</span>
											</div>
										</div>
									</div>

									<p className="text-muted-foreground leading-relaxed">
										{review.comment}
									</p>

									<div className="flex flex-wrap gap-2">
										{review.dishes.map((dish) => (
											<Badge key={dish} variant="secondary" className="text-xs">
												{dish}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
