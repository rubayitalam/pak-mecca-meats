"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import ContentBlock from "@/components/ContentBlock";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
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
    },
    {
      title: "Global Supplier Since 1980",
      description:
        "From humble beginnings in South Wales to supplying the UK, mainland Europe, the Middle East and beyond — a legacy built on trust and quality.",
    },
    {
      title: "15,000–20,000 Carcasses/Week",
      description:
        "Our specialist Birmingham facilities and 150+ dedicated colleagues process an impressive volume while upholding the highest quality standards.",
    },
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
];

export default function Home() {
  const [content, setContent] = useState<HomeContent>(defaults);

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
    <div className="flex flex-col min-h-screen">
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

      {/* Feature Cards Grid */}
      <FeatureCards features={content.features} />

      {/* Alternating About Section */}
      <ContentBlock
        heading={content.aboutHeading}
        body={content.aboutBody}
        image={content.aboutImg}
        btnText="Learn More About Us"
        btnLink="/about"
      />

      {/* Stats Bar */}
      <section className="bg-brand-green py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-white text-center">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-1"
              >
                <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-brand-gold leading-none">
                  {stat.number}
                </span>
                <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-white/80">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="text-brand-gold text-sm font-bold uppercase tracking-wider">
              Our Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-2">
              Premium Halal Products
            </h2>
            <div className="h-1 w-20 bg-brand-green mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Certifications Strip */}
      <section className="py-10 bg-brand-dark border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="flex items-center lg:justify-center overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-4 scrollbar-none snap-x snap-mandatory">
            {certs.map((badge, index) => (
              <div
                key={index}
                className="snap-center shrink-0 border border-brand-gold/60 text-brand-gold text-xs sm:text-sm uppercase tracking-wider font-bold px-6 py-2.5 rounded-full bg-brand-gold/5 whitespace-nowrap hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
