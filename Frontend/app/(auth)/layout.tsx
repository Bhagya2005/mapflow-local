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
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDER_DATA.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-10 selection:bg-[#7c5cfc] selection:text-white overflow-hidden">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#7c5cfc]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#7c5cfc]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1100px] h-full md:h-[700px] bg-[#0a0a0a] rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-white/10">

        <div className="relative w-full md:w-[45%] h-[300px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#7c5cfc]/10 to-transparent opacity-30" />

          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={SLIDER_DATA[currentIndex].image}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
              alt="Background"
            />
          </AnimatePresence>

          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">

            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => router.push("/")}
              >
                <div className="p-1.5 bg-[#7c5cfc] rounded-lg group-hover:rotate-12 transition-transform">
                  <Orbit className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold tracking-tighter uppercase">MapFlow</span>
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
                  <h2 className="text-4xl font-extrabold leading-tight tracking-tight whitespace-pre-line">
                    {SLIDER_DATA[currentIndex].title.split('\n')[0]} <br />
                    <span className="text-[#7c5cfc]">{SLIDER_DATA[currentIndex].title.split('\n')[1]}</span>
                  </h2>
                  <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-[280px]">
                    {SLIDER_DATA[currentIndex].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2">
                {SLIDER_DATA.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-700 ${index === currentIndex ? "w-12 bg-[#7c5cfc]" : "w-4 bg-white/10"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] h-full bg-black p-8 md:p-16 flex flex-col justify-center relative overflow-y-auto">

          <button
            onClick={() => router.push("/")}
            className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-[#7c5cfc] flex items-center gap-1 transition-all group"
          >
            Back to website
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <div className="w-full max-w-[380px] mx-auto space-y-8">
            {children}
          </div>

          <div className="absolute bottom-0 left-0 p-8 opacity-5">
            <Orbit size={120} className="text-[#7c5cfc] rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}