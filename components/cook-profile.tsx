'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DishCard } from '@/components/dish-card';
import { ReviewsSection } from '@/components/reviews-section';
import {
	Star,
	MapPin,
	Clock,
	Truck,
	ShoppingBag,
	Phone,
	MessageCircle,
	Shield,
	Award,
} from 'lucide-react';

interface CookProfileProps {
	cookId: string;
}

// Mock data for cook profile
const mockCookData = {
	id: 1,
	name: "Mak Cik's Kitchen",
	ownerName: 'Siti Aminah',
	image: '/cook-profile-1.png',
	coverImage: '/kitchen-1.png',
	rating: 4.8,
	reviewCount: 127,
	location: 'Ampang, KL',
	distance: '2.3 km',
	specialties: ['Malay Traditional', 'Peranakan'],
	deliveryTime: '30-45 mins',
	deliveryFee: 3.5,
	minOrder: 15.0,
	isOpen: true,
	totalOrders: 450,
	joinedDate: '2023',
	bio: "Assalamualaikum! I'm Siti Aminah, and I've been cooking traditional Malay dishes for over 15 years. My recipes have been passed down through generations, and I take pride in using only the freshest halal ingredients. Every dish is prepared with love and care, just like I would for my own family.",
	achievements: ['Top Rated Cook', '500+ Orders', 'Halal Certified'],
	phone: '+60 12-345 6789',
	menu: [
		{
			id: 1,
			name: 'Nasi Lemak Special',
			category: 'Rice Dishes',
			price: 12.5,
			image: '/nasi-lemak.png',
			description:
				'Fragrant coconut rice with sambal, fried anchovies, peanuts, boiled egg, and cucumber',
			cookingTime: '30 mins',
			available: true,
			rating: 4.9,
			reviewCount: 45,
			dietaryInfo: ['Halal', 'Spicy'],
		},
		{
			id: 2,
			name: 'Rendang Daging',
			category: 'Main Dishes',
			price: 18.0,
			image: '/beef-rendang.png',
			description:
				'Slow-cooked beef in rich coconut curry with aromatic spices',
			cookingTime: '45 mins',
			available: true,
			rating: 4.8,
			reviewCount: 32,
			dietaryInfo: ['Halal', 'Spicy'],
		},
		{
			id: 3,
			name: 'Ayam Pongteh',
			category: 'Main Dishes',
			price: 16.0,
			image: '/ayam-pongteh.png',
			description:
				'Nyonya-style chicken braised in fermented bean sauce with potatoes',
			cookingTime: '40 mins',
			available: true,
			rating: 4.7,
			reviewCount: 28,
			dietaryInfo: ['Halal'],
		},
		{
			id: 4,
			name: 'Kuih Lapis',
			category: 'Desserts',
			price: 8.0,
			image: '/kuih-lapis.png',
			description:
				'Traditional layered steamed cake with pandan and coconut flavors',
			cookingTime: '20 mins',
			available: false,
			rating: 4.6,
			reviewCount: 22,
			dietaryInfo: ['Halal', 'Vegetarian'],
		},
	],
};

const categories = [
	'All',
	'Rice Dishes',
	'Main Dishes',
	'Desserts',
	'Beverages',
];

