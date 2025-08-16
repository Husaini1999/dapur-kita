"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare, TrendingUp, AlertCircle } from "lucide-react"

export function ReviewsManagement() {
  const [selectedReview, setSelectedReview] = useState<number | null>(null)
  const [response, setResponse] = useState("")

  const mockReviews = [
    {
      id: 1,
      customerName: "Ahmad Rahman",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Absolutely amazing nasi lemak! The sambal was perfectly spiced and the rice was so fragrant. Will definitely order again!",
      responded: false,
      orderValue: 25.5,
    },
    {
      id: 2,
      customerName: "Sarah Lee",
      rating: 4,
      date: "2024-01-08",
      comment:
        "Great rendang! Very authentic taste. Only minor issue was the packaging could be better to prevent spillage.",
      responded: true,
      response:
        "Thank you for the feedback! I've upgraded my packaging to prevent any spillage. Hope to serve you again soon!",
      orderValue: 18.0,
    },
    {
      id: 3,
      customerName: "Raj Kumar",
      rating: 3,
      date: "2024-01-05",
      comment: "Food was good but delivery took longer than expected. The curry was a bit too salty for my taste.",
      responded: false,
      orderValue: 32.0,
      needsAttention: true,
    },
  ]

  const handleResponse = (reviewId: number) => {
    // Mock API call to save response
    console.log(`Responding to review ${reviewId}: ${response}`)
    setSelectedReview(null)
    setResponse("")
  }

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-saffron-yellow/20 rounded-lg">
                <Star className="h-6 w-6 text-saffron-yellow" />
              </div>
              <div>
                <p className="text-2xl font-bold text-spice-brown">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-warm-gray">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-spice-brown">{mockReviews.length}</p>
                <p className="text-sm text-warm-gray">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-spice-brown">85%</p>
                <p className="text-sm text-warm-gray">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-spice-brown">Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className={`border rounded-lg p-4 ${review.needsAttention ? "border-orange-200 bg-orange-50" : "border-gray-200"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-saffron-yellow/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-spice-brown">{review.customerName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-spice-brown">{review.customerName}</p>
                      <p className="text-sm text-warm-gray">
                        {review.date} • RM {review.orderValue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {review.needsAttention && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "fill-saffron-yellow text-saffron-yellow" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-warm-gray mb-3">{review.comment}</p>

                {review.responded ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800 mb-1">Your Response:</p>
                    <p className="text-sm text-green-700">{review.response}</p>
                  </div>
                ) : (
                  <div>
                    {selectedReview === review.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Write a thoughtful response to this review..."
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleResponse(review.id)}
                            size="sm"
                            className="bg-saffron-yellow hover:bg-saffron-yellow/90 text-spice-brown"
                          >
                            Send Response
                          </Button>
                          <Button onClick={() => setSelectedReview(null)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setSelectedReview(review.id)}
                        variant="outline"
                        size="sm"
                        className="text-saffron-yellow border-saffron-yellow hover:bg-saffron-yellow hover:text-spice-brown"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
