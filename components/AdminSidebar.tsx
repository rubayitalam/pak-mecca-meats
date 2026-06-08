"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Home, Menu, X, LogOut, ShieldCheck, Phone, LayoutGrid } from "lucide-react";
import toast from "react-hot-toast";

// Navigation Links
const navItems = [
  { name: "Home Page", href: "/admin/dashboard/home", icon: Home },
  { name: "About Page", href: "/admin/dashboard/about", icon: LayoutGrid },
  { name: "Products Page", href: "/admin/dashboard/products", icon: LayoutGrid }, // Let's use layoutgrid or custom icons
  { name: "Assurance Page", href: "/admin/dashboard/assurance", icon: ShieldCheck },
  { name: "Contact Page", href: "/admin/dashboard/contact", icon: Phone },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch {
      toast.error("Error signing out");
    }
  };

  return (
    <>
      {/* MOBILE HEADER & TOP NAV */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-brand-dark text-white flex items-center justify-between px-4 z-40 shadow">
        <span className="text-md font-bold tracking-wider uppercase">
          Pak Mecca Admin
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-white/10"
          aria-label="Toggle admin navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* MOBILE DROPDOWN DRAWER */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-brand-dark/95 z-30 flex flex-col justify-between py-8 px-6 text-white">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded font-medium transition-colors ${
                    isActive
                      ? "bg-brand-green text-white"
                      : "hover:bg-white/5 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="flex items-center justify-center space-x-2 w-full p-4 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white rounded font-bold min-h-[44px] transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* DESKTOP FIXED SIDEBAR */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-brand-dark border-r border-white/5 text-white z-20">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <span className="text-lg font-bold tracking-wider uppercase">
            Pak Mecca Admin
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-green text-white shadow-md shadow-brand-green/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User / Logout Section */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded w-full font-semibold text-brand-red hover:bg-brand-red/10 transition-colors min-h-[44px]"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
