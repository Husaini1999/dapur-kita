import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Shield, Star, Camera } from 'lucide-react';

interface ReviewStepProps {
	formData: {
		fullName?: string;
		email?: string;
		phone?: string;
		city?: string;
		state?: string;
		businessName?: string;
		businessType?: string;
		yearsExperience?: string;
		servingCapacity?: string;
		specialties?: string[];
		halalCertification?: string;
		certificationNumber?: string;
		certificationExpiry?: string;
		profileImage?: File;
		kitchenImages?: File[];
		bio?: string;
		cookingStyle?: string;
		experience?: string;
		agreeToHalalCompliance?: boolean;
		agreeToTerms?: boolean;
		updateFormData?: (
			data: Partial<{
				agreeToTerms: boolean;
			}>
		) => void;
	};
}

export function ReviewStep({ formData }: ReviewStepProps) {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h2 className="font-serif font-bold text-2xl text-foreground">
					Review & Submit
				</h2>
				<p className="text-muted-foreground">
					Please review all your information before submitting your application.
					You can go back to edit any section.
				</p>
			</div>

			{/* Personal Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Mail className="h-5 w-5 text-primary" />
						<span>Personal Information</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<div className="text-sm text-muted-foreground">Full Name</div>
							<div className="font-medium">
								{formData.fullName || 'Not provided'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">Email</div>
							<div className="font-medium">
								{formData.email || 'Not provided'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">Phone</div>
							<div className="font-medium">
								{formData.phone || 'Not provided'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">Location</div>
							<div className="font-medium flex items-center space-x-1">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span>
									{formData.city}, {formData.state}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Business Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Star className="h-5 w-5 text-primary" />
						<span>Business Information</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<div className="text-sm text-muted-foreground">Business Name</div>
							<div className="font-medium">
								{formData.businessName || 'Not provided'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">Business Type</div>
							<div className="font-medium">
								{formData.businessType || 'Not provided'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">Experience</div>
							<div className="font-medium">
								{formData.yearsExperience || 'Not provided'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">
								Daily Capacity
							</div>
							<div className="font-medium">
								{formData.servingCapacity || 'Not provided'}
							</div>
						</div>
					</div>

					{(formData.specialties || []).length > 0 && (
						<div>
							<div className="text-sm text-muted-foreground mb-2">
								Specialties
							</div>
							<div className="flex flex-wrap gap-2">
								{(formData.specialties || []).map((specialty: string) => (
									<Badge
										key={specialty}
										variant="secondary"
										className="bg-primary/10 text-primary"
									>
										{specialty}
									</Badge>
								))}
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Halal Certification */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Shield className="h-5 w-5 text-primary" />
						<span>Halal Certification</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<div className="text-sm text-muted-foreground">
								Certification Status
							</div>
							<div className="font-medium">
								{formData.halalCertification || 'Not provided'}
							</div>
						</div>
						{formData.certificationNumber && (
							<div>
								<div className="text-sm text-muted-foreground">
									Certification Number
								</div>
								<div className="font-medium">
									{formData.certificationNumber}
								</div>
							</div>
						)}
					</div>
					{formData.agreeToHalalCompliance && (
						<div className="flex items-center space-x-2 text-green-700">
							<Shield className="h-4 w-4" />
							<span className="text-sm">Committed to halal compliance</span>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Profile Setup */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Camera className="h-5 w-5 text-primary" />
						<span>Profile Setup</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{formData.bio && (
						<div>
							<div className="text-sm text-muted-foreground mb-2">
								About You
							</div>
							<div className="text-sm leading-relaxed bg-muted/30 p-3 rounded-lg">
								{formData.bio}
							</div>
						</div>
					)}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<div className="text-sm text-muted-foreground">Profile Photo</div>
							<div className="font-medium">
								{formData.profileImage ? 'Uploaded' : 'Not uploaded'}
							</div>
						</div>
						<div>
							<div className="text-sm text-muted-foreground">
								Kitchen Photos
							</div>
							<div className="font-medium">
								{formData.kitchenImages?.length || 0} photos uploaded
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Separator />

			{/* Terms and Conditions */}
			<div className="space-y-4">
				<div className="flex items-start space-x-2">
					<Checkbox
						id="agreeToTerms"
						checked={formData.agreeToTerms}
						onCheckedChange={(checked) =>
							formData.updateFormData?.({ agreeToTerms: checked === true })
						}
					/>
					<Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
						I agree to DapurKita&apos;s Terms of Service, Privacy Policy, and
						Cook Guidelines. I understand that my application will be reviewed
						and I will be notified of the approval status within 3-5 business
						days. *
					</Label>
				</div>
			</div>
		</div>
	);
}
