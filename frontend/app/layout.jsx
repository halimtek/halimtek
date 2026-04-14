import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-[#030712] antialiased selection:bg-blue-500/30">
        
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/5 blur-[100px]" />
        </div>
        
        <Navbar />

        {/* REMOVED flex-grow and flex-col logic here */}
        <main className="relative z-10 pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}