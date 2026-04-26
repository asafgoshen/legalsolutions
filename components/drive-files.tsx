"use client"

import useSWR from "swr"
import { FileText, ExternalLink } from "lucide-react"

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  webViewLink?: string
  iconLink?: string
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
  return body as { files: DriveFile[] }
}

export function DriveFiles({ limit = 8 }: { limit?: number }) {
  const { data, error, isLoading } = useSWR(
    `/api/google/drive?limit=${limit}`,
    fetcher,
  )

  if (isLoading) {
    return <ListSkeleton rows={Math.min(limit, 5)} />
  }

  if (error) {
    return <EmptyState message={messageFor(error)} />
  }

  if (!data?.files?.length) {
    return <EmptyState message="לא נמצאו קבצים אחרונים." />
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {data.files.map((f) => (
        <li key={f.id}>
          <a
            href={f.webViewLink ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 py-3 transition-colors hover:bg-muted/40"
          >
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{f.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(f.modifiedTime).toLocaleDateString("he-IL", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function ListSkeleton({ rows }: { rows: number }) {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          className="h-10 animate-pulse rounded-md bg-muted/50"
          aria-hidden="true"
        />
      ))}
    </ul>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-md bg-muted/40 p-4 text-center text-sm text-muted-foreground">
      {message}
    </p>
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
  return "לא הצלחנו לטעון נתונים מ־Google Drive."
}
