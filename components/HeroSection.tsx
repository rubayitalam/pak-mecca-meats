"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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

const ROTATING_WORDS = ["Quality", "Integrity", "Excellence"];

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

  // State for rotating words
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!isHome) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHome]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
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
          className="object-cover opacity-60"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
        {/* Rotating Words (Home page only) */}
        {isHome && (
          <div className="h-20 sm:h-28 md:h-36 flex items-center justify-center mb-4 overflow-hidden w-full relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_WORDS[wordIndex]}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.5,
                  ease: "easeInOut",
                }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#C8A400] tracking-tight uppercase"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        {/* Main Heading (delay 0.3s fadeUp) */}
        <motion.h1
          custom={0.3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-white font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl tracking-wide"
        >
          {isHome ? "Premium Halal Lamb & Mutton Since 1980" : heading}
        </motion.h1>

        {/* Subtext (delay 0.6s fadeUp) */}
        {(isHome || bodyText || subheading) && (
          <motion.p
            custom={0.6}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mt-6 font-light leading-relaxed tracking-wide"
          >
            {isHome
              ? "Pak Mecca Meats Ltd — Birmingham's most trusted halal meat supplier, processing 15,000–20,000 carcasses weekly for the UK, Europe & beyond."
              : bodyText || subheading}
          </motion.p>
        )}

        {/* CTA Button (delay 0.9s) */}
        {isHome && (
          <motion.div
            custom={0.9}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-10"
          >
            <Link
              href="/about"
              className="inline-flex px-8 py-3 bg-transparent hover:bg-white text-white hover:text-black font-semibold tracking-widest text-xs uppercase border border-white transition-all duration-350 min-h-[44px] items-center justify-center"
            >
              Discover More
            </Link>
          </motion.div>
        )}

        {/* Subpages back/next navigation placeholder or default buttons if passed */}
        {!isHome && (primaryBtnText || secondaryBtnText) && (
          <motion.div
            custom={0.9}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center"
          >
            {primaryBtnText && primaryBtnLink && (
              <Link
                href={primaryBtnLink}
                className="inline-flex px-8 py-3 bg-transparent hover:bg-white text-white hover:text-black font-semibold tracking-widest text-xs uppercase border border-white transition-all duration-350 min-h-[44px] items-center justify-center"
              >
                {primaryBtnText}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
