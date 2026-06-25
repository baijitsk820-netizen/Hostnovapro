import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldAlert, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import HostNovaLogo from "./HostNovaLogo";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack?: () => void;
}

const DEFAULT_ADMIN_PASSWORD = "Admin123";

export default function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate small cryptographic authorization delay
    setTimeout(() => {
      if (password === DEFAULT_ADMIN_PASSWORD) {
        onLoginSuccess();
      } else {
        setError("Invalid Authorization Password.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#120C08] text-[#FAF9F6] font-sans antialiased overflow-hidden select-none">
      
      {/* Decorative ambient gold radial glows to set an award-winning agency mood */}
      <div className="absolute top-[20%] left-[20%] w-96 h-96 rounded-full bg-[#C19A6B]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[450px] h-[450px] rounded-full bg-[#8B5E3C]/10 blur-[150px] pointer-events-none" />

      {/* Elegant geometric line mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(193,154,107,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(193,154,107,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Soft Latte Gold Glow Ring around the Card */}
        <div className="bg-[#1C120C] border border-[#C19A6B]/20 rounded-3xl p-8 sm:p-10 shadow-[0_0_60px_rgba(193,154,107,0.12)] relative overflow-hidden backdrop-blur-md">
          
          {/* Subtle gold horizontal bar at top of card */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6F4E37] via-[#C19A6B] to-[#8B5E3C]" />

          {/* Logo & Heading */}
          <div className="text-center mb-8 flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mb-5"
            >
              <HostNovaLogo size={56} variant="icon-only" glow={true} shimmer={true} />
            </motion.div>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C19A6B] font-bold bg-[#C19A6B]/10 px-3.5 py-1 rounded-full border border-[#C19A6B]/15">
              ✦ SECURE GATEWAY HUB ✦
            </span>
            <h2 className="text-2xl font-bold text-white mt-4 tracking-tight">
              HostNova<span className="text-[#C19A6B] font-extrabold">Pro</span> Dashboard
            </h2>
            <p className="text-[11.5px] text-[#C19A6B]/70 mt-1.5 leading-relaxed font-sans max-w-xs mx-auto">
              This administrative workspace is fully encrypted. Enter the master key to bypass.
            </p>
          </div>

          {/* Single Form for Password Access */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-[#C19A6B]/80 uppercase tracking-widest block font-bold">
                Workspace Authorization Key
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-[#C19A6B]/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter administrator password..."
                  className="w-full bg-[#120C08]/90 border border-[#C19A6B]/20 rounded-xl pl-11 pr-11 py-3.5 text-xs text-white placeholder-stone-500 outline-none focus:ring-1 focus:ring-[#C19A6B] focus:border-[#C19A6B] transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#C19A6B]/50 hover:text-[#C19A6B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Non-intrusive red error text below the input field */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/15 rounded-xl px-4 py-3"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-4 bg-[#8B5E3C] hover:bg-[#6F4E37] border border-[#C19A6B]/30 disabled:border-[#C19A6B]/10 text-white rounded-xl text-xs font-bold tracking-widest transition-all shadow-[0_4px_25px_rgba(139,94,60,0.15)] hover:shadow-[0_4px_25px_rgba(139,94,60,0.25)] active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-40"
            >
              <span>{isLoading ? "AUTHORIZING SESSION..." : "SECURE LOGIN"}</span>
            </button>
          </form>

          {/* Return Home / Back option */}
          {onBack && (
            <div className="mt-6 flex justify-center border-t border-[#C19A6B]/10 pt-5">
              <button
                type="button"
                onClick={onBack}
                className="text-xs text-[#C19A6B]/70 hover:text-[#C19A6B] font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
