"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface LetterDef {
  char: string
  d: string
  width: number
}

const FONT_H = 72
const GAP = 10
const WORD_GAP = 32

function buildLetters(): LetterDef[] {
  const defs: Record<string, { d: (x: number) => string; w: number }> = {
    H: {
      d: (x) =>
        `M${x} ${FONT_H} L${x} 0 M${x} ${FONT_H * 0.5} L${x + 44} ${FONT_H * 0.5} M${x + 44} 0 L${x + 44} ${FONT_H}`,
      w: 44,
    },
    O: {
      d: (x) =>
        `M${x + 23} 0 Q${x} 0 ${x} ${FONT_H * 0.5} Q${x} ${FONT_H} ${x + 23} ${FONT_H} Q${x + 46} ${FONT_H} ${x + 46} ${FONT_H * 0.5} Q${x + 46} 0 ${x + 23} 0`,
      w: 46,
    },
    N: {
      d: (x) =>
        `M${x} ${FONT_H} L${x} 0 L${x + 44} ${FONT_H} L${x + 44} 0`,
      w: 44,
    },
    I: {
      d: (x) =>
        `M${x} 0 L${x + 26} 0 M${x + 13} 0 L${x + 13} ${FONT_H} M${x} ${FONT_H} L${x + 26} ${FONT_H}`,
      w: 26,
    },
    Y: {
      d: (x) =>
        `M${x} 0 L${x + 21} ${FONT_H * 0.45} L${x + 42} 0 M${x + 21} ${FONT_H * 0.45} L${x + 21} ${FONT_H}`,
      w: 42,
    },
    A: {
      d: (x) =>
        `M${x} ${FONT_H} L${x + 23} 0 L${x + 46} ${FONT_H} M${x + 11} ${FONT_H * 0.6} L${x + 35} ${FONT_H * 0.6}`,
      w: 46,
    },
    M: {
      d: (x) =>
        `M${x} ${FONT_H} L${x} 0 L${x + 27} ${FONT_H * 0.55} L${x + 54} 0 L${x + 54} ${FONT_H}`,
      w: 54,
    },
    Q: {
      d: (x) =>
        `M${x + 23} 0 Q${x} 0 ${x} ${FONT_H * 0.5} Q${x} ${FONT_H} ${x + 23} ${FONT_H} Q${x + 46} ${FONT_H} ${x + 46} ${FONT_H * 0.5} Q${x + 46} 0 ${x + 23} 0 M${x + 32} ${FONT_H * 0.7} L${x + 50} ${FONT_H + 8}`,
      w: 50,
    },
    S: {
      d: (x) =>
        `M${x + 40} ${FONT_H * 0.12} Q${x + 40} 0 ${x + 21} 0 Q${x} 0 ${x} ${FONT_H * 0.22} Q${x} ${FONT_H * 0.42} ${x + 21} ${FONT_H * 0.48} Q${x + 42} ${FONT_H * 0.54} ${x + 42} ${FONT_H * 0.76} Q${x + 42} ${FONT_H} ${x + 21} ${FONT_H} Q${x} ${FONT_H} ${x} ${FONT_H * 0.88}`,
      w: 42,
    },
    D: {
      d: (x) =>
        `M${x} 0 L${x} ${FONT_H} L${x + 26} ${FONT_H} Q${x + 48} ${FONT_H} ${x + 48} ${FONT_H * 0.5} Q${x + 48} 0 ${x + 26} 0 Z`,
      w: 48,
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

/*
 * Each letter drawn one after the other with dashed strokes.
 *
 * We measure the real SVG path length, set strokeDasharray = "8 8",
 * then animate strokeDashoffset from totalLen -> 0 with a staggered
 * delay so each letter completes before the next one starts.
 *
 * No glowing dot, just the dashes drawing in.
 */
function AnimatedLetter({
  d,
  delay,
  duration,
}: {
  d: string
  delay: number
  duration: number
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [totalLen, setTotalLen] = useState(600)

  useEffect(() => {
    if (pathRef.current) {
      setTotalLen(pathRef.current.getTotalLength())
    }
  }, [])

  return (
    <motion.path
      ref={pathRef}
      d={d}
      fill="none"
      stroke="#4A0E4E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="8 8"
      initial={{ strokeDashoffset: totalLen, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{
        strokeDashoffset: {
          duration,
          delay,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.1,
          delay,
        },
      }}
    />
  )
}

export function StitchedName() {
  const [letters] = useState(() => buildLetters())

  const drawableLetters = letters.filter((l) => l.d !== "")
  const totalWidth =
    letters.reduce((acc, l) => acc + l.width + (l.char !== " " ? GAP : 0), 0) - GAP

  // Total animation = ~4s. Stagger each letter so it finishes before next starts.
  const totalDrawable = drawableLetters.length
  const perLetterDuration = 3.5 / totalDrawable // each letter's draw time
  const staggerDelay = perLetterDuration * 0.85 // slight overlap for smoothness

  let drawIndex = 0

  return (
    <div className="flex flex-col items-center w-full z-50 relative">
      <svg
        viewBox={`-12 -12 ${totalWidth + 24} ${FONT_H + 32}`}
        className="w-full max-w-[420px] md:max-w-[540px] lg:max-w-[620px] h-auto"
        aria-label="Honiya Maqsood"
        role="img"
      >
        <title>Honiya Maqsood</title>
        {letters.map((letter, i) => {
          if (letter.d === "") return null
          const idx = drawIndex++
          return (
            <AnimatedLetter
              key={i}
              d={letter.d}
              delay={0.3 + idx * staggerDelay}
              duration={perLetterDuration}
            />
          )
        })}
      </svg>
    </div>
  )
}
