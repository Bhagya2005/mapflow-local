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
  } = useWalkthroughStore();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
    setLoading(true);
    try {
      await saveWalkthrough();
      setShowModal(false); 
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderWalkthroughs(active.id as string, over.id as string);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Walkthrough Steps</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white font-bold transition-all"
        >
          + Add New Step
        </button>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext 
            items={walkthroughs.map((w: any) => w.id || w._id || "")} 
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {walkthroughs.length === 0 ? (
                <p className="text-center text-zinc-500 py-10">No steps found.</p>
              ) : (
                walkthroughs.map((w: any) => (
                  <div 
                    key={w.id || w._id} 
                    className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-600 cursor-grab">⠿</span>
                      <div>
                        <h4 className="text-white font-medium">{w.title}</h4>
                        <p className="text-xs text-zinc-500">{w.videoUrl ? "✓ Video Attached" : "No Video"}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleOpenModal(w)} className="text-indigo-400 text-sm hover:underline">Edit</button>
                      <button onClick={() => deleteWalkthrough(w.id || w._id)} className="text-red-500 text-sm hover:underline">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingWalkthroughId ? "Edit Step" : "New Step"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Title</label>
                <input
                  className="w-full bg-zinc-800 p-3 rounded-xl border border-white/10 text-white outline-none focus:border-indigo-500"
                  value={walkthroughForm.title}
                  onChange={(e) => setWalkthroughForm({ ...walkthroughForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Description</label>
                <textarea
                  className="w-full bg-zinc-800 p-3 rounded-xl border border-white/10 text-white outline-none h-24"
                  value={walkthroughForm.description}
                  onChange={(e) => setWalkthroughForm({ ...walkthroughForm, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Video URL</label>
                <input
                  className="w-full bg-zinc-800 p-3 rounded-xl border border-white/10 text-white outline-none"
                  value={walkthroughForm.videoUrl}
                  onChange={(e) => setWalkthroughForm({ ...walkthroughForm, videoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button 
                onClick={() => setShowModal(false)} 
                className="text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-bold text-white disabled:opacity-50 min-w-[100px]"
              >
                {loading ? "Saving..." : "Save Step"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}