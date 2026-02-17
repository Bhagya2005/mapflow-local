"use client";

import { useState, FormEvent } from "react";

interface AddCategoryModalProps {
  onAddCategory: (category: { name: string; color: string }) => void;
  onClose: () => void;
}

export default function AddCategoryModal({
  onAddCategory,
  onClose,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#7c5cfc");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddCategory({ name, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl space-y-4 w-full max-w-sm shadow-2xl"
      >
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">Add Category</h2>

        <div className="space-y-1">
          <label className="text-[10px] text-gray-400 font-bold uppercase">Category Name</label>
          <input
            type="text"
            placeholder="e.g. Restaurants"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white outline-none focus:border-[#7c5cfc]/50"
            autoFocus
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-gray-400 font-bold uppercase">Marker Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 cursor-pointer p-1"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-white text-xs font-bold hover:bg-white/5 transition-all"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#7c5cfc] py-3 rounded-xl text-white text-xs font-bold hover:bg-[#6b4ae0] transition-all"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}