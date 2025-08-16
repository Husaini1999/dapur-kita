"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { Menu, Search, ShoppingCart, User, MapPin, LogOut, Settings, Heart, Clock } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock auth state
  const { state } = useCart()
  const router = useRouter()

  const handleSearch = () => {
    router.push("/search")
  }

  const handleProfile = () => {
    if (isLoggedIn) {
      router.push("/profile")
    } else {
      router.push("/login")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-xs sm:text-sm">DK</span>
          </div>
          <span className="font-serif font-bold text-lg sm:text-xl text-foreground">DapurKita</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors relative group">
            Browse Cooks
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors relative group">
            Categories
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <div className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors cursor-pointer group">
            <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline">Kuala Lumpur</span>
            <span className="xl:hidden">KL</span>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-50 text-green-700 border-green-200 hidden xl:flex hover:bg-green-100 transition-colors"
          >
            ✓ Halal Certified
          </Badge>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3 hover:bg-amber-50 hover:text-amber-700 transition-all hover:scale-105"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="relative h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3 hover:bg-amber-50 hover:text-amber-700 transition-all hover:scale-105"
          >
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden lg:inline ml-2">Cart</span>
              {state.itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground animate-pulse">
                  {state.itemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Profile Dropdown for logged in users */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3 hover:bg-amber-50 hover:text-amber-700 transition-all"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline ml-2">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/orders" className="cursor-pointer">
                    <Clock className="h-4 w-4 mr-2" />
                    Order History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/favorites" className="cursor-pointer">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/settings" className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfile}
              className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3 hover:bg-amber-50 hover:text-amber-700 transition-all hover:scale-105"
            >
              <User className="h-4 w-4" />
              <span className="hidden lg:inline ml-2">Sign In</span>
            </Button>
          )}

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-xs lg:text-sm px-2 lg:px-4 shadow-sm hover:shadow-md transition-all hover:scale-105"
            asChild
          >
            <Link href="/register-cook">
              <span className="hidden sm:inline">Join as Cook</span>
              <span className="sm:hidden">Join</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-amber-50 transition-colors">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 px-6">
            <div className="flex flex-col space-y-6 mt-8">
              <div className="text-center pb-4 border-b">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-primary-foreground font-bold text-lg">DK</span>
                </div>
                <h2 className="font-serif font-bold text-xl text-foreground">DapurKita</h2>
              </div>

              <Link
                href="/browse"
                className="text-lg font-medium py-3 hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                onClick={() => setIsOpen(false)}
              >
                Browse Cooks
              </Link>
              <Link
                href="/categories"
                className="text-lg font-medium py-3 hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>

              <div className="flex items-center space-x-2 py-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-lg font-medium">Kuala Lumpur</span>
              </div>

              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 w-fit">
                ✓ Halal Certified
              </Badge>

              <div className="flex flex-col space-y-3 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSearch()
                    setIsOpen(false)
                  }}
                  className="justify-start bg-transparent h-12 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  <Search className="h-4 w-4 mr-3" />
                  Search
                </Button>

                <Button
                  variant="outline"
                  className="justify-start bg-transparent h-12 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  asChild
                >
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Cart {state.itemCount > 0 && `(${state.itemCount})`}
                  </Link>
                </Button>

                {isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      className="justify-start bg-transparent h-12 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      asChild
                    >
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <User className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="justify-start bg-transparent h-12 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleProfile()
                      setIsOpen(false)
                    }}
                    className="justify-start bg-transparent h-12 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Sign In
                  </Button>
                )}

                <Button
                  className="bg-primary hover:bg-primary/90 h-12 mt-4 shadow-sm hover:shadow-md transition-all"
                  asChild
                >
                  <Link href="/register-cook" onClick={() => setIsOpen(false)}>
                    Join as Cook
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
