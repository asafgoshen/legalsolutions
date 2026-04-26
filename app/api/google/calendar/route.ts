import { NextRequest, NextResponse } from "next/server"
import { callGoogle, callGoogleJson, getGoogleAccessToken } from "@/lib/google"
import { getMockCalendarEvents, isDemoMode } from "@/lib/demo"

type CalendarEvent = {
  id: string
  summary?: string
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
  htmlLink?: string
  location?: string
}

type CalendarListResponse = {
  items: CalendarEvent[]
}

export async function GET(request: NextRequest) {
  const limitParam = Number(request.nextUrl.searchParams.get("limit") ?? "10")

  if (await isDemoMode()) {
    return NextResponse.json({ items: getMockCalendarEvents(limitParam) })
  }

  const { token, userId } = await getGoogleAccessToken()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  if (!token) {
    return NextResponse.json(
      { error: "google_not_connected" },
      { status: 412 },
    )
  }

  const timeMin = new Date().toISOString()
  const params = new URLSearchParams({
    maxResults: String(limitParam),
    orderBy: "startTime",
    singleEvents: "true",
    timeMin,
  })

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`
  const result = await callGoogle<CalendarListResponse>(url, token)
  if ("error" in result) {
    return NextResponse.json(result, { status: result.code ?? 500 })
  }
  return NextResponse.json(result)
}

type CreateEventBody = {
  summary: string
  description?: string
  location?: string
  start: string // ISO datetime
  end: string // ISO datetime
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Partial<CreateEventBody>
  if (!body.summary || !body.start || !body.end) {
    return NextResponse.json(
      { error: "summary, start and end are required" },
      { status: 400 },
    )
  }

  const tz =
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Asia/Jerusalem"
  const eventBody = {
    summary: body.summary,
    description: body.description,
    location: body.location,
    start: { dateTime: body.start, timeZone: tz },
    end: { dateTime: body.end, timeZone: tz },
  }

  if (await isDemoMode()) {
    return NextResponse.json({
      id: `demo-evt-${Date.now()}`,
      ...eventBody,
      htmlLink: "#",
      demo: true,
    })
  }

  const { token, userId } = await getGoogleAccessToken()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  if (!token) {
    return NextResponse.json(
      { error: "google_not_connected" },
      { status: 412 },
    )
  }

  const result = await callGoogleJson<CalendarEvent>(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    token,
    { method: "POST", body: eventBody },
  )
  if ("error" in result) {
    return NextResponse.json(result, { status: result.code ?? 500 })
  }
  return NextResponse.json(result)
}
