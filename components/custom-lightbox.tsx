"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface CustomLightboxProps {
  open: boolean
  close: () => void
  slides: { src: string; alt?: string }[]
  index: number
  setIndex: (index: number) => void
}

export default function CustomLightbox({ open, close, slides, index, setIndex }: CustomLightboxProps) {
  const touchStartY = useRef<number>(0)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY
    
    // If swipe down more than 100px, close lightbox
    if (deltaY < -100) {
      close()
    }
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      } else if (e.key === "ArrowLeft") {
        setIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
      } else if (e.key === "ArrowRight") {
        setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, close, setIndex, slides.length])

  if (!open || index < 0 || index >= slides.length) {
    return null
  }

  const currentSlide = slides[index]

  const handleOverlayClick = () => {
    close()
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in-50"
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full h-full flex items-center justify-center" onClick={handleContentClick}>
        <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
          <Image
            src={currentSlide.src || "/placeholder.svg"}
            alt={currentSlide.alt || "Lightbox image"}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <button
        onClick={close}
        className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors z-50"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </button>

      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
    </div>
  )
}
