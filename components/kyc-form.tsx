"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { completeOnboarding, type KycState } from "@/app/onboarding/actions"

const ROLES = ["מנהל/ת משרד", "שותף/ה", "עורך/ת דין", "מתמחה", "אחר"] as const

const initialState: KycState = {}

export function KycForm({
  defaultFullName,
  defaultEmail,
}: {
  defaultFullName?: string | null
  defaultEmail?: string | null
}) {
  const [state, formAction, pending] = useActionState(
    completeOnboarding,
    initialState,
  )

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="full_name">שם מלא</Label>
        <Input
          id="full_name"
          name="full_name"
          required
          autoComplete="name"
          defaultValue={defaultFullName ?? ""}
          placeholder="ישראל ישראלי"
        />
        {defaultEmail ? (
          <p className="text-xs text-muted-foreground">
            מחובר כ־ <span className="font-medium">{defaultEmail}</span>
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="office_name">שם המשרד</Label>
        <Input
          id="office_name"
          name="office_name"
          required
          autoComplete="organization"
          placeholder="משרד עורכי הדין כהן ושות׳"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone_number">מספר טלפון</Label>
        <Input
          id="phone_number"
          name="phone_number"
          type="tel"
          required
          dir="ltr"
          autoComplete="tel"
          placeholder="050-1234567"
          className="text-end"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">תפקיד</Label>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="" disabled>
            בחרו תפקיד
          </option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "שומר..." : "סיום ומעבר ללוח הבקרה"}
      </Button>
    </form>
  )
}
