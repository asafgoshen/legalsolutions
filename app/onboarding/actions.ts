"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type KycState = {
  error?: string
}

export async function completeOnboarding(
  _prev: KycState,
  formData: FormData,
): Promise<KycState> {
  const officeName = String(formData.get("office_name") ?? "").trim()
  const phoneNumber = String(formData.get("phone_number") ?? "").trim()
  const role = String(formData.get("role") ?? "").trim()
  const fullName = String(formData.get("full_name") ?? "").trim()

  if (!officeName || !phoneNumber || !role || !fullName) {
    return { error: "כל השדות חובה" }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "המשתמש לא מחובר" }
  }

  // 1. Create the workspace owned by this user
  const { data: workspace, error: wsError } = await supabase
    .from("workspaces")
    .insert({ office_name: officeName, owner_id: user.id })
    .select("id")
    .single()

  if (wsError || !workspace) {
    return { error: wsError?.message ?? "יצירת המשרד נכשלה" }
  }

  // 2. Update the user's profile row (created automatically by the trigger)
  const { error: userError } = await supabase
    .from("users")
    .update({
      full_name: fullName,
      phone_number: phoneNumber,
      role,
      workspace_id: workspace.id,
      onboarded: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (userError) {
    return { error: userError.message }
  }

  redirect("/dashboard")
}
