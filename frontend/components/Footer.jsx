// components/Footer.jsx
"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-24 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#030712] transition-colors duration-500 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Back to Top Button - The Pro Touch */}
        <button 
          onClick={scrollToTop}
          className="mb-16 group flex flex-col items-center gap-3 transition-all"
        >
          <div className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/5 transition-all">
            <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-slate-400 group-hover:text-blue-500 transition-colors">Back to Top</span>
        </button>

        {/* Social Grid */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 mb-20 max-w-3xl">
          {[
            { name: "LinkedIn", href: "https://linkedin.com/in/halimtek" },
            { name: "Telegram", href: "https://t.me/halimtekofficial" },
            { name: "GitHub", href: "https://github.com/halimtek" },
            { name: "Instagram", href: "https://instagram.com/halimtekofficial" },
            { name: "YouTube", href: "https://youtube.com/@halimtekofficial" },
            { name: "TikTok", href: "https://tiktok.com/@halimtekofficial" },
            { name: "Facebook", href: "https://facebook.com/halimtek" },
          ].map((link) => (
            <a 
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Brand Bar */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-blue-500/20 to-transparent mb-12" />
        
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <h4 className="text-xl font-black tracking-tighter dark:text-white uppercase">
              HALIM<span className="text-blue-600">TEK.</span>
            </h4>
            <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em]">
              Precision Engineering <span className="text-blue-600 mx-2">•</span> Digital Innovation
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-600 uppercase tracking-widest leading-loose">
              © 2026 Developed by <br />
              <span className="text-slate-900 dark:text-white font-black text-xs tracking-tighter transition-colors">
                Abdelhalim Adem
              </span> <br /> 
              Computer Engineer & Full-Stack Architect
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}