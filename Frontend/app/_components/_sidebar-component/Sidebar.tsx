
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Plus, Filter, Trash2, Share2,
  MessageSquare, LogOut, X, Menu, Search, Orbit, Eye,
  ChevronRight, Layers, Power
} from "lucide-react";

import { usePinStore } from "@/stores/pinStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useAuthStore } from "@/stores/authStore";
import { showSuccess } from "@/utils/toast";

import AddCategoryModal from "@/app/_components/_sidebar-component/AddCategoryModal";
import CategoryFilterModal from "@/app/_components/_sidebar-component/CategoryFilterModal";
import UserSettingsModal from "@/app/_components/_sidebar-component/UserSettingsModal";
import FeedbackModal from "@/app/_components/_sidebar-component/FeedbackModal";
import ShowAllPinsModal from "@/app/_components/_sidebar-component/ShowAllPinsModal";
import DeleteCategoryModal from "@/app/_components/_sidebar-component/DeleteCategoryModal";
import ShareModal from "@/app/_components/_sidebar-component/ShareModal";
import ConfirmationModal from "@/app/_components/ConfirmationModal";

export default function Sidebar({ mapRef, onEditPin, onFlyTo }: any) {
  const router = useRouter();
  
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
        .custom-scroll::-webkit-scrollbar { width: 4px; } 
        .custom-scroll::-webkit-scrollbar-thumb { background: #7c5cfc; border-radius: 10px; }
      `}</style>
      {!open && (
        <button onClick={() => setOpen(true)} className="lg:hidden fixed top-6 left-6 z-[999] bg-[#7c5cfc] text-white p-3 rounded-xl shadow-lg">
          <Menu size={20} />
        </button>
      )}

      <aside className={`fixed inset-y-0 left-0 z-[1000] w-full sm:w-[380px] bg-gradient-to-br from-[#1e1b4b] to-[#0a0a0c] border-r border-white/10 flex flex-col transition-all duration-500 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
 
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Orbit className="text-[#7c5cfc]" size={22} />
              <h2 className="text-lg font-black text-white uppercase italic">MapFlow</h2>
            </div>
            <button onClick={() => setOpen(false)} className="lg:hidden text-white/50"><X size={20} /></button>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-200">User: {user?.email || "Guest"}</span>
          </div>
        </div>

        <div className="px-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Layers size={14} className="text-[#7c5cfc]" />
              <span className="text-[15px] font-black text-gray-400">Categories</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => setModals({ addCat: true })} className="group flex items-center justify-between px-5 py-2 mt-1 mb-1 bg-white/5 text-white rounded-2xl hover:scale-[1.02] transition-all border border-white/5">
                <div className="flex items-center gap-4">
                  <Plus size={16} className="text-[#7c5cfc]" />
                  <span className="text-xs font-black uppercase tracking-widest">Add Category</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setModals({ filter: true })} className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all font-bold text-[10px] uppercase">
                  <Filter size={14} className="text-[#7c5cfc]" /> Filter
                </button>
                <button onClick={() => setModals({ deleteCat: true })} className="flex items-center justify-center gap-3 py-3 bg-red-500/5 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-bold text-[10px] uppercase">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
           
           <div className="flex items-center gap-2 mb-1">
              <Layers size={14} className="text-[#7c5cfc]" />
              <span className="text-[15px] font-black text-gray-400">Pins</span>
            </div>

          <div className="relative pt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
            <input
              type="text" placeholder="Search Pins..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-[#7c5cfc]/50"
            />
          </div>
        </div>

        <div className="px-6 py-4 flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto custom-scroll pr-1 space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredPins.length === 0 ? (
                <div className="py-10 text-center opacity-20 text-xs text-white ">No Pins Found</div>
              ) : (
                filteredPins.map((pin: any) => (
                  <motion.div
                    layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    key={pin.id || pin._id}
                    onClick={() => onFlyTo(pin)}
                    className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl hover:border-[#7c5cfc]/30 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white/90">{pin.name || "Node"}</span>
                        <span className="text-[9px] font-black text-[#7c5cfc] uppercase">
                          {pin.category || pin.categories?.[0]?.name || "Uncategorized"}
                        </span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); onEditPin(pin); }} className="text-white/40 hover:text-white"><Settings size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); setPinToDelete(pin.id || pin._id); }} className="text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-black/20 space-y-3">
          <button onClick={() => setModals({ showAll: true })} className="w-full py-4 text-[10px] font-black border border-[#7c5cfc]/40 text-white rounded-xl hover:bg-[#7c5cfc]/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
            <Eye size={14} /> Scan All Pins
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setModals({ share: true })} className="flex items-center justify-center gap-2 py-3 text-[9px] font-bold border border-white/10 text-white rounded-xl hover:bg-white/5 uppercase"><Share2 size={12} /> Share</button>
            <button onClick={() => setModals({ feedback: true })} className="flex items-center justify-center gap-2 py-3 text-[9px] font-bold border border-white/10 text-white rounded-xl hover:bg-white/5 uppercase"><MessageSquare size={12} /> Feedback</button>
          </div>
          <button onClick={logout} className="w-full py-3 text-[10px] font-black bg-white text-black rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase flex items-center justify-center gap-2"><Power size={12} /> Logout</button>
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

