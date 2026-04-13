import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* CRITICAL: 'items-start' allows the right column to act as a 
        track for the sticky form. Without it, the form won't move.
      */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Side Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none dark:text-white uppercase">
              JOIN THE <br/> <span className="text-blue-600 underline">COHORT.</span>
            </h1>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              // Enrollment is currently open for Spring 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            {/* Add lots of content here to make the page long enough to test scroll */}
            <div className="h-[1200px] border-l border-blue-600/20 pl-8 space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Expert Mentorship</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Learn directly from Full-stack engineers building production-grade solutions in Ethiopia and beyond.</p>
              </div>
              {/* Duplicate or add more sections to ensure scrolling */}
            </div>
          </div>
        </div>

        {/* Right Side Sticky Form */}
        <div className="relative w-full">
          <RegistrationForm />
        </div>
      </div>

      
    </main>
  );
}