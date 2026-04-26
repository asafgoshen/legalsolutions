import { ArrowLeft, Calendar, MessageSquare } from "lucide-react"

export function CTA() {
  return (
    <section id="cta" className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary p-10 sm:p-14 lg:p-20">
          {/* Decorative gold corners */}
          <div
            className="absolute top-0 right-0 h-32 w-32 border-t-2 border-r-2 border-accent/40"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 h-32 w-32 border-b-2 border-l-2 border-accent/40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.15), transparent 50%)",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              ההזמנה שלכם
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              ראו איך המשרד שלכם
              <br />
              <span className="text-accent">נראה ב־AI.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
              הדגמה אישית של 30 דקות, על המסמכים האמיתיים של המשרד שלכם. אם
              תחליטו להמשיך — נתחיל בפיילוט ממוקד של 14 יום, ללא התחייבות.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-3 rounded-md bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent/90"
              >
                <Calendar className="h-4 w-4" strokeWidth={2} />
                קביעת הדגמה אישית
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-primary-foreground/20 px-7 py-4 text-sm font-medium text-primary-foreground transition hover:border-primary-foreground/40 hover:bg-primary-foreground/[0.04]"
              >
                <MessageSquare className="h-4 w-4" strokeWidth={1.5} />
                דברו איתנו
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-primary-foreground/10 pt-8 text-xs text-primary-foreground/55">
              <span>· הדגמה ללא עלות</span>
              <span>· פיילוט של 14 יום ללא התחייבות</span>
              <span>· ליווי הטמעה אישי</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
