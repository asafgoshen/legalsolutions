import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export const DEMO_COOKIE = "ls_demo"

export async function isDemoMode(): Promise<boolean> {
  const store = await cookies()
  return store.get(DEMO_COOKIE)?.value === "1"
}

export function isDemoRequest(request: NextRequest): boolean {
  return request.cookies.get(DEMO_COOKIE)?.value === "1"
}

export const DEMO_PROFILE = {
  fullName: "אורח דמו",
  email: "demo@officeos.app",
  role: "שותף בכיר",
  phone: "050-000-0000",
  avatarUrl: null as string | null,
  officeName: "משרד הדגמה — OfficeOS",
}

export type MockDriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  webViewLink: string
}

export function getMockDriveFiles(limit = 10): MockDriveFile[] {
  const now = Date.now()
  const day = 86_400_000
  const fixtures: Omit<MockDriveFile, "modifiedTime">[] = [
    {
      id: "demo-1",
      name: "הסכם שכר טרחה — לקוח כהן.docx",
      mimeType: "application/vnd.google-apps.document",
      webViewLink: "#",
    },
    {
      id: "demo-2",
      name: "תצהיר ת.ז. 028347192.pdf",
      mimeType: "application/pdf",
      webViewLink: "#",
    },
    {
      id: "demo-3",
      name: "טיוטת כתב תביעה — תיק 12-04-2026.docx",
      mimeType: "application/vnd.google-apps.document",
      webViewLink: "#",
    },
    {
      id: "demo-4",
      name: "פירוט שעות אפריל.xlsx",
      mimeType: "application/vnd.google-apps.spreadsheet",
      webViewLink: "#",
    },
    {
      id: "demo-5",
      name: "פסק דין רלוונטי — ע&quot;א 7634-22.pdf",
      mimeType: "application/pdf",
      webViewLink: "#",
    },
    {
      id: "demo-6",
      name: "מצגת לפגישה עם מועצת המנהלים.pptx",
      mimeType: "application/vnd.google-apps.presentation",
      webViewLink: "#",
    },
    {
      id: "demo-7",
      name: "ייפוי כוח — לקוחה לוי.pdf",
      mimeType: "application/pdf",
      webViewLink: "#",
    },
    {
      id: "demo-8",
      name: "סיכום פגישה — 24.04.2026.docx",
      mimeType: "application/vnd.google-apps.document",
      webViewLink: "#",
    },
    {
      id: "demo-9",
      name: "מחקר משפטי — דיני חוזים.docx",
      mimeType: "application/vnd.google-apps.document",
      webViewLink: "#",
    },
    {
      id: "demo-10",
      name: "תקציב משרד 2026.xlsx",
      mimeType: "application/vnd.google-apps.spreadsheet",
      webViewLink: "#",
    },
  ]
  return fixtures.slice(0, limit).map((f, i) => ({
    ...f,
    modifiedTime: new Date(now - i * day).toISOString(),
  }))
}

export type MockCalendarEvent = {
  id: string
  summary: string
  start: { dateTime: string }
  end: { dateTime: string }
  htmlLink: string
  location?: string
}

export function getMockCalendarEvents(limit = 6): MockCalendarEvent[] {
  const now = new Date()
  const fixtures: Array<{
    summary: string
    offsetHours: number
    durationHours: number
    location?: string
  }> = [
    {
      summary: "פגישת התייעצות — לקוח כהן",
      offsetHours: 2,
      durationHours: 1,
      location: "משרד — חדר ישיבות א'",
    },
    {
      summary: "דיון בבית משפט השלום ת&quot;א",
      offsetHours: 26,
      durationHours: 2,
      location: "בית משפט השלום, תל אביב",
    },
    {
      summary: "פגישת צוות שבועית",
      offsetHours: 50,
      durationHours: 1,
    },
    {
      summary: "שיחת זום עם עו&quot;ד מהצד שכנגד",
      offsetHours: 74,
      durationHours: 0.5,
      location: "Zoom",
    },
    {
      summary: "חתימה על הסכם — לקוחה לוי",
      offsetHours: 98,
      durationHours: 1,
      location: "משרד — חדר ישיבות ב'",
    },
    {
      summary: "סדנת אסטרטגיה רבעונית",
      offsetHours: 168,
      durationHours: 3,
      location: "מלון שרתון, תל אביב",
    },
  ]
  return fixtures.slice(0, limit).map((f, i) => {
    const start = new Date(now.getTime() + f.offsetHours * 3_600_000)
    const end = new Date(start.getTime() + f.durationHours * 3_600_000)
    return {
      id: `demo-evt-${i}`,
      summary: f.summary,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      htmlLink: "#",
      location: f.location,
    }
  })
}
