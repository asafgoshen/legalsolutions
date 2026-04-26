import { createClient } from "@/lib/supabase/server"

/**
 * Get the Google OAuth access token issued during the Supabase sign-in flow.
 *
 * Note: Supabase only exposes `provider_token` on the active session. Once the
 * Supabase session refreshes, the Google token may be cleared. For production
 * use you would persist `provider_refresh_token` in your DB and exchange it
 * here for a fresh access token via Google's token endpoint. For Phase 1 this
 * helper is sufficient to demonstrate the integration.
 */
export async function getGoogleAccessToken(): Promise<{
  token: string | null
  userId: string | null
}> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { token: null, userId: null }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    token: session?.provider_token ?? null,
    userId: user.id,
  }
}

export type GoogleApiError = {
  error: string
  code?: number
}

export async function callGoogle<T>(
  url: string,
  token: string,
): Promise<T | GoogleApiError> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text()
    return { error: text || res.statusText, code: res.status }
  }
  return (await res.json()) as T
}

/** POST/PATCH/PUT/DELETE helper that sends a JSON body. */
export async function callGoogleJson<T>(
  url: string,
  token: string,
  init: { method: "POST" | "PATCH" | "PUT" | "DELETE"; body?: unknown },
): Promise<T | GoogleApiError> {
  const res = await fetch(url, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text()
    return { error: text || res.statusText, code: res.status }
  }
  if (res.status === 204) return {} as T
  return (await res.json()) as T
}
