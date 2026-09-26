"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { AtAGlanceContent, StatItem } from "@/types/content";
import toast from "react-hot-toast";
import { defaultAtAGlance } from "@/lib/defaults";
import { Plus, Trash, Sparkles, BarChart2 } from "lucide-react";

export default function AdminAtAGlancePage() {
  const [data, setData] = useState<AtAGlanceContent>(defaultAtAGlance);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("at-a-glance");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaultAtAGlance.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultAtAGlance.heroSubheading,
          heroBg: dbData.heroBg || defaultAtAGlance.heroBg,
          stats: dbData.stats || defaultAtAGlance.stats,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("at-a-glance", data);
    if (success) {
      toast.success("At a Glance page saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database permissions.");
    }
    setSaving(false);
  };

  const handleAddStat = () => {
    setData((prev) => ({
      ...prev,
      stats: [...prev.stats, { number: "100+", label: "New Stat Label" }],
    }));
  };

  const handleRemoveStat = (index: number) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateStat = (index: number, field: keyof StatItem, val: string) => {
    setData((prev) => {
      const updated = [...prev.stats];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, stats: updated };
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
          <h1 className="text-2xl font-bold text-brand-dark">At a Glance Editor</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hero heading, subheading, background image, and stats grid cards.
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

      {/* 2. STATS GRID EDITOR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-brand-green" /> 2. Key Statistics Grid
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Edit the metric number and label for each bento box card.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 border rounded-lg flex items-center justify-between gap-3"
            >
              <div className="flex-grow grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Number / Metric
                  </label>
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => handleUpdateStat(idx, "number", e.target.value)}
                    className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs font-bold text-brand-dark bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                    className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs text-brand-dark bg-white"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStat(idx)}
                className="p-2 text-brand-red hover:bg-brand-red/10 rounded shrink-0"
                title="Remove stat"
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
