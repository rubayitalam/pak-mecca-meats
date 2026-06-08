"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { HomeContent } from "@/types/content";
import toast from "react-hot-toast";

const defaults: HomeContent = {
  heroHeading: "Premium Halal Lamb & Mutton",
  heroSubheading: "Trusted Worldwide Since 1980",
  heroBody:
    "Pak Mecca Meats Ltd stands as a prominent supplier of high-quality lamb and mutton carcasses globally. Processing 15,000–20,000 carcasses per week, we proudly serve communities in the UK, mainland Europe, the Middle East, and beyond.",
  heroBg: "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=1600",
  features: [
    { title: "HMC Halal Certified", description: "Certified by the Halal Monitoring Committee — the most established Halal accreditation body in the EU, ensuring full Shariah compliance from farm to plate." },
    { title: "Global Supplier Since 1980", description: "From humble beginnings in South Wales to supplying the UK, mainland Europe, the Middle East and beyond — a legacy built on trust and quality." },
    { title: "15,000–20,000 Carcasses/Week", description: "Our specialist Birmingham facilities and 150+ dedicated colleagues process an impressive volume while upholding the highest quality standards." },
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
    { title: "Lamb Cuts", description: "From bone-in legs to saddles and shoulders — premium British lamb, vacuum-packed to your specification.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600", link: "/products" },
    { title: "Mutton Cuts", description: "A full range of mutton — legs, chops, diced, tenderloin and more. Halal certified, fresh or frozen.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600", link: "/products" },
    { title: "Offal & More", description: "Heads, tongues, liver, kidneys, tripe and feet — all prepared to the highest Halal compliance standards.", image: "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=600", link: "/products" },
  ],
};

export default function HomeEditor() {
  const [data, setData] = useState<HomeContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("home");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaults.heroHeading,
          heroSubheading: dbData.heroSubheading || defaults.heroSubheading,
          heroBody: dbData.heroBody || defaults.heroBody,
          heroBg: dbData.heroBg || defaults.heroBg,
          features: dbData.features || defaults.features,
          aboutHeading: dbData.aboutHeading || defaults.aboutHeading,
          aboutBody: dbData.aboutBody || defaults.aboutBody,
          aboutImg: dbData.aboutImg || defaults.aboutImg,
          stats: dbData.stats || defaults.stats,
          productsPreview: dbData.productsPreview || defaults.productsPreview,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("home", data);
    if (success) {
      toast.success("Home page content saved successfully!");
    } else {
      toast.error("Failed to save changes. Check permissions.");
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
        <h1 className="text-2xl font-bold text-brand-dark">Home Page Content Editor</h1>
        <p className="text-gray-500 text-sm mt-1">Manage the content that appears on the homepage.</p>
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
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Body Text</label>
          <textarea
            rows={3}
            value={data.heroBody}
            onChange={(e) => setData({ ...data, heroBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
          />
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

      {/* 2. FEATURE CARDS */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">2. Feature Cards (3 Cards)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.features.map((feature, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-brand-green">Card {index + 1}</span>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...data.features];
                    newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                    setData({ ...data, features: newFeatures });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...data.features];
                    newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                    setData({ ...data, features: newFeatures });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ABOUT SNIPPET */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">3. About Us Snippet</h2>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
          <input
            type="text"
            value={data.aboutHeading}
            onChange={(e) => setData({ ...data, aboutHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Body Text</label>
          <textarea
            rows={4}
            value={data.aboutBody}
            onChange={(e) => setData({ ...data, aboutBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Image URL</label>
          <input
            type="text"
            value={data.aboutImg}
            onChange={(e) => setData({ ...data, aboutImg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm mb-2"
          />
          {data.aboutImg && (
            <div className="relative w-48 h-32 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.aboutImg} alt="About Section Image Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 4. STATS BAR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">4. Stats Bar (4 Statistics)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.stats.map((stat, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-brand-green">Stat {index + 1}</span>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Number / Value</label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[index] = { ...newStats[index], number: e.target.value };
                    setData({ ...data, stats: newStats });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[index] = { ...newStats[index], label: e.target.value };
                    setData({ ...data, stats: newStats });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PRODUCTS PREVIEW */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">5. Products Preview (3 Items)</h2>

        <div className="space-y-6">
          {data.productsPreview.map((item, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <span className="text-xs font-bold text-brand-green">Preview Item {index + 1}</span>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newPreviews = [...data.productsPreview];
                      newPreviews[index] = { ...newPreviews[index], title: e.target.value };
                      setData({ ...data, productsPreview: newPreviews });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const newPreviews = [...data.productsPreview];
                      newPreviews[index] = { ...newPreviews[index], description: e.target.value };
                      setData({ ...data, productsPreview: newPreviews });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => {
                      const newPreviews = [...data.productsPreview];
                      newPreviews[index] = { ...newPreviews[index], image: e.target.value };
                      setData({ ...data, productsPreview: newPreviews });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-end">
                {item.image && (
                  <div className="relative w-full h-40 rounded border overflow-hidden bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
