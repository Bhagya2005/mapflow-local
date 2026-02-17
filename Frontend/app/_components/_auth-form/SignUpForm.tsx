"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore"; 
import { showError } from "@/utils/toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const signup = useAuthStore((s: any) => s.signup);
  const loading = useAuthStore((s: any) => s.loading);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return showError("All fields are required!");
    }

    if (password !== confirmPassword) {
      return showError("Passwords do not match.");
    }

    try {
      await signup({ 
        name: name.trim(), 
        email: email.trim(), 
        password 
      }, router);
    } catch (err: any) {
      showError(err?.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-4">
        <div className="inline-flex p-3 bg-[#7c5cfc]/10 rounded-2xl">
          <UserPlus className="text-[#7c5cfc]" size={28} />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Sign Up</h1>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 ml-1 font-bold uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            className="w-full bg-[#1e1b2e]/50 border border-white/5 rounded-2xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-[#7c5cfc]/50"
            value={name} 
            placeholder="Your Name" 
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 ml-1 font-bold uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            className="w-full bg-[#1e1b2e]/50 border border-white/5 rounded-2xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-[#7c5cfc]/50"
            value={email} 
            placeholder="email@example.com" 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 relative">
            <label className="text-[10px] text-gray-500 ml-1 font-bold uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full bg-[#1e1b2e]/50 border border-white/5 rounded-2xl px-4 py-3.5 text-white outline-none pr-12"
                value={password} 
                placeholder="******" 
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500 ml-1 font-bold uppercase tracking-wider">Confirm</label>
            <input
              type="password"
              className="w-full bg-[#1e1b2e]/50 border border-white/5 rounded-2xl px-4 py-3.5 text-white outline-none"
              value={confirmPassword} 
              placeholder="******" 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7c5cfc] hover:bg-[#6b4dfa] text-white py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-[#7c5cfc] font-bold">Sign In</Link>
        </p>
      </form>
    </div>
  );
}