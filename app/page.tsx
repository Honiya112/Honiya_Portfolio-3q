"use client"

import { motion } from "framer-motion"
import { StitchedName } from "@/components/stitched-name"
import { DeviceCarousel } from "@/components/device-carousel"
import { PolaroidFrame } from "@/components/polaroid-frame"
import { BackgroundThreads } from "@/components/background-threads"
import { ProjectGrid } from "@/components/project-grid"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background fabric-texture overflow-hidden">
      {/* Animated background threads */}
      <BackgroundThreads />

      {/* Subtle stitch border around the page */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-[2]">
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
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen flex flex-col">
          {/* Polaroids as small corner accents - absolutely positioned */}
          {/* Top-left: Currently making */}
          <motion.div
            className="absolute top-4 left-4 md:top-8 md:left-8 z-20"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block text-[9px] md:text-[10px] font-serif text-[#4A0E4E]/50 tracking-widest uppercase mb-1.5 font-medium">
              {"What I'm making"}
            </span>
            <PolaroidFrame
              imageSrc="/images/crochet-bag.jpg"
              caption="purple crochet bag"
              rotation={-4}
              size="tiny"
              delay={0.5}
              alt="A hand-crocheted purple bag being made"
            />
          </motion.div>

          {/* Top-right: Photo of the day */}
          <motion.div
            className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex flex-col items-end"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="block text-[9px] md:text-[10px] font-serif text-[#4A0E4E]/50 tracking-widest uppercase mb-1.5 font-medium">
              Photo of the day
            </span>
            <PolaroidFrame
              imageSrc="/images/photo-of-day.jpg"
              caption="golden hour"
              rotation={5}
              size="tiny"
              delay={0.7}
              alt="Golden hour photograph of lavender flowers"
            />
          </motion.div>

          {/* Title at top center with generous padding */}
          <div className="flex flex-col items-center pt-12 md:pt-20 px-4">
            <StitchedName />

            {/* Subtitle */}
            <motion.div
              className="flex items-center gap-3 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2, duration: 0.8 }}
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
              <p className="font-sans text-sm md:text-base text-[#4A0E4E]/80 tracking-[0.2em] uppercase font-semibold">
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
          </div>

          {/* 3D Device Carousel - main hero focus, immediately below title */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center px-4 pt-6 md:pt-10 pb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <DeviceCarousel />
          </motion.div>
        </section>

        {/* ===== ALL STITCHES SECTION ===== */}
        <section className="px-4 md:px-12 lg:px-20 py-12 md:py-20">
          {/* Section header with stitch lines */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <svg width="60" height="2" className="hidden md:block">
              <line
                x1="0" y1="1" x2="60" y2="1"
                stroke="#4A0E4E"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                strokeOpacity="0.25"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="font-serif text-xl md:text-2xl text-[#4A0E4E]/70 tracking-[0.15em] uppercase font-medium">
              All Stitches
            </h2>
            <svg width="60" height="2" className="hidden md:block">
              <line
                x1="0" y1="1" x2="60" y2="1"
                stroke="#4A0E4E"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                strokeOpacity="0.25"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <ProjectGrid />
        </section>

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
          <p className="font-sans text-xs text-[#4A0E4E]/40 tracking-widest uppercase">
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
      className={`fixed ${positionClasses[position]} z-[2] pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4.5, duration: 0.5 }}
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
