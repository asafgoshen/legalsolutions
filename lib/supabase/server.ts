import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

type CookieToSet = { name: string; value: string; options?: CookieOptions }

/**
 * Server-side Supabase client. Always create a new instance per request
 * (do not store globally) so cookies stay request-scoped.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component – safe to ignore when proxy
            // middleware is refreshing sessions.
          }
        },
      },
    },
  )
}
