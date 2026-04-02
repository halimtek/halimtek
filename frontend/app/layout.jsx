import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "HalimTek | Computer Engineer & Full-Stack Developer",
  description: "Professional portfolio of Abdelhalim Adem, specializing in Flutter and Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-[#030712] transition-colors duration-500 antialiased selection:bg-blue-500/30 min-h-screen flex flex-col">
        
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/5 blur-[100px]" />
        </div>
        
        {/* Navigation - Needs highest Z-index */}
        <Navbar />

        {/* Content - flex-grow ensures footer is pushed down */}
        <main className="relative z-10 flex-grow pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}