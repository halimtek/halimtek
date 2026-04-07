
"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, ShieldAlert, CheckCircle, Clock, 
  LayoutDashboard, Settings, Database, 
  BarChart3, ShieldCheck, LogOut, Search,
  Terminal, Activity, Globe, Cpu, ChevronRight, 
  Layers, HardDrive, CpuIcon
} from 'lucide-react';

interface Candidate {
  _id: string;
  full_name: string;
  email: string;
  status: 'pending' | 'active' | 'spam';
  tracks: string[];
}

const AdminDashboard: React.FC = () => {
  const [allUsers, setAllUsers] = useState<Candidate[]>([]);
  const [view, setView] = useState<'all' | 'pending' | 'active' | 'spam'>('pending');
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeSidebar, setActiveSidebar] = useState('Registry');

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/candidates?status=all");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllUsers(data);
    } catch (err) {
      console.error("❌ Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllUsers(); }, []);

  const filteredUsers = allUsers.filter(user => {
    const matchesTab = view === 'all' || user.status === view;
    const matchesSearch = user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/approve/${id}`, { method: 'PATCH' });
      if (response.ok) {
        setAllUsers(prev => prev.map(u => u._id === id ? { ...u, status: 'active' as const } : u));
      }
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-teal-500">
      <Terminal className="animate-pulse mb-4" size={48} />
      <p className="tracking-[0.5em] text-[10px] uppercase opacity-60">SYSTEM_INIT_HALIM_TEK</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 overflow-hidden font-sans">
      
      {/* --- SIDEBAR: Fixed Width, Minimalist --- */}
      <aside className="w-80 bg-[#0b1221] border-r border-slate-800/60 flex flex-col hidden lg:flex">
        <div className="p-10 flex items-center gap-4">
          <div className="bg-teal-500 p-2.5 rounded-2xl shadow-xl shadow-teal-500/10">
            <ShieldCheck className="text-slate-900" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-white leading-none">HALIM TEK</span>
            <span className="text-[10px] text-teal-500 font-mono tracking-widest mt-1">CORE_ENGINE</span>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <SidebarItem active={activeSidebar === 'Dashboard'} icon={<LayoutDashboard size={20}/>} label="System Metrics" onClick={() => setActiveSidebar('Dashboard')} />
          <SidebarItem active={activeSidebar === 'Registry'} icon={<Users size={20}/>} label="User Registry" onClick={() => setActiveSidebar('Registry')} />
          <SidebarItem active={activeSidebar === 'DB'} icon={<Database size={20}/>} label="Database Nodes" onClick={() => setActiveSidebar('DB')} />
          <SidebarItem active={activeSidebar === 'Analytics'} icon={<BarChart3 size={20}/>} label="Growth Analytics" onClick={() => setActiveSidebar('Analytics')} />
          <div className="py-6 border-t border-slate-800/50 mx-4" />
          <SidebarItem active={activeSidebar === 'Settings'} icon={<Settings size={20}/>} label="Configurations" onClick={() => setActiveSidebar('Settings')} />
        </nav>

        <div className="p-8">
          <button className="flex items-center justify-center gap-3 w-full p-4 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all text-xs font-black uppercase tracking-widest border border-transparent hover:border-red-400/10">
            <LogOut size={16} /> Terminate_Session
          </button>
        </div>
      </aside>

      {/* --- MAIN INTERFACE: Expansive Layout --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020617]">
        
        {/* HEADER: Ultra-Wide Search and Profile */}
        <header className="h-24 border-b border-slate-800/40 flex items-center justify-between px-12 bg-[#020617]/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
                <h2 className="text-white font-bold text-lg leading-tight">Admin Terminal</h2>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Node: Addis_Ababa</span>
                </div>
            </div>
          </div>

          <div className="relative flex-1 max-w-2xl px-12">
            <Search className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Search by candidate name or identifier..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-14 pr-6 text-sm focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all shadow-inner placeholder:text-slate-700"
            />
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right hidden sm:block">
                <p className="text-[10px] text-teal-500 font-mono font-bold tracking-[0.2em]">ROOT_ACCESS</p>
                <p className="text-sm font-black text-white uppercase tracking-tight">Halim_Tek</p>
             </div>
             <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-teal-500 font-bold shadow-2xl relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-[#020617]"></div>
                HT
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 max-w-[1600px] mx-auto w-full">
          
          {/* SYSTEM STATS: Bento-Style Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard label="Live Requests" value={allUsers.filter(u => u.status === 'pending').length} icon={<Activity className="text-amber-500"/>} trend="+12% Since Last Sync" />
            <StatCard label="Authorized" value={allUsers.filter(u => u.status === 'active').length} icon={<CheckCircle className="text-emerald-500"/>} trend="All Protocols Secure" />
            <StatCard label="Security" value={allUsers.filter(u => u.status === 'spam').length} icon={<ShieldAlert className="text-red-500"/>} trend="3 Nodes Quarantined" />
            <StatCard label="Engine Load" value="1.2%" icon={<CpuIcon className="text-blue-500"/>} trend="Optimized" />
          </div>

          {/* CONTENT CONTAINER: Extra Rounded & Wide */}
          <div className="bg-[#0b1221]/50 border border-slate-800/50 rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-md">
            
            {/* SUB-NAVIGATION TABS */}
            <div className="flex items-center px-6 py-4 bg-slate-900/20 border-b border-slate-800/50 gap-4">
              <NavTab active={view === 'all'} onClick={() => setView('all')} label="All Nodes" count={allUsers.length} />
              <NavTab active={view === 'pending'} onClick={() => setView('pending')} label="Pending Verification" count={allUsers.filter(u => u.status === 'pending').length} />
              <NavTab active={view === 'active'} onClick={() => setView('active')} label="Active Session" count={allUsers.filter(u => u.status === 'active').length} />
            </div>

            {/* THE DATA LIST */}
            <div className="divide-y divide-slate-800/40 min-h-[500px]">
              {filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-slate-700 space-y-4">
                  <div className="p-6 bg-slate-900/30 rounded-full">
                    <Database size={64} className="opacity-20" />
                  </div>
                  <p className="font-mono text-xs tracking-[0.5em] uppercase">No_Registry_Data_Stream</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user._id} className="p-8 flex items-center justify-between hover:bg-slate-800/20 transition-all group border-l-4 border-transparent hover:border-teal-500">
                    <div className="flex items-center gap-8">
                      <div className="h-16 w-16 rounded-[1.5rem] bg-[#020617] flex items-center justify-center border border-slate-800/80 group-hover:scale-105 group-hover:border-teal-500/50 transition-all shadow-xl">
                        <Users size={24} className="text-slate-500 group-hover:text-teal-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-white text-xl tracking-tight">{user.full_name}</h4>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-500 rounded border border-slate-800 font-mono">ID: {user._id.slice(-6)}</span>
                        </div>
                        <p className="text-sm font-mono text-slate-500 mt-1">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="hidden 2xl:flex gap-3">
                        {user.tracks?.map(t => (
                          <span key={t} className="text-[9px] px-4 py-1.5 bg-[#020617] text-slate-400 rounded-full border border-slate-800 font-black uppercase tracking-widest">{t}</span>
                        ))}
                      </div>

                      {user.status === 'pending' && (
                        <button 
                          onClick={() => handleApprove(user._id)}
                          disabled={processingId !== null}
                          className="bg-teal-600 hover:bg-teal-500 px-10 py-3.5 rounded-[1.25rem] text-slate-900 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-teal-900/20 active:scale-95 flex items-center gap-3 min-w-[200px] justify-center"
                        >
                          {processingId === user._id ? <div className="h-4 w-4 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" /> : "Authorize_Node"}
                        </button>
                      )}

                      {user.status === 'active' && (
                        <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/5 px-8 py-3 rounded-2xl border border-emerald-400/10 text-[10px] font-black uppercase tracking-[0.2em] min-w-[200px] justify-center">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Verified_Identity
                        </div>
                      )}

                      {user.status === 'spam' && (
                        <div className="flex items-center gap-3 text-red-500 bg-red-500/5 px-8 py-3 rounded-2xl border border-red-500/10 text-[10px] font-black uppercase tracking-[0.2em] min-w-[200px] justify-center">
                          <ShieldAlert size={14} /> Quarantine_Mode
                        </div>
                      )}
                      
                      <ChevronRight size={20} className="text-slate-800 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS: Polished Spacing ---

const SidebarItem = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] transition-all group ${active ? 'bg-teal-500 text-slate-900 font-black shadow-2xl shadow-teal-500/20' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
    <span className={`${active ? 'text-slate-900' : 'text-slate-600 group-hover:text-teal-400'} transition-colors`}>{icon}</span>
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon, trend }: any) => (
  <div className="bg-[#0b1221] p-8 rounded-[2.5rem] border border-slate-800/60 flex flex-col gap-6 hover:border-slate-700 transition-all group relative overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        {icon}
    </div>
    <div className="flex justify-between items-center">
        <div className="p-4 bg-[#020617] rounded-2xl border border-slate-800 shadow-inner">{icon}</div>
        <div className="text-right">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-4xl font-black text-white tracking-tighter">{value}</h3>
        </div>
    </div>
    <p className="text-[10px] font-mono text-slate-600 tracking-tight border-t border-slate-800 pt-4">{trend}</p>
  </div>
);

const NavTab = ({ active, onClick, label, count }: any) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${active ? 'bg-teal-500 text-slate-900 shadow-xl shadow-teal-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
  >
    {label}
    <span className={`px-2 py-0.5 rounded-lg text-[9px] ${active ? 'bg-slate-900/30' : 'bg-slate-800 text-slate-600'}`}>{count}</span>
  </button>
);

export default AdminDashboard;