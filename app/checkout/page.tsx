import { Navigation } from "@/components/navigation"
import { CheckoutPage } from "@/components/checkout-page"

export default function Checkout() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CheckoutPage />
    </main>
  )
}
