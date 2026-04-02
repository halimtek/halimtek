"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "h-16 bg-white/90 dark:bg-[#030712]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm" 
          : "h-20 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tighter dark:text-white uppercase">
            HALIM<span className="text-blue-600">TEK</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
          
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/login" className="text-[10px] font-mono font-bold uppercase text-slate-500 hover:text-blue-500">
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase rounded-lg shadow-lg shadow-blue-500/20"
            >
              Join Academy
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}