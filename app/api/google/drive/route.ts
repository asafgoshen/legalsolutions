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
