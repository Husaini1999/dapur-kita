"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Star, Clock, Plus } from "lucide-react"

interface Dish {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  cookingTime: string
  available: boolean
  rating: number
  reviewCount: number
  dietaryInfo: string[]
}

interface DishCardProps {
  dish: Dish
  cookName: string
  cookId?: number
}

export function DishCard({ dish, cookName, cookId = 1 }: DishCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: `${cookId}-${dish.id}`,
      dishId: dish.id,
      dishName: dish.name,
      cookId: cookId,
      cookName: cookName,
      price: dish.price,
      image: dish.image,
      cookingTime: dish.cookingTime,
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg leading-tight">{dish.name}</h3>
              <div className="text-right">
                <div className="font-bold text-lg text-primary">RM {dish.price.toFixed(2)}</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{dish.description}</p>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{dish.rating}</span>
                  <span className="text-muted-foreground">({dish.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{dish.cookingTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {dish.dietaryInfo.slice(0, 2).map((info) => (
                  <Badge key={info} variant="secondary" className="text-xs">
                    {info}
                  </Badge>
                ))}
              </div>

              <Button
                size="sm"
                disabled={!dish.available}
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                <Plus className="h-3 w-3 mr-1" />
                {dish.available ? "Add" : "Sold Out"}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
