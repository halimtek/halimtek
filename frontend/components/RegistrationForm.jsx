"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  };

  return (
    <motion.div 
      className="sticky top-28 w-full z-40 self-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="glass-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 blur-3xl" />
        
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tighter dark:text-white uppercase leading-none">
            ACADEMY <span className="text-blue-600">ENROLL.</span>
          </h2>
          <p className="text-[9px] font-mono text-gray-500 mt-2 uppercase tracking-[0.3em]">Precision Full-Stack Training</p>
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form key="form" exit={{ opacity: 0, scale: 0.95 }} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="FIRST NAME" className="pro-input-style" />
                <input type="text" required placeholder="LAST NAME" className="pro-input-style" />
              </div>
              <input type="email" required placeholder="EMAIL ADDRESS" className="pro-input-style" />
              
              <div className="grid grid-cols-2 gap-4">
                <select className="pro-input-style cursor-pointer appearance-none uppercase text-[10px]">
                  <option>Next.js Track</option>
                  <option>Flutter Track</option>
                </select>
                <select className="pro-input-style cursor-pointer appearance-none uppercase text-[10px]">
                  <option>Beginner</option>
                  <option>Advanced</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
                {loading ? "TRANSMITTING..." : "SUBMIT APPLICATION"}
              </button>
            </motion.form>
          ) : (
            <div className="py-10 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-bold dark:text-white uppercase tracking-widest text-sm">Application Logged</h3>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .pro-input-style {
          width: 100%;
          padding: 0.85rem 1.2rem;
          background: rgba(128, 128, 128, 0.05);
          border: 1px solid rgba(128, 128, 128, 0.1);
          border-radius: 0.75rem;
          color: inherit;
          font-size: 0.8rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .pro-input-style:focus {
          border-color: #2563eb;
          background: rgba(128, 128, 128, 0.1);
        }
      `}</style>
    </motion.div>
  );
}