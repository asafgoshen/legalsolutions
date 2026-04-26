import { FileText, Mail, Calendar, Sparkles, Check } from "lucide-react"

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Decorative gold corner accent */}
      <div
        className="absolute -top-4 -right-4 h-24 w-24 border-t-2 border-r-2 border-accent/40"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-accent/40"
        aria-hidden="true"
      />

      {/* Main document card */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/10">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="font-mono">חוזה_שירות_v2.docx</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Document body */}
        <div className="space-y-3 p-6">
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-accent">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              נוסח בסגנון המשרד
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <div className="h-3 w-3/4 rounded bg-foreground/85" />
            <div className="h-2 w-full rounded bg-muted-foreground/30" />
            <div className="h-2 w-11/12 rounded bg-muted-foreground/30" />
            <div className="h-2 w-4/5 rounded bg-muted-foreground/30" />
          </div>

          <div className="space-y-2 pt-3">
            <div className="h-2.5 w-1/3 rounded bg-primary/70" />
            <div className="h-2 w-full rounded bg-muted-foreground/30" />
            <div className="h-2 w-5/6 rounded bg-muted-foreground/30" />
          </div>

          <div className="space-y-2 pt-3">
            <div className="h-2.5 w-2/5 rounded bg-primary/70" />
            <div className="h-2 w-full rounded bg-muted-foreground/30" />
            <div className="h-2 w-3/4 rounded bg-muted-foreground/30" />
          </div>

          {/* Generated indicator line */}
          <div className="!mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
            <span>נוצר על בסיס 247 חוזים קודמים של המשרד</span>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -bottom-6 -right-6 hidden rounded-lg border border-border bg-card p-4 shadow-xl shadow-primary/5 sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/5">
            <Mail className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-primary">12 מיילים נענו</div>
            <div className="text-[11px] text-muted-foreground">בשעה האחרונה</div>
          </div>
        </div>
      </div>

      <div className="absolute -top-6 -left-6 hidden rounded-lg border border-border bg-card p-4 shadow-xl shadow-primary/5 sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
            <Calendar className="h-4 w-4 text-accent" strokeWidth={1.5} />
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-primary">דיון נקבע</div>
            <div className="text-[11px] text-muted-foreground">29.04, 10:30</div>
          </div>
        </div>
      </div>
    </div>
  )
}
