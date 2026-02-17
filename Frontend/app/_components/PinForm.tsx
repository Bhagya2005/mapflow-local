"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, MapPin, AlignLeft, Tag, Save, ChevronDown } from "lucide-react";

export default function PinForm({ pin, categories, onSave, onClose }: any) {
  const [formData, setFormData] = useState({
    name: pin?.name || "",
    description: pin?.description || "",
    lat: pin?.lat || 0,
    lng: pin?.lng || 0,
    categoryId: pin?.categoryId || pin?.categories?.[0]?.id || "",
    categories: pin?.categories || [],
  });

  useEffect(() => {
    if (pin) {
      setFormData({
        name: pin.name || "",
        description: pin.description || "",
        lat: pin.lat || 0,
        lng: pin.lng || 0,
        categoryId: pin.categoryId || pin.categories?.[0]?.id || "",
        categories: pin.categories || [],
      });
    }
  }, [pin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div 
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px]"
      >
        <form 
          onSubmit={handleSubmit}
          className="relative border border-white/10 bg-[#0a0a0c] p-7 rounded-[28px] shadow-2xl flex flex-col gap-5 overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#7c5cfc] rounded-xl">
                <MapPin className="text-white" size={18} />
              </div>
              <h2 className="text-lg font-bold text-white">
                Pin Details
              </h2>
            </div>
            <button 
              type="button"
              onClick={onClose} 
              className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#7c5cfc] uppercase tracking-widest ml-1">Pin Name</label>
              <input
                type="text"
                placeholder="Where is this?"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#7c5cfc]/50 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Category</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-[#7c5cfc]/50 outline-none cursor-pointer appearance-none transition-all"
                  value={formData.categoryId}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedCat = categories.find((c: any) => c.id === selectedId);
                    setFormData({ 
                      ...formData, 
                      categoryId: selectedId,
                      categories: selectedCat ? [selectedCat] : [] 
                    });
                  }}
                  required
                >
                  <option value="" disabled className="bg-[#0a0a0c]">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id} className="bg-[#0a0a0c]">{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Notes</label>
              <textarea
                placeholder="Add some details about this place..."
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white h-24 resize-none focus:border-[#7c5cfc]/50 outline-none transition-all"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-4 py-3.5 rounded-xl bg-[#7c5cfc] hover:bg-[#6b4ae0] text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#7c5cfc]/20 flex items-center justify-center gap-2 transition-all"
            >
              <Save size={16} />
              Save Pin
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}