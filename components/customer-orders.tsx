"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, MessageCircle } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    cookName: "Mak Cik's Kitchen",
    dishes: ["Nasi Lemak", "Beef Rendang"],
    total: 23.5,
    status: "delivered",
    date: "2024-01-15",
    rating: 5,
    deliveryTime: "45 mins",
  },
  {
    id: "ORD-002",
    cookName: "Ravi's Spice Corner",
    dishes: ["Banana Leaf Rice", "Fish Curry"],
    total: 18.0,
    status: "delivered",
    date: "2024-01-12",
    rating: 4,
    deliveryTime: "38 mins",
  },
  {
    id: "ORD-003",
    cookName: "Siti's Desserts",
    dishes: ["Kuih Lapis", "Onde-onde"],
    total: 12.0,
    status: "preparing",
    date: "2024-01-16",
    rating: null,
    deliveryTime: "Est. 30 mins",
  },
  {
    id: "ORD-004",
    cookName: "Uncle Wong's Wok",
    dishes: ["Char Kway Teow", "Wonton Soup"],
    total: 16.5,
    status: "on-the-way",
    date: "2024-01-16",
    rating: null,
    deliveryTime: "15 mins",
  },
]

export function CustomerOrders() {
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
          </div>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">Order History</CardTitle>
              <CardDescription>Track your orders and view past purchases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground text-lg">{order.cookName}</h3>
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.id} • {order.date} • {order.deliveryTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">RM {order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-medium text-muted-foreground">Items Ordered:</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm">{order.dishes.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                    {order.rating ? (
                      <div className="flex items-center gap-2">
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
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {order.status === "delivered" ? "Rate this order" : "Order in progress"}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {order.status !== "delivered" && (
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Cook
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "delivered" && !order.rating && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Rate Order
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
