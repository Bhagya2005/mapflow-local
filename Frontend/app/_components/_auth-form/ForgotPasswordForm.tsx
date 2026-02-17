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

  const [timer, setTimer] = useState(120); 
  const [canResend, setCanResend] = useState(false);

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
    <div className="flex items-center justify-center min-h-[500px] p-6">
      <div className="w-full max-w-md p-8 border border-white/5 rounded-[2.5rem] shadow-2xl bg-[#0a0a0a]/80 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-[#7c5cfc]/10 rounded-2xl flex items-center justify-center mb-4">
                    <Mail className="text-[#7c5cfc]" size={24}/>
                </div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">Recovery</h1>
                <p className="text-white/40 text-sm">Enter your email to receive a 4-digit security code.</p>
              </div>
              <input type="email" placeholder="name@company.com" className="w-full bg-white/5 p-4 rounded-2xl text-white border border-white/10 outline-none focus:border-[#7c5cfc]/50 transition-all placeholder:text-white/20" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <button disabled={loading} className="w-full bg-[#7c5cfc] p-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white active:scale-95 disabled:opacity-50 transition-all">
                {loading ? "Processing..." : "Generate OTP"}
              </button>
              <div className="text-center"><Link href="/login" className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-[#7c5cfc] transition-colors">Back to Login</Link></div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-[#7c5cfc]/10 rounded-2xl flex items-center justify-center mb-4">
                    <ShieldCheck className="text-[#7c5cfc]" size={24}/>
                </div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">Verify</h1>
                <p className="text-white/40 text-sm">We've sent a code to <span className="text-white/80">{email}</span></p>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="0 0 0 0" maxLength={4} className="w-full bg-white/5 p-4 rounded-2xl text-white text-center text-3xl font-black tracking-[0.5em] border border-white/10 outline-none focus:border-[#7c5cfc]/50" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">{formatTime(timer)} remaining</span>
                  <button type="button" onClick={handleResendOtp} disabled={!canResend || loading} className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${canResend ? 'text-[#7c5cfc]' : 'text-white/10'}`}>
                    <RotateCcw size={12} /> Resend
                  </button>
                </div>
              </div>
              <button disabled={loading} className="w-full bg-[#7c5cfc] p-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white active:scale-95 transition-all">Verify & Continue</button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.form key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleResetSubmit} className="space-y-6">
               <div className="space-y-2">
                <div className="w-12 h-12 bg-[#7c5cfc]/10 rounded-2xl flex items-center justify-center mb-4">
                    <KeyRound className="text-[#7c5cfc]" size={24}/>
                </div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">New Password</h1>
                <p className="text-white/40 text-sm">Set a strong password to secure your MapFlow engine.</p>
              </div>
              <div className="relative">
                <input type={showPass ? "text" : "password"} placeholder="••••••••" className="w-full bg-white/5 p-4 rounded-2xl text-white border border-white/10 outline-none focus:border-[#7c5cfc]/50" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-4 top-4 text-white/20 hover:text-white transition-colors">
                    {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
              <button disabled={loading} className="w-full bg-[#7c5cfc] p-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white active:scale-95 transition-all">Update Key & Secure Account</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 