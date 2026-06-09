"use client";

import { useEffect, useState, FormEvent } from "react";
import HeroSection from "@/components/HeroSection";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import { getPageContent } from "@/lib/firestore";
import { ContactContent } from "@/types/content";

const defaults: ContactContent = {
  address: "162-194 Bishop St, Birmingham, B5 7EJ, England",
  phone: "+44 121 622 1497",
  email: "sales@pakmeccameats.co.uk",
  hours: "Monday–Friday: 8:00am – 5:00pm",
  saturdayHours: "Saturday: By appointment",
};

export default function Contact() {
  const [info, setInfo] = useState<ContactContent>(defaults);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadContent() {
      const dbContent = await getPageContent("contact");
      if (dbContent) {
        setInfo({
          address: dbContent.address || defaults.address,
          phone: dbContent.phone || defaults.phone,
          email: dbContent.email || defaults.email,
          hours: dbContent.hours || defaults.hours,
          saturdayHours: dbContent.saturdayHours || defaults.saturdayHours,
        });
      }
    }
    loadContent();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        heading="Contact Us"
        subheading="Get In Touch With Our Team"
        bgImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600"
      />

      {/* Main Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Contact Form (Clean minimal form, no card wrapper) */}
            <div className="flex flex-col space-y-8">
              <div>
                <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
                  Inquiries
                </span>
                <h2 className="text-3xl font-light text-brand-dark uppercase tracking-wider">
                  Send an Inquiry
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 focus:border-[#1B5E20] focus:outline-none bg-transparent py-3 text-sm text-brand-dark transition-colors duration-200"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-300 focus:border-[#1B5E20] focus:outline-none bg-transparent py-3 text-sm text-brand-dark transition-colors duration-200"
                    placeholder="name@domain.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border-b border-gray-300 focus:border-[#1B5E20] focus:outline-none bg-transparent py-3 text-sm text-brand-dark transition-colors duration-200"
                    placeholder="Query type or topic"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full border-b border-gray-300 focus:border-[#1B5E20] focus:outline-none bg-transparent py-3 text-sm text-brand-dark transition-colors duration-200 resize-none"
                    placeholder="How can our team support you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1A1A1A] hover:bg-[#C8A400] text-white font-semibold py-3 tracking-widest text-xs uppercase transition-colors duration-300 min-h-[44px] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            </div>

            {/* Contact Details & Info (Clean flat layout, no card wrapper) */}
            <div className="flex flex-col space-y-12">
              <div>
                <span className="text-[#C8A400] text-xs font-bold uppercase tracking-widest block mb-2">
                  Find Us
                </span>
                <h2 className="text-3xl font-light text-brand-dark uppercase tracking-wider">
                  Contact Details
                </h2>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4 pl-1">
                  <MapPin className="w-5 h-5 text-[#C8A400] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-brand-dark text-xs uppercase tracking-widest mb-1.5">
                      Our Head Office
                    </h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">{info.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pl-1">
                  <Phone className="w-5 h-5 text-[#C8A400] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-brand-dark text-xs uppercase tracking-widest mb-1.5">
                      Call Us Directly
                    </h3>
                    <a
                      href={`tel:${info.phone.replace(/\s+/g, "")}`}
                      className="text-gray-600 text-sm font-light hover:text-[#C8A400] transition-colors"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pl-1">
                  <Mail className="w-5 h-5 text-[#C8A400] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-brand-dark text-xs uppercase tracking-widest mb-1.5">
                      Email Inquiries
                    </h3>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-gray-600 text-sm font-light hover:text-[#C8A400] transition-colors"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pl-1">
                  <Clock className="w-5 h-5 text-[#C8A400] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-brand-dark text-xs uppercase tracking-widest mb-1.5">
                      Opening Hours
                    </h3>
                    <p className="text-gray-600 text-sm font-light">{info.hours}</p>
                    <p className="text-gray-600 text-sm font-light">{info.saturdayHours}</p>
                    <p className="text-gray-400 text-xs mt-1 font-light">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed — Birmingham B5 7EJ */}
              <div className="w-full overflow-hidden border-t border-[#C8A400]/20 pt-6">
                <iframe
                  title="Pak Mecca Meats Location — Bishop Street Birmingham"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.3444458315185!2d-1.8993203842013893!3d52.47290077980562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc84d1a556fb%3A0xe5102553753fc333!2sBishop%20St%2C%20Birmingham%20B5%207EJ!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px]"
                />
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
