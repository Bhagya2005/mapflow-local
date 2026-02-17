"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Hash, Layers, Globe, Zap } from "lucide-react";
import { ShowAllPinsModalProps } from "@/app/types";

export default function ShowAllPinsModal({ pins, onClose }: ShowAllPinsModalProps) {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<"name" | "category">("name");

  const filteredPins = pins.filter((p) => {
    if (!search) return true;
    const term = search.toLowerCase();
    const categoryName = p.categories?.[0]?.name || p.category || "Uncategorized";

    if (filterBy === "name") return p.name.toLowerCase().includes(term);
    if (filterBy === "category") return categoryName.toLowerCase().includes(term);
    return false;
  });

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-[#7c5cfc] text-white px-1 rounded-sm">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-[#0a0a0c] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col max-h-[70vh] overflow-hidden"
      >
    
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#7c5cfc]/10 rounded-xl">
              <Layers className="text-[#7c5cfc]" size={18} />
            </div>
            <h2 className="text-lg font-black text-white ">All Pins</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-red-500/20 hover:text-red-500 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-4 bg-white/[0.01] flex flex-col sm:flex-row gap-4 items-center border-b border-white/5">
          <div className="flex bg-black border border-white/10 rounded-xl p-1 shrink-0">
            {(["name", "category"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilterBy(option)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  filterBy === option ? "bg-[#7c5cfc] text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex-1 w-full relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#7c5cfc]" size={14} />
            <input
              type="text"
              placeholder={`Search ${filterBy}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-[#7c5cfc]/50 outline-none transition-all placeholder:text-zinc-800"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-2 custom-scroll bg-[#0a0a0c]">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                <th className="px-4 py-1">Node</th>
                <th className="px-4 py-1">Type</th>
                <th className="px-4 py-1 text-right">Position</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <AnimatePresence>
                {filteredPins.map((p) => {
                  const cat = p.categories?.[0];
                  const displayColor = cat?.color || p.color || "#7c5cfc";
                  const displayCategory = cat?.name || p.category || "General";

                  return (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={p.id || p._id} 
                      className="bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                    >
                      <td className="px-4 py-3 rounded-l-xl border-y border-l border-white/5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: displayColor, boxShadow: `0 0 8px ${displayColor}66` }} 
                          />
                          <span className="font-bold text-zinc-200 truncate max-w-[150px]">
                            {filterBy === "name" ? highlightText(p.name, search) : p.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 border-y border-white/5">
                        <span className="text-[9px] font-bold uppercase text-[#7c5cfc] bg-[#7c5cfc]/5 px-2 py-1 rounded border border-[#7c5cfc]/10">
                          {filterBy === "category" ? highlightText(displayCategory, search) : displayCategory}
                        </span>
                      </td>

                      <td className="px-4 py-3 rounded-r-xl border-y border-r border-white/5 text-[9px] font-mono text-zinc-500 text-right">
                        <span className="text-[#7c5cfc]/40">LAT:</span> {p.lat.toFixed(4)} <br/>
                        <span className="text-[#7c5cfc]/40">LNG:</span> {p.lng.toFixed(4)}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredPins.length === 0 && (
            <div className="py-10 text-center text-zinc-800 text-[10px] font-bold uppercase tracking-[0.3em]">No Records Found</div>
          )}
        </div>

      </motion.div>
    </div>
  );
}