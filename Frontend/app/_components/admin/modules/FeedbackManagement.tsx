"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Tooltip, Legend,
} from "chart.js";
import { useEffect, useState, useMemo } from "react";
import { useFeedbackStore } from "@/stores/feedbackStore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FeedbackManagement() {
  const { feedbacks, loading, fetchFeedbacks } = useFeedbackStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((f: any) => {
      const matchCategory = category ? (f.feedbackType || f.category) === category : true;
      const matchStatus = status ? f.status === status : true;
      const matchSearch = searchTerm 
        ? (f.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           f.description?.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return matchCategory && matchStatus && matchSearch;
    });
  }, [feedbacks, category, status, searchTerm]);

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const displayedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const ratingData = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    feedbacks.forEach((f: any) => {
      if (f.rating >= 1 && f.rating <= 5) counts[f.rating - 1]++;
    });
    return {
      labels: ["1★", "2★", "3★", "4★", "5★"],
      datasets: [{
        label: "Ratings",
        data: counts,
        backgroundColor: "rgba(147, 51, 234, 0.6)",
        borderRadius: 5,
      }],
    };
  }, [feedbacks]);

  return (
    <div className="p-8 space-y-10">
      <div className="grid md:grid-cols-4 gap-4 bg-black p-4 rounded-xl border border-white/10">
        <input
          placeholder="Search by title..."
          className="bg-gray-800 p-2 rounded border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-gray-800 p-2 rounded border border-white/10 text-sm text-white"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All Categories</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
        </select>
        <select
          className="bg-gray-800 p-2 rounded border border-white/10 text-sm text-white"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
        </select>
        <button
          onClick={fetchFeedbacks}
          disabled={loading}
          className="bg-purple-600 rounded font-bold text-white hover:bg-purple-500 transition-colors disabled:opacity-50"
        >
          Refresh Data
        </button>
      </div>

      <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="p-4">Feedback</th>
              <th className="p-4">Type</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="p-10 text-center animate-pulse text-gray-500">Loading...</td></tr>
            ) : displayedFeedbacks.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-500">No feedbacks found</td></tr>
            ) : (
              displayedFeedbacks.map((f: any) => (
                <tr key={f._id || f.id} className="hover:bg-white/5">
                  <td className="p-4">
                    <div className="text-white font-bold">{f.title || "No Title"}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{f.description}</div>
                  </td>
                  <td className="p-4 capitalize text-gray-400">{f.feedbackType}</td>
                  <td className="p-4 text-yellow-500">{"★".repeat(f.rating)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                      f.status === 'resolved' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-500/10 text-purple-300'
                    }`}>
                      {f.status || 'open'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-4 flex justify-between items-center bg-white/5 border-t border-white/10">
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 text-xs text-white"
            > Prev </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 text-xs text-white"
            > Next </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-black p-5 rounded-xl border border-white/10">
          <h4 className="text-white mb-4 text-sm font-bold">Rating Distribution</h4>
          <Bar data={ratingData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}