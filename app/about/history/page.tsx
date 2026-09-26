"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { HistoryContent } from "@/types/content";
import { defaultHistory } from "@/lib/defaults";

export default function HistoryPage() {
  const [content, setContent] = useState<HistoryContent>(defaultHistory);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("history");
      if (dbData) {
        setContent({
          heroHeading: dbData.heroHeading || defaultHistory.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultHistory.heroSubheading,
          heroBg: dbData.heroBg || defaultHistory.heroBg,
          timeline: dbData.timeline || defaultHistory.timeline,
        });
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={content.heroBg}
      />

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-12 sm:mb-16 lg:mb-24">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              OUR JOURNEY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-brand-dark tracking-wide">
              Timeline of Milestones
            </h2>
          </div>

          <div className="relative">
            {/* Center Timeline Line (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C8A400] via-[#C8A400]/40 to-[#C8A400] top-0 bottom-0" />
            
            {/* Mobile Left Timeline Line (< lg) */}
            <div className="lg:hidden absolute left-3 w-[2px] bg-[#C8A400]/40 top-0 bottom-0" />

            <div className="space-y-8 sm:space-y-12 lg:space-y-24 pl-8 lg:pl-0">
              {content.timeline.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: shouldReduceMotion ? 0 : isLeft ? -30 : 30,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`relative flex flex-col lg:flex-row lg:items-center ${
                      isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content Box */}
                    <div className="lg:w-[45%] flex flex-col space-y-3 sm:space-y-4 lg:px-8 bg-[#FAFAFA] p-5 sm:p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow max-w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-[#C8A400] text-xl sm:text-2xl font-extrabold tracking-wider">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-light text-brand-dark uppercase tracking-wider">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                        {milestone.body}
                      </p>
                      {milestone.image && (
                        <div className="relative h-44 sm:h-52 w-full max-w-full rounded-lg overflow-hidden mt-3">
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover w-full h-full max-w-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Mobile Gold Bullet (-left-8 on mobile) */}
                    <div className="lg:hidden absolute -left-8 top-6 w-3 h-3 rounded-full bg-[#C8A400] border-2 border-white shadow-sm" />

                    {/* Desktop Center Gold Dot */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#C8A400] border-4 border-white shadow-md z-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
