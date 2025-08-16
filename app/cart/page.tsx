import { Navigation } from "@/components/navigation"
import { CartPage } from "@/components/cart-page"

export default function Cart() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CartPage />
    </main>
  )
}
