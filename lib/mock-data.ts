// Comprehensive mock data for DapurKita

export interface Dish {
	id: number;
	name: string;
	category: string;
	price: number;
	image: string;
	description: string;
	cookingTime: string;
	available: boolean;
	rating: number;
	reviewCount: number;
	dietaryInfo: string[];
	mealTime: string[];
	cuisine: string;
	cookId: number;
}

export interface Cook {
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
	featuredDishes: { name: string; price: number; image: string }[];
	totalOrders: number;
	joinedDate: string;
}

// Comprehensive dish data with meal times and dietary info
export const mockDishes: Dish[] = [
	// Mak Cik's Kitchen (ID: 1) - Malay Traditional
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
		mealTime: ['Breakfast', 'Lunch'],
		cuisine: 'Malay Traditional',
		cookId: 1,
	},
	{
		id: 2,
		name: 'Rendang Daging',
		category: 'Main Dishes',
		price: 18.0,
		image: '/beef-rendang.png',
		description: 'Slow-cooked beef in rich coconut curry with aromatic spices',
		cookingTime: '45 mins',
		available: true,
		rating: 4.8,
		reviewCount: 32,
		dietaryInfo: ['Halal', 'Spicy'],
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Malay Traditional',
		cookId: 1,
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Peranakan',
		cookId: 1,
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
		mealTime: ['Snacks'],
		cuisine: 'Peranakan',
		cookId: 1,
	},

	// Uncle Wong's Wok (ID: 2) - Chinese Malaysian
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Chinese Malaysian',
		cookId: 2,
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Chinese Malaysian',
		cookId: 2,
	},
	{
		id: 7,
		name: 'Sweet & Sour Fish',
		category: 'Main Dishes',
		price: 22.0,
		image: '/sweet-and-sour-fish.png',
		description:
			'Fresh fish fillet in tangy sweet and sour sauce with bell peppers and pineapple',
		cookingTime: '25 mins',
		available: true,
		rating: 4.5,
		reviewCount: 24,
		dietaryInfo: ['Halal'],
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Chinese Malaysian',
		cookId: 2,
	},
	{
		id: 8,
		name: 'Kung Pao Chicken',
		category: 'Main Dishes',
		price: 16.0,
		image: '/kung-pao-chicken.png',
		description:
			'Diced chicken with peanuts, dried chilies, and vegetables in savory sauce',
		cookingTime: '18 mins',
		available: true,
		rating: 4.4,
		reviewCount: 31,
		dietaryInfo: ['Halal', 'Spicy'],
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Chinese Malaysian',
		cookId: 2,
	},

	// Ravi's Spice Corner (ID: 3) - Indian Malaysian
	{
		id: 9,
		name: 'Roti Canai',
		category: 'Bread',
		price: 3.5,
		image: '/roti-canai.png',
		description: 'Flaky, crispy flatbread served with dhal curry and sambal',
		cookingTime: '10 mins',
		available: true,
		rating: 4.8,
		reviewCount: 67,
		dietaryInfo: ['Halal', 'Vegetarian'],
		mealTime: ['Breakfast', 'Snacks'],
		cuisine: 'Indian Malaysian',
		cookId: 3,
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Indian Malaysian',
		cookId: 3,
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Indian Malaysian',
		cookId: 3,
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
		dietaryInfo: ['Halal', 'Vegetarian', 'Vegan'],
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Indian Malaysian',
		cookId: 3,
	},

	// Nyonya Heritage Kitchen (ID: 4) - Peranakan
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Peranakan',
		cookId: 4,
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
		mealTime: ['Snacks'],
		cuisine: 'Peranakan',
		cookId: 4,
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
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Peranakan',
		cookId: 4,
	},
	{
		id: 16,
		name: 'Otak-Otak',
		category: 'Appetizers',
		price: 6.0,
		image: '/otak-otak.png',
		description:
			'Spiced fish paste wrapped in banana leaves and grilled to perfection',
		cookingTime: '15 mins',
		available: true,
		rating: 4.5,
		reviewCount: 28,
		dietaryInfo: ['Halal', 'Spicy'],
		mealTime: ['Snacks'],
		cuisine: 'Peranakan',
		cookId: 4,
	},

	// Additional dishes for more variety
	{
		id: 17,
		name: 'Nasi Kerabu',
		category: 'Rice Dishes',
		price: 14.0,
		image: '/nasi-kerabu.png',
		description: 'Blue rice with herbs, vegetables, and grilled fish',
		cookingTime: '35 mins',
		available: true,
		rating: 4.5,
		reviewCount: 25,
		dietaryInfo: ['Halal'],
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Malay Traditional',
		cookId: 1,
	},
	{
		id: 18,
		name: 'Dim Sum Platter',
		category: 'Appetizers',
		price: 20.0,
		image: '/dimsum-platter.png',
		description: 'Assorted steamed and fried dim sum with dipping sauces',
		cookingTime: '25 mins',
		available: true,
		rating: 4.6,
		reviewCount: 33,
		dietaryInfo: ['Halal'],
		mealTime: ['Breakfast', 'Lunch'],
		cuisine: 'Chinese Malaysian',
		cookId: 2,
	},
	{
		id: 19,
		name: 'Tandoori Chicken',
		category: 'Main Dishes',
		price: 19.0,
		image: '/indian-curry-roti.png',
		description: 'Marinated chicken cooked in traditional tandoor oven',
		cookingTime: '40 mins',
		available: true,
		rating: 4.7,
		reviewCount: 29,
		dietaryInfo: ['Halal'],
		mealTime: ['Lunch', 'Dinner'],
		cuisine: 'Indian Malaysian',
		cookId: 3,
	},
	{
		id: 20,
		name: 'Kueh Dadar',
		category: 'Desserts',
		price: 5.0,
		image: '/kueh-dadar.png',
		description: 'Pandan crepes filled with grated coconut and palm sugar',
		cookingTime: '15 mins',
		available: true,
		rating: 4.4,
		reviewCount: 18,
		dietaryInfo: ['Halal', 'Vegetarian'],
		mealTime: ['Snacks'],
		cuisine: 'Peranakan',
		cookId: 4,
	},
];