export function CookProfile({}: CookProfileProps) {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const cook = mockCookData; // In real app, fetch based on cookId

	const filteredMenu =
		selectedCategory === 'All'
			? cook.menu
			: cook.menu.filter((dish) => dish.category === selectedCategory);

	return (
		<div className="container max-w-6xl mx-auto py-8 px-4">
			{/* Cook Header */}
			<div className="relative mb-8">
				{/* Cover Image */}
				<div className="aspect-[3/1] rounded-xl overflow-hidden mb-6">
					<img
						src={cook.coverImage || '/placeholder.svg'}
						alt={`${cook.name} kitchen`}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Cook Info */}
				<div className="flex flex-col md:flex-row gap-6 items-start">
					{/* Profile Image */}
					<div className="relative">
						<Avatar className="w-24 h-24 border-4 border-background shadow-lg">
							<AvatarImage
								src={cook.image || '/placeholder.svg'}
								alt={cook.ownerName}
							/>
							<AvatarFallback>{cook.ownerName.charAt(0)}</AvatarFallback>
						</Avatar>
						<div className="absolute -bottom-1 -right-1">
							<Badge
								variant={cook.isOpen ? 'secondary' : 'destructive'}
								className={
									cook.isOpen
										? 'bg-green-100 text-green-800 border-green-200'
										: 'bg-amber-100 text-amber-800 border-amber-200'
								}
							>
								{cook.isOpen ? 'Open' : 'Closed'}
							</Badge>
						</div>
					</div>

					{/* Details */}
					<div className="flex-1 space-y-4">
						<div className="space-y-2">
							<h1 className="font-serif font-bold text-3xl text-foreground">
								{cook.name}
							</h1>
							<p className="text-lg text-muted-foreground">
								by {cook.ownerName}
							</p>

							<div className="flex items-center space-x-4 text-sm">
								<div className="flex items-center space-x-1">
									<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
									<span className="font-medium">{cook.rating}</span>
									<span className="text-muted-foreground">
										({cook.reviewCount} reviews)
									</span>
								</div>
								<div className="flex items-center space-x-1 text-muted-foreground">
									<MapPin className="h-4 w-4" />
									<span>{cook.location}</span>
									<span>•</span>
									<span>{cook.distance}</span>
								</div>
							</div>
						</div>

						{/* Specialties */}
						<div className="flex flex-wrap gap-2">
							{cook.specialties.map((specialty) => (
								<Badge
									key={specialty}
									variant="secondary"
									className="bg-primary/10 text-primary"
								>
									{specialty}
								</Badge>
							))}
						</div>

						{/* Achievements */}
						<div className="flex flex-wrap gap-2">
							{cook.achievements.map((achievement) => (
								<Badge
									key={achievement}
									variant="secondary"
									className="bg-accent/10 text-accent border-accent/20"
								>
									<Award className="h-3 w-3 mr-1" />
									{achievement}
								</Badge>
							))}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col space-y-2">
						<Button className="bg-primary hover:bg-primary/90">
							<ShoppingBag className="h-4 w-4 mr-2" />
							Order Now
						</Button>
						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="sm"
								className="bg-transparent hover:bg-amber-50 hover:text-amber-700"
							>
								<Phone className="h-4 w-4 mr-1" />
								Call
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="bg-transparent hover:bg-amber-50 hover:text-amber-700"
							>
								<MessageCircle className="h-4 w-4 mr-1" />
								Message
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Delivery Info */}
			<Card className="mb-8">
				<CardContent className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
								<Clock className="h-5 w-5 text-primary" />
							</div>
							<div>
								<div className="font-medium">Delivery Time</div>
								<div className="text-sm text-muted-foreground">
									{cook.deliveryTime}
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
								<Truck className="h-5 w-5 text-primary" />
							</div>
							<div>
								<div className="font-medium">Delivery Fee</div>
								<div className="text-sm text-muted-foreground">
									RM {cook.deliveryFee.toFixed(2)}
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
								<ShoppingBag className="h-5 w-5 text-primary" />
							</div>
							<div>
								<div className="font-medium">Minimum Order</div>
								<div className="text-sm text-muted-foreground">
									RM {cook.minOrder.toFixed(2)}
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
								<Shield className="h-5 w-5 text-green-600" />
							</div>
							<div>
								<div className="font-medium">Halal Certified</div>
								<div className="text-sm text-muted-foreground">
									100% Verified
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Tabs */}
			<Tabs defaultValue="menu" className="space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="menu">Menu</TabsTrigger>
					<TabsTrigger value="about">About</TabsTrigger>
					<TabsTrigger value="reviews">Reviews</TabsTrigger>
				</TabsList>

				<TabsContent value="menu" className="space-y-6">
					{/* Category Filter */}
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<Button
								key={category}
								variant={selectedCategory === category ? 'default' : 'outline'}
								size="sm"
								onClick={() => setSelectedCategory(category)}
								className={
									selectedCategory === category
										? 'bg-primary hover:bg-primary/90'
										: 'bg-transparent'
								}
							>
								{category}
							</Button>
						))}
					</div>

					{/* Menu Items */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{filteredMenu.map((dish) => (
							<DishCard key={dish.id} dish={dish} cookName={cook.name} />
						))}
					</div>
				</TabsContent>

				<TabsContent value="about" className="space-y-6">
					<Card>
						<CardContent className="p-6 space-y-4">
							<h3 className="font-semibold text-lg">About {cook.ownerName}</h3>
							<p className="text-muted-foreground leading-relaxed">
								{cook.bio}
							</p>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
								<div className="text-center">
									<div className="font-semibold text-2xl text-primary">
										{cook.totalOrders}+
									</div>
									<div className="text-sm text-muted-foreground">
										Total Orders
									</div>
								</div>
								<div className="text-center">
									<div className="font-semibold text-2xl text-primary">
										{cook.rating}
									</div>
									<div className="text-sm text-muted-foreground">
										Average Rating
									</div>
								</div>
								<div className="text-center">
									<div className="font-semibold text-2xl text-primary">
										{cook.joinedDate}
									</div>
									<div className="text-sm text-muted-foreground">
										Joined DapurKita
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="reviews">
					<ReviewsSection cookId={cook.id} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
