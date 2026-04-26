import { NextRequest, NextResponse } from "next/server"
import { callGoogle, getGoogleAccessToken } from "@/lib/google"

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

  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "10")
  const timeMin = new Date().toISOString()
  const params = new URLSearchParams({
    maxResults: String(limit),
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
