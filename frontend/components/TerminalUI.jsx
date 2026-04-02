"use client";
import { motion } from "framer-motion";

export default function TerminalUI() {
  const lines = [
    { label: "status", val: "Active", color: "text-green-500" },
    { label: "engine", val: "Next.js 14 / FastAPI", color: "text-blue-400" },
    { label: "location", val: "Addis Ababa, ET", color: "text-emerald-400" },
    { label: "focus", val: "Full-Stack & Mobile", color: "text-purple-400" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/5 bg-[#0d1117] font-mono text-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">halim@halimtek: ~</span>
      </div>
      <div className="p-8 space-y-3">
        <div className="flex gap-3">
          <span className="text-blue-400">➜</span>
          <span className="text-slate-300">fetch system_stats --detailed</span>
        </div>
        <div className="pl-6 space-y-1">
          {lines.map((line, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-slate-400"
            >
              <span className="opacity-50">{line.label}:</span> <span className={line.color}>{line.val}</span>
            </motion.p>
          ))}
        </div>
        <div className="flex gap-3 pt-4">
          <span className="text-blue-400">➜</span>
          <span className="w-2 h-5 bg-blue-500 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
  