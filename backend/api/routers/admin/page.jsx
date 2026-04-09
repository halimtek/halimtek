"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);

  // Fetch users from FastAPI
  const loadUsers = async () => {
    const res = await fetch("http://your-ubuntu-ip:8000/admin/pending-users");
    const data = await res.json();
    setPendingUsers(data);
  };

  const handleApprove = async (id) => {
    await fetch(`http://your-ubuntu-ip:8000/admin/approve/${id}`, { method: "PATCH" });
    loadUsers(); // Refresh the list
  };

  useEffect(() => { loadUsers(); }, []);

  return (
    <div className="min-h-screen p-12 pt-32 bg-[#030712]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-12">
          Admin <span className="text-blue-600">Console.</span>
        </h1>

        <div className="space-y-4">
          {pendingUsers.length === 0 ? (
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              // No pending requests in queue
            </p>
          ) : (
            pendingUsers.map((user) => (
              <div key={user.id} className="glass-card p-6 flex items-center justify-between group">
                <div>
                  <h3 className="text-white font-bold uppercase">{user.full_name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleApprove(user.id)}
                    className="px-6 py-2 bg-blue-600 text-white text-[10px] font-mono font-black uppercase rounded-lg hover:bg-blue-500 transition-all"
                  >
                    Approve Access
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}