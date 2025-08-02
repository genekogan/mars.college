"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Academics", href: "/academics" },
  { name: "Blog", href: "https://marscollege.substack.com/" },
]

interface SiteHeaderProps {
  variant?: "transparent" | "opaque"
}

export default function SiteHeader({ variant = "transparent" }: SiteHeaderProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const getHref = (href: string) => {
    if (href.startsWith("/")) {
      return href
    }
    return isHomePage ? href : `/${href}`
  }

  const headerClasses = cn(
    "top-0 w-full z-50",
    variant === "transparent" ? "fixed py-4 px-2" : "sticky bg-white/80 backdrop-blur-sm border-b",
  )

  const containerClasses = cn(
    "container mx-auto flex items-center justify-between px-4 lg:px-6",
    variant === "transparent" ? "bg-white/30 backdrop-blur-sm border border-white/20 rounded-2xl h-16" : "h-20",
  )

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/mars-logo.png" alt="Mars College Logo" width={32} height={32} className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900">Mars College</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http")
            const href = isExternal ? link.href : getHref(link.href)
            return (
              <Link
                key={link.name}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            )
          })}
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900 w-8 h-8">
              <Link
                href="https://x.com/mars_college"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900 w-8 h-8">
              <Link
                href="https://www.instagram.com/mars.college"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>

        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeON-_N_rrD_ThblW_v5l5yCM0s8fgS1eiKYnRy8TV5nXs4lA/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for 2026
          </Link>
        </Button>
      </div>
    </header>
  )
}
