"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { motion, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { ValuesContent } from "@/types/content";
import { defaultValues } from "@/lib/defaults";
import { Heart, Users, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const valueIcons = [Heart, Users, Award, ShieldCheck, CheckCircle2];

export default function ValuesPage() {
  const [content, setContent] = useState<ValuesContent>(defaultValues);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("values");
      if (dbData) {
        setContent({
          heroHeading: dbData.heroHeading || defaultValues.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultValues.heroSubheading,
          heroBg: dbData.heroBg || defaultValues.heroBg,
          valueCards: dbData.valueCards || defaultValues.valueCards,
          valueBullets: dbData.valueBullets || defaultValues.valueBullets,
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

      {/* 5 Value Cards (Green background #1B5E20, white text, icon) */}
      <section className="py-16 sm:py-20 lg:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-24">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              WHAT WE BELIEVE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-brand-dark tracking-wide">
              Our Core Pillars
            </h2>
            <div className="w-16 h-1 bg-[#1B5E20] mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {content.valueCards.map((card, idx) => {
              const IconComp = valueIcons[idx % valueIcons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                  }}
                  className="bg-[#1B5E20] p-6 sm:p-8 rounded-xl border border-[#C8A400]/30 shadow-lg text-white flex flex-col space-y-4 hover:scale-[1.02] transition-transform duration-300 group max-w-full"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#C8A400] group-hover:bg-[#C8A400] group-hover:text-[#1B5E20] transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-light tracking-wide leading-snug">
                    {card.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Bullet Points Section Below */}
          <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-200 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h3 className="text-[#1B5E20] text-xs font-bold uppercase tracking-widest text-center mb-6 sm:mb-8">
              DETAILED VALUES DESCRIPTION
            </h3>
            {content.valueBullets.map((bullet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                }}
                className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-[#1B5E20] transition-colors max-w-full"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A400]" />
                </div>
                <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
