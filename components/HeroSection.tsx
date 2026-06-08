"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  return (
    <section className="relative w-full h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={heading}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col items-center text-center">
        
        {/* Animated Subheading / Tagline */}
        {subheading && (
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-brand-gold font-bold uppercase tracking-wider text-xs sm:text-sm md:text-base mb-3"
          >
            {subheading}
          </motion.span>
        )}

        {/* Animated Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight max-w-4xl tracking-tight"
        >
          {heading}
        </motion.h1>

        {/* Animated Body Paragraph */}
        {bodyText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mt-4 mb-8 font-normal leading-relaxed"
          >
            {bodyText}
          </motion.p>
        )}

        {/* Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 items-center justify-center"
        >
          {primaryBtnText && primaryBtnLink && (
            <Link
              href={primaryBtnLink}
              className="w-full sm:w-auto px-8 py-3 bg-brand-green text-white font-bold rounded shadow-lg hover:bg-brand-green/90 active:scale-[0.98] transition-all text-center min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider border border-brand-green"
            >
              {primaryBtnText}
            </Link>
          )}
          {secondaryBtnText && secondaryBtnLink && (
            <Link
              href={secondaryBtnLink}
              className="w-full sm:w-auto px-8 py-3 bg-transparent text-white font-bold rounded hover:bg-white/10 active:scale-[0.98] transition-all text-center min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider border-2 border-brand-gold"
            >
              {secondaryBtnText}
            </Link>
          )}
        </motion.div>

      </div>
    </section>
  );
}
