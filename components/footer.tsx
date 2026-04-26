import { Scale } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Scale className="h-4 w-4 text-accent" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold text-primary">Lexis</span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
              AI · LEGAL
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <a href="#" className="transition hover:text-foreground">
            תנאי שימוש
          </a>
          <a href="#" className="transition hover:text-foreground">
            פרטיות
          </a>
          <a href="#" className="transition hover:text-foreground">
            אבטחה
          </a>
          <a href="#" className="transition hover:text-foreground">
            יצירת קשר
          </a>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lexis AI. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  )
}
