"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stack = [
    "Next.js & React", 
    "Flutter & Dart", 
    "Node.js & FastAPI", 
    "PostgreSQL & MongoDB", 
    "Docker & Linux", 
    "UI/UX Design"
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          <span className="text-blue-500 font-mono text-xl mr-2">01.</span> Our Identity
        </h2>
        <div className="h-[1px] bg-white/10 flex-grow max-w-xs"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6 text-slate-500 dark:text-gray-400 leading-relaxed text-lg">
          <p>
            Welcome to <span className="text-slate-900 dark:text-white font-bold">HalimTek</span>. We are a technology-driven studio 
            dedicated to engineering high-performance digital products. Founded by a Computer Engineer 
            with a passion for pixel-perfect execution, we bridge the gap between complex backend 
            architecture and intuitive user experiences.
          </p>
          
          <p>
            Our core mission is to empower businesses and individuals by building robust 
            <span className="text-blue-400"> mobile applications</span> and 
            <span className="text-blue-400"> modern websites</span>. Whether it’s an educational platform 
            or a professional portfolio, we treat every line of code as a foundation for growth.
          </p>

          <p>
            Operating primarily on <span className="text-slate-900 dark:text-white">Ubuntu Linux</span>, our development 
            environment is optimized for speed, security, and scalability. We don't just build apps; 
            we engineer digital solutions that last.
          </p>

          <p className="text-sm font-mono text-blue-500 uppercase tracking-widest pt-4">
            Technical Arsenal:
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
            {stack.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-blue-500">▹</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group mx-auto md:mx-0">
          {/* Glassmorphism Image Container */}
          <div className="glass-card p-4 relative z-10">
             <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-900/40 flex items-center justify-center border border-white/5 overflow-hidden">
                {/* Brand Placeholder - You can replace this with your HalimTek Logo */}
                <span className="text-7xl font-black text-slate-900 dark:text-white/10 select-none tracking-tighter">HT</span>
             </div>
          </div>
          {/* Decorative frame */}
          <div className="absolute top-6 left-6 w-full h-full border-2 border-blue-500 rounded-3xl -z-10 group-hover:top-4 group-hover:left-4 transition-all duration-300"></div>
        </div>
      </div>
    </main>
  );
}