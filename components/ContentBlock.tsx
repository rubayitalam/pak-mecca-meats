"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ContentBlockProps {
  heading: string;
  body: string;
  image: string;
  reverse?: boolean; // If true, image is on the left, text is on the right
  btnText?: string;
  btnLink?: string;
}

export default function ContentBlock({
  heading,
  body,
  image,
  reverse = false,
  btnText,
  btnLink,
}: ContentBlockProps) {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col space-y-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}
          >
            <h2 className="text-brand-dark font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight">
              {heading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {body}
            </p>
            {btnText && btnLink && (
              <div className="pt-2">
                <Link
                  href={btnLink}
                  className="inline-flex px-8 py-3 bg-brand-green text-white font-bold rounded shadow hover:bg-brand-green/90 active:scale-[0.98] transition-all text-sm uppercase tracking-wider min-h-[44px] items-center justify-center border border-brand-green"
                >
                  {btnText}
                </Link>
              </div>
            )}
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`relative h-64 sm:h-96 w-full rounded-lg overflow-hidden shadow-md ${
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
