"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS } from "@/config/nav"
import { BookingModal } from "@/components/booking-modal"
// import { ModeToggle } from "@/components/layout/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isHeroVisible, setIsHeroVisible] = React.useState(true)

  React.useEffect(() => {
    const heroSection = document.getElementById('hero-section')
    if (!heroSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [])

  const handleScrollToHero = () => {
    const heroInput = document.getElementById('hero-address-input')
    if (heroInput) {
      heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => heroInput.focus(), 500)
    }
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between padding-global">
        {/* Left Section: Logo + Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="Home">
            <Logo className="h-8 w-8 text-foreground hover:text-primary transition-colors" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {NAV_ITEMS.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href} className={navigationMenuTriggerStyle()}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-2">
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>

        {/* Right Section: CTA + Mobile Nav */}
        <div className="flex items-center gap-4">
          {isHeroVisible ? (
            <Button 
              className="hidden md:flex opacity-60 hover:opacity-100 transition-all duration-300"
              onClick={handleScrollToHero}
            >
              Get My Instant Quote
            </Button>
          ) : (
            <BookingModal>
              <Button className="hidden md:flex transition-all duration-300 shadow-md">Get My Instant Quote</Button>
            </BookingModal>
          )}

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
             {/* <ModeToggle /> */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {NAV_ITEMS.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>
    </header>
  )
}
