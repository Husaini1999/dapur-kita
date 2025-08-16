"use client"

import { useState } from "react"
import { CookDashboardHeader } from "@/components/header"
import { CookDashboardSidebar } from "@/components/sidebar"
import { MenuManagement } from "@/components/menu-management"
import { OrdersOverview } from "@/components/orders-overview"
import { ProfileSettings } from "@/components/profile-settings"
import { Analytics } from "@/components/analytics"
import { ReviewsManagement } from "@/components/reviews-management"

export function CookDashboard() {
  const [activeTab, setActiveTab] = useState("menu")

  const renderContent = () => {
    switch (activeTab) {
      case "menu":
        return <MenuManagement />
      case "orders":
        return <OrdersOverview />
      case "reviews":
        return <ReviewsManagement />
      case "analytics":
        return <Analytics />
      case "profile":
        return <ProfileSettings />
      default:
        return <MenuManagement />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CookDashboardHeader />
      <div className="flex">
        <CookDashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
