"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brandConfig } from "@/config/brand";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Assurance", href: "/assurance" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Determine if we should show light or dark nav theme
  // We want transparent on hero (Home, About, Products, Assurance pages all have heroes)
  // When scrolled or when menu is open, we show solid white.
  // Wait, let's look at the path. If it's admin page, we might want it different, or Navbar isn't rendered on admin pages (we'll check layout.tsx later).
  const isTransparent = !scrolled && !isOpen && (pathname === "/" || pathname === "/about" || pathname === "/products" || pathname === "/assurance");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-white text-brand-dark shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1 z-50">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className={isTransparent ? "text-white" : "text-brand-green"}>
              {brandConfig.name.split(" ")[0]}
            </span>{" "}
            <span className={isTransparent ? "text-white" : "text-brand-green"}>
              {brandConfig.name.split(" ").slice(1).join(" ")}
            </span>
            <span className="text-brand-gold font-black">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-200 relative py-2 group`}
              >
                <span
                  className={`${
                    isActive
                      ? isTransparent
                        ? "text-brand-gold"
                        : "text-brand-green font-bold"
                      : "hover:text-brand-gold"
                  }`}
                >
                  {link.name}
                </span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold transform origin-left transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 focus:outline-none z-50 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-black/5"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-brand-dark/95 text-white flex flex-col justify-center items-center lg:hidden z-40"
          >
            <nav className="flex flex-col space-y-6 text-center w-full max-w-sm px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-bold py-4 uppercase tracking-wider border-b border-white/10 transition-colors ${
                      isActive ? "text-brand-gold font-extrabold" : "text-white hover:text-brand-gold"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
