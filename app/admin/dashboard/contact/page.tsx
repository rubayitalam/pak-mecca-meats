"use client";

import { useEffect, useState } from "react";
import { getPageContent, savePageContent } from "@/lib/firestore";
import { ContactContent } from "@/types/content";
import toast from "react-hot-toast";

const defaults: ContactContent = {
  address: "162-194 Bishop St, Birmingham, B5 7EJ, England",
  phone: "+44 121 622 1497",
  email: "sales@pakmeccameats.co.uk",
  hours: "Monday–Friday: 8:00am – 5:00pm",
  saturdayHours: "Saturday: By appointment",
};

export default function ContactEditor() {
  const [data, setData] = useState<ContactContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const dbData = await getPageContent("contact");
      if (dbData) {
        setData({
          address: dbData.address || defaults.address,
          phone: dbData.phone || defaults.phone,
          email: dbData.email || defaults.email,
          hours: dbData.hours || defaults.hours,
          saturdayHours: dbData.saturdayHours || defaults.saturdayHours,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await savePageContent("contact", data);
    if (success) {
      toast.success("Contact information saved successfully!");
    } else {
      toast.error("Failed to save changes. Check database rules.");
    }
    setSaving(false);
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
        <h1 className="text-2xl font-bold text-brand-dark">Contact Information Editor</h1>
        <p className="text-gray-500 text-sm mt-1">Manage corporate touchpoints, operating hours, and locations.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-brand-dark border-b pb-2">Business Coordinates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Office Address</label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Direct Telephone</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Inquiry Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Mon–Fri Hours</label>
            <input
              type="text"
              value={data.hours}
              onChange={(e) => setData({ ...data, hours: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Saturday Hours</label>
            <input
              type="text"
              value={data.saturdayHours}
              onChange={(e) => setData({ ...data, saturdayHours: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-brand-green text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">e.g. &quot;Saturday: By appointment&quot; or &quot;Saturday: 9:00am – 1:00pm&quot;</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full md:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded shadow transition-all duration-200 min-h-[44px] flex items-center justify-center text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {saving ? "Saving Changes..." : "Save Changes"}
      </button>
    </div>
  );
}
