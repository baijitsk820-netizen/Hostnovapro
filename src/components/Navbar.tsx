import { useState, useEffect } from "react";
import { Menu, X, Coffee, Sun, Moon, Sparkles, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import HostNovaLogo from "./HostNovaLogo";

interface NavbarProps {
  onSignUpOpen: () => void;
  onContactOpen: () => void;
  onAdminOpen?: () => void;
}

export default function Navbar({ onSignUpOpen, onContactOpen, onAdminOpen }: NavbarProps) {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scrolling style change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ["home", "services", "portfolio", "why-choose-us", "process", "pricing", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync initial theme
  useEffect(() => {
    const isDarkThemeActive = document.body.classList.contains("dark-theme");
    setIsDark(isDarkThemeActive);
  }, []);

  const toggleTheme = () => {
    const isNowDark = document.body.classList.toggle("dark-theme");
    setIsDark(isNowDark);
  };

  const menuItems = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "Portfolio", target: "portfolio" },
    { label: "Pricing", target: "pricing" },
    { label: "Process", target: "process" },
    { label: "Contact", target: "contact" }
  ];

  const handleScrollTo = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-effect shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <HostNovaLogo
              size={38}
              variant="with-text"
              isDark={isDark}
              onClick={() => handleScrollTo("home")}
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleScrollTo(item.target)}
                  className={`px-4 py-2 text-sm font-button font-medium rounded-lg transition-all duration-200 cursor-pointer relative ${
                    activeSection === item.target
                      ? "text-coffee-primary dark:text-coffee-gold"
                      : "text-coffee-text/80 dark:text-coffee-bg/80 hover:text-coffee-primary dark:hover:text-coffee-gold"
                  }`}
                >
                  {item.label}
                  {activeSection === item.target && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-coffee-primary dark:bg-coffee-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA, Theme Toggle & Menu Toggle */}
            <div className="flex items-center space-x-3">
              {/* Admin Portal Key link */}
              <button
                onClick={onAdminOpen}
                className="w-10 h-10 rounded-xl border border-coffee-gold/25 flex items-center justify-center text-coffee-primary dark:text-coffee-gold hover:bg-coffee-primary/10 transition-all cursor-pointer"
                title="Admin Terminal"
              >
                <UserCheck className="w-5 h-5 text-coffee-primary dark:text-coffee-gold" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-coffee-text dark:text-coffee-bg hover:bg-coffee-primary/10 dark:hover:bg-coffee-bg/10 transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-coffee-gold" />
                ) : (
                  <Moon className="w-5 h-5 text-coffee-primary" />
                )}
              </button>

              {/* Sign Up button */}
              <button
                onClick={onSignUpOpen}
                className="hidden sm:inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-button font-bold text-coffee-bg bg-coffee-primary hover:bg-coffee-mocha shadow-lg hover:shadow-coffee-primary/20 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                {user ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-coffee-gold" />
                    <span>Portal: {profile?.name?.split(" ")[0] || user.displayName?.split(" ")[0] || "Active"}</span>
                    <span className="relative flex h-2 w-2 ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Client Portal</span>
                  </>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-coffee-text dark:text-coffee-bg hover:bg-coffee-primary/10 dark:hover:bg-coffee-bg/10 transition-colors cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden glass-effect border-t border-coffee-gold/10 overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => handleScrollTo(item.target)}
                    className={`block w-full text-left px-4 py-3 text-base font-button font-medium rounded-xl transition-all ${
                      activeSection === item.target
                        ? "bg-coffee-primary/10 text-coffee-primary dark:text-coffee-gold font-semibold"
                        : "text-coffee-text/80 dark:text-coffee-bg/80 hover:bg-coffee-primary/5 hover:text-coffee-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-coffee-primary/10 dark:border-coffee-bg/10 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onSignUpOpen();
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl text-sm font-button font-bold text-coffee-bg bg-coffee-primary hover:bg-coffee-mocha shadow-md animate-pulse-subtle"
                  >
                    {user ? (
                      <>
                        <UserCheck className="w-4 h-4 text-coffee-gold" />
                        <span>Client Workspace ({profile?.name?.split(" ")[0] || user.displayName?.split(" ")[0] || "Active"})</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Client Portal (Sign Up)</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onContactOpen();
                    }}
                    className="w-full text-center px-5 py-3.5 rounded-xl text-sm font-button font-bold text-coffee-text dark:text-coffee-bg border border-coffee-primary/20 dark:border-coffee-bg/20"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
