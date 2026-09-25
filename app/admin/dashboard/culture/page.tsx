"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { CultureContent, CultureGalleryImage, CultureReview } from "@/types/content";
import toast from "react-hot-toast";
import {
  Plus,
  Trash,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Heart,
  Sparkles,
  BarChart2,
} from "lucide-react";

const defaults: CultureContent = {
  heroHeading: "Our Culture",
  heroSubheading: "People, Community & Purpose",
  heroBg: "",

  workCultureHeading: "Our Work Culture",
  workCultureBody:
    "At Pak Mecca Meats, we work together as one team and take pride in creating an environment where people can learn, develop and grow. Our workforce brings together people from different backgrounds, cultures and experiences, and we believe this diversity strengthens our team. We are committed to creating an inclusive workplace where everyone is treated with respect and given the support they need to succeed. We recognise that people learn and communicate in different ways. That is why we work to provide clear guidance, appropriate training and accessible learning materials, helping every member of our team understand their role and perform their job confidently and effectively. We take pride in encouraging our people to develop new skills, build on their strengths and gain valuable experience. Through teamwork, shared knowledge and continuous learning, we aim to create opportunities for our people to progress as our business grows. Our culture is built on teamwork, inclusion, respect, development and pride in what we do.",
  workCultureImages: [],

  communityHeading: "Looking After Our Community",
  communityBody:
    "At Pak Mecca Meats, giving back to our community is an important part of who we are. As a family business with strong roots in Birmingham, we believe our responsibility goes beyond the work we do every day. We are proud to support local charities and community organisations that provide food, care, support and positive experiences for people who need them most. We work closely with Let's Feed Brum, supporting initiatives that reach some of the most vulnerable members of our community, including people experiencing homelessness, refugees, and women and families who have experienced domestic violence and spent time in shelters. We have also been proud to support the Refugee Run Club, an initiative that brings people together through activity, friendship and a sense of community. Our support can take many forms, from food and ingredient donations to supporting charitable events and community initiatives. For us, it is about using what we have as a business to make a meaningful difference.",
  communityImages: [],

  womenHeading: "Supporting Women in Our Community",
  womenBody:
    "One initiative particularly close to our hearts was supporting an International Women's Day celebration for 60 women who had experienced domestic violence. The event provided an opportunity for women who had been through incredibly difficult circumstances to come together, celebrate and simply enjoy a day dedicated to them. As Pak Mecca Meats continues to grow, we want our contribution to our community to grow with us. We remain committed to supporting worthwhile causes, strengthening our relationships with local organisations and helping where we can. For us, giving back is not about recognition. It is about looking after the community around us, sharing what we have and helping make a difference where it matters.",
  womenImages: [],

  reviews: [
    {
      name: "Alan & Katherine — Let's Feed Brum",
      message:
        "Wow - Adeela and Aman. Thank you so so very much for all your kindness support and generosity. The meal you provided us today to support the women and children survivors of domestic abuse and violence was perfect. Everyone enjoyed it and are grateful for all your support. Thanks again for everything. Much love.",
    },
    {
      name: "Alan & Katherine",
      message:
        "Thank you both so so much for your kindness today. Everything went very well we had 60 women victims of domestic violence celebrating World Women's Day. It was very nice to be able to provide a little bit of joy to this vulnerable group. Thank you for all your kind support. Much love.",
    },
    {
      name: "Alan — Let's Feed Brum & Refugee Run Club",
      message:
        "On behalf of Katherine myself and our charities Let's Feed Brum and the Refugee Run Club I just wanted to thank you and everyone at Pak Mecca for all your incredible support. We had a wonderful day supporting those in need and giving them a day to remember. Thank you for all your kindness.",
    },
  ],

  stats: [
    { number: "1982", label: "Established in Birmingham" },
    { number: "800,000", label: "Sheep processed annually" },
    { number: "3,500", label: "Daily processing capacity" },
    { number: "62", label: "UK livestock markets sourced from" },
    { number: "1,500+", label: "Shops supplied across the UK" },
    { number: "200+", label: "Employees" },
    { number: "10", label: "Countries supplied" },
    { number: "HMC", label: "Halal Certified" },
  ],
};

