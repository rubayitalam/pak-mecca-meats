"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  image2?: string;
  link: string;
  btnText?: string;
}

export default function ProductCard({
  title,
  description,
  image,
  image2,
  link,
  btnText = "Discover More",
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link href={link} className="block group">
      <div className="bg-white border-t-2 border-[#C8A400] overflow-hidden flex flex-col h-full transition-all duration-300">
        {/* Product Image */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-50">
          <div className="w-full h-full relative transform transition-transform duration-500 ease-out group-hover:scale-110">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              className="object-cover"
            />
            {image2 && (
              <Image
                src={image2}
                alt={`${title} hover`}
                fill
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center p-4">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-lg font-bold uppercase tracking-widest text-center">
                {title}
              </span>
            </div>
          </div>
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
