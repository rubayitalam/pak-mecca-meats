"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getPageContent } from "@/lib/firestore";
import { ProductsContent } from "@/types/content";

const LAMB_IMG = "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400";
const MUTTON_IMG = "https://images.unsplash.com/photo-1558030006-450675393462?w=400";
const OFFAL_IMG = "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=400";
const SKINS_IMG = "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400";

const defaults: ProductsContent = {
  heroHeading: "Our Products",
  heroSubheading: "An award winning part of our business",
  heroBg: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600",
  lamb: [
    { name: "LAMB LEG [BONE-IN]", description: "Each bone-in lamb leg is vacuum-packed and boxed individually to your specification.", image: LAMB_IMG },
    { name: "LAMB PAIRED LEGS", description: "Over wrapped and placed in a meat container, weighed together or individually labelled.", image: LAMB_IMG },
    { name: "LAMB SADDLE", description: "All our lamb saddles are wrapped and then boxed, maintaining premium quality.", image: LAMB_IMG },
    { name: "LAMB LOIN HALF SADDLE", description: "Each lamb loin half saddle is over wrapped and then boxed to specification.", image: LAMB_IMG },
    { name: "FULL LAMB BREAST", description: "All lamb breasts are over wrapped and boxed. Available fresh or frozen.", image: LAMB_IMG },
    { name: "LAMB TRUNKS", description: "Wrapped, placed in a meat container, weighed together or individually labelled.", image: LAMB_IMG },
    { name: "LAMB FRONTS", description: "Over wrapped, placed in a meat container, weighed together or individually labelled.", image: LAMB_IMG },
    { name: "LAMB SHOULDER", description: "Each shoulder of lamb is over wrapped and boxed. Available bone-in or boneless.", image: LAMB_IMG },
  ],
  mutton: [
    { name: "MUTTON LEG [BONE IN]", description: "Over wrapped and boxed. A staple of our premium mutton range.", image: MUTTON_IMG },
    { name: "MUTTON LEG [BONELESS]", description: "Vacuum-packed and canned. Perfect for large-scale catering operations.", image: MUTTON_IMG },
    { name: "OVINE LEG PAD", description: "Vacuum packed and boxed. Deboned for convenience and consistent weight.", image: MUTTON_IMG },
    { name: "OVINE PAD LEG CHUNK", description: "Deboned muscles, vacuum-packed and canned. Ideal for diced applications.", image: MUTTON_IMG },
    { name: "OVINE SHOULDER PAD", description: "Vacuum-packed and canned. Succulent shoulder meat, fully deboned.", image: MUTTON_IMG },
    { name: "OVINE SHANKS", description: "Hind or fore shank, wrapped and boxed. Slow-cook perfection.", image: MUTTON_IMG },
    { name: "MUTTON HAND DICED", description: "Vacuum-packed in 5 or 10kg bags, then boxed. Ready for cooking.", image: MUTTON_IMG },
    { name: "OVINE FRONT CHOPS", description: "11 ribs per loin, over wrapped and boxed. Consistent cut and quality.", image: MUTTON_IMG },
    { name: "OVINE BACK CHOPS", description: "Over wrapped and boxed. Premium chops from the hindquarter.", image: MUTTON_IMG },
    { name: "OVINE BACKSTRAP", description: "Vacuum packed and boxed. Available PAD or with skin to specification.", image: MUTTON_IMG },
    { name: "OVINE TENDERLOIN", description: "Vacuum-packed and boxed. The most tender cut from our premium mutton.", image: MUTTON_IMG },
    { name: "OVINE 95% VL", description: "Vacuum packed in 10kg bags, then boxed. High lean content trim.", image: MUTTON_IMG },
    { name: "MUTTON BREAST", description: "Over wrapped then boxed. Vacuum packaging available on request.", image: MUTTON_IMG },
    { name: "OVINE FAT 20% VL", description: "Available in frozen naked blocks or fresh in boxes to your specification.", image: MUTTON_IMG },
  ],
  offal: [
    { name: "Heads", description: "Premium quality whole ovine heads, cleaned and prepared to spec.", image: OFFAL_IMG },
    { name: "Tongues", description: "Freshly prepared ovine tongues. Available fresh or frozen.", image: OFFAL_IMG },
    { name: "Brains", description: "High quality ovine brains, carefully cleaned and prepared.", image: OFFAL_IMG },
    { name: "Plucks", description: "Standard ovine pluck (heart, liver, lungs) — a popular export product.", image: OFFAL_IMG },
    { name: "Heart", description: "Fresh and frozen ovine hearts. Halal slaughtered and certified.", image: OFFAL_IMG },
    { name: "Liver", description: "Premium quality ovine liver. Available fresh chilled or frozen.", image: OFFAL_IMG },
    { name: "Ovine Kidneys", description: "Cleaned and prepared kidneys. Packed to your specification.", image: OFFAL_IMG },
    { name: "Skirt", description: "Ovine diaphragm skirt meat — tender and flavourful.", image: OFFAL_IMG },
    { name: "Sweetbreads", description: "Fresh select ovine sweetbreads. A premium offal product.", image: OFFAL_IMG },
    { name: "Testicles", description: "Whole ovine testicles, prepared to your specification.", image: OFFAL_IMG },
    { name: "Tripe", description: "Carefully cleaned and scalded tripe. Available in multiple preparations.", image: OFFAL_IMG },
    { name: "Feet", description: "Singed or scalded ovine feet. Widely exported to global markets.", image: OFFAL_IMG },
  ],
  skins: [
    { name: "Ovine Skins", description: "Premium quality ovine skins, prepared to your specification. Available salted or fresh.", image: SKINS_IMG },
  ],
};

