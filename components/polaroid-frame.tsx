"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PolaroidFrameProps {
  imageSrc: string
  caption: string
  rotation?: number
  size?: "small" | "medium"
  delay?: number
  alt: string
}

export function PolaroidFrame({
  imageSrc,
  caption,
  rotation = 0,
  size = "medium",
  delay = 0,
  alt,
}: PolaroidFrameProps) {
  const sizeClasses = {
    small: "w-[140px] md:w-[170px]",
    medium: "w-[170px] md:w-[210px]",
  }

  const imageSizes = {
    small: "h-[120px] md:h-[145px]",
    medium: "h-[150px] md:h-[185px]",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} bg-[#fefefe] p-2.5 pb-11 shadow-lg relative`}
      style={{
        rotate: rotation,
        boxShadow: "2px 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
      }}
      initial={{ opacity: 0, y: 30, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        boxShadow: "4px 8px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Photo area */}
      <div className={`${imageSizes[size]} w-full relative overflow-hidden bg-[#e8e0e8]`}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Caption - larger and bolder */}
      <p className="absolute bottom-2.5 left-0 right-0 text-center text-xs md:text-sm text-[#4A0E4E] tracking-wide font-serif italic font-semibold">
        {caption}
      </p>

      {/* Tape effect */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#f0e8d8]/60 backdrop-blur-sm"
        style={{
          transform: `translateX(-50%) rotate(${rotation > 0 ? -2 : 2}deg)`,
          borderRadius: "1px",
        }}
      />
    </motion.div>
  )
}
