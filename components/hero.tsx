import { ArrowLeft, Sparkles } from "lucide-react"
import { HeroVisual } from "./hero-visual"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            <span className="text-xs font-medium tracking-wide text-accent">
              סוכן AI אישי למשרד שלך
            </span>
          </div>

          <h1 className="mt-8 text-balance font-serif text-4xl font-bold leading-[1.1] text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
            המשרד שלך,{" "}
            <span className="relative inline-block">
              בקצב חדש.
              <span
                className="absolute -bottom-2 right-0 left-0 h-[3px] animate-shimmer bg-accent"
                aria-hidden="true"
              />
            </span>
            <br />
            בלי לאבד את <span className="text-accent">הסגנון.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/75 lg:text-xl">
            פלטפורמת אוטומציה שלומדת את שפת המשרד שלך — את החוזים, התבניות וסגנון
            הניסוח — ועובדת בשבילך ישירות מתוך{" "}
            <span className="font-medium text-foreground">Google Workspace</span> ו־
            <span className="font-medium text-foreground">Microsoft 365</span>. בלי
            תוכנות חדשות. בלי עקומת למידה. עם אבטחה ברמה משפטית.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="group inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90"
            >
              קבעו הדגמה אישית
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 px-2 py-4 text-sm font-medium text-foreground/70 transition hover:text-foreground"
            >
              צפו איך זה עובד
              <span aria-hidden="true">←</span>
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 border-t border-border pt-8">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary">SOC 2</span>
              <span className="text-xs text-muted-foreground">תקן אבטחה</span>
            </div>
            <div className="h-10 w-px bg-border" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary">100%</span>
              <span className="text-xs text-muted-foreground">בידוד נתונים</span>
            </div>
            <div className="h-10 w-px bg-border" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary">0</span>
              <span className="text-xs text-muted-foreground">תוכנה להתקין</span>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