type TabType = "lamb" | "mutton" | "offal" | "skins";

export default function Products() {
  const [content, setContent] = useState<ProductsContent>(defaults);
  const [activeTab, setActiveTab] = useState<TabType>("lamb");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("products");
      if (dbContent) {
        setContent({
          heroHeading: dbContent.heroHeading || defaults.heroHeading,
          heroSubheading: dbContent.heroSubheading || defaults.heroSubheading,
          heroBg: dbContent.heroBg || defaults.heroBg,
          lamb: dbContent.lamb || defaults.lamb,
          mutton: dbContent.mutton || defaults.mutton,
          offal: dbContent.offal || defaults.offal,
          skins: dbContent.skins || defaults.skins,
        });
      }
    }
    loadContent();
  }, []);

  const tabs: { id: TabType; name: string }[] = [
    { id: "lamb", name: "Lamb Cuts" },
    { id: "mutton", name: "Mutton Cuts" },
    { id: "offal", name: "Offal & More" },
    { id: "skins", name: "Ovine Skins" },
  ];

  const fallbackImage: Record<TabType, string> = {
    lamb: LAMB_IMG,
    mutton: MUTTON_IMG,
    offal: OFFAL_IMG,
    skins: SKINS_IMG,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        heading={content.heroHeading || defaults.heroHeading!}
        subheading={content.heroSubheading || defaults.heroSubheading!}
        bgImage={content.heroBg || defaults.heroBg!}
      />

      {/* Tabs Selector & Product Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">

          {/* Navigation Tabs (Thin gold underline indicator) */}
          <div className="flex justify-start md:justify-center overflow-x-auto pb-px mb-16 border-b border-gray-200 gap-8 scrollbar-none snap-x snap-mandatory">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`snap-center shrink-0 pb-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px] focus:outline-none border-b-2 ${
                    isActive
                      ? "border-[#C8A400] text-[#C8A400]"
                      : "border-transparent text-gray-500 hover:text-brand-dark"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Product Items Display Grid */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {content[activeTab]?.map((item, index) => (
                  <ProductCard
                    key={index}
                    title={item.name}
                    description={item.description}
                    image={item.image || fallbackImage[activeTab]}
                    link="/contact"
                    btnText="Inquire Now"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
