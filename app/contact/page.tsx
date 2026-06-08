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
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <HeroSection
        heading="Contact Us"
        subheading="Get In Touch With Our Team"
        bgImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600"
      />

      {/* Main Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Contact Form */}
            <div className="bg-brand-light p-6 sm:p-10 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Send an Inquiry</h2>
              <p className="text-gray-600 text-sm mb-6">
                Fill out the form below and a representative will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-brand-green bg-white text-brand-dark text-sm min-h-[44px]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-brand-green bg-white text-brand-dark text-sm min-h-[44px]"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-brand-green bg-white text-brand-dark text-sm min-h-[44px]"
                    placeholder="Product Query, Partnership, etc."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-brand-green bg-white text-brand-dark text-sm min-h-[100px]"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold py-3 rounded shadow hover:shadow-md transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>

            {/* Contact Details & Info */}
            <div className="flex flex-col space-y-8 lg:pt-4">

              <div>
                <span className="text-brand-gold text-xs font-bold uppercase tracking-wider block mb-1">
                  Connect
                </span>
                <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
                  Contact Details
                </h2>
                <div className="h-1 w-16 bg-brand-green mt-3 mb-6" />
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base uppercase tracking-wider mb-1">
                      Our Head Office
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{info.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base uppercase tracking-wider mb-1">
                      Call Us Directly
                    </h3>
                    <a
                      href={`tel:${info.phone.replace(/\s+/g, "")}`}
                      className="text-brand-green font-semibold text-sm hover:underline"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base uppercase tracking-wider mb-1">
                      Email Inquiries
                    </h3>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-brand-green font-semibold text-sm hover:underline"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base uppercase tracking-wider mb-1">
                      Opening Hours
                    </h3>
                    <p className="text-gray-600 text-sm">{info.hours}</p>
                    <p className="text-gray-600 text-sm">{info.saturdayHours}</p>
                    <p className="text-gray-400 text-xs mt-1">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed — Birmingham B5 7EJ */}
              <div className="w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  title="Pak Mecca Meats Location — Bishop Street Birmingham"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.3444458315185!2d-1.8993203842013893!3d52.47290077980562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc84d1a556fb%3A0xe5102553753fc333!2sBishop%20St%2C%20Birmingham%20B5%207EJ!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px] lg:h-[350px]"
                />
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
