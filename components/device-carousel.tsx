"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    <div className="relative w-[340px] md:w-[440px]">
      {/* Screen */}
      <div className="relative rounded-t-xl bg-[#1a1a1a] p-2 pb-0">
        {/* Camera */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2a2a2a]" />
        <div className="relative w-full aspect-[16/10] rounded-t-md overflow-hidden bg-[#111]">
          <Image
            src={screenshot}
            alt={`${name} project screenshot`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* Bottom bezel */}
      <div className="relative h-3 bg-[#c4c4c4] rounded-b-sm">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#9a9a9a] rounded-b-sm" />
      </div>
      {/* Base */}
      <div className="relative mx-auto w-[110%] -ml-[5%] h-2 bg-[#d4d4d4] rounded-b-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#aaa] rounded-b" />
      </div>
      {/* Label */}
      <p className="text-center mt-4 font-serif text-foreground/80 text-sm tracking-wide">{name}</p>
    </div>
  )
}

function IPhoneMockup({ screenshot, name }: { screenshot: string; name: string }) {
  return (
    <div className="relative w-[160px] md:w-[200px]">
      {/* Phone body */}
      <div className="relative rounded-[28px] bg-[#1a1a1a] p-2 border-[3px] border-[#333]">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1a1a1a] rounded-b-xl z-10" />
        {/* Screen */}
        <div className="relative w-full aspect-[9/19.5] rounded-[22px] overflow-hidden bg-[#111]">
          <Image
            src={screenshot}
            alt={`${name} project screenshot`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* Label */}
      <p className="text-center mt-4 font-serif text-foreground/80 text-sm tracking-wide">{name}</p>
    </div>
  )
}

function SamsungMockup({ screenshot, name }: { screenshot: string; name: string }) {
  return (
    <div className="relative w-[160px] md:w-[200px]">
      {/* Phone body */}
      <div className="relative rounded-[20px] bg-[#1a1a1a] p-1.5 border-[2px] border-[#444]">
        {/* Punch hole camera */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#222] rounded-full z-10" />
        {/* Screen */}
        <div className="relative w-full aspect-[9/19.5] rounded-[16px] overflow-hidden bg-[#111]">
          <Image
            src={screenshot}
            alt={`${name} project screenshot`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* Label */}
      <p className="text-center mt-4 font-serif text-foreground/80 text-sm tracking-wide">{name}</p>
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

  const getPosition = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length
    if (diff === 0) return "center"
    if (diff === 1) return "right"
    return "left"
  }

  const positionVariants = {
    center: {
      x: 0,
      z: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
    },
    left: {
      x: "-55%",
      z: -200,
      scale: 0.75,
      rotateY: 35,
      opacity: 0.6,
      zIndex: 10,
    },
    right: {
      x: "55%",
      z: -200,
      scale: 0.75,
      rotateY: -35,
      opacity: 0.6,
      zIndex: 10,
    },
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="relative w-full max-w-[800px] h-[350px] md:h-[420px]"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence mode="sync">
          {projects.map((project, index) => {
            const position = getPosition(index)
            return (
              <motion.div
                key={project.name}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  x: "-50%",
                  y: "-50%",
                }}
                animate={positionVariants[position]}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => setActiveIndex(index)}
                whileHover={position !== "center" ? { scale: 0.8, opacity: 0.8 } : {}}
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
      </div>

      {/* Description */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="text-foreground/60 font-sans text-sm tracking-wide">
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
                ? "bg-foreground/70 scale-125"
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`Go to ${project.name}`}
          />
        ))}
      </div>
    </div>
  )
}
