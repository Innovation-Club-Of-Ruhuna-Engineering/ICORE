import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/userAuthContext";
import { Toaster } from "react-hot-toast";
import { Navigation } from "@/components/shared/navigation";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "ICORE - Innovation Club of Ruhuna Engineering",
  keywords: ["ICORE", "Innovation Club of Ruhuna Engineering", "Ruhuna Engineering Faculty", "Engineering Club"],
  description: "Developed by ICORE development team",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} bg-background text-foreground antialiased`}>
        <AuthProvider>
          <Navigation />
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}