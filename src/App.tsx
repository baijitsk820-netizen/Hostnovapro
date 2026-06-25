import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import ThreeDHeroScene from "./components/ThreeDHeroScene";
import Services from "./components/Services";
import WebsitePreview from "./components/WebsitePreview";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import { ContactForm, ContactFormRef } from "./components/ContactForm";
import SignUpModal from "./components/SignUpModal";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import { Coffee, Sparkles, Star, ChevronDown, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WebsitePreview as WebsitePreviewType } from "./types";
import { WEBSITES_PREVIEW_DATA } from "./data";
import ProjectDetailView from "./components/ProjectDetailView";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import HostNovaLogo from "./components/HostNovaLogo";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Brewing luxury assets...");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<WebsitePreviewType | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const contactFormRef = useRef<ContactFormRef>(null);

  // Progressive loading texts
  useEffect(() => {
    const textSequence = [
      { delay: 500, text: "Compiling Three.js WebGL graphics canvas..." },
      { delay: 1100, text: "Optimizing typography & glassmorphism shaders..." },
      { delay: 1600, text: "Securing local SEO indexing blueprints..." },
      { delay: 2000, text: "Ready to launch!" }
    ];

    const timeouts = textSequence.map(item => {
      return setTimeout(() => {
        setLoadingText(item.text);
      }, item.delay);
    });

    const endTimeout = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      clearTimeout(endTimeout);
    };
  }, []);

  // CTA Click Handlers
  const handleSelectPlan = (planName: string, price: number) => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    // Pre-fill the form
    setTimeout(() => {
      contactFormRef.current?.preFillForm(planName, price);
    }, 400);
  };

  const handleSelectService = (serviceTitle: string) => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    // Pre-fill
    setTimeout(() => {
      contactFormRef.current?.preFillForm(
        serviceTitle, 
        serviceTitle.includes("Ecommerce") ? 19999 : 9999
      );
    }, 400);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (isAdminView) {
    return (
      <>
        <CustomCursor />
        <AnimatePresence mode="wait">
          {!isAdminLoggedIn ? (
            <motion.div
              key="admin-gate"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed inset-0 z-50"
            >
              <AdminLogin 
                onLoginSuccess={() => setIsAdminLoggedIn(true)} 
                onBack={() => setIsAdminView(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="admin-workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen bg-[#FAF9F6] text-[#0F172A]"
            >
              <AdminDashboard 
                onLogout={() => {
                  setIsAdminLoggedIn(false);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      {/* 1. Premium Animated Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#120C08] z-[9999] flex flex-col items-center justify-center text-center p-4"
          >
            <div className="relative mb-6 logo-float">
              {/* Spinning latte gold circles */}
              <div className="w-24 h-24 rounded-full border-4 border-coffee-gold/20 border-t-coffee-gold animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <HostNovaLogo size={48} variant="icon-only" glow={true} isDark={true} />
              </div>
            </div>
            
            <h1 className="font-display font-extrabold text-2xl text-[#F5F0EB] tracking-tight mb-2">
              <span className="gold-shimmer-text">HostNovaPro</span>
            </h1>
            <p className="text-xs text-[#F5F0EB]/60 font-mono tracking-widest uppercase">
              BREWING DIGITAL ARCHITECTURE
            </p>

            {/* Simulated Progressive loading logs */}
            <div className="mt-8 max-w-xs w-full bg-white/5 border border-white/10 rounded-xl p-3 h-12 flex items-center justify-center">
              <span className="text-[10px] font-mono text-coffee-gold uppercase tracking-wider text-center animate-pulse">
                ✦ {loadingText}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Structure */}
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetailView
            key="project-detail"
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onBuildRequested={() => {
              setSelectedProject(null);
              setTimeout(() => {
                handleScrollToSection("contact");
              }, 400);
            }}
          />
        ) : (
          <motion.div
            key="app-shell-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen relative flex flex-col justify-between"
            id="app-shell"
          >
            {/* Navigation bar */}
            <Navbar 
              onSignUpOpen={() => setIsSignUpOpen(true)} 
              onContactOpen={() => handleScrollToSection("contact")} 
              onAdminOpen={() => setIsAdminView(true)}
            />

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 relative overflow-hidden flex items-center min-h-[90vh]">
          {/* Custom animated background grid blur */}
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(245,240,235,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,235,0.4)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(42,30,23,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(42,30,23,0.15)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-coffee-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-coffee-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column (Copy content) */}
              <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4"
                >
                  <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-coffee-primary/10 dark:bg-coffee-gold/15 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest border border-coffee-gold/20">
                    <Sparkles className="w-3.5 h-3.5 text-coffee-gold animate-spin" />
                    <span>ELITE DIGITAL CRAFTSMANSHIP FOR INDIA</span>
                  </span>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-coffee-text dark:text-coffee-bg leading-[1.1]">
                    Premium Websites <br className="hidden sm:inline" />
                    That <span className="coffee-gradient-text">Grow Your Business</span>
                  </h2>

                  <p className="text-base sm:text-lg text-coffee-mocha dark:text-[#F5F0EB]/85 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                    We design high-converting websites that help businesses attract customers, build trust, and increase revenue. Engineered with immersive 3D technology, near-instant speed index, and flawless responsive layouts.
                  </p>
                </motion.div>

                {/* Call to Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                >
                  <button
                    onClick={() => handleScrollToSection("contact")}
                    className="px-8 py-4 bg-coffee-primary hover:bg-coffee-mocha dark:bg-coffee-gold dark:text-coffee-dark dark:hover:bg-white text-[#FAF9F6] text-sm font-button font-bold rounded-xl shadow-xl hover:shadow-coffee-primary/20 transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight className="w-4 h-4 text-white dark:text-coffee-dark" />
                  </button>

                  <button
                    onClick={() => handleScrollToSection("portfolio")}
                    className="px-8 py-4 bg-white hover:bg-coffee-primary/5 dark:bg-white/5 border border-coffee-primary/25 dark:border-coffee-bg/25 text-coffee-primary dark:text-coffee-gold text-sm font-button font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    View Portfolio
                  </button>
                </motion.div>

                {/* Small Trust badges row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="pt-6 border-t border-coffee-primary/10 dark:border-coffee-bg/10 grid grid-cols-3 gap-4 text-left max-w-md mx-auto lg:mx-0"
                >
                  <div>
                    <span className="font-display font-bold text-xl text-coffee-primary dark:text-coffee-gold block">0.6s</span>
                    <span className="text-[10px] text-coffee-mocha dark:text-coffee-bg/60 uppercase tracking-wider block font-mono">Avg Load Time</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-xl text-coffee-primary dark:text-coffee-gold block">500+</span>
                    <span className="text-[10px] text-coffee-mocha dark:text-coffee-bg/60 uppercase tracking-wider block font-mono">Launched Live</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-xl text-coffee-primary dark:text-coffee-gold block">99.9%</span>
                    <span className="text-[10px] text-coffee-mocha dark:text-coffee-bg/60 uppercase tracking-wider block font-mono">Server Uptime SLA</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column (Three.js 3D Interactive Canvas) */}
              <div className="lg:col-span-6 h-[400px] sm:h-[450px] lg:h-[550px] relative w-full rounded-3xl overflow-hidden shadow-2xl glass-effect border border-coffee-gold/10">
                {/* Embedded ThreeD scene inside styled frame */}
                <ThreeDHeroScene />
              </div>

            </div>
          </div>
        </section>

        {/* 2. Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 3. Website Showcase / Preview Playground Section */}
        <WebsitePreview 
          onViewConceptDetail={(webId) => {
            const proj = WEBSITES_PREVIEW_DATA.find(w => w.id === webId);
            if (proj) setSelectedProject(proj);
          }} 
        />

        {/* 4. Why Choose Us / Animated statistics section */}
        <WhyChooseUs />

        {/* 5. Production Flow / 4 Step timeline Section */}
        <Process />

        {/* 6. Pricing Cards Section with budget multipliers */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* 7. Client Endorsements / Testimonial Slider */}
        <Testimonials />

        {/* 8. Accordion FAQ modules */}
        <FAQ />

        {/* 9. Contact Requester and Scheduling blocks */}
        <ContactForm ref={contactFormRef} />

        {/* 10. Footer panel */}
        <Footer onAdminClick={() => setIsAdminView(true)} />

        {/* SignUp / Client Portal registration overlay Modal */}
        <SignUpModal 
          isOpen={isSignUpOpen} 
          onClose={() => setIsSignUpOpen(false)} 
        />

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
