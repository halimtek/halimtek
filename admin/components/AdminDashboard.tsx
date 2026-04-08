
"use client";

import React, { useEffect, useState } from "react";
import {
  Users, CheckCircle, ShieldAlert,
  Search, ChevronRight, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart, Line, ResponsiveContainer
} from "recharts";

interface Candidate {
  _id: string;
  full_name: string;
  email: string;
  status: "pending" | "active" | "spam";
  tracks: string[];
}

const chartData = [
  { value: 10 }, { value: 20 }, { value: 15 },
  { value: 30 }, { value: 25 }, { value: 40 }
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("pending");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/candidates?status=all")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const filtered = users.filter(u =>
    (view === "all" || u.status === view) &&
    (u.full_name.toLowerCase().includes(search.toLowerCase()) ||
     u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const approve = async (id: string) => {
    setProcessing(id);
    await fetch(`http://127.0.0.1:8000/admin/approve/${id}`, { method: "PATCH" });
    setUsers(prev => prev.map(u => u._id === id ? { ...u, status: "active" } : u));
    setProcessing(null);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-teal-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* MAIN */}
      <div className="flex flex-1 z-10">

        {/* LEFT */}
        <div className="flex-1 p-8 overflow-auto">

          {/* HEADER */}
          <div className="flex justify-between mb-8">
            <h1 className="text-2xl font-bold">Admin Control</h1>

            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-teal-400 outline-none"
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* STATS + CHART */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <StatCard title="Pending" value={users.filter(u => u.status==="pending").length} />
            <StatCard title="Active" value={users.filter(u => u.status==="active").length} />
            <StatCard title="Spam" value={users.filter(u => u.status==="spam").length} />

            <div className="col-span-3 bg-white/5 border border-white/10 p-6 rounded-2xl">
              <p className="text-sm text-slate-400 mb-4">Growth</p>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="value" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* FILTER */}
          <div className="flex gap-4 mb-6">
            {["all","pending","active"].map(v => (
              <button
                key={v}
                onClick={()=>setView(v)}
                className={`px-4 py-2 rounded-xl ${
                  view===v
                  ? "bg-teal-400 text-black"
                  : "bg-white/5"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* USERS */}
          <div className="space-y-4">
            {filtered.map(user => (
              <motion.div
                key={user._id}
                whileHover={{ scale:1.02 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between"
              >
                <div>
                  <h3 className="font-bold">{user.full_name}</h3>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>

                <div className="flex gap-4 items-center">
                  {user.status==="pending" && (
                    <button
                      onClick={()=>approve(user._id)}
                      className="px-4 py-2 bg-teal-400 text-black rounded-lg"
                    >
                      {processing===user._id ? "..." : "Approve"}
                    </button>
                  )}

                  {user.status==="active" && <CheckCircle className="text-green-400" />}
                  {user.status==="spam" && <ShieldAlert className="text-red-400" />}

                  <ChevronRight />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL (🔥 ACTIVITY FEED) */}
        <div className="w-80 border-l border-white/10 p-6 bg-white/5 backdrop-blur-xl hidden lg:block">
          <h2 className="font-bold mb-6">Live Activity</h2>

          <div className="space-y-4 text-sm text-slate-400">
            <ActivityItem text="User approved" />
            <ActivityItem text="New signup detected" />
            <ActivityItem text="Spam flagged" />
            <ActivityItem text="Database sync complete" />
          </div>
        </div>

      </div>
    </div>
  );
}

const StatCard = ({ title, value }: any) => (
  <motion.div
    whileHover={{ scale:1.05 }}
    className="p-6 bg-white/5 border border-white/10 rounded-2xl"
  >
    <p className="text-sm text-slate-400">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </motion.div>
);

const ActivityItem = ({ text }: any) => (
  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
    {text}
  </div>
);