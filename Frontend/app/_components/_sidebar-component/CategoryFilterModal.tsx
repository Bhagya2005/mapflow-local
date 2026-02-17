"use client";
import { CategoryFilterModalProps } from "@/app/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, RotateCcw, Filter, Check } from "lucide-react";

export default function CategoryFilterModal({
  categories = [],
  selectedCategories = [],
  setSelectedCategories,
  onClose,
}: CategoryFilterModalProps) {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedCategories);
  const [search, setSearch] = useState("");

  const toggleCategory = (name: string) => {
    setTempSelected((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  };

  const handleApply = () => {
    setSelectedCategories(tempSelected);
    onClose();
  };

  const handleReset = () => {
    setTempSelected([]);
    setSelectedCategories([]);
    onClose();
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] flex flex-col gap-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Filter className="text-indigo-400" size={20} />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase italic">
              Filter <span className="text-indigo-500">Nodes</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search metadata..."
            className="w-full rounded-2xl pl-12 pr-4 py-3 border border-white/5 bg-white/[0.03] text-white focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all placeholder:text-gray-600 italic text-sm"
          />
        </div>

        <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-2 custom-scroll">
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center py-12 opacity-20 italic">
              <Search size={32} className="mb-2" />
              <p className="text-sm">No sectors found</p>
            </div>
          ) : (
            filteredCategories.map((c) => {
              const isChecked = tempSelected.includes(c.name);
              return (
                <label
                  key={c.name}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
                    isChecked 
                    ? "bg-indigo-500/10 border-indigo-500/30" 
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(c.name)}
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isChecked ? "bg-indigo-500 border-indigo-500" : "border-white/10 bg-transparent"
                    }`}>
                      {isChecked && <Check size={14} className="text-white stroke-[4px]" />}
                    </div>
                  </div>

                  <span className={`flex-1 font-bold text-sm tracking-wide ${isChecked ? "text-white" : "text-gray-400"}`}>
                    {c.name.toUpperCase()}
                  </span>

                  <div
                    className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    style={{ 
                      backgroundColor: c.color,
                      boxShadow: isChecked ? `0 0 15px ${c.color}` : 'none'
                    }}
                  />
                </label>
              );
            })
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest"
          >
            <RotateCcw size={14} /> Reset
          </button>

          <button
            disabled={tempSelected.length === 0}
            onClick={handleApply}
            className={`flex-[2] py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-lg ${
              tempSelected.length
                ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20 active:scale-[0.98]"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
            }`}
          >
            Execute Filter ({tempSelected.length})
          </button>
        </div>
      </motion.div>
    </div>
  );
}