"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { MediaContent, BlogEntry } from "@/types/content";
import toast from "react-hot-toast";
import { Plus, Trash, Link as LinkIcon, Calendar, FileText, Image as ImageIcon, Video } from "lucide-react";

const defaults: MediaContent = {
  heroHeading: "Media & Press",
  heroSubheading: "Latest Updates and Social Highlights",
  heroBg: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600",
  instagramPosts: [
    {
      url: "https://www.instagram.com/reel/C8_zJ5jM_p-/",
      thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
      caption: "Hand-selected, premium halal British lamb, processed daily at our central Birmingham facility.",
    },
    {
      url: "https://www.instagram.com/p/C66c1S_sgwA/",
      thumbnail: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
      caption: "Certified by the Halal Monitoring Committee (HMC). Farms, transport, slaughter, and processing under strict supervision.",
    },
    {
      url: "https://www.instagram.com/reel/C57d_hssKee/",
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
    }
  ]
};

export default function MediaDashboardEditor() {
  const [data, setData] = useState<MediaContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // States for adding a new Instagram post
  const [newPostUrl, setNewPostUrl] = useState("");
  const [newPostThumbnail, setNewPostThumbnail] = useState("");
  const [newPostCaption, setNewPostCaption] = useState("");

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("media");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaults.heroHeading,
          heroSubheading: dbData.heroSubheading || defaults.heroSubheading,
          heroBg: dbData.heroBg || defaults.heroBg,
          instagramPosts: dbData.instagramPosts || defaults.instagramPosts || [],
          blogs: dbData.blogs || defaults.blogs || [],
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("media", data);
    if (success) {
      toast.success("Media page content saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database permissions.");
    }
    setSaving(false);
  };

  const handleAddInstagramPost = () => {
    if (!newPostUrl.trim()) {
      toast.error("Please enter a valid Instagram URL.");
      return;
    }
    if (!newPostUrl.includes("instagram.com")) {
      toast.error("URL must be a valid instagram.com link.");
      return;
    }
    if (!newPostThumbnail.trim()) {
      toast.error("Please enter a Thumbnail Image URL.");
      return;
    }
    
    const newPost = {
      url: newPostUrl.trim(),
      thumbnail: newPostThumbnail.trim(),
      caption: newPostCaption.trim() || undefined,
    };

    setData((prev) => ({
      ...prev,
      instagramPosts: [...(prev.instagramPosts || []), newPost],
    }));

    setNewPostUrl("");
    setNewPostThumbnail("");
    setNewPostCaption("");
    toast.success("Instagram post added to list (save changes to store it!)");
  };

  const handleRemoveInstagramPost = (indexToRemove: number) => {
    setData((prev) => ({
      ...prev,
      instagramPosts: prev.instagramPosts.filter((_, idx) => idx !== indexToRemove),
    }));
    toast.success("Instagram post removed from list");
  };

  const handleUpdateInstagramPostField = (index: number, field: "url" | "thumbnail" | "caption", value: string) => {
    setData((prev) => {
      const updatedPosts = [...prev.instagramPosts];
      updatedPosts[index] = {
        ...updatedPosts[index],
        [field]: value,
      };
      return {
        ...prev,
        instagramPosts: updatedPosts,
      };
    });
  };

  const handleAddBlogEntry = () => {
    const newEntry: BlogEntry = {
      title: "New Blog Entry",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      description: "Enter a brief summary or introduction to the press/blog article here.",
      link: "/about",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    };
    setData((prev) => ({
      ...prev,
      blogs: [newEntry, ...(prev.blogs || [])],
    }));
    toast.success("New blog entry added to the top of the list");
  };

  const handleRemoveBlogEntry = (indexToRemove: number) => {
    if (confirm("Are you sure you want to remove this blog entry?")) {
      setData((prev) => ({
        ...prev,
        blogs: prev.blogs.filter((_, idx) => idx !== indexToRemove),
      }));
      toast.success("Blog entry removed");
    }
  };

  const handleUpdateBlogField = (index: number, field: keyof BlogEntry, value: string) => {
    setData((prev) => {
      const updatedBlogs = [...prev.blogs];
      updatedBlogs[index] = {
        ...updatedBlogs[index],
        [field]: value,
      };
      return {
        ...prev,
        blogs: updatedBlogs,
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
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Media Page Content Editor</h1>
        <p className="text-gray-500 text-sm mt-1">Manage press releases, news blogs, and social highlights.</p>
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
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Background Image URL</label>
          <input
            type="text"
            value={data.heroBg}
            onChange={(e) => setData({ ...data, heroBg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm mb-2 bg-white text-brand-dark"
          />
          {data.heroBg && (
            <div className="relative w-full h-40 rounded border overflow-hidden mt-2 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroBg} alt="Hero Background Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* 2. INSTAGRAM POSTS MANAGER */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-lg font-bold text-brand-dark">2. Instagram Posts Manager</h2>
          <p className="text-xs text-gray-500 mt-0.5">Link Instagram posts/reels and supply a thumbnail image to avoid embedding blocks.</p>
        </div>

        <div className="space-y-6">
          {/* Add Instagram Post Form */}
          <div className="bg-gray-50 p-4 border rounded-lg space-y-4">
            <h3 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Add New Instagram Card</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Instagram Post URL (Required)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Video className="h-4.5 w-4.5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    value={newPostUrl}
                    onChange={(e) => setNewPostUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/C8_zJ5jM_p-/"
                    className="w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Thumbnail Image URL (Required)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-4.5 w-4.5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    value={newPostThumbnail}
                    onChange={(e) => setNewPostThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Caption / Overlay Text (Optional)</label>
              <input
                type="text"
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
                placeholder="E.g. Check out our latest Birmingham facility expansion video!"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
              />
            </div>

            <button
              type="button"
              onClick={handleAddInstagramPost}
              className="px-4 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Post Card
            </button>
          </div>

          {/* List of Current Posts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Current Social Grid Cards</h3>
            
            {data.instagramPosts && data.instagramPosts.length > 0 ? (
              <div className="space-y-4 divide-y divide-gray-100">
                {data.instagramPosts.map((post, index) => (
                  <div key={index} className={`pt-4 ${index === 0 ? "pt-0" : ""} flex flex-col md:flex-row gap-4 items-start relative`}>
                    
                    {/* Thumbnail Mini Preview */}
                    <div className="w-20 h-20 rounded border overflow-hidden bg-gray-50 shrink-0 relative flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.thumbnail}
                        alt="Post Mini Thumbnail"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>

                    {/* Inputs */}
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Post URL</label>
                        <input
                          type="text"
                          value={post.url}
                          onChange={(e) => handleUpdateInstagramPostField(index, "url", e.target.value)}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Thumbnail URL</label>
                        <input
                          type="text"
                          value={post.thumbnail}
                          onChange={(e) => handleUpdateInstagramPostField(index, "thumbnail", e.target.value)}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Caption</label>
                        <input
                          type="text"
                          value={post.caption || ""}
                          placeholder="No caption provided"
                          onChange={(e) => handleUpdateInstagramPostField(index, "caption", e.target.value)}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:border-brand-green text-xs bg-white text-brand-dark italic"
                        />
                      </div>
                    </div>

                    {/* Trash Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveInstagramPost(index)}
                      className="p-2 text-brand-red hover:bg-brand-red/10 rounded transition-colors self-center shrink-0"
                      title="Remove post"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-250 rounded text-gray-400 text-xs">
                No Instagram post cards created. Add some cards above!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. NEWS BLOG ENTRIES */}
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-brand-dark">3. News & Blog Entries</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage articles shown on the media page. Drag and drop ordering is based on index.</p>
          </div>
          <button
            type="button"
            onClick={handleAddBlogEntry}
            className="px-4 py-2 bg-brand-green hover:bg-brand-green/90 text-white rounded text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all shadow"
          >
            <Plus className="w-4 h-4" /> Add Blog Entry
          </button>
        </div>

        {data.blogs && data.blogs.length > 0 ? (
          <div className="space-y-6">
            {data.blogs.map((blog, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4 relative group">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-brand-dark flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    {blog.title || "Untitled Entry"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlogEntry(index)}
                    className="text-brand-red hover:bg-brand-red/10 px-3 py-1 rounded text-xs uppercase font-bold tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <Trash className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Inputs */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Title</label>
                      <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => handleUpdateBlogField(index, "title", e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" /> Date
                        </label>
                        <input
                          type="text"
                          value={blog.date}
                          placeholder="June 15, 2026"
                          onChange={(e) => handleUpdateBlogField(index, "date", e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                        />
                      </div>
                      {/* Link */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                          <LinkIcon className="w-3 h-3 text-gray-400" /> Action Link
                        </label>
                        <input
                          type="text"
                          value={blog.link}
                          placeholder="/about or external link"
                          onChange={(e) => handleUpdateBlogField(index, "link", e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-gray-400" /> Description
                      </label>
                      <textarea
                        rows={4}
                        value={blog.description}
                        onChange={(e) => handleUpdateBlogField(index, "description", e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                      />
                    </div>
                  </div>

                  {/* Image & Preview */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-gray-400" /> Image URL
                      </label>
                      <input
                        type="text"
                        value={blog.image}
                        placeholder="https://images.unsplash.com/..."
                        onChange={(e) => handleUpdateBlogField(index, "image", e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm bg-white text-brand-dark"
                      />
                    </div>
                    {blog.image && (
                      <div className="relative w-full h-44 rounded border overflow-hidden bg-gray-50 shadow-inner flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={blog.image}
                          alt="Blog Image Preview"
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-400">
            No blog entries created. Click &quot;Add Blog Entry&quot; to start.
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full md:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow-lg transition-all duration-200 min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {saving ? "Saving Changes..." : "Save Media Page Content"}
      </button>
    </div>
  );
}
