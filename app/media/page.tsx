"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { getPageContent } from "@/lib/firestore";
import { MediaContent } from "@/types/content";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

const defaults: MediaContent = {
  heroHeading: "Media & Press",
  heroSubheading: "Latest Updates and Social Highlights",
  heroBg: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600",
  instagramPosts: [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Watch our corporate video summarizing our central Birmingham processing capabilities.",
    },
    {
      url: "https://www.instagram.com/p/C66c1S_sgwA/",
      thumbnail: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
      caption: "Certified by the Halal Monitoring Committee (HMC). Farms, transport, slaughter, and processing under strict supervision.",
    },
    {
      url: "https://www.facebook.com/PMM/posts/12345678",
      thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600",
      caption: "Exporting premium lamb & mutton carcasses to Europe, the Middle East, and beyond.",
    },
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

const getYoutubeId = (url: string): string | null => {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  } catch {
    return null;
  }
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

function MediaCard({ post, imgTimestamp }: { post: MediaContent["instagramPosts"][0]; imgTimestamp: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytId = getYoutubeId(post.url);
  const isYoutube = ytId !== null;

  const thumbnail = post.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "");

  if (isYoutube && isPlaying) {
    return (
      <div className="flex flex-col h-full bg-[#151515] border border-[#C8A400]/40 rounded-lg overflow-hidden shadow-xl">
        <div className="relative h-64 w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {post.caption && (
          <div className="p-5 flex-grow bg-[#151515] border-t border-white/5 flex items-center">
            <p className="text-gray-300 text-xs font-light leading-relaxed line-clamp-2 italic">
              &ldquo;{post.caption}&rdquo;
            </p>
          </div>
        )}
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isYoutube) {
      e.preventDefault();
      setIsPlaying(true);
    }
  };

  return (
    <a
      href={post.url}
      target={isYoutube ? undefined : "_blank"}
      rel={isYoutube ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className="flex flex-col h-full bg-[#151515] border border-[#C8A400]/20 rounded-lg overflow-hidden group hover:border-[#C8A400]/50 transition-all duration-300 shadow-xl cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-black">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={appendTimestamp(thumbnail, imgTimestamp)}
            alt={post.caption || "Media post"}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-gray-500 text-xs">
            No Thumbnail Provided
          </div>
        )}
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#C8A400] text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
            <Play className="w-6 h-6 fill-black ml-0.5 text-black" />
          </div>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="p-5 flex-grow bg-[#151515] border-t border-white/5 flex items-center">
          <p className="text-gray-300 text-xs font-light leading-relaxed line-clamp-2 italic">
            &ldquo;{post.caption}&rdquo;
          </p>
        </div>
      )}
    </a>
  );
}

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
          instagramPosts: dbContent.instagramPosts || defaults.instagramPosts || [],
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

      {/* Editorial Media Social Section */}
      <section className="py-20 lg:py-32 bg-[#1A1A1A] border-y border-[#C8A400]/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-16 text-center md:text-left">
            <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
              Social Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-wide uppercase">
              Featured Video & Feed
            </h2>
            <p className="text-gray-400 text-sm font-light mt-3 leading-relaxed">
              Stay updated with our latest media reels, processing insights, and direct farm-to-table snippets. Watch YouTube videos inline, or view our Instagram and Facebook features.
            </p>
          </div>

          {content.instagramPosts && content.instagramPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.instagramPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : (index % 3) * 0.1 }}
                >
                  <MediaCard post={post} imgTimestamp={imgTimestamp} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-lg bg-white/5">
              <p className="text-gray-500 text-sm">No media posts linked at the moment.</p>
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
