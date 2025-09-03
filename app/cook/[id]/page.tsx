import { Navigation } from '@/components/navigation';
import { CookProfile } from '@/components/cook-profile';

interface CookPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function CookPage({ params }: CookPageProps) {
	const { id } = await params;
	return (
		<main className="min-h-screen bg-background">
			<Navigation />
			<CookProfile cookId={id} />
		</main>
	);
}
