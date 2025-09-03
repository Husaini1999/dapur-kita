'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	ChefHat,
	ShoppingBag,
	BarChart3,
	User,
	Plus,
	MessageSquare,
} from 'lucide-react';

interface CookDashboardSidebarProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const sidebarItems = [
	{ id: 'menu', label: 'Menu Management', icon: ChefHat, badge: null },
	{ id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '3' },
	{ id: 'reviews', label: 'Reviews', icon: MessageSquare, badge: '2' },
	{ id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
	{ id: 'profile', label: 'Profile', icon: User, badge: null },
];

export function CookDashboardSidebar({
	activeTab,
	setActiveTab,
}: CookDashboardSidebarProps) {
	return (
		<aside className="w-64 border-r bg-muted/30 min-h-[calc(100vh-4rem)]">
			<div className="p-6 space-y-6">
				{/* Quick Actions */}
				<div className="space-y-3">
					<h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
						Quick Actions
					</h3>
					<Button className="w-full justify-start bg-primary hover:bg-primary/90">
						<Plus className="h-4 w-4 mr-2" />
						Add New Dish
					</Button>
				</div>

				{/* Navigation */}
				<div className="space-y-3">
					<h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
						Dashboard
					</h3>
					<nav className="space-y-1">
						{sidebarItems.map((item) => (
							<Button
								key={item.id}
								variant={activeTab === item.id ? 'secondary' : 'ghost'}
								className={`w-full justify-start ${
									activeTab === item.id
										? 'bg-primary/10 text-primary hover:bg-primary/20'
										: 'hover:bg-muted'
								}`}
								onClick={() => setActiveTab(item.id)}
							>
								<item.icon className="h-4 w-4 mr-2" />
								<span className="flex-1 text-left">{item.label}</span>
								{item.badge && (
									<Badge
										variant="secondary"
										className="bg-accent/10 text-accent border-accent/20 ml-2"
									>
										{item.badge}
									</Badge>
								)}
							</Button>
						))}
					</nav>
				</div>

				{/* Status */}
				<div className="space-y-3">
					<h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
						Status
					</h3>
					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Kitchen Status</span>
							<Badge
								variant="secondary"
								className="bg-green-100 text-green-800 border-green-200"
							>
								Open
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Active Dishes</span>
							<span className="font-medium">12</span>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Today&apos;s Orders</span>
							<span className="font-medium">8</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
