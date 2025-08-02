"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLayoutEffect, useRef, useState, useEffect } from "react"

// --- Main Configuration ---
const IMAGE_NATURAL_WIDTH = 1920
const IMAGE_NATURAL_HEIGHT = 1080
const OBJECT_POSITION_X = 0.67
const OBJECT_POSITION_Y = 0.55

// --- Animator Fleet Configuration ---
const UNICYCLIST_TARGET_HEIGHT_PX = 262.5
const ROADRUNNER_HEIGHT_RATIO = 2 / 3
const Y_OFFSET_INCREMENT = 0.0085 // Vertical separation between riders
const MIN_SPEED_MULTIPLIER = 0.8
const MAX_SPEED_MULTIPLIER = 1.2

// --- Animation Path Configuration ---
const N = 2 // Multiplier for off-screen travel distance
const ANIMATION_DURATION_MS = 30000 // Base duration for a full cycle
const START_Y_PERCENT = 0.74 // 80% from top at left edge (x=0)
const END_Y_PERCENT = 0.99 // 95% from top at right edge (x=width)

const imageSources = [
  "/images/unicyclists/1.png",
  "/images/unicyclists/2.png",
  "/images/unicyclists/3.png",
  "/images/unicyclists/4.png",
  "/images/unicyclists/5.png",
  "/images/unicyclists/6.png",
  "/images/unicyclists/7.png",
  "/images/unicyclists/8.png",
  "/images/unicyclists/roadrunner.gif",
]

interface Animator {
  id: string
  src: string
  aspectRatio: number
  targetHeight: number
  initialProgress: number
  speedMultiplier: number
  yOffset: number
}

