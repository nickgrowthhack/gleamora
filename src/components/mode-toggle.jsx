"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  function toggleTheme() {
    // Se o tema for 'system', usamos o resolvedTheme para decidir a troca
    const currentTheme = theme === 'system' ? resolvedTheme : theme
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    
    setTheme(newTheme)
    // Atualiza o cookie para persistência SSR
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-default">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
