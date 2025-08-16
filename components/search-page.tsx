'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { CookCard } from '@/components/cook-card';
import { DishCard } from '@/components/dish-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin } from 'lucide-react';

// Mock data - in real app this would come from API
const mockCooks = [
	{
		id: 1,
		name: "Mak Cik's Kitchen",
		ownerName: 'Mak Cik Aminah',
		image: '/cook-profile-1.png',
		coverImage: '/kitchen-1.png',
		rating: 4.8,
		reviewCount: 127,
		location: 'Bangsar, KL',
		distance: '2.1 km',
		specialties: ['Nasi Lemak', 'Rendang', 'Sambal'],
		deliveryTime: '30-45 min',
		deliveryFee: 3.5,
		minOrder: 15.0,
		isOpen: true,
		featuredDishes: [
			{ name: 'Nasi Lemak', price: 8.5, image: '/nasi-lemak.png' },
			{ name: 'Beef Rendang', price: 15.0, image: '/beef-rendang.png' },
		],
		totalOrders: 1250,
		joinedDate: '2023-01-15',
	},
	{
		id: 2,
		name: "Ravi's Spice Corner",
		ownerName: 'Ravi Kumar',
		image: '/cook-profile-3.png',
		coverImage: '/kitchen-3.png',
		rating: 4.7,
		reviewCount: 89,
		location: 'Brickfields, KL',
		distance: '3.2 km',
		specialties: ['Banana Leaf Rice', 'Curry', 'Roti'],
		deliveryTime: '25-40 min',
		deliveryFee: 4.0,
		minOrder: 20.0,
		isOpen: true,
		featuredDishes: [
			{ name: 'Banana Leaf Rice', price: 12.0, image: '/banana-leaf-rice.png' },
			{ name: 'Ayam Pongteh', price: 14.0, image: '/ayam-pongteh.png' },
		],
		totalOrders: 890,
		joinedDate: '2023-03-20',
	},
];

const mockDishes = [
	{
		id: 1,
		name: 'Nasi Lemak',
		category: 'Main Course',
		price: 8.5,
		image: '/nasi-lemak.png',
		description:
			'Traditional Malaysian coconut rice with sambal, anchovies, and boiled egg',
		cookingTime: '20-25 min',
		available: true,
		rating: 4.9,
		reviewCount: 45,
		dietaryInfo: ['Halal', 'Contains Fish'],
		cookName: "Mak Cik's Kitchen",
		cuisine: 'Malay',
	},
	{
		id: 2,
		name: 'Beef Rendang',
		category: 'Main Course',
		price: 15.0,
		image: '/beef-rendang.png',
		description: 'Slow-cooked beef in rich coconut milk and spices',
		cookingTime: '30-35 min',
		available: true,
		rating: 4.8,
		reviewCount: 38,
		dietaryInfo: ['Halal'],
		cookName: "Mak Cik's Kitchen",
		cuisine: 'Malay',
	},
	{
		id: 3,
		name: 'Banana Leaf Rice',
		category: 'Main Course',
		price: 12.0,
		image: '/banana-leaf-rice.png',
		description:
			'Rice served on banana leaf with various curries and vegetables',
		cookingTime: '25-30 min',
		available: true,
		rating: 4.7,
		reviewCount: 52,
		dietaryInfo: ['Vegetarian Option'],
		cookName: "Ravi's Spice Corner",
		cuisine: 'Indian',
	},
	{
		id: 4,
		name: 'Ayam Pongteh',
		category: 'Main Course',
		price: 14.0,
		image: '/ayam-pongteh.png',
		description: 'Peranakan chicken stew with fermented bean paste',
		cookingTime: '35-40 min',
		available: true,
		rating: 4.6,
		reviewCount: 29,
		dietaryInfo: ['Halal'],
		cookName: "Ravi's Spice Corner",
		cuisine: 'Peranakan',
	},
	{
		id: 5,
		name: 'Kuih Lapis',
		category: 'Dessert',
		price: 6.0,
		image: '/kuih-lapis.png',
		description: 'Traditional layered cake with coconut milk and pandan',
		cookingTime: '15-20 min',
		available: true,
		rating: 4.5,
		reviewCount: 33,
		dietaryInfo: ['Halal', 'Vegetarian'],
		cookName: "Siti's Desserts",
		cuisine: 'Malay',
	},
];

