"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Josad Backend Engine",
      desc: "Architected a high-concurrency server using FastAPI and PostgreSQL. Implemented Docker orchestration for seamless deployment.",
      tags: ["FastAPI", "PostgreSQL", "Docker", "Python"],
      github: "#",
      link: "#"
    },
    {
      title: "EduTrack Mobile",
      desc: "A comprehensive study application featuring custom navigation, progress tracking, and interactive learning modules built with Flutter.",
      tags: ["Flutter", "Dart", "Firebase"],
      github: "#",
      link: "#"
    },
    {
      title: "HalimTek Commerce",
      desc: "A pixel-perfect e-commerce experience with Glassmorphism UI, secure Stripe integration, and real-time inventory management.",
      tags: ["Next.js", "Tailwind", "Node.js", "Stripe"],
      github: "#",
      link: "#"
    },
    {
      title: "TutorConnect Platform",
      desc: "A marketplace for academic support, connecting students with specialized tutors. Features real-time booking and discovery.",
      tags: ["React", "Express", "MongoDB"],
      github: "#",
      link: "#"
    },
    {
      title: "Professional Portfolio V3",
      desc: "A 6-screen animated showcase application designed to highlight technical proficiency and professional branding.",
      tags: ["Next.js", "Framer Motion", "Three.js"],
      github: "#",
      link: "#"
    },
    {
      title: "Academic Support System",
      desc: "Full-stack academic toolset featuring automated grading scripts and resource distribution via a secure API.",
      tags: ["FastAPI", "React", "PostgreSQL"],
      github: "#",
      link: "#"
    },
    {
      title: "HalimTek Brand Identity",
      desc: "Strategic branding and asset generation for the 'at.halimtek' handle across 6 major social media platforms.",
      tags: ["Design", "Marketing", "SEO"],
      github: "#",
      link: "#"
    },
    {
      title: "Dire Dawa Logistics Tool",
      desc: "Custom internal tool for local commerce tracking and regional inventory analytics in Ethiopia.",
      tags: ["Flutter", "Firebase", "Maps API"],
      github: "#",
      link: "#"
    }
  ];

  return (
    <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-20">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-4"
        >
          // 03. Selected Works
        </motion.p>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          A library of <span className="text-gradient">technical craft.</span>
        </h1>
        <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
          From complex backend architectures to fluid mobile interfaces, here is a 
          comprehensive look at the digital systems engineered by HalimTek.
        </p>
      </header>

      {/* Grid with responsive columns (1 on mobile, 2 on tablet, 3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index % 3 * 0.1 // Staggered entrance effect
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* Call to Action Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 text-center p-16 glass-card border-blue-500/20"
      >
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Have a project in mind?</h3>
        <p className="text-slate-500 dark:text-gray-400 mb-10 max-w-md mx-auto">
          We are always looking for new challenges and complex problems to solve. 
          Let’s build something extraordinary together.
        </p>
        <a 
          href="/contact" 
          className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 dark:text-white rounded-full font-bold transition-all shadow-xl shadow-blue-500/20 inline-block"
        >
          Start a Conversation
        </a>
      </motion.div>
    </main>
  );
}