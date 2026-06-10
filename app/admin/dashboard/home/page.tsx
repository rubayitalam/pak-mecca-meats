"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { HomeContent } from "@/types/content";
import toast from "react-hot-toast";

interface ExtendedHomeContent extends HomeContent {
  heroVideo?: {
    heading: string;
    subtext: string;
    buttonText: string;
    buttonLink: string;
    videoUrl: string;
  };
}

const defaults: ExtendedHomeContent = {
  heroVideo: {
    heading: "See How We Work",
    subtext: "From farm to plate — watch how Pak Mecca Meats delivers premium halal quality every single day.",
    buttonText: "Learn More",
    buttonLink: "/about",
    videoUrl: "",
  },
  heroHeading: "Premium Halal Lamb & Mutton",
  heroSubheading: "Trusted Worldwide Since 1980",
  heroBody:
    "Pak Mecca Meats Ltd stands as a prominent supplier of high-quality lamb and mutton carcasses globally. Processing 15,000–20,000 carcasses per week, we proudly serve communities in the UK, mainland Europe, the Middle East, and beyond.",
  heroBg: "https://images.unsplash.com/photo-1624991954017-b0e1c09e2c6e?w=1600",
  features: [
    { title: "HMC Halal Certified", description: "Certified by the Halal Monitoring Committee — the most established Halal accreditation body in the EU, ensuring full Shariah compliance from farm to plate.", image: "" } as any,
    { title: "Global Supplier Since 1980", description: "From humble beginnings in South Wales to supplying the UK, mainland Europe, the Middle East and beyond — a legacy built on trust and quality.", image: "" } as any,
    { title: "15,000–20,000 Carcasses/Week", description: "Our specialist Birmingham facilities and 150+ dedicated colleagues process an impressive volume while upholding the highest quality standards.", image: "" } as any,
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

interface SiteSettingsState {
  logoUrl: string;
  siteName: string;
  tagline: string;
}

export default function HomeEditor() {
  const [data, setData] = useState<ExtendedHomeContent>(defaults);
  const [settings, setSettings] = useState<SiteSettingsState>({
    logoUrl: "/logo.png",
    siteName: "Pak Mecca Meats",
    tagline: "Honouring Tradition With Unmatched Quality",
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    async function load() {
      // Load homepage content
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
          heroVideo: dbData.heroVideo ? {
            heading: dbData.heroVideo.heading ?? defaults.heroVideo?.heading,
            subtext: dbData.heroVideo.subtext ?? defaults.heroVideo?.subtext,
            buttonText: dbData.heroVideo.buttonText ?? defaults.heroVideo?.buttonText,
            buttonLink: dbData.heroVideo.buttonLink ?? defaults.heroVideo?.buttonLink,
            videoUrl: dbData.heroVideo.videoUrl ?? defaults.heroVideo?.videoUrl,
          } : defaults.heroVideo,
        });
      }

      // Load site settings
      const dbSettings = await getPageContent("settings");
      if (dbSettings) {
        setSettings({
          logoUrl: dbSettings.logoUrl || "/logo.png",
          siteName: dbSettings.siteName || "Pak Mecca Meats",
          tagline: dbSettings.tagline || "Honouring Tradition With Unmatched Quality",
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

  const updateHeroVideo = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      heroVideo: {
        heading: prev.heroVideo?.heading ?? defaults.heroVideo?.heading ?? "",
        subtext: prev.heroVideo?.subtext ?? defaults.heroVideo?.subtext ?? "",
        buttonText: prev.heroVideo?.buttonText ?? defaults.heroVideo?.buttonText ?? "",
        buttonLink: prev.heroVideo?.buttonLink ?? defaults.heroVideo?.buttonLink ?? "",
        videoUrl: prev.heroVideo?.videoUrl ?? defaults.heroVideo?.videoUrl ?? "",
        [field]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    const success = await savePageContent("settings", settings);
    if (success) {
      toast.success("Site settings saved successfully!");
    } else {
      toast.error("Failed to save site settings. Check permissions.");
    }
    setSavingSettings(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  // Resolve preview logo URL locally if default "/logo.png" is used
  const previewLogoUrl = settings.logoUrl === "/logo.png" ? "/Pak Mecca Logo.png" : settings.logoUrl;

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Dashboard home</h1>
        <p className="text-gray-500 text-sm mt-1">Manage global site settings and homepage content.</p>
      </div>

      {/* SITE SETTINGS (At the top) */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">Site Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Logo URL</label>
              <input
                type="text"
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                placeholder="/logo.png"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                placeholder="Pak Mecca Meats"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                placeholder="Honouring Tradition With Unmatched Quality"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border border-dashed border-gray-200 p-4 rounded h-full bg-gray-50 min-h-[180px]">
            <span className="text-xs text-gray-400 mb-3">Logo Preview (80px)</span>
            <div className="relative h-20 w-20 flex items-center justify-center bg-gray-900 border border-gray-800 rounded p-1 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewLogoUrl}
                alt="Logo Preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={savingSettings}
          className="px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 text-xs uppercase tracking-wider disabled:opacity-50"
        >
          {savingSettings ? "Saving Settings..." : "Save Settings"}
        </button>
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Subheading</label>
            <input
              type="text"
              value={data.heroSubheading}
              onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Body Text</label>
          <textarea
            rows={3}
            value={data.heroBody}
            onChange={(e) => setData({ ...data, heroBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Background Image URL</label>
          <input
            type="text"
            value={data.heroBg}
            onChange={(e) => setData({ ...data, heroBg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark mb-2"
          />
          {data.heroBg && (
            <div className="relative w-full h-40 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroBg} alt="Hero Background Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 2. HERO SECTION 2 (VIDEO) */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">2. Hero Section 2 (Video)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
            <input
              type="text"
              value={data.heroVideo?.heading ?? ""}
              onChange={(e) => updateHeroVideo("heading", e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Button Text</label>
            <input
              type="text"
              value={data.heroVideo?.buttonText ?? ""}
              onChange={(e) => updateHeroVideo("buttonText", e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Button Link</label>
            <input
              type="text"
              value={data.heroVideo?.buttonLink ?? ""}
              onChange={(e) => updateHeroVideo("buttonLink", e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Video URL</label>
            <input
              type="text"
              placeholder="https://res.cloudinary.com/... or /hero-video.mp4"
              value={data.heroVideo?.videoUrl ?? ""}
              onChange={(e) => updateHeroVideo("videoUrl", e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
            />
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              💡 For local videos: upload your .mp4 file to the <code className="bg-gray-100 px-1 py-0.5 rounded">/public</code> folder in your project, then enter <code className="bg-gray-100 px-1 py-0.5 rounded">/filename.mp4</code><br />
              For cloud videos: upload to Cloudinary.com (free) and paste the URL here
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Subtext</label>
          <textarea
            rows={3}
            value={data.heroVideo?.subtext ?? ""}
            onChange={(e) => updateHeroVideo("subtext", e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        {data.heroVideo?.videoUrl && (
          <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
            <span className="block text-xs font-bold text-gray-700 uppercase mb-2">Video Preview</span>
            <div className="relative h-[200px] w-full max-w-md border rounded overflow-hidden bg-black">
              <video
                key={data.heroVideo.videoUrl}
                src={data.heroVideo.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. FEATURE CARDS */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">3. Feature Section Content (3 Alternating Blocks)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.features.map((feature, index) => (
            <div key={index} className="p-4 bg-brand-light rounded border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-brand-green">Block {index + 1}</span>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...data.features];
                    newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                    setData({ ...data, features: newFeatures });
                  }}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
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
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Block Image URL</label>
                <input
                  type="text"
                  value={(feature as any).image || ""}
                  onChange={(e) => {
                    const newFeatures = [...data.features];
                    newFeatures[index] = { ...newFeatures[index], image: e.target.value } as any;
                    setData({ ...data, features: newFeatures });
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                />
                {(feature as any).image && (
                  <div className="relative w-[80px] h-[80px] rounded border overflow-hidden mt-2 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(feature as any).image}
                      alt={`Block ${index + 1} Preview`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ABOUT SNIPPET */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">4. About Us Snippet</h2>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
          <input
            type="text"
            value={data.aboutHeading}
            onChange={(e) => setData({ ...data, aboutHeading: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Body Text</label>
          <textarea
            rows={4}
            value={data.aboutBody}
            onChange={(e) => setData({ ...data, aboutBody: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Image URL</label>
          <input
            type="text"
            value={data.aboutImg}
            onChange={(e) => setData({ ...data, aboutImg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark mb-2"
          />
          {data.aboutImg && (
            <div className="relative w-48 h-32 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.aboutImg} alt="About Section Image Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 5. STATS BAR */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">5. Stats Bar (4 Statistics)</h2>

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
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark font-bold"
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
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. PRODUCTS PREVIEW */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">6. Products Preview (3 Items)</h2>

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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
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
        className="w-full md:w-auto px-8 py-3 bg-[#1B5E20] hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {saving ? "Saving Content..." : "Save Homepage Content"}
      </button>
    </div>
  );
}
