"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { AboutContent } from "@/types/content";
import toast from "react-hot-toast";

const defaults: AboutContent = {
  heroHeading: "Welcome to Pak Mecca Meats Ltd",
  heroSubheading: "A Tradition of Quality Since 1980",
  heroBg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1600",
  whoWeAreBody:
    "Pak Mecca Meats Ltd is a Birmingham-based supplier of premium British lamb and mutton carcasses, founded in 1980. As a family-owned business built on customer-centric values, we have grown into a powerhouse of the UK halal meat industry. Our specialist facilities in Birmingham enable us to process 15,000–20,000 carcasses per week. With over 150 dedicated colleagues working in our plant, we serve communities in the UK, mainland Europe, the Middle East and beyond.",
  whoWeAreImg: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800",
  historyImg: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800",
  timeline: [
    { year: "1980", title: "The Beginnings", body: "Mohammed Akram initiates Pak Halal Meats Ltd in South Wales — the humble beginning of the company in the UK halal meat trade." },
    { year: "1995", title: "Moving to Birmingham", body: "Strong entrepreneurial vision sees the business move to central Birmingham for bigger and better opportunities. Production grows and multiplies rapidly." },
    { year: "1997", title: "Rebranding to Pak Mecca Meats", body: "A strategic move to a larger abattoir triggers rapid expansion. Pak Halal is rebranded to Pak Mecca Meats (PMM) — symbolic of its central significance in the halal meat trade." },
    { year: "2000", title: "Industry Recognition", body: "Pak Mecca Meats establishes itself as a reputable name in the meat industry, creating over 90 job opportunities." },
    { year: "2015", title: "International Expansion", body: "The PMM group begins international trading under sister company Menai Meats, solidifying PMM as one of the UK's most well-established halal meat companies." },
    { year: "2021", title: "Strategic Acquisition", body: "Acquisition of a facility in Tipton, West Midlands — refitted to increase weekly production to 25,000 carcasses per week." },
    { year: "2024", title: "Continued Growth", body: "Over 150 colleagues, with a commitment to create 100 more job opportunities in the future." },
  ],
  values: [
    { title: "Animal Welfare First", description: "The well-being of our animals is our top priority. We ensure our livestock lead happy, healthy, natural lives — directly contributing to meat of the highest quality in flavour, texture, and excellence." },
    { title: "Customer-Centricity", description: "We place the customer at the core of every decision, ensuring a positive experience from procurement to delivery. We aspire to be the key partner of choice for both new and existing customers." },
    { title: "Trust & Transparency", description: "We ensure full transparency and traceability of all our lamb and mutton products, building trust and delivering the highest level of service and efficiency in the industry." },
    { title: "Excellence & Innovation", description: "Devoted to excellence and ongoing improvement — continuously investing in processes to deliver products of unwavering quality that exceed consumer expectations." },
    { title: "People & Empowerment", description: "We promote respect, empowerment, and active engagement within our teams, challenging and supporting our people to unlock their full potential in a high-performance environment." },
    { title: "Sustainability", description: "Embracing innovative technologies, we enhance our operations to contribute to a sustainable future, aligning with our broader commitment to excellence and responsibility." },
  ],
  qualityHeading: "PM Meats — Where Quality Meets Satisfaction",
  qualityCards: [
    { title: "The Art of Selection", description: "Our expert team navigates livestock markets across the UK to identify and choose only the best animals. This dedication to precision has established us as the trusted source for superior meat products." },
    { title: "Trusted Relationships", description: "PM Meats is known and respected as a reliable partner in the industry, with longstanding relationships with livestock markets across the UK giving us consistent access to top-tier animals." },
    { title: "Our Promise to You", description: "When you choose PM Meats, you choose a legacy of hard work, dedication, and an unwavering commitment to quality. We deliver excellence with every cut — handpicked from the UK's top livestock." },
  ],
};

