"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { CommunityContent, CommunityCharitySection } from "@/types/content";
import toast from "react-hot-toast";
import { defaultCommunity } from "@/lib/defaults";
import { Plus, Trash, Sparkles, Heart, MessageSquare, HandHeart } from "lucide-react";

export default function AdminCommunityPage() {
  const [data, setData] = useState<CommunityContent>(defaultCommunity);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("community");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaultCommunity.heroHeading,
          heroSubheading: dbData.heroSubheading || defaultCommunity.heroSubheading,
          heroBg: dbData.heroBg || defaultCommunity.heroBg,
          introText: dbData.introText || defaultCommunity.introText,
          charitySections: dbData.charitySections || defaultCommunity.charitySections,
          reviews: dbData.reviews || defaultCommunity.reviews,
          galleryImages: dbData.galleryImages || defaultCommunity.galleryImages,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("community", data);
    if (success) {
      toast.success("Community Responsibility page saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database permissions.");
    }
    setSaving(false);
  };

  // Charity Section helpers
  const handleAddCharitySection = () => {
    const newSec: CommunityCharitySection = {
      heading: "New Community Initiative",
      body: "Description of community initiative...",
      stat: "100+",
      statLabel: "People impacted",
      quote: "Quote from charity partner...",
      quoteAuthor: "Partner Name",
      image: "",
    };
    setData((prev) => ({
      ...prev,
      charitySections: [...prev.charitySections, newSec],
    }));
  };

  const handleRemoveCharitySection = (index: number) => {
    setData((prev) => ({
      ...prev,
      charitySections: prev.charitySections.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateCharitySection = (
    index: number,
    field: keyof CommunityCharitySection,
    val: string
  ) => {
    setData((prev) => {
      const updated = [...prev.charitySections];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, charitySections: updated };
    });
  };

  // Gallery Images helpers
  const handleAddGalleryImage = () => {
    setData((prev) => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), ""],
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateGalleryImage = (index: number, val: string) => {
    setData((prev) => {
      const updated = [...(prev.galleryImages || [])];
      updated[index] = val;
      return { ...prev, galleryImages: updated };
    });
  };

  // Review helpers
  const handleAddReview = () => {
    setData((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        { name: "Partner Organisation", message: "Gratitude message..." },
      ],
    }));
  };

  const handleRemoveReview = (index: number) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateReview = (
    index: number,
    field: "name" | "message" | "image",
    val: string
  ) => {
    setData((prev) => {
      const updated = [...prev.reviews];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, reviews: updated };
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
          <h1 className="text-2xl font-bold text-brand-dark">
            Community Responsibility Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hero section, intro statement, charity initiative blocks, photo gallery images, stats, and reviews.
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

      {/* 2. INTRO STATEMENT EDITOR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2 flex items-center gap-2">
          <HandHeart className="w-5 h-5 text-brand-green" /> 2. Intro Statement
        </h2>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Centered Bold Intro Text
          </label>
          <textarea
            rows={3}
            value={data.introText}
            onChange={(e) => setData({ ...data, introText: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm font-semibold bg-white text-brand-dark"
          />
        </div>
      </div>

      {/* 3. CHARITY INITIATIVE SECTIONS */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-green" /> 3. Charity &amp; Community Sections ({data.charitySections.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Includes heading, narrative body, highlighted stat box, pull quote, and initiative image URL.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddCharitySection}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Initiative
          </button>
        </div>

        <div className="space-y-6">
          {data.charitySections.map((sec, idx) => (
            <div
              key={idx}
              className="p-5 bg-gray-50 border rounded-lg space-y-4 relative"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs font-bold text-[#C8A400] uppercase tracking-wider">
                  Initiative #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveCharitySection(idx)}
                  className="text-brand-red hover:bg-brand-red/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <Trash className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={sec.heading}
                  onChange={(e) =>
                    handleUpdateCharitySection(idx, "heading", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm font-semibold text-brand-dark bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Body Text
                </label>
                <textarea
                  rows={4}
                  value={sec.body}
                  onChange={(e) =>
                    handleUpdateCharitySection(idx, "body", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Stat Metric (e.g. &quot;60&quot; or &quot;+16,000&quot;)
                  </label>
                  <input
                    type="text"
                    value={sec.stat}
                    onChange={(e) =>
                      handleUpdateCharitySection(idx, "stat", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm font-bold text-brand-dark bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Stat Label
                  </label>
                  <input
                    type="text"
                    value={sec.statLabel}
                    onChange={(e) =>
                      handleUpdateCharitySection(idx, "statLabel", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Pull Quote (Gold Italic Styling)
                  </label>
                  <textarea
                    rows={2}
                    value={sec.quote}
                    onChange={(e) =>
                      handleUpdateCharitySection(idx, "quote", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm italic bg-white text-brand-dark"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Quote Author
                  </label>
                  <input
                    type="text"
                    value={sec.quoteAuthor}
                    onChange={(e) =>
                      handleUpdateCharitySection(idx, "quoteAuthor", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm font-semibold bg-white text-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Initiative Image URL
                </label>
                <input
                  type="text"
                  value={sec.image || ""}
                  onChange={(e) =>
                    handleUpdateCharitySection(idx, "image", e.target.value)
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. COMMUNITY PHOTO GALLERY IMAGES */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C8A400]" /> 4. Community Photo Gallery Images ({data.galleryImages?.length || 0})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Add image URLs to display in the Community in Action photo grid on the public page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddGalleryImage}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image URL
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data.galleryImages || []).map((imgUrl, idx) => (
            <div key={idx} className="p-4 bg-gray-50 border rounded-lg space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#C8A400] uppercase">
                  Image #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(idx)}
                  className="text-brand-red hover:bg-brand-red/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <Trash className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => handleUpdateGalleryImage(idx, e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
              />
              {imgUrl && (
                <div className="relative h-28 w-full rounded overflow-hidden border border-gray-200 mt-2 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={`Community photo ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. REVIEWS / MESSAGES OF GRATITUDE EDITOR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-green" /> 5. Messages of Gratitude
          </h2>
          <button
            type="button"
            onClick={handleAddReview}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Message
          </button>
        </div>

        <div className="space-y-4">
          {data.reviews.map((rev, idx) => (
            <div key={idx} className="p-4 bg-gray-50 border rounded-lg space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs font-bold text-[#C8A400] uppercase">
                  Message #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveReview(idx)}
                  className="text-brand-red hover:bg-brand-red/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <Trash className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Sender / Author Name
                </label>
                <input
                  type="text"
                  value={rev.name}
                  onChange={(e) => handleUpdateReview(idx, "name", e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs font-bold text-brand-dark bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Message Content
                </label>
                <textarea
                  rows={3}
                  value={rev.message}
                  onChange={(e) => handleUpdateReview(idx, "message", e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs text-brand-dark bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  Author / Event Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={rev.image || ""}
                  onChange={(e) => handleUpdateReview(idx, "image", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                />
                {rev.image && (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-200 mt-2 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rev.image} alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
