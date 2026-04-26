import { PlayCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { GoogleLoginButton } from "@/components/google-login-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { enterDemoMode } from "@/app/auth/actions"

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

            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                או
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form action={enterDemoMode}>
              <Button
                type="submit"
                variant="outline"
                className="w-full gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                כניסה למצב הדגמה
              </Button>
            </form>
            <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
              מצב הדגמה מציג את המערכת עם נתונים לדוגמה, ללא צורך בחיבור Google.
            </p>

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
