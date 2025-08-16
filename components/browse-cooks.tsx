"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CookCard } from "@/components/cook-card"
import { Search, Filter, MapPin, Utensils } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for cooks
const mockCooks = [
  {
    id: 1,
    name: "Mak Cik's Kitchen",
    ownerName: "Siti Aminah",
    image: "/cook-profile-1.png",
    coverImage: "/kitchen-1.png",
    rating: 4.8,
    reviewCount: 127,
    location: "Ampang, KL",
    distance: "2.3 km",
    specialties: ["Malay Traditional", "Peranakan"],
    deliveryTime: "30-45 mins",
    deliveryFee: 3.5,
    minOrder: 15.0,
    isOpen: true,
    featuredDishes: [
      { name: "Nasi Lemak Special", price: 12.5, image: "/nasi-lemak.png" },
      { name: "Rendang Daging", price: 18.0, image: "/beef-rendang.png" },
    ],
    totalOrders: 450,
    joinedDate: "2023",
  },
  {
    id: 2,
    name: "Uncle Wong's Wok",
    ownerName: "Wong Ah Chong",
    image: "/cook-profile-2.png",
    coverImage: "/kitchen-2.png",
    rating: 4.6,
    reviewCount: 89,
    location: "Petaling Jaya",
    distance: "4.1 km",
    specialties: ["Chinese Malaysian", "Fusion"],
    deliveryTime: "25-40 mins",
    deliveryFee: 4.0,
    minOrder: 20.0,
    isOpen: true,
    featuredDishes: [
      { name: "Char Kway Teow", price: 10.0, image: "/char-kway-teow.png" },
      { name: "Hokkien Mee", price: 12.0, image: "/hokkien-mee.png" },
    ],
    totalOrders: 320,
    joinedDate: "2023",
  },
  {
    id: 3,
    name: "Ravi's Spice Corner",
    ownerName: "Ravi Kumar",
    image: "/cook-profile-3.png",
    coverImage: "/kitchen-3.png",
    rating: 4.9,
    reviewCount: 156,
    location: "Brickfields, KL",
    distance: "3.7 km",
    specialties: ["Indian Malaysian", "Vegetarian"],
    deliveryTime: "35-50 mins",
    deliveryFee: 3.0,
    minOrder: 12.0,
    isOpen: false,
    featuredDishes: [
      { name: "Roti Canai", price: 3.5, image: "/roti-canai.png" },
      { name: "Banana Leaf Rice", price: 15.0, image: "/banana-leaf-rice.png" },
    ],
    totalOrders: 580,
    joinedDate: "2022",
  },
  {
    id: 4,
    name: "Nyonya Heritage Kitchen",
    ownerName: "Lily Tan",
    image: "/cook-profile-4.png",
    coverImage: "/kitchen-4.png",
    rating: 4.7,
    reviewCount: 203,
    location: "Malacca",
    distance: "1.8 km",
    specialties: ["Peranakan", "Nyonya"],
    deliveryTime: "40-55 mins",
    deliveryFee: 2.5,
    minOrder: 18.0,
    isOpen: true,
    featuredDishes: [
      { name: "Ayam Pongteh", price: 16.0, image: "/ayam-pongteh.png" },
      { name: "Kuih Lapis", price: 8.0, image: "/kuih-lapis.png" },
    ],
    totalOrders: 290,
    joinedDate: "2023",
  },
]

const cuisineTypes = [
  "Malay Traditional",
  "Chinese Malaysian",
  "Indian Malaysian",
  "Peranakan",
  "Nyonya",
  "Sabahan",
  "Sarawakian",
  "Fusion",
  "Vegetarian",
  "Halal Western",
]

export function BrowseCooks() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [maxDeliveryFee, setMaxDeliveryFee] = useState("")
  const [maxDistance, setMaxDistance] = useState("")

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  const filteredCooks = mockCooks
    .filter((cook) => {
      const matchesSearch =
        cook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cook.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCuisine =
        selectedCuisines.length === 0 || cook.specialties.some((specialty) => selectedCuisines.includes(specialty))

      const matchesOpen = !showOpenOnly || cook.isOpen

      const matchesDeliveryFee = !maxDeliveryFee || cook.deliveryFee <= Number.parseFloat(maxDeliveryFee)

      const matchesDistance = !maxDistance || Number.parseFloat(cook.distance) <= Number.parseFloat(maxDistance)

      return matchesSearch && matchesCuisine && matchesOpen && matchesDeliveryFee && matchesDistance
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        case "deliveryTime":
          return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
        case "deliveryFee":
          return a.deliveryFee - b.deliveryFee
        default:
          return 0
      }
    })

  return (
    <div className="container max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Delivering to Kuala Lumpur</span>
          <Button variant="link" className="p-0 h-auto text-primary text-sm">
            Change location
          </Button>
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground">Browse Home Cooks</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Discover authentic Malaysian flavors from talented home-based cooks in your neighborhood
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
                {(selectedCuisines.length > 0 || showOpenOnly || maxDeliveryFee || maxDistance) && (
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {selectedCuisines.length +
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
                <SheetDescription>Narrow down your search to find the perfect cook</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                {/* Cuisine Types */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Cuisine Types</Label>
                  <div className="space-y-2">
                    {cuisineTypes.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={selectedCuisines.includes(cuisine)}
                          onCheckedChange={() => toggleCuisine(cuisine)}
                        />
                        <Label htmlFor={cuisine} className="text-sm cursor-pointer">
                          {cuisine}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Availability</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="openOnly"
                      checked={showOpenOnly}
                      onCheckedChange={(checked) => setShowOpenOnly(!!checked)}
                    />
                    <Label htmlFor="openOnly" className="text-sm cursor-pointer">
                      Show only open kitchens
                    </Label>
                  </div>
                </div>

                {/* Delivery Fee */}
                <div className="space-y-3">
                  <Label htmlFor="maxDeliveryFee" className="text-base font-semibold">
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
                  <Label htmlFor="maxDistance" className="text-base font-semibold">
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
                    setSelectedCuisines([])
                    setShowOpenOnly(false)
                    setMaxDeliveryFee("")
                    setMaxDistance("")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {(selectedCuisines.length > 0 || showOpenOnly || maxDeliveryFee || maxDistance) && (
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
                onClick={() => setMaxDeliveryFee("")}
              >
                Max Fee: RM{maxDeliveryFee} ×
              </Badge>
            )}
            {maxDistance && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
                onClick={() => setMaxDistance("")}
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
          {filteredCooks.length} cook{filteredCooks.length !== 1 ? "s" : ""} found
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
              setSearchTerm("")
              setSelectedCuisines([])
              setShowOpenOnly(false)
              setMaxDeliveryFee("")
              setMaxDistance("")
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
