"use client";
import { motion } from "framer-motion";

// Local SVG Icons
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default function ContactPage() {
  return (
    <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Brand & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <p className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-4">// 04. Get In Touch</p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Let’s build <br /> <span className="text-gradient">something great.</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-lg max-w-md leading-relaxed">
              Whether you are a business looking for a robust software solution or a student 
              eager to learn programming, HalimTek is here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-300 group">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-slate-900 dark:text-white transition-all">
                <MailIcon />
              </div>
              <span className="font-mono text-sm">at.halimtek@gmail.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300 group">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-slate-900 dark:text-white transition-all">
                <MapIcon />
              </div>
              <span className="font-mono text-sm">Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Stunning Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 relative"
        >
          {/* Subtle glow effect behind the form */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
          
          <form className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-blue-400 tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Abdelhalim Adem" 
                  className="w-full bg-slate-200/50 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-blue-400 tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="info@halimtek.com" 
                  className="w-full bg-slate-200/50 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-blue-400 tracking-widest">Subject</label>
              <select className="w-full bg-[#0a192f] border border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none">
                <option>New Software Project</option>
                <option>Programming Tutoring</option>
                <option>Career Coaching</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-blue-400 tracking-widest">Message</label>
              <textarea 
                rows="5" 
                placeholder="Tell us about your project or learning goals..." 
                className="w-full bg-slate-200/50 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 dark:text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}