// components/RegistrationForm.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);

  // The Engineering Menu
  const engineeringTracks = [
    { id: "cpp", label: "C++ Systems", icon: "⚙️" },
    { id: "cyber", label: "Ethical Hacking", icon: "🛡️" },
    { id: "fullstack", label: "Full-Stack Web", icon: "🌐" },
    { id: "mobile", label: "App Dev (Flutter)", icon: "📱" },
  ];

  // Fixes the 'any' type error by being explicit (or keeping it JS friendly)
  const toggleTrack = (id) => {
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-28 w-full max-w-2xl z-40 self-start"
    >
      <div className="glass-card p-1 shadow-2xl overflow-hidden rounded-[2rem] border border-white/10">
        <div className="bg-white/5 dark:bg-[#030712]/40 backdrop-blur-3xl p-8 md:p-12">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tighter dark:text-white uppercase leading-none">
                Begin <span className="text-blue-600">Onboarding.</span>
              </h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-3">
                // System Access Level: Candidate
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[9px] font-mono text-blue-500/50 block">REF_ID: HT-2026</span>
              <span className="text-[9px] font-mono text-green-500/50 block">STATUS: SECURE</span>
            </div>
          </div>

          <form className="space-y-8">
            {/* Group 1: Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="pro-label text-xs font-bold uppercase text-slate-400 mb-2 block">Full Legal Name</label>
                <div className="relative">
                  <input type="text" placeholder="Abdelhalim Adem" className="pro-input w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="form-group">
                <label className="pro-label text-xs font-bold uppercase text-slate-400 mb-2 block">Professional Email</label>
                <div className="relative">
                  <input type="email" placeholder="name@domain.com" className="pro-input w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* Group 2: THE NEW MULTI-SELECT TRACKS */}
            <div className="form-group">
              <label className="pro-label text-xs font-bold uppercase text-slate-400 mb-4 block">Select Engineering Specializations</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {engineeringTracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => toggleTrack(track.id)}
                    className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${
                      selectedTracks.includes(track.id)
                        ? "bg-blue-600/20 border-blue-600 text-blue-400"
                        : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">{track.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{track.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Group 3: Project Intent */}
            <div className="form-group">
              <label className="pro-label text-xs font-bold uppercase text-slate-400 mb-2 block">Project Vision</label>
              <textarea rows="2" placeholder="Describe the application you intend to build..." className="pro-input w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 resize-none" />
            </div>

            {/* Action Section */}
            <div className="pt-4">
              <button 
                disabled={selectedTracks.length === 0}
                className={`pro-btn-primary w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  selectedTracks.length === 0 
                  ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                }`}
              >
                {selectedTracks.length === 0 ? "Select a Track" : "Confirm & Initialize Account"}
              </button>
              <p className="text-center text-[10px] font-mono text-slate-500 mt-6 uppercase tracking-widest">
                By submitting, you agree to the <span className="text-blue-500 cursor-pointer italic">Halim Tek Protocols</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}