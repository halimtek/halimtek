"use client";
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('halim_token', data.access_token);
        window.location.href = '/'; // Redirects to Dashboard
      } else {
        setError(data.detail || "Access Denied");
      }
    } catch (err) {
      setError("Server Offline: Ensure FastAPI is running on port 8000");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] text-white p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Halim <span className="text-teal-500">Tek</span></h1>
        <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">Admin Portal</p>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-teal-500 outline-none transition-all"
              placeholder="admin@halimtek.is-a.dev"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Access Key</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-teal-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-4 bg-teal-600 hover:bg-teal-500 rounded-xl font-bold shadow-lg shadow-teal-900/20 transition-all active:scale-95">
            Initialize Session
          </button>
        </form>
      </div>
    </div>
  );
}