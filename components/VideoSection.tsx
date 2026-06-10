"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface VideoSectionProps {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  videoUrl?: string;
}

export default function VideoSection({
  heading,
  subtext,
  buttonText,
  buttonLink,
  videoUrl = "",
}: VideoSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for reveal-on-scroll
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // elegant custom ease
      },
    },
  };

  const hasVideo = videoUrl && videoUrl.trim() !== "";

  return (
    <section
      className={`relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden ${
        hasVideo ? "bg-black" : "bg-[#1B5E20]"
      }`}
    >
      {/* Background Video (if URL is set) */}
      {hasVideo && (
        <>
          <video
            key={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* Dark overlay on video */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </>
      )}

      {/* Centered Text Overlay */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={textContainerVariants}
        className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center py-16"
      >
        {/* Small gold uppercase label */}
        <motion.span
          variants={itemVariants}
          className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-4"
        >
          OUR STORY
        </motion.span>

        {/* Large heading */}
        <motion.h2
          variants={itemVariants}
          className="text-white font-light text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide mb-6 max-w-3xl font-serif"
        >
          {heading}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-gray-200 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
        >
          {subtext}
        </motion.p>

        {/* Thin border white button */}
        {buttonText && buttonLink && (
          <motion.div variants={itemVariants}>
            <Link
              href={buttonLink}
              className="inline-flex px-8 py-3 bg-transparent hover:bg-white text-white hover:text-black font-semibold tracking-widest text-xs uppercase border border-white transition-all duration-300 min-h-[44px] items-center justify-center"
            >
              {buttonText}
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
