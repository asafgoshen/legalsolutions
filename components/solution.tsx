import { FolderUp, Brain, FileCheck2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FolderUp,
    title: "מעלים תיקייה אחת",
    body: "אתם מצביעים על תיקיית Drive או OneDrive שמכילה את החוזים, התבניות והמסמכים הקיימים של המשרד. זה כל מה שאנחנו מבקשים.",
  },
  {
    number: "02",
    icon: Brain,
    title: "המערכת לומדת את ה-DNA שלכם",
    body: "מאגר ידע פרטי ומבודד למשרד שלכם. הסוכן מנתח את סגנון הניסוח, התבניות הנפוצות, השפה המקצועית, והפורמט המדויק שהמשרד עובד בו.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "מקבלים תפוקה במקום עבודה",
    body: "מסמכים, מיילים, זימונים ואוטומציות שנראים — וקוראים — בדיוק כאילו עורך דין מהמשרד שלכם כתב אותם. ישירות מתוך Gmail או Outlook.",
  },
]

export function Solution() {
  return (
    <section
      id="solution"
      className="relative overflow-hidden border-t border-border bg-primary py-24 lg:py-32"
    >
      {/* Subtle decorative gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.15), transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.08), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            הפתרון
          </span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            הסוכן האישי שלכם.
            <br />
            <span className="text-accent">בשלושה שלבים.</span>
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-primary-foreground/70">
            לא צ&apos;אטבוט גנרי. לא תבניות מוכנות מראש. סוכן שמכיר את המשרד שלכם
            לעומק — ועובד בתוך הסביבה שאתם כבר משתמשים בה.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative">
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div
                  className="absolute top-7 right-full hidden h-px w-full bg-gradient-to-l from-accent/40 to-transparent md:block"
                  aria-hidden="true"
                />
              )}

              <div className="relative flex h-full flex-col rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.03] p-8 backdrop-blur-sm transition hover:border-accent/30 hover:bg-primary-foreground/[0.05]">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 ring-1 ring-accent/20">
                    <step.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-5xl font-bold text-primary-foreground/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl font-bold text-primary-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
