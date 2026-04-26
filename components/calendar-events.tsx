"use client"

import useSWR from "swr"
import { CalendarClock, ExternalLink, MapPin } from "lucide-react"

type CalendarEvent = {
  id: string
  summary?: string
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
  htmlLink?: string
  location?: string
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(body?.error ?? res.statusText) as Error & {
      status?: number
    }
    err.status = res.status
    throw err
  }
  return body as { items: CalendarEvent[] }
}

export function CalendarEvents({ limit = 6 }: { limit?: number }) {
  const { data, error, isLoading } = useSWR(
    `/api/google/calendar?limit=${limit}`,
    fetcher,
  )

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="h-12 animate-pulse rounded-md bg-muted/50"
            aria-hidden="true"
          />
        ))}
      </ul>
    )
  }

  if (error) {
    return (
      <p className="rounded-md bg-muted/40 p-4 text-center text-sm text-muted-foreground">
        {messageFor(error)}
      </p>
    )
  }

  if (!data?.items?.length) {
    return (
      <p className="rounded-md bg-muted/40 p-4 text-center text-sm text-muted-foreground">
        אין אירועים קרובים ביומן.
      </p>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {data.items.map((e) => {
        const startISO = e.start?.dateTime ?? e.start?.date
        const date = startISO ? new Date(startISO) : null
        return (
          <li key={e.id}>
            <a
              href={e.htmlLink ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 py-3 transition-colors hover:bg-muted/40"
            >
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {e.summary ?? "(ללא כותרת)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {date
                    ? date.toLocaleString("he-IL", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        hour: e.start?.dateTime ? "2-digit" : undefined,
                        minute: e.start?.dateTime ? "2-digit" : undefined,
                      })
                    : null}
                </p>
                {e.location ? (
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{e.location}</span>
                  </p>
                ) : null}
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function messageFor(error: unknown): string {
  const status = (error as { status?: number })?.status
  if (status === 412) {
    return "התחברות ל־Google לא פעילה כרגע. צאו מהמערכת והתחברו שוב כדי לרענן את ההרשאות."
  }
  if (status === 401) {
    return "ההרשאה ל־Google פגה. התחברו מחדש."
  }
  return "לא הצלחנו לטעון אירועים מ־Google Calendar."
}
