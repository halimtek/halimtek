import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-[#030712]">
      <Navbar />
      
      {/* Background Decorative Blob for Login */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />

      <section className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
        <LoginForm />
      </section>

      
    </main>
  );
}