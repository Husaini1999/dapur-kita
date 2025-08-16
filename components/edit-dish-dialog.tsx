"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, X } from "lucide-react"

interface EditDishDialogProps {
  dish: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = [
  "Malay Traditional",
  "Chinese Malaysian",
  "Indian Malaysian",
  "Peranakan/Nyonya",
  "Sabahan Cuisine",
  "Sarawakian Cuisine",
  "Fusion Malaysian",
  "Vegetarian/Vegan",
  "Halal Western",
  "Desserts & Kuih",
  "Beverages",
]

const dietaryOptions = ["Halal", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Spicy", "Low-Carb"]

export function EditDishDialog({ dish, open, onOpenChange }: EditDishDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    cookingTime: "",
    servingSize: "",
    ingredients: "",
    dietaryInfo: [] as string[],
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name || "",
        category: dish.category || "",
        price: dish.price?.toString() || "",
        description: dish.description || "",
        cookingTime: dish.cookingTime || "",
        servingSize: dish.servingSize || "",
        ingredients: dish.ingredients || "",
        dietaryInfo: dish.dietaryInfo || ["Halal"],
        image: null,
      })
      setImagePreview(dish.image || null)
    }
  }, [dish])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const toggleDietaryOption = (option: string) => {
    const updated = formData.dietaryInfo.includes(option)
      ? formData.dietaryInfo.filter((item) => item !== option)
      : [...formData.dietaryInfo, option]
    setFormData({ ...formData, dietaryInfo: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Updating dish:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Edit Dish</DialogTitle>
          <DialogDescription>Update your dish information, pricing, and availability.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Dish Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Nasi Lemak Special"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your dish, its flavors, and what makes it special..."
                rows={3}
                required
              />
            </div>
          </div>

          {/* Pricing and Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Pricing & Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (RM) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.50"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="12.50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cookingTime">Cooking Time *</Label>
                <Select
                  value={formData.cookingTime}
                  onValueChange={(value) => setFormData({ ...formData, cookingTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15 mins">15 minutes</SelectItem>
                    <SelectItem value="30 mins">30 minutes</SelectItem>
                    <SelectItem value="45 mins">45 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="servingSize">Serving Size *</Label>
                <Select
                  value={formData.servingSize}
                  onValueChange={(value) => setFormData({ ...formData, servingSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 person">1 person</SelectItem>
                    <SelectItem value="2-3 people">2-3 people</SelectItem>
                    <SelectItem value="4-5 people">4-5 people</SelectItem>
                    <SelectItem value="Family size">Family size (6+ people)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dietary Information */}
          <div className="space-y-4">
            <Label>Dietary Information</Label>
            <div className="grid grid-cols-4 gap-3">
              {dietaryOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={formData.dietaryInfo.includes(option)}
                    onCheckedChange={() => toggleDietaryOption(option)}
                  />
                  <Label htmlFor={option} className="text-sm cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {formData.dietaryInfo.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.dietaryInfo.map((info) => (
                  <Badge key={info} variant="secondary" className="bg-primary/10 text-primary">
                    {info}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Dish Photo</Label>
            <div className="flex items-start space-x-6">
              {imagePreview ? (
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Dish preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData({ ...formData, image: null })
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="dishImage" className="cursor-pointer">
                  <Button type="button" variant="outline" className="bg-transparent" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </span>
                  </Button>
                </Label>
                <Input id="dishImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <p className="text-xs text-muted-foreground">Upload a new photo to replace the current one.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Update Dish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
