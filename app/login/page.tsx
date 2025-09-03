import { Suspense } from 'react';
import { CustomerLogin } from '@/components/customer-login';

export default function Login() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CustomerLogin />
		</Suspense>
	);
}
