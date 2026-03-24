// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="relative py-20 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
      {/* Dynamic Background Glow: Subtle in light mode, stronger in dark */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Logo: Darker in light mode, Muted in dark mode */}
        <div className="mb-12 cursor-pointer">
          <img 
            src="/assets/halimtek-logo.png" 
            alt="HalimTek" 
            className="w-14 h-14 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          />
        </div>

        {/* Social Grid: Adapts text color */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-6 gap-x-12 mb-16 text-center">
          {[
            { name: "LinkedIn", href: "https://linkedin.com/in/halimtek" },
            { name: "Telegram", href: "https://t.me/at_halimtek" },
            { name: "GitHub", href: "https://github.com/halimtek" },
            { name: "Instagram", href: "https://instagram.com/at.halimtek" },
            { name: "TikTok", href: "https://tiktok.com/@at.halimtek" },
            { name: "Facebook", href: "https://facebook.com/at.halimtek" },
          ].map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Brand Tagline & Copyright */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-12" />
        
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 dark:text-gray-400 uppercase tracking-[0.4em]">
            Precision Engineering <span className="text-blue-500">•</span> Digital Innovation
          </p>
          <p className="text-[9px] font-mono text-slate-500 dark:text-gray-600 uppercase tracking-[0.2em] leading-loose">
            © 2026 Developed by <span className="text-slate-900 dark:text-slate-900 dark:text-white font-bold">Abdelhalim Adem</span> <br /> 
            Computer Engineer & Full-Stack Architect
          </p>
        </div>
      </div>
    </footer>
  );
}