"use client";
import { useEffect } from 'react';

export default function AdminDashboard() {
  useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem('halim_token');
    
    // If no token, kick them back to the login page
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* --- Glassmorphism Sidebar --- */}
      <aside className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Halim Tek Admin
        </h1>
        
        <nav className="flex flex-col gap-4">
          <button className="text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition">Dashboard</button>
          <button className="text-left p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">Students</button>
          <button className="text-left p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">Courses</button>
          <button className="text-left p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">Settings</button>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">Overview</h2>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/20" />
        </header>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Students" value="1,240" change="+12%" />
          <StatCard title="Active Projects" value="45" change="+5" />
          <StatCard title="Server Status" value="Online" status="text-green-400" />
        </div>
      </main>
    </div>
  );
}

// Small Component for the Stat Cards
function StatCard({ title, value, change, status = "text-blue-400" }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <h3 className={`text-2xl font-bold ${status}`}>{value}</h3>
      {change && <p className="text-xs text-gray-500 mt-2">{change} since last week</p>}
    </div>
  );
}
// export default function AdminDashboard() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
//       <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//         Welcome to Halim Tek Admin Dashboard
//       </h1>
//     </div>
//   );
// }