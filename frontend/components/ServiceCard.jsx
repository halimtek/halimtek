"use client";

export default function ServiceCard({ title, desc }) {
  return (
    <div className="relative group p-1 rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500">
      <div className="bg-[#0f172a] p-10 rounded-[calc(1.5rem-1px)] h-full transition-all group-hover:bg-[#0f172a]/80">
        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
          {/* Re-use SVG from previous message here */}
          <svg className="text-blue-500 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}