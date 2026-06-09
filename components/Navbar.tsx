"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSiteSettings } from "@/lib/useSiteSettings";

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
  const settings = useSiteSettings();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const overlayVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100vh",
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.4,
        ease: [0.16, 1, 0.3, 1], // premium ease out
        when: "beforeChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      height: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.3,
        ease: [0.7, 0, 0.84, 0], // premium ease in
        when: "afterChildren",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#1A1A1A] border-b border-[#C8A400]/30 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 h-20 md:h-24 flex items-center relative justify-between">
        {/* Left Side: MENU text/button */}
        <div className="flex-1 flex justify-start z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[#C8A400] text-sm uppercase tracking-widest font-bold flex items-center space-x-2 transition-colors duration-200 focus:outline-none min-h-[44px] min-w-[44px]"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <>
                <X className="w-5 h-5 shrink-0" />
                <span className="hidden sm:inline">CLOSE</span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5 shrink-0 sm:hidden" />
                <span className="hidden sm:inline">MENU</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Link href="/" className="block">
            <div className="relative h-12 w-12 md:h-16 md:w-16 overflow-hidden flex items-center justify-center">
              <Image
                src={settings.logoUrl}
                alt={settings.siteName}
                width={64}
                height={64}
                className="h-12 w-12 md:h-16 md:w-16 object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right Side: Spacer for symmetry */}
        <div className="flex-1" />
      </div>

      {/* Slide down Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 w-full bg-[#1A1A1A] z-40 overflow-hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col space-y-8 md:space-y-10 text-center px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className={`text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest font-light transition-colors duration-300 block ${
                        isActive
                          ? "text-[#C8A400]"
                          : "text-white hover:text-[#C8A400]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
