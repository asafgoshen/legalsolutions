import { NextRequest, NextResponse } from "next/server"
import { callGoogle, getGoogleAccessToken } from "@/lib/google"
import { getMockDriveFiles, isDemoMode } from "@/lib/demo"

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  webViewLink?: string
  iconLink?: string
}

type DriveListResponse = {
  files: DriveFile[]
}

export async function GET(request: NextRequest) {
  const limitParam = Number(request.nextUrl.searchParams.get("limit") ?? "10")

  if (await isDemoMode()) {
    return NextResponse.json({ files: getMockDriveFiles(limitParam) })
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

  const fields = "files(id,name,mimeType,modifiedTime,webViewLink,iconLink)"
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=${limitParam}&orderBy=modifiedTime desc&fields=${encodeURIComponent(
    fields,
  )}`

  const result = await callGoogle<DriveListResponse>(url, token)
  if ("error" in result) {
    return NextResponse.json(result, { status: result.code ?? 500 })
  }
  return NextResponse.json(result)
}

type CreateDocBody = {
  title: string
  content?: string
}

/**
 * Creates a new Google Doc with optional plain-text content. Uses the
 * `drive.file` scope (non-sensitive — no Google verification required) so
 * the resulting Doc is owned by the user and the app can read/edit it.
 *
 * Implementation: a multipart Drive upload that sets MIME type to
 * `application/vnd.google-apps.document`, which causes Drive to convert the
 * uploaded plain-text body into a native Google Doc.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as CreateDocBody
  const title = (body.title ?? "מסמך חדש").trim() || "מסמך חדש"
  const content = body.content ?? ""

  if (await isDemoMode()) {
    const id = `demo-doc-${Date.now()}`
    return NextResponse.json({
      id,
      name: `${title}.gdoc`,
      mimeType: "application/vnd.google-apps.document",
      modifiedTime: new Date().toISOString(),
      webViewLink: "#",
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

  const boundary = "officeos-boundary-" + Math.random().toString(36).slice(2)
  const metadata = {
    name: title,
    mimeType: "application/vnd.google-apps.document",
  }
  const multipartBody =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify(metadata) +
    `\r\n--${boundary}\r\n` +
    `Content-Type: text/plain; charset=UTF-8\r\n\r\n` +
    content +
    `\r\n--${boundary}--`

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
      cache: "no-store",
    },
  )

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json(
      { error: text || res.statusText },
      { status: res.status },
    )
  }
  return NextResponse.json(await res.json())
}
