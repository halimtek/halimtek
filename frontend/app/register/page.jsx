import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] overflow-x-clip">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Side: This div must be longer than the form for sticky to work */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white uppercase">
              JOIN THE <br/> <span className="text-teal-400 underline decoration-teal-400/20">COHORT.</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              // Enrollment Open: Spring 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            {/* Added a very large height to ensure the left side is long enough to scroll */}
            <div className="min-h-[1500px] border-l border-teal-500/10 pl-8 space-y-20">
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono tracking-tight">01. Engineering Mentorship</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">Professional guidance through complex architecture and system design.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono tracking-tight">02. Distributed Systems</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">Learn to build and deploy high-availability backends with FastAPI and Docker.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono tracking-tight">03. Full-Stack Mastery</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">Bridge the gap between beautiful Next.js frontends and robust database logic.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono tracking-tight">04. Peer Network</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">Connect with a localized cohort of developers solving real-world challenges.</p>
              </section>
            </div>
          </div>
        </div>

        {/* Right Side: The Sticky Container */}
        <div className="lg:sticky lg:top-32 w-full flex justify-center pb-10">
          <RegistrationForm />
        </div>
      </div>

  
    </main>
  );
}