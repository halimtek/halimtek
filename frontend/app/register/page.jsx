import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#020617]">
      <Navbar />
      
      {/* Using 'items-start' is essential for the sticky behavior to work. 
          It tells the grid to let children stay at their natural height.
      */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Side Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none text-white uppercase">
              JOIN THE <br/> <span className="text-teal-400 underline decoration-teal-400/20">COHORT.</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              // Enrollment is currently open for Spring 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            {/* The long content area that creates the scroll */}
            <div className="h-[1400px] border-l border-teal-500/10 pl-8 space-y-16">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-mono">01. Expert Mentorship</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  Learn directly from Full-stack engineers building production-grade solutions in real-world environments.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-mono">02. Modern Stack</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  Master FastAPI, Next.js, Flutter, and Docker. Build architectural foundations that scale.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-mono">03. Project-Based</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  No theoretical fluff. You build core systems from day one under professional code review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Sticky Form */}
        <div className="lg:sticky lg:top-32 w-full flex justify-center">
          <RegistrationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}