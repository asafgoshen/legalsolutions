import { Logo } from "@/components/logo"
import { GoogleLoginButton } from "@/components/google-login-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">ברוכים הבאים</CardTitle>
            <CardDescription className="text-pretty">
              התחברו עם חשבון Google של המשרד כדי להמשיך
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <GoogleLoginButton />
            <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
              בלחיצה על &quot;המשך עם Google&quot; אתם מאשרים את תנאי השימוש
              ומדיניות הפרטיות של OfficeOS.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
