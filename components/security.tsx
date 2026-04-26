import { ShieldCheck, Lock, Database, EyeOff } from "lucide-react"

const guarantees = [
  {
    icon: Database,
    title: "בידוד מוחלט בין משרדים",
    body: "ארכיטקטורת Multi-Tenancy ברמה ארגונית. הנתונים של המשרד שלכם חיים בסביבה משלהם, ללא נגיעה למידע של משרד אחר.",
  },
  {
    icon: EyeOff,
    title: "לא משמש לאימון מודלים חיצוניים",
    body: "המסמכים שלכם לא נשלחים לחברות AI גלובליות לצורך אימון. נקודה. הסוכן לומד אך ורק עבור המשרד שלכם.",
  },
  {
    icon: Lock,
    title: "הצפנה מקצה לקצה",
    body: "כל הנתונים מוצפנים במנוחה (AES-256) ובתעבורה (TLS 1.3). מפתחות הצפנה ייעודיים לכל משרד בנפרד.",
  },
  {
    icon: ShieldCheck,
    title: "חיסיון עורך דין-לקוח כערך עליון",
    body: "המערכת תוכננה מהיסוד לכבד את חובת הסודיות המקצועית. תיעוד מלא של כל פעולה, הרשאות גרנולריות, ומחיקה אקטיבית בדרישה.",
  },
]

export function Security() {
  return (
    <section id="security" className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Header column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                אבטחה ופרטיות
              </span>
              <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
                המידע שלכם.
                <br />
                <span className="text-accent">רק שלכם.</span>
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/70">
                כשהלקוחות שלכם נותנים בכם אמון — הם נותנים אותו בכם, לא בענן
                שלישי. בנינו את הפלטפורמה תוך הבנה עמוקה של חובות הסודיות
                המקצועית, וההשלכות של דליפת מידע משפטי.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-foreground/80">SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-foreground/80">GDPR</span>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-foreground/80">ISO 27001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantees column */}
          <div className="lg:col-span-7">
            <ul className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
              {guarantees.map((g) => (
                <li
                  key={g.title}
                  className="flex gap-5 bg-card p-7 transition hover:bg-card/70"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <g.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">{g.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
