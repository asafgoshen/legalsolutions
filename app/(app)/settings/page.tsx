import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GoogleConnectionStatus } from "@/components/google-connection-status"
import { DEMO_PROFILE, isDemoMode } from "@/lib/demo"

export default async function SettingsPage() {
  if (await isDemoMode()) {
    return (
      <SettingsView
        officeName={DEMO_PROFILE.officeName}
        fullName={DEMO_PROFILE.fullName}
        email={DEMO_PROFILE.email}
        role={DEMO_PROFILE.role}
        phone={DEMO_PROFILE.phone}
      />
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, phone_number, role, workspace_id")
    .eq("id", user.id)
    .maybeSingle()

  const { data: workspace } = profile?.workspace_id
    ? await supabase
        .from("workspaces")
        .select("office_name, created_at")
        .eq("id", profile.workspace_id)
        .maybeSingle()
    : { data: null }

  return (
    <SettingsView
      officeName={workspace?.office_name ?? null}
      fullName={profile?.full_name ?? null}
      email={user.email ?? null}
      role={profile?.role ?? null}
      phone={profile?.phone_number ?? null}
    />
  )
}

function SettingsView({
  officeName,
  fullName,
  email,
  role,
  phone,
}: {
  officeName: string | null
  fullName: string | null
  email: string | null
  role: string | null
  phone: string | null
}) {

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">הגדרות</h1>
        <p className="text-sm text-muted-foreground">
          ניהול פרטי המשרד והחיבורים החיצוניים.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">פרטי המשרד</CardTitle>
          <CardDescription>הנתונים נאספו בתהליך ההצטרפות.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
            <Field label="שם המשרד" value={workspace?.office_name} />
            <Field label="שם מלא" value={profile?.full_name} />
            <Field label="כתובת אימייל" value={user.email ?? null} />
            <Field label="תפקיד" value={profile?.role} />
            <Field label="טלפון" value={profile?.phone_number} dir="ltr" />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">חיבור Google Workspace</CardTitle>
          <CardDescription>
            ההתחברות נעשתה דרך Google. התפקידים: קריאת Drive ויומן.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleConnectionStatus />
        </CardContent>
      </Card>
    </div>
  )
}

function Field({
  label,
  value,
  dir,
}: {
  label: string
  value: string | null | undefined
  dir?: "ltr" | "rtl"
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm" dir={dir}>
        {value && value.length > 0 ? (
          value
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </dd>
    </div>
  )
}
