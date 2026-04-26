"use client"

import useSWR from "swr"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const fetcher = (url: string) =>
  fetch(url).then((r) => ({ ok: r.ok, status: r.status }))

const SCOPES = [
  { label: "Google Drive (קריאת מטא־דאטה)", probe: "/api/google/drive?limit=1" },
  { label: "Google Calendar (קריאת אירועים)", probe: "/api/google/calendar?limit=1" },
]

export function GoogleConnectionStatus() {
  return (
    <ul className="flex flex-col gap-3">
      {SCOPES.map((s) => (
        <ScopeRow key={s.probe} label={s.label} probe={s.probe} />
      ))}
    </ul>
  )
}

function ScopeRow({ label, probe }: { label: string; probe: string }) {
  const { data, isLoading } = useSWR(probe, fetcher)

  const status: "loading" | "connected" | "error" = isLoading
    ? "loading"
    : data?.ok
      ? "connected"
      : "error"

  return (
    <li className="flex items-center justify-between rounded-md border border-border bg-background p-3">
      <span className="text-sm">{label}</span>
      <span
        className={cn(
          "flex items-center gap-2 text-xs font-medium",
          status === "connected" && "text-emerald-600",
          status === "error" && "text-destructive",
          status === "loading" && "text-muted-foreground",
        )}
      >
        {status === "connected" ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            מחובר
          </>
        ) : status === "error" ? (
          <>
            <AlertCircle className="h-4 w-4" />
            לא מחובר
          </>
        ) : (
          <>בודק...</>
        )}
      </span>
    </li>
  )
}
