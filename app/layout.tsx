import type { Metadata } from "next"
import { Heebo, Frank_Ruhl_Libre } from "next/font/google"
import "./globals.css"

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
})

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank",
  weight: ["400", "500", "700", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lexis AI — סוכן הבינה המלאכותית של המשרד שלך",
  description:
    "פלטפורמת אוטומציה חכמה למשרדי עורכי דין. לומדת את סגנון הניסוח של המשרד שלך ועובדת ישירות מתוך Google Workspace ו-Microsoft 365, עם אבטחת מידע מוחלטת.",
  keywords: ["עורכי דין", "AI למשרדי עורכי דין", "אוטומציה משפטית", "ניסוח חוזים", "בינה מלאכותית"],
}

export const viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frankRuhl.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
