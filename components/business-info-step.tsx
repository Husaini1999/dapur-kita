"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface BusinessInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
}

const cuisineSpecialties = [
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
  "Ramadan Specials",
]

export function BusinessInfoStep({ formData, updateFormData }: BusinessInfoStepProps) {
  const toggleSpecialty = (specialty: string) => {
    const currentSpecialties = formData.specialties || []
    const updatedSpecialties = currentSpecialties.includes(specialty)
      ? currentSpecialties.filter((s: string) => s !== specialty)
      : [...currentSpecialties, specialty]
    updateFormData({ specialties: updatedSpecialties })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-foreground">Business Information</h2>
        <p className="text-muted-foreground">
          Tell us about your cooking business and specialties. This helps customers find you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="e.g., Mak Cik's Kitchen"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type *</Label>
          <Select value={formData.businessType} onValueChange={(value) => updateFormData({ businessType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home-based">Home-based Kitchen</SelectItem>
              <SelectItem value="catering">Catering Service</SelectItem>
              <SelectItem value="both">Both Home-based & Catering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsExperience">Years of Cooking Experience *</Label>
          <Select
            value={formData.yearsExperience}
            onValueChange={(value) => updateFormData({ yearsExperience: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="10+">More than 10 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="servingCapacity">Daily Serving Capacity *</Label>
          <Select
            value={formData.servingCapacity}
            onValueChange={(value) => updateFormData({ servingCapacity: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="How many orders per day?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 orders per day</SelectItem>
              <SelectItem value="6-15">6-15 orders per day</SelectItem>
              <SelectItem value="16-30">16-30 orders per day</SelectItem>
              <SelectItem value="30+">More than 30 orders per day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Cuisine Specialties * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cuisineSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={formData.specialties?.includes(specialty) || false}
                onCheckedChange={() => toggleSpecialty(specialty)}
              />
              <Label htmlFor={specialty} className="text-sm cursor-pointer">
                {specialty}
              </Label>
            </div>
          ))}
        </div>
        {formData.specialties?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.specialties.map((specialty: string) => (
              <Badge key={specialty} variant="secondary" className="bg-primary/10 text-primary">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