export default function AboutEditor() {
  const [data, setData] = useState<AboutContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("about");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaults.heroHeading,
          heroSubheading: dbData.heroSubheading || defaults.heroSubheading,
          heroBg: dbData.heroBg || defaults.heroBg,
          whoWeAreBody: dbData.whoWeAreBody || defaults.whoWeAreBody,
          whoWeAreImg: dbData.whoWeAreImg || defaults.whoWeAreImg,
          historyImg: dbData.historyImg || defaults.historyImg,
          timeline: dbData.timeline || defaults.timeline,
          values: dbData.values || defaults.values,
          qualityHeading: dbData.qualityHeading || defaults.qualityHeading,
          qualityCards: dbData.qualityCards || defaults.qualityCards,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("about", data);
    if (success) {
      toast.success("About page content saved successfully!");
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
        <h1 className="text-2xl font-bold text-brand-dark">About Page Content Editor</h1>
        <p className="text-gray-500 text-sm mt-1">Manage the content that appears on the About Us page.</p>
      </div>

      {/* 1. HERO */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">1. Hero Section</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Heading</label>
            <input type="text" value={data.heroHeading} onChange={(e) => setData({ ...data, heroHeading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Subheading</label>
            <input type="text" value={data.heroSubheading} onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Background Image URL</label>
          <input type="text" value={data.heroBg} onChange={(e) => setData({ ...data, heroBg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm mb-2" />
          {data.heroBg && (
            <div className="relative w-full h-40 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroBg} alt="Hero Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 2. WHO WE ARE */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">2. Who We Are</h2>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Body Text</label>
          <textarea rows={5} value={data.whoWeAreBody} onChange={(e) => setData({ ...data, whoWeAreBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
          <input type="text" value={data.whoWeAreImg} onChange={(e) => setData({ ...data, whoWeAreImg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm mb-2" />
          {data.whoWeAreImg && (
            <div className="relative w-48 h-32 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.whoWeAreImg} alt="Who We Are Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 3. TIMELINE — 7 milestones */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">3. History Timeline (7 Milestones)</h2>

        <div className="space-y-4">
          {data.timeline.map((milestone, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-brand-green">Milestone {index + 1}</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Year</label>
                  <input type="text" value={milestone.year}
                    onChange={(e) => {
                      const t = [...data.timeline];
                      t[index] = { ...t[index], year: e.target.value };
                      setData({ ...data, timeline: t });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                  <input type="text" value={milestone.title}
                    onChange={(e) => {
                      const t = [...data.timeline];
                      t[index] = { ...t[index], title: e.target.value };
                      setData({ ...data, timeline: t });
                    }}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Body</label>
                <textarea rows={2} value={milestone.body}
                  onChange={(e) => {
                    const t = [...data.timeline];
                    t[index] = { ...t[index], body: e.target.value };
                    setData({ ...data, timeline: t });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CORE VALUES — 6 cards */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">4. Core Values (6 Cards)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.values.map((value, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-brand-green">Value {index + 1}</span>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input type="text" value={value.title}
                  onChange={(e) => {
                    const v = [...data.values];
                    v[index] = { ...v[index], title: e.target.value };
                    setData({ ...data, values: v });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={value.description}
                  onChange={(e) => {
                    const v = [...data.values];
                    v[index] = { ...v[index], description: e.target.value };
                    setData({ ...data, values: v });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. QUALITY SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">5. Quality Section (3 Cards)</h2>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
          <input type="text" value={data.qualityHeading} onChange={(e) => setData({ ...data, qualityHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.qualityCards.map((card, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-brand-green">Card {index + 1}</span>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input type="text" value={card.title}
                  onChange={(e) => {
                    const q = [...data.qualityCards];
                    q[index] = { ...q[index], title: e.target.value };
                    setData({ ...data, qualityCards: q });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={4} value={card.description}
                  onChange={(e) => {
                    const q = [...data.qualityCards];
                    q[index] = { ...q[index], description: e.target.value };
                    setData({ ...data, qualityCards: q });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white"
                />
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
