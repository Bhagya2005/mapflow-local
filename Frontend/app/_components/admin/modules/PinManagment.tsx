"use client";

import { useEffect, useState, useMemo } from "react";
import { usePinStore } from "@/stores/pinStore";

export default function PinManagement() {
  const {
    pins,
    loading,
    fetchPins,
    savePin,
    deletePin,
    setPinForm,
    setEditingPin,
    editingPinId
  } = usePinStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [localForm, setLocalForm] = useState({ name: "", description: "", lat: 0, lng: 0, categoryId: "" });

  const itemsPerPage = 6;

  useEffect(() => {
    fetchPins();
  }, [fetchPins]);

  const filteredPins = useMemo(() => {
    return pins.filter((pin: any) => {
      const matchesSearch = pin.name.toLowerCase().includes(search.toLowerCase());
      const pinCat = pin.categories?.[0]?.name?.toLowerCase() || "";
      const matchesCategory = category ? pinCat === category.toLowerCase() : true;
      return matchesSearch && matchesCategory;
    });
  }, [pins, search, category]);

  const totalPages = Math.ceil(filteredPins.length / itemsPerPage) || 1;
  const currentPins = filteredPins.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const openCreateModal = () => {
    setEditingPin(null); 
    setLocalForm({ name: "", description: "", lat: 0, lng: 0, categoryId: "" });
    setShowModal(true);
  };

  const openEditModal = (pin: any) => {
    setEditingPin(pin); 
    setLocalForm({
      name: pin.name,
      description: pin.description || "",
      lat: pin.lat,
      lng: pin.lng,
      categoryId: pin.categories?.[0]?.id || pin.categoryId || ""
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinForm(localForm);
    const success = await savePin();
    if (success) {
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap gap-4 bg-zinc-900 p-4 rounded-xl border border-white/10 items-center">
        <input
          placeholder="Search pins..."
          className="bg-zinc-800 border border-white/10 p-2 rounded-md flex-1 text-sm text-white outline-none focus:border-blue-500"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="bg-zinc-800 border border-white/10 p-2 rounded-md text-sm text-white outline-none"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
        >
          <option value="">All Categories</option>
          <option value="tourist">Tourist</option>
          <option value="food">Food</option>
          <option value="hotel">Hotel</option>
        </select>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 px-4 py-2 rounded-md text-sm font-bold text-white hover:bg-blue-500 transition-colors"
        >
          + Add Pin
        </button>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Coords</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currentPins.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-zinc-500">No pins found</td></tr>
            ) : (
              currentPins.map((pin: any) => (
                <tr key={pin.id || pin._id} className="hover:bg-white/5">
                  <td className="p-4 font-medium text-white">{pin.name}</td>
                  <td className="p-4">
                    <span className="bg-zinc-800 px-2 py-1 rounded text-[10px] uppercase font-bold text-zinc-400">
                      {pin.categories?.[0]?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400 font-mono text-xs">{pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</td>
                  <td className="p-4 space-x-3 text-right">
                    <button onClick={() => openEditModal(pin)} className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button 
                       onClick={() => { if(confirm("Delete this pin?")) deletePin(pin.id) }} 
                       className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
          <p className="text-xs text-zinc-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 bg-zinc-800 rounded disabled:opacity-30 text-white text-xs">Prev</button>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-zinc-800 rounded disabled:opacity-30 text-white text-xs">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-zinc-900 border border-white/10 p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-white">{editingPinId ? "Update Pin" : "Create Pin"}</h2>
            <div className="space-y-3">
              <input 
                placeholder="Name" 
                className="w-full bg-zinc-800 p-2.5 rounded border border-white/10 text-white" 
                value={localForm.name} 
                onChange={e => setLocalForm({...localForm, name: e.target.value})} 
                required 
              />
              <textarea 
                placeholder="Description" 
                className="w-full bg-zinc-800 p-2.5 rounded border border-white/10 text-white h-20" 
                value={localForm.description} 
                onChange={e => setLocalForm({...localForm, description: e.target.value})} 
              />
              <div className="flex gap-2">
                <input type="number" step="any" placeholder="Lat" className="w-full bg-zinc-800 p-2.5 rounded border border-white/10 text-white" value={localForm.lat} onChange={e => setLocalForm({...localForm, lat: parseFloat(e.target.value) || 0})} required />
                <input type="number" step="any" placeholder="Lng" className="w-full bg-zinc-800 p-2.5 rounded border border-white/10 text-white" value={localForm.lng} onChange={e => setLocalForm({...localForm, lng: parseFloat(e.target.value) || 0})} required />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
              <button type="submit" disabled={loading} className="bg-blue-600 px-6 py-2 rounded-md font-bold text-white hover:bg-blue-500 disabled:opacity-50">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}