export function SearchPage() {
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get('q') || '';

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [activeTab, setActiveTab] = useState<'all' | 'cooks' | 'dishes'>('all');
	const [filteredCooks, setFilteredCooks] = useState(mockCooks);
	const [filteredDishes, setFilteredDishes] = useState(mockDishes);

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredCooks(mockCooks);
			setFilteredDishes(mockDishes);
			return;
		}

		const query = searchQuery.toLowerCase();

		// Filter cooks
		const cooksResults = mockCooks.filter(
			(cook) =>
				cook.name.toLowerCase().includes(query) ||
				cook.ownerName.toLowerCase().includes(query) ||
				cook.location.toLowerCase().includes(query) ||
				cook.specialties.some((specialty) =>
					specialty.toLowerCase().includes(query)
				)
		);

		// Filter dishes
		const dishesResults = mockDishes.filter(
			(dish) =>
				dish.name.toLowerCase().includes(query) ||
				dish.cookName.toLowerCase().includes(query) ||
				dish.cuisine.toLowerCase().includes(query)
		);

		setFilteredCooks(cooksResults);
		setFilteredDishes(dishesResults);
	}, [searchQuery]);

	const totalResults = filteredCooks.length + filteredDishes.length;

	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				{/* Search Header */}
				<div className="mb-8">
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
						<div>
							<h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
								Search Results
							</h1>
							{searchQuery && (
								<p className="text-muted-foreground">
									{totalResults} results for "{searchQuery}"
								</p>
							)}
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="h-4 w-4" />
							<span>Kuala Lumpur</span>
						</div>
					</div>

					{/* Search Bar */}
					<div className="relative mb-6">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search for dishes, cooks, or cuisine..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 h-12 text-base"
						/>
					</div>

					{/* Filter Tabs */}
					<div className="flex flex-wrap gap-2 mb-6">
						<Button
							variant={activeTab === 'all' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setActiveTab('all')}
							className="h-9"
						>
							All ({totalResults})
						</Button>
						<Button
							variant={activeTab === 'cooks' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setActiveTab('cooks')}
							className="h-9"
						>
							Cooks ({filteredCooks.length})
						</Button>
						<Button
							variant={activeTab === 'dishes' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setActiveTab('dishes')}
							className="h-9"
						>
							Dishes ({filteredDishes.length})
						</Button>
					</div>
				</div>

				{/* Results */}
				{totalResults === 0 ? (
					<div className="text-center py-12">
						<Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-lg font-semibold mb-2">No results found</h3>
						<p className="text-muted-foreground">
							Try adjusting your search terms or browse our categories
						</p>
					</div>
				) : (
					<div className="space-y-8">
						{/* Cooks Results */}
						{(activeTab === 'all' || activeTab === 'cooks') &&
							filteredCooks.length > 0 && (
								<div>
									<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
										Home Cooks
										<Badge variant="secondary">{filteredCooks.length}</Badge>
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{filteredCooks.map((cook) => (
											<CookCard key={cook.id} cook={cook} />
										))}
									</div>
								</div>
							)}

						{/* Dishes Results */}
						{(activeTab === 'all' || activeTab === 'dishes') &&
							filteredDishes.length > 0 && (
								<div>
									<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
										Dishes
										<Badge variant="secondary">{filteredDishes.length}</Badge>
									</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
										{filteredDishes.map((dish) => (
											<DishCard
												key={dish.id}
												dish={dish}
												cookName={dish.cookName}
											/>
										))}
									</div>
								</div>
							)}
					</div>
				)}
			</div>
		</div>
	);
}
