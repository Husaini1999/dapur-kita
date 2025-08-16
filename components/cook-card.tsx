'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Truck, ShoppingBag } from 'lucide-react';

interface Cook {
	id: number;
	name: string;
	ownerName: string;
	image: string;
	coverImage: string;
	rating: number;
	reviewCount: number;
	location: string;
	distance: string;
	specialties: string[];
	deliveryTime: string;
	deliveryFee: number;
	minOrder: number;
	isOpen: boolean;
	featuredDishes: Array<{
		name: string;
		price: number;
		image: string;
	}>;
	totalOrders: number;
	joinedDate: string;
}

interface CookCardProps {
	cook: Cook;
}

export function CookCard({ cook }: CookCardProps) {
	return (
		<Card className="overflow-hidden hover:shadow-lg transition-shadow group">
			{/* Cover Image */}
			<div className="relative aspect-video">
				<img
					src={
						cook.coverImage ||
						'/placeholder.svg?height=200&width=400&query=kitchen'
					}
					alt={`${cook.name} kitchen`}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = '/modern-minimalist-kitchen.png';
					}}
				/>
				<div className="absolute top-2 sm:top-3 left-2 sm:left-3">
					<Badge
						variant={cook.isOpen ? 'secondary' : 'destructive'}
						className={
							cook.isOpen
								? 'bg-green-100 text-green-800 border-green-200 text-xs'
								: 'bg-amber-100 text-amber-800 border-amber-200 text-xs'
						}
					>
						{cook.isOpen ? 'Open' : 'Closed'}
					</Badge>
				</div>
				<div className="absolute top-2 sm:top-3 right-2 sm:right-3">
					<Badge
						variant="secondary"
						className="bg-black/50 text-white border-0 text-xs"
					>
						{cook.distance || 'N/A'}
					</Badge>
				</div>
				<div className="absolute bottom-3 left-3">
					<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white overflow-hidden bg-white shadow-lg">
						<img
							src={
								cook.image || '/placeholder.svg?height=60&width=60&query=chef'
							}
							alt={cook.ownerName}
							className="w-full h-full object-cover"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = '/diverse-chef-preparing-food.png';
							}}
						/>
					</div>
				</div>
			</div>

			<CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
				{/* Cook Info */}
				<div className="space-y-2">
					<div className="flex items-start justify-between gap-2">
						<div className="space-y-1 min-w-0 flex-1">
							<h3 className="font-semibold text-sm sm:text-base lg:text-lg leading-tight line-clamp-1">
								{cook.name || 'Unknown Kitchen'}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
								by {cook.ownerName || 'Unknown Cook'}
							</p>
						</div>
						<div className="flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0">
							<Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
							<span className="font-medium">{cook.rating || 0}</span>
							<span className="text-muted-foreground hidden sm:inline">
								({cook.reviewCount || 0})
							</span>
						</div>
					</div>

					<div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
						<MapPin className="h-3 w-3 flex-shrink-0" />
						<span className="line-clamp-1">
							{cook.location || 'Location not specified'}
						</span>
					</div>
				</div>

				{/* Specialties */}
				<div className="flex flex-wrap gap-1 max-w-full">
					{(cook.specialties || []).slice(0, 2).map((specialty) => (
						<Badge
							key={specialty}
							variant="secondary"
							className="text-xs px-2 py-0.5 flex-shrink-0"
						>
							{specialty}
						</Badge>
					))}
					{(cook.specialties || []).length > 2 && (
						<Badge
							variant="secondary"
							className="text-xs px-2 py-0.5 flex-shrink-0"
						>
							+{(cook.specialties || []).length - 2} more
						</Badge>
					)}
				</div>

				{/* Featured Dishes */}
				<div className="space-y-2">
					<p className="text-xs sm:text-sm font-medium">Featured Dishes</p>
					<div className="grid grid-cols-1 gap-2">
						{(cook.featuredDishes || []).slice(0, 2).map((dish, index) => (
							<div key={index} className="flex items-center space-x-2 text-xs">
								<div className="w-8 h-8 sm:w-9 sm:h-9 rounded overflow-hidden flex-shrink-0">
									<img
										src={
											dish.image ||
											'/placeholder.svg?height=40&width=40&query=food'
										}
										alt={dish.name}
										className="w-full h-full object-cover"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = '/diverse-food-spread.png';
										}}
									/>
								</div>
								<div className="min-w-0 flex-1">
									<div className="font-medium line-clamp-1 text-xs sm:text-sm">
										{dish.name}
									</div>
									<div className="text-primary text-xs">
										RM {(dish.price || 0).toFixed(2)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Delivery Info */}
				<div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
					<div className="flex items-center space-x-1 min-w-0">
						<Clock className="h-3 w-3 flex-shrink-0" />
						<span className="truncate">{cook.deliveryTime || 'N/A'}</span>
					</div>
					<div className="flex items-center space-x-1 min-w-0">
						<Truck className="h-3 w-3 flex-shrink-0" />
						<span className="truncate">
							RM {(cook.deliveryFee || 0).toFixed(2)}
						</span>
					</div>
					<div className="flex items-center space-x-1 min-w-0">
						<ShoppingBag className="h-3 w-3 flex-shrink-0" />
						<span className="truncate">
							Min RM {(cook.minOrder || 0).toFixed(2)}
						</span>
					</div>
				</div>

				{/* Action Button */}
				<Button
					asChild
					className="w-full bg-primary hover:bg-primary/90 h-9 sm:h-10 text-sm"
				>
					<Link href={`/cook/${cook.id}`}>View Menu</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
