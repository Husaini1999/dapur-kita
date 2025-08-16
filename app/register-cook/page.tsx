import { Navigation } from "@/components/navigation"
import { CookRegistrationForm } from "@/components/cook-registration-form"

export default function RegisterCookPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">Join DapurKita as a Cook</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your culinary passion with your community. Start earning by cooking authentic Malaysian dishes from
            your home kitchen.
          </p>
        </div>
        <CookRegistrationForm />
      </div>
    </main>
  )
}
