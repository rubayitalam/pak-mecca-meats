"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSiteSettings } from "@/lib/useSiteSettings";

interface SubMenuItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  subItems?: SubMenuItem[];
}

const aboutSubItems: SubMenuItem[] = [
  { name: "Who We Are", href: "/about/who-we-are" },
  { name: "At a Glance", href: "/about/at-a-glance" },
  { name: "History", href: "/about/history" },
  { name: "Values", href: "/about/values" },
  { name: "Our Culture", href: "/culture" },
];

const responsibilitiesSubItems: SubMenuItem[] = [
  { name: "Food Safety & Nutrition", href: "/responsibilities/food-safety" },
  { name: "Looking After Our Community", href: "/responsibilities/community" },
];

// Sequence: Home -> About -> Products -> Responsibilities -> Assurance -> Media -> Contact
const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about", subItems: aboutSubItems },
  { name: "Products", href: "/products" },
  { name: "Responsibilities", href: "/responsibilities/food-safety", subItems: responsibilitiesSubItems },
  { name: "Assurance", href: "/assurance" },
  { name: "Media", href: "/media" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
    setOpenSubmenu(null);
  }, [pathname]);

  const overlayVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100vh",
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.4,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
    exit: {
      height: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.3,
        ease: [0.7, 0, 0.84, 0],
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

  const isAboutActive =
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    (pathname === "/culture" && openSubmenu === "About");

  const isRespActive = pathname.startsWith("/responsibilities");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen || scrolled ? "bg-[#1A1A1A] shadow-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 flex items-center relative justify-between transition-all duration-300 ${
          isOpen ? "h-24 md:h-32" : "h-20 md:h-24"
        }`}
      >
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
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          <Link href="/" className="block">
            <div className="relative h-20 w-20 md:h-28 md:w-28 overflow-hidden flex items-center justify-center">
              <Image
                src={settings.logoUrl}
                alt={settings.siteName}
                width={112}
                height={112}
                quality={100}
                unoptimized={true}
                sizes="(max-width: 768px) 80px, 112px"
                className="h-20 w-20 md:h-28 md:w-28 object-contain"
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
            className="fixed inset-0 w-full bg-[#1A1A1A] z-40 overflow-y-auto flex flex-col justify-start items-center pt-32 sm:pt-40 md:pt-44 pb-20 px-6"
          >
            <nav className="flex flex-col space-y-6 md:space-y-8 text-center max-w-xl w-full">
              {navLinks.map((link) => {
                if (link.subItems) {
                  const isSubOpen = openSubmenu === link.name;
                  const isItemActive =
                    link.name === "About" ? isAboutActive : isRespActive;

                  return (
                    <motion.div
                      key={link.name}
                      variants={linkVariants}
                      className="relative flex flex-col items-center"
                      onMouseEnter={() => setOpenSubmenu(link.name)}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <div className="flex items-center justify-center gap-2 cursor-pointer group">
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest font-light transition-colors duration-300 ${
                            isItemActive
                              ? "text-[#C8A400]"
                              : "text-white group-hover:text-[#C8A400]"
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenSubmenu(isSubOpen ? null : link.name);
                          }}
                          className="text-white hover:text-[#C8A400] p-2 focus:outline-none transition-transform duration-200"
                          aria-label={`Toggle ${link.name} Submenu`}
                        >
                          <ChevronDown
                            className={`w-6 h-6 transition-transform duration-300 ${
                              isSubOpen ? "rotate-180 text-[#C8A400]" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Submenu List */}
                      <AnimatePresence>
                        {isSubOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden flex flex-col space-y-3 mt-4 pl-4 sm:pl-6 border-l border-[#C8A400]/30 text-left self-center w-max"
                          >
                            {link.subItems.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`text-lg sm:text-xl uppercase tracking-widest font-light transition-colors duration-200 block ${
                                    isSubActive
                                      ? "text-[#C8A400] font-normal"
                                      : "text-gray-300 hover:text-[#C8A400]"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
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
