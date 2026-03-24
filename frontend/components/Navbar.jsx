"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; // Ensure this file exists

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Add a shadow/border only when the user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.offsetTop - 80,
      behavior: "smooth",
    });
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, "#hero")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="/assets/halimtek-logo.png" 
              alt="HalimTek" 
              className="relative z-10 w-8 h-8 object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white transition-colors">
            HALIM<span className="text-blue-600 dark:text-blue-400">TEK</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link, i) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                <span className="text-blue-500/50 mr-1 text-[9px]">0{i+1}.</span>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Area: Toggle + CTA */}
          <div className="flex items-center gap-6 pl-6 border-l border-slate-200 dark:border-white/10">
            <ThemeToggle />
            
          </div>
        </div>

        {/* Mobile Toggle (Simple placeholder or Icon) */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="text-slate-900 dark:text-white p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}