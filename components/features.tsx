import { FileText, CalendarRange, MailCheck, RefreshCw, Search, Languages } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "ניסוח חוזים על בסיס העבר",
    body: "המערכת מייצרת טיוטות חוזים מלאות, בנוסחים ובסעיפים שהמשרד שלכם משתמש בהם בפועל — לא בנוסחים גנריים מהאינטרנט.",
  },
  {
    icon: CalendarRange,
    title: "ניהול דיונים ויומנים",
    body: "קביעת מועדים, סנכרון בין צדדים, תזכורות אוטומטיות, ועדכון יומן Google/Outlook — בלי לפתוח כלי חיצוני.",
  },
  {
    icon: MailCheck,
    title: "מענה אוטומטי למיילים שגרתיים",
    body: "אישורי קבלה, בקשות לעדכון סטטוס, ותיאומים ראשוניים — נענים בשפה ובטון של המשרד, עם אפשרות אישור בלחיצה.",
  },
  {
    icon: RefreshCw,
    title: "סנכרון מלא ל־Gmail ו־Outlook",
    body: "המערכת חיה בתוך הדואר שלכם. אין ממשק חדש. אין לוח בקרה ללמוד. רק מתחילים לעבוד מהר יותר.",
  },
  {
    icon: Search,
    title: "חיפוש סמנטי בארכיון",
    body: '"מצא לי את הסעיף על אי־תחרות מחוזה X משנת 2022" — והתוצאה מופיעה תוך שניות, כולל ההקשר המלא.',
  },
  {
    icon: Languages,
    title: "עברית, אנגלית, ערבית",
    body: "המערכת מבינה את הניואנסים המשפטיים בכל שפה שהמשרד עובד בה, ושומרת על אחידות סגנון בין מסמכים.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            יכולות
          </span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            כל מה שהמשרד צריך.
            <br />
            <span className="text-foreground/60 italic">כלום שצריך ללמוד.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex flex-col rounded-lg border border-border bg-card p-7 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
