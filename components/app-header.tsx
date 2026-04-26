import { Logo } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"

interface AppHeaderProps {
  officeName: string | null
  fullName: string | null
  email: string | null
  avatarUrl?: string | null
  role?: string | null
}

export function AppHeader({
  officeName,
  fullName,
  email,
  avatarUrl,
  role,
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
      </div>
      <UserMenu
        fullName={fullName}
        email={email}
        avatarUrl={avatarUrl}
        role={role}
      />
    </header>
  )
}
