"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
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
 * Each letter drawn with DASHED strokes (stitching look).
 *
 * The trick: we measure the real path length, then set
 *   stroke-dasharray = "8 8 8 8 ... <remaining> <totalLen>"
 * Initially stroke-dashoffset = totalLen (nothing visible).
 * We animate offset -> 0 so dashes progressively appear.
 *
 * Because we keep the 8-8 dash pattern baked in AND only move
 * the offset, the final result is a dashed / stitched line.
 */
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
  const pathRef = useRef<SVGPathElement>(null)
  const [totalLen, setTotalLen] = useState(600) // sensible default

  useEffect(() => {
    if (pathRef.current) {
      setTotalLen(pathRef.current.getTotalLength())
    }
  }, [])

  const sliceStart = index / total
  const sliceEnd = (index + 1) / total

  // Map global 0-1 progress to this letter's local 0-1
  const localProgress = useTransform(progress, [sliceStart, sliceEnd], [0, 1])
  // strokeDashoffset goes from totalLen (hidden) to 0 (fully drawn)
  const dashOffset = useTransform(localProgress, [0, 1], [totalLen, 0])
  // Fade in right as drawing starts
  const opacity = useTransform(progress, [sliceStart, Math.min(sliceStart + 0.01, 1)], [0, 1])

  // Build a dasharray that is "8 8" repeated enough to cover the full length,
  // so the visible portion always shows dashed stitches.
  const dashArray = `8 8`

  return (
    <motion.path
      ref={pathRef}
      d={d}
      fill="none"
      stroke="#4A0E4E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashArray}
      style={{
        strokeDashoffset: dashOffset,
        opacity,
      }}
    />
  )
}

/* Glowing needle dot that follows the currently-drawing letter */
function NeedleDot({
  letters,
  progress,
}: {
  letters: LetterDef[]
  progress: ReturnType<typeof useMotionValue<number>>
}) {
  const dotRef = useRef<SVGCircleElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const pathRefs = useRef<SVGPathElement[]>([])
  const drawable = letters.filter((l) => l.d !== "")
  const total = drawable.length

  useEffect(() => {
    const svg = dotRef.current?.closest("svg")
    if (!svg) return
    pathRefs.current = drawable.map((l) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
      p.setAttribute("d", l.d)
      p.style.visibility = "hidden"
      p.style.position = "absolute"
      svg.appendChild(p)
      return p
    })
    return () => {
      pathRefs.current.forEach((p) => p.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
      if (!dotRef.current || pathRefs.current.length === 0) return
      const letterIdx = Math.min(Math.floor(v * total), total - 1)
      const path = pathRefs.current[letterIdx]
      if (!path) return
      const sliceStart = letterIdx / total
      const sliceEnd = (letterIdx + 1) / total
      const localT = Math.min(Math.max((v - sliceStart) / (sliceEnd - sliceStart), 0), 1)
      const len = path.getTotalLength()
      const pt = path.getPointAtLength(localT * len)
      const cx = String(pt.x)
      const cy = String(pt.y)
      const visible = v >= 0.995 ? "0" : "1"
      dotRef.current.setAttribute("cx", cx)
      dotRef.current.setAttribute("cy", cy)
      dotRef.current.setAttribute("opacity", visible)
      if (glowRef.current) {
        glowRef.current.setAttribute("cx", cx)
        glowRef.current.setAttribute("cy", cy)
        glowRef.current.setAttribute("opacity", visible)
      }
    })
    return unsubscribe
  }, [progress, total])

  return (
    <>
      <defs>
        <filter id="needle-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        ref={glowRef}
        r="10"
        fill="rgba(74, 14, 78, 0.2)"
        filter="url(#needle-glow)"
        opacity="0"
      />
      <circle ref={dotRef} r="5" fill="#4A0E4E" opacity="0">
        <animate
          attributeName="r"
          values="4;6;4"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>
    </>
  )
}

export function StitchedName() {
  const [letters] = useState(() => buildLetters())
  const progress = useMotionValue(0)
  const hasAnimated = useRef(false)

  const drawableLetters = letters.filter((l) => l.d !== "")
  const totalWidth =
    letters.reduce((acc, l) => acc + l.width + (l.char !== " " ? GAP : 0), 0) - GAP

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    animate(progress, 1, { duration: 4, ease: "easeInOut" })
  }, [progress])

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
              index={idx}
              total={drawableLetters.length}
              progress={progress}
            />
          )
        })}
        <NeedleDot letters={letters} progress={progress} />
      </svg>
    </div>
  )
}
