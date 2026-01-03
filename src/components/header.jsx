import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/ui/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between padding-global">
        <Logo className="h-8 w-8 text-foreground hover:text-primary transition-colors" />
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
