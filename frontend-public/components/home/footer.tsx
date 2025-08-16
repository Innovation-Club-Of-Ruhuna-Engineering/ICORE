import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-b">
      <center><div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">The ICORE</h2>
          <p className="text-sm text-muted-foreground">Pioneering software solutions for the digital age.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground transition-colors hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground transition-colors hover:text-primary">
                  Join ICORE
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="mailto:admin@gmail.com" className="text-muted-foreground transition-colors hover:text-primary">
                  admin@gmal.com
                </Link>
              </li>
              <li>
                <Link href="/mailto:admin2@gmail.com" className="text-muted-foreground transition-colors hover:text-primary">
                  admin2@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/company/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div></center>
      <center><div className="container py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} The ICORE. All rights reserved.
        </p>
      </div></center>
    </footer>
  )
}
