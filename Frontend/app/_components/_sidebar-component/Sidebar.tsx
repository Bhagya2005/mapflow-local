"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Plus, Filter, Trash2, Share2,
  MessageSquare, X, Menu, Search, Eye,
  Compass, Power, MoreVertical,
  MapPin, User
} from "lucide-react";

import { usePinStore } from "@/stores/pinStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useAuthStore } from "@/stores/authStore";
import { useMapThemeStore } from "@/stores/mapThemeStore";
import { showSuccess } from "@/utils/toast";

import AddCategoryModal from "@/app/_components/_sidebar-component/AddCategoryModal";
import CategoryFilterModal from "@/app/_components/_sidebar-component/CategoryFilterModal";
import UserSettingsModal from "@/app/_components/_sidebar-component/UserSettingsModal";
import FeedbackModal from "@/app/_components/_sidebar-component/FeedbackModal";
import ShowAllPinsModal from "@/app/_components/_sidebar-component/ShowAllPinsModal";
import DeleteCategoryModal from "@/app/_components/_sidebar-component/DeleteCategoryModal";
import ShareModal from "@/app/_components/_sidebar-component/ShareModal";
import ConfirmationModal from "@/app/_components/ConfirmationModal";

export default function Sidebar({ mapRef, onEditPin, onFlyTo, onFilteredPinsChange }: any) {
  const router = useRouter();

  const mapTheme = useMapThemeStore((state: any) => state.mapTheme);
  const isDark = mapTheme === "dark";

  const pins = usePinStore((state: any) => state.pins);
  const fetchPins = usePinStore((state: any) => state.fetchPins);
  const deletePin = usePinStore((state: any) => state.deletePin);

  const { categories, addCategory, fetchCategories } = useCategoryStore();
  const user = useAuthStore((state: any) => state.user);
  const { logout } = useAuthStore() as any;

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [modals, setModals] = useState<{ [key: string]: boolean }>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [pinToDelete, setPinToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (user) {
      fetchPins();
      fetchCategories();
    }
  }, [user, fetchPins, fetchCategories]);

  const filteredPins = useMemo(() => {
    if (!pins) return [];

    const activeCategoryNames = categories.map((c: any) => c.name);

    return pins.filter((p: any) => {
      const pinCat = p.category || p.categories?.[0]?.name;
      const isCategoryValid = activeCategoryNames.includes(pinCat);

      const matchesSearch = searchTerm === "" || p.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedCategories.length === 0 || selectedCategories.includes(pinCat);

      return isCategoryValid && matchesSearch && matchesFilter;
    });
  }, [pins, searchTerm, selectedCategories, categories]);

  useEffect(() => {
    if (onFilteredPinsChange) {
      onFilteredPinsChange(filteredPins);
    }
  }, [filteredPins, onFilteredPinsChange]);

  const confirmDeletePin = async () => {
    if (!pinToDelete) return;
    setIsDeleting(true);
    try {
      await deletePin(pinToDelete);
      setPinToDelete(null);
    } catch (error) { console.error(error); } finally { setIsDeleting(false); }
  };

  if (!isHydrated) return null;

  return (
    <>
      <style jsx global>{`
        .glass-scroll::-webkit-scrollbar { width: 5px; } 
        .glass-scroll::-webkit-scrollbar-track { background: transparent; }
        .glass-scroll::-webkit-scrollbar-thumb { border-radius: 10px; background: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}; }
        .glass-scroll::-webkit-scrollbar-thumb:hover { background: ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}; }
      `}</style>

      {!open && (
        <button onClick={() => setOpen(true)} className={`lg:hidden fixed top-5 left-5 z-[999] p-2.5 rounded-xl shadow-lg transition-all ${isDark ? 'bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/10' : 'bg-[#f0f2f5]/90 backdrop-blur-md border border-zinc-200 text-zinc-800 hover:bg-white'}`}>
          <Menu size={20} />
        </button>
      )}

      {/* Deep Glassmorphism Container */}
      <aside className={`fixed inset-y-0 left-0 z-[1000] w-full sm:w-[340px] flex flex-col transition-all duration-500 backdrop-blur-[40px] ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 ${isDark ? 'bg-[#09090b]/40 border-r border-white-[0.08] shadow-[20px_0_40px_-20px_rgba(0,0,0,0.5)]' : 'bg-white/40 border-r border-white/40 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.08)]'}`}>

        {/* Header Profile Area */}
        <div className="p-5 pb-3">
          <div className="flex justify-between items-center mb-5">
            <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>MapFlow</h2>
            <button onClick={() => setOpen(false)} className={`lg:hidden transition-colors p-1.5 rounded-lg ${isDark ? 'text-white/50 hover:text-white bg-white/5 hover:bg-white/10' : 'text-zinc-400 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200'}`}><X size={18} /></button>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-[16px] transition-colors cursor-pointer border group ${isDark ? 'hover:bg-white/10 border-transparent hover:border-white/10' : 'hover:bg-zinc-50 border-transparent hover:border-zinc-200'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7c5cfc] to-[#9b82fc] flex items-center justify-center text-white font-bold shadow-lg shadow-[#7c5cfc]/30">
              {user?.email ? user.email.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="flex-1 truncate">
              <div className={`text-sm font-bold truncate ${isDark ? 'text-white/90' : 'text-zinc-800'}`}>{user?.name || "Workspace Admin"}</div>
              <div className={`text-[11px] font-medium truncate ${isDark ? 'text-white/50' : 'text-zinc-500'}`}>{user?.email || "Guest"}</div>
            </div>
          </div>
        </div>

        {/* Global Search */}
        <div className="px-5 py-2">
          <div className="relative group">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#7c5cfc] ${isDark ? 'text-white/40' : 'text-zinc-500'}`} size={15} />
            <input
              type="text" placeholder="Search locations..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-[14px] text-sm outline-none focus:ring-4 focus:ring-[#7c5cfc]/20 focus:border-[#7c5cfc]/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] transition-all ${isDark ? 'bg-black/20 border border-white/10 hover:border-white/20 text-white/90 placeholder:text-white/30' : 'bg-white/40 border border-white/60 hover:border-white text-zinc-900 placeholder:text-zinc-500 focus:bg-white/70'}`}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto glass-scroll px-3 py-4 space-y-8">

          {/* Categories Block */}
          <div>
            <div className="px-3 mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-white/30' : 'text-zinc-400'}`}>Categories</span>
            </div>
            <div className="space-y-1">
              <button onClick={() => setModals({ addCat: true })} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors group ${isDark ? 'hover:bg-white/[0.08] text-white/80' : 'hover:bg-white/60 text-zinc-700'}`}>
                <div className={`p-1 shadow-sm rounded-md transition-colors group-hover:border-[#7c5cfc]/50 group-hover:text-[#7c5cfc] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-zinc-200'}`}><Plus size={14} /></div>
                New Category
              </button>
              <button onClick={() => setModals({ filter: true })} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors group ${isDark ? 'hover:bg-white/[0.08] text-white/80' : 'hover:bg-white/60 text-zinc-700'}`}>
                <div className={`p-1 shadow-sm rounded-md transition-colors ${isDark ? 'bg-white/5 border border-white/10 group-hover:border-white/30' : 'bg-white border border-zinc-200 group-hover:border-zinc-300'}`}><Filter size={14} className={`transition-colors ${isDark ? 'text-white/50 group-hover:text-white' : 'text-zinc-500 group-hover:text-zinc-800'}`} /></div>
                Filter View
              </button>
              <button onClick={() => setModals({ deleteCat: true })} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors group ${isDark ? 'hover:bg-red-500/10 text-white/80 hover:text-red-400' : 'hover:bg-white/60 hover:text-red-600 text-zinc-700'}`}>
                <div className={`p-1 shadow-sm rounded-md transition-colors ${isDark ? 'bg-white/5 border border-white/10 group-hover:border-red-400/30 group-hover:bg-red-500/20' : 'bg-white border border-zinc-200 group-hover:border-red-200 group-hover:bg-red-50'}`}><Trash2 size={14} className={`transition-colors ${isDark ? 'text-white/50 group-hover:text-red-400' : 'text-zinc-500 group-hover:text-red-500'}`} /></div>
                Manage Data
              </button>
            </div>
          </div>

          {/* Pins List Block */}
          <div>
            <div className="px-3 mb-3 flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-white/30' : 'text-zinc-400'}`}>Registry</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDark ? 'text-white/50 bg-white/5 border border-white/5' : 'text-zinc-500 bg-zinc-100 border border-zinc-200'}`}>{filteredPins.length}</span>
            </div>

            <div className="space-y-2 px-1">
              <AnimatePresence mode="popLayout">
                {filteredPins.length === 0 ? (
                  <div className={`py-8 text-center rounded-2xl mx-2 ${isDark ? 'bg-white/5 border border-dashed border-white/10' : 'bg-zinc-100/50 border border-dashed border-zinc-300'}`}>
                    <Compass className={`mx-auto mb-2 ${isDark ? 'text-white/20' : 'text-zinc-300'}`} size={24} />
                    <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>No locations found</p>
                  </div>
                ) : (
                  filteredPins.map((pin: any) => (
                    <motion.div
                      layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      key={pin.id || pin._id}
                      onClick={() => onFlyTo(pin)}
                      className={`p-3.5 rounded-[14px] transition-all cursor-pointer group flex justify-between items-center ${isDark ? 'bg-white/[0.03] border border-white/10 hover:border-[#7c5cfc]/50 hover:bg-white/[0.08] hover:shadow-lg' : 'bg-white border border-zinc-200 hover:border-[#7c5cfc]/50 hover:bg-zinc-50 hover:shadow-md shadow-sm'}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isDark ? 'bg-black/30 border border-white/5 group-hover:border-[#7c5cfc]/50' : 'bg-zinc-100 border border-zinc-200'}`}>
                          <MapPin size={14} className="text-[#7c5cfc]" />
                        </div>
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className={`text-sm font-semibold truncate ${isDark ? 'text-white/90' : 'text-zinc-800'}`}>{pin.name || "Node"}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-widest truncate ${isDark ? 'text-white/40' : 'text-zinc-400'}`}>
                            {pin.category || pin.categories?.[0]?.name || "Uncategorized"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); onEditPin(pin); }} className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100'}`}><Settings size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); setPinToDelete(pin.id || pin._id); }} className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-white/40 hover:text-red-400 hover:bg-red-500/10' : 'text-zinc-400 hover:text-red-500 hover:bg-red-50'}`}><Trash2 size={14} /></button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-5 space-y-2 ${isDark ? 'border-t border-white/10 bg-black/20' : 'border-t border-white/30 bg-white/20'}`}>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setModals({ showAll: true })} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-colors group ${isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 group-hover:bg-[#7c5cfc]/40' : 'bg-white border border-zinc-200 shadow-sm group-hover:border-[#7c5cfc]/40'}`}><Eye size={16} /></div>
              <span className="text-[10px] font-bold tracking-wider">View All</span>
            </button>
            <button onClick={() => setModals({ share: true })} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-colors group ${isDark ? 'hover:bg-white/10 text-white/50 hover:text-blue-400' : 'hover:bg-zinc-100 text-zinc-500 hover:text-blue-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 group-hover:bg-blue-500/40' : 'bg-white border border-zinc-200 shadow-sm group-hover:border-blue-300'}`}><Share2 size={16} /></div>
              <span className="text-[10px] font-bold tracking-wider">Share</span>
            </button>
            <button onClick={() => setModals({ feedback: true })} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-colors group ${isDark ? 'hover:bg-white/10 text-white/50 hover:text-emerald-400' : 'hover:bg-zinc-100 text-zinc-500 hover:text-emerald-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 group-hover:bg-emerald-500/40' : 'bg-white border border-zinc-200 shadow-sm group-hover:border-emerald-300'}`}><MessageSquare size={16} /></div>
              <span className="text-[10px] font-bold tracking-wider">Feedback</span>
            </button>
          </div>
          <button onClick={logout} className={`w-full flex items-center justify-between px-4 py-3 mt-2 rounded-[14px] transition-all font-semibold text-xs group ${isDark ? 'bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/20 text-white/70 hover:text-red-400' : 'bg-white border border-zinc-200 hover:border-red-500/50 hover:bg-red-50 hover:shadow-md text-zinc-600 hover:text-red-500 shadow-sm'}`}>
            <span className="flex items-center gap-2 tracking-wider"><Power size={14} className="group-hover:text-red-400 transition-colors" /> Sign Out</span>
          </button>
        </div>
      </aside>

      <ConfirmationModal
        isOpen={!!pinToDelete} onClose={() => setPinToDelete(null)} onConfirm={confirmDeletePin} loading={isDeleting}
        title="Delete Pin" message="Permanent deletion of selected Pin." confirmText="Execute" type="danger"
      />

      {modals.addCat && (
        <AddCategoryModal
          onAddCategory={async (c: any) => {
            await addCategory({ ...c, userId: user?.email });
            fetchPins();
          }}
          onClose={() => setModals({})}
        />
      )}

      {modals.deleteCat && (
        <DeleteCategoryModal
          onClose={() => setModals({})}
          onSuccess={() => {
            setModals({});
            fetchPins();
            showSuccess("Pins Successfully Deleted");
          }}
        />
      )}
      {modals.filter && <CategoryFilterModal categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} onClose={() => setModals({})} />}
      {modals.feedback && <FeedbackModal onClose={() => setModals({})} />}
      {modals.showAll && <ShowAllPinsModal pins={pins} onClose={() => setModals({})} />}
      {modals.share && <ShareModal userId={user?.email} onClose={() => setModals({})} />}
    </>
  );
}
