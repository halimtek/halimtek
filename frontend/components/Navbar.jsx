"use client";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? "h-16 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(59,130,246,0.1)]" 
        : "h-20 bg-transparent"
    }`}>
      {/* Animated Scroll Indicator - Replaces the boring line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group font-black text-xl tracking-tighter uppercase dark:text-white">
          HALIM<span className="text-blue-600">TEK</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <Link href="/#about" className="hover:text-blue-500 transition-colors">About</Link>
            <Link href="/#services" className="hover:text-blue-500 transition-colors">Services</Link>
            <Link href="/#projects" className="hover:text-blue-500 transition-colors">Projects</Link>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/login" className="text-[10px] font-mono font-bold uppercase text-slate-500 hover:text-blue-500">Login</Link>
            <Link href="/register" className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-mono font-black uppercase rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
              Join Academy
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}