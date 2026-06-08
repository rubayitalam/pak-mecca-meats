"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { ProductsContent, ProductItem } from "@/types/content";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const defaults: ProductsContent = {
  heroHeading: "Our Products",
  heroSubheading: "An award winning part of our business",
  heroBg: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600",
  lamb: [
    { name: "LAMB LEG [BONE-IN]", description: "Each bone-in lamb leg is vacuum-packed and boxed.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "LAMB PAIRED LEGS", description: "Over wrapped and placed in a meat container, weighed together or individually labelled.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "LAMB SADDLE", description: "All our lamb saddles are wrapped and then boxed.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "LAMB LOIN HALF SADDLE", description: "Each lamb loin is over wrapped and then boxed.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "FULL LAMB BREAST", description: "All lamb breasts are over wrapped and boxed.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "LAMB TRUNKS", description: "Wrapped, placed in a meat container, weighed together or individually labelled.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "LAMB FRONTS", description: "Over wrapped, placed in a meat container, weighed together or individually labelled.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
    { name: "LAMB SHOULDER", description: "Each shoulder of lamb is over wrapped and boxed.", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400" },
  ],
  mutton: [
    { name: "MUTTON LEG [BONE IN]", description: "Over wrapped and boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "MUTTON LEG [BONELESS]", description: "Vacuum-packed and canned.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE LEG PAD", description: "Vacuum packed and boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE PAD LEG CHUNK", description: "Deboned muscles, vacuum-packed and canned.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE SHOULDER PAD", description: "Vacuum-packed and canned.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE SHANKS", description: "Hind or fore shank, wrapped and boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "MUTTON HAND DICED", description: "Vacuum-packed in 5 or 10kg bags, then boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE FRONT CHOPS", description: "11 ribs per loin, over wrapped and boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE BACK CHOPS", description: "Over wrapped and boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE BACKSTRAP", description: "Vacuum packed and boxed. Available PAD or with skin.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE TENDERLOIN", description: "Vacuum-packed and boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE 95% VL", description: "Vacuum packed in 10kg bags, then boxed.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "MUTTON BREAST", description: "Over wrapped then boxed. Vacuum packaging available.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { name: "OVINE FAT 20% VL", description: "Available in frozen naked blocks or fresh in boxes.", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
  ],
  offal: [
    { name: "Heads", description: "Premium quality whole ovine heads.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Tongues", description: "Freshly prepared ovine tongues.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Brains", description: "High quality ovine brains.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Plucks", description: "Standard ovine pluck (heart, liver, lungs).", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Heart", description: "Fresh and frozen ovine hearts.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Liver", description: "Premium quality ovine liver.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Ovine Kidneys", description: "Cleaned and prepared kidneys.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Skirt", description: "Ovine diaphragm skirt meat.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Sweetbreads", description: "Fresh select ovine sweetbreads.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Testicles", description: "Whole ovine testicles, prepared to spec.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Tripe", description: "Carefully cleaned and scalded tripe.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
    { name: "Feet", description: "Singe or scalded ovine feet.", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400" },
  ],
  skins: [
    { name: "Ovine Skins", description: "Premium quality ovine skins, prepared to specification.", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" },
  ],
};

type Category = "lamb" | "mutton" | "offal" | "skins";

export default function ProductsEditor() {
  const [data, setData] = useState<ProductsContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("products");
      if (dbData) {
        setData({
          heroHeading: dbData.heroHeading || defaults.heroHeading,
          heroSubheading: dbData.heroSubheading || defaults.heroSubheading,
          heroBg: dbData.heroBg || defaults.heroBg,
          lamb: dbData.lamb || defaults.lamb,
          mutton: dbData.mutton || defaults.mutton,
          offal: dbData.offal || defaults.offal,
          skins: dbData.skins || defaults.skins,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("products", data);
    if (success) {
      toast.success("Products saved successfully!");
    } else {
      toast.error("Failed to save products. Check permissions.");
    }
    setSaving(false);
  };

  const addProduct = (category: Category) => {
    const defaultPlaceholderImage =
      category === "lamb"
        ? defaults.lamb[0].image
        : category === "mutton"
        ? defaults.mutton[0].image
        : category === "offal"
        ? defaults.offal[0].image
        : defaults.skins[0].image;

    const newItem: ProductItem = {
      name: "NEW PRODUCT",
      description: "Enter product description...",
      image: defaultPlaceholderImage,
    };

    setData({
      ...data,
      [category]: [...data[category], newItem],
    });
    toast.success(`Added new item to ${category.toUpperCase()}`);
  };

  const deleteProduct = (category: Category, indexToDelete: number) => {
    setData({
      ...data,
      [category]: data[category].filter((_, i) => i !== indexToDelete),
    });
    toast.success("Item deleted from temporary state. Save to commit.");
  };

  const updateProduct = (
    category: Category,
    indexToUpdate: number,
    field: keyof ProductItem,
    value: string
  ) => {
    const updatedArray = data[category].map((item, i) => {
      if (i === indexToUpdate) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setData({
      ...data,
      [category]: updatedArray,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  const sections: { id: Category; title: string }[] = [
    { id: "lamb", title: "Lamb Cuts" },
    { id: "mutton", title: "Mutton Cuts" },
    { id: "offal", title: "Offal & More" },
    { id: "skins", title: "Ovine Skins" },
  ];

  return (
    <div className="space-y-10 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Products Editor</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage product categories, edit, add, or delete product listings.
        </p>
      </div>

      {/* Hero configuration */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Heading</label>
            <input
              type="text"
              value={data.heroHeading || ""}
              onChange={(e) => setData({ ...data, heroHeading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subheading</label>
            <input
              type="text"
              value={data.heroSubheading || ""}
              onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Image URL</label>
          <input
            type="text"
            value={data.heroBg || ""}
            onChange={(e) => setData({ ...data, heroBg: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
          />
        </div>
      </div>

      {/* Categories sections */}
      {sections.map((section) => (
        <div key={section.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
          
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold text-brand-dark">{section.title}</h2>
            <button
              onClick={() => addProduct(section.id)}
              className="px-4 py-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded text-xs flex items-center gap-1 shadow min-h-[38px] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="space-y-4">
            {data[section.id]?.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No products added in this section.</p>
            ) : (
              data[section.id].map((product, index) => (
                <div
                  key={index}
                  className="p-4 bg-brand-light rounded border border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                >
                  {/* Name field */}
                  <div className="lg:col-span-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Name</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(section.id, index, "name", e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:border-brand-green bg-white font-semibold text-brand-dark"
                    />
                  </div>

                  {/* Description field */}
                  <div className="lg:col-span-4">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Description</label>
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => updateProduct(section.id, index, "description", e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:border-brand-green bg-white text-gray-700"
                    />
                  </div>

                  {/* Image URL field */}
                  <div className="lg:col-span-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={product.image}
                      onChange={(e) => updateProduct(section.id, index, "image", e.target.value)}
                      className="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:border-brand-green bg-white text-gray-500"
                    />
                  </div>

                  {/* Image Preview thumbnail */}
                  <div className="lg:col-span-1 flex justify-center">
                    {product.image && (
                      <div className="relative w-10 h-10 rounded overflow-hidden border bg-gray-50 shrink-0 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt="Thumbnail Preview"
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            // Suppress display errors for broken links
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Action Delete */}
                  <div className="lg:col-span-1 flex justify-end">
                    <button
                      onClick={() => deleteProduct(section.id, index)}
                      className="p-2 text-brand-red hover:bg-brand-red/10 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      ))}

      {/* Global Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full md:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {saving ? "Saving All Changes..." : "Save All Changes"}
      </button>
    </div>
  );
}
