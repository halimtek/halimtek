

import AdminDashboard from '../components/AdminDashboard';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter italic">
            HALIM <span className="text-blue-600 not-italic">TEK</span>
          </h1>
          <p className="text-slate-500 mt-2 uppercase tracking-widest text-xs font-bold">
            Internal Administrative Control v1.0
          </p>
        </header>

        <AdminDashboard />
      </div>
    </div>
  );
}