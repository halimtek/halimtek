"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled || isOpen
        ? "h-16 bg-white/90 dark:bg-[#030712]/90 backdrop-blur-xl border-b border-blue-500/10 shadow-xl" 
        : "h-20 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-[110]">
          <span className="text-xl font-black tracking-tighter dark:text-white uppercase">
            HALIM<span className="text-blue-600">TEK</span>
          </span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#about" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">About</Link>
          <Link href="/#services" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Services</Link>
          <ThemeToggle />
          <Link href="/login" className="text-[10px] font-mono font-bold uppercase text-slate-500">Login</Link>
          <Link href="/register" className="px-5 py-2 bg-blue-600 text-white text-[10px] font-mono font-black uppercase rounded-lg shadow-lg shadow-blue-500/20">Join</Link>
        </div>

        {/* Mobile Toggle Button - Visible only on Mobile */}
        <div className="flex md:hidden items-center gap-4 z-[110]">
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-900 dark:text-white p-2"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-[#030712] border-b border-blue-500/10 p-8 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <Link onClick={() => setIsOpen(false)} href="/#about" className="text-xs font-mono uppercase tracking-[0.3em] dark:text-white">About</Link>
            <Link onClick={() => setIsOpen(false)} href="/#services" className="text-xs font-mono uppercase tracking-[0.3em] dark:text-white">Services</Link>
            <Link onClick={() => setIsOpen(false)} href="/login" className="text-xs font-mono uppercase tracking-[0.3em] dark:text-white border-t border-white/5 pt-4">Login</Link>
            <Link onClick={() => setIsOpen(false)} href="/register" className="w-full py-4 bg-blue-600 text-white text-center font-black uppercase text-xs rounded-xl">Join Academy</Link>
          </motion.div>
        )}
      </AnimatePresence>
      <ThemeToggle />
    </nav>
  );
}