"use client";

import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/stores/userStore";

export default function UsersManagement() {
  const {
    users, usersTotalPages, usersRole,
    loadUsers, saveUser, deleteUser, userForm,
    setUserForm, editingUserId
  } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((u: any) => {
      const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (u.name || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole ? u.role === selectedRole : true;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (user?: any) => {
    if (user) {
      useUserStore.setState({ editingUserId: user._id || user.id });
      setUserForm({ ...user, name: user.name || user.username });
    } else {
      useUserStore.setState({ editingUserId: null });
      setUserForm({ email: "", name: "", password: "", role: "regular" });
    }
    setShowModal(true);
  };

  const handleAddOrUpdate = async () => {
    await saveUser();
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Users List</h2>
        <button
          onClick={() => openModal()}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-white transition-all"
        >
          + New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-black p-4 rounded-xl border border-white/10">
        <input
          placeholder="Search email/name..."
          className="bg-gray-800 border border-white/10 p-2 rounded text-sm text-white col-span-2 outline-none focus:border-purple-500"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="bg-gray-800 border border-white/10 p-2 rounded text-sm text-white outline-none"
          value={selectedRole}
          onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="regular">Regular</option>
        </select>
        <button onClick={loadUsers} className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-sm text-white">
          Refresh Data
        </button>
      </div>

      <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="p-4">User Details</th>
              <th className="p-4">Role</th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {displayedUsers.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-500">No users found</td></tr>
            ) : (
              displayedUsers.map((u: any) => (
                <tr key={u._id || u.id} className="hover:bg-white/5 transition-all">
                  <td className="p-4">
                    <div className="font-bold text-white">{u.email}</div>
                    <div className="text-xs text-gray-500">@{u.name || u.username || "n/a"}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-purple-500/10 text-purple-300"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "New"}
                  </td>
                  <td className="p-4 space-x-3 text-right">
                    <button onClick={() => openModal(u)} className="text-purple-400 hover:text-purple-300">Edit</button>
                    <button onClick={() => deleteUser(u._id || u.id)} className="text-red-500 hover:text-red-400">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-4 border-t border-white/10 flex justify-between items-center bg-white/5">
          <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 text-white text-xs">Prev</button>
            <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 text-white text-xs">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-black border border-white/10 p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-5 text-white">{editingUserId ? "Edit User" : "Create User"}</h2>
            <div className="space-y-4">
              <input
                placeholder="Email Address"
                disabled={!!editingUserId}
                className="w-full bg-gray-800 p-3 rounded-xl border border-white/10 text-white outline-none disabled:opacity-50"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
              <input
                placeholder="Name"
                className="w-full bg-gray-800 p-3 rounded-xl border border-white/10 text-white outline-none"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
              {!editingUserId && (
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-800 p-3 rounded-xl border border-white/10 text-white outline-none"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                />
              )}
              <select
                className="w-full bg-gray-800 p-3 rounded-xl border border-white/10 text-white outline-none"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="regular">Regular User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-sm">Cancel</button>
              <button onClick={handleAddOrUpdate} className="bg-purple-600 px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-purple-600/20">Save Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}