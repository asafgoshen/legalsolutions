import { Logo } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"

interface AppHeaderProps {
  officeName: string | null
  fullName: string | null
  email: string | null
  avatarUrl?: string | null
  role?: string | null
  isDemo?: boolean
}

export function AppHeader({
  officeName,
  fullName,
  email,
  avatarUrl,
  role,
  isDemo = false,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      <div className="flex items-center gap-4">
        <Logo />
        {officeName ? (
          <>
            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-border sm:block"
            />
            <span className="hidden truncate text-sm font-medium text-muted-foreground sm:inline">
              {officeName}
            </span>
          </>
        ) : null}
        {isDemo ? (
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
            מצב הדגמה
          </span>
        ) : null}
      </div>
      <UserMenu
        fullName={fullName}
        email={email}
        avatarUrl={avatarUrl}
        role={role}
        isDemo={isDemo}
      />
    </header>
  )
}
