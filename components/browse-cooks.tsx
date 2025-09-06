'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CookCard } from '@/components/cook-card';
import { Search, Filter, MapPin, Utensils } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	mockCooks,
	mockDishes,
	getCooksByCuisine,
	getDishesByMealTime,
	getDishesByDietary,
} from '@/lib/mock-data';

const cuisineTypes = [
	'Malay Traditional',
	'Chinese Malaysian',
	'Indian Malaysian',
	'Peranakan',
	'Nyonya',
	'Sabahan',
	'Sarawakian',
	'Fusion',
	'Vegetarian',
	'Halal Western',
];

const mealTimeTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const dietaryTypes = ['Halal', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Spicy'];

export function BrowseCooks() {
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
	const [selectedMealTimes, setSelectedMealTimes] = useState<string[]>([]);
	const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState('rating');
	const [showOpenOnly, setShowOpenOnly] = useState(false);
	const [maxDeliveryFee, setMaxDeliveryFee] = useState('');
	const [maxDistance, setMaxDistance] = useState('');

	// Handle URL parameters
	useEffect(() => {
		const category = searchParams.get('category');
		const meal = searchParams.get('meal');
		const dietary = searchParams.get('dietary');
		const search = searchParams.get('search');

		if (category) {
			// Map category IDs to cuisine types
			const categoryMap: { [key: string]: string } = {
				malay: 'Malay Traditional',
				chinese: 'Chinese Malaysian',
				indian: 'Indian Malaysian',
				peranakan: 'Peranakan',
				western: 'Fusion',
				thai: 'Thai Cuisine',
			};
			if (categoryMap[category]) {
				setSelectedCuisines([categoryMap[category]]);
			}
		}

		if (meal) {
			// Set meal time filter
			const mealMap: { [key: string]: string } = {
				breakfast: 'Breakfast',
				lunch: 'Lunch',
				dinner: 'Dinner',
				snacks: 'Snacks',
				kuih: 'Snacks', // kuih is a type of snack
			};
			if (mealMap[meal]) {
				setSelectedMealTimes([mealMap[meal]]);
			}
		}

		if (dietary) {
			// Set dietary filter
			const dietaryMap: { [key: string]: string } = {
				halal: 'Halal',
				vegetarian: 'Vegetarian',
				vegan: 'Vegan',
				'gluten-free': 'Gluten-Free',
			};
			if (dietaryMap[dietary]) {
				setSelectedDietary([dietaryMap[dietary]]);
			}
		}

		if (search === 'true') {
			// Show advanced search interface
			setSearchTerm('');
		}
	}, [searchParams]);

	const toggleCuisine = (cuisine: string) => {
		setSelectedCuisines((prev) =>
			prev.includes(cuisine)
				? prev.filter((c) => c !== cuisine)
				: [...prev, cuisine]
		);
	};

	const toggleMealTime = (mealTime: string) => {
		setSelectedMealTimes((prev) =>
			prev.includes(mealTime)
				? prev.filter((m) => m !== mealTime)
				: [...prev, mealTime]
		);
	};

	const toggleDietary = (dietary: string) => {
		setSelectedDietary((prev) =>
			prev.includes(dietary)
				? prev.filter((d) => d !== dietary)
				: [...prev, dietary]
		);
	};

	const filteredCooks = mockCooks
		.filter((cook) => {
			// Basic search term filtering
			const searchTerms = searchTerm.toLowerCase().split(' ');
			const matchesSearch =
				searchTerms.length === 0 ||
				searchTerms.every(
					(term) =>
						cook.name.toLowerCase().includes(term) ||
						cook.specialties.some((specialty) =>
							specialty.toLowerCase().includes(term)
						) ||
						cook.location.toLowerCase().includes(term) ||
						cook.ownerName.toLowerCase().includes(term)
				);

			// Cuisine filtering
			const matchesCuisine =
				selectedCuisines.length === 0 ||
				cook.specialties.some((specialty) =>
					selectedCuisines.includes(specialty)
				);

			// Meal time filtering - check if cook has dishes for selected meal times
			const matchesMealTime =
				selectedMealTimes.length === 0 ||
				selectedMealTimes.some((mealTime) => {
					const cookDishes = mockDishes.filter(
						(dish) => dish.cookId === cook.id
					);
					return cookDishes.some((dish) => dish.mealTime.includes(mealTime));
				});

			// Dietary filtering - check if cook has dishes with selected dietary info
			const matchesDietary =
				selectedDietary.length === 0 ||
				selectedDietary.some((dietary) => {
					const cookDishes = mockDishes.filter(
						(dish) => dish.cookId === cook.id
					);
					return cookDishes.some((dish) =>
						dish.dietaryInfo.some((info) =>
							info.toLowerCase().includes(dietary.toLowerCase())
						)
					);
				});

			// Open status filtering
			const matchesOpen = !showOpenOnly || cook.isOpen;

			// Delivery fee filtering
			const matchesDeliveryFee =
				!maxDeliveryFee ||
				cook.deliveryFee <= Number.parseFloat(maxDeliveryFee);

			// Distance filtering
			const matchesDistance =
				!maxDistance ||
				Number.parseFloat(cook.distance) <= Number.parseFloat(maxDistance);

			return (
				matchesSearch &&
				matchesCuisine &&
				matchesMealTime &&
				matchesDietary &&
				matchesOpen &&
				matchesDeliveryFee &&
				matchesDistance
			);
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'rating':
					return b.rating - a.rating;
				case 'distance':
					return Number.parseFloat(a.distance) - Number.parseFloat(b.distance);
				case 'deliveryTime':
					return (
						Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
					);
				case 'deliveryFee':
					return a.deliveryFee - b.deliveryFee;
				default:
					return 0;
			}
		});

	return (
		<div className="container max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
				<div className="flex items-center space-x-2 text-sm text-muted-foreground">
					<MapPin className="h-4 w-4" />
					<span>Delivering to Kuala Lumpur</span>
					{/* <Button variant="link" className="p-0 h-auto text-primary text-sm">
            Change location
          </Button> */}
				</div>
				<h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">
					Browse Home Cooks
				</h1>
				<p className="text-base sm:text-lg text-muted-foreground">
					Discover authentic Malaysian flavors from talented home-based cooks in
					your neighborhood
				</p>
			</div>

			{/* Search and Filters */}
			<div className="space-y-4 mb-6 sm:mb-8">
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
					{/* Search Bar */}
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search for cooks, dishes, or cuisine types..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 h-11 sm:h-12"
						/>
					</div>

					{/* Sort */}
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-full sm:w-48 h-11 sm:h-12">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="rating">Highest Rated</SelectItem>
							<SelectItem value="distance">Nearest First</SelectItem>
							<SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
							<SelectItem value="deliveryFee">Lowest Delivery Fee</SelectItem>
						</SelectContent>
					</Select>

					{/* Filter Sheet */}
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" className="h-11 sm:h-12 bg-transparent">
								<Filter className="h-4 w-4 mr-2" />
								Filters
								{(selectedCuisines.length > 0 ||
									selectedMealTimes.length > 0 ||
									selectedDietary.length > 0 ||
									showOpenOnly ||
									maxDeliveryFee ||
									maxDistance) && (
									<Badge
										variant="secondary"
										className="ml-2 bg-primary/10 text-primary"
									>
										{selectedCuisines.length +
											selectedMealTimes.length +
											selectedDietary.length +
											(showOpenOnly ? 1 : 0) +
											(maxDeliveryFee ? 1 : 0) +
											(maxDistance ? 1 : 0)}
									</Badge>
								)}
							</Button>
						</SheetTrigger>
						<SheetContent className="px-6">
							<SheetHeader>
								<SheetTitle>Filter Cooks</SheetTitle>
								<SheetDescription>
									Narrow down your search to find the perfect cook
								</SheetDescription>
							</SheetHeader>
							<div className="space-y-6 mt-6">
								{/* Cuisine Types */}
								<div className="space-y-3">
									<Label className="text-base font-semibold">
										Cuisine Types
									</Label>
									<div className="space-y-2">
										{cuisineTypes.map((cuisine) => (
											<div
												key={cuisine}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={cuisine}
													checked={selectedCuisines.includes(cuisine)}
													onCheckedChange={() => toggleCuisine(cuisine)}
												/>
												<Label
													htmlFor={cuisine}
													className="text-sm cursor-pointer"
												>
													{cuisine}
												</Label>
											</div>
										))}
									</div>
								</div>

								{/* Meal Times */}
								<div className="space-y-3">
									<Label className="text-base font-semibold">Meal Times</Label>
									<div className="space-y-2">
										{mealTimeTypes.map((mealTime) => (
											<div
												key={mealTime}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={mealTime}
													checked={selectedMealTimes.includes(mealTime)}
													onCheckedChange={() => toggleMealTime(mealTime)}
												/>
												<Label
													htmlFor={mealTime}
													className="text-sm cursor-pointer"
												>
													{mealTime}
												</Label>
											</div>
										))}
									</div>
								</div>

								{/* Dietary Preferences */}
								<div className="space-y-3">
									<Label className="text-base font-semibold">
										Dietary Preferences
									</Label>
									<div className="space-y-2">
										{dietaryTypes.map((dietary) => (
											<div
												key={dietary}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={dietary}
													checked={selectedDietary.includes(dietary)}
													onCheckedChange={() => toggleDietary(dietary)}
												/>
												<Label
													htmlFor={dietary}
													className="text-sm cursor-pointer"
												>
													{dietary}
												</Label>
											</div>
										))}
									</div>
								</div>

								{/* Availability */}
								<div className="space-y-3">
									<Label className="text-base font-semibold">
										Availability
									</Label>
									<div className="flex items-center space-x-2">
										<Checkbox
											id="openOnly"
											checked={showOpenOnly}
											onCheckedChange={(checked) => setShowOpenOnly(!!checked)}
										/>
										<Label
											htmlFor="openOnly"
											className="text-sm cursor-pointer"
										>
											Show only open kitchens
										</Label>
									</div>
								</div>

								{/* Delivery Fee */}
								<div className="space-y-3">
									<Label
										htmlFor="maxDeliveryFee"
										className="text-base font-semibold"
									>
										Max Delivery Fee (RM)
									</Label>
									<Input
										id="maxDeliveryFee"
										type="number"
										step="0.50"
										placeholder="e.g., 5.00"
										value={maxDeliveryFee}
										onChange={(e) => setMaxDeliveryFee(e.target.value)}
									/>
								</div>

								{/* Distance */}
								<div className="space-y-3">
									<Label
										htmlFor="maxDistance"
										className="text-base font-semibold"
									>
										Max Distance (km)
									</Label>
									<Input
										id="maxDistance"
										type="number"
										step="0.1"
										placeholder="e.g., 5.0"
										value={maxDistance}
										onChange={(e) => setMaxDistance(e.target.value)}
									/>
								</div>

								{/* Clear Filters */}
								<Button
									variant="outline"
									className="w-full bg-transparent"
									onClick={() => {
										setSelectedCuisines([]);
										setSelectedMealTimes([]);
										setSelectedDietary([]);
										setShowOpenOnly(false);
										setMaxDeliveryFee('');
										setMaxDistance('');
									}}
								>
									Clear All Filters
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				{/* Active Filters */}
				{(selectedCuisines.length > 0 ||
					selectedMealTimes.length > 0 ||
					selectedDietary.length > 0 ||
					showOpenOnly ||
					maxDeliveryFee ||
					maxDistance) && (
					<div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
						{selectedCuisines.map((cuisine) => (
							<Badge
								key={cuisine}
								variant="secondary"
								className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
								onClick={() => toggleCuisine(cuisine)}
							>
								{cuisine} ×
							</Badge>
						))}
						{selectedMealTimes.map((mealTime) => (
							<Badge
								key={mealTime}
								variant="secondary"
								className="bg-blue-100 text-blue-700 border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors flex-shrink-0"
								onClick={() => toggleMealTime(mealTime)}
							>
								{mealTime} ×
							</Badge>
						))}
						{selectedDietary.map((dietary) => (
							<Badge
								key={dietary}
								variant="secondary"
								className="bg-green-100 text-green-700 border-green-200 cursor-pointer hover:bg-green-200 transition-colors flex-shrink-0"
								onClick={() => toggleDietary(dietary)}
							>
								{dietary} ×
							</Badge>
						))}
						{showOpenOnly && (
							<Badge
								variant="secondary"
								className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
								onClick={() => setShowOpenOnly(false)}
							>
								Open Only ×
							</Badge>
						)}
						{maxDeliveryFee && (
							<Badge
								variant="secondary"
								className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
								onClick={() => setMaxDeliveryFee('')}
							>
								Max Fee: RM{maxDeliveryFee} ×
							</Badge>
						)}
						{maxDistance && (
							<Badge
								variant="secondary"
								className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
								onClick={() => setMaxDistance('')}
							>
								Max Distance: {maxDistance}km ×
							</Badge>
						)}
					</div>
				)}
			</div>

			{/* Results Count */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<p className="text-muted-foreground">
					{filteredCooks.length} cook{filteredCooks.length !== 1 ? 's' : ''}{' '}
					found
				</p>
				<div className="flex items-center space-x-4 text-sm text-muted-foreground">
					<div className="flex items-center space-x-1">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span>Open</span>
					</div>
					<div className="flex items-center space-x-1">
						<div className="w-2 h-2 bg-amber-500 rounded-full"></div>
						<span>Closed</span>
					</div>
				</div>
			</div>

			{/* Cooks Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 max-w-none">
				{filteredCooks.map((cook) => (
					<CookCard key={cook.id} cook={cook} />
				))}
			</div>

			{/* No Results */}
			{filteredCooks.length === 0 && (
				<div className="text-center py-12 px-4">
					<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
						<Utensils className="h-8 w-8 text-muted-foreground" />
					</div>
					<h3 className="font-semibold text-lg mb-2">No cooks found</h3>
					<p className="text-muted-foreground mb-4 max-w-md mx-auto">
						Try adjusting your search criteria or filters to find more results.
					</p>
					<Button
						variant="outline"
						onClick={() => {
							setSearchTerm('');
							setSelectedCuisines([]);
							setShowOpenOnly(false);
							setMaxDeliveryFee('');
							setMaxDistance('');
						}}
					>
						Clear all filters
					</Button>
				</div>
			)}
		</div>
	);
}
