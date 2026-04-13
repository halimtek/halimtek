import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#020617]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Side Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none text-white uppercase">
              JOIN THE <br/> <span className="text-teal-400 underline decoration-teal-400/30">COHORT.</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              // Enrollment is currently open for Spring 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="h-[1200px] border-l border-teal-500/20 pl-8 space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Expert Mentorship</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Learn directly from Full-stack engineers building production-grade solutions.
                </p>
              </div>
              {/* Add more sections here */}
            </div>
          </div>
        </div>

        {/* Right Side Sticky Form - ADDED 'sticky' and 'top' */}
        <div className="lg:sticky lg:top-32 w-full">
          <RegistrationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}