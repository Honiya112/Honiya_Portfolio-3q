"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

/*
 * Each letter of "HONIYA MAQSOOD" is defined as an SVG <path>.
 * Framer Motion's `pathLength` drives a single 0 → 1 animation that
 * reveals the stroke progressively, producing the "needle-stitching"
 * draw effect. A dashed `strokeDasharray` overlays the stroke so the
 * solid draw still looks like thread stitches.
 *
 * A global progress motion-value (0 → 1 over 3 s) is used; each letter
 * maps its own slice of that progress so letters appear left-to-right.
 */

interface LetterDef {
  char: string
  d: string // SVG path data
  width: number // advance width
}

const FONT_H = 72 // cap-height in SVG units
const GAP = 8 // inter-letter gap
const WORD_GAP = 28 // space between words

function buildLetters(): LetterDef[] {
  // Bolder, more complete letter paths at 72-unit height for high legibility
  const defs: Record<string, { d: (x: number) => string; w: number }> = {
    H: {
      d: (x) =>
        `M${x} ${FONT_H} L${x} 0 M${x} ${FONT_H * 0.5} L${x + 42} ${FONT_H * 0.5} M${x + 42} 0 L${x + 42} ${FONT_H}`,
      w: 42,
    },
    O: {
      d: (x) =>
        `M${x + 22} 0 Q${x} 0 ${x} ${FONT_H * 0.5} Q${x} ${FONT_H} ${x + 22} ${FONT_H} Q${x + 44} ${FONT_H} ${x + 44} ${FONT_H * 0.5} Q${x + 44} 0 ${x + 22} 0`,
      w: 44,
    },
    N: {
      d: (x) =>
        `M${x} ${FONT_H} L${x} 0 L${x + 42} ${FONT_H} L${x + 42} 0`,
      w: 42,
    },
    I: {
      d: (x) =>
        `M${x} 0 L${x + 24} 0 M${x + 12} 0 L${x + 12} ${FONT_H} M${x} ${FONT_H} L${x + 24} ${FONT_H}`,
      w: 24,
    },
    Y: {
      d: (x) =>
        `M${x} 0 L${x + 20} ${FONT_H * 0.45} L${x + 40} 0 M${x + 20} ${FONT_H * 0.45} L${x + 20} ${FONT_H}`,
      w: 40,
    },
    A: {
      d: (x) =>
        `M${x} ${FONT_H} L${x + 22} 0 L${x + 44} ${FONT_H} M${x + 10} ${FONT_H * 0.6} L${x + 34} ${FONT_H * 0.6}`,
      w: 44,
    },
    M: {
      d: (x) =>
        `M${x} ${FONT_H} L${x} 0 L${x + 26} ${FONT_H * 0.55} L${x + 52} 0 L${x + 52} ${FONT_H}`,
      w: 52,
    },
    Q: {
      d: (x) =>
        `M${x + 22} 0 Q${x} 0 ${x} ${FONT_H * 0.5} Q${x} ${FONT_H} ${x + 22} ${FONT_H} Q${x + 44} ${FONT_H} ${x + 44} ${FONT_H * 0.5} Q${x + 44} 0 ${x + 22} 0 M${x + 30} ${FONT_H * 0.7} L${x + 48} ${FONT_H + 8}`,
      w: 48,
    },
    S: {
      d: (x) =>
        `M${x + 38} ${FONT_H * 0.12} Q${x + 38} 0 ${x + 20} 0 Q${x} 0 ${x} ${FONT_H * 0.22} Q${x} ${FONT_H * 0.42} ${x + 20} ${FONT_H * 0.48} Q${x + 40} ${FONT_H * 0.54} ${x + 40} ${FONT_H * 0.76} Q${x + 40} ${FONT_H} ${x + 20} ${FONT_H} Q${x} ${FONT_H} ${x} ${FONT_H * 0.88}`,
      w: 40,
    },
    D: {
      d: (x) =>
        `M${x} 0 L${x} ${FONT_H} L${x + 24} ${FONT_H} Q${x + 46} ${FONT_H} ${x + 46} ${FONT_H * 0.5} Q${x + 46} 0 ${x + 24} 0 Z`,
      w: 46,
    },
  }

  const text = "HONIYA MAQSOOD"
  const letters: LetterDef[] = []
  let cx = 0

  for (const ch of text) {
    if (ch === " ") {
      letters.push({ char: " ", d: "", width: WORD_GAP })
      cx += WORD_GAP
    } else {
      const def = defs[ch]
      if (def) {
        letters.push({ char: ch, d: def.d(cx), width: def.w })
        cx += def.w + GAP
      }
    }
  }

  return letters
}

function AnimatedLetter({
  d,
  index,
  total,
  progress,
}: {
  d: string
  index: number
  total: number
  progress: ReturnType<typeof useMotionValue<number>>
}) {
  // Each letter occupies a slice of the 0→1 timeline
  const sliceStart = index / total
  const sliceEnd = (index + 1) / total
  const pathLength = useTransform(progress, [sliceStart, sliceEnd], [0, 1])
  const opacity = useTransform(progress, [sliceStart, Math.min(sliceStart + 0.02, 1)], [0, 1])

  return (
    <>
      {/* Solid fill stroke drawn progressively */}
      <motion.path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
          opacity,
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.35))",
        }}
      />
      {/* Dashed overlay for the "stitch" texture */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 5"
        style={{
          pathLength,
          opacity,
        }}
      />
    </>
  )
}

export function StitchedName() {
  const [letters] = useState(() => buildLetters())
  const progress = useMotionValue(0)
  const hasAnimated = useRef(false)

  const drawableLetters = letters.filter((l) => l.d !== "")
  const totalDrawable = drawableLetters.length

  // total SVG width from letter data
  const totalWidth = letters.reduce((acc, l) => acc + l.width + (l.char !== " " ? GAP : 0), 0) - GAP

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    animate(progress, 1, { duration: 3, ease: "easeInOut" })
  }, [progress])

  // Assign sequential indices only to drawable letters
  let drawIndex = 0

  return (
    <div className="flex flex-col items-center w-full">
      <svg
        viewBox={`-8 -8 ${totalWidth + 16} ${FONT_H + 24}`}
        className="w-full max-w-[740px] md:max-w-[900px] h-auto"
        aria-label="Honiya Maqsood"
        role="img"
      >
        <title>{"Honiya Maqsood"}</title>
        {letters.map((letter, i) => {
          if (letter.d === "") return null
          const idx = drawIndex++
          return (
            <AnimatedLetter
              key={i}
              d={letter.d}
              index={idx}
              total={totalDrawable}
              progress={progress}
            />
          )
        })}
      </svg>
    </div>
  )
}
