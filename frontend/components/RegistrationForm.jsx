// components/RegistrationForm.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // 1. Comprehensive Engineering Menu
  const engineeringTracks = [
    { id: "cpp", label: "C++ Systems", icon: "⚙️" },
    { id: "cyber", label: "Ethical Hacking", icon: "🛡️" },
    { id: "fullstack", label: "Full-Stack Web", icon: "🌐" },
    { id: "mobile", label: "App Dev (Flutter)", icon: "📱" },
    { id: "java", label: "Java Enterprise", icon: "☕" },
    { id: "devops", label: "DevSecOps", icon: "♾️" }
  ];

  // 2. Logic: Field Tracking & Toggle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTrack = (id) => {
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // 3. Validation: All fields must be filled + at least 1 track
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
      const payload = { ...formData, tracks: selectedTracks };
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true); // Switch to "Waiting for Approval" UI
      }
    } catch (error) {
      console.error("System Protocol Breach:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-28 w-full max-w-2xl z-40 self-start"
    >
      <div className="glass-card p-1 shadow-2xl overflow-hidden rounded-[2rem] border border-white/10">
        <div className="bg-white/5 dark:bg-[#030712]/60 backdrop-blur-3xl p-8 md:p-12">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-black tracking-tighter dark:text-white uppercase">
                      Begin <span className="text-blue-600">Onboarding.</span>
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-3">
                      // Status: Waiting for Credentials
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-blue-500/50 block tracking-widest">HT_SYSTEM_V4</span>
                  </div>
                </div>

                <form className="space-y-8" onSubmit={handleInitialize}>
                  {/* Identity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="pro-label text-[10px] font-bold uppercase text-slate-500 mb-2 block">Full Legal Name</label>
                      <input name="fullName" type="text" required onChange={handleChange} placeholder="Abdelhalim Adem" className="pro-input w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 text-white" />
                    </div>
                    <div className="form-group">
                      <label className="pro-label text-[10px] font-bold uppercase text-slate-500 mb-2 block">Professional Email</label>
                      <input name="email" type="email" required onChange={handleChange} placeholder="name@domain.com" className="pro-input w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 text-white" />
                    </div>
                  </div>

                  {/* Multi-Select Track Grid */}
                  <div className="form-group">
                    <label className="pro-label text-[10px] font-bold uppercase text-slate-500 mb-4 block">Select Engineering Specializations (Required)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {engineeringTracks.map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => toggleTrack(track.id)}
                          className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                            selectedTracks.includes(track.id)
                              ? "bg-blue-600/20 border-blue-600 text-blue-400"
                              : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"
                          }`}
                        >
                          <span className="text-xl">{track.icon}</span>
                          <span className="text-[10px] font-bold uppercase">{track.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Intent */}
                  <div className="form-group">
                    <label className="pro-label text-[10px] font-bold uppercase text-slate-500 mb-2 block">Project Vision Summary</label>
                    <textarea name="projectVision" rows="2" required onChange={handleChange} placeholder="What do you intend to build with Halim Tek?" className="pro-input w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 resize-none text-white" />
                  </div>

                  {/* Action Section */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={!isFormComplete || loading}
                      className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
                        !isFormComplete || loading
                        ? "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50" 
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                      }`}
                    >
                      {loading ? "Initializing..." : isFormComplete ? "Confirm & Initialize" : "Fill All Fields"}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* THE "WAITING FOR APPROVAL" STATE */
              <motion.div 
                key="pending" 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <span className="text-4xl">⏳</span>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">
                  Request <span className="text-blue-500">Pending.</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                  Your engineering profile has been sent to the <span className="text-white font-mono">Halim Tek</span> review board. You will receive an email once your access is approved.
                </p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 inline-block">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    Reference: {Math.random().toString(36).toUpperCase().substring(7)}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}