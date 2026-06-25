import React, { useState } from "react";
import { Coffee, Mail, Send, CheckCircle2, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import HostNovaLogo from "./HostNovaLogo";

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;

    setSuccess(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#1c130e] text-[#F5F0EB] pt-16 pb-8 border-t border-coffee-gold/15 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-coffee-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Column blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Logo, pitch & social */}
          <div className="lg:col-span-4 space-y-6">
            <HostNovaLogo size={36} variant="with-text" isDark={true} />
            
            <p className="text-xs text-[#F5F0EB]/70 leading-relaxed font-sans max-w-sm">
              We engineer luxury high-converting websites and custom storefronts. Blending stunning 3D aesthetics, robust React code, and target local Jaipur/Bangalore SEO optimizations.
            </p>

            {/* Social media icons */}
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F0EB] hover:bg-coffee-gold hover:text-coffee-dark hover:-translate-y-0.5 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F0EB] hover:bg-coffee-gold hover:text-coffee-dark hover:-translate-y-0.5 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F0EB] hover:bg-coffee-gold hover:text-coffee-dark hover:-translate-y-0.5 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F0EB] hover:bg-coffee-gold hover:text-coffee-dark hover:-translate-y-0.5 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links block */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-coffee-gold">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#F5F0EB]/75 font-button">
              <li><a href="#navbar" className="hover:text-coffee-gold transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">Core Services</a></li>
              <li><a href="#portfolio" className="hover:text-coffee-gold transition-colors">Staging Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-coffee-gold transition-colors">Translucent Pricing</a></li>
              <li><a href="#process" className="hover:text-coffee-gold transition-colors">Our Production Flow</a></li>
              <li><a href="#contact" className="hover:text-coffee-gold transition-colors">Consultation Form</a></li>
            </ul>
          </div>

          {/* Services block */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-coffee-gold">Services</h4>
            <ul className="space-y-2 text-xs text-[#F5F0EB]/75 font-sans">
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">Premium Web Design</a></li>
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">E-Commerce Storefronts</a></li>
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">Restaurant Menu Planners</a></li>
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">Speed optimization</a></li>
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">Google Local SEO</a></li>
              <li><a href="#services" className="hover:text-coffee-gold transition-colors">SLA Cloud Maintenance</a></li>
            </ul>
          </div>

          {/* Newsletter Signup form block */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-coffee-gold">Newsletter Subscriptions</h4>
            <p className="text-xs text-[#F5F0EB]/70 leading-normal">
              Subscribe to receive free high-converting wireframe advice, local market statistics, and launch deals. Zero spam.
            </p>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success-mail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-xl flex items-center space-x-2 text-emerald-400 text-xs font-bold"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox soon.</span>
                </motion.div>
              ) : (
                <motion.form
                  key="form-mail"
                  onSubmit={handleNewsletterSubmit}
                  className="flex"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-l-xl px-3 py-2 text-xs text-[#F5F0EB] outline-none focus:border-coffee-gold transition-colors w-2/3"
                  />
                  <button
                    type="submit"
                    className="bg-coffee-gold text-coffee-dark font-button font-bold text-xs rounded-r-xl px-3 flex items-center justify-center shrink-0 w-1/3 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    <span>Join</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#F5F0EB]/50 font-mono uppercase tracking-wider">
          <p>© {new Date().getFullYear()} HostNovaPro Technologies Private Limited. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-coffee-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-coffee-gold transition-colors">Terms of SLA Service</a>
            <span>•</span>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onAdminClick?.();
              }}
              className="hover:text-coffee-gold transition-colors cursor-pointer font-bold"
            >
              Staff Terminal
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-coffee-gold hover:text-coffee-dark flex items-center justify-center text-[#F5F0EB] transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
