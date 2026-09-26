"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { motion, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { AtAGlanceContent } from "@/types/content";
import { defaultAtAGlance } from "@/lib/defaults";

export default function AtAGlancePage() {
  const [content, setContent] = useState<AtAGlanceContent>(defaultAtAGlance);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("at-a-glance");
      if (dbData) {
        setContent({
          heroHeading: dbData.heroHeading || defaultAtAGlance.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultAtAGlance.heroSubheading,
          heroBg: dbData.heroBg || defaultAtAGlance.heroBg,
          stats: dbData.stats || defaultAtAGlance.stats,
        });
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A]">
      {/* Hero Section */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={content.heroBg}
      />

      {/* Bento Grid Stats Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-[#1A1A1A] relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C8A400]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#1B5E20]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-24">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              KEY METRICS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-wide">
              Our Scale &amp; Impact
            </h2>
            <div className="w-16 h-1 bg-[#C8A400] mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>

          {/* Bento Box Grid: 2 cols mobile, 3-4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {content.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: "easeOut",
                }}
                className="bg-[#222222] p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 hover:border-[#C8A400] transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#C8A400]/5 group relative overflow-hidden max-w-full"
              >
                {/* Accent top line on card */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A400]/40 to-transparent group-hover:via-[#C8A400] transition-all duration-500" />

                <div className="space-y-1 sm:space-y-2">
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#C8A400] tracking-tight block group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </span>
                  <p className="text-gray-300 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-wide uppercase leading-snug">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
