export default function Footer() {
  return (
    <footer className="relative z-10 py-16 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="mb-8">
          <span className="text-sm font-black tracking-widest text-slate-400 uppercase">
            HALIM<span className="text-blue-600/50">TEK</span>
          </span>
        </div>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">
          © 2026 PRECISION ENGINEERING
        </p>
      </div>
    </footer>
  );
}