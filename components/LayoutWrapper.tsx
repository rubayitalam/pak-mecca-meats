"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      {/* For public pages, we add a top padding to prevent content from going behind the fixed navbar */}
      <main className={`flex-grow ${!isAdminRoute ? "pt-0" : ""}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
