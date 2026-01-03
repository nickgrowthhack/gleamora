import { cn } from "@/lib/utils"

export function Logo({ className, ...props }) {
  return (
    <div className={cn("relative group", className)} {...props}>
      <img
        src="/logo.svg"
        alt="Gleamora Logo"
        className="h-full w-full object-contain transition-opacity duration-300 opacity-100 dark:opacity-0 group-hover:opacity-0"
      />
      <div
        className="absolute inset-0 h-full w-full bg-current transition-opacity duration-300 opacity-0 dark:opacity-100 group-hover:opacity-100"
        style={{
          maskImage: 'url(/logo.svg)',
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: 'url(/logo.svg)',
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </div>
  )
}
