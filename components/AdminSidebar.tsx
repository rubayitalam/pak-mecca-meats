"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Home,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Phone,
  LayoutGrid,
  Film,
  Users,
  ChevronDown,
  UserCheck,
  BarChart2,
  Clock,
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";

interface SubNavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavItem {
  name: string;
  href?: string;
  icon: any;
  subItems?: SubNavItem[];
}

const aboutSubNavItems: SubNavItem[] = [
  { name: "Who We Are", href: "/admin/dashboard/who-we-are", icon: UserCheck },
  { name: "At a Glance", href: "/admin/dashboard/at-a-glance", icon: BarChart2 },
  { name: "History", href: "/admin/dashboard/history", icon: Clock },
  { name: "Values", href: "/admin/dashboard/values", icon: Heart },
  { name: "Overview (About)", href: "/admin/dashboard/about", icon: LayoutGrid },
];

const navItems: NavItem[] = [
  { name: "Home Page", href: "/admin/dashboard/home", icon: Home },
  {
    name: "About Us",
    icon: LayoutGrid,
    subItems: aboutSubNavItems,
  },
  { name: "Products Page", href: "/admin/dashboard/products", icon: LayoutGrid },
  { name: "Assurance Page", href: "/admin/dashboard/assurance", icon: ShieldCheck },
  { name: "Culture Page", href: "/admin/dashboard/culture", icon: Users },
  { name: "Media Page", href: "/admin/dashboard/media", icon: Film },
  { name: "Contact Page", href: "/admin/dashboard/contact", icon: Phone },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAboutGroupActive =
    pathname.startsWith("/admin/dashboard/who-we-are") ||
    pathname.startsWith("/admin/dashboard/at-a-glance") ||
    pathname.startsWith("/admin/dashboard/history") ||
    pathname.startsWith("/admin/dashboard/values") ||
    pathname === "/admin/dashboard/about";

  const [aboutOpen, setAboutOpen] = useState(isAboutGroupActive);

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
        <div className="lg:hidden fixed inset-0 top-16 bg-brand-dark/95 z-30 flex flex-col justify-between py-8 px-6 text-white overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.subItems) {
                return (
                  <div key={item.name} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className={`flex items-center justify-between w-full p-3 rounded font-medium transition-colors ${
                        isAboutGroupActive
                          ? "bg-brand-green/30 text-white"
                          : "hover:bg-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          aboutOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {aboutOpen && (
                      <div className="pl-6 space-y-2 border-l border-white/10 ml-3">
                        {item.subItems.map((sub) => {
                          const SubIcon = sub.icon;
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center space-x-3 p-2.5 rounded text-sm transition-colors ${
                                isSubActive
                                  ? "bg-brand-green text-white font-bold"
                                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span>{sub.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
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
            className="flex items-center justify-center space-x-2 w-full p-4 mt-6 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white rounded font-bold min-h-[44px] transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* DESKTOP FIXED SIDEBAR */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-brand-dark border-r border-white/5 text-white z-20 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 shrink-0">
          <span className="text-lg font-bold tracking-wider uppercase">
            Pak Mecca Admin
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            if (item.subItems) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setAboutOpen(!aboutOpen)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded font-medium transition-all duration-200 ${
                      isAboutGroupActive
                        ? "bg-brand-green/20 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        aboutOpen ? "rotate-180 text-brand-gold" : ""
                      }`}
                    />
                  </button>

                  {aboutOpen && (
                    <div className="pl-4 space-y-1 border-l border-white/10 ml-4 py-1">
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded text-sm transition-all duration-200 ${
                              isSubActive
                                ? "bg-brand-green text-white font-semibold shadow-sm"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <SubIcon className="w-4 h-4" />
                            <span>{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href!}
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
        <div className="p-6 border-t border-white/10 shrink-0">
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
