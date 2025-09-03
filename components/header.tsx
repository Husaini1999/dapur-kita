'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, LogOut, Home } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function CookDashboardHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center justify-between px-6">
				{/* Logo */}
				<Link href="/" className="flex items-center space-x-2">
					<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
						<span className="text-primary-foreground font-bold text-sm">
							DK
						</span>
					</div>
					<span className="font-serif font-bold text-xl text-foreground">
						DapurKita
					</span>
					<Badge
						variant="secondary"
						className="bg-primary/10 text-primary border-primary/20 ml-2"
					>
						Cook Dashboard
					</Badge>
				</Link>

				{/* Header Actions */}
				<div className="flex items-center space-x-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">
							<Home className="h-4 w-4 mr-2" />
							View Site
						</Link>
					</Button>

					<Button variant="ghost" size="sm">
						<Bell className="h-4 w-4" />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage
										src="/placeholder.svg?height=32&width=32"
										alt="Cook profile"
									/>
									<AvatarFallback>MC</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<div className="flex items-center justify-start gap-2 p-2">
								<div className="flex flex-col space-y-1 leading-none">
									<p className="font-medium">Mak Cik&apos;s Kitchen</p>
									<p className="w-[200px] truncate text-sm text-muted-foreground">
										makcik@example.com
									</p>
								</div>
							</div>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
