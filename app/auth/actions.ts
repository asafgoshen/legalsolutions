"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DEMO_COOKIE } from "@/lib/demo"

export async function signOut() {
  const store = await cookies()
  if (store.get(DEMO_COOKIE)?.value === "1") {
    store.delete(DEMO_COOKIE)
    redirect("/auth/login")
  }
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function enterDemoMode() {
  const store = await cookies()
  store.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  })
  redirect("/dashboard")
}
