"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "@/components/personal-info-step"
import { BusinessInfoStep } from "@/components/business-info-step"
import { CertificationStep } from "@/components/certification-step"
import { ProfileSetupStep } from "@/components/profile-setup-step"
import { ReviewStep } from "@/components/review-step"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

const steps = [
  { id: 1, title: "Personal Information", description: "Basic details about you" },
  { id: 2, title: "Business Information", description: "Your cooking business details" },
  { id: 3, title: "Halal Certification", description: "Verify your halal compliance" },
  { id: 4, title: "Profile Setup", description: "Create your cook profile" },
  { id: 5, title: "Review & Submit", description: "Review and submit application" },
]

export function CookRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",

    // Business Info
    businessName: "",
    businessType: "",
    yearsExperience: "",
    specialties: [] as string[],
    servingCapacity: "",

    // Certification
    halalCertification: "",
    certificationNumber: "",
    certificationExpiry: "",

    // Profile
    bio: "",
    profileImage: null as File | null,
    kitchenImages: [] as File[],

    // Terms
    agreeToTerms: false,
    agreeToHalalCompliance: false,
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <BusinessInfoStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <CertificationStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <ProfileSetupStep formData={formData} updateFormData={updateFormData} />
      case 5:
        return <ReviewStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Registration Progress</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  step.id === currentStep
                    ? "bg-primary/10 border border-primary/20"
                    : step.id < currentStep
                      ? "bg-secondary/50"
                      : "bg-muted/30"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <div className="hidden md:block">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length}
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
        >
          <span>{currentStep === steps.length ? "Submit Application" : "Next"}</span>
          {currentStep < steps.length && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
