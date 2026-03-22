"use client";
import React, { useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { Trash2, ShieldAlert, Check, Search, X } from "lucide-react";
import { motion } from "framer-motion";
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
      <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-[420px] bg-[#09090b]/85 backdrop-blur-2xl border border-white/10 rounded-[28px] p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-5 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <ShieldAlert className="text-white" size={18} />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Manage Data
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative group z-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-red-500 transition-colors" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Locate target categories..."
              className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 focus:border-red-500/60 rounded-xl text-sm text-white/90 outline-none focus:ring-4 focus:ring-red-500/15 placeholder:text-white/30 transition-all shadow-inner"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto flex flex-col gap-1 pr-1 glass-scroll relative z-10 mt-1">
            {filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center py-10 opacity-40">
                <Search size={28} className="mb-3 text-white/50" />
                <p className="text-sm font-medium text-white italic">No targets acquired</p>
              </div>
            ) : (
              filteredCategories.map((cat: any) => {
                const id = cat.id || cat._id;
                const isSelected = selectedIds.includes(id);
                return (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                      }`}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(id)}
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                      />
                      <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all ${isSelected ? "bg-red-500 border-red-500" : "border-white/20 bg-black/20"
                        }`}>
                        {isSelected && <Check size={12} className="text-white stroke-[3px]" />}
                      </div>
                    </div>
                    <span className={`flex-1 text-[13px] font-semibold tracking-wide ${isSelected ? 'text-white' : 'text-white/60'}`}>
                      {cat.name}
                    </span>
                  </label>
                );
              })
            )}
          </div>

          <div className="flex gap-3 pt-3 relative z-10 border-t border-white/5 mt-1">
            <button
              onClick={onClose}
              className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              Abort
            </button>
            <button
              disabled={selectedIds.length === 0 || storeLoading}
              onClick={() => setShowConfirm(true)}
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${selectedIds.length
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/25"
                : "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                }`}
            >
              {storeLoading ? "Deleting..." : "Execute Wipe"}
              {selectedIds.length > 0 && <span className="bg-black/20 px-2 py-0.5 rounded-md ml-1">{selectedIds.length}</span>}
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