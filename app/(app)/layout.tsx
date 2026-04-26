import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app-header"
import { AppMobileNav, AppSidebar } from "@/components/app-sidebar"
import { DEMO_PROFILE, isDemoMode } from "@/lib/demo"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (await isDemoMode()) {
    return (
      <div className="flex min-h-svh flex-col bg-muted/20">
        <AppHeader
          officeName={DEMO_PROFILE.officeName}
          fullName={DEMO_PROFILE.fullName}
          email={DEMO_PROFILE.email}
          avatarUrl={DEMO_PROFILE.avatarUrl}
          role={DEMO_PROFILE.role}
          isDemo
        />
        <AppMobileNav />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, role, onboarded, workspace_id")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.onboarded) redirect("/onboarding")

  let officeName: string | null = null
  if (profile?.workspace_id) {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("office_name")
      .eq("id", profile.workspace_id)
      .maybeSingle()
    officeName = workspace?.office_name ?? null
  }

  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined) ??
    null

  return (
    <div className="flex min-h-svh flex-col bg-muted/20">
      <AppHeader
        officeName={officeName}
        fullName={profile?.full_name ?? null}
        email={user.email ?? null}
        avatarUrl={avatarUrl}
        role={profile?.role ?? null}
      />
      <AppMobileNav />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
