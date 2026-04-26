import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>
}) {
  const { reason } = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">לא הצלחנו להתחבר</CardTitle>
          <CardDescription>
            {reason ?? "אירעה שגיאה בלתי צפויה. נסו שוב בעוד רגע."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/auth/login">חזרה למסך ההתחברות</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
