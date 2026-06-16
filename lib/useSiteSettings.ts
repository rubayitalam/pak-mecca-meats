"use client";

import { useEffect, useState } from "react";
import { getPageContent } from "./firestore";

export interface SiteSettings {
  logoUrl: string;
  siteName: string;
  tagline: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  loading: boolean;
}

const DEFAULT_SETTINGS = {
  logoUrl: "/logo.png",
  siteName: "Pak Mecca Meats",
  tagline: "Honouring Tradition With Unmatched Quality",
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
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
            facebookUrl: data.facebookUrl || DEFAULT_SETTINGS.facebookUrl,
            twitterUrl: data.twitterUrl || DEFAULT_SETTINGS.twitterUrl,
            instagramUrl: data.instagramUrl || DEFAULT_SETTINGS.instagramUrl,
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
