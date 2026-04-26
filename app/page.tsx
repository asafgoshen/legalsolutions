import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isDemoMode } from "@/lib/demo"

export default async function HomePage() {
  if (await isDemoMode()) redirect("/dashboard")
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("users")
    .select("onboarded")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.onboarded) redirect("/onboarding")
  redirect("/dashboard")
}
