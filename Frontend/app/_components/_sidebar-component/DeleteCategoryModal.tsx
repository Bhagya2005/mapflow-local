"use client";
import React, { useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { Trash2, ShieldAlert, Check, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "@/app/_components/ConfirmationModal";

export default function DeleteCategoryModal({ onClose, onSuccess }: any) {
  const { categories, deleteCategories, loading: storeLoading } = useCategoryStore() as any;
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredCategories = categories.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleWipe = async () => {
    const success = await deleteCategories(selectedIds);
    if (success) {
      setShowConfirm(false);
      onSuccess(); 
      onClose();   
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-[#0a0a0c] border border-red-500/20 rounded-[32px] p-8 shadow-[0_0_50px_-12px_rgba(239,68,68,0.2)] flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <ShieldAlert className="text-red-500" size={20} />
              </div>
          
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-gray-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Locate target categories..."
              className="w-full rounded-2xl pl-12 pr-4 py-3 border border-white/5 bg-white/[0.03] text-white focus:outline-none focus:border-red-500/50 focus:bg-red-500/5 transition-all placeholder:text-gray-600 italic text-sm"
            />
          </div>

          <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-2 custom-scroll">
            {filteredCategories.length === 0 ? (
              <div className="py-12 text-center opacity-20 italic text-sm">No targets acquired</div>
            ) : (
              filteredCategories.map((cat: any) => {
                const id = cat.id || cat._id;
                const isSelected = selectedIds.includes(id);
                return (
                  <div 
                    key={id} 
                    onClick={() => toggleSelect(id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
                      isSelected ? 'bg-red-500/10 border-red-500/30' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-red-500 border-red-500' : 'border-white/10'}`}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`flex-1 font-bold text-sm tracking-wide ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                      {cat.name.toUpperCase()}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-white/5 text-gray-400 text-xs font-black uppercase tracking-widest hover:text-white transition-all">Abort</button>
            <button 
              disabled={selectedIds.length === 0 || storeLoading}
              onClick={() => setShowConfirm(true)}
              className={`flex-[2] py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                selectedIds.length ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/20" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              {storeLoading ? "Deleting..." : `Initialize Deletion (${selectedIds.length})`}
            </button>
          </div>
        </motion.div>
      </div>

      <ConfirmationModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleWipe}
        loading={storeLoading}
        title="Confirm Termination"
        message={`Are you sure you want to delete ${selectedIds.length} categories? This action is irreversible and all associated data will be wiped.`}
        confirmText="Yes, Wipe Data"
      />
    </>
  );
}