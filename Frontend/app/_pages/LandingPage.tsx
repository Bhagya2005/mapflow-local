"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { motion } from "framer-motion";
import {
  Orbit, Github, Linkedin,
  Layout, Zap, Shield, Link as LinkIcon,
  ExternalLink, MapPin, AlertCircle, CheckCircle2,
  MousePointer2, Settings, Send, XCircle, Globe, Cpu,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuthStore() as any;
  const [activeSection, setActiveSection] = useState("hero");

  const [isMounted, setIsMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  const embedUrl = "http://localhost:3000/share/y@gmail.com";

  const steps = [
    { id: "01", title: "Create & Auth", desc: "Securely sign in and create your workspace categories." },
    { id: "02", title: "Pin Locations", desc: "Set custom colored pins with descriptions and walkthroughs." },
    { id: "03", title: "Generate Link", desc: "Click share to get your unique live-map business URL." }
  ];

  const fullHtmlCode = `<!DOCTYPE html>
<html>
<head>
    <style>body { margin: 0; background: #000; overflow: hidden; }</style>
</head>
<body>
    <iframe src="${embedUrl}" width="100%" height="100vh" frameborder="0"></iframe>
</body>
</html>`;

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
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {(!iframeLoaded || !isMounted) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]">
          <Loader2 className="w-8 h-8 text-[#7c5cfc] animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7c5cfc]/60">
            Syncing Map Data...
          </p>
        </div>
      )}
      {isMounted && (
        <iframe
          src={embedUrl}
          onLoad={() => setIframeLoaded(true)}
          className={`w-full h-full border-none transition-opacity duration-700 ${
            iframeLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#7c5cfc] selection:text-black overflow-x-hidden">

      <style jsx global>{`
        ::-webkit-scrollbar { display: none !important; }
        html { scroll-behavior: smooth; }
      `}</style>

      <nav className="fixed top-0 w-full z-[100] backdrop-blur-xl border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0 })}>
            <div className="w-7 h-7 bg-[#7c5cfc] rounded-lg flex items-center justify-center">
              <Orbit size={16} className="text-white" />
            </div>
            <span className="text-md font-black tracking-tighter uppercase italic">MapFlow</span>
          </div>

          <div className="hidden md:flex text-white items-center gap-8 ">
            {["Use-Case", "Features", "Process", "Developer"].map((name) => {
              const id = name.toLowerCase();
              return (
                <a key={id} href={`#${id}`} className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeSection === id ? 'text-[#7c5cfc]' : 'text-white/40 hover:text-white'}`}>
                  {name}
                  {activeSection === id && <motion.div layoutId="nav-glow" className="absolute -bottom-1 left-0 right-0 h-px bg-[#7c5cfc]" />}
                </a>
              );
            })}
          </div>

          <button onClick={handleStartNow} className="bg-white text-black px-5 py-2 rounded-full font-black text-[10px] uppercase transition-all hover:bg-[#7c5cfc] hover:text-white cursor-pointer">
            Get Started
          </button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
            <div className="inline-block px-4 py-1.5 mb-6 border border-[#7c5cfc]/30 rounded-full bg-[#7c5cfc]/5">
              <span className="text-[#7c5cfc] text-[20px] font-black uppercase tracking-[0.3em]">MapFlow</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-8 ">
              Dynamic Marker & Live-Sync System
            </h1>
            <p className="max-w-2xl mx-auto text-white/40 text-lg md:text-xl mb-10 leading-relaxed">
              Transform static contact pages into high-performance, interactive geospatial experiences that sync with your business data in real-time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleStartNow} className="px-10 py-4 bg-[#7c5cfc] rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform cursor-pointer">Get Started</button>
            </div>
          </motion.div>

          <section id="problem" className="grid lg:grid-cols-2 gap-12 items-stretch ">
            <div className="bg-white/[0.01] border border-white/10 rounded-[60px] p-12 flex flex-col justify-between opacity-60 transition-all">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3 text-red-500 font-black text-[16px] uppercase tracking-widest">
                    <AlertCircle size={20} /> Legacy Method
                  </div>
                </div>
                <div className="h-[550px] bg-white/5 rounded-[40px] mb-12 flex flex-col items-center justify-center border border-dashed border-white/10 relative overflow-hidden ">
                  <img src="/images/1.png" className="w-full h-full object-cover" alt="Static Legacy Map" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 px-2">
                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                  <h4 className="text-red-400/80 font-black text-[12px] uppercase mb-2">Technical Debt</h4>
                  <p className="text-white/30 text-xs leading-relaxed italic">Manual JPEG exports every time a branch opens. No deep-linking or GPS capabilities.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-[13px] font-bold text-red-400/60 uppercase tracking-widest bg-red-500/5 p-4 rounded-xl">
                    <XCircle size={18} className="shrink-0" /> No Interaction (Static Pixels)
                  </div>
                  <div className="flex items-center gap-4 text-[13px] font-bold text-red-400/60 uppercase tracking-widest bg-red-500/5 p-4 rounded-xl">
                    <XCircle size={18} className="shrink-0" /> Not Themable (Broken Branding)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#7c5cfc]/[0.03] border-2 border-[#7c5cfc]/20 rounded-[60px] p-4 flex flex-col shadow-[0_0_150px_rgba(124,92,252,0.15)] relative overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3 text-[#7c5cfc] font-black text-[16px] uppercase tracking-widest">
                    <CheckCircle2 size={20} /> MapFlow Engine
                  </div>
                  <div className="flex items-center gap-2 bg-[#7c5cfc]/20 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
                    <span className="text-[9px] font-black text-[#7c5cfc] uppercase">Live v2.4</span>
                  </div>
                </div>

                <div className="h-[550px] bg-black rounded-[50px] overflow-hidden mb-12 border border-[#7c5cfc]/30 shadow-2xl relative group">
                  <MapPreview />
                  <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-xl p-4 rounded-3xl border border-white/10 flex items-center gap-4 shadow-2xl transform group-hover:translate-y-[-10px] transition-transform z-30">
                    <div className="bg-[#7c5cfc]/10 p-2 rounded-lg"><Globe size={18} className="text-[#7c5cfc]" /></div>
                    <div>
                      <div className="text-[10px] font-black text-white uppercase">Global CDN</div>
                      <div className="text-[9px] text-[#7c5cfc] font-mono">Lat: 23.0225° N</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-5 bg-[#7c5cfc]/5 rounded-3xl border border-[#7c5cfc]/10">
                    <Cpu size={20} className="text-[#7c5cfc] mb-3" />
                    <div className="text-[10px] font-black text-white uppercase mb-1">Low Latency</div>
                    <div className="text-[16px] font-black text-[#7c5cfc]">12ms</div>
                  </div>
                  <div className="p-5 bg-[#7c5cfc]/5 rounded-3xl border border-[#7c5cfc]/10">
                    <Zap size={20} className="text-[#7c5cfc] mb-3" />
                    <div className="text-[10px] font-black text-white uppercase mb-1">Active Sync</div>
                    <div className="text-[16px] font-black text-[#7c5cfc]">Realtime</div>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-[13px] font-black text-[#7c5cfc] uppercase tracking-widest bg-[#7c5cfc]/10 p-4 rounded-xl border border-[#7c5cfc]/20">
                    <CheckCircle2 size={18} className="shrink-0" /> Full Interactive Dashboard
                  </div>
                  <div className="flex items-center gap-4 text-[13px] font-black text-[#7c5cfc] uppercase tracking-widest bg-[#7c5cfc]/10 p-4 rounded-xl border border-[#7c5cfc]/20">
                    <CheckCircle2 size={18} className="shrink-0" /> Dynamic Cloud Branding
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section id="use-case" className="py-40 px-6 bg-[#030303] border-y border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#7c5cfc] to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 ">Use Case</h2>
            <p className="text-white/20 text-sm font-bold uppercase tracking-[0.5em] mb-4">Enterprise Embed Infrastructure</p>
            <div className="w-24 h-1 bg-[#7c5cfc] mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 h-[600px] items-stretch">
            <div className="flex flex-col gap-8 h-full">
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight">Developer API Access</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                  Integrate MapFlow into any stack using our ultra-lightweight iframe delivery system. Copy the generated bundle and deploy in seconds.
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-4 shadow-2xl">
                <LinkIcon size={20} className="text-[#7c5cfc]" />
                <input type="text" value={embedUrl} readOnly className="bg-transparent border-none outline-none text-[11px] text-white/50 font-mono w-full" />
              </div>
              <div className="flex-1 bg-[#020202] border border-white/10 rounded-[50px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-0">
                <div className="bg-white/5 px-10 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-[#7c5cfc]/20" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 tracking-[0.4em]">DEPLOY_MANIFEST.HTML</span>
                </div>
                <textarea
                  className="flex-1 p-10 bg-transparent font-mono text-[12px] text-[#7c5cfc]/80 outline-none resize-none leading-relaxed overflow-y-auto scrollbar-hide"
                  style={{ scrollbarWidth: 'none' }}
                  value={fullHtmlCode}
                  readOnly
                />
              </div>
            </div>
            <div className="bg-black border border-white/10 rounded-[60px] overflow-hidden relative shadow-[0_0_80px_rgba(124,92,252,0.1)] h-full">
              <MapPreview />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4">Why Choose MapFlow?</h2>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Simplifying Complex Mapping for Your Business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { i: <MousePointer2 size={28} />, t: "No-Code Management", d: "Providing a 'No-Code' interface for non-technical business owners to manage complex geographical data easily." },
              { i: <Zap size={28} />, t: "Real-Time Accuracy", d: "Updates made in your dashboard reflect instantly on your website, ensuring customers always see the right info." },
              { i: <Layout size={28} />, t: "Brand Matching", d: "Unlike generic maps, you can match the map aesthetic to your brand identity for a professional look." },
              { i: <ExternalLink size={28} />, t: "Boost Engagement", d: "Replace static images with interactive maps that improve the 'Time-on-Site' for your customers." },
              { i: <MapPin size={28} />, t: "Easy Categorization", d: "Organize your locations (like ATMs or Branches) with unique colors and icons." },
              { i: <Cpu size={28} />, t: "Guided Experience", d: "Automated walkthroughs guide your users across different locations effortlessly." }
            ].map((feat, i) => (
              <div key={i} className="p-12 rounded-[50px] bg-[#0a0a0a] border border-white/5 hover:border-[#7c5cfc]/40 transition-all hover:-translate-y-2 group">
                <div className="text-[#7c5cfc] mb-8 group-hover:scale-110 transition-transform">{feat.i}</div>
                <h4 className="font-bold text-xl mb-4 uppercase tracking-tight">{feat.t}</h4>
                <p className="text-white/30 text-sm leading-relaxed">{feat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-32 px-6 bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 ">Process</h2>
            <div className="w-24 h-1 bg-[#7c5cfc] mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            {steps.map((step) => (
              <div key={step.id} className="relative p-14 rounded-[60px] bg-black border border-white/10 group overflow-hidden">
                <div className="absolute -right-6 -top-6 text-[120px] font-black text-white/[0.02]">{step.id}</div>
                <div className="w-16 h-16 rounded-3xl bg-[#7c5cfc]/10 flex items-center justify-center text-[#7c5cfc] mb-10 border border-[#7c5cfc]/20 shadow-lg shadow-[#7c5cfc]/5">
                  {step.id === "01" && <Settings size={28} />}
                  {step.id === "02" && <MousePointer2 size={28} />}
                  {step.id === "03" && <Send size={28} />}
                </div>
                <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                <p className="text-white/30 text-base leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="developer" className="py-40 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[60px] p-16 md:p-24 flex flex-col md:flex-row items-center gap-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c5cfc]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative shrink-0">
              <div className="w-48 h-70 rounded-[50px] overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bhagya.jpg" alt="Bhagya N. Patel" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-black px-6 py-2 rounded-2xl font-black text-[11px] uppercase italic shadow-2xl z-10">
                Core Architect
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-10">
              <h3 className="text-4xl font-black mb-4 leading-none ">Bhagya N. Patel</h3>
              <p className="text-[#7c5cfc] font-black mb-10">Full Stack Engineer</p>
              <p className="text-white/40 text-xl leading-relaxed mb-12 italic max-w-lg">
                Passionate about creating innovative solutions and building scalable applications. Combining technical expertise with problem-solving skills to develop efficient software solutions.
              </p>
              <div className="flex justify-center md:justify-start gap-6">
                <Link href="https://www.linkedin.com/in/bhagyapatel" className="p-5 bg-white/5 rounded-3xl hover:text-[#7c5cfc] transition-all hover:bg-white/10 border border-white/5">
                  <Linkedin size={24} />
                </Link>
                <Link href="mailto:bhagya20052904@gmail.com" className="px-12 py-5 bg-white text-black rounded-3xl text-[12px] font-black uppercase tracking-widest hover:bg-[#7c5cfc] hover:text-white transition-all shadow-xl">
                  Contact Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


