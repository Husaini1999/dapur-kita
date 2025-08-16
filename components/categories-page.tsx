"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ChefHat, Clock, Leaf, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const cuisineCategories = [
  {
    id: "malay",
    name: "Malay Cuisine",
    description: "Traditional Malay dishes with rich spices and coconut",
    dishCount: 156,
    image: "/nasi-lemak-malay-food.png",
    popular: true,
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "chinese",
    name: "Chinese Cuisine",
    description: "Authentic Chinese dishes and dim sum",
    dishCount: 134,
    image: "/chinese-wok-hei.png",
    popular: true,
    color: "bg-red-50 border-red-200",
  },
  {
    id: "indian",
    name: "Indian Cuisine",
    description: "Aromatic curries and tandoor specialties",
    dishCount: 98,
    image: "/indian-curry-roti.png",
    popular: true,
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: "peranakan",
    name: "Peranakan Cuisine",
    description: "Unique Nyonya heritage dishes",
    dishCount: 67,
    image: "/peranakan-nyonya-food.png",
    popular: false,
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: "western",
    name: "Western Fusion",
    description: "Western dishes with local twists",
    dishCount: 89,
    image: "/western-fusion-food.png",
    popular: false,
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "thai",
    name: "Thai Cuisine",
    description: "Spicy and aromatic Thai favorites",
    dishCount: 72,
    image: "/thai-tom-yum.png",
    popular: false,
    color: "bg-green-50 border-green-200",
  },
]

const mealCategories = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Start your day right",
    dishCount: 45,
    image: "/malaysian-roti-canai.png",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: "lunch",
    name: "Lunch",
    description: "Hearty midday meals",
    dishCount: 234,
    image: "/malaysian-lunch-rice-dishes.png",
    icon: <ChefHat className="h-5 w-5" />,
  },
  {
    id: "dinner",
    name: "Dinner",
    description: "Satisfying evening dishes",
    dishCount: 198,
    image: "/malaysian-family-dinner.png",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "snacks",
    name: "Snacks & Kuih",
    description: "Traditional snacks and sweets",
    dishCount: 87,
    image: "/malaysian-kuih.png",
    icon: <Leaf className="h-5 w-5" />,
  },
]

const dietaryCategories = [
  {
    id: "halal",
    name: "Halal Certified",
    description: "All halal-certified dishes",
    dishCount: 542,
    badge: "Most Popular",
    color: "bg-green-500",
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "Plant-based dishes",
    dishCount: 123,
    badge: "Healthy",
    color: "bg-green-600",
  },
  {
    id: "vegan",
    name: "Vegan",
    description: "Completely plant-based",
    dishCount: 67,
    badge: "Trending",
    color: "bg-emerald-600",
  },
  {
    id: "gluten-free",
    name: "Gluten-Free",
    description: "Safe for gluten sensitivity",
    dishCount: 89,
    badge: "Special Diet",
    color: "bg-blue-600",
  },
]

export function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <div className="min-h-screen bg-coconut-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-saffron-yellow to-amber-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Explore Food Categories</h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              Discover authentic Malaysian flavors from our home-based cooks
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Search and Filter */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Popular Cuisine Categories */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Cuisines</h2>
            <Badge variant="secondary" className="bg-saffron-yellow/10 text-saffron-yellow border-saffron-yellow/20">
              Most Ordered
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisineCategories.map((category) => (
              <Link key={category.id} href={`/browse?category=${category.id}`}>
                <Card
                  className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${category.color} hover:scale-105`}
                >
                  <div className="relative h-48 sm:h-52">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {category.popular && (
                      <Badge className="absolute top-3 left-3 bg-saffron-yellow text-white">Popular</Badge>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-saffron-yellow transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">{category.dishCount} dishes</span>
                      <ChefHat className="h-4 w-4 text-saffron-yellow" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Meal Categories */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Browse by Meal Time</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mealCategories.map((category) => (
              <Link key={category.id} href={`/browse?meal=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative h-32 sm:h-40">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-saffron-yellow">{category.icon}</div>
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-saffron-yellow transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{category.description}</p>
                    <span className="text-xs font-medium text-gray-500">{category.dishCount} dishes</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Dietary Categories */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dietary Preferences</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dietaryCategories.map((category) => (
              <Link key={category.id} href={`/browse?dietary=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 text-center p-6 sm:p-8 hover:scale-105">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Leaf className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-saffron-yellow transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {category.badge}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{category.dishCount} dishes</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-saffron-yellow/10 to-amber-100 rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse all our amazing home cooks or use our advanced search to find exactly what you're craving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-saffron-yellow hover:bg-amber-600">
              <Link href="/browse">Browse All Cooks</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/browse?search=true">Advanced Search</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
