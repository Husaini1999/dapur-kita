import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Users, Utensils } from 'lucide-react';

export function HeroSection() {
	return (
		<section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/30 to-primary/5">
			<div className="container max-w-6xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Left Content */}
					<div className="space-y-6 lg:space-y-8 text-center lg:text-left">
						<div className="space-y-4 lg:space-y-6">
							<Badge
								variant="secondary"
								className="border-accent/20 w-fit mx-auto lg:mx-0 text-black bg-green-400"
							>
								100% Halal Certified
							</Badge>
							<h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-foreground">
								Discover Authentic
								<span className="text-primary block">Malaysian Flavors</span>
							</h1>
							<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
								Connect with talented home-based cooks in your neighborhood.
								Experience the warmth of Malaysian hospitality through
								authentic, homemade dishes crafted with love.
							</p>
						</div>

						{/* Search Bar */}
						<div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search for dishes or cooks..."
									className="pl-10 h-11 sm:h-12"
								/>
							</div>
							<Button
								size="lg"
								className="bg-primary hover:bg-primary/90 h-11 sm:h-12 px-6 sm:px-8"
							>
								Find Food
							</Button>
						</div>

						{/* Location */}
						<div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
							<MapPin className="h-4 w-4" />
							<span>Delivering to Kuala Lumpur and surrounding areas</span>
						</div>

						{/* Stats */}
						<div className="flex items-center justify-center lg:justify-start space-x-6 sm:space-x-8 pt-4">
							<div className="flex items-center space-x-2">
								<Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
								<div>
									<div className="font-semibold text-sm sm:text-base text-foreground">
										500+
									</div>
									<div className="text-xs text-muted-foreground">
										Home Cooks
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
								<div>
									<div className="font-semibold text-sm sm:text-base text-foreground">
										2,000+
									</div>
									<div className="text-xs text-muted-foreground">Dishes</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
								<div>
									<div className="font-semibold text-sm sm:text-base text-foreground">
										4.8
									</div>
									<div className="text-xs text-muted-foreground">Rating</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Content - Hero Image */}
					<div className="relative mt-8 lg:mt-0">
						<div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 relative">
							<Image
								src="/malaysian-home-cook.png"
								alt="Malaysian home cook preparing traditional dishes"
								fill
								className="object-cover"
							/>
						</div>
						{/* Floating Cards */}
						<div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-card border rounded-lg p-2 sm:p-3 shadow-lg">
							<div className="flex items-center space-x-2">
								<div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
									<Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
								</div>
								<div>
									<div className="font-semibold text-xs sm:text-sm">
										Highly Rated
									</div>
									<div className="text-xs text-muted-foreground">
										4.9/5 stars
									</div>
								</div>
							</div>
						</div>
						<div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-card border rounded-lg p-2 sm:p-3 shadow-lg">
							<div className="flex items-center space-x-2">
								<div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent/10 rounded-full flex items-center justify-center">
									<Utensils className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
								</div>
								<div>
									<div className="font-semibold text-xs sm:text-sm">
										Fresh Daily
									</div>
									<div className="text-xs text-muted-foreground">
										Made to order
									</div>
								</div>
							</div>
						</div>
						<div className="absolute top-1/4 -left-4 sm:-left-6 bg-card border rounded-lg p-1 shadow-lg relative w-12 h-12 sm:w-16 sm:h-16">
							<Image
								src="/nasi-lemak.png"
								alt="Nasi Lemak"
								fill
								className="object-cover rounded"
							/>
						</div>
						<div className="absolute bottom-1/4 -right-4 sm:-right-6 bg-card border rounded-lg p-1 shadow-lg relative w-12 h-12 sm:w-16 sm:h-16">
							<Image
								src="/beef-rendang.png"
								alt="Beef Rendang"
								fill
								className="object-cover rounded"
							/>
						</div>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border rounded-lg p-1 shadow-lg opacity-90 relative w-10 h-10 sm:w-12 sm:h-12">
							<Image
								src="/banana-leaf-rice.png"
								alt="Banana Leaf Rice"
								fill
								className="object-cover rounded"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="container max-w-6xl mx-auto mt-12 sm:mt-16">
				<div className="text-center mb-8">
					<h2 className="font-serif font-bold text-2xl sm:text-3xl text-foreground mb-2">
						Popular Malaysian Dishes
					</h2>
					<p className="text-muted-foreground">
						Authentic flavors crafted by our talented home cooks
					</p>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
					<div className="group cursor-pointer">
						<div className="aspect-square rounded-xl overflow-hidden bg-card border relative">
							<Image
								src="/nasi-lemak.png"
								alt="Nasi Lemak"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
						<p className="text-center mt-2 font-medium text-sm">Nasi Lemak</p>
					</div>
					<div className="group cursor-pointer">
						<div className="aspect-square rounded-xl overflow-hidden bg-card border relative">
							<Image
								src="/beef-rendang.png"
								alt="Beef Rendang"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
						<p className="text-center mt-2 font-medium text-sm">Beef Rendang</p>
					</div>
					<div className="group cursor-pointer">
						<div className="aspect-square rounded-xl overflow-hidden bg-card border relative">
							<Image
								src="/banana-leaf-rice.png"
								alt="Banana Leaf Rice"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
						<p className="text-center mt-2 font-medium text-sm">
							Banana Leaf Rice
						</p>
					</div>
					<div className="group cursor-pointer">
						<div className="aspect-square rounded-xl overflow-hidden bg-card border relative">
							<Image
								src="/kuih-lapis.png"
								alt="Kuih Lapis"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
						<p className="text-center mt-2 font-medium text-sm">Kuih Lapis</p>
					</div>
				</div>
			</div>
		</section>
	);
}
