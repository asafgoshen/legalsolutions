import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { DEMO_COOKIE } from "@/lib/demo"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const store = await cookies()
  store.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  })
  return NextResponse.redirect(new URL("/dashboard", url.origin))
}
