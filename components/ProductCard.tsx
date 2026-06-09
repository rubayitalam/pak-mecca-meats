"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  btnText?: string;
}

export default function ProductCard({
  title,
  description,
  image,
  link,
  btnText = "Discover More",
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link href={link} className="block group">
      <div className="bg-white border-t-2 border-[#C8A400] overflow-hidden flex flex-col h-full transition-all duration-300">
        {/* Product Image */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-50">
          <motion.div
            className="w-full h-full relative"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Product Content */}
        <div className="py-6 flex flex-col flex-grow justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-brand-dark mb-2 uppercase tracking-widest group-hover:text-[#C8A400] transition-colors duration-200">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              {description}
            </p>
          </div>

          <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest inline-flex items-center space-x-1 group-hover:underline">
            <span>{btnText}</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
