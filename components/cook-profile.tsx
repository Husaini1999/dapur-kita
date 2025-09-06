'use client';

import { useState } from 'react';
import Image from 'next/image';
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

// Mock data for all cooks
const mockCooksData = {
	1: {
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
	},
	2: {
		id: 2,
		name: "Uncle Wong's Wok",
		ownerName: 'Wong Ah Chong',
		image: '/cook-profile-2.png',
		coverImage: '/kitchen-2.png',
		rating: 4.6,
		reviewCount: 89,
		location: 'Petaling Jaya',
		distance: '4.1 km',
		specialties: ['Chinese Malaysian', 'Fusion'],
		deliveryTime: '25-40 mins',
		deliveryFee: 4.0,
		minOrder: 20.0,
		isOpen: true,
		totalOrders: 320,
		joinedDate: '2023',
		bio: "Hello! I'm Uncle Wong, and I've been perfecting Chinese Malaysian cuisine for over 20 years. My wok hei technique brings out the authentic flavors of traditional dishes. I specialize in stir-fries, noodles, and fusion creations that blend the best of Chinese and Malaysian flavors.",
		achievements: ['Wok Master', '300+ Orders', 'Fresh Ingredients'],
		phone: '+60 12-987 6543',
		menu: [
			{
				id: 5,
				name: 'Char Kway Teow',
				category: 'Noodles',
				price: 10.0,
				image: '/char-kway-teow.png',
				description:
					'Stir-fried flat rice noodles with prawns, cockles, bean sprouts, and chives in dark soy sauce',
				cookingTime: '15 mins',
				available: true,
				rating: 4.7,
				reviewCount: 38,
				dietaryInfo: ['Halal', 'Spicy'],
			},
			{
				id: 6,
				name: 'Hokkien Mee',
				category: 'Noodles',
				price: 12.0,
				image: '/hokkien-mee.png',
				description:
					'Thick yellow noodles in rich prawn and pork stock with seafood and vegetables',
				cookingTime: '20 mins',
				available: true,
				rating: 4.6,
				reviewCount: 29,
				dietaryInfo: ['Halal'],
			},
			{
				id: 7,
				name: 'Sweet & Sour Fish',
				category: 'Main Dishes',
				price: 22.0,
				image: '/chinese-wok-hei.png',
				description:
					'Fresh fish fillet in tangy sweet and sour sauce with bell peppers and pineapple',
				cookingTime: '25 mins',
				available: true,
				rating: 4.5,
				reviewCount: 24,
				dietaryInfo: ['Halal'],
			},
			{
				id: 8,
				name: 'Kung Pao Chicken',
				category: 'Main Dishes',
				price: 16.0,
				image: '/chinese-wok-hei.png',
				description:
					'Diced chicken with peanuts, dried chilies, and vegetables in savory sauce',
				cookingTime: '18 mins',
				available: true,
				rating: 4.4,
				reviewCount: 31,
				dietaryInfo: ['Halal', 'Spicy'],
			},
		],
	},
	3: {
		id: 3,
		name: "Ravi's Spice Corner",
		ownerName: 'Ravi Kumar',
		image: '/cook-profile-3.png',
		coverImage: '/kitchen-3.png',
		rating: 4.9,
		reviewCount: 156,
		location: 'Brickfields, KL',
		distance: '3.7 km',
		specialties: ['Indian Malaysian', 'Vegetarian'],
		deliveryTime: '35-50 mins',
		deliveryFee: 3.0,
		minOrder: 12.0,
		isOpen: false,
		totalOrders: 580,
		joinedDate: '2022',
		bio: "Namaste! I'm Ravi Kumar, and I bring you the authentic flavors of Indian Malaysian cuisine. With over 18 years of experience, I prepare traditional curries, biryanis, and vegetarian dishes using family recipes and the finest spices. Every dish is a celebration of our rich culinary heritage.",
		achievements: ['Spice Master', '600+ Orders', 'Vegetarian Specialist'],
		phone: '+60 12-456 7890',
		menu: [
			{
				id: 9,
				name: 'Roti Canai',
				category: 'Bread',
				price: 3.5,
				image: '/roti-canai.png',
				description:
					'Flaky, crispy flatbread served with dhal curry and sambal',
				cookingTime: '10 mins',
				available: true,
				rating: 4.8,
				reviewCount: 67,
				dietaryInfo: ['Halal', 'Vegetarian'],
			},
			{
				id: 10,
				name: 'Banana Leaf Rice',
				category: 'Rice Dishes',
				price: 15.0,
				image: '/banana-leaf-rice.png',
				description:
					'Steamed rice served on banana leaf with assorted curries, vegetables, and papadum',
				cookingTime: '30 mins',
				available: true,
				rating: 4.9,
				reviewCount: 52,
				dietaryInfo: ['Halal', 'Vegetarian'],
			},
			{
				id: 11,
				name: 'Chicken Biryani',
				category: 'Rice Dishes',
				price: 18.0,
				image: '/indian-curry-roti.png',
				description:
					'Fragrant basmati rice with tender chicken, aromatic spices, and saffron',
				cookingTime: '45 mins',
				available: false,
				rating: 4.7,
				reviewCount: 41,
				dietaryInfo: ['Halal'],
			},
			{
				id: 12,
				name: 'Vegetable Curry',
				category: 'Main Dishes',
				price: 12.0,
				image: '/indian-curry-roti.png',
				description:
					'Mixed vegetables in rich coconut curry with traditional Indian spices',
				cookingTime: '25 mins',
				available: true,
				rating: 4.6,
				reviewCount: 35,
				dietaryInfo: ['Halal', 'Vegetarian'],
			},
		],
	},
	4: {
		id: 4,
		name: 'Nyonya Heritage Kitchen',
		ownerName: 'Lily Tan',
		image: '/cook-profile-4.png',
		coverImage: '/kitchen-4.png',
		rating: 4.7,
		reviewCount: 203,
		location: 'Malacca',
		distance: '1.8 km',
		specialties: ['Peranakan', 'Nyonya'],
		deliveryTime: '40-55 mins',
		deliveryFee: 2.5,
		minOrder: 18.0,
		isOpen: true,
		totalOrders: 290,
		joinedDate: '2023',
		bio: "Selamat datang! I'm Lily Tan, a third-generation Nyonya cook preserving the traditional Peranakan recipes passed down from my grandmother. My kitchen specializes in authentic Nyonya cuisine with its unique blend of Chinese and Malay flavors, using traditional cooking methods and fresh local ingredients.",
		achievements: ['Heritage Cook', '300+ Orders', 'Traditional Recipes'],
		phone: '+60 12-789 0123',
		menu: [
			{
				id: 13,
				name: 'Ayam Pongteh',
				category: 'Main Dishes',
				price: 16.0,
				image: '/ayam-pongteh.png',
				description:
					'Nyonya-style chicken braised in fermented bean sauce with potatoes and mushrooms',
				cookingTime: '40 mins',
				available: true,
				rating: 4.8,
				reviewCount: 48,
				dietaryInfo: ['Halal'],
			},
			{
				id: 14,
				name: 'Kuih Lapis',
				category: 'Desserts',
				price: 8.0,
				image: '/kuih-lapis.png',
				description:
					'Traditional layered steamed cake with pandan and coconut flavors',
				cookingTime: '20 mins',
				available: true,
				rating: 4.7,
				reviewCount: 36,
				dietaryInfo: ['Halal', 'Vegetarian'],
			},
			{
				id: 15,
				name: 'Laksa Lemak',
				category: 'Noodles',
				price: 14.0,
				image: '/peranakan-nyonya-food.png',
				description:
					'Rich coconut curry laksa with prawns, fish cake, and fresh herbs',
				cookingTime: '30 mins',
				available: true,
				rating: 4.6,
				reviewCount: 42,
				dietaryInfo: ['Halal', 'Spicy'],
			},
			{
				id: 16,
				name: 'Otak-Otak',
				category: 'Appetizers',
				price: 6.0,
				image: '/peranakan-nyonya-food.png',
				description:
					'Spiced fish paste wrapped in banana leaves and grilled to perfection',
				cookingTime: '15 mins',
				available: true,
				rating: 4.5,
				reviewCount: 28,
				dietaryInfo: ['Halal', 'Spicy'],
			},
		],
	},
};

const categories = [
	'All',
	'Rice Dishes',
	'Main Dishes',
	'Desserts',
	'Beverages',
];

export function CookProfile({ cookId }: CookProfileProps) {
	const [selectedCategory, setSelectedCategory] = useState('All');

	// Get cook data based on cookId
	const cook = mockCooksData[parseInt(cookId) as keyof typeof mockCooksData];

	// If cook not found, show error or fallback
	if (!cook) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						Cook Not Found
					</h1>
					<p className="text-gray-600">
						The cook you&apos;re looking for doesn&apos;t exist.
					</p>
				</div>
			</div>
		);
	}

	const filteredMenu =
		selectedCategory === 'All'
			? cook.menu
			: cook.menu.filter((dish) => dish.category === selectedCategory);

	return (
		<div className="container max-w-6xl mx-auto py-8 px-4">
			{/* Cook Header */}
			<div className="relative mb-8">
				{/* Cover Image */}
				<div className="aspect-[3/1] rounded-xl overflow-hidden mb-6 relative">
					<Image
						src={cook.coverImage || '/placeholder.svg'}
						alt={`${cook.name} kitchen`}
						fill
						className="object-cover"
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
										: 'bg-transparent hover:bg-amber-50 hover:text-amber-700'
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
