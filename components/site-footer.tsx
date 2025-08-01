import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Instagram, Github } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Image src="/images/mars-logo.png" alt="Mars College Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold">Mars College</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="mailto:hello@mars.college" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" /> Email
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="https://marscollege.substack.com" className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" /> Substack
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Link
                  href="https://x.com/mars_college"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Link
                  href="https://www.instagram.com/mars.college"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Link
                  href="https://github.com/mars-college"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
