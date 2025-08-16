"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, Camera, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReviewFormProps {
  orderId: string
}

export function ReviewForm({ orderId }: ReviewFormProps) {
  const [ratings, setRatings] = useState({
    overall: 0,
    food: 0,
    delivery: 0,
    packaging: 0,
  })
  const [review, setReview] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  // Mock order data - would come from API
  const orderData = {
    cookName: "Kak Siti's Kitchen",
    cookImage: "/cook-profile-1.png",
    items: [
      { name: "Nasi Lemak Special", quantity: 2, price: 12.0 },
      { name: "Rendang Ayam", quantity: 1, price: 15.0 },
    ],
    total: 39.0,
    deliveredAt: "2024-01-15T14:30:00Z",
  }

  const handleRatingChange = (category: keyof typeof ratings, rating: number) => {
    setRatings((prev) => ({ ...prev, [category]: rating }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-spice-brown mb-2">Review Submitted!</h2>
          <p className="text-warm-gray mb-6">
            Thank you for your feedback. Your review helps other customers make better choices.
          </p>
          <Button
            onClick={() => router.push("/browse")}
            className="bg-saffron-yellow hover:bg-saffron-yellow/90 text-spice-brown"
          >
            Continue Browsing
          </Button>
        </CardContent>
      </Card>
    )
  }

  const StarRating = ({
    rating,
    onRatingChange,
    label,
  }: { rating: number; onRatingChange: (rating: number) => void; label: string }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-spice-brown font-medium">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onRatingChange(star)} className="transition-colors">
            <Star
              className={`h-6 w-6 ${star <= rating ? "fill-saffron-yellow text-saffron-yellow" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-spice-brown">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={orderData.cookImage || "/placeholder.svg"}
              alt={orderData.cookName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-spice-brown">{orderData.cookName}</h3>
              <p className="text-sm text-warm-gray">
                Delivered on {new Date(orderData.deliveredAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>RM {item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 font-semibold flex justify-between">
              <span>Total</span>
              <span>RM {orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-spice-brown">Rate Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <StarRating
                rating={ratings.overall}
                onRatingChange={(rating) => handleRatingChange("overall", rating)}
                label="Overall Experience"
              />
              <StarRating
                rating={ratings.food}
                onRatingChange={(rating) => handleRatingChange("food", rating)}
                label="Food Quality"
              />
              <StarRating
                rating={ratings.delivery}
                onRatingChange={(rating) => handleRatingChange("delivery", rating)}
                label="Delivery Time"
              />
              <StarRating
                rating={ratings.packaging}
                onRatingChange={(rating) => handleRatingChange("packaging", rating)}
                label="Packaging"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-spice-brown mb-2">Write a Review (Optional)</label>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience with other customers..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-spice-brown mb-2">Add Photos (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload photos of your food</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-saffron-yellow hover:text-saffron-yellow/80"
                >
                  Choose Files
                </label>
                {photos.length > 0 && <p className="text-sm text-green-600 mt-2">{photos.length} photo(s) selected</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={ratings.overall === 0 || isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isSubmitting ? "Submitting Review..." : "Submit Review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
