import Link from "next/link"
import { Instagram, Facebook, Linkedin, Youtube, Mail, ArrowRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/signup", label: "Sign Up" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/the_icore", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61575541536994", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/theicore", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ICORE
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Innovation Club of Ruhuna Engineering
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <a
              href="mailto:admin@theicore.org"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>admin@theicore.org</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              Follow
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 flex items-center justify-center group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {currentYear} ICORE. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6 text-xs">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