// Cook data
export const mockCooks: Cook[] = [
	{
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
		featuredDishes: [
			{ name: 'Nasi Lemak Special', price: 12.5, image: '/nasi-lemak.png' },
			{ name: 'Rendang Daging', price: 18.0, image: '/beef-rendang.png' },
		],
		totalOrders: 450,
		joinedDate: '2023',
	},
	{
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
		featuredDishes: [
			{ name: 'Char Kway Teow', price: 10.0, image: '/char-kway-teow.png' },
			{ name: 'Hokkien Mee', price: 12.0, image: '/hokkien-mee.png' },
		],
		totalOrders: 320,
		joinedDate: '2023',
	},
	{
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
		featuredDishes: [
			{ name: 'Roti Canai', price: 3.5, image: '/roti-canai.png' },
			{ name: 'Banana Leaf Rice', price: 15.0, image: '/banana-leaf-rice.png' },
		],
		totalOrders: 580,
		joinedDate: '2022',
	},
	{
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
		featuredDishes: [
			{ name: 'Ayam Pongteh', price: 16.0, image: '/ayam-pongteh.png' },
			{ name: 'Kuih Lapis', price: 8.0, image: '/kuih-lapis.png' },
		],
		totalOrders: 290,
		joinedDate: '2023',
	},
];

// Helper functions for filtering
export const getDishesByCategory = (category: string) => {
	return mockDishes.filter((dish) =>
		dish.cuisine.toLowerCase().includes(category.toLowerCase())
	);
};

export const getDishesByMealTime = (mealTime: string) => {
	return mockDishes.filter((dish) => dish.mealTime.includes(mealTime));
};

export const getDishesByDietary = (dietary: string) => {
	return mockDishes.filter((dish) =>
		dish.dietaryInfo.some((info) =>
			info.toLowerCase().includes(dietary.toLowerCase())
		)
	);
};

export const getCooksByCuisine = (cuisine: string) => {
	return mockCooks.filter((cook) =>
		cook.specialties.some((specialty) =>
			specialty.toLowerCase().includes(cuisine.toLowerCase())
		)
	);
};
