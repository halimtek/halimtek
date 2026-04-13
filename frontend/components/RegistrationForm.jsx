"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Rocket, Cpu } from "lucide-react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    projectVision: "",
    tracks: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const availableTracks = ["Web Development", "Mobile App", "AI/ML", "Backend"];

  const handleTrackToggle = (track) => {
    setFormData((prev) => ({
      ...prev,
      tracks: prev.tracks.includes(track)
        ? prev.tracks.filter((t) => t !== track)
        : [...prev.tracks, track],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Using the Environment Variable
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Protocol Initialized! Check your email." });
      } else {
        setMessage({ type: "error", text: data.detail || "System Error." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Core unreachable. Check connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-6 text-teal-400 flex items-center gap-2">
        <Cpu className="w-6 h-6" /> Join the Core
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
          <input
            type="password"
            placeholder="Secure Password"
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-400">Select Track(s):</p>
          <div className="flex flex-wrap gap-2">
            {availableTracks.map((track) => (
              <button
                key={track}
                type="button"
                onClick={() => handleTrackToggle(track)}
                className={`px-3 py-1 rounded-full text-xs transition-all border ${
                  formData.tracks.includes(track)
                    ? "bg-teal-400 text-black border-teal-400"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            placeholder="Project Vision..."
            rows={3}
            className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, projectVision: e.target.value })}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-teal-300 transition-colors disabled:opacity-50"
        >
          {loading ? "Transmitting..." : <><Rocket className="w-5 h-5" /> Initialize Access</>}
        </motion.button>

        {message && (
          <div className={`p-4 rounded-xl text-center text-sm ${
            message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}