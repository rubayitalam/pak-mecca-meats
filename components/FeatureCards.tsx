"use client";

import { motion } from "framer-motion";
import { Award, Globe, ShieldCheck } from "lucide-react";
import { FeatureCard } from "@/types/content";

interface FeatureCardsProps {
  features?: FeatureCard[];
}

const defaultFeatures: FeatureCard[] = [
  {
    title: "Halal Certified",
    description:
      "Certified by the Halal Monitoring Committee (HMC) — the leading accreditation body in the EU for Halal authenticity.",
  },
  {
    title: "Global Supplier",
    description:
      "Supplying premium British lamb and mutton to customers across the world since 1980.",
  },
  {
    title: "Quality Assured",
    description:
      "HACCP certified with full Food Standards Agency oversight ensuring the highest food safety standards.",
  },
];

const icons = [Award, Globe, ShieldCheck];

export default function FeatureCards({ features = defaultFeatures }: FeatureCardsProps) {
  const cards = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((feature, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:border-brand-gold transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="w-10 h-[2px] bg-brand-green mt-6 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
