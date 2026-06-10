"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  bodyText?: string;
  bgImage: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  videoUrl?: string;
}

export default function HeroSection({
  heading,
  subheading,
  bodyText,
  bgImage,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  videoUrl,
}: HeroSectionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHome = pathname === "/";
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (videoUrl) {
      const timer = setTimeout(() => setShowVideo(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [videoUrl]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // premium custom ease-out
      },
    }),
  };

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={heading}
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Video Background */}
        {videoUrl && (
  <video
    key={videoUrl}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    style={{ 
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
    className={`transition-opacity duration-1000 ease-in-out ${
      showVideo ? "opacity-100" : "opacity-0"
    }`}
  >
    <source src={videoUrl} type="video/mp4" />
  </video>
)}
        {/* Dark Overlay */}
        <div
          className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${
            showVideo ? "bg-black/0" : "bg-black/30"
          }`}
        />
      </div>

      {/* Hero Content (Centered vertically & horizontally) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center h-full">

        {isHome ? (
          <>
            {/* 1. WORDS DISPLAY: Stacked at once, visible simultaneously, white, text-6xl md:text-8xl, tracking-widest */}
            <div className={`flex flex-col space-y-2 select-none transition-opacity duration-1000 ${showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <motion.span
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase block"
              >
                QUALITY
              </motion.span>
              <motion.span
                custom={0.2}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase block"
              >
                INTEGRITY
              </motion.span>
              <motion.span
                custom={0.4}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase block"
              >
                EXCELLENCE
              </motion.span>
            </div>

            {/* 3. MAIN HEADING: below the 3 words, text-xl md:text-2xl, font-light, white, tracking-wide, mt-8 */}
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="text-white font-light text-xl md:text-2xl tracking-wide mt-8 max-w-3xl"
            >
              Premium Halal Lamb & Mutton Since 1980
            </motion.h1>

            {/* 5. CTA BUTTON: Discover More, thin border, white, no fill, hover fill white/text dark */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="mt-10"
            >
              <Link
                href="/about"
                className="inline-flex px-8 py-3 bg-transparent hover:bg-white text-white hover:text-black font-semibold tracking-widest text-xs uppercase border border-white transition-all duration-300 min-h-[44px] items-center justify-center"
              >
                DISCOVER MORE
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            {/* Subpage Header Layout */}
            <motion.h1
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-white font-light text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase max-w-4xl"
            >
              {heading}
            </motion.h1>

            {subheading && (
              <motion.p
                custom={0.3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="text-[#C8A400] text-xs sm:text-sm font-bold uppercase tracking-widest mt-4"
              >
                {subheading}
              </motion.p>
            )}

            {primaryBtnText && primaryBtnLink && (
              <motion.div
                custom={0.6}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="mt-10"
              >
                <Link
                  href={primaryBtnLink}
                  className="inline-flex px-8 py-3 bg-transparent hover:bg-white text-white hover:text-black font-semibold tracking-widest text-xs uppercase border border-white transition-all duration-300 min-h-[44px] items-center justify-center"
                >
                  {primaryBtnText}
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
