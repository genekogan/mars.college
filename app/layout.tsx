import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mars College",
  description: "A 3-month experiment building an off-grid village to explore future technology and self-preservation.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d0c0dc85-c9de-4d64-8f81-2bfb1a6bad3a"
        />
      </body>
    </html>
  )
}
