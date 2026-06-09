"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import { brandConfig } from "@/config/brand";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function Footer() {
  const settings = useSiteSettings();

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 border-t-2 border-[#C8A400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16 items-start">
          
          {/* Column 1: Logo, Name & Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Link href="/" className="block">
              <div className="relative h-24 w-24 overflow-hidden flex items-center justify-center">
                <Image
                  src={settings.logoUrl}
                  alt={settings.siteName}
                  width={96}
                  height={96}
                  className="h-24 w-24 object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="text-xl font-bold uppercase tracking-widest text-[#C8A400]">
                {settings.siteName}
              </span>
              <p className="text-gray-400 text-xs tracking-wider max-w-xs font-light leading-relaxed">
                {settings.tagline}
              </p>
            </div>
          </div>

          {/* Column 2: Nav Links */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A400]">
              Navigation
            </span>
            <ul className="space-y-4 text-xs font-semibold uppercase tracking-widest">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#C8A400] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#C8A400] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-[#C8A400] transition-colors duration-200">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/assurance" className="text-gray-400 hover:text-[#C8A400] transition-colors duration-200">
                  Quality Assurances
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#C8A400] transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Socials */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A400]">
              Get In Touch
            </span>
            <ul className="space-y-4 text-xs tracking-wider text-gray-400 max-w-sm">
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C8A400] shrink-0" />
                <span className="font-light">{brandConfig.address}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="w-4 h-4 text-[#C8A400] shrink-0" />
                <a href={`tel:${brandConfig.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors duration-200 font-light">
                  {brandConfig.phone}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="w-4 h-4 text-[#C8A400] shrink-0" />
                <a href={`mailto:${brandConfig.email}`} className="hover:text-white transition-colors duration-200 font-light">
                  {brandConfig.email}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Clock className="w-4 h-4 text-[#C8A400] shrink-0" />
                <span className="font-light">Mon–Fri: 8:00am – 5:00pm</span>
              </li>
            </ul>

            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 border border-gray-700 hover:border-[#C8A400] text-gray-400 hover:text-[#C8A400] transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-gray-700 hover:border-[#C8A400] text-gray-400 hover:text-[#C8A400] transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-gray-700 hover:border-[#C8A400] text-gray-400 hover:text-[#C8A400] transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Divider & Admin Link */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0 text-xs text-gray-500 tracking-wider">
          <p>© 2025 Pak Mecca Meats Limited. All rights reserved.</p>
          <Link href="/admin/login" className="text-gray-700 hover:text-gray-500 transition-colors duration-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
