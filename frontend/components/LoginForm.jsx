// // // components/LoginForm.jsx
// // "use client";
// // import { motion } from "framer-motion";

// // export default function LoginForm() {
// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, scale: 0.95 }}
// //       animate={{ opacity: 1, scale: 1 }}
// //       className="w-full max-w-md"
// //     >
// //       <div className="glass-card p-1 shadow-2xl rounded-[2rem]">
// //         <div className="bg-white/5 dark:bg-[#030712]/60 backdrop-blur-3xl p-10">
          
// //           <div className="text-center mb-12">
// //             <div className="inline-block p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6">
// //               <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-white">H</div>
// //             </div>
// //             <h2 className="text-2xl font-black tracking-tighter dark:text-white uppercase">
// //               Identity <span className="text-blue-600">Check.</span>
// //             </h2>
// //             <p className="text-[9px] font-mono text-slate-500 mt-2 uppercase tracking-[0.4em]">
// //               Authorized Personnel Only
// //             </p>
// //           </div>

// //           <form className="space-y-6">
// //             <div className="space-y-2">
// //               <label className="pro-label text-blue-500/80">Access Token (Email)</label>
// //               <input type="email" placeholder="ADMIN@HALIMTEK.COM" className="pro-input text-center tracking-widest font-mono" />
// //             </div>
            
// //             <div className="space-y-2">
// //               <label className="pro-label text-blue-500/80">Security Key</label>
// //               <input type="password" placeholder="••••••••" className="pro-input text-center tracking-widest" />
// //             </div>

// //             <button className="pro-btn-primary mt-4">
// //               Unlock Terminal
// //             </button>
            
// //             <div className="flex justify-between items-center px-2 pt-4">
// //               <span className="text-[9px] font-mono text-slate-600 uppercase cursor-pointer hover:text-blue-500">Request Reset</span>
// //               <span className="text-[9px] font-mono text-slate-600 uppercase">Encrpytion: AES-256</span>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }
// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation"; // Or your preferred router
// import { Lock, Loader2, AlertCircle } from "lucide-react";

// export default function LoginForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError(""); // Clear error when typing
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('http://127.0.0.1:8000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // 1. Store the JWT Token (Access Key)
//         localStorage.setItem("halim_token", data.access_token);
//         localStorage.setItem("user_name", data.name);
        
//         // 2. Redirect to their private dashboard/terminal
//         router.push("/terminal"); 
//       } else {
//         // Handle 403 (Pending) or 401 (Invalid) errors from FastAPI
//         setError(data.detail || "Access Denied");
//       }
//     } catch (err) {
//       setError("Connection to Core Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="w-full max-w-md mx-auto"
//     >
//       <div className="glass-card p-1 shadow-2xl rounded-[2rem] bg-[#030712]/60 backdrop-blur-3xl border border-white/10">
//         <div className="p-10">
          
//           <div className="text-center mb-10">
//             <div className="inline-block p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6">
//               <Lock className="text-blue-500" size={24} />
//             </div>
//             <h2 className="text-2xl font-black tracking-tighter text-white uppercase">
//               Identity <span className="text-blue-600">Check.</span>
//             </h2>
//             <p className="text-[9px] font-mono text-slate-500 mt-2 uppercase tracking-[0.4em]">
//               Authorized Personnel Only
//             </p>
//           </div>

//           <form className="space-y-6" onSubmit={handleLogin}>
//             {/* Error Message Display */}
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, y: -10 }} 
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-widest"
//               >
//                 <AlertCircle size={14} /> {error}
//               </motion.div>
//             )}

//             <div className="space-y-2">
//               <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Access Token (Email)</label>
//               <input 
//                 name="email"
//                 type="email" 
//                 required
//                 onChange={handleChange}
//                 placeholder="ADMIN@HALIMTEK.COM" 
//                 className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white text-center tracking-widest font-mono text-xs placeholder:text-slate-800" 
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Security Key</label>
//               <input 
//                 name="password"
//                 type="password" 
//                 required
//                 onChange={handleChange}
//                 placeholder="••••••••" 
//                 className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white text-center tracking-widest text-xs placeholder:text-slate-800" 
//               />
//             </div>

//             <button 
//               type="submit"
//               disabled={loading}
//               className="w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
//             >
//               {loading ? <Loader2 className="animate-spin" size={18} /> : "Unlock Terminal"}
//             </button>
            
//             <div className="flex justify-between items-center px-2 pt-4">
//               <span className="text-[9px] font-mono text-slate-600 uppercase cursor-pointer hover:text-blue-500 transition-colors">Request Reset</span>
//               <span className="text-[9px] font-mono text-slate-600 uppercase">Encryption: AES-256</span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error UI when user starts correcting
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- SECURE STORAGE ---
        localStorage.setItem("halim_token", data.access_token);
        localStorage.setItem("user_name", data.name);
        
        // Redirect to the private engineering terminal
        router.push("/terminal"); 
      } else {
        // Specifically handles the FastAPI detail messages
        setError(data.detail || "Identity Verification Failed");
      }
    } catch (err) {
      setError("Network Protocol Error: Could not reach Core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card p-1 shadow-2xl rounded-[2rem] bg-[#030712]/60 backdrop-blur-3xl border border-white/10 relative overflow-hidden">
        {/* Subtle Decorative Background Element */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="p-10 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6 shadow-inner">
              <Lock className="text-blue-500" size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase">
              Identity <span className="text-blue-600">Check.</span>
            </h2>
            <p className="text-[9px] font-mono text-slate-500 mt-2 uppercase tracking-[0.4em]">
              Authorized Personnel Only // Core_V4
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Error Display Logic */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-widest overflow-hidden"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Access Token (Email)</label>
              <div className="relative">
                <input 
                  name="email"
                  type="email" 
                  required
                  autoComplete="email"
                  onChange={handleChange}
                  placeholder="USER@DOMAIN.COM" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white text-center tracking-widest font-mono text-xs placeholder:text-slate-800 transition-all focus:bg-white/10 shadow-inner" 
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Security Key</label>
              <div className="relative">
                <input 
                  name="password"
                  type="password" 
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white text-center tracking-widest text-xs placeholder:text-slate-800 transition-all focus:bg-white/10 shadow-inner" 
                />
              </div>
            </div>

            {/* Submit Action */}
            <button 
              type="submit"
              disabled={loading}
              className="group w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <ShieldCheck size={18} className="group-hover:rotate-12 transition-transform" />
                  Unlock Terminal
                </>
              )}
            </button>
            
            {/* Footer Utilities */}
            <div className="flex justify-between items-center px-2 pt-4 border-t border-white/5 mt-4">
              <span className="text-[9px] font-mono text-slate-600 uppercase cursor-pointer hover:text-blue-500 transition-colors">
                Request Reset
              </span>
              <span className="text-[9px] font-mono text-slate-600 uppercase">
                Encryption: AES-256
              </span>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}