// Fisher-Yates shuffle algorithm to randomize array order
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const animatorRefs = useRef<(HTMLImageElement | null)[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const [animators, setAnimators] = useState<Animator[]>([])
  const [videoLoaded, setVideoLoaded] = useState(false)

  const transformDataRef = useRef({ scale: 1, imageLeft: 0, imageTop: 0 })

  // Effect 0: Handle video loading state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoLoaded = () => setVideoLoaded(true)
    const handleVideoLoadStart = () => setVideoLoaded(false)

    // Reset state on mount
    setVideoLoaded(false)

    // Check if video is already loaded (cached)
    if (video.readyState >= 3) {
      setVideoLoaded(true)
    }

    video.addEventListener('loadeddata', handleVideoLoaded)
    video.addEventListener('canplay', handleVideoLoaded)
    video.addEventListener('loadstart', handleVideoLoadStart)

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoaded)
      video.removeEventListener('canplay', handleVideoLoaded)
      video.removeEventListener('loadstart', handleVideoLoadStart)
    }
  }, [])

  // Effect 1: Initialize all animators once on mount.
  useEffect(() => {
    const setupAnimators = async () => {
      const shuffledSources = shuffleArray([...imageSources])

      const animatorPromises = shuffledSources.map(
        (src) =>
          new Promise<{ src: string; aspectRatio: number }>((resolve) => {
            const img = new window.Image()
            img.src = src
            img.onload = () => resolve({ src, aspectRatio: img.naturalWidth / img.naturalHeight })
          }),
      )

      const loadedImages = await Promise.all(animatorPromises)

      const configuredAnimators = loadedImages
        .map(({ src, aspectRatio }, index) => {
          const isRoadrunner = src.includes("roadrunner")
          return {
            id: `${src}-${index}`,
            src,
            aspectRatio,
            targetHeight: isRoadrunner
              ? UNICYCLIST_TARGET_HEIGHT_PX * ROADRUNNER_HEIGHT_RATIO
              : UNICYCLIST_TARGET_HEIGHT_PX,
            initialProgress: Math.random(),
            speedMultiplier: MIN_SPEED_MULTIPLIER + Math.random() * (MAX_SPEED_MULTIPLIER - MIN_SPEED_MULTIPLIER),
            yOffset: index * Y_OFFSET_INCREMENT,
          }
        })
        .sort((a, b) => a.yOffset - b.yOffset) // Sort to ensure correct z-index rendering

      setAnimators(configuredAnimators)
      animatorRefs.current = new Array(configuredAnimators.length).fill(null)
    }

    setupAnimators()
  }, [])

  // Effect 2: Calculate background transform on resize.
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const calculateTransform = () => {
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } = section
      const scale = Math.max(containerWidth / IMAGE_NATURAL_WIDTH, containerHeight / IMAGE_NATURAL_HEIGHT)
      transformDataRef.current = {
        scale,
        imageLeft: (containerWidth - IMAGE_NATURAL_WIDTH * scale) * OBJECT_POSITION_X,
        imageTop: (containerHeight - IMAGE_NATURAL_HEIGHT * scale) * OBJECT_POSITION_Y,
      }
    }
    const observer = new ResizeObserver(calculateTransform)
    observer.observe(section)
    calculateTransform()
    return () => observer.disconnect()
  }, [])

  // Effect 3: The master animation loop.
  useLayoutEffect(() => {
    if (animators.length === 0) return

    let animationFrameId: number
    const startTime = Date.now()

    const animate = () => {
      const elapsedTime = Date.now() - startTime
      const { scale, imageLeft, imageTop } = transformDataRef.current

      animators.forEach((animator, index) => {
        const el = animatorRefs.current[index]
        if (!el) return

        const totalDistance = 1 + 2 * N
        const progress =
          (animator.initialProgress + elapsedTime / (ANIMATION_DURATION_MS / animator.speedMultiplier)) % 1

        const imageX = (-N + progress * totalDistance) * IMAGE_NATURAL_WIDTH
        const visibleProgress = Math.max(0, Math.min(1, imageX / IMAGE_NATURAL_WIDTH))
        const ySlope = END_Y_PERCENT - START_Y_PERCENT
        const imageY = (START_Y_PERCENT + visibleProgress * ySlope + animator.yOffset) * IMAGE_NATURAL_HEIGHT

        const screenX = imageX * scale + imageLeft
        const screenY = imageY * scale + imageTop

        const screenHeight = animator.targetHeight * scale
        const screenWidth = screenHeight * animator.aspectRatio

        el.style.width = `${screenWidth}px`
        el.style.height = `${screenHeight}px`
        el.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -100%)`
        el.style.opacity = "1"
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [animators])

  return (
    <section ref={sectionRef} className="relative h-screen flex items-start justify-start overflow-hidden bg-black">
      {/* Poster Image - first frame extracted with ffmpeg */}
      {!videoLoaded && (
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('/video/hero-first-frame.webp')`
          }}
        />
      )}
      
      {/* Video - shows immediately when loaded */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video_inspire_ca_mars_1080-lO6q3NEi60J8eP0Qv7tvsK1de3hUAk.mp4" type="video/mp4" media="(min-width: 768px)" />
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video_inspire_ca_mars_720-ZmyLPaZsYtxoXVqahq8nSzfw8wB6Aa.mp4" type="video/mp4" media="(max-width: 767px)" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      <div className="relative z-10 w-full h-full flex flex-col justify-start pt-48 lg:pt-56">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)" }}
          >
            Cultivate your low-cost, high-tech life
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-black hover:bg-gray-100 sm:w-auto">
              <Link href="#apply">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-black bg-transparent sm:w-auto"
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Render all the animators */}
      {/*{animators.map((animator, index) => (*/}
      {/*  <img*/}
      {/*    key={animator.id}*/}
      {/*    ref={(el) => (animatorRefs.current[index] = el)}*/}
      {/*    src={animator.src || "/placeholder.svg"}*/}
      {/*    alt="Animating character"*/}
      {/*    className="absolute top-0 left-0"*/}
      {/*    style={{ willChange: "transform, width, height", opacity: 0, pointerEvents: "none" }}*/}
      {/*  />*/}
      {/*))}*/}
    </section>
  )
}
