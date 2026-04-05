"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Orbit } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SLIDER_DATA = [
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    title: "No-Code \n Management.",
    subtitle: "Empowering business owners to manage complex data without writing a single line of code."
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    title: "Boost User \n Engagement.",
    subtitle: "Replace static maps with interactive experiences that keep customers on your site longer."
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    title: "Live-Sync \n Innovation.",
    subtitle: "Update your dashboard once and see changes reflected instantly across all platforms."
  }
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('mapflow-theme');
      if (storedTheme !== null) {
        return storedTheme === 'dark';
      }
      localStorage.setItem('mapflow-theme', 'dark');
      return true;
    }
    return true;
  });

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDER_DATA.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mapflow-theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);

  return (
    <div className={`min-h-screen flex items-center justify-center sm:p-6 md:p-10 selection:bg-[#7c5cfc]/20 selection:text-[#7c5cfc] overflow-x-hidden transition-colors duration-500 ${
      isDarkTheme ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* Hero-style Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none ${
          isDarkTheme ? 'bg-purple-600/30' : 'bg-[#7c5cfc]/5'
        }`} />
        <div className={`absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none ${
          isDarkTheme ? 'bg-blue-600/20' : 'bg-blue-500/5'
        }`} />
      </div>

      <div className={`relative z-10 w-full max-w-[1100px] min-h-screen md:min-h-0 md:h-[700px] rounded-none sm:rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 sm:border transition-colors duration-500 ${
        isDarkTheme ? 'bg-gray-900 border-gray-700' : 'bg-white border-slate-200'
      }`}>
        <div className="relative w-full md:w-[45%] h-[260px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 bg-slate-900">

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#7c5cfc]/20 to-transparent opacity-40 mix-blend-overlay" />

          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={SLIDER_DATA[currentIndex].image}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Background"
            />
          </AnimatePresence>

          <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-between">

            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => router.push("/")}
              >
                <span className="text-xl font-black tracking-tight text-white">MapFlow</span>
              </div>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight whitespace-pre-line text-white">
                    {SLIDER_DATA[currentIndex].title.split('\n')[0]} <br />
                    <span className="text-[#7c5cfc] drop-shadow-md">{SLIDER_DATA[currentIndex].title.split('\n')[1]}</span>
                  </h2>
                  <p className="text-slate-200 text-sm mt-4 leading-relaxed max-w-[280px] font-medium">
                    {SLIDER_DATA[currentIndex].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2">
                {SLIDER_DATA.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-700 ${index === currentIndex ? "w-12 bg-[#7c5cfc] shadow-[0_0_10px_rgba(124,92,252,0.5)]" : "w-4 bg-white/30"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`w-full md:w-[55%] min-h-[500px] md:h-full p-6 sm:p-8 md:p-16 flex flex-col justify-center relative overflow-y-auto transition-colors duration-500 ${
          isDarkTheme ? 'bg-gray-900' : 'bg-white'
        }`}>

          <button
            onClick={() => router.push("/")}
            className={`absolute top-8 right-8 cursor-pointer text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all group ${
              isDarkTheme ? 'text-gray-400 hover:text-[#7c5cfc]' : 'text-slate-400 hover:text-[#7c5cfc]'
            }`}
          >
            Back to website
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <div className="w-full max-w-[380px] mx-auto space-y-8 z-10 relative">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}