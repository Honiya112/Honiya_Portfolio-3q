"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCard {
  title: string
  category: string
  image: string
  description: string
}

const allProjects: ProjectCard[] = [
  {
    title: "ReadAble",
    category: "Web App",
    image: "/images/readable-screen.jpg",
    description: "A reading companion for accessible literacy, powered by AI to help users improve comprehension.",
  },
  {
    title: "BotanIQ",
    category: "Mobile App",
    image: "/images/botaniq-screen.jpg",
    description: "AI-powered plant identification app that recognizes species and provides detailed care instructions.",
  },
  {
    title: "SafeSteps AI",
    category: "Mobile App",
    image: "/images/safesteps-screen.jpg",
    description: "Intelligent safety route planning with real-time risk assessment and community alerts.",
  },
  {
    title: "Purple Crochet Co.",
    category: "Brand & Craft",
    image: "/images/crochet-bag.jpg",
    description: "Hand-crafted crochet designs blending traditional techniques with modern aesthetics.",
  },
  {
    title: "Golden Hour",
    category: "Photography",
    image: "/images/photo-of-day.jpg",
    description: "A curated photography series capturing fleeting moments in warm, natural light.",
  },
  {
    title: "Portfolio v3",
    category: "Web Design",
    image: "/images/readable-screen.jpg",
    description: "This very portfolio, crafted with stitching animations and hand-crafted design details.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {allProjects.map((project, i) => (
        <motion.div
          key={project.title}
          className="group relative bg-[#EDE4ED]/60 rounded-lg overflow-hidden cursor-pointer"
          style={{
            boxShadow: "0 2px 16px rgba(74, 14, 78, 0.06)",
          }}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={cardVariants}
          whileHover={{
            y: -6,
            boxShadow: "0 8px 30px rgba(74, 14, 78, 0.12)",
            transition: { duration: 0.3 },
          }}
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Category tag */}
            <div className="absolute top-3 left-3">
              <span className="inline-block px-2.5 py-1 text-[10px] font-sans uppercase tracking-widest bg-[#D8BFD8]/80 text-[#4A0E4E] rounded-sm backdrop-blur-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 md:p-5">
            <h3 className="font-serif text-base md:text-lg text-[#4A0E4E] tracking-wide mb-1.5">
              {project.title}
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#4A0E4E]/55 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Stitch accent at bottom */}
          <svg className="w-full h-2 mt-auto" preserveAspectRatio="none">
            <line
              x1="12"
              y1="1"
              x2="95%"
              y2="1"
              stroke="#4A0E4E"
              strokeWidth="1"
              strokeDasharray="5 4"
              strokeOpacity="0.15"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
