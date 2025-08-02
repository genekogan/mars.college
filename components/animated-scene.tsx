"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

// --- Main Configuration ---
const IMAGE_NATURAL_WIDTH = 1920;
const IMAGE_NATURAL_HEIGHT = 1080;
const OBJECT_POSITION_X = 0.67;
const OBJECT_POSITION_Y = 0.55;

// --- Animator Fleet Configuration ---
const UNICYCLIST_TARGET_HEIGHT_PX = 262.5;
const ROADRUNNER_HEIGHT_RATIO = 2 / 3;
const Y_OFFSET_INCREMENT = 0.0085; // Vertical separation between riders
const MIN_SPEED_MULTIPLIER = 0.8;
const MAX_SPEED_MULTIPLIER = 1.2;

// --- Animation Path Configuration ---
const N = 2; // Multiplier for off-screen travel distance
const ANIMATION_DURATION_MS = 30000; // Base duration for a full cycle
const START_Y_PERCENT = 0.74; // 80% from top at left edge (x=0)
const END_Y_PERCENT = 0.99; // 95% from top at right edge (x=width)

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
];

interface Animator {
  id: string;
  src: string;
  aspectRatio: number;
  targetHeight: number;
  initialProgress: number;
  speedMultiplier: number;
  yOffset: number;
}

// Fisher-Yates shuffle algorithm to randomize array order
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export default function AnimatedScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const animatorRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [animators, setAnimators] = useState<Animator[]>([]);

  const transformDataRef = useRef({ scale: 1, imageLeft: 0, imageTop: 0 });

  // Effect 1: Initialize all animators once on mount.
  useEffect(() => {
    const setupAnimators = async () => {
      const shuffledSources = shuffleArray([...imageSources]);

      const animatorPromises = shuffledSources.map(
        (src) =>
          new Promise<{ src: string; aspectRatio: number }>((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () =>
              resolve({
                src,
                aspectRatio: img.naturalWidth / img.naturalHeight,
              });
          })
      );

      const loadedImages = await Promise.all(animatorPromises);

      const configuredAnimators = loadedImages
        .map(({ src, aspectRatio }, index) => {
          const isRoadrunner = src.includes("roadrunner");
          return {
            id: `${src}-${index}`,
            src,
            aspectRatio,
            targetHeight: isRoadrunner
              ? UNICYCLIST_TARGET_HEIGHT_PX * ROADRUNNER_HEIGHT_RATIO
              : UNICYCLIST_TARGET_HEIGHT_PX,
            initialProgress: Math.random(),
            speedMultiplier:
              MIN_SPEED_MULTIPLIER +
              Math.random() * (MAX_SPEED_MULTIPLIER - MIN_SPEED_MULTIPLIER),
            yOffset: index * Y_OFFSET_INCREMENT,
          };
        })
        .sort((a, b) => a.yOffset - b.yOffset); // Sort to ensure correct z-index rendering

      setAnimators(configuredAnimators);
      animatorRefs.current = new Array(configuredAnimators.length).fill(null);
    };

    setupAnimators();
  }, []);

  // Effect 2: Calculate background transform on resize.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const calculateTransform = () => {
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        section;
      const scale = Math.max(
        containerWidth / IMAGE_NATURAL_WIDTH,
        containerHeight / IMAGE_NATURAL_HEIGHT
      );
      transformDataRef.current = {
        scale,
        imageLeft:
          (containerWidth - IMAGE_NATURAL_WIDTH * scale) * OBJECT_POSITION_X,
        imageTop:
          (containerHeight - IMAGE_NATURAL_HEIGHT * scale) * OBJECT_POSITION_Y,
      };
    };
    const observer = new ResizeObserver(calculateTransform);
    observer.observe(section);
    calculateTransform();
    return () => observer.disconnect();
  }, []);

  // Effect 3: The master animation loop.
  useLayoutEffect(() => {
    if (animators.length === 0) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const { scale, imageLeft, imageTop } = transformDataRef.current;

      animators.forEach((animator, index) => {
        const el = animatorRefs.current[index];
        if (!el) return;

        const totalDistance = 1 + 2 * N;
        const progress =
          (animator.initialProgress +
            elapsedTime / (ANIMATION_DURATION_MS / animator.speedMultiplier)) %
          1;

        const imageX = (-N + progress * totalDistance) * IMAGE_NATURAL_WIDTH;
        const visibleProgress = Math.max(
          0,
          Math.min(1, imageX / IMAGE_NATURAL_WIDTH)
        );
        const ySlope = END_Y_PERCENT - START_Y_PERCENT;
        const imageY =
          (START_Y_PERCENT + visibleProgress * ySlope + animator.yOffset) *
          IMAGE_NATURAL_HEIGHT;

        const screenX = imageX * scale + imageLeft;
        const screenY = imageY * scale + imageTop;

        const screenHeight = animator.targetHeight * scale;
        const screenWidth = screenHeight * animator.aspectRatio;

        el.style.width = `${screenWidth}px`;
        el.style.height = `${screenHeight}px`;
        el.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -100%)`;
        el.style.opacity = "1";
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [animators]);

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="relative h-screen flex items-start justify-start overflow-hidden bg-black text-white"
    >
      <Image
        src="/images/mars-hero-solar.png"
        alt="Mars College desert community"
        fill
        priority
        className="object-cover"
        style={{
          objectPosition: `${OBJECT_POSITION_X * 100}% ${
            OBJECT_POSITION_Y * 100
          }%`,
        }}
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

      {/* Render all the animators */}
      {animators.map((animator, index) => (
        <Image
          key={animator.id}
          ref={(el) => {
            animatorRefs.current[index] = el;
          }}
          src={animator.src || "/placeholder.svg"}
          alt="Animating character"
          width={1}
          height={1}
          className="absolute top-0 left-0"
          style={{
            willChange: "transform, width, height",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* CTA Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start pt-32 lg:pt-40 text-left">
        <div className="container px-4 lg:px-6 max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow:
                "3px 3px 12px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            Join us on Mars
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl text-gray-100"
            style={{
              textShadow:
                "2px 2px 8px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.7)",
            }}
          >
            Applications for 2026 are now open. Propose an academic program, a
            structure, or a service and join us in building our world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
            <Button
              size="lg"
              asChild
              className="bg-white text-black hover:bg-gray-100"
            >
              <Link
                href="https://forms.gle/HAP6JSMnB4i55aTAA"
                className="flex items-center"
              >
                Apply Now <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="mailto:hello@mars.college">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
