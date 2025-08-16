import { Navigation } from "@/components/navigation"
import { OrderConfirmation } from "@/components/order-confirmation"

interface OrderConfirmationPageProps {
  params: {
    orderId: string
  }
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <OrderConfirmation orderId={params.orderId} />
    </main>
  )
}
