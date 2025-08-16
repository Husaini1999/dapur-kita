import { Navigation } from "@/components/navigation"
import { BrowseCooks } from "@/components/browse-cooks"

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <BrowseCooks />
    </main>
  )
}
