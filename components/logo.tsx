import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showWordmark?: boolean
}

/**
 * Dynamic logo placeholder. Renders a stacked-square mark plus an optional
 * Hebrew wordmark. Easy to swap for a brand SVG later.
 */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        aria-hidden="true"
        className="relative h-8 w-8 shrink-0 rounded-md bg-primary"
      >
        <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-sm bg-primary-foreground/90" />
        <span className="absolute right-1.5 bottom-1.5 h-3 w-3 rounded-sm bg-primary-foreground/40" />
      </div>
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight">
          OfficeOS
        </span>
      )}
    </div>
  )
}
