"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { getPageContent } from "@/lib/firestore";
import { CultureContent } from "@/types/content";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";

const defaults: CultureContent = {
  heroHeading: "Our Culture",
  heroSubheading: "People, Community & Purpose",
  heroBg: "",

  workCultureHeading: "Our Work Culture",
  workCultureBody:
    "At Pak Mecca Meats, we work together as one team and take pride in creating an environment where people can learn, develop and grow. Our workforce brings together people from different backgrounds, cultures and experiences, and we believe this diversity strengthens our team. We are committed to creating an inclusive workplace where everyone is treated with respect and given the support they need to succeed. We recognise that people learn and communicate in different ways. That is why we work to provide clear guidance, appropriate training and accessible learning materials, helping every member of our team understand their role and perform their job confidently and effectively. We take pride in encouraging our people to develop new skills, build on their strengths and gain valuable experience. Through teamwork, shared knowledge and continuous learning, we aim to create opportunities for our people to progress as our business grows. Our culture is built on teamwork, inclusion, respect, development and pride in what we do.",
  workCultureImages: [],

  communityHeading: "Looking After Our Community",
  communityBody:
    "At Pak Mecca Meats, giving back to our community is an important part of who we are. As a family business with strong roots in Birmingham, we believe our responsibility goes beyond the work we do every day. We are proud to support local charities and community organisations that provide food, care, support and positive experiences for people who need them most. We work closely with Let's Feed Brum, supporting initiatives that reach some of the most vulnerable members of our community, including people experiencing homelessness, refugees, and women and families who have experienced domestic violence and spent time in shelters. We have also been proud to support the Refugee Run Club, an initiative that brings people together through activity, friendship and a sense of community. Our support can take many forms, from food and ingredient donations to supporting charitable events and community initiatives. For us, it is about using what we have as a business to make a meaningful difference.",
  communityImages: [],

  womenHeading: "Supporting Women in Our Community",
  womenBody:
    "One initiative particularly close to our hearts was supporting an International Women's Day celebration for 60 women who had experienced domestic violence. The event provided an opportunity for women who had been through incredibly difficult circumstances to come together, celebrate and simply enjoy a day dedicated to them. As Pak Mecca Meats continues to grow, we want our contribution to our community to grow with us. We remain committed to supporting worthwhile causes, strengthening our relationships with local organisations and helping where we can. For us, giving back is not about recognition. It is about looking after the community around us, sharing what we have and helping make a difference where it matters.",
  womenImages: [],

  reviews: [
    {
      name: "Alan & Katherine — Let's Feed Brum",
      message:
        "Wow - Adeela and Aman. Thank you so so very much for all your kindness support and generosity. The meal you provided us today to support the women and children survivors of domestic abuse and violence was perfect. Everyone enjoyed it and are grateful for all your support. Thanks again for everything. Much love.",
    },
    {
      name: "Alan & Katherine",
      message:
        "Thank you both so so much for your kindness today. Everything went very well we had 60 women victims of domestic violence celebrating World Women's Day. It was very nice to be able to provide a little bit of joy to this vulnerable group. Thank you for all your kind support. Much love.",
    },
    {
      name: "Alan — Let's Feed Brum & Refugee Run Club",
      message:
        "On behalf of Katherine myself and our charities Let's Feed Brum and the Refugee Run Club I just wanted to thank you and everyone at Pak Mecca for all your incredible support. We had a wonderful day supporting those in need and giving them a day to remember. Thank you for all your kindness.",
    },
  ],

  stats: [
    { number: "1982", label: "Established in Birmingham" },
    { number: "800,000", label: "Sheep processed annually" },
    { number: "3,500", label: "Daily processing capacity" },
    { number: "62", label: "UK livestock markets sourced from" },
    { number: "1,500+", label: "Shops supplied across the UK" },
    { number: "200+", label: "Employees" },
    { number: "10", label: "Countries supplied" },
    { number: "HMC", label: "Halal Certified" },
  ],
};

