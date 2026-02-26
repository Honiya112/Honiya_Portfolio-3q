"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import Image from "next/image"

interface Project {
  name: string
  device: "macbook" | "iphone" | "samsung"
  screenshot: string
  description: string
}

const projects: Project[] = [
  {
    name: "ReadAble",
    device: "macbook",
    screenshot: "/images/readable-screen.jpg",
    description: "A reading companion for accessible literacy",
  },
  {
    name: "BotanIQ",
    device: "iphone",
    screenshot: "/images/botaniq-screen.jpg",
    description: "AI-powered plant identification",
  },
  {
    name: "SafeSteps AI",
    device: "samsung",
    screenshot: "/images/safesteps-screen.jpg",
    description: "Intelligent safety route planning",
  },
]

function MacBookMockup({ screenshot, name }: { screenshot: string; name: string }) {
  return (
    <div className="relative w-[320px] md:w-[420px]">
      <div className="relative rounded-t-xl bg-[#1a1a1a] p-2 pb-0">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2a2a2a]" />
        <div className="relative w-full aspect-[16/10] rounded-t-md overflow-hidden bg-[#111]">
          <Image src={screenshot} alt={`${name} project screenshot`} fill className="object-cover" />
        </div>
      </div>
      <div className="relative h-3 bg-[#c4c4c4] rounded-b-sm">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#9a9a9a] rounded-b-sm" />
      </div>
      <div className="relative mx-auto w-[110%] -ml-[5%] h-2 bg-[#d4d4d4] rounded-b-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#aaa] rounded-b" />
      </div>
      <p className="text-center mt-4 font-serif text-[#4A0E4E]/80 text-sm tracking-wide">{name}</p>
    </div>
  )
}

function IPhoneMockup({ screenshot, name }: { screenshot: string; name: string }) {
  return (
    <div className="relative w-[150px] md:w-[190px]">
      <div className="relative rounded-[28px] bg-[#1a1a1a] p-2 border-[3px] border-[#333]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1a1a1a] rounded-b-xl z-10" />
        <div className="relative w-full aspect-[9/19.5] rounded-[22px] overflow-hidden bg-[#111]">
          <Image src={screenshot} alt={`${name} project screenshot`} fill className="object-cover" />
        </div>
      </div>
      <p className="text-center mt-4 font-serif text-[#4A0E4E]/80 text-sm tracking-wide">{name}</p>
    </div>
  )
}

function SamsungMockup({ screenshot, name }: { screenshot: string; name: string }) {
  return (
    <div className="relative w-[150px] md:w-[190px]">
      <div className="relative rounded-[20px] bg-[#1a1a1a] p-1.5 border-[2px] border-[#444]">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#222] rounded-full z-10" />
        <div className="relative w-full aspect-[9/19.5] rounded-[16px] overflow-hidden bg-[#111]">
          <Image src={screenshot} alt={`${name} project screenshot`} fill className="object-cover" />
        </div>
      </div>
      <p className="text-center mt-4 font-serif text-[#4A0E4E]/80 text-sm tracking-wide">{name}</p>
    </div>
  )
}

function DeviceMockup({ project }: { project: Project }) {
  switch (project.device) {
    case "macbook":
      return <MacBookMockup screenshot={project.screenshot} name={project.name} />
    case "iphone":
      return <IPhoneMockup screenshot={project.screenshot} name={project.name} />
    case "samsung":
      return <SamsungMockup screenshot={project.screenshot} name={project.name} />
  }
}

export function DeviceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      // swiped left → next
      setActiveIndex((prev) => (prev + 1) % projects.length)
    } else if (info.offset.x > threshold) {
      // swiped right → previous
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }
  }

  const getPosition = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length
    if (diff === 0) return "center"
    if (diff === 1) return "right"
    return "left"
  }

  const positionVariants = {
    center: {
      x: "-50%",
      z: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
    },
    left: {
      x: "-115%",
      z: -250,
      scale: 0.72,
      rotateY: 40,
      opacity: 0.55,
      zIndex: 10,
    },
    right: {
      x: "15%",
      z: -250,
      scale: 0.72,
      rotateY: -40,
      opacity: 0.55,
      zIndex: 10,
    },
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Drag wrapper - centered */}
      <motion.div
        ref={constraintsRef}
        className="relative w-full max-w-[900px] h-[380px] md:h-[440px] mx-auto cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="sync">
          {projects.map((project, index) => {
            const position = getPosition(index)
            return (
              <motion.div
                key={project.name}
                className="absolute left-1/2 top-1/2 pointer-events-auto"
                style={{
                  transformStyle: "preserve-3d",
                  y: "-50%",
                }}
                animate={positionVariants[position]}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => setActiveIndex(index)}
                whileHover={position !== "center" ? { scale: 0.78, opacity: 0.75 } : {}}
                role="button"
                aria-label={`View ${project.name} project`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveIndex(index)
                  }
                }}
              >
                <DeviceMockup project={project} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Description */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="text-[#4A0E4E]/60 font-sans text-sm tracking-wide">
          {projects[activeIndex].description}
        </p>
      </motion.div>

      {/* Navigation dots */}
      <div className="flex gap-3">
        {projects.map((project, index) => (
          <button
            key={project.name}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-[#4A0E4E]/70 scale-125"
                : "bg-[#4A0E4E]/20 hover:bg-[#4A0E4E]/40"
            }`}
            aria-label={`Go to ${project.name}`}
          />
        ))}
      </div>
    </div>
  )
}
