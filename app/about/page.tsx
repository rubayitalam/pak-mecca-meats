"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import { motion, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { AboutContent } from "@/types/content";

const defaults: AboutContent = {
  heroHeading: "Welcome to Pak Mecca Meats Ltd",
  heroSubheading: "A Tradition of Quality Since 1980",
  heroBg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1600",
  whoWeAreBody:
    "Pak Mecca Meats Ltd is a Birmingham-based supplier of premium British halal lamb and mutton carcasses, founded in 1980. As a family-owned business built on customer-centric values, we have grown into a powerhouse of the UK halal meat industry. Our specialist facilities in Birmingham enable us to process 15,000–20,000 carcasses per week. With over 150 dedicated colleagues working in our plant, we serve communities in the UK, mainland Europe, the Middle East and beyond.",
  whoWeAreImg: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800",
  historyImg: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800",
  timeline: [
    {
      year: "1980",
      title: "The Beginnings",
      body: "Mohammed Akram initiates Pak Halal Meats Ltd in South Wales — the humble beginning of the company in the UK halal meat trade.",
    },
    {
      year: "1995",
      title: "Moving to Birmingham",
      body: "Strong entrepreneurial vision sees the business move to central Birmingham for bigger and better opportunities. Production grows and multiplies rapidly.",
    },
    {
      year: "1997",
      title: "Rebranding to Pak Mecca Meats",
      body: "A strategic move to a larger abattoir triggers rapid expansion. Pak Halal is rebranded to Pak Mecca Meats (PMM) — symbolic of its central significance in the halal meat trade.",
    },
    {
      year: "2000",
      title: "Industry Recognition",
      body: "Pak Mecca Meats establishes itself as a reputable name in the meat industry, creating over 90 job opportunities.",
    },
    {
      year: "2015",
      title: "International Expansion",
      body: "The PMM group begins international trading under sister company Menai Meats, solidifying PMM as one of the UK's most well-established halal meat companies.",
    },
    {
      year: "2021",
      title: "Strategic Acquisition",
      body: "Acquisition of a facility in Tipton, West Midlands — refitted to increase weekly production to 25,000 carcasses per week.",
    },
    {
      year: "2024",
      title: "Continued Growth",
      body: "Over 150 colleagues, with a commitment to create 100 more job opportunities in the future.",
    },
  ],
  values: [
    {
      title: "Animal Welfare First",
      description:
        "The well-being of our animals is our top priority. We ensure our livestock lead happy, healthy, natural lives — directly contributing to meat of the highest quality in flavour, texture, and excellence.",
    },
    {
      title: "Customer-Centricity",
      description:
        "We place the customer at the core of every decision, ensuring a positive experience from procurement to delivery. We aspire to be the key partner of choice for both new and existing customers.",
    },
    {
      title: "Trust & Transparency",
      description:
        "We ensure full transparency and traceability of all our lamb and mutton products, building trust and delivering the highest level of service and efficiency in the industry.",
    },
    {
      title: "Excellence & Innovation",
      description:
        "Devoted to excellence and ongoing improvement — continuously investing in processes to deliver products of unwavering quality that exceed consumer expectations.",
    },
    {
      title: "People & Empowerment",
      description:
        "We promote respect, empowerment, and active engagement within our teams, challenging and supporting our people to unlock their full potential in a high-performance environment.",
    },
    {
      title: "Sustainability",
      description:
        "Embracing innovative technologies, we enhance our operations to contribute to a sustainable future, aligning with our broader commitment to excellence and responsibility.",
    },
  ],
  qualityHeading: "PM Meats — Where Quality Meets Satisfaction",
  qualityCards: [
    {
      title: "The Art of Selection",
      description:
        "Our expert team navigates livestock markets across the UK to identify and choose only the best animals. This dedication to precision has established us as the trusted source for superior meat products.",
    },
    {
      title: "Trusted Relationships",
      description:
        "PM Meats is known and respected as a reliable partner in the industry, with longstanding relationships with livestock markets across the UK giving us consistent access to top-tier animals.",
    },
    {
      title: "Our Promise to You",
      description:
        "When you choose PM Meats, you choose a legacy of hard work, dedication, and an unwavering commitment to quality. We deliver excellence with every cut — handpicked from the UK's top livestock.",
    },
  ],
};

export default function About() {
  const [content, setContent] = useState<AboutContent>(defaults);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("about");
      if (dbContent) {
        setContent({
          heroHeading: dbContent.heroHeading || defaults.heroHeading,
          heroSubheading: dbContent.heroSubheading || defaults.heroSubheading,
          heroBg: dbContent.heroBg || defaults.heroBg,
          whoWeAreBody: dbContent.whoWeAreBody || defaults.whoWeAreBody,
          whoWeAreImg: dbContent.whoWeAreImg || defaults.whoWeAreImg,
          historyImg: dbContent.historyImg || defaults.historyImg,
          timeline: dbContent.timeline || defaults.timeline,
          values: dbContent.values || defaults.values,
          qualityHeading: dbContent.qualityHeading || defaults.qualityHeading,
          qualityCards: dbContent.qualityCards || defaults.qualityCards,
        });
      }
    }
    loadContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={content.heroBg}
      />

      {/* Who We Are */}
      <ContentBlock
        heading="Who We Are"
        body={content.whoWeAreBody}
        image={content.whoWeAreImg}
        label="ABOUT US"
        bgColor="bg-[#FAFAFA]"
      />

      {/* Our History Timeline */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-16 lg:mb-24">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-wide">
              Our History
            </h2>
          </div>

          <div className="relative">
            {/* Center Timeline Line (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-[#C8A400]/30 top-0 bottom-0" />

            <div className="space-y-12 lg:space-y-24">
              {content.timeline.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: shouldReduceMotion ? 0 : isLeft ? -40 : 40,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`relative flex flex-col lg:flex-row lg:items-center ${
                      isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content text */}
                    <div className="lg:w-[45%] flex flex-col space-y-3 lg:px-8">
                      <span className="text-[#C8A400] text-lg font-bold tracking-wide">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-light text-brand-dark uppercase tracking-wider">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-light">
                        {milestone.body}
                      </p>
                    </div>

                    {/* Desktop Center Gold Dot */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[#C8A400] border-2 border-white shadow-sm z-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section — Simple text list with left border bullet lines */}
      <section className="py-20 lg:py-32 bg-[#FAFAFA] border-t border-[#C8A400]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-16">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-wide">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {content.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : (index % 3) * 0.1 }}
                className="pl-6 border-l-2 border-[#C8A400] flex flex-col space-y-3"
              >
                <h3 className="text-sm font-bold text-brand-dark uppercase tracking-widest">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section — Centered editorial italic blockquote style */}
      <section className="py-24 lg:py-40 bg-white border-t border-[#C8A400]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              Our Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-wide">
              {content.qualityHeading}
            </h2>
          </div>

          <div className="flex flex-col space-y-16 max-w-4xl mx-auto text-center divide-y divide-[#C8A400]/20">
            {content.qualityCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col items-center ${index > 0 ? "pt-12" : ""}`}
              >
                <span className="text-xs uppercase tracking-widest text-[#C8A400] font-bold mb-4">
                  0{index + 1}. {card.title}
                </span>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic text-gray-700 leading-relaxed max-w-3xl">
                  &ldquo;{card.description}&rdquo;
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
