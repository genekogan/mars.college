"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Film, Calendar, GalleryThumbnails, Music, Cpu, Gamepad2 } from "lucide-react"
import Lightbox from "yet-another-react-lightbox"
import SiteHeader from "@/components/site-header"

const timelineEvents = [
  {
    date: "Jan 12",
    title: "Ideas Week",
    description:
      "A Mars tradition to introduce yourself and your passions to the community. Share projects you want to build, topics you want to learn, or workshops you could give.",
  },
  {
    date: "Jan 19 - Feb 19",
    title: "Bootcamp",
    description:
      "The first half of the Mars program is a structured bootcamp, an intensive on gaining expertise in AI, containing lectures and workshops in AI fundamentals, tooling, agents, vibe coding, and other such topics.",
  },
  {
    date: "Feb 21-22",
    title: "Day 45",
    description:
      "A creative hackathon followed by midterm presentations. Showcase your progress and lay out a study plan for the second half of the semester.",
  },
  {
    date: "Feb 23 - Mar 26",
    title: "Finals Sprint",
    description: "More open-ended time to pursue solo and collaborative projects aimed towards the final showcase.",
  },
  {
    date: "Mar 27 - 30",
    title: "Mars Electronica: The Final Showcase",
    description:
      "The culmination of the semester's work, featuring a multi-day festival of technology, art, and ideas.",
  },
]

const academicsGalleryImages = [
  {
    src: "/images/academics-gallery/2.jpeg",
    alt: "An audience watches a presentation at night in a self-built wooden structure.",
  },
  {
    src: "/images/academics-gallery/4.jpeg",
    alt: "A group of people in a workshop setting inside a room with pallet rack shelving.",
  },
  {
    src: "/images/academics-gallery/1.jpeg",
    alt: "A person with a modular synthesizer setup performing in a dark space with a large visual projected behind them.",
  },
  {
    src: "/images/academics-gallery/5.jpeg",
    alt: "A person with long dreadlocks points at a large screen displaying colorful AI-generated art.",
  },
  {
    src: "/images/academics-gallery/3.jpeg",
    alt: "A large collage of many different colorful AI-generated images and characters.",
  },
  {
    src: "/images/academics-gallery/6.jpeg",
    alt: "An overhead view inside a workshop showing hydroponic systems and other builds.",
  },
]

export default function AcademicsPage() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  return (
    <>
      <div className="bg-white text-gray-900">
        <SiteHeader variant="opaque" />

        <main>
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[400px] flex items-start justify-start text-left text-white">
            <Image
              src="/images/performing-arts-1.jpg"
              alt="A presentation happening at night at Mars College"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 container mx-auto px-4 pt-[10vh]">
              <h1 className="text-3xl md:text-5xl font-bold" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
                Academics on Mars
              </h1>
            </div>
          </section>

          {/* Intro Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold">A New Kind of School</h2>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  We believe everyone should know how to build their own personal AIs that help them live, learn, and
                  thrive in a place like Mars. That self-reliance extends to AI; we should learn how it works and how to
                  get the most out of the available tools for research, learn, acquiring new skills quickly, and being
                  creative.
                </p>
              </div>
            </div>
          </section>

          {/* Creative AI School Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Creative AI School</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  The Creative AI school is a 6-week crash course on applying AI tools to research, art, and personal
                  growth. It focuses on how AI and AI agents work, on how to use them for productivity, research, and
                  self-reliantly doing things that previously required expensive experts to do. The course will
                  specialize in creative agents, those that produce art and film and music videos as well as
                  autonomously run its own social media accounts.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
                <div className="text-center p-6 border rounded-lg bg-white shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-900 p-3 rounded-full">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Vibe Coding</h3>
                  <p className="text-gray-600">
                    A bootcamp / nocode engineering school where we learn to build applications, films, and games with
                    an ease previously available only to software engineers but now to anyone who knows what they want
                    to build.
                  </p>
                </div>
                <div className="text-center p-6 border rounded-lg bg-white shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-900 p-3 rounded-full">
                      <Film className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Film Academy</h3>
                  <p className="text-gray-600">
                    A filmmaker co-op focused on applying AI tools towards making films, commercials, music videos, and
                    other media, and to produce the 4th annual Mars Film Festival.
                  </p>
                </div>
                <div className="text-center p-6 border rounded-lg bg-white shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-900 p-3 rounded-full">
                      <Gamepad2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Game Jam</h3>
                  <p className="text-gray-600">Build digital and physical games.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Campus Life & Gallery Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Campus Life</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  We build our own auditorium, gallery, library, and other common spaces that Martians can own and
                  activate for workshops, installations, and community events.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {academicsGalleryImages.map((image, idx) => (
                  <div
                    key={image.src}
                    className="relative group overflow-hidden rounded-lg cursor-pointer h-64"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">The Mars Semester</h2>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="relative pl-12 pb-12">
                      <div className="absolute left-0 top-1">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 ring-8 ring-white">
                          <Calendar className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <p className="font-mono text-sm text-gray-500">{event.date}</p>
                      <h3 className="text-xl font-bold mt-1">{event.title}</h3>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Mars Electronica Showcase Section */}
          <section className="relative py-20 text-white">
            <div className="absolute inset-0 bg-black">
              <Image
                src="/images/electronica-bg.jpg"
                alt="Long exposure shot of the Mars College campus at night with light trails."
                fill
                className="object-cover opacity-90"
              />
            </div>
            <div className="relative container mx-auto px-4">
              <div className="text-center mb-32">
                <div className="inline-block bg-black/60 backdrop-blur-sm p-6 rounded-xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Mars Electronica</h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    The semester culminates in a multi-day festival of technology, art, and ideas.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* The Gallery Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image
                      src="/images/electronica/film-festival.jpg"
                      alt="A person curating a wall of printed AI-generated images for the gallery."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <GalleryThumbnails className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Gallery</h3>
                    </div>
                    <p className="text-gray-300">prepared by Martians for final exhibition</p>
                  </div>
                </div>

                {/* AI Film Festival Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image
                      src="/images/electronica/gallery.jpeg"
                      alt="An art installation of CRT monitors in a long corridor facing the desert."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Film className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Film Festival</h3>
                    </div>
                    <p className="text-gray-300">4th annual experimental AI film festival</p>
                  </div>
                </div>

                {/* Exhibition Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image
                      src="/images/electronica/live-events.jpg"
                      alt="A large face projected onto a rock formation at night with an audience watching."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Exhibition</h3>
                    </div>
                    <p className="text-gray-300">The final presentation</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build the Future?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Propose a project, a workshop, or a new way of living. Join us in creating a new model for education and
                community.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-white text-black hover:bg-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeON-_N_rrD_ThblW_v5l5yCM0s8fgS1eiKYnRy8TV5nXs4lA/viewform">
                  Apply for Mars College <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={academicsGalleryImages}
      />
    </>
  )
}
