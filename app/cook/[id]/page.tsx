import { Navigation } from "@/components/navigation"
import { CookProfile } from "@/components/cook-profile"

interface CookPageProps {
  params: {
    id: string
  }
}

export default function CookPage({ params }: CookPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CookProfile cookId={params.id} />
    </main>
  )
}
