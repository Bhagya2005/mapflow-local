"use client";

import { useEffect, useState } from "react";
import { useWalkthroughStore } from "@/stores/walkthroughStore";
import { 
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent 
} from "@dnd-kit/core";
import { 
  SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates 
} from "@dnd-kit/sortable";



export default function WalkthroughsManagement() {
  const {
    walkthroughs,
    fetchWalkthroughs,
    saveWalkthrough,
    deleteWalkthrough,
    reorderWalkthroughs,
    walkthroughForm,
    setWalkthroughForm,
    editingWalkthroughId,
    showModal,
    setShowModal
  } = useWalkthroughStore();

  const [localLoading, setLocalLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchWalkthroughs();
  }, [fetchWalkthroughs]);

  const handleOpenModal = (walkthrough?: any) => {
    if (walkthrough) {
      useWalkthroughStore.setState({ editingWalkthroughId: walkthrough.id || walkthrough._id });
      setWalkthroughForm({ ...walkthrough });
    } else {
      useWalkthroughStore.setState({ editingWalkthroughId: null });
      setWalkthroughForm({ title: "", description: "", videoUrl: "" });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    setLocalLoading(true);
    await saveWalkthrough();
    setLocalLoading(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderWalkthroughs(active.id as string, over.id as string);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-white">Walkthrough Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
        >
          + Add New Step
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext 
            items={walkthroughs.map((w: any) => w.id || w._id || "")} 
            strategy={verticalListSortingStrategy}
          >
            <div className="divide-y divide-white/5">
              {walkthroughs.length === 0 ? (
                <div className="p-12 text-center text-zinc-500">No steps found. Start by adding one!</div>
              ) : (
                walkthroughs.map((w: any) => (
                  <div key={w.id || w._id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-600 cursor-grab active:cursor-grabbing">⠿</span>
                      <div>
                        <h4 className="text-white font-medium">{w.title}</h4>
                        <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-xs">
                          {w.videoUrl ? "🎥 Video Included" : "📝 Text Only"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleOpenModal(w)} className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold p-2">Edit</button>
                      <button onClick={() => deleteWalkthrough(w.id || w._id)} className="text-red-500 hover:text-red-400 text-sm font-semibold p-2">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingWalkthroughId ? "Edit Walkthrough Step" : "New Walkthrough Step"}
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Title</label>
                <input
                  className="w-full bg-zinc-800 p-3 rounded-xl border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Enter step title..."
                  value={walkthroughForm.title}
                  onChange={(e) => setWalkthroughForm({ ...walkthroughForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Points (comma separated)</label>
                <textarea
                  className="w-full bg-zinc-800 p-3 rounded-xl border border-white/10 text-white outline-none h-24 focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Step 1, Step 2, Step 3..."
                  value={walkthroughForm.description}
                  onChange={(e) => setWalkthroughForm({ ...walkthroughForm, description: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Video URL</label>
                <input
                  className="w-full bg-zinc-800 p-3 rounded-xl border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="https://video-link.mp4"
                  value={walkthroughForm.videoUrl}
                  onChange={(e) => setWalkthroughForm({ ...walkthroughForm, videoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={localLoading}
                className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-bold text-white disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20"
              >
                {localLoading ? "Saving..." : "Save Step"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}