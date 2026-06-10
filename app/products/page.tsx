"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { getPageContent } from "@/lib/firestore";
import { ProductsContent } from "@/types/content";

// Default image for offal items
const OFFAL_IMG = "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=400";

const defaults: ProductsContent = {
  heroHeading: "Our Products",
  heroSubheading: "An award winning part of our business",
  heroBg: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600",
  // Keeping other categories for completeness but they are not rendered
  lamb: [],
  mutton: [],
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
  skins: [],
};

export default function Products() {
  const [content, setContent] = useState<ProductsContent>(defaults);

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        heading={content.heroHeading ?? ""}
        subheading={content.heroSubheading ?? ""}
        bgImage={content.heroBg ?? ""}
      />

      {/* Offal Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {content.offal.map((item, index) => (
              <ProductCard
                key={index}
                title={item.name}
                description={item.description}
                image={item.image}
                link="/contact"
                btnText="Inquire Now"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
