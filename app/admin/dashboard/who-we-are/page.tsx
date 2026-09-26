"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { WhoWeAreContent } from "@/types/content";
import toast from "react-hot-toast";
import { defaultWhoWeAre } from "@/lib/defaults";
import { Plus, Trash, Sparkles, FileText, Globe, Heart, CheckSquare } from "lucide-react";

export default function AdminWhoWeArePage() {
  const [data, setData] = useState<WhoWeAreContent>(defaultWhoWeAre);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("who-we-are");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaultWhoWeAre.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultWhoWeAre.heroSubheading,
          heroBg: dbData.heroBg || defaultWhoWeAre.heroBg,
          mainHeading: dbData.mainHeading || defaultWhoWeAre.mainHeading,
          mainBody: dbData.mainBody || defaultWhoWeAre.mainBody,
          mainImage: dbData.mainImage || "",
          trustedHeading: dbData.trustedHeading || defaultWhoWeAre.trustedHeading,
          trustedBody: dbData.trustedBody || defaultWhoWeAre.trustedBody,
          trustedImage: dbData.trustedImage || "",
          valueCards: dbData.valueCards || defaultWhoWeAre.valueCards,
          valueBullets: dbData.valueBullets || defaultWhoWeAre.valueBullets,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("who-we-are", data);
    if (success) {
      toast.success("Who We Are page saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database permissions.");
    }
    setSaving(false);
  };

  // Card helper
  const handleUpdateCardTitle = (index: number, title: string) => {
    setData((prev) => {
      const updated = [...prev.valueCards];
      updated[index] = { ...updated[index], title };
      return { ...prev, valueCards: updated };
    });
  };

  const handleAddCard = () => {
    setData((prev) => ({
      ...prev,
      valueCards: [...prev.valueCards, { title: "New Value Title" }],
    }));
  };

  const handleRemoveCard = (index: number) => {
    setData((prev) => ({
      ...prev,
      valueCards: prev.valueCards.filter((_, idx) => idx !== index),
    }));
  };

  // Bullets helper
  const handleAddBullet = () => {
    setData((prev) => ({
      ...prev,
      valueBullets: [...prev.valueBullets, "New bullet point description..."],
    }));
  };

  const handleRemoveBullet = (index: number) => {
    setData((prev) => ({
      ...prev,
      valueBullets: prev.valueBullets.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateBullet = (index: number, val: string) => {
    setData((prev) => {
      const updated = [...prev.valueBullets];
      updated[index] = val;
      return { ...prev, valueBullets: updated };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Who We Are Editor</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hero text, main content block, trusted worldwide block, core value cards, and bullet descriptions.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 min-h-[44px] flex items-center justify-center text-xs uppercase tracking-wider disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Page"}
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C8A400]" /> 1. Hero Section
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Hero Heading
            </label>
            <input
              type="text"
              value={data.heroHeading}
              onChange={(e) => setData({ ...data, heroHeading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Hero Subheading
            </label>
            <input
              type="text"
              value={data.heroSubheading}
              onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Hero Background Image URL
          </label>
          <input
            type="text"
            value={data.heroBg}
            onChange={(e) => setData({ ...data, heroBg: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
      </div>

      {/* 2. MAIN CONTENT BLOCK */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-green" /> 2. Main Content Block
        </h2>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Heading
          </label>
          <input
            type="text"
            value={data.mainHeading}
            onChange={(e) => setData({ ...data, mainHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Body Text
          </label>
          <textarea
            rows={5}
            value={data.mainBody}
            onChange={(e) => setData({ ...data, mainBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            value={data.mainImage}
            onChange={(e) => setData({ ...data, mainImage: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
      </div>

      {/* 3. TRUSTED WORLDWIDE BLOCK */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-green" /> 3. Trusted Worldwide Block
        </h2>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Heading
          </label>
          <input
            type="text"
            value={data.trustedHeading}
            onChange={(e) => setData({ ...data, trustedHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Body Text
          </label>
          <textarea
            rows={4}
            value={data.trustedBody}
            onChange={(e) => setData({ ...data, trustedBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            value={data.trustedImage}
            onChange={(e) => setData({ ...data, trustedImage: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>
      </div>

      {/* 4. VALUE CARDS EDITOR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-green" /> 4. Value Cards
          </h2>
          <button
            type="button"
            onClick={handleAddCard}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Card
          </button>
        </div>

        <div className="space-y-3">
          {data.valueCards.map((card, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg">
              <span className="text-xs font-bold text-gray-400 w-6 text-center">{idx + 1}.</span>
              <input
                type="text"
                value={card.title}
                onChange={(e) => handleUpdateCardTitle(idx, e.target.value)}
                className="flex-grow px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
              />
              <button
                type="button"
                onClick={() => handleRemoveCard(idx)}
                className="p-2 text-brand-red hover:bg-brand-red/10 rounded"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. VALUE BULLETS EDITOR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-green" /> 5. Value Bullets Descriptions
          </h2>
          <button
            type="button"
            onClick={handleAddBullet}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Bullet
          </button>
        </div>

        <div className="space-y-4">
          {data.valueBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 border rounded-lg">
              <span className="text-xs font-bold text-gray-400 mt-2.5 w-6 text-center">{idx + 1}.</span>
              <textarea
                rows={2}
                value={bullet}
                onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                className="flex-grow px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
              />
              <button
                type="button"
                onClick={() => handleRemoveBullet(idx)}
                className="p-2 text-brand-red hover:bg-brand-red/10 rounded self-center"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
