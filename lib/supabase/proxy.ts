import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { isDemoRequest } from "@/lib/demo"

type CookieToSet = { name: string; value: string; options?: CookieOptions }

const PROTECTED_PREFIXES = ["/dashboard", "/documents", "/automations", "/settings", "/onboarding"]
const AUTH_PREFIXES = ["/auth/login", "/auth/sign-up"]

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Demo mode short-circuits Supabase entirely so guests never hit the database.
  if (isDemoRequest(request)) {
    const { pathname } = request.nextUrl
    // Send demo guests away from auth and onboarding screens.
    if (
      pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/sign-up") ||
      pathname.startsWith("/onboarding")
    ) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Do not put any code between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))
  const isAuthRoute = AUTH_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
