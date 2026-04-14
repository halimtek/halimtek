"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Code, Eye, Send, Loader2, ShieldCheck } from 'lucide-react';

const RegistrationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false); // New state to toggle UI
  const [otpCode, setOtpCode] = useState('');
  
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

  // Phase 1: Request OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtp(true); // Switch to OTP view
      } else {
        setError(data.detail || "System rejected the protocol.");
      }
    } catch (err) {
      setError("Connection Failure: Backend offline.");
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: otpCode }),
      });

      if (response.ok) {
        alert("Verification Successful. Access Granted.");
        router.push('/login'); 
      } else {
        const data = await response.json();
        setError(data.detail || "Invalid Verification Code.");
      }
    } catch (err) {
      setError("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-mono flex items-center gap-2">
          {showOtp ? <ShieldCheck className="text-teal-400" /> : <Code className="text-teal-400" />}
          {showOtp ? 'VERIFY_IDENTITY' : 'INITIALIZE_PROFILE'}
        </h2>
        <p className="text-slate-400 font-mono text-xs tracking-widest uppercase italic">
          {showOtp ? `CODE_SENT_TO: ${formData.email}` : 'Halim Tek // Secure Onboarding'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm font-mono">
          [ERROR]: {error}
        </div>
      )}

      {!showOtp ? (
        /* REGISTRATION FORM */
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

            <div className="space-y-2 md:col-span-2">
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

            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-medium text-slate-300 font-mono">SPECIALIZATION_TRACKS</label>
              <div className="flex flex-wrap gap-2">
                {availableTracks.map(track => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleTrackChange(track.id)}
                    className={`px-3 py-1.5 rounded-full border text-[10px] font-mono transition-all ${
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
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-mono uppercase tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> INITIALIZE_PROTOCOL</>}
          </button>
        </form>
      ) : (
        /* OTP VERIFICATION VIEW */
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-4">
            <p className="text-slate-400 text-sm font-mono">
              ENTER_6_DIGIT_PASSCODE_SENT_TO_YOUR_TERMINAL:
            </p>
            <input
              required
              maxLength={6}
              className="w-full bg-[#020617] border-2 border-dashed border-slate-700 rounded-lg p-5 text-center text-4xl font-mono tracking-[1em] text-teal-400 focus:outline-none focus:border-teal-500 focus:border-solid transition-all"
              placeholder="000000"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => setShowOtp(false)}
              className="text-xs text-slate-500 hover:text-teal-400 font-mono uppercase underline"
            >
              Back to Registration
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || otpCode.length < 6}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-mono uppercase tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={18} /> VERIFY_PROTOCOL</>}
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;