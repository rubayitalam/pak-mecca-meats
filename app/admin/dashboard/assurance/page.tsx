"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { AssuranceContent } from "@/types/content";
import toast from "react-hot-toast";

const defaults: AssuranceContent = {
  heroHeading: "Our Assurances",
  heroSubheading: "Quality & Safety You Can Trust",
  heroBg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600",
  sections: [
    {
      heading: "HALAL ASSURANCE",
      image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800",
      body: "Pak Mecca Meats Limited is certified by the Halal Monitoring Committee (HMC), the leading and most established accreditation organisation in the EU. We supply the finest natural quality British lamb and mutton, in strict accordance with Islamic Shariah compliance, from farm to plate.",
    },
    {
      heading: "HACCP CERTIFICATION",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      body: "HACCP is a management system addressing food safety through the analysis and control of biological, chemical, and physical hazards from raw material production, procurement and handling, to manufacturing, distribution and consumption of the finished product.",
    },
    {
      heading: "FOOD STANDARDS AGENCY",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      body: "The Food Standards Agency (FSA) is responsible for food safety and food hygiene in England, Wales and Northern Ireland. It works with local authorities to enforce food safety regulations, and our staff work in meat plants to ensure standards are consistently met.",
    },
  ],
};

export default function AssuranceEditor() {
  const [data, setData] = useState<AssuranceContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("assurance");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaults.heroHeading,
          heroSubheading: dbData.heroSubheading || defaults.heroSubheading,
          heroBg: dbData.heroBg || defaults.heroBg,
          sections: dbData.sections || defaults.sections,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("assurance", data);
    if (success) {
      toast.success("Assurances content saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database rules.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Assurance Page Content Editor</h1>
        <p className="text-gray-500 text-sm mt-1">Manage certification details and policy text blocks.</p>
      </div>

      {/* 1. HERO SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">1. Hero Section</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Heading</label>
            <input
              type="text"
              value={data.heroHeading}
              onChange={(e) => setData({ ...data, heroHeading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Subheading</label>
            <input
              type="text"
              value={data.heroSubheading}
              onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Background Image URL</label>
          <input
            type="text"
            value={data.heroBg}
            onChange={(e) => setData({ ...data, heroBg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm mb-2"
          />
          {data.heroBg && (
            <div className="relative w-full h-40 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroBg} alt="Hero Background Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 2. REGULATORY SECTIONS */}
      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-brand-dark border-b pb-2">
              Section {index + 1}: {section.heading}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => {
                      const newSections = [...data.sections];
                      newSections[index].heading = e.target.value;
                      setData({ ...data, sections: newSections });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Body Text</label>
                  <textarea
                    rows={6}
                    value={section.body}
                    onChange={(e) => {
                      const newSections = [...data.sections];
                      newSections[index].body = e.target.value;
                      setData({ ...data, sections: newSections });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Image URL</label>
                  <input
                    type="text"
                    value={section.image}
                    onChange={(e) => {
                      const newSections = [...data.sections];
                      newSections[index].image = e.target.value;
                      setData({ ...data, sections: newSections });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                  />
                </div>
                {section.image && (
                  <div className="relative w-full h-44 rounded border overflow-hidden mt-2 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image} alt={`${section.heading} Image Preview`} className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full md:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {saving ? "Saving Changes..." : "Save Changes"}
      </button>
    </div>
  );
}
