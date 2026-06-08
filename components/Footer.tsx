import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import { brandConfig } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center lg:text-left mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">{brandConfig.name.split(" ")[0]}</span>{" "}
                <span className="text-white">{brandConfig.name.split(" ").slice(1).join(" ")}</span>
                <span className="text-brand-gold">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              {brandConfig.tagline}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <h3 className="text-brand-gold text-lg font-bold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/assurance" className="hover:text-white transition-colors">
                  Quality Assurances
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <h3 className="text-brand-gold text-lg font-bold uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center justify-center lg:justify-start space-x-2">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{brandConfig.address}</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start space-x-2">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <a href={`tel:${brandConfig.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {brandConfig.phone}
                </a>
              </li>
              <li className="flex items-center justify-center lg:justify-start space-x-2">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <a href={`mailto:${brandConfig.email}`} className="hover:text-white transition-colors">
                  {brandConfig.email}
                </a>
              </li>
              <li className="flex items-center justify-center lg:justify-start space-x-2">
                <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                <span>Monday–Friday: 8:00am – 5:00pm</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0 text-sm text-gray-400">
          <p>© 2025 {brandConfig.name} Limited. All rights reserved.</p>
          <Link href="/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
