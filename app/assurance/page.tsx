"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentBlock from "@/components/ContentBlock";
import { getPageContent } from "@/lib/firestore";
import { AssuranceContent } from "@/types/content";

const defaults: AssuranceContent = {
  heroHeading: "Our Assurances",
  heroSubheading: "Quality & Safety You Can Trust",
  heroBg: "https://images.unsplash.com/photo-1584475784921-d9dbfd9d17ca?w=1600",
  sections: [
    {
      heading: "HMC Halal Certified",
      image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800",
      body: "Pak Mecca Meats Limited is certified by the Halal Monitoring Committee (HMC) — the leading and most established accreditation organisation in the EU providing consumer assurance of Halal authenticity from farm to plate. We supply the finest natural quality British lamb and mutton in strict accordance with Islamic Shariah compliance. Every animal is slaughtered by a Muslim following the correct Islamic method, ensuring our products are genuinely Halal at every stage.",
    },
    {
      heading: "HACCP — Food Safety Management",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      body: "HACCP (Hazard Analysis and Critical Control Point) is a globally recognised management system addressing food safety through the analysis and control of biological, chemical, and physical hazards — from raw material production through to manufacturing, distribution, and consumption of the finished product. At PM Meats, our HACCP system ensures every stage of our process is monitored and controlled to the highest standard.",
    },
    {
      heading: "Food Standards Agency Approved",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=800",
      body: "The Food Standards Agency (FSA) is responsible for food safety and food hygiene across England, Wales and Northern Ireland. FSA staff work directly in our meat plants to check that standards are consistently met. Pak Mecca Meats operates in full compliance with all FSA requirements, giving our customers complete confidence in every product that leaves our facility.",
    },
  ],
};

export default function Assurance() {
  const [content, setContent] = useState<AssuranceContent>(defaults);

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("assurance");
      if (dbContent) {
        setContent({
          heroHeading: dbContent.heroHeading || defaults.heroHeading,
          heroSubheading: dbContent.heroSubheading || defaults.heroSubheading,
          heroBg: dbContent.heroBg || defaults.heroBg,
          sections: dbContent.sections || defaults.sections,
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

      {/* Alternating Sections */}
      <div className="flex flex-col">
        {content.sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className={isEven ? "bg-white" : "bg-brand-light"}>
              <ContentBlock
                heading={section.heading}
                body={section.body}
                image={section.image}
                reverse={!isEven}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
