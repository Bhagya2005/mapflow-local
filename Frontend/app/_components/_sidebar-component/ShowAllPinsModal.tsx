"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Layers, Settings, Trash2, MapPin } from "lucide-react";
import { ShowAllPinsModalProps } from "@/app/types";
import { usePinStore } from "@/stores/pinStore";

export default function ShowAllPinsModal({ pins, onClose }: ShowAllPinsModalProps) {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<"name" | "category">("name");

  // Allow deleting from the mega list directly if desired (requires hook)
  const deletePin = usePinStore((state: any) => state.deletePin);

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
        <span key={index} className="bg-[#7c5cfc] text-white px-1 rounded-md shadow-sm">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-[#09090b]/85 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col max-h-[85vh] overflow-hidden relative"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7c5cfc]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2"></div>

        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center relative z-10 w-full shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#7c5cfc] rounded-xl shadow-[0_0_20px_rgba(124,92,252,0.4)]">
              <Layers className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Enterprise Registry</h2>
              <p className="text-xs text-white/50 font-medium mt-0.5">{pins.length} Total Registered Nodes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-5 flex flex-col sm:flex-row gap-4 items-center shrink-0 relative z-10">
          <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 shrink-0 shadow-inner">
            {(["name", "category"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilterBy(option)}
                className={`px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filterBy === option ? "bg-[#7c5cfc] text-white shadow-lg" : "text-white/40 hover:text-white/80"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex-1 w-full relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#7c5cfc] transition-colors" size={16} />
            <input
              type="text"
              placeholder={`Search registry by ${filterBy}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white/90 focus:border-[#7c5cfc]/50 outline-none transition-all placeholder:text-white/30 shadow-inner focus:ring-4 focus:ring-[#7c5cfc]/20"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-8 py-2 glass-scroll relative z-10">
          <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden shadow-inner">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-black/40 border-b border-white/10">
                  <th className="px-6 py-4">Node Profile</th>
                  <th className="px-6 py-4">Classification</th>
                  <th className="px-6 py-4 text-right">Coordinates</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-white/80">
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
                        className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-black/30 border border-white/5 flex items-center justify-center shrink-0">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: displayColor, boxShadow: `0 0 10px ${displayColor}` }} />
                            </div>
                            <span className="font-semibold text-white/90 truncate max-w-[200px]">
                              {filterBy === "name" ? highlightText(p.name, search) : p.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5">
                            {filterBy === "category" ? highlightText(displayCategory, search) : displayCategory}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-[11px] font-mono text-white/50 text-right space-y-1">
                          <div><span className="text-[#7c5cfc]">LAT</span> {p.lat.toFixed(4)}</div>
                          <div><span className="text-[#7c5cfc]">LNG</span> {p.lng.toFixed(4)}</div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredPins.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center">
                <MapPin size={32} className="text-white/20 mb-4" />
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest">No Coordinates Match Query</div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 px-8 py-5 relative z-10 shrink-0">
          <button onClick={onClose} className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all">
            Close Registry
          </button>
        </div>
      </motion.div>
    </div>
  );
}