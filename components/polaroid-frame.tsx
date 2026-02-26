"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PolaroidFrameProps {
  imageSrc: string
  caption: string
  rotation?: number
  size?: "tiny" | "small" | "medium"
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
    tiny: "w-[100px] md:w-[120px]",
    small: "w-[120px] md:w-[140px]",
    medium: "w-[170px] md:w-[210px]",
  }

  const imageSizes = {
    tiny: "h-[80px] md:h-[96px]",
    small: "h-[100px] md:h-[115px]",
    medium: "h-[150px] md:h-[185px]",
  }

  const captionSize = size === "tiny" ? "text-[9px] md:text-[10px]" : "text-xs md:text-sm"

  return (
    <motion.div
      className={`${sizeClasses[size]} bg-[#fefefe] p-2 pb-8 shadow-lg relative`}
      style={{
        rotate: rotation,
        boxShadow: "2px 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
      }}
      initial={{ opacity: 0, y: 20, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.08,
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

      {/* Caption */}
      <p className={`absolute bottom-2 left-0 right-0 text-center ${captionSize} text-[#4A0E4E] tracking-wide font-serif italic font-semibold`}>
        {caption}
      </p>

      {/* Tape effect */}
      <div
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#f0e8d8]/60 backdrop-blur-sm"
        style={{
          transform: `translateX(-50%) rotate(${rotation > 0 ? -2 : 2}deg)`,
          borderRadius: "1px",
        }}
      />
    </motion.div>
  )
}
