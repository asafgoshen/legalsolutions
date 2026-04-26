"use client"

import { useState } from "react"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Status =
  | { kind: "idle" }
  | { kind: "pending"; action: "doc" | "event" }
  | { kind: "ok"; message: string; href?: string }
  | { kind: "err"; message: string }

export function QuickActions() {
  const { mutate } = useSWRConfig()
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  async function createDoc() {
    setStatus({ kind: "pending", action: "doc" })
    try {
      const res = await fetch("/api/google/drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "טיוטה חדשה — " + new Date().toLocaleDateString("he-IL"),
          content:
            "מסמך זה נוצר אוטומטית מתוך OfficeOS.\n\n" +
            "ניתן לערוך אותו ישירות ב-Google Docs ולשתף עם הצוות.",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "שגיאה ביצירת המסמך")
      mutate("/api/google/drive?limit=10")
      setStatus({
        kind: "ok",
        message: "המסמך נוצר בהצלחה ב-Google Drive",
        href: data.webViewLink,
      })
    } catch (err) {
      setStatus({
        kind: "err",
        message: err instanceof Error ? err.message : "שגיאה לא ידועה",
      })
    }
  }

  async function createEvent() {
    setStatus({ kind: "pending", action: "event" })
    try {
      // Tomorrow at 10:00 — 11:00, local time.
      const start = new Date()
      start.setDate(start.getDate() + 1)
      start.setHours(10, 0, 0, 0)
      const end = new Date(start.getTime() + 60 * 60 * 1000)

      const res = await fetch("/api/google/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: "פגישת הכנה לדיון",
          description: "אירוע נוצר מתוך OfficeOS",
          location: "משרד — חדר ישיבות א'",
          start: start.toISOString(),
          end: end.toISOString(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "שגיאה ביצירת האירוע")
      mutate("/api/google/calendar?limit=6")
      setStatus({
        kind: "ok",
        message: "האירוע נוסף ליומן",
        href: data.htmlLink,
      })
    } catch (err) {
      setStatus({
        kind: "err",
        message: err instanceof Error ? err.message : "שגיאה לא ידועה",
      })
    }
  }

  const isPending = status.kind === "pending"

  return (
    <Card>
      <CardHeader>
        <CardTitle>פעולות מהירות</CardTitle>
        <CardDescription>
          OfficeOS יכול לכתוב ל-Drive וליומן בשמך — נסו את היכולת:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="default"
            onClick={createDoc}
            disabled={isPending}
          >
            {status.kind === "pending" && status.action === "doc"
              ? "יוצר מסמך..."
              : "צור מסמך חדש ב-Drive"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={createEvent}
            disabled={isPending}
          >
            {status.kind === "pending" && status.action === "event"
              ? "יוצר אירוע..."
              : "הוסף אירוע ליומן"}
          </Button>
        </div>

        {status.kind === "ok" ? (
          <p className="text-sm text-emerald-700" role="status">
            {status.message}
            {status.href && status.href !== "#" ? (
              <>
                {" — "}
                <a
                  href={status.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  פתיחה
                </a>
              </>
            ) : null}
          </p>
        ) : null}

        {status.kind === "err" ? (
          <p className="text-sm text-destructive" role="alert">
            {status.message}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
