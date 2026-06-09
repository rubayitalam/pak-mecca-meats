"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  bodyText?: string;
  bgImage: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
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
}: HeroSectionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHome = pathname === "/";

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
          className="object-cover opacity-50"
        />
        {/* bg-black/60 Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content (Centered vertically & horizontally) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center h-full">
        {isHome ? (
          <>
            {/* 1. WORDS DISPLAY: Stacked at once, visible simultaneously, white, text-6xl md:text-8xl, tracking-widest */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-2 select-none"
            >
              <span className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase">
                QUALITY
              </span>
              <span className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase">
                INTEGRITY
              </span>
              <span className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase">
                EXCELLENCE
              </span>
            </motion.div>

            {/* 3. MAIN HEADING: below the 3 words, text-xl md:text-2xl, font-light, white, tracking-wide, mt-8 */}
            <motion.h1
              custom={0.3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-white font-light text-xl md:text-2xl tracking-wide mt-8 max-w-3xl"
            >
              Premium Halal Lamb & Mutton Since 1980
            </motion.h1>

            {/* 5. CTA BUTTON: Discover More, thin border, white, no fill, hover fill white/text dark */}
            <motion.div
              custom={0.6}
              variants={fadeUpVariants}
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
