"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const LETTERS = "HONIYA MAQSOOD".split("")

function getLetterPath(letter: string, x: number, y: number, size: number): string {
  const s = size
  const h = s * 0.8

  const paths: Record<string, string> = {
    H: `M${x} ${y + h} L${x} ${y} M${x} ${y + h * 0.5} L${x + s * 0.5} ${y + h * 0.5} M${x + s * 0.5} ${y} L${x + s * 0.5} ${y + h}`,
    O: `M${x + s * 0.25} ${y} L${x + s * 0.45} ${y} L${x + s * 0.5} ${y + h * 0.1} L${x + s * 0.5} ${y + h * 0.9} L${x + s * 0.45} ${y + h} L${x + s * 0.05} ${y + h} L${x} ${y + h * 0.9} L${x} ${y + h * 0.1} Z`,
    N: `M${x} ${y + h} L${x} ${y} L${x + s * 0.5} ${y + h} L${x + s * 0.5} ${y}`,
    I: `M${x + s * 0.1} ${y} L${x + s * 0.35} ${y} M${x + s * 0.225} ${y} L${x + s * 0.225} ${y + h} M${x + s * 0.1} ${y + h} L${x + s * 0.35} ${y + h}`,
    Y: `M${x} ${y} L${x + s * 0.25} ${y + h * 0.5} L${x + s * 0.5} ${y} M${x + s * 0.25} ${y + h * 0.5} L${x + s * 0.25} ${y + h}`,
    A: `M${x} ${y + h} L${x + s * 0.25} ${y} L${x + s * 0.5} ${y + h} M${x + s * 0.1} ${y + h * 0.6} L${x + s * 0.4} ${y + h * 0.6}`,
    M: `M${x} ${y + h} L${x} ${y} L${x + s * 0.3} ${y + h * 0.5} L${x + s * 0.6} ${y} L${x + s * 0.6} ${y + h}`,
    Q: `M${x + s * 0.25} ${y} L${x + s * 0.45} ${y} L${x + s * 0.5} ${y + h * 0.1} L${x + s * 0.5} ${y + h * 0.9} L${x + s * 0.45} ${y + h} L${x + s * 0.05} ${y + h} L${x} ${y + h * 0.9} L${x} ${y + h * 0.1} Z M${x + s * 0.35} ${y + h * 0.7} L${x + s * 0.55} ${y + h * 1.05}`,
    S: `M${x + s * 0.45} ${y + h * 0.1} L${x + s * 0.35} ${y} L${x + s * 0.1} ${y} L${x} ${y + h * 0.1} L${x} ${y + h * 0.35} L${x + s * 0.45} ${y + h * 0.6} L${x + s * 0.5} ${y + h * 0.8} L${x + s * 0.4} ${y + h} L${x + s * 0.1} ${y + h} L${x} ${y + h * 0.9}`,
    D: `M${x} ${y} L${x} ${y + h} L${x + s * 0.35} ${y + h} L${x + s * 0.5} ${y + h * 0.85} L${x + s * 0.5} ${y + h * 0.15} L${x + s * 0.35} ${y} Z`,
    " ": "",
  }

  return paths[letter] || ""
}

export function StitchedName() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [pathLengths, setPathLengths] = useState<number[]>([])
  const [isMounted, setIsMounted] = useState(false)

  const letterSpacing = 52
  const letterSize = 48
  const startY = 20
  const totalWidth = LETTERS.reduce((acc, letter) => {
    if (letter === " ") return acc + 30
    if (letter === "M") return acc + letterSize * 0.6 + 16
    return acc + letterSize * 0.5 + 16
  }, 0)

  const paths: string[] = []
  let currentX = 0
  LETTERS.forEach((letter) => {
    if (letter === " ") {
      paths.push("")
      currentX += 30
    } else {
      const w = letter === "M" ? letterSize * 0.6 : letterSize * 0.5
      paths.push(getLetterPath(letter, currentX, startY, letterSize))
      currentX += w + 16
    }
  })

  useEffect(() => {
    setIsMounted(true)
    if (svgRef.current) {
      const pathElements = svgRef.current.querySelectorAll("path.letter-path")
      const lengths = Array.from(pathElements).map((p) => (p as SVGPathElement).getTotalLength())
      setPathLengths(lengths)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={svgRef}
        viewBox={`-10 0 ${totalWidth + 20} ${letterSize + 40}`}
        className="w-full max-w-[700px] md:max-w-[850px] h-auto"
        aria-label="Honiya Maqsood"
        role="img"
      >
        <title>{"Honiya Maqsood"}</title>
        {paths.map((d, i) => {
          if (!d) return null
          const length = pathLengths[i] || 500
          return (
            <motion.path
              key={i}
              className="letter-path"
              d={d}
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={isMounted ? { strokeDashoffset: length, opacity: 0 } : false}
              animate={
                isMounted && pathLengths.length > 0
                  ? { strokeDashoffset: 0, opacity: 1 }
                  : undefined
              }
              transition={{
                strokeDashoffset: {
                  duration: 1.8,
                  delay: i * 0.12,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.3,
                  delay: i * 0.12,
                },
              }}
              style={{
                filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))",
              }}
            />
          )
        })}
        {/* Needle decorative dots along the stitching */}
        {paths.map((d, i) => {
          if (!d) return null
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={i * letterSpacing + 10}
              cy={startY - 5}
              r="1.5"
              fill="white"
              fillOpacity="0.6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.12 + 1.5, duration: 0.3 }}
            />
          )
        })}
      </svg>
    </div>
  )
}
