"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import Loading from "@/app/_components/ui/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [showPass, setShowPass] = useState(false);

  const { login, user, loading } = useAuthStore() as any;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [user, router]);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
     <div className="mb-10 text-left">
  <div className="flex items-center gap-4 mb-4">
    <div className="inline-flex p-3 bg-[#7c5cfc]/10 rounded-2xl">
      <LockKeyhole className="text-[#7c5cfc]" size={28} />
    </div>
    <h1 className="text-3xl font-bold text-white tracking-tight">Login</h1>
  </div>
  
</div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">User Type</label>
          <div className="flex gap-2 p-1.5 bg-[#1e1b2e]/80 backdrop-blur-md rounded-2xl border border-white/5">
            {["user", "admin"].map((r) => (
              <button 
                key={r} 
                onClick={() => setRole(r as any)} 
                className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-tighter transition-all duration-300 ${
                  role === r 
                  ? "bg-[#7c5cfc] text-white shadow-lg shadow-[#7c5cfc]/20" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500 ml-1 font-bold uppercase tracking-wider">Email</label>
            <input 
              className="w-full bg-[#1e1b2e]/50 border border-white/5 rounded-2xl px-4 py-4 text-white focus:ring-2 focus:ring-[#7c5cfc]/50 transition-all outline-none placeholder:text-gray-600" 
              placeholder="bhagya@example.com" value={email} onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="space-y-1.5 relative">
            <label className="text-[10px] text-gray-500 ml-1 font-bold uppercase tracking-wider">Password</label>
            <div className="relative">
              <input 
                type={showPass ? "text" : "password"} 
                className="w-full bg-[#1e1b2e]/50 border border-white/5 rounded-2xl px-4 py-4 text-white focus:ring-2 focus:ring-[#7c5cfc]/50 transition-all outline-none pr-12" 
                placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} 
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => login(email, password, role)} 
          disabled={loading} 
          className="w-full bg-[#7c5cfc] hover:bg-[#6b4dfa] h-[60px] rounded-2xl font-bold text-white flex items-center justify-center relative shadow-2xl shadow-[#7c5cfc]/20 transition-all active:scale-[0.98] group"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                <Loading />
                <span className="text-sm tracking-wide">Logging in...</span>
              </motion.div>
            ) : (
              <motion.span key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm tracking-wide">
                Login
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link href="/sign-up" className="text-[#7c5cfc] font-bold hover:underline">Sign Up</Link>
        </p>
        <p className="text-center text-sm text-gray-500">
          Forgot Password ? <Link href="/forgot-password" className="text-[#7c5cfc] font-bold hover:underline">Reset Password </Link>
          </p>
      </div>
    </div>
  );
}

