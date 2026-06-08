"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  btnText = "View Products",
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      
      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-brand-dark mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <Link
          href={link}
          className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold rounded text-sm min-h-[44px] flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <span>{btnText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
