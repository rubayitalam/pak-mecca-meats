"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { getPageContent } from "@/lib/firestore";
import { MediaContent } from "@/types/content";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const defaults: MediaContent = {
  heroHeading: "Media & Press",
  heroSubheading: "Latest Updates and Social Highlights",
  heroBg: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600",
  instagramUrls: [
    "https://www.instagram.com/reel/C8_zJ5jM_p-/",
    "https://www.instagram.com/p/C66c1S_sgwA/",
    "https://www.instagram.com/reel/C57d_hssKee/",
  ],
  blogs: [
    {
      title: "Pak Mecca Meats Expands Central Birmingham Processing Plant",
      date: "June 15, 2026",
      description: "To meet the growing global demand for premium British Halal lamb and mutton carcasses, we have expanded our central Birmingham production line, adding 15,000 sq ft and creating 50 new jobs.",
      link: "/about",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    },
    {
      title: "Understanding Halal Monitoring Committee (HMC) Standards",
      date: "May 28, 2026",
      description: "A comprehensive look at what HMC accreditation means for consumers and how Pak Mecca Meats implements strict Shariah compliance from farm to plate.",
      link: "/assurance",
      image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800",
    },
    {
      title: "From Birmingham to the Middle East: Our Global Export Logistics",
      date: "April 10, 2026",
      description: "Processing 15,000–20,000 carcasses weekly is only half the battle. Discover the specialized cold chain logistics that keep our lamb and mutton fresh from Birmingham to international markets.",
      link: "/about",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    }
  ]
};

const getInstagramEmbedUrl = (url: string) => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && (parts[0] === "p" || parts[0] === "reel" || parts[0] === "tv")) {
      return `https://www.instagram.com/${parts[0]}/${parts[1]}/embed`;
    }
    if (parts.length === 1) {
      return `https://www.instagram.com/p/${parts[0]}/embed`;
    }
  } catch {}
  
  const cleanUrl = url.trim().split("?")[0];
  return cleanUrl.endsWith("/") ? `${cleanUrl}embed` : `${cleanUrl}/embed`;
};

const appendTimestamp = (url: string, ts: number) => {
  if (!url || !ts) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("t", ts.toString());
    return urlObj.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}t=${ts}`;
  }
};

export default function MediaPage() {
  const [content, setContent] = useState<MediaContent>(defaults);
  const [imgTimestamp, setImgTimestamp] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("media");
      if (dbContent) {
        setContent({
          heroHeading: dbContent.heroHeading || defaults.heroHeading,
          heroSubheading: dbContent.heroSubheading || defaults.heroSubheading,
          heroBg: dbContent.heroBg || defaults.heroBg,
          instagramUrls: dbContent.instagramUrls || defaults.instagramUrls,
          blogs: dbContent.blogs || defaults.blogs,
        });
        setImgTimestamp(Date.now());
      } else {
        setImgTimestamp(Date.now());
      }
    }
    loadContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        bgImage={appendTimestamp(content.heroBg, imgTimestamp)}
      />

      {/* Editorial Instagram Social Section */}
      <section className="py-20 lg:py-32 bg-[#1A1A1A] border-y border-[#C8A400]/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-16 text-center md:text-left">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              Social Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-wide uppercase">
              Instagram Reels & Feed
            </h2>
            <p className="text-gray-400 text-sm font-light mt-3 leading-relaxed">
              Stay updated with our latest media reels, processing insights, and direct farm-to-table snippets. Follow us on Instagram for daily coverage.
            </p>
          </div>

          {content.instagramUrls && content.instagramUrls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.instagramUrls.map((url, index) => {
                const embedUrl = getInstagramEmbedUrl(url);
                if (!embedUrl) return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : (index % 3) * 0.1 }}
                    className="bg-black border border-[#C8A400]/20 rounded-lg overflow-hidden flex flex-col justify-center shadow-lg relative min-h-[480px] group hover:border-[#C8A400]/50 transition-all duration-300"
                  >
                    <iframe
                      src={embedUrl}
                      className="w-full h-[480px] border-0 overflow-hidden"
                      scrolling="no"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-lg bg-white/5">
              <p className="text-gray-500 text-sm">No Instagram posts embedded at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* News & Blog Editorial Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-16 text-center md:text-left">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              Press Releases
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-wide uppercase">
              Latest News & Blog
            </h2>
            <div className="h-[1px] w-20 bg-[#C8A400] mt-4 hidden md:block" />
          </div>

          {content.blogs && content.blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.blogs.map((blog, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : (index % 3) * 0.15 }}
                  className="bg-[#1A1A1A] border border-[#C8A400]/20 overflow-hidden flex flex-col h-full group hover:border-[#C8A400] transition-all duration-300 shadow-xl"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={appendTimestamp(blog.image, imgTimestamp)}
                      alt={blog.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between bg-brand-dark min-h-[220px]">
                    <div>
                      <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
                        {blog.date}
                      </span>
                      <h3 className="text-white text-lg font-light tracking-wide mb-3 line-clamp-2 uppercase group-hover:text-[#C8A400] transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-3">
                        {blog.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5">
                      <Link
                        href={blog.link}
                        className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#C8A400] hover:text-white transition-colors duration-300 group/link"
                      >
                        Read Article
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <p className="text-gray-400 text-sm">No blog entries found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
