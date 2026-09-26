"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import { getPageContent } from "@/lib/firestore";
import { FoodSafetyContent } from "@/types/content";
import { defaultFoodSafety } from "@/lib/defaults";
import { ShieldCheck } from "lucide-react";

export default function FoodSafetyPage() {
  const [content, setContent] = useState<FoodSafetyContent>(defaultFoodSafety);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("food-safety");
      if (dbData) {
        setContent({
          heroHeading: dbData.heroHeading || defaultFoodSafety.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultFoodSafety.heroSubheading,
          heroBg: dbData.heroBg || defaultFoodSafety.heroBg,
          missionStatement: dbData.missionStatement || defaultFoodSafety.missionStatement,
          sections: dbData.sections || defaultFoodSafety.sections,
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

      {/* Intro Mission Statement Centered */}
      <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-[#C8A400]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-[#C8A400]" />
          </div>
          <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block">
            OUR MISSION
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-dark tracking-wide leading-relaxed italic max-w-3xl mx-auto">
            &ldquo;{content.missionStatement}&rdquo;
          </h2>
        </div>
      </section>

      {/* Alternating Content Blocks */}
      <div className="divide-y divide-gray-100">
        {content.sections.map((section, idx) => {
          const isReverse = idx % 2 !== 0; // Alternating image left/right
          return section.image ? (
            <ContentBlock
              key={idx}
              heading={section.heading}
              body={section.body}
              image={section.image}
              reverse={isReverse}
              label={`PILLAR 0${idx + 1}`}
              bgColor={idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
            />
          ) : (
            <section
              key={idx}
              className={`py-16 sm:py-20 lg:py-28 ${
                idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
              }`}
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
                <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-3">
                  PILLAR 0{idx + 1}
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-brand-dark tracking-wide mb-6">
                  {section.heading}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-light whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
