"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import { motion, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { WhoWeAreContent } from "@/types/content";
import { defaultWhoWeAre } from "@/lib/defaults";
import { Heart, Users, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const valueIcons = [Heart, Users, Award, ShieldCheck, CheckCircle2];

export default function WhoWeArePage() {
  const [content, setContent] = useState<WhoWeAreContent>(defaultWhoWeAre);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("who-we-are");
      if (dbData) {
        setContent({
          heroHeading: dbData.heroHeading || defaultWhoWeAre.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultWhoWeAre.heroSubheading,
          heroBg: dbData.heroBg || defaultWhoWeAre.heroBg,
          mainHeading: dbData.mainHeading || defaultWhoWeAre.mainHeading,
          mainBody: dbData.mainBody || defaultWhoWeAre.mainBody,
          mainImage: dbData.mainImage || "",
          trustedHeading: dbData.trustedHeading || defaultWhoWeAre.trustedHeading,
          trustedBody: dbData.trustedBody || defaultWhoWeAre.trustedBody,
          trustedImage: dbData.trustedImage || "",
          valueCards: dbData.valueCards || defaultWhoWeAre.valueCards,
          valueBullets: dbData.valueBullets || defaultWhoWeAre.valueBullets,
        });
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={content.heroBg}
      />

      {/* 2. Main Content Block */}
      {content.mainImage ? (
        <ContentBlock
          heading={content.mainHeading}
          body={content.mainBody}
          image={content.mainImage}
          label="OUR HERITAGE"
          bgColor="bg-[#FAFAFA]"
        />
      ) : (
        <section className="py-16 sm:py-20 lg:py-28 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-3">
              OUR HERITAGE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-brand-dark tracking-wide mb-6">
              {content.mainHeading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-light whitespace-pre-line">
              {content.mainBody}
            </p>
          </div>
        </section>
      )}

      {/* 3. Trusted Worldwide Content Block */}
      {content.trustedImage ? (
        <ContentBlock
          heading={content.trustedHeading}
          body={content.trustedBody}
          image={content.trustedImage}
          reverse={true}
          label="GLOBAL REACH"
          bgColor="bg-white"
        />
      ) : (
        <section className="py-16 sm:py-20 lg:py-28 bg-white border-t border-[#C8A400]/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-3">
              GLOBAL REACH
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-brand-dark tracking-wide mb-6">
              {content.trustedHeading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-light max-w-3xl mx-auto whitespace-pre-line">
              {content.trustedBody}
            </p>
          </div>
        </section>
      )}

      {/* 4. Values Cards Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              CORE PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-wide text-white">
              What Defines Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {content.valueCards.map((card, idx) => {
              const IconComp = valueIcons[idx % valueIcons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                  }}
                  className="bg-[#242424] p-6 sm:p-8 rounded-lg border border-[#C8A400]/20 hover:border-[#C8A400] transition-all duration-300 flex flex-col space-y-4 group max-w-full"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1B5E20]/40 flex items-center justify-center text-[#C8A400] group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-light text-white tracking-wide leading-snug">
                    {card.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>

          {/* 5. Bullet points section below cards */}
          <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h3 className="text-[#C8A400] text-xs font-bold uppercase tracking-widest text-center mb-6 sm:mb-8">
              OUR COMMITMENTS IN PRACTICE
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
                className="flex items-start space-x-3 sm:space-x-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-[#C8A400]/30 transition-colors max-w-full"
              >
                <div className="w-6 h-6 rounded-full bg-[#C8A400]/20 text-[#C8A400] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed font-light">
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
