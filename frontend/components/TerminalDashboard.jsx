"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Terminal, Cpu, Globe, Database, 
  Code2, Zap, Layout, ChevronRight, 
  User, Bell, Search, Command, 
  Activity, Box, Clock, ShieldCheck
} from 'lucide-react';

export default function TerminalDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("OPERATOR");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  // Security Gate
  useEffect(() => {
    setHasMounted(true);
    const token = localStorage.getItem("halim_token");
    const storedName = localStorage.getItem("user_name");
    if (!token) {
      router.push("/login");
    }
    if (storedName) setUserName(storedName);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* --- LEFT NAVIGATION: THE ACCESS RAIL --- */}
      <aside className="w-20 lg:w-64 bg-[#030712] border-r border-white/5 flex flex-col items-center lg:items-stretch transition-all">
        <div className="p-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Terminal className="text-white" size={20} />
          </div>
          <span className="hidden lg:block font-black tracking-tighter text-white">HALIM_TEK <span className="text-blue-500">v4</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<Layout size={18}/>} label="Overview" active />
          <NavItem icon={<Box size={18}/>} label="My Projects" />
          <NavItem icon={<Code2 size={18}/>} label="Tech Stack" />
          <NavItem icon={<Database size={18}/>} label="Resources" />
          <div className="h-px bg-white/5 my-6 mx-2" />
          <NavItem icon={<Bell size={18}/>} label="Alerts" count={3} />
          <NavItem icon={<User size={18}/>} label="Profile" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="hidden lg:flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">{userName}</span>
              <span className="text-[9px] text-blue-500 font-mono">AUTHORIZED_NODE</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN TERMINAL AREA --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#020617]/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <Search size={14} className="text-slate-500" />
              <input type="text" placeholder="Jump to command..." className="bg-transparent border-none outline-none text-[11px] w-48 font-mono" />
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-500">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-8 font-mono text-[10px] tracking-widest text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              UPLINK_STABLE
            </div>
            <div className="hidden sm:block">
                {hasMounted ? (
                    `${currentTime.toLocaleTimeString()} // ${currentTime.toLocaleDateString()}`
                ) : (
                    "SYNCHRONIZING..." // Placeholder while hydrating
                )}
                </div>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* HERO SECTION */}
            <section>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
                Operational <span className="text-blue-500">Terminal.</span>
              </h1>
              <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">
                Welcome back, {userName}. All systems within acceptable parameters.
              </p>
            </section>

            {/* STATUS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard 
                label="Current Progress" 
                value="74%" 
                sub="Module: Flutter Backend Integration" 
                icon={<Zap className="text-amber-400" />}
              />
              <StatusCard 
                label="System Health" 
                value="99.9%" 
                sub="Latency: 14ms // Secure Tunnel" 
                icon={<ShieldCheck className="text-emerald-400" />}
              />
              <StatusCard 
                label="Active Tracks" 
                value="03" 
                sub="Mobile, Web, AI Systems" 
                icon={<Activity className="text-blue-400" />}
              />
            </div>

            {/* TWO COLUMN CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* LEFT: Project Roadmap */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 flex items-center gap-2">
                  <Command size={14} /> Active_Deployment_Roadmap
                </h3>
                <div className="bg-[#030712] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">Enasla Learning Hub</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">Status: DEVELOPMENT_PHASE</p>
                    </div>
                    <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                      In Review
                    </span>
                  </div>
                  <div className="p-8 space-y-6">
                    <TrackStep label="System Architecture" date="Completed" status="done" />
                    <TrackStep label="API Gateway Setup (FastAPI)" date="Completed" status="done" />
                    <TrackStep label="Frontend Implementation (Next.js)" date="In Progress" status="active" />
                    <TrackStep label="Dockerization & Deployment" date="Estimated: April 15" status="pending" />
                  </div>
                </div>
              </div>

              {/* RIGHT: Live Logs & Stats */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">
                  System_Telemetry
                </h3>
                <div className="bg-[#030712] border border-white/5 rounded-[2rem] p-6 font-mono text-[10px]">
                  <div className="space-y-3">
                    <p className="text-emerald-500 flex justify-between">
                      <span>{'>'} AUTH_VALIDATED</span> <span>[OK]</span>
                    </p>
                    <p className="text-slate-500 flex justify-between">
                      <span>{'>'} PULLING_REGISTRY...</span> <span>98%</span>
                    </p>
                    <p className="text-blue-400 flex justify-between font-bold">
                      <span>{'>'} KERNEL_HALIM_BOOT</span> <span>v4.1.0</span>
                    </p>
                    <p className="text-slate-700">--------------------------</p>
                    <p className="text-slate-500 leading-relaxed">
                      Session ID: {Math.random().toString(36).substring(7).toUpperCase()} <br/>
                      IP: 192.168.1.104 <br/>
                      Uptime: 14h 22m 04s
                    </p>
                  </div>
                </div>

                <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-900/20 group relative overflow-hidden">
                  <Globe className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12 transition-transform group-hover:scale-110" />
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">Resource Access</h4>
                  <p className="text-xs text-blue-100 mb-6 leading-relaxed">Download the latest Halim Tek documentation and project kits.</p>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-colors">
                    Access Library
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, active = false, count = null }) {
  return (
    <div className={`
      flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all group
      ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="hidden lg:block text-[11px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      {count && <span className="hidden lg:block bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{count}</span>}
    </div>
  );
}

function StatusCard({ label, value, sub, icon }) {
  return (
    <div className="bg-[#030712] border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-3xl font-black text-white mb-2">{value}</h3>
      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter truncate">{sub}</p>
    </div>
  );
}

function TrackStep({ label, date, status }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${status === 'done' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : status === 'active' ? 'bg-amber-500 animate-pulse' : 'bg-slate-800'}`} />
        <span className={`text-[11px] font-bold tracking-wide ${status === 'pending' ? 'text-slate-600' : 'text-slate-300'}`}>{label}</span>
      </div>
      <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">{date}</span>
    </div>
  );
}