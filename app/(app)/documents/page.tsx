import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DriveFiles } from "@/components/drive-files"

export default function DocumentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">מסמכים</h1>
        <p className="text-sm text-muted-foreground">
          כל הקבצים של המשרד מחוברים ישירות מ־Google Drive.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">קבצים אחרונים</CardTitle>
          <CardDescription>20 הקבצים שעודכנו לאחרונה</CardDescription>
        </CardHeader>
        <CardContent>
          <DriveFiles limit={20} />
        </CardContent>
      </Card>
    </div>
  )
}