export default function CultureDashboardEditor() {
  const [data, setData] = useState<CultureContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("culture");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaults.heroHeading,
          heroSubheading: dbData.heroSubheading || defaults.heroSubheading,
          heroBg: dbData.heroBg || defaults.heroBg,
          workCultureHeading: dbData.workCultureHeading || defaults.workCultureHeading,
          workCultureBody: dbData.workCultureBody || defaults.workCultureBody,
          workCultureImages: dbData.workCultureImages || defaults.workCultureImages || [],
          communityHeading: dbData.communityHeading || defaults.communityHeading,
          communityBody: dbData.communityBody || defaults.communityBody,
          communityImages: dbData.communityImages || defaults.communityImages || [],
          womenHeading: dbData.womenHeading || defaults.womenHeading,
          womenBody: dbData.womenBody || defaults.womenBody,
          womenImages: dbData.womenImages || defaults.womenImages || [],
          reviews: dbData.reviews || defaults.reviews || [],
          stats: dbData.stats || defaults.stats || [],
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("culture", data);
    if (success) {
      toast.success("Culture page content saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database permissions.");
    }
    setSaving(false);
  };

  // Generic Image Gallery Helpers
  const handleAddImage = (
    section: "workCultureImages" | "communityImages" | "womenImages"
  ) => {
    const newImg: CultureGalleryImage = {
      url: "",
      caption: "",
    };
    setData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newImg],
    }));
  };

  const handleRemoveImage = (
    section: "workCultureImages" | "communityImages" | "womenImages",
    index: number
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateImage = (
    section: "workCultureImages" | "communityImages" | "womenImages",
    index: number,
    field: keyof CultureGalleryImage,
    val: string
  ) => {
    setData((prev) => {
      const updated = [...prev[section]];
      updated[index] = {
        ...updated[index],
        [field]: val,
      };
      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  // Reviews Helpers
  const handleAddReview = () => {
    const newRev: CultureReview = {
      name: "Sender Name / Organization",
      message: "Message text of gratitude...",
      image: "",
    };
    setData((prev) => ({
      ...prev,
      reviews: [...(prev.reviews || []), newRev],
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
    field: keyof CultureReview,
    val: string
  ) => {
    setData((prev) => {
      const updated = [...prev.reviews];
      updated[index] = {
        ...updated[index],
        [field]: val,
      };
      return {
        ...prev,
        reviews: updated,
      };
    });
  };

  // Stats Helpers
  const handleAddStat = () => {
    setData((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { number: "100+", label: "New Stat Label" }],
    }));
  };

  const handleRemoveStat = (index: number) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateStat = (
    index: number,
    field: "number" | "label",
    val: string
  ) => {
    setData((prev) => {
      const updated = [...prev.stats];
      updated[index] = {
        ...updated[index],
        [field]: val,
      };
      return {
        ...prev,
        stats: updated,
      };
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Culture Page Editor</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage workplace values, community support initiatives, women empowerment, gratitude reviews, and stats.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 min-h-[44px] flex items-center justify-center text-xs uppercase tracking-wider disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Culture Page"}
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
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm mb-2 bg-white text-brand-dark"
          />
          {data.heroBg && (
            <div className="relative w-full h-40 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.heroBg}
                alt="Hero Background Preview"
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. OUR WORK CULTURE SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="border-b pb-2 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-green" /> 2. Our Work Culture
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Edit the heading, narrative, and showcase gallery images.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleAddImage("workCultureImages")}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Section Heading
          </label>
          <input
            type="text"
            value={data.workCultureHeading}
            onChange={(e) => setData({ ...data, workCultureHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Body Text
          </label>
          <textarea
            rows={6}
            value={data.workCultureBody}
            onChange={(e) => setData({ ...data, workCultureBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        {/* Gallery Images List */}
        <div className="space-y-4 pt-2">
          <label className="block text-xs font-bold text-gray-700 uppercase">
            Work Culture Gallery ({data.workCultureImages?.length || 0})
          </label>
          {data.workCultureImages && data.workCultureImages.length > 0 ? (
            <div className="space-y-4">
              {data.workCultureImages.map((img, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="w-24 h-20 rounded border overflow-hidden bg-gray-200 shrink-0 relative flex items-center justify-center">
                    {img.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.url}
                        alt="Gallery preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={img.url}
                        placeholder="https://images.unsplash.com/..."
                        onChange={(e) =>
                          handleUpdateImage("workCultureImages", idx, "url", e.target.value)
                        }
                        className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Caption (Optional)
                      </label>
                      <input
                        type="text"
                        value={img.caption || ""}
                        placeholder="Image caption or subtitle"
                        onChange={(e) =>
                          handleUpdateImage("workCultureImages", idx, "caption", e.target.value)
                        }
                        className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("workCultureImages", idx)}
                    className="p-2 text-brand-red hover:bg-brand-red/10 rounded transition-colors self-center shrink-0"
                    title="Remove image"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No images in this gallery.</p>
          )}
        </div>
      </div>

      {/* 3. STATS STRIP SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="border-b pb-2 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-brand-green" /> 3. Key Statistics Strip
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Displayed as an editorial horizontal green strip on the culture page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.stats &&
            data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 border rounded-lg flex items-center gap-3"
              >
                <div className="flex-grow grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                      Stat Number / Metric
                    </label>
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleUpdateStat(idx, "number", e.target.value)}
                      className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs font-bold text-brand-dark bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                      Label / Description
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
                  className="p-1.5 text-brand-red hover:bg-brand-red/10 rounded transition-colors"
                  title="Remove stat"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* 4. LOOKING AFTER OUR COMMUNITY SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="border-b pb-2 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-green" /> 4. Community Support Section
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Highlight partnerships with Let&apos;s Feed Brum and local initiatives.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleAddImage("communityImages")}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Section Heading
          </label>
          <input
            type="text"
            value={data.communityHeading}
            onChange={(e) => setData({ ...data, communityHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Body Text
          </label>
          <textarea
            rows={6}
            value={data.communityBody}
            onChange={(e) => setData({ ...data, communityBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        {/* Gallery Images List */}
        <div className="space-y-4 pt-2">
          <label className="block text-xs font-bold text-gray-700 uppercase">
            Community Gallery ({data.communityImages?.length || 0})
          </label>
          {data.communityImages && data.communityImages.length > 0 ? (
            <div className="space-y-4">
              {data.communityImages.map((img, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="w-24 h-20 rounded border overflow-hidden bg-gray-200 shrink-0 relative flex items-center justify-center">
                    {img.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.url}
                        alt="Gallery preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={img.url}
                        placeholder="https://images.unsplash.com/..."
                        onChange={(e) =>
                          handleUpdateImage("communityImages", idx, "url", e.target.value)
                        }
                        className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Caption (Optional)
                      </label>
                      <input
                        type="text"
                        value={img.caption || ""}
                        placeholder="Image caption or subtitle"
                        onChange={(e) =>
                          handleUpdateImage("communityImages", idx, "caption", e.target.value)
                        }
                        className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("communityImages", idx)}
                    className="p-2 text-brand-red hover:bg-brand-red/10 rounded transition-colors self-center shrink-0"
                    title="Remove image"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No images in this gallery.</p>
          )}
        </div>
      </div>

      {/* 5. SUPPORTING WOMEN SECTION */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="border-b pb-2 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green" /> 5. Supporting Women Section
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Highlight events, shelters support, and empowerment initiatives.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleAddImage("womenImages")}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Section Heading
          </label>
          <input
            type="text"
            value={data.womenHeading}
            onChange={(e) => setData({ ...data, womenHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Body Text
          </label>
          <textarea
            rows={6}
            value={data.womenBody}
            onChange={(e) => setData({ ...data, womenBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        {/* Gallery Images List */}
        <div className="space-y-4 pt-2">
          <label className="block text-xs font-bold text-gray-700 uppercase">
            Women Empowerment Gallery ({data.womenImages?.length || 0})
          </label>
          {data.womenImages && data.womenImages.length > 0 ? (
            <div className="space-y-4">
              {data.womenImages.map((img, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="w-24 h-20 rounded border overflow-hidden bg-gray-200 shrink-0 relative flex items-center justify-center">
                    {img.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.url}
                        alt="Gallery preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={img.url}
                        placeholder="https://images.unsplash.com/..."
                        onChange={(e) =>
                          handleUpdateImage("womenImages", idx, "url", e.target.value)
                        }
                        className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Caption (Optional)
                      </label>
                      <input
                        type="text"
                        value={img.caption || ""}
                        placeholder="Image caption or subtitle"
                        onChange={(e) =>
                          handleUpdateImage("womenImages", idx, "caption", e.target.value)
                        }
                        className="w-full px-2 py-1.5 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("womenImages", idx)}
                    className="p-2 text-brand-red hover:bg-brand-red/10 rounded transition-colors self-center shrink-0"
                    title="Remove image"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No images in this gallery.</p>
          )}
        </div>
      </div>

      {/* 6. MESSAGES OF GRATITUDE & REVIEWS */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="border-b pb-2 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-green" /> 6. Words From Those We&apos;ve Supported
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage testimonials and messages of appreciation from supported charities.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddReview}
            className="px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Review
          </button>
        </div>

        {data.reviews && data.reviews.length > 0 ? (
          <div className="space-y-6">
            {data.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 bg-gray-50 border rounded-lg space-y-4 relative"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-bold uppercase text-brand-green">
                    Message #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveReview(idx)}
                    className="text-brand-red hover:bg-brand-red/10 px-2 py-1 rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors"
                  >
                    <Trash className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      Sender Name / Organisation
                    </label>
                    <input
                      type="text"
                      value={rev.name}
                      onChange={(e) => handleUpdateReview(idx, "name", e.target.value)}
                      placeholder="Alan & Katherine — Let's Feed Brum"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs font-semibold text-brand-dark bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      Optional Image URL
                    </label>
                    <input
                      type="text"
                      value={rev.image || ""}
                      onChange={(e) => handleUpdateReview(idx, "image", e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs text-brand-dark bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    Message Text
                  </label>
                  <textarea
                    rows={3}
                    value={rev.message}
                    onChange={(e) => handleUpdateReview(idx, "message", e.target.value)}
                    placeholder="Enter message of gratitude here..."
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs text-brand-dark bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No reviews created yet.</p>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full md:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow-lg transition-all duration-200 min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {saving ? "Saving Changes..." : "Save Culture Page Content"}
      </button>
    </div>
  );
}
