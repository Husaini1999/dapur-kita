"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AddDishDialog } from "@/components/add-dish-dialog"
import { EditDishDialog } from "@/components/edit-dish-dialog"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for menu items
const mockMenuItems = [
  {
    id: 1,
    name: "Nasi Lemak Special",
    category: "Malay Traditional",
    price: 12.5,
    image: "/nasi-lemak.png",
    description: "Fragrant coconut rice with sambal, fried anchovies, peanuts, and boiled egg",
    cookingTime: "30 mins",
    available: true,
    orders: 45,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Rendang Daging",
    category: "Malay Traditional",
    price: 18.0,
    image: "/beef-rendang.png",
    description: "Slow-cooked beef in rich coconut curry with aromatic spices",
    cookingTime: "45 mins",
    available: true,
    orders: 32,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Char Kway Teow",
    category: "Chinese Malaysian",
    price: 10.0,
    image: "/char-kway-teow.png",
    description: "Stir-fried flat rice noodles with prawns, Chinese sausage, and bean sprouts",
    cookingTime: "20 mins",
    available: false,
    orders: 28,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Roti Canai",
    category: "Indian Malaysian",
    price: 3.5,
    image: "/roti-canai.png",
    description: "Flaky flatbread served with curry dhal",
    cookingTime: "15 mins",
    available: true,
    orders: 67,
    rating: 4.7,
  },
]

export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingDish, setEditingDish] = useState<any>(null)
  const [menuItems, setMenuItems] = useState(mockMenuItems)

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleAvailability = (id: number) => {
    setMenuItems((items) => items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-3xl text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">Manage your dishes, prices, and availability</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Dish
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-lg">12</div>
                <div className="text-xs text-muted-foreground">Total Dishes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-lg">9</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <EyeOff className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-lg">3</div>
                <div className="text-xs text-muted-foreground">Unavailable</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-accent font-bold text-sm">RM</span>
              </div>
              <div>
                <div className="font-semibold text-lg">RM 450</div>
                <div className="text-xs text-muted-foreground">Today's Sales</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={item.available ? "secondary" : "destructive"}
                  className={
                    item.available
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }
                >
                  {item.available ? "Available" : "Sold Out"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingDish(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleAvailability(item.id)}>
                        {item.available ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Mark Unavailable
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Mark Available
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-bold text-lg text-primary">RM {item.price.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{item.cookingTime}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-medium">{item.orders} orders</div>
                    <div className="text-xs text-muted-foreground">⭐ {item.rating}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialogs */}
      <AddDishDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      {editingDish && (
        <EditDishDialog
          dish={editingDish}
          open={!!editingDish}
          onOpenChange={(open) => !open && setEditingDish(null)}
        />
      )}
    </div>
  )
}
