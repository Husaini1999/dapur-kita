"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Camera } from "lucide-react"

interface ProfileSetupStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function ProfileSetupStep({ formData, updateFormData }: ProfileSetupStepProps) {
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [kitchenPreviews, setKitchenPreviews] = useState<string[]>([])

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData({ profileImage: file })
      const reader = new FileReader()
      reader.onload = (e) => setProfilePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleKitchenImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      updateFormData({ kitchenImages: [...formData.kitchenImages, ...files] })

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setKitchenPreviews((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeKitchenImage = (index: number) => {
    const updatedImages = formData.kitchenImages.filter((_: any, i: number) => i !== index)
    const updatedPreviews = kitchenPreviews.filter((_, i) => i !== index)
    updateFormData({ kitchenImages: updatedImages })
    setKitchenPreviews(updatedPreviews)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-foreground">Profile Setup</h2>
        <p className="text-muted-foreground">
          Create an attractive profile that showcases your cooking skills and kitchen to potential customers.
        </p>
      </div>

      {/* Profile Image */}
      <div className="space-y-4">
        <Label>Profile Photo *</Label>
        <div className="flex items-start space-x-6">
          <div className="relative">
            {profilePreview ? (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={profilePreview || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage" className="cursor-pointer">
              <Button variant="outline" className="bg-transparent" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </span>
              </Button>
            </Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground">
              Upload a clear, friendly photo of yourself. This helps build trust with customers.
            </p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">About You *</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          placeholder="Tell customers about your cooking journey, specialties, and what makes your food special. Share your passion for Malaysian cuisine!"
          rows={4}
        />
        <p className="text-xs text-muted-foreground">{formData.bio?.length || 0}/500 characters</p>
      </div>

      {/* Kitchen Images */}
      <div className="space-y-4">
        <Label>Kitchen Photos *</Label>
        <p className="text-sm text-muted-foreground">
          Upload 2-5 photos of your kitchen to show customers your clean, organized cooking space.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {kitchenPreviews.map((preview, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Kitchen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => removeKitchenImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}

          {kitchenPreviews.length < 5 && (
            <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                <Label htmlFor="kitchenImages" className="cursor-pointer">
                  <div className="aspect-square flex flex-col items-center justify-center space-y-2 text-muted-foreground hover:text-primary transition-colors">
                    <Upload className="h-8 w-8" />
                    <span className="text-sm font-medium">Add Photo</span>
                  </div>
                </Label>
                <Input
                  id="kitchenImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleKitchenImagesChange}
                  className="hidden"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Recommended: Include photos of your cooking area, storage, and any special equipment you use.
        </p>
      </div>
    </div>
  )
}
