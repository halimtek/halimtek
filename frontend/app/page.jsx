"use client";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import TerminalUI from "@/components/TerminalUI";
import ProjectSlider from "@/components/ProjectSlider";
import Projects from "@/app/projects/page";
import Services from "@/app/services/page";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 overflow-x-clip pb-20">
      
      {/* 1. HERO SECTION - The "Hook" */}
      <section id="hero" className="min-h-screen flex items-center">
        <Hero />
      </section>
      
      {/* 2. ABOUT SECTION - The "Identity" */}
      <section id="about" className="max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5">
            <h2 className="text-5xl font-black tracking-tighter uppercase dark:text-white leading-none">
              System <br />
              <span className="text-blue-600">Architect.</span>
            </h2>
            <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Based in Ethiopia, I bridge the gap between complex backend logic and 
              high-performance mobile interfaces. My mission at <span className="text-blue-500 font-bold">HalimTek</span> 
              is to deploy world-class digital infrastructure.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase text-blue-500">
                Ubuntu 24.04 LTS
              </div>
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase text-slate-500">
                Full-Stack
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <TerminalUI />
          </div>
        </motion.div>
      </section>

      {/* 3. SERVICES SECTION - The "Capabilities" */}
      <section id="services" className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase dark:text-white">
              Tech <span className="text-blue-600">Stack.</span>
            </h2>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-2">
              // Scalable Solutions & Modern Frameworks
            </p>
          </div>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent hidden md:block mx-10 mb-4" />
        </div>
        
        <Services />
      </section>

      {/* 4. PROJECTS SECTION - The "Evidence" */}
      <section id="projects" className="max-w-7xl mx-auto px-6 w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-black tracking-tighter uppercase dark:text-white">
            Live <span className="text-blue-600">Deployments.</span>
          </h2>
        </div>
        
        <Projects />
      </section>

      {/* 5. CONTACT SECTION - The "Protocol" */}
      <section id="contact" className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          {/* Subtle background text */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black opacity-[0.02] dark:opacity-[0.03] select-none pointer-events-none">
            HALIMTEK
          </span>
          
          <h2 className="text-4xl font-black tracking-tighter uppercase dark:text-white relative z-10">
            Start the <span className="text-blue-600">Onboarding.</span>
          </h2>
          <p className="mt-4 text-slate-500 uppercase font-mono text-xs tracking-widest relative z-10">
            Ready to initialize your next project?
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="px-10 py-4 bg-blue-600 text-white font-black uppercase text-xs rounded-xl shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">
              Initialize Contact
            </button>
            <button className="px-10 py-4 border border-slate-200 dark:border-white/10 dark:text-white font-black uppercase text-xs rounded-xl hover:bg-white/5 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}