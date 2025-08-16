import { ReviewForm } from "@/components/review-form"

export default function ReviewPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="min-h-screen bg-coconut-white">
      <div className="container mx-auto px-4 py-8">
        <ReviewForm orderId={params.orderId} />
      </div>
    </div>
  )
}
