"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import { motion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { AboutContent } from "@/types/content";

const defaults: AboutContent = {
  heroHeading: "Welcome to Pak Mecca Meats Ltd",
  heroSubheading: "A Tradition of Quality Since 1980",
  heroBg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1600",
  whoWeAreBody:
    "Pak Mecca Meats Ltd is a Birmingham-based supplier of premium British lamb and mutton carcasses, founded in 1980. As a family-owned business built on customer-centric values, we have grown into a powerhouse of the UK halal meat industry. Our specialist facilities in Birmingham enable us to process 15,000–20,000 carcasses per week. With over 150 dedicated colleagues working in our plant, we serve communities in the UK, mainland Europe, the Middle East and beyond.",
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
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={content.heroBg}
      />

      {/* Who We Are: Text left, Image right on desktop */}
      <ContentBlock
        heading="Who We Are"
        body={content.whoWeAreBody}
        image={content.whoWeAreImg}
      />

      {/* Our History Timeline */}
      <section className="py-16 md:py-24 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="text-brand-gold text-sm font-bold uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-2">
              Our History
            </h2>
            <div className="h-1 w-20 bg-brand-green mx-auto mt-4" />
          </div>

          {/* Vertical Timeline (mobile) → Alternating (desktop) */}
          <div className="relative">
            {/* Vertical line (desktop only) */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-brand-green/20 top-0 bottom-0" />

            <div className="space-y-8 lg:space-y-0">
              {content.timeline.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 lg:mb-12 ${
                      isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content card — takes up 45% width on desktop */}
                    <div
                      className={`lg:w-[45%] bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${
                        isLeft ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"
                      }`}
                    >
                      <span className="inline-block bg-brand-green text-white text-xs font-black px-3 py-1 rounded-full mb-3 tracking-wider">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold text-brand-dark mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {milestone.body}
                      </p>
                    </div>

                    {/* Center dot on desktop */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-md z-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section — 6 cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="text-brand-gold text-sm font-bold uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-2">
              Our Core Values
            </h2>
            <div className="h-1 w-20 bg-brand-green mx-auto mt-4" />
          </div>

          {/* 1-col mobile → 2-col tablet → 3-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="bg-brand-light p-6 rounded-lg border-t-4 border-brand-green shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-brand-gold text-2xl font-black mb-3 block">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 md:py-24 bg-brand-green/5 border-t border-brand-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="text-brand-gold text-sm font-bold uppercase tracking-wider">
              Our Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-2">
              {content.qualityHeading}
            </h2>
            <div className="h-1 w-20 bg-brand-green mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.qualityCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-brand-green/10 hover:border-brand-gold hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black text-sm">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
