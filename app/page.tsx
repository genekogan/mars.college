"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import AnimatedScene from "@/components/animated-scene"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer" // Import SiteFooter
import CustomLightbox from "@/components/custom-lightbox"

const featureImages = [
  {
    src: "/images/build-your-world.jpg",
    alt: "Construction of pallet rack structures in the desert.",
    title: "Build a Campus",
    description:
      "We start on barren land. Martians organize into camps, build their own shelter and infrastructure, and cooperate to take care of everyone's basic needs.",
  },
  {
    src: "/images/research-and-learn.jpg",
    alt: "A community gathering for a talk inside a structure at night.",
    title: "Research & Learn",
    description: "Harness AI, solar, and off-grid tech to explore new frontiers in self-reliance and creativity.",
  },
  {
    src: "/images/find-your-joy.jpg",
    alt: "A group doing yoga at sunrise in the desert.",
    title: "Find Your Joy",
    description: "Pursue self-actualization, develop new skills, and form deep connections with like-minded people.",
  },
]

const academicsImage = {
  src: "/images/academics-workshop.jpg",
  alt: "A peer-led electronics workshop at Mars College",
}

const initialGalleryImages = [
  {
    src: "/images/gallery/pallet-rack-construction.jpg",
    alt: "Two people constructing a large pallet rack structure in the desert at dusk.",
  },
  {
    src: "/images/gallery/yoga-class.jpg",
    alt: "A group does yoga inside a pallet-rack structure, looking out at the desert.",
  },
  {
    src: "/images/gallery/solar-structure.jpg",
    alt: "A large structure under construction with solar panels in the desert.",
  },
  {
    src: "/images/gallery/live-coding.jpg",
    alt: "Two people live-coding music with code projected on the wall behind them.",
  },
  {
    src: "/images/gallery/community-gathering.jpg",
    alt: "A large community gathering in a circle around wooden pyramid structures.",
  },
  {
    src: "/images/gallery/night-presentation.jpg",
    alt: "An outdoor presentation at night with a crowd watching a projector screen.",
  },
  {
    src: "/images/gallery/crt-installation.jpg",
    alt: "An art installation with a wall of CRT monitors displaying generative art.",
  },
  { src: "/images/gallery/geodesic-dome.jpg", alt: "A geodesic dome lit with purple lights in the desert at night." },
  { src: "/images/gallery/sunset-watch.jpg", alt: "People watching the sunset from a raised platform in the desert." },
  {
    src: "/images/gallery/settlement-aerial.jpg",
    alt: "An aerial view of the Mars College settlement with RVs and custom structures.",
  },
  {
    src: "/images/gallery/solar-bleachers.jpg",
    alt: "A multi-level wooden structure with solar panels, serving as a gathering spot.",
  },
  {
    src: "/images/gallery/settlement-wide.jpg",
    alt: "A wide shot of the Mars College settlement against a mountain backdrop.",
  },
]

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages)

  useEffect(() => {
    const firstImage = initialGalleryImages[0]
    const restImages = initialGalleryImages.slice(1)
    const shuffledRest = shuffleArray(restImages)
    setGalleryImages([firstImage, ...shuffledRest])
  }, [])

  const allLightboxImages = useMemo(() => [...featureImages, academicsImage, ...galleryImages], [galleryImages])

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        <SiteHeader />

        {/* Hero Section with new video background */}
        <HeroSection />

        {/* What This Is Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
                Mars College: A 3-month experiment building an off-grid village to explore future technology and
                self-preservation.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureImages.map((image) => (
                <Card
                  key={image.src}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div
                    className="relative h-56 w-full cursor-pointer group"
                    onClick={() => setLightboxIndex(allLightboxImages.findIndex((img) => img.src === image.src))}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{image.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{image.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Academics Section */}
        <section id="academics" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className="relative h-96 lg:h-auto lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                onClick={() => setLightboxIndex(allLightboxImages.findIndex((img) => img.src === academicsImage.src))}
              >
                <Image
                  src={academicsImage.src || "/placeholder.svg"}
                  alt={academicsImage.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="lg:order-first">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Academics</h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Academics at Mars revolve around technology, off-grid living, and other subjects contributed by
                    residents through an open calendar and shared spaces. We build an auditorium, classroom, library,
                    and gallery, then invite Martians to activate them through workshops, installations, and
                    experiences.
                  </p>
                  <p>
                    We extend the idea of self-reliance to AI technology. We believe everyone should know how to build
                    their own personal AIs that help them live, learn, and thrive.{" "}
                    <a
                      href="https://eden.art"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      The Eden team
                    </a>{" "}
                    helps to run the AI program, grants Martians free compute, and the program culminates in a final
                    exhibition, gallery, and film festival.
                  </p>
                </div>
                <Button asChild variant="link" className="text-lg p-0 h-auto mt-6">
                  <Link href="/academics">
                    Learn more about academics <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section id="gallery" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Life on Mars</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div
                  key={image.src}
                  className="relative group overflow-hidden rounded-lg cursor-pointer h-64"
                  onClick={() => setLightboxIndex(allLightboxImages.findIndex((img) => img.src === image.src))}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Timeline</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
                <div className="space-y-8">
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-gray-900 rounded-full" />
                    <p className="font-mono text-sm text-gray-500">Nov 1, 2025</p>
                    <h3 className="text-xl font-bold mt-1">Build Semester Begins</h3>
                    <p className="text-gray-600 mt-2">
                      Invited build teams arrive to construct major structures and infrastructure.
                    </p>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-gray-900 rounded-full" />
                    <p className="font-mono text-sm text-gray-500">Jan 5, 2026</p>
                    <h3 className="text-xl font-bold mt-1">Quarter begins</h3>
                    <p className="text-gray-600 mt-2">
                      All Martians arrive for orientation, Ideas Week, and the start of the academic program.
                    </p>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-gray-900 rounded-full" />
                    <p className="font-mono text-sm text-gray-500">April 2, 2026</p>
                    <h3 className="text-xl font-bold mt-1">Final Showcase</h3>
                    <p className="text-gray-600 mt-2">
                      A multi-day event to share projects, research, and art with the community.
                    </p>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-gray-900 rounded-full" />
                    <p className="font-mono text-sm text-gray-500">April 27, 2026</p>
                    <h3 className="text-xl font-bold mt-1">Unbuild Ends</h3>
                    <p className="text-gray-600 mt-2">
                      All structures are disassembled and stored, returning the land to its original state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Scene & Application CTA */}
        <AnimatedScene />

        {/* Simplified Footer */}
        <SiteFooter />
      </div>

      <CustomLightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        slides={allLightboxImages}
      />
    </>
  )
}
