"use client";

import { useEffect, useState } from "react";
import { getPageContent } from "./firestore";

export interface SiteSettings {
  logoUrl: string;
  siteName: string;
  tagline: string;
  loading: boolean;
}

const DEFAULT_SETTINGS = {
  logoUrl: "/logo.png",
  siteName: "Pak Mecca Meats",
  tagline: "Honouring Tradition With Unmatched Quality",
};

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>({
    ...DEFAULT_SETTINGS,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      const data = await getPageContent("settings");
      if (active) {
        if (data) {
          setSettings({
            logoUrl: data.logoUrl || DEFAULT_SETTINGS.logoUrl,
            siteName: data.siteName || DEFAULT_SETTINGS.siteName,
            tagline: data.tagline || DEFAULT_SETTINGS.tagline,
            loading: false,
          });
        } else {
          setSettings((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    loadSettings();

    return () => {
      active = false;
    };
  }, []);

  // Gracefully resolve the requested '/logo.png' default to the actual file path '/Pak Mecca Logo.png'
  const resolvedLogoUrl =
    settings.logoUrl === "/logo.png" ? "/Pak Mecca Logo.png" : settings.logoUrl;

  return {
    ...settings,
    logoUrl: resolvedLogoUrl,
  };
}
