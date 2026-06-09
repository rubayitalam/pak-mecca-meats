"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import ProductCard from "@/components/ProductCard";
import { motion, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { HomeContent } from "@/types/content";

const defaults: HomeContent = {
  heroHeading: "Premium Halal Lamb & Mutton",
  heroSubheading: "Trusted Worldwide Since 1980",
  heroBody:
    "Pak Mecca Meats Ltd stands as a prominent supplier of high-quality lamb and mutton carcasses globally. Processing 15,000–20,000 carcasses per week, we proudly serve communities in the UK, mainland Europe, the Middle East, and beyond.",
  heroBg: "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=1600",
  features: [
    {
      title: "HMC Halal Certified",
      description:
        "Certified by the Halal Monitoring Committee — the most established Halal accreditation body in the EU, ensuring full Shariah compliance from farm to plate.",
      image: "",
    } as any,
    {
      title: "Global Supplier Since 1980",
      description:
        "From humble beginnings in South Wales to supplying the UK, mainland Europe, the Middle East and beyond — a legacy built on trust and quality.",
      image: "",
    } as any,
    {
      title: "15,000–20,000 Carcasses/Week",
      description:
        "Our specialist Birmingham facilities and 150+ dedicated colleagues process an impressive volume while upholding the highest quality standards.",
      image: "",
    } as any,
  ],
  aboutHeading: "A Tradition of Quality Since 1980",
  aboutBody:
    "Founded in 1980 by Mohammed Akram, Pak Mecca Meats Ltd has grown from a small trading venture in South Wales into one of the UK's most well-established halal meat suppliers. With over 150 dedicated colleagues and facilities in central Birmingham, we process 15,000–20,000 lamb and mutton carcasses every week.",
  aboutImg: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
  stats: [
    { number: "150+", label: "Dedicated Colleagues" },
    { number: "15,000–20,000", label: "Carcasses Per Week" },
    { number: "40+", label: "Years Established" },
    { number: "3", label: "Continents Served" },
  ],
  productsPreview: [
    {
      title: "Lamb Cuts",
      description:
        "From bone-in legs to saddles and shoulders — premium British lamb, vacuum-packed to your specification.",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
      link: "/products",
    },
    {
      title: "Mutton Cuts",
      description:
        "A full range of mutton — legs, chops, diced, tenderloin and more. Halal certified, fresh or frozen.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600",
      link: "/products",
    },
    {
      title: "Offal & More",
      description:
        "Heads, tongues, liver, kidneys, tripe and feet — all prepared to the highest Halal compliance standards.",
      image: "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=600",
      link: "/products",
    },
  ],
};

const certs = [
  "HMC Halal Certified",
  "HACCP Certified",
  "Food Standards Agency",
  "BRC Food Safety",
  "Est. 1980",
  "Family Owned",
];

export default function Home() {
  const [content, setContent] = useState<HomeContent>(defaults);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("home");
      if (dbContent) {
        setContent({
          heroHeading: dbContent.heroHeading || defaults.heroHeading,
          heroSubheading: dbContent.heroSubheading || defaults.heroSubheading,
          heroBody: dbContent.heroBody || defaults.heroBody,
          heroBg: dbContent.heroBg || defaults.heroBg,
          features: dbContent.features || defaults.features,
          aboutHeading: dbContent.aboutHeading || defaults.aboutHeading,
          aboutBody: dbContent.aboutBody || defaults.aboutBody,
          aboutImg: dbContent.aboutImg || defaults.aboutImg,
          stats: dbContent.stats || defaults.stats,
          productsPreview: dbContent.productsPreview || defaults.productsPreview,
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
        bodyText={content.heroBody}
        bgImage={content.heroBg}
        primaryBtnText="Explore Products"
        primaryBtnLink="/products"
        secondaryBtnText="About Us"
        secondaryBtnLink="/about"
      />

      {/* Editorial Alternating Features (Replacing Feature Cards) */}
      <div className="flex flex-col">
        {content.features?.[0] && (
          <ContentBlock
            heading={content.features[0].title}
            body={content.features[0].description}
            image={(content.features[0] as any).image || "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800"}
            reverse={false}
            label="AUTHENTICITY"
            bgColor="bg-[#FAFAFA]"
          />
        )}
        {content.features?.[1] && (
          <ContentBlock
            heading={content.features[1].title}
            body={content.features[1].description}
            image={(content.features[1] as any).image || "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800"}
            reverse={true}
            label="LEGACY"
            bgColor="bg-white"
          />
        )}
        {content.features?.[2] && (
          <ContentBlock
            heading={content.features[2].title}
            body={content.features[2].description}
            image={(content.features[2] as any).image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"}
            reverse={false}
            label="CAPACITY"
            bgColor="bg-[#FAFAFA]"
          />
        )}

        {/* Thin Gold Divider */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="h-[1px] w-full bg-[#C8A400]/30" />
        </div>

        {/* Alternating About Section */}
        <ContentBlock
          heading={content.aboutHeading}
          body={content.aboutBody}
          image={content.aboutImg}
          reverse={true}
          label="OUR STORY"
          btnText="Learn More About Us"
          btnLink="/about"
          bgColor="bg-white"
        />
      </div>

      {/* Stats Bar (Flat green horizontal strip, not cards) */}
      <section className="bg-[#1B5E20] py-10 border-y border-[#C8A400]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="flex flex-col items-center justify-center text-center p-4 lg:p-0 lg:px-4"
              >
                <span className="text-2xl sm:text-3xl font-light text-[#C8A400] leading-none mb-2">
                  {stat.number}
                </span>
                <span className="text-xs uppercase tracking-widest font-medium text-gray-200">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section (Flat Editorial Style) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-16">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              Our Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-wide">
              Premium Halal Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {content.productsPreview.map((item, index) => (
              <ProductCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Infinite Marquee */}
      <section className="py-8 bg-[#1A1A1A] border-y border-[#C8A400]/20 overflow-hidden relative">
        <div className="w-full flex select-none overflow-hidden relative">
          <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8">
            {certs.map((badge, index) => (
              <div
                key={index}
                className="border border-[#C8A400] text-[#C8A400] text-xs uppercase tracking-widest px-6 py-2 bg-transparent whitespace-nowrap hover:bg-[#C8A400] hover:text-[#1A1A1A] transition-colors duration-300 pointer-events-auto"
              >
                {badge}
              </div>
            ))}
          </div>
          {/* Duplicate to create a seamless continuous scroll effect */}
          <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8" aria-hidden="true">
            {certs.map((badge, index) => (
              <div
                key={`dup-${index}`}
                className="border border-[#C8A400] text-[#C8A400] text-xs uppercase tracking-widest px-6 py-2 bg-transparent whitespace-nowrap hover:bg-[#C8A400] hover:text-[#1A1A1A] transition-colors duration-300 pointer-events-auto"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          /* Pause animation on hover */
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee {
              animation: none;
              overflow-x: auto;
              width: 100%;
              justify-content: center;
              flex-wrap: wrap;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
