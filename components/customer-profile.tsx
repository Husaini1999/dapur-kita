"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Clock, Heart, ShoppingBag, Settings, Star } from "lucide-react"

// Mock customer data
const customerData = {
  id: "1",
  firstName: "Ahmad",
  lastName: "Rahman",
  email: "ahmad.rahman@example.com",
  phone: "+60 12-345 6789",
  address: "123 Jalan Bangsar, Bangsar, 59100 Kuala Lumpur",
  joinDate: "March 2024",
  totalOrders: 24,
  favoriteCount: 8,
  avatar: "/customer-1.png",
}

const recentOrders = [
  {
    id: "ORD-001",
    cookName: "Mak Cik's Kitchen",
    dishes: ["Nasi Lemak", "Beef Rendang"],
    total: 23.5,
    status: "delivered",
    date: "2024-01-15",
    rating: 5,
  },
  {
    id: "ORD-002",
    cookName: "Ravi's Spice Corner",
    dishes: ["Banana Leaf Rice", "Fish Curry"],
    total: 18.0,
    status: "delivered",
    date: "2024-01-12",
    rating: 4,
  },
  {
    id: "ORD-003",
    cookName: "Siti's Desserts",
    dishes: ["Kuih Lapis", "Onde-onde"],
    total: 12.0,
    status: "preparing",
    date: "2024-01-16",
    rating: null,
  },
]

const favoriteCooks = [
  {
    id: "1",
    name: "Mak Cik's Kitchen",
    image: "/cook-profile-1.png",
    cuisine: "Malay",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Ravi's Spice Corner",
    image: "/cook-profile-3.png",
    cuisine: "Indian",
    rating: 4.7,
  },
]

export function CustomerProfile() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "favorites">("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "preparing":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "on-the-way":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 shadow-sm border-0 bg-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                  <AvatarImage src={customerData.avatar || "/placeholder.svg"} alt={customerData.firstName} />
                  <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                    {customerData.firstName[0]}
                    {customerData.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      {customerData.firstName} {customerData.lastName}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4" />
                      Member since {customerData.joinDate}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {customerData.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {customerData.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Kuala Lumpur
                    </div>
                  </div>
                </div>

                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/profile/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm border-0 bg-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{customerData.totalOrders}</h3>
                <p className="text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mx-auto mb-4">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{customerData.favoriteCount}</h3>
                <p className="text-muted-foreground">Favorite Cooks</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-50 rounded-lg mx-auto mb-4">
                  <Star className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">4.9</h3>
                <p className="text-muted-foreground">Avg Rating Given</p>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeTab === "overview" ? "default" : "outline"}
              onClick={() => setActiveTab("overview")}
              className="h-10"
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "orders" ? "default" : "outline"}
              onClick={() => setActiveTab("orders")}
              className="h-10"
            >
              Recent Orders
            </Button>
            <Button
              variant={activeTab === "favorites" ? "default" : "outline"}
              onClick={() => setActiveTab("favorites")}
              className="h-10"
            >
              Favorite Cooks
            </Button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders Preview */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Orders</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/profile/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{order.cookName}</p>
                        <p className="text-sm text-muted-foreground">{order.dishes.join(", ")}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold">RM {order.total.toFixed(2)}</p>
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Favorite Cooks Preview */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Favorite Cooks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favoriteCooks.map((cook) => (
                    <div key={cook.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={cook.image || "/placeholder.svg"} alt={cook.name} />
                        <AvatarFallback>{cook.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{cook.name}</p>
                        <p className="text-sm text-muted-foreground">{cook.cuisine} Cuisine</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{cook.rating}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View all your past orders and their status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{order.cookName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.id} • {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <span className="font-semibold">RM {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Items:</p>
                      <p className="text-sm">{order.dishes.join(", ")}</p>
                    </div>
                    {order.rating && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <span className="text-sm text-muted-foreground">Your rating:</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < order.rating! ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "favorites" && (
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Favorite Cooks</CardTitle>
                <CardDescription>Your most loved home cooks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCooks.map((cook) => (
                    <div key={cook.id} className="border rounded-lg p-6 text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-4">
                        <AvatarImage src={cook.image || "/placeholder.svg"} alt={cook.name} />
                        <AvatarFallback>{cook.name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-foreground mb-2">{cook.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{cook.cuisine} Cuisine</p>
                      <div className="flex items-center justify-center gap-1 mb-4">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{cook.rating}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Menu
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
