"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight, Globe, Link as LinkIcon, Check, Copy } from "lucide-react";

interface UseCaseSectionProps {
  isDarkTheme: boolean;
  embedUrl: string;
  MapPreview: React.ComponentType;
  handleStartNow: () => void;
}

const UseCaseSection: React.FC<UseCaseSectionProps> = ({
  isDarkTheme,
  embedUrl,
  MapPreview,
  handleStartNow,
}) => {
  console.log('UseCaseSection isDarkTheme:', isDarkTheme);
  
  return (
    <section
      id="use-case"
      className={`py-16 md:py-24 px-6 relative overflow-hidden transition-colors duration-500 ${
        isDarkTheme 
          ? "!bg-gray-900 !border-gray-700 border-y border-slate-200" 
          : "!bg-white !border-slate-200 border-y border-slate-200"
      }`}
      style={{
        backgroundColor: isDarkTheme ? '#111827' : '#ffffff',
        borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
      }}
    >
      <div
        className={`absolute top-0 right-0 w-1/3 h-full ${
          isDarkTheme
            ? "bg-purple-900/[0.02] -skew-x-12 transform origin-top translate-x-1/2"
            : "bg-[#7c5cfc]/[0.02] -skew-x-12 transform origin-top translate-x-1/2"
        }`}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-[#7c5cfc]/20 rounded-full bg-[#7c5cfc]/5 text-[#7c5cfc] text-[10px] font-bold uppercase tracking-widest">
              <Code size={12} /> Developer Friendly
            </div>
            <h2
              className={`text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            >
              Enterprise-Grade <br />
              <span className="text-[#7c5cfc]">Embed Infrastructure.</span>
            </h2>
            <p
              className={`text-base md:text-lg leading-relaxed font-medium ${
                isDarkTheme ? "text-gray-300" : "text-slate-500"
              }`}
            >
              Seamlessly integrate your custom maps into any CMS, Next.js app, or plain HTML site
              using our ultra-lightweight delivery system. Built for performance and modern scale.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={handleStartNow}
              className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${
                isDarkTheme
                  ? "bg-[#7c5cfc] text-white hover:bg-purple-700"
                  : "bg-slate-900 text-white hover:bg-[#7c5cfc]"
              }`}
            >
              Developer Docs <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className={`lg:col-span-7 group`}>
            <div
              className={`bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl relative h-[380px] md:h-[500px] flex flex-col transition-transform lg:hover:-translate-y-2 duration-500 ${
                isDarkTheme ? "bg-gray-900 border-gray-700" : "bg-white border-slate-200"
              }`}
            >
              <div
                className={`h-10 border-b px-6 flex items-center gap-4 shrink-0 ${
                  isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div
                  className={`flex-1 max-w-sm h-6 border rounded-md px-3 hidden md:flex items-center gap-2 ${
                    isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-slate-200"
                  }`}
                >
                  <Globe
                    size={10}
                    className={isDarkTheme ? "text-gray-400" : "text-slate-400"}
                  />
                  <div
                    className={`text-[10px] font-mono truncate lowercase ${
                      isDarkTheme ? "text-gray-400" : "text-slate-400"
                    }`}
                  >
                    mapflow.io/share/your-map
                  </div>
                </div>
              </div>
              <div
                className={`flex-1 relative overflow-hidden bg-slate-100 ${
                  isDarkTheme ? "bg-gray-800" : "bg-slate-100"
                }`}
              >
                <MapPreview />
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 flex flex-col gap-6`}>
            <div
              className={`border p-5 rounded-[24px] flex items-center gap-4 shadow-sm group hover:border-[#7c5cfc]/30 transition-all ${
                isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-[#f8fafc] border-slate-200"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl shadow-sm border flex items-center justify-center text-[#7c5cfc] ${
                  isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-slate-100"
                }`}
              >
                <LinkIcon size={22} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div
                  className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${
                    isDarkTheme ? "text-gray-400" : "text-slate-400"
                  }`}
                >
                  Direct Deploy Link
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={embedUrl}
                    readOnly
                    className={`bg-transparent border-none outline-none text-xs font-mono w-full truncate ${
                      isDarkTheme ? "text-gray-300" : "text-slate-700"
                    }`}
                  />
                  <button
                    className={`p-1.5 transition-colors ${
                      isDarkTheme
                        ? "text-gray-300 hover:text-[#7c5cfc]"
                        : "text-slate-400 hover:text-[#7c5cfc]"
                    }`}
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`flex-1 bg-[#0f172a] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-white/5 relative group/code min-h-[300px] ${
                isDarkTheme ? "bg-gray-900 border-gray-700" : "bg-[#0f172a] border-white/5"
              }`}
            >
              <div
                className={`px-6 py-4 flex items-center justify-between shrink-0 border-b ${
                  isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white/5 backdrop-blur-md border-b border-white/5"
                }`}
              >
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5 ${
                    isDarkTheme ? "text-gray-300" : "text-slate-400"
                  }`}
                >
                  iframe delivery
                </span>
                <div
                  className={`flex items-center gap-2 px-2 py-1 rounded-md text-[9px] font-bold ${
                    isDarkTheme
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  <Check size={10} className="text-emerald-400" /> Auto-Sync
                </div>
              </div>
              <div
                className={`p-3 md:p-8 overflow-auto flex-1 font-mono text-[10px] md:text-[13px] leading-relaxed ${
                  isDarkTheme ? "text-gray-300" : "text-slate-300"
                }`}
              >
                <pre className="relative whitespace-pre-wrap break-all">
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&lt;!DOCTYPE html&gt;</span>{"\n"}
                  <span className="text-blue-300">html</span>{"\n"}
                  <span className="text-blue-300">head</span>{"\n"}
                  <span className="text-blue-300">title</span>{"\n"}
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&lt;!</span>
                  <span className="text-pink-400">DOCTYPE</span>{" "}
                  <span className="text-blue-300">html</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className="text-blue-300">html</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className="text-blue-300">head</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className="text-blue-300">title</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&lt;/</span>
                  <span className="text-blue-300">title</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className="text-blue-300">body</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&lt;!-- Simple Integration --&gt;</span>{"\n"}
                  <span className="text-blue-300">iframe</span>
                  {"\n"}
                  <span className="text-blue-300">src</span>
                  <span className={isDarkTheme ? "text-gray-400" : "text-slate-300"}>=</span>
                  <span className="text-emerald-400">"{embedUrl}"</span>
                  {"\n"}
                  <span className="text-blue-300">width</span>
                  <span className={isDarkTheme ? "text-gray-400" : "text-slate-300"}>=</span>
                  <span className="text-emerald-400">"100%"</span>
                  {"\n"}
                  <span className="text-blue-300">height</span>
                  <span className={isDarkTheme ? "text-gray-400" : "text-slate-300"}>=</span>
                  <span className="text-emerald-400">"100vh"</span>
                  {"\n"}
                  <span className="text-blue-300">frameborder</span>
                  <span className={isDarkTheme ? "text-gray-400" : "text-slate-300"}>=</span>
                  <span className="text-emerald-400">"0"</span>
                  {"\n"}
                  <span className="text-blue-300">&gt;</span>
                  {"\n"}
                  <span className="text-blue-300">&lt;/</span>
                  <span className="text-blue-300">iframe</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className="text-blue-300">&lt;/</span>
                  <span className="text-blue-300">body</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>{"\n"}
                  <span className="text-blue-300">&lt;/</span>
                  <span className="text-blue-300">html</span>
                  <span className={isDarkTheme ? "text-gray-500" : "text-slate-500"}>&gt;</span>
                </pre>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-4 right-4 px-3 py-1.5 md:px-4 md:py-2 bg-[#7c5cfc] text-white rounded-lg md:rounded-xl text-[9px] font-bold shadow-xl cursor-pointer flex items-center gap-2 border border-white/20"
                >
                  <Copy size={10} className="md:w-3 md:h-3" />{" "}
                  <span className="hidden xs:inline">Copy Code</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
