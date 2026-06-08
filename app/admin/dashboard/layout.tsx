"use client";

import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-brand-light flex flex-col lg:flex-row">
        {/* Sidebar & Top Nav */}
        <AdminSidebar />

        {/* Main Workspace Area */}
        {/* Height offset on mobile for top header (h-16) and padding. Width offset on desktop for sidebar (w-64). */}
        <main className="flex-grow pt-24 lg:pt-8 pb-16 px-4 sm:px-8 lg:pl-72 lg:pr-12">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
