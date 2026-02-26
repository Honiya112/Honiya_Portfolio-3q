"use client"

import { motion } from "framer-motion"
import { StitchedName } from "@/components/stitched-name"
import { DeviceCarousel } from "@/components/device-carousel"
import { PolaroidFrame } from "@/components/polaroid-frame"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background fabric-texture overflow-hidden">
      {/* Subtle stitch border around the page */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#4A0E4E"
            strokeWidth="1.5"
            strokeDasharray="10 8"
            strokeOpacity="0.15"
            rx="16"
          />
        </svg>
      </div>

      <main className="relative z-10">
        {/* Top bar with polaroids */}
        <div className="relative w-full px-4 md:px-12 pt-6 md:pt-10">
          <div className="flex justify-between items-start">
            {/* Left polaroid: Currently making */}
            <motion.div
              className="flex flex-col items-start gap-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-[10px] md:text-xs font-sans text-[#4A0E4E]/50 tracking-widest uppercase mb-1">
                {"What I'm currently making"}
              </span>
              <PolaroidFrame
                imageSrc="/images/crochet-bag.jpg"
                caption="purple crochet bag"
                rotation={-3}
                size="medium"
                delay={0.5}
                alt="A hand-crocheted purple bag being made"
              />
            </motion.div>

            {/* Right polaroid: Photo of the day */}
            <motion.div
              className="flex flex-col items-end gap-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-[10px] md:text-xs font-sans text-[#4A0E4E]/50 tracking-widest uppercase mb-1">
                Picture of the day
              </span>
              <PolaroidFrame
                imageSrc="/images/photo-of-day.jpg"
                caption="golden hour"
                rotation={4}
                size="small"
                delay={0.7}
                alt="Golden hour photograph of lavender flowers"
              />
            </motion.div>
          </div>
        </div>

        {/* Hero: Stitched Name */}
        <section className="flex flex-col items-center px-4 pt-8 md:pt-16 pb-6">
          <StitchedName />

          {/* Subtitle with stitch accent */}
          <motion.div
            className="flex items-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <svg width="40" height="2" className="hidden md:block">
              <line
                x1="0" y1="1" x2="40" y2="1"
                stroke="#4A0E4E"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                strokeOpacity="0.35"
              />
            </svg>
            <p className="font-sans text-sm md:text-base text-[#4A0E4E]/70 tracking-[0.2em] uppercase font-medium">
              Innovative Developer
            </p>
            <svg width="40" height="2" className="hidden md:block">
              <line
                x1="0" y1="1" x2="40" y2="1"
                stroke="#4A0E4E"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                strokeOpacity="0.35"
              />
            </svg>
          </motion.div>
        </section>

        {/* 3D Device Carousel */}
        <motion.section
          className="px-4 py-8 md:py-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.h2
            className="text-center font-serif text-lg md:text-xl text-[#4A0E4E]/60 tracking-[0.15em] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Selected Works
          </motion.h2>
          <DeviceCarousel />
        </motion.section>

        {/* Footer stitch */}
        <footer className="flex flex-col items-center gap-4 pb-12 pt-8">
          <svg width="120" height="2">
            <line
              x1="0" y1="1" x2="120" y2="1"
              stroke="#4A0E4E"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              strokeOpacity="0.25"
            />
          </svg>
          <p className="font-sans text-xs text-[#4A0E4E]/30 tracking-widest uppercase">
            Crafted with care
          </p>
        </footer>
      </main>

      {/* Corner stitch decorations */}
      <CornerStitch position="top-left" />
      <CornerStitch position="top-right" />
      <CornerStitch position="bottom-left" />
      <CornerStitch position="bottom-right" />
    </div>
  )
}

function CornerStitch({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClasses = {
    "top-left": "top-6 left-6 md:top-10 md:left-10",
    "top-right": "top-6 right-6 md:top-10 md:right-10",
    "bottom-left": "bottom-6 left-6 md:bottom-10 md:left-10",
    "bottom-right": "bottom-6 right-6 md:bottom-10 md:right-10",
  }

  const rotations = {
    "top-left": 0,
    "top-right": 90,
    "bottom-left": 270,
    "bottom-right": 180,
  }

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-0 pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 0.5 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ transform: `rotate(${rotations[position]}deg)` }}
      >
        <path
          d="M2 22 L2 2 L22 2"
          fill="none"
          stroke="#4A0E4E"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeOpacity="0.2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}
