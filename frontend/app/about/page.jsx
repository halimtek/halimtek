"use client";
import { motion } from "framer-motion";
import TerminalUI from "@components/TerminalUI";

export default function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: The Human Story (About) */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black tracking-tighter uppercase dark:text-white leading-[0.85]">
              Human <br /> 
              <span className="text-blue-600 text-6xl">Behind.</span> <br />
              The Code.
            </h2>
            
            <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p>
                I am <span className="text-slate-900 dark:text-white font-bold">Abdelhalim Adem</span>, 
                a Computer Engineer based in Addis Ababa. I specialize in building 
                high-performance digital infrastructure through **HalimTek**.
              </p>
              <p>
                My approach combines the stability of **Ubuntu Linux** systems with 
                the modern agility of **Flutter** and **Next.js**. I don't just write 
                code; I architect solutions that solve real-world problems.
              </p>
            </div>

            {/* Quick Stats Labels */}
            <div className="flex flex-wrap gap-3 mt-10">
              {["Full-Stack", "Mobile", "DevOps", "Ethiopia"].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-blue-600/5 border border-blue-500/10 text-[9px] font-mono text-blue-600 uppercase tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: The Technical Identity (Terminal) */}
        <div className="lg:col-span-7 relative">
          {/* Subtle glow behind terminal */}
          <div className="absolute -inset-4 bg-blue-600/10 blur-[60px] rounded-full opacity-50" />
          <TerminalUI />
          
          {/* Caption for Terminal */}
          <p className="mt-4 text-right font-mono text-[9px] text-slate-500 uppercase tracking-[0.3em]">
            // halimtek_os_v1.0.4.sh --running
          </p>
        </div>

      </div>
    </section>
  );
}