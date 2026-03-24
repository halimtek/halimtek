"use client";
import { motion } from "framer-motion";

// Local SVG Icons
const WebIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
);
const MobileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
);
const MentorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default function ServicesPage() {
  const services = [
    {
      title: "Full-Stack Web Engineering",
      desc: "Specializing in Next.js and MERN stack. We build SEO-optimized, blazing-fast web interfaces paired with robust server-side logic.",
      features: ["E-commerce", "SaaS Dashboards", "Admin Portals"],
      icon: <WebIcon />,
      gridSpan: "md:col-span-2"
    },
    {
      title: "Mobile App Development",
      desc: "Cross-platform excellence using Flutter. Native performance for iOS and Android from a single codebase.",
      features: ["Custom UI/UX", "State Management", "Store Deployment"],
      icon: <MobileIcon />,
      gridSpan: "md:col-span-1"
    },
    {
      title: "Technical Mentorship",
      desc: "Empowering the next generation of engineers. Dedicated 1-on-1 tutoring and structured bootcamps covering modern programming fundamentals.",
      features: ["Flutter Bootcamps", "Web Dev Roadmap", "Backend Logic"],
      icon: <MentorIcon />,
      gridSpan: "md:col-span-1"
    },
    {
      title: "Software Career Coaching",
      desc: "Guidance for aspiring developers on portfolio building, technical interviews, and navigating the professional landscape in Ethiopia and beyond.",
      features: ["Resume Review", "Interview Prep", "Brand Strategy"],
      icon: <MentorIcon />, // You can replace with a 'user-check' icon
      gridSpan: "md:col-span-2"
    }
  ];

  return (
    <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-20 max-w-4xl">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-4">
          // 02. Expertise & Education
        </motion.p>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
          Building software, <span className="text-gradient">training builders.</span>
        </h1>
        <p className="text-slate-500 dark:text-gray-400 text-lg">
          At HalimTek, we bridge the gap between high-level engineering and technical education. 
          We build digital products and the talent required to maintain them.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-10 flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 ${service.gridSpan}`}
          >
            <div>
              <div className="mb-8 w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 dark:text-gray-400 leading-relaxed mb-8 text-sm">
                {service.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
              {service.features.map((feature) => (
                <span key={feature} className="text-[10px] font-mono text-blue-400 bg-blue-500/5 px-3 py-1 rounded-full uppercase tracking-tighter">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}