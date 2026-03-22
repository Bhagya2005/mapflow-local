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
  Loader2, ArrowRight, Play, User, Code, Copy, Check
} from "lucide-react";
import Link from "next/link";
import { useWalkthroughStore } from "@/stores/walkthroughStore";
import MapTourModal from "@/app/_components/MapTourModal";

const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] bg-white/40 backdrop-blur-md rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c5cfc 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-lg text-slate-700 relative group">
          <User size={24} className="md:w-8 md:h-8" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-500 border-2 border-white"
          ></motion.div>
        </div>
        <div className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-900 text-white rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-md">Client</div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0f172a] border border-white/10 flex items-center justify-center shadow-lg text-white relative">
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
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white border border-slate-200 shadow-xl flex items-center justify-center text-[#7c5cfc]">
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
        <div className="w-full max-w-[200px] md:max-w-[280px] aspect-[1.4/1] bg-white rounded-[20px] md:rounded-[24px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col relative scale-75 md:scale-100">
          <div className="h-5 md:h-6 bg-slate-50 border-b border-slate-100 px-2 md:px-3 flex items-center justify-between shrink-0">
            <div className="flex gap-1 md:gap-1.5">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-red-400 opacity-60"></div>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-yellow-400 opacity-60"></div>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-400 opacity-60"></div>
            </div>
            <div className="text-[6px] md:text-[7px] font-black tracking-tight text-slate-400 uppercase">MapFlow Platform</div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="w-1/4 bg-slate-50 border-r border-slate-100 p-1 md:p-2 space-y-1 md:space-y-2 shrink-0">
              <div className="h-1 md:h-1.5 w-full bg-[#7c5cfc]/20 rounded-full"></div>
              <div className="h-1 md:h-1.5 w-2/3 bg-slate-200 rounded-full"></div>
              <div className="h-1 md:h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1 md:h-1.5 w-full bg-[#7c5cfc]/30 rounded-full"
              ></motion.div>
            </div>

            <div className="flex-1 bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#7c5cfc 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

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
                className="absolute top-1/2 left-1/2 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-lg border border-slate-100 text-[5px] md:text-[6px] font-bold z-20"
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
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-[#7c5cfc]/20 selection:text-[#7c5cfc] overflow-x-hidden">

      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        html { scroll-behavior: smooth; }
      `}</style>

      <nav className="fixed top-0 w-full z-[100] backdrop-blur-xl border-b border-slate-200/60 bg-white/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0 })}>
            <span className="text-lg font-black tracking-tight text-slate-800">MapFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Use-Case", "Features", "Process", "Developer"].map((name) => {
              const id = name.toLowerCase();
              return (
                <a key={id} href={`#${id}`} className={`text-xs font-bold tracking-wide transition-all relative py-1 ${activeSection === id ? 'text-[#7c5cfc]' : 'text-slate-500 hover:text-slate-900'}`}>
                  {name}
                  {activeSection === id && <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#7c5cfc] rounded-t-full" />}
                </a>
              );
            })}
          </div>

          <button onClick={handleStartNow} className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all hover:bg-[#7c5cfc] hover:shadow-lg hover:shadow-[#7c5cfc]/25 cursor-pointer flex items-center gap-2">
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7c5cfc]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-slate-200 rounded-full bg-white shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#7c5cfc] animate-pulse"></div>
                <span className="text-slate-600 text-xs font-semibold tracking-wide">Introducing MapFlow Engine v2.0</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
                Geospatial experiences <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] to-blue-600">built for scale.</span>
              </h1>
              <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed font-medium">
                Transform static contact pages into high-performance, interactive maps that sync with your business data in real-time. Designed specifically for professional deployments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button onClick={handleStartNow} className="w-full sm:w-auto px-8 py-4 bg-[#7c5cfc] text-white rounded-full font-bold text-sm hover:-translate-y-1 transition-all shadow-[0_10px_30px_-10px_rgba(124,92,252,0.6)] cursor-pointer flex items-center justify-center gap-2">
                  Start Building Free <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setOpenTour(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-sm hover:-translate-y-1 transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play size={16} className="text-[#7c5cfc] fill-[#7c5cfc]" /> Watch Tour
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full hidden lg:block"
            >
              <HeroAnimation />
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
            <div className="bg-white border border-slate-200 rounded-[32px] md:rounded-[40px] p-8 md:p-10 flex flex-col justify-between shadow-sm relative group overflow-hidden">
              <div className="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm tracking-wide">
                    <AlertCircle size={18} className="text-slate-400" /> The Old Way
                  </div>
                </div>
                <div className="h-[300px] md:h-[400px] bg-slate-100 rounded-[24px] mb-8 flex flex-col items-center justify-center border border-dashed border-slate-300 relative overflow-hidden shadow-inner">
                  <img src="/images/1.png" className="w-full h-full object-cover opacity-80 mix-blend-multiply filter grayscale-[50%]" alt="Static Legacy Map" />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 backdrop-blur-[1px]">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-xs font-bold text-slate-600 border border-slate-200 flex items-center gap-2">
                      <XCircle size={14} className="text-red-500" /> Static Image
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-slate-800 font-bold text-sm mb-1">High Maintenance</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Requires manual updates and re-uploading JPEGs when data changes.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-slate-800 font-bold text-sm mb-1">Zero Interaction</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">No zooming, panning, or deep-linking. Poor UX for mobile users.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#7c5cfc]/20 rounded-[32px] md:rounded-[40px] p-8 md:p-10 flex flex-col shadow-[0_20px_60px_-15px_rgba(124,92,252,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c5cfc]/5 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-2 text-[#7c5cfc] font-bold text-sm tracking-wide">
                    <CheckCircle2 size={18} /> MapFlow Platform
                  </div>
                  <div className="flex items-center gap-2 bg-[#7c5cfc]/10 px-3 py-1.5 rounded-full border border-[#7c5cfc]/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#7c5cfc] uppercase tracking-wider">Live API</span>
                  </div>
                </div>

                <div className="h-[300px] md:h-[400px] bg-slate-50 rounded-[24px] overflow-hidden mb-8 border border-slate-200 shadow-lg relative group">
                  <MapPreview />
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <div className="bg-[#7c5cfc]/10 p-2 rounded-lg"><Globe size={16} className="text-[#7c5cfc]" /></div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-800">Global Edge CDN</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Render: 12ms</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 md:p-5 bg-[#7c5cfc]/[0.03] rounded-2xl border border-[#7c5cfc]/10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={14} className="text-[#7c5cfc]" />
                      <div className="text-xs font-bold text-slate-800">Active Sync</div>
                    </div>
                    <div className="text-[10px] md:text-[11px] font-semibold text-slate-500 mt-1">Realtime updates instantly.</div>
                  </div>
                  <div className="p-4 md:p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Settings size={14} className="text-blue-600" />
                      <div className="text-xs font-bold text-slate-800">Themable</div>
                    </div>
                    <div className="text-[10px] md:text-[11px] font-semibold text-slate-500 mt-1">Customizable markers.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section id="use-case" className="py-16 md:py-24 px-6 bg-white border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#7c5cfc]/[0.02] -skew-x-12 transform origin-top translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-[#7c5cfc]/20 rounded-full bg-[#7c5cfc]/5 text-[#7c5cfc] text-[10px] font-bold uppercase tracking-widest">
                <Code size={12} /> Developer Friendly
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
                Enterprise-Grade <br /><span className="text-[#7c5cfc]">Embed Infrastructure.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                Seamlessly integrate your custom maps into any CMS, Next.js app, or plain HTML site using our ultra-lightweight delivery system. Built for performance and modern scale.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <button onClick={handleStartNow} className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-[#7c5cfc] transition-all shadow-xl flex items-center justify-center gap-2">
                Developer Docs <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 group">
              <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl relative h-[380px] md:h-[500px] flex flex-col transition-transform lg:hover:-translate-y-2 duration-500">
                <div className="h-10 bg-slate-50 border-b border-slate-200 px-6 flex items-center gap-4 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 max-w-sm h-6 bg-white border border-slate-200 rounded-md px-3 hidden md:flex items-center gap-2">
                    <Globe size={10} className="text-slate-400" />
                    <div className="text-[10px] text-slate-400 font-mono truncate lowercase">mapflow.io/share/your-map</div>
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden bg-slate-100">
                  <MapPreview />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#f8fafc] border border-slate-200 p-5 rounded-[24px] flex items-center gap-4 shadow-sm group hover:border-[#7c5cfc]/30 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#7c5cfc]">
                  <LinkIcon size={22} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Direct Deploy Link</div>
                  <div className="flex items-center gap-2">
                    <input type="text" value={embedUrl} readOnly className="bg-transparent border-none outline-none text-xs text-slate-700 font-mono w-full truncate" />
                    <button className="p-1.5 text-slate-400 hover:text-[#7c5cfc] transition-colors"><Copy size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-[#0f172a] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-white/5 relative group/code min-h-[300px]">
                <div className="bg-white/5 backdrop-blur-md px-6 py-4 flex items-center justify-between shrink-0 border-b border-white/5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">iframe delivery</span>
                  <div className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md text-[9px] font-bold text-slate-300">
                    <Check size={10} className="text-emerald-400" /> Auto-Sync
                  </div>
                </div>
                <div className="p-3 md:p-8 overflow-auto flex-1 font-mono text-[10px] md:text-[13px] leading-relaxed text-slate-300">
                  <pre className="relative whitespace-pre-wrap break-all">
                    <span className="text-slate-500">&lt;!</span><span className="text-pink-400">DOCTYPE</span> <span className="text-blue-300">html</span><span className="text-slate-500">&gt;</span>{'\n'}
                    <span className="text-blue-400">&lt;html&gt;</span>{'\n'}
                    <span className="text-blue-400">&lt;body&gt;</span>{'\n'}
                    <span className="text-slate-500">  &lt;!-- Simple Integration --&gt;</span>{'\n'}
                    <span className="text-blue-400">  &lt;iframe</span>{'\n'}
                    <span className="text-blue-300">    src</span><span className="text-slate-300">=</span><span className="text-emerald-400">"{embedUrl}"</span>{'\n'}
                    <span className="text-blue-300">    width</span><span className="text-slate-300">=</span><span className="text-emerald-400">"100%"</span>{'\n'}
                    <span className="text-blue-300">    height</span><span className="text-slate-300">=</span><span className="text-emerald-400">"100vh"</span>{'\n'}
                    <span className="text-blue-300">    frameborder</span><span className="text-slate-300">=</span><span className="text-emerald-400">"0"</span><span className="text-blue-400">&gt;</span>{'\n'}
                    <span className="text-blue-400">  &lt;/iframe&gt;</span>{'\n'}
                    <span className="text-blue-400">&lt;/body&gt;</span>{'\n'}
                    <span className="text-blue-400">&lt;/html&gt;</span>
                  </pre>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-[#7c5cfc] text-white rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold shadow-xl cursor-pointer flex items-center gap-2 border border-white/20"
                  >
                    <Copy size={10} className="md:w-3 md:h-3" /> <span className="hidden xs:inline">Copy Code</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 px-6 bg-slate-50 mt-12 md:mt-26">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Why MapFlow?</h2>
            <p className="text-slate-500 text-base md:text-lg font-medium">Simplifying complex geographical data into manageable assets.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { i: <MousePointer2 size={24} />, t: "No-Code Editor", d: "A visual interface tailored for marketers and business owners. Manage pins without engineering help." },
              { i: <Zap size={24} />, t: "Real-Time Sync", d: "Updates in the dashboard instantly apply across all websites where your map is currently embedded." },
              { i: <Layout size={24} />, t: "Brand Aesthetics", d: "Escape the generic map look. Fully customize pin colors and styling to align with your brand system." },
              { i: <ExternalLink size={24} />, t: "Convert Traffic", d: "Interactive geospatial visualizations keep users engaged longer, reducing bounce rates efficiently." },
              { i: <MapPin size={24} />, t: "Smart Categorization", d: "Effectively group diverse locations—like ATMs vs Branches—using intuitive filtering built-in." },
              { i: <Cpu size={24} />, t: "Guided Walkthroughs", d: "Create sequential automated tours to present specific multi-step routes to your end-users." }
            ].map((feat, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-white border border-slate-200 hover:border-[#7c5cfc]/30 hover:shadow-[0_10px_40px_-10px_rgba(124,92,252,0.1)] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#7c5cfc] mb-6 group-hover:scale-110 transition-transform group-hover:bg-[#7c5cfc]/5 group-hover:border-[#7c5cfc]/10">
                  {feat.i}
                </div>
                <h4 className="font-bold text-lg mb-3 text-slate-900">{feat.t}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-16 md:py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">How It Works</h2>
            <p className="text-slate-500 text-base md:text-lg font-medium">From sign-up to global deployment in minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="relative p-10 rounded-[32px] bg-slate-50 border border-slate-200 group overflow-hidden hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                <div className="absolute -right-4 -top-8 text-[100px] font-black text-slate-900/[0.03] select-none pointer-events-none group-hover:text-[#7c5cfc]/[0.05] transition-colors">{step.id}</div>
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#7c5cfc] mb-8 border border-slate-200 shadow-sm group-hover:bg-[#7c5cfc] group-hover:text-white transition-all">
                  {step.id === "01" && <Settings size={22} />}
                  {step.id === "02" && <MousePointer2 size={22} />}
                  {step.id === "03" && <Send size={22} />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="developer" className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] md:rounded-[40px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 md:gap-16 relative overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-bl from-blue-100/50 to-[#7c5cfc]/5 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
            <div className="relative shrink-0 z-10 w-full md:w-auto flex justify-center">
              <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
                <img src="/images/bhagya.jpg" alt="Bhagya N. Patel" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:right-4 bg-slate-900 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full font-bold text-[8px] md:text-[10px] uppercase tracking-wider shadow-xl border border-slate-700">
                Creator
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-10">
              <h3 className="text-2xl md:text-4xl font-black mb-1 md:mb-2 text-slate-900 tracking-tight">Bhagya N. Patel</h3>
              <p className="text-[#7c5cfc] font-bold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wide">Software Architect</p>
              <p className="text-slate-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Passionate about building highly scalable tools with unparalleled developer experience. Let's create something extraordinary together.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link href="https://www.linkedin.com/in/bhagyapatel" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200">
                  <Linkedin size={18} />
                </Link>
                <Link href="https://github.com/Bhagya2005" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 hover:text-slate-900 transition-all border border-slate-200">
                  <Github size={18} />
                </Link>
                <Link href="mailto:bhagya20052904@gmail.com" className="px-6 md:px-8 py-2.5 md:py-3.5 bg-slate-900 text-white rounded-full text-xs md:text-sm font-bold shadow-md hover:bg-slate-800 hover:shadow-lg transition-all flex items-center gap-2">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-400 text-sm bg-white border-t border-slate-200">
        <p>© {new Date().getFullYear()} MapFlow Engine. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {showTour && <MapTourModal />}
      </AnimatePresence>
    </div>
  );
}
