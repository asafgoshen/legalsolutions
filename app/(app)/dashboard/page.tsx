import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarEvents } from "@/components/calendar-events"
import { DriveFiles } from "@/components/drive-files"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">לוח בקרה</h1>
        <p className="text-sm text-muted-foreground">
          מבט מהיר על הפעילות במשרד שלכם.
        </p>
      </div>

      <section
        aria-labelledby="kpi"
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <h2 id="kpi" className="sr-only">
          מדדי מפתח
        </h2>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>תיקים פעילים</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              +3 השבוע
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>משימות להיום</CardDescription>
            <CardTitle className="text-3xl">7</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              2 עם תאריך יעד דחוף
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>חברי צוות</CardDescription>
            <CardTitle className="text-3xl">5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">כולם פעילים</p>
          </CardContent>
        </Card>
      </section>

      <QuickActions />

      <section
        aria-labelledby="workspace"
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <h2 id="workspace" className="sr-only">
          Google Workspace
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">אירועים קרובים ביומן</CardTitle>
            <CardDescription>נטען ישירות מ־Google Calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarEvents />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">קבצים אחרונים ב־Drive</CardTitle>
            <CardDescription>נטען ישירות מ־Google Drive</CardDescription>
          </CardHeader>
          <CardContent>
            <DriveFiles />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
