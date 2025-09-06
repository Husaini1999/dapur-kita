import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import { CartProvider } from '@/contexts/cart-context';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

const merriweather = Merriweather({
	weight: ['300', '400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-merriweather',
});

export const metadata: Metadata = {
	title: 'DapurKita - Malaysian Home Cooking Marketplace',
	description:
		'Connect with talented home-based cooks in Malaysia. Discover authentic halal dishes made with love.',
	generator: 'v0.app',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${merriweather.variable} antialiased`}
		>
			<body>
				{/* Demo Disclaimer Banner */}
				<div className="bg-amber-100 border-b border-amber-200 text-amber-800 text-center py-2 px-4 text-sm">
					<strong>Demo Website:</strong> This website is for demonstration
					purposes only. Some features may not function properly.
				</div>
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	);
}
