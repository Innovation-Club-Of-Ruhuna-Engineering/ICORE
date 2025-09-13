import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider/theme-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Innovation Club of Ruhuna Engineering",
  description:
    "Empowering students to explore creativity, develop technologies, and build solutions that make an impact.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={null}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </Suspense>
  )
}
