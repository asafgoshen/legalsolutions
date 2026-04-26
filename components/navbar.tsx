import { Scale } from "lucide-react"

export function Navbar() {
  return (
    <header className="absolute top-0 right-0 left-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Scale className="h-5 w-5 text-accent" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold text-primary">Lexis</span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
              AI · LEGAL
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          <a href="#problem" className="text-sm text-foreground/70 transition hover:text-foreground">
            הבעיה
          </a>
          <a href="#solution" className="text-sm text-foreground/70 transition hover:text-foreground">
            איך זה עובד
          </a>
          <a href="#features" className="text-sm text-foreground/70 transition hover:text-foreground">
            יכולות
          </a>
          <a href="#security" className="text-sm text-foreground/70 transition hover:text-foreground">
            אבטחה
          </a>
        </div>

        <a
          href="#cta"
          className="hidden rounded-md border border-primary/15 bg-card px-5 py-2.5 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground md:inline-block"
        >
          קביעת הדגמה
        </a>
      </nav>
    </header>
  )
}
