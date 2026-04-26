import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { KycForm } from "@/components/kyc-form"
import { Logo } from "@/components/logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, onboarded")
    .eq("id", user.id)
    .maybeSingle()

  if (profile?.onboarded) redirect("/dashboard")

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">בואו נכיר את המשרד</CardTitle>
            <CardDescription className="text-pretty">
              עוד כמה פרטים קצרים והכל מוכן לעבודה.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KycForm
              defaultFullName={profile?.full_name ?? user.user_metadata?.full_name ?? user.user_metadata?.name ?? null}
              defaultEmail={user.email}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
