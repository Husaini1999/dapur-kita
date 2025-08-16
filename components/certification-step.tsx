"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertCircle, CheckCircle } from "lucide-react"

interface CertificationStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function CertificationStep({ formData, updateFormData }: CertificationStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-foreground">Halal Certification</h2>
        <p className="text-muted-foreground">
          DapurKita is committed to serving only halal-certified food. Please provide your halal certification details.
        </p>
      </div>

      {/* Halal Importance Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">100% Halal Guarantee</h3>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  Required
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All cooks on DapurKita must maintain valid halal certification. This ensures our Muslim customers can
                order with complete confidence and trust.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="halalCertification">Halal Certification Status *</Label>
          <Select
            value={formData.halalCertification}
            onValueChange={(value) => updateFormData({ halalCertification: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your certification status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jakim">JAKIM Certified</SelectItem>
              <SelectItem value="state">State Islamic Authority Certified</SelectItem>
              <SelectItem value="pending">Application Pending</SelectItem>
              <SelectItem value="will-apply">Will Apply After Registration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(formData.halalCertification === "jakim" || formData.halalCertification === "state") && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="certificationNumber">Certification Number *</Label>
                <Input
                  id="certificationNumber"
                  value={formData.certificationNumber}
                  onChange={(e) => updateFormData({ certificationNumber: e.target.value })}
                  placeholder="Enter certification number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificationExpiry">Expiry Date *</Label>
                <Input
                  id="certificationExpiry"
                  type="date"
                  value={formData.certificationExpiry}
                  onChange={(e) => updateFormData({ certificationExpiry: e.target.value })}
                />
              </div>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Excellent!</div>
                    <div className="text-sm text-green-700">
                      Your existing halal certification will be verified during the approval process.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {(formData.halalCertification === "pending" || formData.halalCertification === "will-apply") && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="space-y-2">
                  <div className="font-medium text-orange-800">Certification Required</div>
                  <div className="text-sm text-orange-700 leading-relaxed">
                    You'll need to obtain halal certification before you can start selling on DapurKita. We can help
                    guide you through the process:
                  </div>
                  <ul className="text-sm text-orange-700 space-y-1 ml-4">
                    <li>• Contact your local State Islamic Authority</li>
                    <li>• Submit application with required documents</li>
                    <li>• Schedule kitchen inspection</li>
                    <li>• Receive certification (usually 2-4 weeks)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToHalalCompliance"
              checked={formData.agreeToHalalCompliance}
              onCheckedChange={(checked) => updateFormData({ agreeToHalalCompliance: checked })}
            />
            <Label htmlFor="agreeToHalalCompliance" className="text-sm leading-relaxed">
              I commit to maintaining halal compliance in all aspects of food preparation, sourcing, and handling. I
              understand that any violation may result in immediate suspension from the platform. *
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
