"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const router = useRouter();
  const settings = useSiteSettings();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/admin/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C8A400]/20 border-t-[#C8A400] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-[#1A1A1A] p-8 sm:p-12 border border-[#C8A400]/30 flex flex-col items-center">
        
        {/* Logo (Centered, h-20 w-20) */}
        <div className="mb-6 relative h-20 w-20 overflow-hidden flex items-center justify-center">
          <Image
            src={settings.logoUrl}
            alt={settings.siteName}
            width={80}
            height={80}
            className="h-20 w-20 object-contain"
            priority
          />
        </div>

        {/* Brand Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xl font-bold uppercase tracking-widest text-[#C8A400] block">
            {settings.siteName}
          </span>
          <span className="inline-block border border-[#C8A400]/40 text-[#C8A400] text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-transparent">
            Admin Panel
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-8">
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full pl-8 pr-4 py-3 border-b border-gray-600 focus:border-[#C8A400] focus:outline-none bg-transparent text-sm text-white transition-colors duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-[#C8A400] mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-8 pr-10 py-3 border-b border-gray-600 focus:border-[#C8A400] focus:outline-none bg-transparent text-sm text-white transition-colors duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-white justify-center min-h-[44px] min-w-[44px]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8A400] hover:bg-[#b09000] text-black font-bold py-3.5 tracking-widest text-xs uppercase transition-colors duration-300 min-h-[44px] flex items-center justify-center disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
}
