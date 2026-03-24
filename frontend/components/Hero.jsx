"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl w-full z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-blue-500 mb-6 tracking-[0.3em] text-xs md:text-sm uppercase"
        >
          // Software Engineering & Full-Stack Solutions
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white leading-none mb-6 tracking-tighter"
        >
          Halim<span className="text-gradient">Tek.</span>
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-gray-500 mb-10 tracking-tight"
        >
          We build the future of web & mobile.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-6"
        >
          <Link href="/projects" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 dark:text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 text-center">
            View Projects
          </Link>
          <Link href="/contact" className="px-10 py-4 border border-white/10 hover:border-blue-500/40 backdrop-blur-sm text-slate-900 dark:text-white rounded-full font-bold transition-all text-center">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}