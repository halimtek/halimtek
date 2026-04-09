"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Mail, User, Rocket, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    projectVision: ""
  });

  const engineeringTracks = [
    { id: "cpp", label: "C++ Systems", icon: "⚙️" },
    { id: "cyber", label: "Ethical Hacking", icon: "🛡️" },
    { id: "fullstack", label: "Full-Stack Web", icon: "🌐" },
    { id: "mobile", label: "App Dev (Flutter)", icon: "📱" },
    { id: "java", label: "Java Enterprise", icon: "☕" },
    { id: "devops", label: "DevSecOps", icon: "♾️" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTrack = (id) => {
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const isFormComplete = 
    formData.fullName.trim() !== "" && 
    formData.email.trim() !== "" && 
    formData.password.length >= 8 && 
    formData.projectVision.trim() !== "" && 
    selectedTracks.length > 0;

  const handleInitialize = async (e) => {
    e.preventDefault();
    if (!isFormComplete) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tracks: selectedTracks }),
      });

      if (response.ok) {
        setIsSubmitted(true); 
      } else {
        const error = await response.json();
        alert(`Access Denied: ${error.detail}`);
      }
    } catch (error) {
      alert("Network Error: Failed to reach Halim Tek Core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl z-40">
      <div className="glass-card p-1 shadow-2xl rounded-[2rem] border border-white/10 bg-[#030712]/60 backdrop-blur-3xl overflow-hidden">
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                      Begin <span className="text-blue-500">Onboarding.</span>
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-3">// Status: Awaiting Credentials</p>
                  </div>
                  <ShieldCheck className="text-blue-500/50" size={32} />
                </div>

                <form className="space-y-6" onSubmit={handleInitialize}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-[10px] font-bold uppercase text-slate-500 mb-2 block">Full Legal Name</label>
                      <input name="fullName" type="text" required onChange={handleChange} placeholder="Abdelhalim Adem" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-700" />
                    </div>
                    <div className="relative">
                      <label className="text-[10px] font-bold uppercase text-slate-500 mb-2 block">Professional Email</label>
                      <input name="email" type="email" required onChange={handleChange} placeholder="name@domain.com" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-700" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-bold uppercase text-slate-500 mb-2 block">Access Password (Min 8 Chars)</label>
                    <input name="password" type="password" required onChange={handleChange} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-700" />
                  </div>

                  <div className="form-group">
                    <label className="text-[10px] font-bold uppercase text-slate-500 mb-4 block">Select Engineering Tracks</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {engineeringTracks.map((track) => (
                        <button key={track.id} type="button" onClick={() => toggleTrack(track.id)} className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 ${selectedTracks.includes(track.id) ? "bg-blue-600/20 border-blue-600 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"}`}>
                          <span className="text-xl">{track.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{track.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 mb-2 block">Project Vision Summary</label>
                    <textarea name="projectVision" rows="2" required onChange={handleChange} placeholder="What do you intend to build?" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 resize-none text-white placeholder:text-slate-700" />
                  </div>

                  <button type="submit" disabled={!isFormComplete || loading} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${!isFormComplete || loading ? "bg-slate-800 text-slate-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 active:scale-[0.98]"}`}>
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Initialize Protocol"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="pending" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8"><Rocket className="text-blue-500 animate-bounce" size={40} /></div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">Request <span className="text-blue-500">Pending.</span></h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto font-mono">Your profile is synced. Check your inbox for review.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}