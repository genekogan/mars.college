"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail } from "lucide-react"

export default function AnimatedFooter() {
  const animationRef = useRef<boolean>(false)

  useEffect(() => {
    if (animationRef.current) return
    animationRef.current = true

    const setupAnimation = () => {
      let initFrame = false
      const minDist = 480
      const maxDist = 550
      const minVelocity = 0.0000425
      const maxVelocity = 0.0000565
      const startTime = new Date()
      const distance: number[] = []
      const offset: number[] = []
      const velocity: number[] = []

      for (let i = 0; i < 9; i++) {
        distance.push(minDist + (maxDist - minDist) * Math.random())
        offset.push(100000 * Math.random())
        velocity.push(minVelocity + (maxVelocity - minVelocity) * Math.random())
      }

      const animationInterval = setInterval(() => {
        const ms = new Date().getTime() - startTime.getTime()

        for (let i = 0; i < 9; i++) {
          const t = -10 + distance[i] * ((velocity[i] * (ms + offset[i])) % 1)
          const euc = document.getElementById("euc" + (i + 1))

          if (euc && (t < 105 || !initFrame)) {
            euc.style.left = t + "%"
            if (euc.style.display !== "inline") {
              euc.style.display = "inline"
              euc.style.left = t + "%"
            }
          }
        }
        initFrame = true
      }, 30)

      return () => clearInterval(animationInterval)
    }

    const cleanup = setupAnimation()
    return cleanup
  }, [])

  return (
    <div className="relative">
      {/* Animated Desert Section */}
      <div id="join" className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div id="join_inner" className="relative w-full h-full">
          {/* Desert Background */}
          <Image src="/images/desert.jpg" alt="Desert landscape" fill className="object-cover" priority />

          {/* Animated Creatures */}
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc1"
            src="/images/unicyclists/1.png"
            alt="Unicyclist 1"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc2"
            src="/images/unicyclists/4.png"
            alt="Unicyclist 4"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc3"
            src="/images/unicyclists/3.png"
            alt="Unicyclist 3"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc4"
            src="/images/unicyclists/6.png"
            alt="Unicyclist 6"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc5"
            src="/images/unicyclists/5.png"
            alt="Unicyclist 5"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc6"
            src="/images/unicyclists/8.png"
            alt="Unicyclist 8"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc7"
            src="/images/unicyclists/7.png"
            alt="Unicyclist 7"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-24 md:h-32 lg:h-40 w-auto"
            id="euc8"
            src="/images/unicyclists/2.png"
            alt="Unicyclist 2"
            width={80}
            height={120}
            style={{ display: "none", bottom: "50%" }}
          />
          <Image
            className="desert_creature absolute h-20 md:h-24 lg:h-32 w-auto"
            id="euc9"
            src="/images/unicyclists/roadrunner.gif"
            alt="Roadrunner"
            width={80}
            height={80}
            style={{ display: "none", bottom: "50%" }}
          />
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image src="/images/mars-logo.png" alt="Mars College Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold">Mars College</span>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Link href="mailto:hello@mars.college" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Link href="https://marscollege.substack.com" className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Substack
                </Link>
              </Button>

              <Button asChild className="bg-white text-black hover:bg-gray-100">
                <Link href="https://mars.college/apply" className="flex items-center">
                  Apply Now <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm">
              <p>&copy; 2025 Mars College. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
