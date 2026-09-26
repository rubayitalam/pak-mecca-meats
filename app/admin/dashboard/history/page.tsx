"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { HistoryContent, HistoryMilestone } from "@/types/content";
import toast from "react-hot-toast";
import { defaultHistory } from "@/lib/defaults";
import { Plus, Trash, Sparkles, Clock } from "lucide-react";

export default function AdminHistoryPage() {
  const [data, setData] = useState<HistoryContent>(defaultHistory);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("history");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaultHistory.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultHistory.heroSubheading,
          heroBg: dbData.heroBg || defaultHistory.heroBg,
          timeline: dbData.timeline || defaultHistory.timeline,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("history", data);
    if (success) {
      toast.success("History page saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database permissions.");
    }
    setSaving(false);
  };

  const handleAddMilestone = () => {
    const newMs: HistoryMilestone = {
      year: "2025",
      title: "New Milestone",
      body: "Milestone description goes here...",
      image: "",
    };
    setData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, newMs],
    }));
  };

  const handleRemoveMilestone = (index: number) => {
    setData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateMilestone = (
    index: number,
    field: keyof HistoryMilestone,
    val: string
  ) => {
    setData((prev) => {
      const updated = [...prev.timeline];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, timeline: updated };
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
          <h1 className="text-2xl font-bold text-brand-dark">History Editor</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hero section and timeline milestones (year, title, body narrative, optional image).
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

      {/* 2. TIMELINE EDITOR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-green" /> 2. Timeline Milestones ({data.timeline.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Milestones appear in alternating left/right layout on the history timeline.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddMilestone}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Milestone
          </button>
        </div>

        <div className="space-y-6">
          {data.timeline.map((ms, idx) => (
            <div
              key={idx}
              className="p-5 bg-gray-50 border rounded-lg space-y-4 relative"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs font-bold text-[#C8A400] uppercase tracking-wider">
                  Milestone #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveMilestone(idx)}
                  className="text-brand-red hover:bg-brand-red/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <Trash className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Year / Period
                  </label>
                  <input
                    type="text"
                    value={ms.year}
                    onChange={(e) => handleUpdateMilestone(idx, "year", e.target.value)}
                    placeholder="e.g. 1980"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm font-bold text-brand-dark bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={ms.title}
                    onChange={(e) => handleUpdateMilestone(idx, "title", e.target.value)}
                    placeholder="The Beginnings"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm font-semibold text-brand-dark bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Body Narrative
                </label>
                <textarea
                  rows={3}
                  value={ms.body}
                  onChange={(e) => handleUpdateMilestone(idx, "body", e.target.value)}
                  placeholder="Describe this historical milestone..."
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={ms.image || ""}
                  onChange={(e) => handleUpdateMilestone(idx, "image", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
