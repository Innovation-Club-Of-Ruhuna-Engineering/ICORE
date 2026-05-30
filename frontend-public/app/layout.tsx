import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/userAuthContext";
import { Toaster } from "react-hot-toast";
import { Navigation } from "@/components/shared/navigation";
import Header from "@/components/shared/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ICORE - Innovation Club of Ruhuna Engineering",
  keywords: ["ICORE", "Innovation Club of Ruhuna Engineering", "Ruhuna Engineering", "Innovation Club"],
  description: "Developed by ICORE development team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AuthProvider>
          <Header />
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}