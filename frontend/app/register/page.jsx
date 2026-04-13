import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    /* Use overflow-visible to ensure sticky works */
    <main className="relative min-h-screen bg-[#020617] overflow-visible">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Side: Long Content */}
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
            {/* Height must be larger than the form to see the sticky effect */}
            <div className="min-h-[1400px] border-l border-teal-500/10 pl-8 space-y-20">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono">01. Mentorship</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Direct guidance from senior full-stack engineers.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono">02. Modern Architecture</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Focus on scalable backends and fluid frontends.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono">03. Deployment</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Master CI/CD and production environments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky wrapper */}
        <div className="lg:sticky lg:top-32 w-full">
          <RegistrationForm />
        </div>
      </div>

    
    </main>
  );
}