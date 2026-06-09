"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface ContentBlockProps {
  heading: string;
  body: string;
  image: string;
  reverse?: boolean; // If true, image is on the left, text is on the right
  btnText?: string;
  btnLink?: string;
  label?: string; // Small uppercase gold label above heading
  decorativeNumber?: string; // Large decorative number e.g. "01" (for Assurance page)
  bgColor?: string; // Optional custom bg class
}

export default function ContentBlock({
  heading,
  body,
  image,
  reverse = false,
  btnText,
  btnLink,
  label,
  decorativeNumber,
  bgColor = "bg-white",
}: ContentBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  const elementVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={`py-20 lg:py-32 overflow-hidden ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={elementVariants}
            className={`flex flex-col space-y-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative">
              {/* Decorative Number Behind Heading */}
              {decorativeNumber && (
                <span className="absolute -left-4 -top-10 text-7xl sm:text-8xl font-black text-[#C8A400]/15 select-none pointer-events-none z-0">
                  {decorativeNumber}
                </span>
              )}

              {/* Small Uppercase Gold Label */}
              {label && (
                <span className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-2 z-10 relative">
                  {label}
                </span>
              )}

              {/* Large Editorial Heading */}
              <h2 className="text-brand-dark font-light text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-wide z-10 relative">
                {heading}
              </h2>
            </div>

            {/* Body Text */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl whitespace-pre-line">
              {body}
            </p>

            {/* Button */}
            {btnText && btnLink && (
              <div className="pt-4">
                <Link
                  href={btnLink}
                  className="inline-flex px-8 py-3 bg-transparent hover:bg-black text-black hover:text-white border border-black font-semibold tracking-widest text-xs uppercase transition-all duration-350 min-h-[44px] items-center justify-center"
                >
                  {btnText}
                </Link>
              </div>
            )}
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative h-64 sm:h-96 w-full overflow-hidden ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <Image
              src={image}
              alt={heading}
              fill
              sizes="(max-w-1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
