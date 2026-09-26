"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { getPageContent } from "@/lib/firestore";
import { CommunityContent } from "@/types/content";
import { defaultCommunity } from "@/lib/defaults";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

export default function CommunityResponsibilityPage() {
  const [content, setContent] = useState<CommunityContent>(defaultCommunity);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("community");
      if (dbData) {
        setContent({
          heroHeading: dbData.heroHeading || defaultCommunity.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultCommunity.heroSubheading,
          heroBg: dbData.heroBg || defaultCommunity.heroBg,
          introText: dbData.introText || defaultCommunity.introText,
          charitySections: dbData.charitySections || defaultCommunity.charitySections,
          reviews: dbData.reviews || defaultCommunity.reviews,
          galleryImages: dbData.galleryImages || defaultCommunity.galleryImages,
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

      {/* Intro Text (Centered, Bold Editorial Statement) */}
      <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-[#C8A400]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-3">
            OUR PROMISE
          </span>
          <p className="text-xl sm:text-2xl font-semibold text-brand-dark leading-relaxed max-w-3xl mx-auto">
            {content.introText}
          </p>
        </div>
      </section>

      {/* Editorial Charity Sections */}
      <div className="divide-y divide-gray-100">
        {content.charitySections.map((sec, idx) => {
          const isReverse = idx % 2 !== 0; // Image left / text right on odd items

          return (
            <section
              key={idx}
              className={`py-16 sm:py-24 overflow-hidden ${
                idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Text Column */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isReverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block">
                      COMMUNITY INITIATIVE 0{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-light text-brand-dark tracking-wide">
                      {sec.heading}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                      {sec.body}
                    </p>

                    {/* Highlighted Stat Box */}
                    {sec.stat && (
                      <div className="p-6 rounded-xl bg-[#1A1A1A] text-white border-l-4 border-[#C8A400] flex flex-col sm:flex-row items-start sm:items-center gap-4 my-6 shadow-md">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#C8A400] tracking-tight shrink-0">
                          {sec.stat}
                        </span>
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-300">
                          {sec.statLabel}
                        </span>
                      </div>
                    )}

                    {/* Pull Quote in Gold Italic */}
                    {sec.quote && (
                      <div className="pt-4 border-t border-gray-200">
                        <blockquote className="text-base sm:text-lg italic text-[#C8A400] font-light leading-relaxed">
                          &ldquo;{sec.quote}&rdquo;
                        </blockquote>
                        {sec.quoteAuthor && (
                          <span className="block text-xs font-bold uppercase tracking-widest text-brand-dark mt-2">
                            — {sec.quoteAuthor}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isReverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {sec.image ? (
                      <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <Image
                          src={sec.image}
                          alt={sec.heading}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover w-full h-full max-w-full"
                        />
                      </div>
                    ) : (
                      <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#1B5E20] border border-[#C8A400]/30 flex flex-col justify-center items-center p-8 text-center text-white shadow-xl">
                        <span className="text-4xl font-extrabold text-[#C8A400] mb-2">
                          {sec.stat || "PMM"}
                        </span>
                        <p className="text-sm uppercase tracking-widest text-gray-300 font-light">
                          {sec.heading}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Community Photo Gallery Grid */}
      {content.galleryImages && content.galleryImages.filter(Boolean).length > 0 && (
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
                COMMUNITY IN ACTION
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-brand-dark tracking-wide">
                Moments &amp; Partnerships
              </h2>
              <div className="h-[1px] w-20 bg-[#C8A400] mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.galleryImages.filter(Boolean).map((imgUrl, i) => (
                <div key={i} className="relative h-64 rounded-xl overflow-hidden shadow-md group border border-gray-100">
                  <Image
                    src={imgUrl}
                    alt={`Community action ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs uppercase tracking-widest font-semibold">
                      Community Partner #{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews / Gratitude Messages Section (Dark #1A1A1A, Gold Accents) */}
      <section className="py-20 sm:py-32 bg-[#1A1A1A] text-white border-t border-[#C8A400]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-12 sm:mb-16 text-center md:text-left">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              MESSAGES OF GRATITUDE
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-wide">
              Words From Those We&apos;ve Supported
            </h2>
            <div className="h-[1px] w-20 bg-[#C8A400] mt-4 hidden md:block" />
          </div>

          {content.reviews && content.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {content.reviews.map((rev, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : (index % 3) * 0.15,
                  }}
                  className="bg-[#242424] border border-[#C8A400]/30 overflow-hidden flex flex-col justify-between h-full group hover:border-[#C8A400] transition-all duration-300 shadow-xl p-6 sm:p-8 text-white relative rounded-xl max-w-full"
                >
                  <div className="space-y-4">
                    <Quote className="w-8 h-8 text-[#C8A400]/40 group-hover:text-[#C8A400] transition-colors duration-300" />
                    <p className="text-gray-300 text-sm font-light leading-relaxed italic">
                      &ldquo;{rev.message}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 mt-8 pt-4 border-t border-white/10">
                    {rev.image ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#C8A400]/40">
                        <Image
                          src={rev.image}
                          alt={rev.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#C8A400]/20 text-[#C8A400] flex items-center justify-center font-bold text-sm shrink-0 border border-[#C8A400]/40">
                        {rev.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block leading-tight">
                        {rev.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg bg-gray-900 text-gray-400 text-sm">
              No messages of gratitude yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
