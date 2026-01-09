import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { NAV_ITEMS } from "@/config/nav"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 padding-global">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Gleamora. All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
            {NAV_ITEMS.map((item) => (
                <Link 
                    key={item.href} 
                    href={item.href}
                    className="text-sm font-medium hover:underline underline-offset-4"
                >
                    {item.label}
                </Link>
            ))}
            <div className="h-4 w-px bg-border hidden md:block" />
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">Terms</a>
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
