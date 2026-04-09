"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("halim_token", data.access_token);
        localStorage.setItem("user_name", data.name);
        router.push("/terminal"); 
      } else {
        setError(data.detail || "Identity Verification Failed");
      }
    } catch (err) {
      setError("Network Protocol Error: Could not reach Core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-auto">
      <div className="glass-card p-1 shadow-2xl rounded-[2rem] bg-[#030712]/60 backdrop-blur-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="p-10 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6 shadow-inner">
              <Lock className="text-blue-500" size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase">Identity <span className="text-blue-600">Check.</span></h2>
            <p className="text-[9px] font-mono text-slate-500 mt-2 uppercase tracking-[0.4em]">Authorized Personnel Only // Core_V4</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-widest overflow-hidden">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Access Token (Email)</label>
              <input name="email" type="email" required onChange={handleChange} placeholder="USER@DOMAIN.COM" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white text-center tracking-widest font-mono text-xs placeholder:text-slate-800 transition-all focus:bg-white/10 shadow-inner" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Security Key</label>
              <input name="password" type="password" required onChange={handleChange} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white text-center tracking-widest text-xs placeholder:text-slate-800 transition-all focus:bg-white/10 shadow-inner" />
            </div>

            <button type="submit" disabled={loading} className="group w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><ShieldCheck size={18} />Unlock Terminal</>}
            </button>
            
            <div className="flex justify-between items-center px-2 pt-4 border-t border-white/5 mt-4">
              <span className="text-[9px] font-mono text-slate-600 uppercase">Encryption: AES-256</span>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}