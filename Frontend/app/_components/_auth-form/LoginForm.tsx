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
  const [showPass, setShowPass] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('mapflow-theme');
      if (storedTheme !== null) {
        return storedTheme === 'dark';
      }
      return true;
    }
    return true;
  });

  const { login, user, loading } = useAuthStore() as any;

  useEffect(() => { 
    setMounted(true); 
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        const storedTheme = localStorage.getItem('mapflow-theme');
        if (storedTheme !== null) {
          setIsDarkTheme(storedTheme === 'dark');
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

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
      <div className="mb-6 md:mb-10 text-left">
        <div className="flex items-center gap-3 md:gap-4 mb-4">
          <div className={`inline-flex p-2.5 md:p-3 rounded-2xl border text-[#7c5cfc] transition-colors duration-500 ${
            isDarkTheme ? 'bg-purple-900/20 border-purple-700' : 'bg-[#7c5cfc]/10 border-[#7c5cfc]/20'
          }`}>
            <LockKeyhole size={24} className="md:w-7 md:h-7" />
          </div>
          <h1 className={`text-2xl md:text-3xl font-black tracking-tight transition-colors duration-500 ${
            isDarkTheme ? 'text-white' : 'text-slate-900'
          }`}>Login</h1>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className={`text-[10px] ml-1 font-bold uppercase tracking-wider transition-colors duration-500 ${
              isDarkTheme ? 'text-gray-400' : 'text-slate-500'
            }`}>Email</label>
            <input
              className={`w-full rounded-2xl px-4 py-3.5 md:py-4 focus:ring-2 focus:ring-[#7c5cfc]/20 focus:border-[#7c5cfc]/50 transition-all outline-none shadow-sm transition-colors duration-500 ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
              placeholder="bhagya@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1.5 relative">
            <label className={`text-[10px] ml-1 font-bold uppercase tracking-wider transition-colors duration-500 ${
              isDarkTheme ? 'text-gray-400' : 'text-slate-500'
            }`}>Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={`w-full rounded-2xl px-4 py-3.5 md:py-4 focus:ring-2 focus:ring-[#7c5cfc]/20 focus:border-[#7c5cfc]/50 transition-all outline-none pr-12 shadow-sm transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
                placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-500 ${
                  isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => login(email, password, router)}
          disabled={loading}
          className="w-full bg-[#7c5cfc] hover:bg-[#6b4dfa] h-14 md:h-[60px] rounded-2xl font-bold text-white flex items-center justify-center relative shadow-lg shadow-[#7c5cfc]/25 transition-all active:scale-[0.98] group"
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

        <p className="text-center text-sm text-slate-500 font-medium mt-6">
          Don't have an account? <Link href="/sign-up" className="text-[#7c5cfc] font-bold hover:underline">Sign Up</Link>
        </p>
        <p className="text-center text-sm text-slate-500 font-medium">
          Forgot Password? <Link href="/forgot-password" className="text-[#7c5cfc] font-bold hover:underline">Reset Password</Link>
        </p>
      </div>
    </div>
  );
}