export default function CulturePage() {
  const [content, setContent] = useState<CultureContent>(defaults);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("culture");
      if (dbContent) {
        setContent({
          heroHeading: dbContent.heroHeading || defaults.heroHeading,
          heroSubheading: dbContent.heroSubheading || defaults.heroSubheading,
          heroBg: dbContent.heroBg || defaults.heroBg,
          workCultureHeading: dbContent.workCultureHeading || defaults.workCultureHeading,
          workCultureBody: dbContent.workCultureBody || defaults.workCultureBody,
          workCultureImages: dbContent.workCultureImages || defaults.workCultureImages || [],
          communityHeading: dbContent.communityHeading || defaults.communityHeading,
          communityBody: dbContent.communityBody || defaults.communityBody,
          communityImages: dbContent.communityImages || defaults.communityImages || [],
          womenHeading: dbContent.womenHeading || defaults.womenHeading,
          womenBody: dbContent.womenBody || defaults.womenBody,
          womenImages: dbContent.womenImages || defaults.womenImages || [],
          reviews: dbContent.reviews || defaults.reviews || [],
          stats: dbContent.stats || defaults.stats || [],
        });
      }
    }
    loadContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION 1: HERO */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={content.heroBg}
      />

      {/* SECTION 2: OUR WORK CULTURE */}
      <section className="py-16 sm:py-20 lg:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mb-12">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              OUR PEOPLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-brand-dark tracking-wide">
              {content.workCultureHeading}
            </h2>
            <div className="h-[1px] w-20 bg-[#C8A400] mt-4 mb-6 sm:mb-8" />
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed whitespace-pre-line">
              {content.workCultureBody}
            </p>
          </div>

          {/* Work Culture Gallery Grid */}
          {content.workCultureImages && content.workCultureImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {content.workCultureImages.map((imgItem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
                  }}
                  className="group bg-white border border-[#C8A400]/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col max-w-full"
                >
                  <div className="relative h-64 sm:h-72 w-full max-w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={imgItem.url}
                      alt={imgItem.caption || "Pak Mecca Work Culture"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      className="object-cover w-full h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {imgItem.caption && (
                    <div className="p-4 bg-white border-t border-gray-100 flex-grow flex items-center">
                      <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                        {imgItem.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: STATS BAR */}
      <section className="bg-[#1B5E20] py-8 sm:py-10 border-y border-[#C8A400]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-2 text-white divide-y-0 lg:divide-x divide-white/10">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.04,
                }}
                className="flex flex-col items-center justify-center text-center px-2 py-1"
              >
                <span className="text-xl sm:text-3xl font-light text-[#C8A400] leading-tight mb-1 whitespace-nowrap">
                  {stat.number}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-medium text-gray-200 leading-snug max-w-[130px]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMUNITY */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mb-12">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              COMMUNITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-brand-dark tracking-wide">
              {content.communityHeading}
            </h2>
            <div className="h-[1px] w-20 bg-[#C8A400] mt-4 mb-6 sm:mb-8" />
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed whitespace-pre-line">
              {content.communityBody}
            </p>
          </div>

          {/* Community Gallery Grid */}
          {content.communityImages && content.communityImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {content.communityImages.map((imgItem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
                  }}
                  className="group bg-white border border-[#C8A400]/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col max-w-full"
                >
                  <div className="relative h-64 sm:h-72 w-full max-w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={imgItem.url}
                      alt={imgItem.caption || "Community Support"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      className="object-cover w-full h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {imgItem.caption && (
                    <div className="p-4 bg-white border-t border-gray-100 flex-grow flex items-center">
                      <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                        {imgItem.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: SUPPORTING WOMEN */}
      <section className="py-16 sm:py-20 lg:py-32 bg-[#1A1A1A] text-white border-y border-[#C8A400]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mb-12">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              GIVING BACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-wide">
              {content.womenHeading}
            </h2>
            <div className="h-[1px] w-20 bg-[#C8A400] mt-4 mb-6 sm:mb-8" />
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed whitespace-pre-line">
              {content.womenBody}
            </p>
          </div>

          {/* Women Gallery Grid */}
          {content.womenImages && content.womenImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {content.womenImages.map((imgItem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
                  }}
                  className="group bg-[#151515] border border-[#C8A400]/30 overflow-hidden shadow-xl hover:border-[#C8A400] transition-all duration-300 flex flex-col max-w-full"
                >
                  <div className="relative h-64 sm:h-72 w-full max-w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={imgItem.url}
                      alt={imgItem.caption || "Supporting Women in Our Community"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      className="object-cover w-full h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {imgItem.caption && (
                    <div className="p-4 bg-[#151515] border-t border-white/5 flex-grow flex items-center">
                      <p className="text-xs text-gray-400 font-light italic leading-relaxed">
                        {imgItem.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: REVIEWS */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-12 sm:mb-16 text-center md:text-left">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              MESSAGES OF GRATITUDE
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-brand-dark tracking-wide">
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
                  className="bg-[#1A1A1A] border border-[#C8A400]/20 overflow-hidden flex flex-col justify-between h-full group hover:border-[#C8A400] transition-all duration-300 shadow-xl p-6 sm:p-8 text-white relative max-w-full"
                >
                  {rev.image && (
                    <div className="relative mb-6 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 h-48 overflow-hidden bg-neutral-900 max-w-full">
                      <Image
                        src={rev.image}
                        alt={rev.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        className="object-cover w-full h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <Quote className="w-8 h-8 text-[#C8A400]/40 group-hover:text-[#C8A400] transition-colors duration-300" />
                    <p className="text-gray-300 text-sm font-light leading-relaxed italic">
                      &ldquo;{rev.message}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10">
                    <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block">
                      {rev.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
              No messages of gratitude yet.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 sm:py-24 bg-[#1A1A1A] text-white border-t border-[#C8A400]/20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-3">
            TOGETHER WE GROW
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase mb-6 text-white">
            Working Together For A Better Tomorrow
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            We believe in the power of community, mutual respect, and giving back.
            Whether you are looking to collaborate, partner with us on charitable initiatives,
            or learn more about our team, we would love to hear from you.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-transparent border border-[#C8A400] text-[#C8A400] hover:bg-[#C8A400] hover:text-[#1A1A1A] font-semibold text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px]"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
