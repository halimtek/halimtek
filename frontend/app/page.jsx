"use client";
import Hero from "@/components/Hero";
import About from "@/app/about/page"; // We can treat the pages as components
import Services from "@/app/services/page";
import Projects from "@/app/projects/page";
import Contact from "@/app/contact/page";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <section id="hero">
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
      
      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}