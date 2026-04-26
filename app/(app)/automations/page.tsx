import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Workflow, FileText, Mail, CalendarClock } from "lucide-react"

const TEMPLATES = [
  {
    icon: FileText,
    title: "יצירת חוזה אוטומטית",
    description:
      "מילוי תבנית חוזה מתוך פרטי לקוח ב־CRM ושליחה לחתימה דיגיטלית.",
  },
  {
    icon: Mail,
    title: "סיכום מיילים יומי",
    description:
      "תקציר חכם של תכתובות חשובות מ־Gmail, ממוין לפי תיק.",
  },
  {
    icon: CalendarClock,
    title: "תזכורת לפני דיון",
    description:
      "תזכורת אוטומטית לכל המשתתפים 24 שעות לפני אירוע ביומן.",
  },
]

export default function AutomationsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">אוטומציות</h1>
        <p className="text-sm text-muted-foreground">
          תבניות מוכנות שיחסכו לצוות שעות עבודה בשבוע.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEMPLATES.map((t) => (
          <Card key={t.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{t.title}</CardTitle>
              </div>
              <CardDescription className="text-pretty leading-relaxed">
                {t.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                בקרוב — תוכלו להפעיל ולהתאים אישית.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Workflow className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">בונה אוטומציות מותאמות</p>
            <p className="text-sm text-muted-foreground">
              נבנה כשלב הבא — חיבור Trigger ↔ Action על בסיס Google Workspace.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
