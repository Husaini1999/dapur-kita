import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, MapPin, CreditCard, Star, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Halal Certified",
    description: "All our cooks are verified and certified to ensure halal compliance in every dish.",
    badge: "Verified",
  },
  {
    icon: MapPin,
    title: "Neighborhood Delivery",
    description: "Fresh, homemade meals delivered from cooks in your local area within 30 minutes.",
    badge: "Local",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Safe and convenient payment options including online banking and e-wallets.",
    badge: "Secure",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Every cook is rated by the community. Only the best maintain their place on our platform.",
    badge: "Rated",
  },
  {
    icon: Clock,
    title: "Fresh & Fast",
    description: "Meals are prepared fresh when you order, ensuring the best taste and quality.",
    badge: "Fresh",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Support local home-based entrepreneurs while enjoying authentic Malaysian cuisine.",
    badge: "Community",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Why Choose DapurKita
          </Badge>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">
            Connecting Communities Through Food
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the authentic taste of Malaysian home cooking while supporting local entrepreneurs in your
            community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
