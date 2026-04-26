import type { Metadata, Viewport } from "next"
import { Heebo } from "next/font/google"
import "./globals.css"

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OfficeOS — מערכת ניהול משרד",
  description: "פלטפורמת SaaS לניהול משרד מודרני, מאובטח ויעיל",
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`bg-background ${heebo.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
