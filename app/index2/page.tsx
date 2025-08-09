"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import AnimatedScene from "@/components/animated-scene"
import SiteFooter from "@/components/site-footer"
import CustomLightbox from "@/components/custom-lightbox"

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

export default function TeaserPage() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages)

  useEffect(() => {
    const firstImage = initialGalleryImages[0]
    const restImages = initialGalleryImages.slice(1)
    const shuffledRest = shuffleArray(restImages)
    setGalleryImages([firstImage, ...shuffledRest])
  }, [])

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        {/* Animated Scene & Application CTA */}
        <AnimatedScene
          title="Mars College 2026 is coming"
          subtitle="Applications for 2026 will open August 10. If you are interested, get in touch!"
          primaryButtonText="Inquiry form"
          primaryButtonLink="https://docs.google.com/forms/d/e/1FAIpQLSeON-_N_rrD_ThblW_v5l5yCM0s8fgS1eiKYnRy8TV5nXs4lA/viewform"
        />

        {/* Photo Gallery */}
        <section id="gallery" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Life on Mars</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image.src}
                  className="relative group overflow-hidden rounded-lg cursor-pointer h-64"
                  onClick={() => setLightboxIndex(index)}
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

        {/* Footer */}
        <SiteFooter />
      </div>

      <CustomLightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        slides={galleryImages}
      />
    </>
  )
}
