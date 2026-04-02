"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      // top-28 keeps it exactly below the fixed navbar
      className="sticky top-28 w-full z-40 self-start"
    >
      <div className="glass-card p-10 shadow-2xl relative overflow-hidden">
        {/* Interior glow for professionalism */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="mb-8">
          <p className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-1">// Official Application</p>
          <h2 className="text-3xl font-black tracking-tighter dark:text-white uppercase">
            Start <span className="text-blue-600">Engineering.</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-500 ml-1">First Name</label>
                  <input type="text" required placeholder="Abdelhalim" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-500 ml-1">Last Name</label>
                  <input type="text" required placeholder="Adem" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-gray-500 ml-1">Email</label>
                <input type="email" required placeholder="dev@halimtek.com" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:border-blue-500 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-500 ml-1">Track</label>
                  <select className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:border-blue-500 outline-none appearance-none">
                    <option>Full-Stack Web</option>
                    <option>Mobile (Flutter)</option>
                    <option>Cyber Security</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-500 ml-1">Experience</label>
                  <select className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:border-blue-500 outline-none appearance-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Senior</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "PROCESSING..." : "SUBMIT APPLICATION"}
              </button>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold dark:text-white uppercase">Received</h3>
              <p className="text-[10px] font-mono text-gray-500 mt-2 uppercase tracking-widest">We will contact you shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}