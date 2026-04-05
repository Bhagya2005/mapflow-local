"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ShieldCheck, KeyRound, Eye, EyeOff, RotateCcw } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const { sendOtp, verifyOtp, resetPassword, loading } = useAuthStore() as any;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
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

  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
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
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    const success = await sendOtp(email);
    if (success) {
      setTimer(120);
      setCanResend(false);
      setStep(2);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    const success = await sendOtp(email);
    if (success) {
      setTimer(120);
      setCanResend(false);
    }
  };

  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    const success = await verifyOtp(email, otp);
    if (success) setStep(3);
  };

  const handleResetSubmit = async (e: any) => {
    e.preventDefault();
    const success = await resetPassword({ email, otp, password });
    if (success) router.push("/login");
  };

  return (
    <div className="flex items-center justify-center p-0 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] shadow-xl transition-colors duration-500 ${
        isDarkTheme 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 border text-[#7c5cfc] transition-colors duration-500 ${
                  isDarkTheme ? 'bg-purple-900/20 border-purple-700' : 'bg-[#7c5cfc]/10 border-[#7c5cfc]/20'
                }`}>
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <h1 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500 ${
                  isDarkTheme ? 'text-white' : 'text-slate-900'
                }`}>Recovery</h1>
                <p className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                }`}>Enter your email to receive a 4-digit security code.</p>
              </div>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className={`w-full p-3.5 md:p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#7c5cfc]/20 focus:border-[#7c5cfc]/50 transition-all shadow-sm text-sm transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <button disabled={loading} className="w-full bg-[#7c5cfc] py-3.5 md:py-4 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-[#7c5cfc]/25 hover:bg-[#6b4dfa]">
                {loading ? "Processing..." : "Generate OTP"}
              </button>
              <div className="text-center mt-6">
                <Link href="/login" className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  isDarkTheme ? 'text-gray-400 hover:text-[#7c5cfc]' : 'text-slate-400 hover:text-[#7c5cfc]'
                }`}>Back to Login</Link>
              </div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 border text-[#7c5cfc] transition-colors duration-500 ${
                  isDarkTheme ? 'bg-purple-900/20 border-purple-700' : 'bg-[#7c5cfc]/10 border-[#7c5cfc]/20'
                }`}>
                  <ShieldCheck size={20} className="md:w-6 md:h-6" />
                </div>
                <h1 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500 ${
                  isDarkTheme ? 'text-white' : 'text-slate-900'
                }`}>Verify</h1>
                <p className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                }`}>We've sent a code to <span className={`font-bold ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>{email}</span></p>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="0 0 0 0" 
                  maxLength={4} 
                  className={`w-full p-3.5 md:p-4 rounded-2xl text-center text-2xl md:text-3xl font-black tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#7c5cfc]/20 focus:border-[#7c5cfc]/50 shadow-sm transition-colors duration-500 ${
                    isDarkTheme 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                  }`} 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  required 
                />
                <div className={`flex justify-between items-center p-2.5 md:p-3 rounded-xl shadow-sm transition-colors duration-500 ${
                  isDarkTheme 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${
                    isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                  }`}>{formatTime(timer)} remaining</span>
                  <button 
                    type="button" 
                    onClick={handleResendOtp} 
                    disabled={!canResend || loading} 
                    className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${
                      canResend ? 'text-[#7c5cfc] hover:text-[#6b4dfa]' : isDarkTheme ? 'text-gray-500' : 'text-slate-400'
                    }`}
                  >
                    <RotateCcw size={12} /> Resend
                  </button>
                </div>
              </div>
              <button disabled={loading} className="w-full bg-[#7c5cfc] py-3.5 md:py-4 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white active:scale-95 transition-all shadow-lg shadow-[#7c5cfc]/25 hover:bg-[#6b4dfa]">Verify & Continue</button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.form key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleResetSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 border text-[#7c5cfc] transition-colors duration-500 ${
                  isDarkTheme ? 'bg-purple-900/20 border-purple-700' : 'bg-[#7c5cfc]/10 border-[#7c5cfc]/20'
                }`}>
                  <KeyRound size={20} className="md:w-6 md:h-6" />
                </div>
                <h1 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500 ${
                  isDarkTheme ? 'text-white' : 'text-slate-900'
                }`}>New Password</h1>
                <p className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkTheme ? 'text-gray-400' : 'text-slate-500'
                }`}>Set a strong password to secure your MapFlow engine.</p>
              </div>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  className={`w-full p-3.5 md:p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#7c5cfc]/20 focus:border-[#7c5cfc]/50 transition-all shadow-sm pr-12 text-sm transition-colors duration-500 ${
                    isDarkTheme 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
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
              <button disabled={loading} className="w-full bg-[#7c5cfc] py-3.5 md:py-4 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white active:scale-95 transition-all shadow-lg shadow-[#7c5cfc]/25 hover:bg-[#6b4dfa]">Update Key & Secure Account</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}