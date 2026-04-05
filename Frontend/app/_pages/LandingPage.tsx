"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Orbit, Github, Linkedin,
  Layout, Zap, Shield, Link as LinkIcon,
  ExternalLink, MapPin, AlertCircle, CheckCircle2,
  MousePointer2, Settings, Send, XCircle, Globe, Cpu,
  Loader2, ArrowRight, Play, User, Code, Copy, Check,
  Moon, Sun
} from "lucide-react";
import Link from "next/link";
import { useWalkthroughStore } from "@/stores/walkthroughStore";
import MapTourModal from "@/app/_components/MapTourModal";
import UseCaseSection from "@/app/_components/sections/UseCaseSection";
import FeaturesSection from "@/app/_components/sections/FeaturesSection";
import DeveloperSection from "@/app/_components/sections/DeveloperSection";
import TestTheme from "@/app/_components/sections/TestTheme";

const HeroAnimation = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div className={`relative w-full h-[350px] md:h-[450px] backdrop-blur-md rounded-[32px] md:rounded-[40px] border shadow-2xl overflow-hidden flex items-center justify-center transition-colors duration-500 ${
      isDarkTheme 
        ? 'bg-gray-900/40 border-gray-700' 
        : 'bg-white/40 border-slate-200'
    }`}>
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
        isDarkTheme ? 'opacity-[0.05]' : 'opacity-[0.03]'
      }`} style={{ backgroundImage: 'radial-gradient(#7c5cfc 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg relative group transition-colors duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800 border-gray-600 text-gray-300' 
            : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <User size={24} className="md:w-8 md:h-8" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors duration-500 ${
              isDarkTheme 
                ? 'bg-emerald-600 border-gray-800' 
                : 'bg-emerald-500 border-white'
            }`}
          ></motion.div>
        </div>
        <div className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-md transition-colors duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800 text-gray-200' 
            : 'bg-slate-900 text-white'
        }`}>Client</div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg text-white relative transition-colors duration-500 ${
          isDarkTheme 
            ? 'bg-purple-900 border-purple-700' 
            : 'bg-[#0f172a] border-white/10'
        }`}>
          <Code size={24} className="md:w-8 md:h-8" />
        </div>
        <div className="px-2 py-0.5 md:px-3 md:py-1 bg-[#7c5cfc] text-white rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-md">Developer</div>
      </motion.div>

      <AnimatePresence>
        <motion.div
          key="link-transfer"
          animate={{
            x: [-100, 100, 100, -100],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.4, 0.6, 1]
          }}
          className="absolute z-20"
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-xl flex items-center justify-center text-[#7c5cfc] transition-colors duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-slate-200'
        }`}>
            <LinkIcon size={16} className="md:w-5 md:h-5" />
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{
          opacity: [0, 0, 1, 1, 0],
          scale: [0.8, 0.8, 1, 1, 0.8],
          y: [20, 20, 0, 0, 20]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.45, 0.55, 0.9, 1]
        }}
        className="absolute inset-x-20 md:inset-x-32 bottom-20 top-20 flex items-center justify-center z-10"
      >
        <div className={`w-full max-w-[200px] md:max-w-[280px] aspect-[1.4/1] rounded-[20px] md:rounded-[24px] border shadow-2xl overflow-hidden flex flex-col relative scale-75 md:scale-100 transition-colors duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-slate-200'
        }`}>
          <div className={`h-5 md:h-6 border-b px-2 md:px-3 flex items-center justify-between shrink-0 transition-colors duration-500 ${
            isDarkTheme 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-slate-50 border-slate-100'
          }`}>
            <div className="flex gap-1 md:gap-1.5">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-red-400 opacity-60"></div>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-yellow-400 opacity-60"></div>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-400 opacity-60"></div>
            </div>
            <div className={`text-[6px] md:text-[7px] font-black tracking-tight uppercase transition-colors duration-500 ${
          isDarkTheme ? 'text-gray-400' : 'text-slate-400'
        }`}>MapFlow Platform</div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className={`w-1/4 border-r p-1 md:p-2 space-y-1 md:space-y-2 shrink-0 transition-colors duration-500 ${
              isDarkTheme 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="h-1 md:h-1.5 w-full bg-[#7c5cfc]/20 rounded-full"></div>
              <div className="h-1 md:h-1.5 w-2/3 bg-slate-200 rounded-full"></div>
              <div className="h-1 md:h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1 md:h-1.5 w-full bg-[#7c5cfc]/30 rounded-full"
              ></motion.div>
            </div>

            <div className={`flex-1 relative overflow-hidden transition-colors duration-500 ${
              isDarkTheme 
                ? 'bg-gray-800' 
                : 'bg-slate-100'
            }`}>
              <div className={`absolute inset-0 transition-colors duration-500 ${
                isDarkTheme ? 'opacity-[0.3]' : 'opacity-[0.2]'
              }`} style={{ backgroundImage: 'radial-gradient(#7c5cfc 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1/2 left-1/3 text-[#7c5cfc]"
              >
                <MapPin size={12} className="md:w-4 md:h-4" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/4 left-2/3 text-blue-500"
              >
                <MapPin size={8} className="md:w-3 md:h-3" />
              </motion.div>

              <motion.div
                animate={{ opacity: [0, 1, 0], y: [-5, 0, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute top-1/2 left-1/2 px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-lg border text-[5px] md:text-[6px] font-bold z-20 transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'bg-white border-slate-100 text-slate-900'
                }`}
              >
                Updated Pin!
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 4],
          opacity: [0.3, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#7c5cfc]/20"
      ></motion.div>
    </div>
  );
};

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuthStore() as any;
  const { showTour, setOpenTour } = useWalkthroughStore();
  const [activeSection, setActiveSection] = useState("hero");
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
  // Set dark mode as default and check localStorage
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('mapflow-theme');
    if (storedTheme !== null) {
      return storedTheme === 'dark';
    }
    // Default to dark mode
    localStorage.setItem('mapflow-theme', 'dark');
    return true;
  }
  return true;
});

// Add effect to save theme to localStorage when it changes
useEffect(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mapflow-theme', isDarkTheme ? 'dark' : 'light');
    console.log('Theme changed to:', isDarkTheme ? 'DARK' : 'LIGHT');
  }
}, [isDarkTheme]);

  const [isMounted, setIsMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const embedUrl = "http://localhost:3000/share/y@gmail.com";

  const steps = [
    { id: "01", title: "Create & Auth", desc: "Securely sign in and create your workspace categories." },
    { id: "02", title: "Pin Locations", desc: "Set custom colored pins with descriptions and walkthroughs." },
    { id: "03", title: "Generate Link", desc: "Click share to get your unique live-map business URL." }
  ];

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const sections = ["use-case", "features", "process", "developer"];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 200) setActiveSection("hero");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartNow = () => {
    if (user) router.push("/");
    else router.push("/login");
  };

  const MapPreview = () => (
    <div className="relative w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
      {(!iframeLoaded || !isMounted) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-[#7c5cfc] animate-spin mb-4" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c5cfc]">
            Loading Preview...
          </p>
        </div>
      )}
      {isMounted && (
        <iframe
          src={embedUrl}
          onLoad={() => setIframeLoaded(true)}
          className={`w-full h-full border-none transition-opacity duration-700 bg-transparent ${iframeLoaded ? "opacity-100" : "opacity-0"
            }`}
        />
      )}
    </div>
  );

  return (
    <div className={`min-h-screen font-sans selection:bg-[#7c5cfc]/20 selection:text-[#7c5cfc] overflow-x-hidden transition-all duration-500 ease-in-out ${
      isDarkTheme 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${isDarkTheme ? '#1f2937' : '#f1f5f9'}; }
        ::-webkit-scrollbar-thumb { background: ${isDarkTheme ? '#4b5563' : '#cbd5e1'}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDarkTheme ? '#6b7280' : '#94a3b8'}; }
        html { scroll-behavior: smooth; }
      `}</style>

      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isDarkTheme 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' 
          : 'bg-white/70 backdrop-blur-xl border-b border-black/10'
      }`}>
        <div className={`absolute inset-0 backdrop-blur-xl ${
          isDarkTheme ? 'bg-black/70 border-b border-white/20' : 'bg-white/70 border-b border-black/20'
        }`}></div>
        <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <div>
              <span className={`text-2xl md:text-3xl font-black tracking-tight ${
                isDarkTheme ? 'text-white' : 'text-black'
              }`}>MapFlow</span>
              <div className="text-[8px] font-bold text-purple-600 uppercase tracking-widest"></div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            {["Use-Case", "Features", "Process", "Developer"].map((name, index) => {
              const id = name.toLowerCase();
              return (
                <motion.a
                  key={id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${id}`} 
                  className={`relative px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 ${
                    activeSection === id 
                      ? 'text-[#7c5cfc]' 
                      : isDarkTheme
                        ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-800'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {name}
                  {activeSection === id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c5cfc] rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Theme toggle clicked, current state:', isDarkTheme);
                setIsDarkTheme(!isDarkTheme);
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDarkTheme ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>

            <motion.button
              onClick={handleStartNow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:from-purple-700 hover:to-purple-800 cursor-pointer flex items-center gap-2"
            >
              Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </nav>

      <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDarkTheme ? '#000000' : 'transparent'
      }}>
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none ${
          isDarkTheme 
            ? 'bg-purple-600/30' 
            : 'bg-[#7c5cfc]/5'
        }`}></div>
        <div className={`absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none ${
          isDarkTheme 
            ? 'bg-blue-600/20' 
            : 'bg-blue-500/5'
        }`}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full shadow-sm ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#7c5cfc] animate-pulse"></div>
                <span className={`text-xs font-semibold tracking-wide ${
                  isDarkTheme ? 'text-gray-300' : 'text-slate-600'
                }`}>Introducing MapFlow </span>
              </div>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1] ${
                isDarkTheme ? 'text-white' : 'text-black'
              }`}>
                Geospatial experiences <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] to-blue-600">built for scale.</span>
              </h1>
              <p className={`text-base md:text-xl mb-10 leading-relaxed font-medium ${
                isDarkTheme ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Transform static contact pages into high-performance, interactive maps that sync with your business data in real-time. Designed specifically for professional deployments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button onClick={handleStartNow} className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm hover:-translate-y-1 transition-all shadow-[0_10px_30px_-10px_rgba(124,92,252,0.6)] cursor-pointer flex items-center justify-center gap-2 ${
                  isDarkTheme 
                    ? 'bg-[#7c5cfc] text-white hover:bg-purple-700' 
                    : 'bg-[#7c5cfc] text-white hover:bg-purple-700'
                }`}>
                  Start Building Free <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setOpenTour(true)}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm hover:-translate-y-1 transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 ${
                    isDarkTheme 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <Play size={16} className={`fill-[#7c5cfc]`} /> Watch Tour
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full hidden lg:block"
            >
              <HeroAnimation isDarkTheme={isDarkTheme} />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white border border-slate-200 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-3 z-30 scale-75 md:scale-100"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={14} className="md:w-4 md:h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-800">Live Sync Active</div>
                  <div className="text-[8px] text-slate-500">Latency: 12ms</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 mt-20 md:mt-32">
          <section id="problem" className="grid lg:grid-cols-2 gap-8 items-stretch relative">
            <div className={`rounded-[32px] md:rounded-[40px] p-8 md:p-10 flex flex-col justify-between shadow-sm relative group overflow-hidden transition-colors duration-500 ${
              isDarkTheme 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-slate-200'
            }`}
            style={{
              backgroundColor: isDarkTheme ? '#111827' : '#ffffff',
              borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
            }}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                isDarkTheme ? 'bg-gray-800/50' : 'bg-slate-50/50'
              }`}></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className={`flex items-center gap-2 font-bold text-sm tracking-wide ${
                    isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                  }`}
                  style={{
                    color: isDarkTheme ? '#9ca3af' : '#64748b'
                  }}>
                    <AlertCircle size={18} className={isDarkTheme ? 'text-gray-500' : 'text-slate-400'} /> The Old Way
                  </div>
                </div>
                <div className={`h-[300px] md:h-[400px] rounded-[24px] mb-8 flex flex-col items-center justify-center border border-dashed relative overflow-hidden shadow-inner ${
                  isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-slate-100 border-slate-300'
                }`}
                style={{
                  backgroundColor: isDarkTheme ? '#1f2937' : '#f1f5f9',
                  borderColor: isDarkTheme ? '#4b5563' : '#cbd5e1'
                }}>
                  <img src="/images/1.png" className="w-full h-full object-cover opacity-80 mix-blend-multiply filter grayscale-[50%]" alt="Static Legacy Map" />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 backdrop-blur-[1px]">
                    <div className={`px-4 py-2 rounded-full shadow-sm text-xs font-bold border flex items-center gap-2 ${
                      isDarkTheme 
                        ? 'bg-gray-800/90 text-gray-300 border-gray-600' 
                        : 'bg-white/90 text-slate-600 border-slate-200'
                    }`}
                    style={{
                      backgroundColor: isDarkTheme ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                      color: isDarkTheme ? '#d1d5db' : '#475569',
                      borderColor: isDarkTheme ? '#4b5563' : '#e2e8f0'
                    }}>
                      <XCircle size={14} className="text-red-500" /> Static Image
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div className={`p-5 rounded-2xl border transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-slate-50 border-slate-100'
                }`}
                style={{
                  backgroundColor: isDarkTheme ? '#1f2937' : '#f8fafc',
                  borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
                }}>
                  <h4 className={`font-bold text-sm mb-1 ${
                    isDarkTheme ? 'text-gray-200' : 'text-slate-800'
                  }`}
                  style={{
                    color: isDarkTheme ? '#e5e7eb' : '#1e293b'
                  }}>High Maintenance</h4>
                  <p className={`text-xs leading-relaxed ${
                    isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                  }`}
                  style={{
                    color: isDarkTheme ? '#9ca3af' : '#64748b'
                  }}>Requires manual updates and re-uploading JPEGs when data changes.</p>
                </div>
                <div className={`p-5 rounded-2xl border transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-slate-50 border-slate-100'
                }`}
                style={{
                  backgroundColor: isDarkTheme ? '#1f2937' : '#f8fafc',
                  borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
                }}>
                  <h4 className={`font-bold text-sm mb-1 ${
                    isDarkTheme ? 'text-gray-200' : 'text-slate-800'
                  }`}
                  style={{
                    color: isDarkTheme ? '#e5e7eb' : '#1e293b'
                  }}>Zero Interaction</h4>
                  <p className={`text-xs leading-relaxed ${
                    isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                  }`}
                  style={{
                    color: isDarkTheme ? '#9ca3af' : '#64748b'
                  }}>No zooming, panning, or deep-linking. Poor UX for mobile users.</p>
                </div>
              </div>
            </div>

            <div className={`rounded-[32px] md:rounded-[40px] p-8 md:p-10 flex flex-col shadow-[0_20px_60px_-15px_rgba(124,92,252,0.1)] relative overflow-hidden transition-colors duration-500 ${
              isDarkTheme 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-[#7c5cfc]/20'
            }`}
            style={{
              backgroundColor: isDarkTheme ? '#111827' : '#ffffff',
              borderColor: isDarkTheme ? '#374151' : 'rgba(124, 92, 252, 0.2)'
            }}>
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none ${
                isDarkTheme ? 'bg-purple-900/10' : 'bg-[#7c5cfc]/5'
              }`}></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-2 text-[#7c5cfc] font-bold text-sm tracking-wide">
                    <CheckCircle2 size={18} /> MapFlow Platform
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-500 ${
                    isDarkTheme 
                      ? 'bg-purple-900/20 border-purple-700' 
                      : 'bg-[#7c5cfc]/10 border-[#7c5cfc]/20'
                  }`}
                  style={{
                    backgroundColor: isDarkTheme ? 'rgba(88, 28, 135, 0.2)' : 'rgba(124, 92, 252, 0.1)',
                    borderColor: isDarkTheme ? '#6b21a8' : 'rgba(124, 92, 252, 0.2)'
                  }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#7c5cfc] uppercase tracking-wider">Live API</span>
                  </div>
                </div>

                <div className={`h-[300px] md:h-[400px] rounded-[24px] overflow-hidden mb-8 border shadow-lg relative group transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-slate-50 border-slate-200'
                }`}
                style={{
                  backgroundColor: isDarkTheme ? '#1f2937' : '#f8fafc',
                  borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
                }}>
                  <MapPreview />
                  <div className={`absolute bottom-4 right-4 p-3 rounded-2xl border flex items-center gap-3 shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30 ${
                    isDarkTheme 
                      ? 'bg-gray-800/95 border-gray-600' 
                      : 'bg-white/95 border-slate-200'
                  }`}
                  style={{
                    backgroundColor: isDarkTheme ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDarkTheme ? '#4b5563' : '#e2e8f0'
                  }}>
                    <div className={`p-2 rounded-lg ${
                      isDarkTheme ? 'bg-purple-900/20' : 'bg-[#7c5cfc]/10'
                    }`}
                    style={{
                      backgroundColor: isDarkTheme ? 'rgba(88, 28, 135, 0.2)' : 'rgba(124, 92, 252, 0.1)'
                    }}><Globe size={16} className="text-[#7c5cfc]" /></div>
                    <div>
                      <div className={`text-[11px] font-bold ${
                        isDarkTheme ? 'text-gray-200' : 'text-slate-800'
                      }`}
                      style={{
                        color: isDarkTheme ? '#e5e7eb' : '#1e293b'
                      }}>Global Edge CDN</div>
                      <div className={`text-[10px] font-mono mt-0.5 ${
                        isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                      }`}
                      style={{
                        color: isDarkTheme ? '#9ca3af' : '#64748b'
                      }}>Render: 12ms</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 md:p-5 rounded-2xl border flex flex-col justify-center transition-colors duration-500 ${
                    isDarkTheme 
                      ? 'bg-purple-900/10 border-purple-800' 
                      : 'bg-[#7c5cfc]/[0.03] border-[#7c5cfc]/10'
                  }`}
                  style={{
                    backgroundColor: isDarkTheme ? 'rgba(88, 28, 135, 0.1)' : 'rgba(124, 92, 252, 0.03)',
                    borderColor: isDarkTheme ? '#6b21a8' : 'rgba(124, 92, 252, 0.1)'
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={14} className="text-[#7c5cfc]" />
                      <div className={`text-xs font-bold ${
                        isDarkTheme ? 'text-gray-200' : 'text-slate-800'
                      }`}
                      style={{
                        color: isDarkTheme ? '#e5e7eb' : '#1e293b'
                      }}>Active Sync</div>
                    </div>
                    <div className={`text-[10px] md:text-[11px] font-semibold mt-1 ${
                      isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                    }`}
                    style={{
                      color: isDarkTheme ? '#9ca3af' : '#64748b'
                    }}>Realtime updates instantly.</div>
                  </div>
                  <div className={`p-4 md:p-5 rounded-2xl border flex flex-col justify-center transition-colors duration-500 ${
                    isDarkTheme 
                      ? 'bg-blue-900/20 border-blue-700' 
                      : 'bg-blue-50/50 border-blue-100'
                  }`}
                  style={{
                    backgroundColor: isDarkTheme ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.5)',
                    borderColor: isDarkTheme ? '#1d4ed8' : '#dbeafe'
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Settings size={14} className="text-blue-600" />
                      <div className={`text-xs font-bold ${
                        isDarkTheme ? 'text-gray-200' : 'text-slate-800'
                      }`}
                      style={{
                        color: isDarkTheme ? '#e5e7eb' : '#1e293b'
                      }}>Themable</div>
                    </div>
                    <div className={`text-[10px] md:text-[11px] font-semibold mt-1 ${
                      isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                    }`}
                    style={{
                      color: isDarkTheme ? '#9ca3af' : '#64748b'
                    }}>Customizable markers.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <UseCaseSection
        isDarkTheme={isDarkTheme}
        embedUrl={embedUrl}
        MapPreview={MapPreview}
        handleStartNow={handleStartNow}
      />

      <FeaturesSection isDarkTheme={isDarkTheme} />
<section
  id="process"
  className={`py-16 md:py-24 px-6 border-y ${
    isDarkTheme
      ? 'bg-gray-900 border-gray-800'
      : 'bg-white border-slate-200'
  }`}
>
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight ${
        isDarkTheme ? 'text-white' : 'text-black'
      }`}>
        How It Works
      </h2>
      <p className={`text-base md:text-lg font-medium ${
        isDarkTheme ? 'text-gray-300' : 'text-slate-500'
      }`}>
        From sign-up to global deployment in minutes.
      </p>
    </div>

    {/* Steps */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`relative p-10 rounded-[32px] border group overflow-hidden transition-all ${
            isDarkTheme
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:shadow-xl'
              : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50'
          }`}
        >
          {/* Big background number */}
          <div className={`absolute -right-4 -top-8 text-[100px] font-black select-none pointer-events-none transition-colors ${
            isDarkTheme
              ? 'text-white/[0.03] group-hover:text-[#7c5cfc]/[0.08]'
              : 'text-slate-900/[0.03] group-hover:text-[#7c5cfc]/[0.05]'
          }`}>
            {step.id}
          </div>

          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[#7c5cfc] mb-8 border shadow-sm group-hover:bg-[#7c5cfc] group-hover:text-white transition-all ${
            isDarkTheme
              ? 'bg-gray-700 border-gray-600'
              : 'bg-white border-slate-200'
          }`}>
            {step.id === "01" && <Settings size={22} />}
            {step.id === "02" && <MousePointer2 size={22} />}
            {step.id === "03" && <Send size={22} />}
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold mb-3 ${
            isDarkTheme ? 'text-white' : 'text-slate-900'
          }`}>
            {step.title}
          </h3>

          {/* Description */}
          <p className={`text-sm leading-relaxed ${
            isDarkTheme ? 'text-gray-300' : 'text-slate-500'
          }`}>
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      <DeveloperSection isDarkTheme={isDarkTheme} />

  

      <footer className={`py-12 text-center transition-colors duration-500 ${
        isDarkTheme 
          ? 'bg-black border-t border-gray-800' 
          : 'bg-white border-t border-slate-200'
      }`}
      style={{
        backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
        borderTopColor: isDarkTheme ? '#1f2937' : '#e2e8f0'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className={`text-sm font-medium transition-colors duration-500 ${
              isDarkTheme ? 'text-gray-300' : 'text-slate-600'
            }`}
            style={{
              color: isDarkTheme ? '#d1d5db' : '#475569'
            }}>
              © {new Date().getFullYear()} MapFlow Engine. All rights reserved.
            </div>
            <div className={`text-xs transition-colors duration-500 ${
              isDarkTheme ? 'text-gray-400' : 'text-slate-500'
            }`}
            style={{
              color: isDarkTheme ? '#9ca3af' : '#64748b'
            }}>
              Built with ❤️ using Next.js & TypeScript
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTour && <MapTourModal />}
      </AnimatePresence>
    </div>
  );
}
