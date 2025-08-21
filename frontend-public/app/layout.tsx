import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseMoveEffect from "@/components/mouse-move-effect"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICORE - Innovation Club of Ruhuna Engineering",
  keywords: ["ICORE", "Innovation Club of Ruhuna Engineering", "Ruhuna University", "Engineering Club"],
  description: "Developed by ICORE development team",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} bg-background text-foreground antialiased`}>
          <MouseMoveEffect />
          {children}
      </body>
    </html>
  )
}
