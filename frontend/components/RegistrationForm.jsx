"use client"; // This MUST be at the very top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from react-router-dom
import { User, Mail, Lock, Code, Eye, Send, Loader2 } from 'lucide-react';

const RegistrationForm = () => {
  const router = useRouter(); // Changed from useNavigate
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    projectVision: '',
    tracks: []
  });

  const availableTracks = [
    { id: 'fullstack', label: 'Full-Stack Development' },
    { id: 'mobile', label: 'Flutter / Mobile' },
    { id: 'fastapi', label: 'Python / FastAPI' },
    { id: 'cyber', label: 'Cyber Security' },
    { id: 'aiml', label: 'AI / Machine Learning' }
  ];

  const handleTrackChange = (trackId) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.includes(trackId)
        ? prev.tracks.filter(t => t !== trackId)
        : [...prev.tracks, trackId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

    try {
      // Fixed the syntax for the template literal
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Protocol Initialized. Your application is now pending review.");
        router.push('/login'); // Changed from navigate('/login')
      } else {
        setError(data.detail || "System rejected the protocol.");
      }
    } catch (err) {
      setError("Connection Failure: Backend offline or unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-mono flex items-center gap-2">
          <Code className="text-teal-400" />
          INITIALIZE_ENGINEER_PROFILE
        </h2>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Halim Tek Core // Secure Onboarding</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm font-mono">
          [ERROR]: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2 font-mono">
              <User size={14} /> FULL_NAME
            </label>
            <input
              required
              className="w-full bg-[#020617] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Halim Tek"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2 font-mono">
              <Mail size={14} /> SYSTEM_EMAIL
            </label>
            <input
              required
              type="email"
              className="w-full bg-[#020617] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="halim@engineer.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2 font-mono">
              <Lock size={14} /> ACCESS_KEY
            </label>
            <input
              required
              type="password"
              className="w-full bg-[#020617] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2 font-mono">
              <Eye size={14} /> PROJECT_VISION
            </label>
            <textarea
              required
              rows="3"
              className="w-full bg-[#020617] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Describe your architectural goals..."
              onChange={(e) => setFormData({...formData, projectVision: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-sm font-medium text-slate-300 font-mono">SELECT_SPECIALIZATION_TRACKS</label>
            <div className="flex flex-wrap gap-3">
              {availableTracks.map(track => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleTrackChange(track.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-mono transition-all ${
                    formData.tracks.includes(track.id)
                      ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                      : 'border-slate-700 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> INITIALIZE_PROTOCOL</>}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;