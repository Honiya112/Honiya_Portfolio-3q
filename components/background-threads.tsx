"use client"

import { motion } from "framer-motion"

/*
 * Animated SVG thread lines that float gently across the background,
 * connecting the polaroid areas to the center carousel. Each thread
 * is a cubic Bezier curve with a slow draw + drift animation.
 */

const threads = [
  // Left side threads (polaroid → center)
  {
    d: "M 60 120 C 200 140, 350 80, 520 200",
    delay: 0.5,
    duration: 12,
  },
  {
    d: "M 80 200 C 220 180, 400 250, 550 300",
    delay: 1.2,
    duration: 14,
  },
  {
    d: "M 40 300 C 180 280, 320 350, 500 280",
    delay: 0.8,
    duration: 11,
  },
  // Right side threads (polaroid → center)
  {
    d: "M 960 100 C 800 130, 650 80, 500 190",
    delay: 0.7,
    duration: 13,
  },
  {
    d: "M 940 220 C 780 200, 600 260, 520 320",
    delay: 1.5,
    duration: 15,
  },
  {
    d: "M 980 320 C 820 300, 680 360, 510 270",
    delay: 1.0,
    duration: 12,
  },
  // Cross threads
  {
    d: "M 120 400 C 300 350, 600 420, 880 380",
    delay: 2.0,
    duration: 16,
  },
  {
    d: "M 200 500 C 400 460, 700 520, 900 480",
    delay: 2.5,
    duration: 14,
  },
]

export function BackgroundThreads() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <svg
        viewBox="0 0 1024 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {threads.map((thread, i) => (
          <motion.path
            key={i}
            d={thread.d}
            fill="none"
            stroke="#4A0E4E"
            strokeWidth="0.6"
            strokeOpacity="0.08"
            strokeLinecap="round"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.08, 0.06, 0.08],
            }}
            transition={{
              pathLength: {
                duration: thread.duration,
                delay: thread.delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
              opacity: {
                duration: thread.duration * 0.8,
                delay: thread.delay,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </svg>
    </div>
  )
}
