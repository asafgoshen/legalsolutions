import { FileEdit, Mail, CalendarClock, Inbox } from "lucide-react"

const pains = [
  {
    icon: FileEdit,
    title: "ניסוח חוזים מאפס",
    body: "שעות אחרי שעות של העתק־הדבק מתבניות ישנות, תיקונים ידניים, ובדיקה שלא שכחתם סעיף.",
  },
  {
    icon: Mail,
    title: "מיילים שגרתיים",
    body: "אישורי קבלה, בקשות עדכון, תיאומים ראשוניים — אותו תוכן, יום אחר יום, בשפה של המשרד.",
  },
  {
    icon: CalendarClock,
    title: "תאריכי דיונים וזימונים",
    body: "ניהול ידני של מועדים, סנכרון בין יומנים, מעקב אחרי תזכורות — בלי שום מערכת מרכזית.",
  },
  {
    icon: Inbox,
    title: "תיק אינסופי במייל",
    body: "מאות הודעות שמחכות למענה, חלקן דחופות, וקשה להפריד בין החשוב לבין השגרתי.",
  },
]

export function Problem() {
  return (
    <section id="problem" className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            הבעיה
          </span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            עורכי דין לא הוכשרו{" "}
            <span className="italic text-foreground/60">לעבודה השחורה.</span>
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/70">
            הזמן היקר שלכם נשרף על משימות חוזרות שמחכות לאוטומציה כבר שנים — אבל
            כל פתרון שניסיתם דרש להחליף ספק ענן, ללמוד תוכנה חדשה, או להתפשר על
            פרטיות הלקוחות.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="group flex flex-col gap-4 bg-card p-8 transition hover:bg-card/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/5 transition group-hover:bg-primary/10">
                <pain.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">{pain.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/65">{pain.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
